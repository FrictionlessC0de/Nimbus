"use client"
import { useResumeStore } from "@/store/useResumeStore"

export default function StartOverButton() {
  const { reset } = useResumeStore()

  return (
    <button
      onClick={reset}
      className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 py-3 px-5 rounded-xl text-sm font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.17"/>
      </svg>
      Start Over
    </button>
  )
}