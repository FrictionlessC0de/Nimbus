import { useState, useCallback } from "react"
import { useResumeStore } from "@/store/useResumeStore"
import { AnalysisResult } from "@/types"

export function useResumeAnalysis() {
  const [error, setError] = useState<string | null>(null)

  const {
    resumeObject,
    setAnalysisStatus,
    setAnalysisResult,
    appendStreamedText,
    resetStream,
    setCurrentStep,
  } = useResumeStore()

  const analyze = useCallback(async () => {
    if (!resumeObject) {
      setError("No resume data found")
      return
    }

    setError(null)
    resetStream()
    setAnalysisStatus("analyzing")

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: resumeObject.source,
          templateId: resumeObject.templateId,
          formData: resumeObject.source === "form" ? {
            personal: resumeObject.personal,
            experience: resumeObject.experience,
            education: resumeObject.education,
            skills: resumeObject.skills,
          } : undefined,
          rawText: resumeObject.source === "pdf" ? resumeObject.rawText : undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Analysis failed")
      }

      if (!response.body) throw new Error("No response body")

      // Read the stream
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

      // Parse the complete JSON response
      const result: AnalysisResult = JSON.parse(fullText)
      setAnalysisResult(result)
      setAnalysisStatus("complete")
      setCurrentStep(3)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      setError(message)
      setAnalysisStatus("error")
    }
  }, [resumeObject, setAnalysisStatus, setAnalysisResult, appendStreamedText, resetStream, setCurrentStep])

  return { analyze, error }
}