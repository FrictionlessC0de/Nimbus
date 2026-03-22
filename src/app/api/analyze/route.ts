import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { auth } from "@/lib/auth"
import { analyzeRatelimit } from "@/lib/ratelimit"
import { buildAnalysisPrompt, buildSystemPrompt } from "@/lib/buildPrompt"
import { normalizeFromForm, normalizeFromPDF } from "@/lib/normalizeResume"
import { resumeFormSchema } from "@/lib/validations/resume"
import { env } from "@/lib/env"
import { TemplateId } from "@/types"

const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limit
    const { success, limit, reset, remaining } = await analyzeRatelimit.limit(
      session.user.id
    )
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. You have used your 5 analyses for this hour." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      )
    }

    const body = await req.json()
    const { source, templateId, formData, rawText } = body

    // Build resume object
    let resume
    if (source === "form") {
      const parsed = resumeFormSchema.safeParse(formData)
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Invalid form data", details: parsed.error.flatten() },
          { status: 400 }
        )
      }
      resume = normalizeFromForm(parsed.data, templateId as TemplateId)
    } else if (source === "pdf") {
      if (!rawText || typeof rawText !== "string") {
        return NextResponse.json(
          { error: "Missing PDF text content" },
          { status: 400 }
        )
      }
      resume = normalizeFromPDF(rawText, templateId as TemplateId)
    } else {
      return NextResponse.json({ error: "Invalid source" }, { status: 400 })
    }

    // Build prompt
    const prompt = buildAnalysisPrompt(resume)
    const systemPrompt = buildSystemPrompt()

    // Stream response from Claude
    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    })

    // Return as a readable stream
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text))
          }
        }
        controller.close()
      },
    })

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-RateLimit-Remaining": remaining.toString(),
      },
    })
  } catch (error) {
    console.error("[/api/analyze] Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}