"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useResumeStore } from "@/store/useResumeStore"
import { personalInfoSchema, PersonalInfoInput } from "@/lib/validations/resume"

const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#1a4b8c] focus:ring-1 focus:ring-[#1a4b8c] transition-colors bg-gray-50"
const labelClass = "text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5"

export default function FormStepPersonal() {
  const { formData, setFormData } = useResumeStore()

  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: formData.personal,
  })

  const onBlur = (field: string, value: string) => {
    setFormData({ personal: { ...formData.personal as any, [field]: value } })
  }

  return (
    <form id="personal-form">
      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Step 2.1</p>
      <h2 className="text-2xl font-bold text-[#1a2b4a] mb-1">Personal Info</h2>
      <p className="text-sm text-gray-500 mb-6">Let's start with your basics. This information will appear at the top of your resume.</p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input {...register("fullName")} onBlur={(e) => onBlur("fullName", e.target.value)} className={inputClass} placeholder="e.g. Alexander Sterling" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Job Title</label>
            <input {...register("jobTitle")} onBlur={(e) => onBlur("jobTitle", e.target.value)} className={inputClass} placeholder="e.g. Senior Product Designer" />
            {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Email Address</label>
            <input {...register("email")} onBlur={(e) => onBlur("email", e.target.value)} type="email" className={inputClass} placeholder="alex@example.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input {...register("phone")} onBlur={(e) => onBlur("phone", e.target.value)} className={inputClass} placeholder="+1 (555) 000-0000" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input {...register("location")} onBlur={(e) => onBlur("location", e.target.value)} className={inputClass} placeholder="San Francisco, CA" />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>
        </div>
        <div>
          <label className={labelClass}>LinkedIn URL</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <input {...register("linkedin")} onBlur={(e) => onBlur("linkedin", e.target.value)} className={`${inputClass} pl-8`} placeholder="linkedin.com/in/alexsterling" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={labelClass} style={{ marginBottom: 0 }}>Professional Summary</label>
            <span className="text-[9px] font-bold tracking-widest text-gray-400 bg-gray-100 px-2 py-0.5 rounded">AI TIP: KEEP IT UNDER 300 WORDS</span>
          </div>
          <textarea {...register("summary")} onBlur={(e) => onBlur("summary", e.target.value)} className={`${inputClass} min-h-[120px] resize-none`} placeholder="Highlight your key achievements and career goals..." />
          {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary.message}</p>}
        </div>
      </div>
    </form>
  )
}