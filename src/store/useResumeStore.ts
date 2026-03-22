import { create } from "zustand"
import { devtools } from "zustand/middleware"
import {
  TemplateId,
  ResumeObject,
  ResumeFormData,
  AnalysisResult,
  AnalysisStatus,
} from "@/types"

interface ResumeStore {
  // Step tracking
  currentStep: 1 | 2 | 3
  setCurrentStep: (step: 1 | 2 | 3) => void

  // Template
  selectedTemplate: TemplateId | null
  setSelectedTemplate: (id: TemplateId) => void

  // Resume data
  resumeObject: ResumeObject | null
  setResumeObject: (resume: ResumeObject) => void

  // Form data (persisted between sub-steps)
  formData: Partial<ResumeFormData>
  setFormData: (data: Partial<ResumeFormData>) => void

  // Analysis
  analysisStatus: AnalysisStatus
  analysisResult: AnalysisResult | null
  streamedText: string
  setAnalysisStatus: (status: AnalysisStatus) => void
  setAnalysisResult: (result: AnalysisResult) => void
  appendStreamedText: (text: string) => void
  resetStream: () => void

  // Reset
  reset: () => void
}

const initialState = {
  currentStep: 1 as const,
  selectedTemplate: null,
  resumeObject: null,
  formData: {},
  analysisStatus: "idle" as AnalysisStatus,
  analysisResult: null,
  streamedText: "",
}

export const useResumeStore = create<ResumeStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      setSelectedTemplate: (id) => set({ selectedTemplate: id }),

      setResumeObject: (resume) => set({ resumeObject: resume }),

      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

      setAnalysisStatus: (status) => set({ analysisStatus: status }),

      setAnalysisResult: (result) => set({ analysisResult: result }),

      appendStreamedText: (text) =>
        set((state) => ({ streamedText: state.streamedText + text })),

      resetStream: () => set({ streamedText: "", analysisResult: null }),

      reset: () => set(initialState),
    }),
    { name: "resume-store" }
  )
)