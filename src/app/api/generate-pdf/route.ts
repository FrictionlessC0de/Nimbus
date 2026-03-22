import { NextRequest, NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { auth } from "@/lib/auth"
import { pdfRatelimit } from "@/lib/ratelimit"
import { getTemplateComponent } from "@/lib/templates"
import { ResumeObject } from "@/types"

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limit
    const { success, remaining } = await pdfRatelimit.limit(session.user.id)
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. You have used your 10 PDF generations for this hour." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { resume } = body as { resume: ResumeObject }

    if (!resume) {
      return NextResponse.json(
        { error: "Missing resume data" },
        { status: 400 }
      )
    }

    // Get the correct template component
    const TemplateComponent = getTemplateComponent(resume.templateId)

    // Render to PDF buffer
    const pdfBuffer = await renderToBuffer(
      TemplateComponent({ resume })
    )

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume-${resume.templateId}.pdf"`,
        "X-RateLimit-Remaining": remaining.toString(),
      },
    })
  } catch (error) {
    console.error("[/api/generate-pdf] Error:", error)
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    )
  }
}