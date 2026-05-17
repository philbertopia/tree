"use client";

import { useEffect, useState } from "react";
import { terminalLines } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";

export function TerminalPanel() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisibleLines(terminalLines);
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      setVisibleLines(terminalLines.slice(0, index + 1));
      index = (index + 1) % terminalLines.length;
      if (index === 0) {
        window.setTimeout(() => setVisibleLines([]), 900);
      }
    }, 850);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <GlassCard className="min-h-[420px] overflow-hidden bg-black/45 font-mono" aria-label="Fake terminal panel">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green">TREE Agent v1.0</span>
        <span className="h-2 w-2 rounded-full bg-tree-green shadow-glow" />
      </div>
      <div className="space-y-3 text-sm leading-6 text-gray-400">
        {visibleLines.map((line, index) => (
          <p key={`${line}-${index}`} className={line.startsWith("$") ? "text-white" : "text-tree-green/80"}>
            {line}
          </p>
        ))}
        <span className="inline-block h-5 w-2 animate-pulseGlow bg-tree-green align-middle" />
      </div>
    </GlassCard>
  );
}
