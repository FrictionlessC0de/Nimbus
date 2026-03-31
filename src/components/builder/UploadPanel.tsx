"use client"
import { useState, useCallback } from "react"
import { useResumeStore } from "@/store/useResumeStore"
import { useResumeAnalysis } from "@/hooks/useResumeAnalysis"
import { normalizeFromPDF } from "@/lib/normalizeResume"

export default function UploadPanel() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isParsing, setIsParsing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { selectedTemplate, setResumeObject, analysisStatus } = useResumeStore()
  const { analyze } = useResumeAnalysis()

  const isAnalyzing = analysisStatus === "analyzing"

  const handleFile = useCallback((dropped: File) => {
    if (dropped.type !== "application/pdf") {
      setError("Only PDF files are accepted")
      return
    }
    if (dropped.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB")
      return
    }
    setError(null)
    setFile(dropped)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }, [handleFile])

  const handleAnalyze = async () => {
    if (!file || !selectedTemplate) return

    setIsParsing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to parse PDF")
      }

      const resume = normalizeFromPDF(data.text, selectedTemplate)
      setResumeObject(resume)
      setIsParsing(false)
      await analyze(resume)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process PDF")
      setIsParsing(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-xl p-16 text-center transition-colors ${
          isDragging
            ? "border-[#1a4b8c] bg-[#f0f4f8]"
            : file
            ? "border-[#1a4b8c] bg-[#f0f4f8]/50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a4b8c" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>

        {file ? (
          <div>
            <p className="text-sm font-semibold text-[#1a2b4a] mb-1">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
            <button
              onClick={() => { setFile(null); setError(null) }}
              className="text-xs text-red-400 hover:text-red-500 mt-2 transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Drag your resume PDF here
            </p>
            <p className="text-xs text-gray-400">
              or{" "}
              <label className="text-[#1a4b8c] cursor-pointer hover:underline">
                click to browse
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handleFile(f)
                  }}
                />
              </label>
            </p>
            <p className="text-xs text-gray-300 mt-3">PDF only · max 5MB</p>
          </>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {file && (
        <button
          onClick={handleAnalyze}
          disabled={isParsing || isAnalyzing}
          className="w-full bg-[#1a4b8c] text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-[#153d73] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isParsing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Parsing PDF...
            </>
          ) : isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Analyze Resume
            </>
          )}
        </button>
      )}
    </div>
  )
}