"use client"
import OverallScoreBadge from "./OverallScoreBadge"
import ScoreCard from "./ScoreCard"
import KeywordTags from "./KeywordTags"
import ChatFeed from "./ChatFeed"
import SuggestionList from "./SuggestionList"
import DownloadButton from "./DownloadButton"
import StartOverButton from "./StartOverButton"
import { AnalysisResult } from "@/types"

interface ResultsPanelProps {
  result: AnalysisResult
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Analysis Complete</p>
        <h1 className="text-3xl font-bold text-[#1a2b4a]">Your Resume Analysis is Ready.</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          {/* Score + breakdown card */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-8 flex flex-col items-center border-b border-gray-100">
              <OverallScoreBadge score={result.overallScore} grade={result.grade} />
            </div>
            <div className="p-6">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Score Breakdown</p>
              <ScoreCard sections={result.sections} />
            </div>
            {/* Download + Start Over */}
            <div className="px-6 pb-6 flex gap-3">
              <DownloadButton />
              <StartOverButton />
            </div>
            {/* Keywords */}
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Keywords Detected</p>
              <KeywordTags keywords={result.keywords} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Chat feed */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <ChatFeed sections={result.sections} />
            {/* Ask input */}
            <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-3">
              <input
                className="flex-1 text-sm text-gray-600 placeholder-gray-300 focus:outline-none bg-transparent"
                placeholder="Ask AI for more details..."
              />
              <button className="text-[#1a4b8c] hover:text-[#153d73] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <SuggestionList improvements={result.improvements} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm font-bold text-[#1a2b4a]">Precision Curator AI</p>
        <div className="flex gap-6 text-xs text-gray-400">
          {["Privacy Policy", "Terms of Service", "Support", "Feedback"].map((l) => (
            <a key={l} href="#" className="hover:text-gray-600 transition-colors">{l}</a>
          ))}
        </div>
        <p className="text-xs text-gray-400">© 2024 Precision Curator AI. All rights reserved.</p>
      </footer>
    </div>
  )
}