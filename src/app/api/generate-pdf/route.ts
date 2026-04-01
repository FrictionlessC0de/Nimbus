import { NextRequest, NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { auth } from "@/lib/auth"
import { getTemplateComponent } from "@/lib/templates"
import { ResumeObject } from "@/types"
import { createElement } from "react"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { resume } = body as { resume: ResumeObject }

    if (!resume) {
      return NextResponse.json({ error: "Missing resume data" }, { status: 400 })
    }

    const TemplateComponent = getTemplateComponent(resume.templateId)
    const element = createElement(TemplateComponent, { resume })
    const pdfBuffer = await renderToBuffer(element)

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume-${resume.templateId}.pdf"`,
      },
    })
  } catch (error) {
    console.error("[/api/generate-pdf] Error:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}