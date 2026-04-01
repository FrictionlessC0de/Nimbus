import { TemplateId } from "@/types"
import { ResumeObject } from "@/types"
import { ReactElement } from "react"
import ClassicTemplate from "./ClassicTemplate"
import ModernTemplate from "./ModernTemplate"
import MinimalTemplate from "./MinimalTemplate"
import CreativeTemplate from "./CreativeTemplate"

const templateMap = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
}

export function getTemplateComponent(templateId: TemplateId): (props: { resume: ResumeObject }) => ReactElement {
  return templateMap[templateId] ?? ClassicTemplate
}