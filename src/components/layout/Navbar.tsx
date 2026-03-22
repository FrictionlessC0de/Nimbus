"use client"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [active, setActive] = useState("Home")
  const links = ["Home", "How it works", "Features", "Templates"]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-[#1a2b4a] font-semibold text-base tracking-tight">
          ResumeAI
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`text-sm transition-colors ${
                active === link
                  ? "text-[#1a6b7c] border-b-2 border-[#1a6b7c] pb-0.5 font-medium"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {link}
            </button>
          ))}
        </div>
        <Link
          href="/sign-up"
          className="bg-[#1a2b4a] text-white text-sm px-4 py-2 rounded-md hover:bg-[#243a61] transition-colors font-medium"
        >
          Get Started
        </Link>
      </div>
    </nav>
  )
}