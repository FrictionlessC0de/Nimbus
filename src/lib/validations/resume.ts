import { z } from "zod"

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  summary: z.string().min(50, "Summary must be at least 50 characters").max(600, "Summary must be under 600 characters"),
})

export const experienceEntrySchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(20, "Please describe your role in at least 20 characters"),
})

export const educationEntrySchema = z.object({
  id: z.string(),
  degree: z.string().min(2, "Degree is required"),
  institution: z.string().min(2, "Institution is required"),
  graduationYear: z.string().min(4, "Graduation year is required"),
})

export const resumeFormSchema = z.object({
  personal: personalInfoSchema,
  experience: z.array(experienceEntrySchema).min(1, "Add at least one experience entry"),
  education: z.array(educationEntrySchema).min(1, "Add at least one education entry"),
  skills: z.array(z.string()).min(3, "Add at least 3 skills"),
})

export const uploadResumeSchema = z.object({
  templateId: z.enum(["classic", "modern", "minimal", "creative"]),
  file: z.instanceof(File).refine(
    (file) => file.type === "application/pdf",
    "Only PDF files are accepted"
  ).refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "File size must be under 5MB"
  ),
})

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>
export type ExperienceEntryInput = z.infer<typeof experienceEntrySchema>
export type EducationEntryInput = z.infer<typeof educationEntrySchema>
export type ResumeFormInput = z.infer<typeof resumeFormSchema>