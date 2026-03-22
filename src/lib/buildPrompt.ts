import { ResumeObject } from "@/types"
import { resumeToText } from "@/lib/normalizeResume"

export function buildAnalysisPrompt(resume: ResumeObject): string {
  const resumeText = resumeToText(resume)

  return `You are an expert resume coach and hiring manager with 15+ years of experience across multiple industries. Analyze the following resume and provide detailed, actionable feedback.

RESUME:
${resumeText}

Respond with ONLY a valid JSON object in this exact structure, no markdown, no explanation outside the JSON:

{
  "overallScore": <number 0-100>,
  "grade": <"Excellent" | "Good" | "Fair" | "Needs Work">,
  "sections": [
    {
      "name": "Experience",
      "score": <number 0-100>,
      "feedback": "<2-3 sentences of specific, actionable feedback>"
    },
    {
      "name": "Skills",
      "score": <number 0-100>,
      "feedback": "<2-3 sentences of specific, actionable feedback>"
    },
    {
      "name": "Education",
      "score": <number 0-100>,
      "feedback": "<2-3 sentences of specific, actionable feedback>"
    },
    {
      "name": "Summary",
      "score": <number 0-100>,
      "feedback": "<2-3 sentences of specific, actionable feedback>"
    }
  ],
  "improvements": [
    "<specific actionable improvement 1>",
    "<specific actionable improvement 2>",
    "<specific actionable improvement 3>",
    "<specific actionable improvement 4>",
    "<specific actionable improvement 5>"
  ],
  "keywords": [<array of 8-12 relevant skill/keyword strings extracted from the resume>]
}

Scoring guidelines:
- Experience: evaluate impact, quantified achievements, progression, relevance
- Skills: evaluate relevance, variety, technical depth, industry alignment
- Education: evaluate relevance, institution, certifications, continuous learning
- Summary: evaluate clarity, tailoring, value proposition, conciseness
- Overall score is a weighted average (Experience 40%, Skills 30%, Education 15%, Summary 15%)

Be honest but constructive. Focus on specific, actionable improvements.`
}

export function buildSystemPrompt(): string {
  return `You are an expert resume analyzer. You always respond with valid JSON only — no markdown code blocks, no explanations, no text outside the JSON object. Your feedback is specific, professional, and actionable.`
}