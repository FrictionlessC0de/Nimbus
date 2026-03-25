import { SectionScore } from "@/types"

interface Props {
  sections: SectionScore[]
}

export default function ScoreCard({ sections }: Props) {
  return (
    <div className="space-y-4">
      {sections.map((s) => (
        <div key={s.name}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-gray-700 font-medium">{s.name}</span>
            <span className="text-sm font-semibold text-gray-500">{s.score}/100</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div
              className="h-1.5 bg-[#1a4b8c] rounded-full transition-all"
              style={{ width: `${s.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}