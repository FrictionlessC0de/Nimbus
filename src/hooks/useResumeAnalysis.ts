import { useState, useCallback } from "react"
import { useResumeStore } from "@/store/useResumeStore"
import { AnalysisResult, ResumeObject } from "@/types"

export function useResumeAnalysis() {
  const [error, setError] = useState<string | null>(null)

  const {
    setAnalysisStatus,
    setAnalysisResult,
    appendStreamedText,
    resetStream,
    setCurrentStep,
  } = useResumeStore()

  const analyze = useCallback(async (resume: ResumeObject) => {
    if (!resume) {
      setError("No resume data found")
      return
    }

    setError(null)
    resetStream()
    setAnalysisStatus("analyzing")
    setCurrentStep(3) // go to step 3 to show spinner

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: resume.source,
          templateId: resume.templateId,
          formData: resume.source === "form" ? {
            personal: resume.personal,
            experience: resume.experience,
            education: resume.education,
            skills: resume.skills,
          } : undefined,
          rawText: resume.source === "pdf" ? resume.rawText : undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Analysis failed")
      }

      if (!response.body) throw new Error("No response body")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk
        appendStreamedText(chunk)
      }

      // Clean up any markdown code fences Claude might add
      const cleaned = fullText.replace(/```json|```/g, "").trim()
      const result: AnalysisResult = JSON.parse(cleaned)
      setAnalysisResult(result)
      setAnalysisStatus("complete")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      console.error("Analysis error:", message)
      setError(message)
      setAnalysisStatus("error")
    }
  }, [setAnalysisStatus, setAnalysisResult, appendStreamedText, resetStream, setCurrentStep])

  return { analyze, error }
}