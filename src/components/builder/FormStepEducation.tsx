"use client"
import { useState } from "react"
import { useResumeStore } from "@/store/useResumeStore"
import { EducationEntry } from "@/types"
import { generateId } from "@/lib/utils"

const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a4b8c] focus:ring-1 focus:ring-[#1a4b8c] transition-colors bg-gray-50"
const labelClass = "text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5"

export default function FormStepEducation() {
  const { formData, setFormData } = useResumeStore()
  const [edu, setEdu] = useState<EducationEntry>(
    formData.education?.[0] ?? { id: generateId(), degree: "", institution: "", graduationYear: "" }
  )
  const [skills, setSkills] = useState<string[]>(formData.skills ?? [])
  const [skillInput, setSkillInput] = useState("")

  const updateEdu = (field: keyof EducationEntry, value: string) => {
    const updated = { ...edu, [field]: value }
    setEdu(updated)
    setFormData({ education: [updated], skills })
  }

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      const updated = [...skills, skillInput.trim()]
      setSkills(updated)
      setFormData({ education: [edu], skills: updated })
      setSkillInput("")
    }
  }

  const removeSkill = (i: number) => {
    const updated = skills.filter((_, idx) => idx !== i)
    setSkills(updated)
    setFormData({ education: [edu], skills: updated })
  }

  return (
    <div>
      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Step 2.3</p>
      <h2 className="text-2xl font-bold text-[#1a2b4a] mb-1">Education & Skills</h2>
      <p className="text-sm text-gray-500 mb-6">Add your highest qualification and key skills.</p>
      <div className="space-y-4">
        <div className="border border-gray-100 rounded-xl p-4 space-y-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Education</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Degree</label>
              <input value={edu.degree} onChange={(e) => updateEdu("degree", e.target.value)} className={inputClass} placeholder="e.g. B.S. Computer Science" />
            </div>
            <div>
              <label className={labelClass}>Institution</label>
              <input value={edu.institution} onChange={(e) => updateEdu("institution", e.target.value)} className={inputClass} placeholder="e.g. MIT" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Graduation Year</label>
              <input value={edu.graduationYear} onChange={(e) => updateEdu("graduationYear", e.target.value)} className={inputClass} placeholder="e.g. 2020" />
            </div>
          </div>
        </div>
        <div>
          <label className={labelClass}>Skills</label>
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 min-h-[80px]">
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill, i) => (
                <span key={i} className="flex items-center gap-1 bg-[#1a4b8c]/10 text-[#1a4b8c] text-xs px-2.5 py-1 rounded-full font-medium">
                  {skill}
                  <button onClick={() => removeSkill(i)} className="hover:text-red-500 ml-0.5">×</button>
                </span>
              ))}
            </div>
            <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={addSkill} className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-300 focus:outline-none" placeholder="Type a skill and press Enter..." />
          </div>
        </div>
      </div>
    </div>
  )
}