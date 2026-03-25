"use client"
import { useState } from "react"
import { generateId } from "@/lib/utils"

const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a4b8c] focus:ring-1 focus:ring-[#1a4b8c] transition-colors bg-gray-50"
const labelClass = "text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5"

export default function FormStepEducation() {
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i))

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
              <input className={inputClass} placeholder="e.g. B.S. Computer Science" />
            </div>
            <div>
              <label className={labelClass}>Institution</label>
              <input className={inputClass} placeholder="e.g. MIT" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Graduation Year</label>
              <input className={inputClass} placeholder="e.g. 2020" />
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
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-300 focus:outline-none"
              placeholder="Type a skill and press Enter..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}