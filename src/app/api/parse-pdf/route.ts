import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { extractText } from "unpdf"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are accepted" }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const { text } = await extractText(new Uint8Array(arrayBuffer), { mergePages: true })

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: "Could not extract text from this PDF. Please try a different file." },
        { status: 422 }
      )
    }

    return NextResponse.json({ text: text.trim() })
  } catch (error) {
    console.error("[/api/parse-pdf] Error:", error)
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 })
  }
}