"use client";

import { useEffect, useState } from "react";
import { Bot, UserRound } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const messages = [
  { from: "user", text: "Can AI help my food truck?" },
  {
    from: "tree",
    text: "Yes, but only in specific places. Start with menu updates, local SEO, social posts, QR campaigns, and customer FAQs."
  },
  { from: "user", text: "What about a law firm?" },
  {
    from: "tree",
    text: "Intake automation, document sorting, and a client FAQ assistant are usually the highest-ROI starting points."
  }
];

export function ChatbotMockup() {
  const [count, setCount] = useState(messages.length);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setCount(1);
    const interval = window.setInterval(() => {
      setCount((current) => (current >= messages.length ? 1 : current + 1));
    }, 1500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <GlassCard tone="violet" className="h-[460px] overflow-hidden">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-tree-violet/15 text-tree-violet">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-white">TREE AI</p>
            <p className="text-xs text-tree-green">scripted preview</p>
          </div>
        </div>
        <span className="h-2 w-2 rounded-full bg-tree-green" />
      </div>
      <div className="h-[350px] overflow-hidden space-y-4">
        {messages.slice(0, count).map((message, index) => (
          <div key={index} className={message.from === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                message.from === "user"
                  ? "max-w-[86%] rounded-2xl rounded-tr-sm bg-white/10 p-4 text-sm text-white"
                  : "max-w-[86%] rounded-2xl rounded-tl-sm border border-tree-violet/25 bg-tree-violet/10 p-4 text-sm leading-6 text-gray-200"
              }
            >
              <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                {message.from === "user" ? <UserRound className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                {message.from === "user" ? "User" : "TREE"}
              </div>
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
