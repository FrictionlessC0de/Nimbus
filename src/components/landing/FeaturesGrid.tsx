export default function FeaturesGrid() {
  return (
    <section className="py-20 px-6 bg-[#f8f9fb]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Resume Score */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#1a2b4a] mb-5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1a2b4a] mb-2">AI Resume Score</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            A data-driven evaluation of your resume's strength relative to industry benchmarks and job descriptions.
          </p>
          <div className="bg-[#1a2b4a] rounded-xl p-4 h-24 flex items-end gap-1">
            {[40, 65, 55, 80, 70, 90, 75, 85, 95, 80, 88, 92].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-white/20 rounded-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Smart Suggestions */}
        <div className="bg-[#1a4060] rounded-2xl p-8 text-white">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Smart Suggestions</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Powered by Claude AI, get surgical edits for your bullet points to emphasize impact over tasks.
          </p>
          <div className="border-l-2 border-[#1a6b7c] pl-4">
            <p className="text-xs text-[#7dd4e8] italic leading-relaxed">
              "Change 'managed a team' to 'Directed a multidisciplinary squad of 12, increasing output by 22%'"
            </p>
          </div>
        </div>

        {/* Beautiful Templates */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 md:col-span-2">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#1a2b4a] mb-5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1a2b4a] mb-2">Beautiful Templates</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            4 PDF-ready designs that bypass ATS filters and catch recruiter attention with minimalist editorial aesthetics.
          </p>
        </div>
      </div>
    </section>
  )
}