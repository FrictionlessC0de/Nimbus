"use client"
import { usePDFDownload } from "@/hooks/usePDFDownload"

export default function DownloadButton() {
  const { download, isGenerating } = usePDFDownload()

  return (
    <button
      onClick={download}
      disabled={isGenerating}
      className="flex-1 flex items-center justify-center gap-2 bg-[#1a4b8c] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#153d73] transition-colors disabled:opacity-60"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      {isGenerating ? "Generating..." : "Download Resume PDF"}
    </button>
  )
}