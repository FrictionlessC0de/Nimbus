import { ResumeObject, ResumeFormData, TemplateId, ExperienceEntry, EducationEntry } from "@/results/types"
import { generateId } from "@/lib/utils"

export function normalizeFromForm(
  formData: ResumeFormData,
  templateId: TemplateId
): ResumeObject {
  return {
    source: "form",
    templateId,
    personal: formData.personal,
    experience: (formData.experience || []).map((exp: ExperienceEntry) => ({
      ...exp,
      id: exp.id || generateId(),
    })),
    education: (formData.education || []).map((edu: EducationEntry) => ({
      ...edu,
      id: edu.id || generateId(),
    })),
    skills: formData.skills,
  }
}

export function normalizeFromPDF(
  rawText: string,
  templateId: TemplateId
): ResumeObject {
  return {
    source: "pdf",
    templateId,
    rawText,
    personal: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  }
}

export function resumeToText(resume: ResumeObject): string {
  if (resume.source === "pdf" && resume.rawText) {
    return resume.rawText
  }

  const { personal, experience, education, skills } = resume

  const lines: string[] = [
    `Name: ${personal.fullName}`,
    `Title: ${personal.jobTitle}`,
    `Email: ${personal.email}`,
    `Phone: ${personal.phone}`,
    `Location: ${personal.location}`,
    personal.linkedin ? `LinkedIn: ${personal.linkedin}` : "",
    "",
    "SUMMARY",
    personal.summary,
    "",
    "EXPERIENCE",
    ...experience.map((exp) =>
      [
        `${exp.jobTitle} at ${exp.company}`,
        `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}`,
        exp.description,
      ].join("\n")
    ),
    "",
    "EDUCATION",
    ...education.map((edu) =>
      `${edu.degree} - ${edu.institution} (${edu.graduationYear})`
    ),
    "",
    "SKILLS",
    skills.join(", "),
  ]

  return lines.filter(Boolean).join("\n")
}