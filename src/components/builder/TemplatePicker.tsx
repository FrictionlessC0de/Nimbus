"use client"
import { useResumeStore } from "@/store/useResumeStore"
import { TemplateId } from "@/types"

const templates = [
  {
    id: "classic" as TemplateId,
    name: "Classic",
    badge: "ATS-SAFE",
    badgeColor: "bg-gray-100 text-gray-500",
    description: "The precision curator's choice for corporate roles.",
    preview: (
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 w-28 bg-gray-300 rounded" />
        <div className="h-1.5 w-20 bg-gray-200 rounded" />
        <div className="space-y-1.5 pt-1">
          {[100, 80, 90, 70, 85].map((w, i) => (
            <div key={i} className="h-1.5 bg-gray-200 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-8 w-14 bg-gray-200 rounded" />
          <div className="h-8 w-14 bg-gray-200 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: "modern" as TemplateId,
    name: "Modern",
    badge: "SIDEBAR",
    badgeColor: "bg-gray-100 text-gray-500",
    description: "Clean split for hierarchy and skills focus.",
    preview: (
      <div className="flex h-full">
        <div className="w-2/5 bg-gray-200 p-2.5 space-y-2">
          <div className="w-8 h-8 bg-gray-300 rounded mx-auto" />
          <div className="space-y-1">
            {[70, 50, 60].map((w, i) => (
              <div key={i} className="h-1.5 bg-gray-300 rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="flex-1 p-2.5 space-y-1.5">
          {[90, 65, 80, 55, 70].map((w, i) => (
            <div key={i} className="h-1.5 bg-gray-200 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "minimal" as TemplateId,
    name: "Minimal",
    badge: "PURE",
    badgeColor: "bg-gray-100 text-gray-500",
    description: "Distraction-free focus on your expertise.",
    preview: (
      <div className="p-5 space-y-3">
        <div className="text-center space-y-1.5">
          <div className="h-2 w-20 bg-gray-200 rounded mx-auto" />
          <div className="h-1.5 w-28 bg-gray-100 rounded mx-auto" />
        </div>
        <div className="border-t border-gray-100 pt-3 space-y-1.5">
          {[85, 65, 75, 55, 70].map((w, i) => (
            <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "creative" as TemplateId,
    name: "Creative",
    badge: "DYNAMIC",
    badgeColor: "bg-purple-100 text-purple-600",
    description: "Stand out in high-impact creative roles.",
    preview: (
      <div className="p-4 space-y-3">
        <div className="flex gap-2 items-start">
          <div className="w-12 h-9 bg-[#1a4b8c] rounded" />
          <div className="w-9 h-9 bg-gray-200 rounded" />
        </div>
        <div className="space-y-1.5">
          {[90, 70, 80, 60, 75].map((w, i) => (
            <div key={i} className="h-1.5 bg-gray-100 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    ),
  },
]

export default function TemplatePicker() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore()

  return (
    <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
      {templates.map((t) => {
        const isSelected = selectedTemplate === t.id
        return (
          <div
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`relative cursor-pointer rounded-xl border-2 transition-all overflow-hidden ${
              isSelected
                ? "border-[#1a4b8c] shadow-md"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            {/* Checkmark */}
            {isSelected && (
              <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-[#1a4b8c] rounded-full flex items-center justify-center shadow">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            {/* Preview area */}
            <div className="h-44 bg-[#f0f4f8] overflow-hidden">
              {t.preview}
            </div>

            {/* Info */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-[#1a2b4a]">{t.name}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider ${t.badgeColor}`}>
                  {t.badge}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{t.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}