import { useState, useCallback } from "react"
import { useResumeStore } from "@/store/useResumeStore"

export function usePDFDownload() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { resumeObject } = useResumeStore()

  const download = useCallback(async () => {
    if (!resumeObject) {
      setError("No resume data found")
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resumeObject }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to generate PDF")
      }

      // Convert response to blob and trigger download
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `resume-${resumeObject.templateId}-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download PDF")
    } finally {
      setIsGenerating(false)
    }
  }, [resumeObject])

  return { download, isGenerating, error }
}