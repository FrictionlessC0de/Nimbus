interface Props {
  improvements: string[]
}

const icons = [
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>,
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
]

const titles = ["Refine the Summary", "Include Missing Keywords", "Format Consistency", "Quantify Achievements", "Action Verbs"]

export default function SuggestionList({ improvements }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
      {improvements.slice(0, 5).map((text, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 shrink-0 mt-0.5">
            {icons[i % icons.length]}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a2b4a] mb-0.5">{titles[i % titles.length]}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}