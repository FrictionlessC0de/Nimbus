import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-[#f0f4f8] to-white text-center px-6">
      <div className="max-w-2xl mx-auto">
        <span className="inline-block text-[10px] tracking-widest font-semibold text-[#1a6b7c] border border-[#1a6b7c]/30 bg-[#1a6b7c]/5 px-3 py-1 rounded-full mb-6 uppercase">
          Precision Intelligence
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-[#1a2b4a] leading-tight mb-6">
          Build a resume that<br />gets you hired
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md mx-auto">
          Get AI-powered feedback, a score, and download a beautiful resume
          in minutes. No more guesswork, just data-driven success.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/build"
            className="bg-[#1a2b4a] text-white px-7 py-3 rounded-md font-medium hover:bg-[#243a61] transition-colors text-sm"
          >
            Analyze My Resume
          </Link>
          <Link
            href="#templates"
            className="border border-gray-300 text-gray-700 px-7 py-3 rounded-md font-medium hover:border-gray-400 transition-colors text-sm bg-white"
          >
            See Templates
          </Link>
        </div>
      </div>
    </section>
  )
}