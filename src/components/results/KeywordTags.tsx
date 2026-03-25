interface Props {
  keywords: string[]
}

export default function KeywordTags({ keywords }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((kw) => (
        <span
          key={kw}
          className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:border-[#1a4b8c] hover:text-[#1a4b8c] transition-colors cursor-default"
        >
          {kw}
        </span>
      ))}
    </div>
  )
}