export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <p className="text-sm font-semibold text-[#1a2b4a]">ResumeAI</p>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">Precision Curated Career Analysis</p>
        </div>
        <div className="flex flex-wrap gap-6 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600 transition-colors uppercase tracking-wider">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600 transition-colors uppercase tracking-wider">Terms of Service</a>
          <a href="#" className="hover:text-gray-600 transition-colors uppercase tracking-wider">Contact</a>
          <a href="#" className="hover:text-gray-600 transition-colors uppercase tracking-wider">LinkedIn</a>
        </div>
        <p className="text-xs text-gray-400">© 2024 RESUMEAI. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}