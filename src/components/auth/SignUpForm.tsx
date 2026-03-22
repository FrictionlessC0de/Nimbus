"use client"
import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { signUpSchema, SignUpInput } from "@/lib/validations/auth"

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  const levels = [
    { label: "WEAK", color: "bg-red-500", width: "25%" },
    { label: "MEDIUM", color: "bg-amber-600", width: "50%" },
    { label: "STRONG", color: "bg-green-500", width: "75%" },
    { label: "VERY STRONG", color: "bg-green-600", width: "100%" },
  ]
  const s = levels[Math.max(0, score - 1)]
  return (
    <div className="mt-2">
      <p className="text-[10px] font-bold tracking-widest text-amber-700 mb-1">STRENGTH: {s.label}</p>
      <div className="h-1 bg-gray-200 rounded-full">
        <div className={`h-1 rounded-full transition-all ${s.color}`} style={{ width: s.width }} />
      </div>
    </div>
  )
}

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  })

  const password = watch("password", "")

  const onSubmit = async (data: SignUpInput) => {
    if (!agreed) { setError("Please agree to the terms to continue"); return }
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Registration failed")
      await signIn("credentials", { email: data.email, password: data.password, callbackUrl: "/build" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsLoading(false)
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1a4b8c] focus:ring-1 focus:ring-[#1a4b8c] transition-colors bg-gray-50"
  const labelClass = "text-[10px] font-bold tracking-widest text-gray-500 uppercase block mb-1.5"

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-[#1a4b8c]">ResumeAI</Link>
          </div>
          <h1 className="text-2xl font-bold text-[#1a2b4a] text-center mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm text-center mb-8">Start building your perfect resume today.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className={labelClass}>Full Name</label>
              <input {...register("name")} placeholder="John Doe" className={inputClass} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input {...register("email")} type="email" placeholder="name@company.com" className={inputClass} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input {...register("password")} type="password" placeholder="••••••••" className={inputClass} />
              <PasswordStrength password={password} />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Confirm Password</label>
              <input {...register("confirmPassword")} type="password" placeholder="••••••••" className={inputClass} />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 border-gray-300 rounded accent-[#1a4b8c]"
              />
              <label htmlFor="terms" className="text-sm text-gray-500 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-[#1a4b8c] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#1a4b8c] hover:underline">Privacy Policy</Link>
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1a4b8c] text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-[#153d73] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] text-gray-400 tracking-widest font-semibold">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => signIn("google", { callbackUrl: "/build" })}
              className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              onClick={() => signIn("github", { callbackUrl: "/build" })}
              className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#1a4b8c] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
      <footer className="text-center py-4 text-[10px] text-gray-400 tracking-widest uppercase">
        © 2024 ResumeAI. Precision Career Curation.
        <span className="mx-3">·</span>
        <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
        <span className="mx-3">·</span>
        <Link href="/terms" className="hover:text-gray-600">Terms</Link>
        <span className="mx-3">·</span>
        <Link href="/help" className="hover:text-gray-600">Help</Link>
      </footer>
    </div>
  )
}