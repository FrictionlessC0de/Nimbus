"use client"
import { useEffect, useState } from "react"
import { SectionScore } from "@/types"

interface Props {
  sections: SectionScore[]
}

interface Message {
  id: string
  role: "ai" | "user"
  text: string
}

const BotIcon = () => (
  <div className="w-8 h-8 bg-[#1a4b8c]/10 rounded-lg flex items-center justify-center shrink-0">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a4b8c" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <line x1="12" y1="15" x2="12" y2="17"/>
    </svg>
  </div>
)

export default function ChatFeed({ sections }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const feedback = sections?.[0]?.feedback || "Your experience section is strong, but try to use more action verbs like 'Architected' or 'Optimized' to emphasize impact."

    const msgs: Message[] = [
      {
        id: "1",
        role: "ai",
        text: "I've completed the scan of your resume. Your technical skills are exceptionally well-presented, particularly in the frontend domain.",
      },
      {
        id: "2",
        role: "user",
        text: "How can I improve my experience section score?",
      },
      {
        id: "3",
        role: "ai",
        text: feedback,
      },
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < msgs.length) {
        const msg = msgs[i]
        if (msg) setMessages((prev) => [...prev, msg])
        i++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [sections])

  return (
    <div className="p-4 space-y-4 min-h-[280px] max-h-[360px] overflow-y-auto">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <BotIcon />
        <div>
          <p className="text-sm font-semibold text-[#1a2b4a]">Precision Assistant</p>
          <p className="text-xs text-gray-400">Analyzing content patterns...</p>
        </div>
      </div>

      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-3"}`}>
          {msg.role === "ai" && <BotIcon />}
          <div
            className={`max-w-xs rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
              msg.role === "ai"
                ? "bg-gray-50 text-gray-700 rounded-tl-none"
                : "bg-[#1a4b8c] text-white rounded-tr-none"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}

      {isTyping && (
        <div className="flex items-center gap-3">
          <BotIcon />
          <div className="bg-gray-50 rounded-xl rounded-tl-none px-4 py-3 flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}