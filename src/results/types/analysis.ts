export type ScoreGrade = "Excellent" | "Good" | "Fair" | "Needs Work"

export interface SectionScore {
  name: string
  score: number
  feedback: string
}

export interface AnalysisResult {
  overallScore: number
  grade: ScoreGrade
  sections: SectionScore[]
  improvements: string[]
  keywords: string[]
}

export interface ChatMessage {
  id: string
  role: "ai" | "user"
  text: string
  timestamp: Date
}

export type AnalysisStatus = "idle" | "analyzing" | "complete" | "error"