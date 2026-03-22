const steps = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Pick a template",
    description: "Choose from 4 professional styles designed by industry recruiters to maximize readability and impact.",
    step: "01 / DISCOVERY",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    title: "Add your info",
    description: "Fast-track your application by uploading an existing PDF or filling out our streamlined smart form.",
    step: "02 / INTEGRATION",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Get AI feedback",
    description: "Receive a comprehensive score, targeted suggestions, and download your polished PDF instantly.",
    step: "03 / ANALYSIS",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">Workflow</p>
        <h2 className="text-2xl font-bold text-[#1a2b4a] mb-12">The Precision Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((s) => (
            <div key={s.step}>
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#1a2b4a] mb-5">
                {s.icon}
              </div>
              <h3 className="text-base font-semibold text-[#1a2b4a] mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.description}</p>
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">{s.step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}