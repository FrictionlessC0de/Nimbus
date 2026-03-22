import { useState, useCallback } from "react"
import { useResumeStore } from "@/store/useResumeStore"
import { normalizeFromPDF } from "@/lib/normalizeResume"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { selectedTemplate, setResumeObject } = useResumeStore()

  const validateFile = (file: File): string | null => {
    if (file.type !== "application/pdf") return "Only PDF files are accepted"
    if (file.size > MAX_FILE_SIZE) return "File size must be under 5MB"
    return null
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const dropped = acceptedFiles[0]
      if (!dropped) return

      const validationError = validateFile(dropped)
      if (validationError) {
        setError(validationError)
        return
      }

      setError(null)
      setFile(dropped)
      setIsLoading(true)

      try {
        // Upload to server for PDF parsing
        const formData = new FormData()
        formData.append("file", dropped)

        const response = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Failed to parse PDF")

        const { text } = await response.json()

        if (!selectedTemplate) throw new Error("No template selected")

        const resume = normalizeFromPDF(text, selectedTemplate)
        setResumeObject(resume)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to process PDF")
        setFile(null)
      } finally {
        setIsLoading(false)
      }
    },
    [selectedTemplate, setResumeObject]
  )

  const clearFile = useCallback(() => {
    setFile(null)
    setError(null)
  }, [])

  return { file, isLoading, error, onDrop, clearFile }
}