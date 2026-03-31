"use client"
import { useState } from "react"
import { useResumeStore } from "@/store/useResumeStore"
import { ExperienceEntry } from "@/types"
import { generateId } from "@/lib/utils"

const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a4b8c] focus:ring-1 focus:ring-[#1a4b8c] transition-colors bg-gray-50"
const labelClass = "text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5"

export default function FormStepExperience() {
  const { formData, setFormData } = useResumeStore()
  const [entries, setEntries] = useState<ExperienceEntry[]>(
    formData.experience?.length ? formData.experience : [{ id: generateId(), jobTitle: "", company: "", startDate: "", endDate: "", current: false, description: "" }]
  )

  const update = (id: string, field: keyof ExperienceEntry, value: string | boolean) => {
    const updated = entries.map((e) => e.id === id ? { ...e, [field]: value } : e)
    setEntries(updated)
    setFormData({ experience: updated })
  }

  const addEntry = () => {
    const updated = [...entries, { id: generateId(), jobTitle: "", company: "", startDate: "", endDate: "", current: false, description: "" }]
    setEntries(updated)
    setFormData({ experience: updated })
  }

  const removeEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id)
    setEntries(updated)
    setFormData({ experience: updated })
  }

  return (
    <div>
      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Step 2.2</p>
      <h2 className="text-2xl font-bold text-[#1a2b4a] mb-1">Work Experience</h2>
      <p className="text-sm text-gray-500 mb-6">Add your most recent roles first.</p>
      <div className="space-y-6">
        {entries.map((entry, i) => (
          <div key={entry.id} className="border border-gray-100 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Role {i + 1}</span>
              {entries.length > 1 && (
                <button onClick={() => removeEntry(entry.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Job Title</label>
                <input value={entry.jobTitle} onChange={(e) => update(entry.id, "jobTitle", e.target.value)} className={inputClass} placeholder="e.g. Product Designer" />
              </div>
              <div>
                <label className={labelClass}>Company</label>
                <input value={entry.company} onChange={(e) => update(entry.id, "company", e.target.value)} className={inputClass} placeholder="e.g. Acme Corp" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Start Date</label>
                <input value={entry.startDate} onChange={(e) => update(entry.id, "startDate", e.target.value)} className={inputClass} placeholder="Jan 2022" />
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input value={entry.endDate} onChange={(e) => update(entry.id, "endDate", e.target.value)} className={inputClass} placeholder="Dec 2023" disabled={entry.current} />
              </div>
              <div className="flex items-end pb-2.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={entry.current} onChange={(e) => update(entry.id, "current", e.target.checked)} className="accent-[#1a4b8c]" />
                  <span className="text-xs text-gray-500">Currently here</span>
                </label>
              </div>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea value={entry.description} onChange={(e) => update(entry.id, "description", e.target.value)} className={`${inputClass} min-h-[80px] resize-none`} placeholder="Describe your key responsibilities and achievements..." />
            </div>
          </div>
        ))}
        <button onClick={addEntry} className="flex items-center gap-2 text-sm text-[#1a4b8c] font-medium hover:text-[#153d73] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add another role
        </button>
      </div>
    </div>
  )
}