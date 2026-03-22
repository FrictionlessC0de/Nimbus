export type TemplateId = "classic" | "modern" | "minimal" | "creative"

export interface PersonalInfo {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  linkedin?: string
  summary: string
}

export interface ExperienceEntry {
  id: string
  jobTitle: string
  company: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

export interface EducationEntry {
  id: string
  degree: string
  institution: string
  graduationYear: string
}

export interface ResumeFormData {
  personal: PersonalInfo
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
}

export interface ResumeObject {
  source: "form" | "pdf"
  templateId: TemplateId
  personal: PersonalInfo
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
  rawText?: string
}