"use client"
import { useState } from "react"
import { useResumeStore } from "@/store/useResumeStore"
import FormStepPersonal from "./FormStepPersonal"
import FormStepExperience from "./FormStepExperience"
import FormStepEducation from "./FormStepEducation"
import UploadPanel from "./UploadPanel"

type Mode = "form" | "upload"
type SubStep = 1 | 2 | 3

const sidebarItems = [
  { id: 1, label: "CONTACT", icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )},
  { id: 2, label: "EXPERIENCE", icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  )},
  { id: 3, label: "EDUCATION", icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  )},
  { id: 4, label: "SKILLS", icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  )},
  { id: 5, label: "FINISH", icon: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )},
]

export default function StepForm() {
  const [mode, setMode] = useState<Mode>("form")
  const [subStep, setSubStep] = useState<SubStep>(1)
  const { setCurrentStep } = useResumeStore()

  const progress = Math.round(((subStep - 1) / 3) * 100) + 20

  return (
    <div className="flex min-h-[calc(100vh-112px)]">
      {/* Sidebar */}
      <div className="w-52 bg-white border-r border-gray-200 flex flex-col py-6 px-4 shrink-0">
        <div className="mb-6">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Resume Builder</p>
          <p className="text-xs text-[#1a4b8c] font-semibold mt-0.5">{progress}% COMPLETE</p>
          <div className="h-1 bg-gray-100 rounded-full mt-2">
            <div className="h-1 bg-[#1a4b8c] rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const isActive = item.id === subStep
            const isComplete = item.id < subStep
            return (
              <button
                key={item.id}
                onClick={() => item.id <= subStep && setSubStep(item.id as SubStep)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-[#f0f4f8] text-[#1a4b8c]"
                    : isComplete
                    ? "text-gray-500 hover:bg-gray-50"
                    : "text-gray-300 cursor-not-allowed"
                }`}
              >
                <span className={isActive ? "text-[#1a4b8c]" : isComplete ? "text-gray-400" : "text-gray-200"}>
                  {item.icon}
                </span>
                <span className="text-[11px] font-bold tracking-widest">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <button className="w-full bg-[#1a4b8c] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#153d73] transition-colors">
            Preview PDF
          </button>
          <div className="flex gap-3 px-1">
            <button className="text-gray-400 hover:text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-[#f8fafc]">
        {/* Mode tabs */}
        <div className="flex justify-center pt-6 px-6">
          <div className="flex bg-white border border-gray-200 rounded-lg p-1 gap-1">
            <button
              onClick={() => setMode("form")}
              className={`px-8 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === "form" ? "bg-[#1a4b8c] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Fill in form
            </button>
            <button
              onClick={() => setMode("upload")}
              className={`px-8 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === "upload" ? "bg-[#1a4b8c] text-white" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upload PDF
            </button>
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 px-6 py-6">
          {mode === "upload" ? (
            <UploadPanel />
          ) : (
            <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Sub-step dots */}
              <div className="flex justify-end px-6 pt-4 gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 w-6 rounded-full transition-colors ${
                      s <= subStep ? "bg-[#1a4b8c]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <div className="p-6">
                {subStep === 1 && <FormStepPersonal />}
                {subStep === 2 && <FormStepExperience />}
                {subStep === 3 && <FormStepEducation />}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <button
                  onClick={() => subStep === 1 ? setCurrentStep(1) : setSubStep((s) => (s - 1) as SubStep)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                  </svg>
                  {subStep === 1 ? "Back to Template" : "Back"}
                </button>
                <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  Save Draft
                </button>
                <button
                  onClick={() => subStep < 3 ? setSubStep((s) => (s + 1) as SubStep) : setCurrentStep(3)}
                  className="flex items-center gap-2 bg-[#1a4b8c] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#153d73] transition-colors"
                >
                  {subStep === 3 ? "Analyze Resume" : `Next: ${["Experience", "Education & Skills"][subStep - 1]}`}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AI tip cards */}
        <div className="grid grid-cols-2 gap-4 px-6 pb-6 max-w-3xl mx-auto w-full">
          <div className="bg-white border-l-4 border-[#1a4b8c] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a4b8c" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span className="text-xs font-bold text-[#1a2b4a]">AI Suggestion</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Including a clear job title helps our analysis engine match your skills with specific industry standards.
            </p>
          </div>
          <div className="bg-white border-l-4 border-[#1a4b8c] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a4b8c" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <span className="text-xs font-bold text-[#1a2b4a]">Data Precision</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your profile completion score is currently 60%. Add your professional summary to reach 75%.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}