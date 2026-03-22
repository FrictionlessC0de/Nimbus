const templates = [
  {
    id: "classic",
    name: "Classic",
    subtitle: "TIMELESS AUTHORITY",
    bg: "bg-gray-50",
    preview: (
      <div className="p-4 space-y-2">
        <div className="h-3 w-16 bg-gray-300 rounded" />
        <div className="h-2 w-24 bg-gray-200 rounded" />
        <div className="border-t border-gray-200 pt-2 space-y-1.5">
          {[80, 60, 70, 50, 65].map((w, i) => (
            <div key={i} className="h-1.5 bg-gray-200 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "modern",
    name: "Modern",
    subtitle: "TECH FORWARD",
    bg: "bg-slate-100",
    preview: (
      <div className="flex h-full">
        <div className="w-1/3 bg-slate-300 p-2 space-y-2">
          <div className="w-8 h-8 bg-slate-400 rounded-full mx-auto" />
          {[50, 70, 40].map((w, i) => (
            <div key={i} className="h-1.5 bg-slate-400 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex-1 p-3 space-y-1.5">
          {[90, 60, 75, 50].map((w, i) => (
            <div key={i} className="h-1.5 bg-slate-200 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    subtitle: "PURE FOCUS",
    bg: "bg-white",
    preview: (
      <div className="p-4 space-y-3">
        <div className="text-center space-y-1">
          <div className="h-2 w-20 bg-gray-200 rounded mx-auto" />
          <div className="h-1.5 w-28 bg-gray-100 rounded mx-auto" />
        </div>
        <p className="text-[8px] text-center text-gray-300 tracking-widest">MINIMAL · MINIMAL · SAFE FORWARD</p>
        <div className="space-y-1.5">
          {[85, 60, 70].map((w, i) => (
            <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "creative",
    name: "Creative",
    subtitle: "DISTINCT VOICE",
    bg: "bg-[#1a2b4a]",
    preview: (
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="h-2 w-16 bg-white/30 rounded" />
            <div className="h-1.5 w-20 bg-white/20 rounded" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-full" />
        </div>
        <div className="space-y-1.5 pt-2">
          {[70, 90, 55, 75].map((w, i) => (
            <div key={i} className="h-1.5 bg-white/20 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
]

export default function TemplateShowcase() {
  return (
    <section id="templates" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Curation</p>
            <h2 className="text-2xl font-bold text-[#1a2b4a]">Choose your style</h2>
          </div>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Every template is rigorously tested against Applicant Tracking Systems to ensure your resume never gets lost.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((t) => (
            <div key={t.id} className="group cursor-pointer">
              <div className={`${t.bg} rounded-xl border border-gray-100 overflow-hidden h-48 mb-3 group-hover:shadow-md transition-shadow`}>
                {t.preview}
              </div>
              <p className="text-sm font-semibold text-[#1a2b4a]">{t.name}</p>
              <p className="text-[10px] text-gray-400 tracking-widest font-medium">{t.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}