"use client"
import { useState, useCallback } from "react"

export default function UploadPanel() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.type === "application/pdf") setFile(dropped)
  }, [])

  return (
    <div className="max-w-3xl mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-xl p-16 text-center transition-colors ${
          isDragging ? "border-[#1a4b8c] bg-[#f0f4f8]" : "border-gray-200 bg-white hover:border-gray-300"
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
          <>
            <p className="text-sm font-semibold text-[#1a2b4a] mb-1">{file.name}</p>
            <button onClick={() => setFile(null)} className="text-xs text-gray-400 hover:text-red-400">Remove</button>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-600 mb-1">Drag your resume PDF here</p>
            <p className="text-xs text-gray-400">
              or{" "}
              <label className="text-[#1a4b8c] cursor-pointer hover:underline">
                click to browse
                <input type="file" accept=".pdf" className="hidden" onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) setFile(f)
                }} />
              </label>
            </p>
            <p className="text-xs text-gray-300 mt-3">PDF only · max 5MB</p>
          </>
        )}
      </div>
      {file && (
        <button className="w-full mt-4 bg-[#1a4b8c] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#153d73] transition-colors">
          Analyze Resume
        </button>
      )}
    </div>
  )
}