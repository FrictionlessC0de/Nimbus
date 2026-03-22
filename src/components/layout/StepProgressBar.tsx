"use client"

interface Step {
  label: string
  icon: React.ReactNode
}

interface StepProgressBarProps {
  currentStep: 1 | 2 | 3
}

const steps: Step[] = [
  {
    label: "CHOOSE TEMPLATE",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    label: "YOUR INFO",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "RESULTS",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
]

export default function StepProgressBar({ currentStep }: StepProgressBarProps) {
  return (
    <div className="w-full bg-[#f0f4f8] border-b border-gray-200 py-6 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* connecting lines */}
          <div className="absolute left-0 right-0 top-5 flex">
            <div className="flex-1 mx-12">
              <div className={`h-0.5 w-full transition-colors ${currentStep > 1 ? "bg-[#1a4b8c]" : "bg-gray-300"}`} />
            </div>
            <div className="flex-1 mx-12">
              <div className={`h-0.5 w-full transition-colors ${currentStep > 2 ? "bg-[#1a4b8c]" : "bg-gray-300"}`} />
            </div>
          </div>

          {steps.map((step, i) => {
            const stepNum = (i + 1) as 1 | 2 | 3
            const isActive = currentStep === stepNum
            const isComplete = currentStep > stepNum
            return (
              <div key={step.label} className="flex flex-col items-center gap-2 z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isActive
                      ? "bg-[#1a4b8c] border-[#1a4b8c] text-white"
                      : isComplete
                      ? "bg-[#1a4b8c] border-[#1a4b8c] text-white"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-[10px] font-semibold tracking-widest ${
                    isActive ? "text-[#1a4b8c]" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Step indicator bar */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-0.5 w-10 bg-[#1a4b8c] rounded" />
          <span className="text-xs text-gray-500">Step {currentStep} of 3</span>
          <div className={`h-0.5 w-10 rounded ${currentStep > 1 ? "bg-[#1a4b8c]" : "bg-gray-300"}`} />
        </div>
      </div>
    </div>
  )
}