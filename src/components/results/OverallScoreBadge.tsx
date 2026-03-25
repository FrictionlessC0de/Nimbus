import { ScoreGrade } from "@/types"

interface Props {
  score: number
  grade: ScoreGrade
}

export default function OverallScoreBadge({ score, grade }: Props) {
  const radius = 70
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const progress = (score / 100) * circumference
  const offset = circumference - progress

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <svg width="176" height="176" viewBox="0 0 176 176">
          {/* Background circle */}
          <circle
            cx="88" cy="88"
            r={normalizedRadius}
            fill="none"
            stroke="#f0f4f8"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <circle
            cx="88" cy="88"
            r={normalizedRadius}
            fill="none"
            stroke="#1a4b8c"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            transform="rotate(-90 88 88)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-[#1a2b4a]">{score}</span>
          <span className="text-xs text-gray-400">of 100</span>
        </div>
      </div>
      <p className="text-base font-semibold text-[#1a2b4a] mt-3">Overall Score</p>
      <span className="mt-1.5 text-xs font-bold tracking-widest bg-gray-100 text-gray-600 px-3 py-1 rounded-full uppercase">
        {grade}
      </span>
    </div>
  )
}