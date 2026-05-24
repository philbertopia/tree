"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SeedChat } from "@/components/assistant/SeedChat";
import { SeedFlightOrb } from "@/components/assistant/SeedFlightOrb";
import type { SeedMessage, SeedPrompt } from "@/components/assistant/types";

const widgetPrompts: SeedPrompt[] = [
  { label: "Map automation", prompt: "I want to map my first useful AI automation." },
  { label: "Dashboard idea", prompt: "What kind of dashboard could help my business?" },
  { label: "Lead follow-up", prompt: "How could AI help with lead follow-up?" }
];

const initialMessages: SeedMessage[] = [
  {
    id: "seed-widget-greeting",
    role: "assistant",
    content: "Hi, I'm Seed. Want help mapping your first AI system?"
  }
];

export function SeedWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [arriving, setArriving] = useState(false);
  const [settled, setSettled] = useState(false);
  const [landing, setLanding] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);
  const arrivalTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (arrivalTimerRef.current) window.clearTimeout(arrivalTimerRef.current);
    };
  }, []);

  if (pathname === "/demo/ai-systems-planner") return null;

  function openSeed() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setOpen(true);
    setSettled(false);

    if (reduced) {
      setArriving(false);
      setSettled(true);
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const rect = avatarRef.current?.getBoundingClientRect();
        const targetX = rect ? rect.left + rect.width / 2 : window.innerWidth - 296;
        const targetY = rect ? rect.top + rect.height / 2 : window.innerHeight - 438;

        setLanding({ x: targetX, y: targetY });
        setArriving(true);
        arrivalTimerRef.current = window.setTimeout(() => {
          setArriving(false);
          setSettled(true);
        }, 5200);
      });
    });
  }

  function closeSeed() {
    if (arrivalTimerRef.current) window.clearTimeout(arrivalTimerRef.current);
    setOpen(false);
    setArriving(false);
    setSettled(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-5 sm:right-5">
      <SeedFlightOrb active={arriving} landingX={landing.x} landingY={landing.y} />
      {open ? (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm animate-[seed-widget-arrive_520ms_ease-out_both]">
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={closeSeed}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#050505]/90 text-gray-300 shadow-xl shadow-black/40 backdrop-blur-xl transition hover:text-white"
              aria-label="Close Seed chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <SeedChat
            variant="widget"
            initialMessages={initialMessages}
            starterPrompts={widgetPrompts}
            showHeaderOrb={settled}
            avatarRef={avatarRef}
            className={arriving ? "opacity-92" : undefined}
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => (open ? closeSeed() : openSeed())}
        className="group relative ml-auto flex min-h-14 items-center gap-3 overflow-hidden rounded-full border border-tree-green/25 bg-[#050505]/88 px-4 py-2 text-left shadow-2xl shadow-black/45 backdrop-blur-xl transition hover:border-tree-green/45 hover:bg-[#07110c] sm:min-h-16 sm:px-5"
        aria-label={open ? "Close Seed chat" : "Open Seed chat"}
      >
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(74,222,128,0.18),transparent_36%),radial-gradient(circle_at_80%_50%,rgba(103,232,249,0.12),transparent_34%)] opacity-60 transition group-hover:opacity-100" />
        <span className="hidden sm:block">
          <span className="relative block text-sm font-bold text-white">Ask Seed</span>
          <span className="relative block text-xs text-gray-400">AI systems planner</span>
        </span>
        <MessageCircle className="relative h-4 w-4 text-tree-green sm:hidden" />
      </button>
    </div>
  );
}
