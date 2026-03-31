import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { buildAnalysisPrompt, buildSystemPrompt } from "@/lib/buildPrompt"
import { normalizeFromForm, normalizeFromPDF } from "@/lib/normalizeResume"
import { TemplateId } from "@/types"

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { source, templateId, formData, rawText } = body

    // Build resume object
    let resume
    if (source === "form") {
      resume = normalizeFromForm(formData, templateId as TemplateId)
    } else if (source === "pdf") {
      if (!rawText || typeof rawText !== "string") {
        return NextResponse.json({ error: "Missing PDF text content" }, { status: 400 })
      }
      resume = normalizeFromPDF(rawText, templateId as TemplateId)
    } else {
      return NextResponse.json({ error: "Invalid source" }, { status: 400 })
    }

    const prompt = buildAnalysisPrompt(resume)
    const systemPrompt = buildSystemPrompt()

    // Call Groq API
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        max_tokens: 1500,
        temperature: 0.3,
        stream: true,
      }),
    })

    if (!groqResponse.ok) {
      const err = await groqResponse.text()
      console.error("Groq error:", err)
      return NextResponse.json({ error: "AI service error" }, { status: 500 })
    }

    // Stream response back to client
    const readableStream = new ReadableStream({
      async start(controller) {
        const reader = groqResponse.body!.getReader()
        const decoder = new TextDecoder()
        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() ?? ""

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue
            const data = line.slice(6).trim()
            if (data === "[DONE]") continue
            try {
              const json = JSON.parse(data)
              const text = json.choices?.[0]?.delta?.content
              if (text) controller.enqueue(new TextEncoder().encode(text))
            } catch {}
          }
        }
        controller.close()
      },
    })

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    console.error("[/api/analyze] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}