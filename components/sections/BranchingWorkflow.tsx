"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflowSteps } from "@/lib/data";
import { usePrefersReducedMotion } from "@/components/animation/useGsapReveal";

// ─── Color tokens ─────────────────────────────────────────────────────────────

type Col = "green" | "cyan" | "violet";
const HEX: Record<Col, string> = { green: "#4ade80", cyan: "#67e8f9", violet: "#a78bfa" };
const RGBA: Record<Col, string> = {
  green: "rgba(74,222,128,",
  cyan: "rgba(103,232,249,",
  violet: "rgba(167,139,250,",
};

// ─── Phase metadata ───────────────────────────────────────────────────────────

const PHASE_META = [
  { badge: "Unresolved",    tone: "violet" as Col },
  { badge: "Scanning",      tone: "cyan"   as Col },
  { badge: "Selective",     tone: "cyan"   as Col },
  { badge: "Architectural", tone: "violet" as Col },
  { badge: "Live",          tone: "green"  as Col },
  { badge: "Human-guided",  tone: "violet" as Col },
  { badge: "Optimizing",    tone: "green"  as Col },
];

// ─── Node definitions (viewBox 0 0 100 100) ───────────────────────────────────

interface NodeDef { id: string; cx: number; cy: number; r: number; c: Col; at: number; pulse?: boolean }

const NODES: NodeDef[] = [
  { id: "origin", cx: 50, cy: 50, r: 5,   c: "green",  at: 0, pulse: true },
  { id: "n1a",    cx: 27, cy: 25, r: 3,   c: "green",  at: 1 },
  { id: "n1b",    cx: 73, cy: 25, r: 3,   c: "cyan",   at: 1 },
  { id: "n1c",    cx: 20, cy: 71, r: 2.6, c: "violet", at: 1 },
  { id: "n1d",    cx: 80, cy: 71, r: 2.6, c: "green",  at: 1 },
  { id: "n2a",    cx: 10, cy: 46, r: 3.4, c: "cyan",   at: 2 },
  { id: "n2b",    cx: 90, cy: 46, r: 3.4, c: "violet", at: 2 },
  { id: "n2c",    cx: 38, cy: 10, r: 2.4, c: "green",  at: 2 },
  { id: "n2d",    cx: 62, cy: 10, r: 2.4, c: "cyan",   at: 2 },
  { id: "n3a",    cx: 50, cy: 86, r: 3,   c: "violet", at: 3 },
  { id: "n3b",    cx: 33, cy: 76, r: 2.1, c: "green",  at: 3 },
  { id: "n3c",    cx: 67, cy: 76, r: 2.1, c: "green",  at: 3 },
  { id: "n4a",    cx: 15, cy: 24, r: 1.9, c: "cyan",   at: 4 },
  { id: "n4b",    cx: 85, cy: 24, r: 1.9, c: "violet", at: 4 },
  { id: "n4c",    cx: 50, cy: 5,  r: 2.4, c: "green",  at: 4 },
  { id: "n5a",    cx: 36, cy: 50, r: 1.8, c: "violet", at: 5 },
  { id: "n5b",    cx: 64, cy: 50, r: 1.8, c: "violet", at: 5 },
  { id: "n6a",    cx: 50, cy: 94, r: 1.5, c: "green",  at: 6 },
  { id: "n6b",    cx: 6,  cy: 63, r: 1.4, c: "cyan",   at: 6 },
  { id: "n6c",    cx: 94, cy: 63, r: 1.4, c: "cyan",   at: 6 },
];

// ─── Connection paths ─────────────────────────────────────────────────────────

interface ConnDef { id: string; d: string; c: Col; at: number }

const CONNS: ConnDef[] = [
  { id: "c1a", d: "M50,50 C38,40 30,30 27,25",  c: "green",  at: 1 },
  { id: "c1b", d: "M50,50 C62,40 70,30 73,25",  c: "cyan",   at: 1 },
  { id: "c1c", d: "M50,50 C32,58 24,66 20,71",  c: "violet", at: 1 },
  { id: "c1d", d: "M50,50 C68,58 76,66 80,71",  c: "green",  at: 1 },
  { id: "c2a", d: "M27,25 C18,33 12,40 10,46",  c: "cyan",   at: 2 },
  { id: "c2b", d: "M73,25 C82,33 88,40 90,46",  c: "violet", at: 2 },
  { id: "c2c", d: "M27,25 C31,17 35,12 38,10",  c: "green",  at: 2 },
  { id: "c2d", d: "M73,25 C69,17 65,12 62,10",  c: "cyan",   at: 2 },
  { id: "c3a", d: "M20,71 C26,73 30,75 33,76",  c: "green",  at: 3 },
  { id: "c3b", d: "M80,71 C74,73 70,75 67,76",  c: "green",  at: 3 },
  { id: "c3c", d: "M33,76 C40,81 45,84 50,86",  c: "violet", at: 3 },
  { id: "c3d", d: "M67,76 C60,81 55,84 50,86",  c: "violet", at: 3 },
  { id: "c4a", d: "M10,46 C12,34 13,28 15,24",  c: "cyan",   at: 4 },
  { id: "c4b", d: "M90,46 C88,34 87,28 85,24",  c: "violet", at: 4 },
  { id: "c4c", d: "M38,10 C43,7 47,5 50,5",     c: "green",  at: 4 },
  { id: "c4d", d: "M62,10 C57,7 53,5 50,5",     c: "green",  at: 4 },
  { id: "c5a", d: "M27,25 C31,36 34,43 36,50",  c: "violet", at: 5 },
  { id: "c5b", d: "M73,25 C69,36 66,43 64,50",  c: "violet", at: 5 },
  { id: "c5c", d: "M36,50 C46,50 54,50 64,50",  c: "violet", at: 5 },
  { id: "c6a", d: "M50,86 C50,90 50,92 50,94",  c: "green",  at: 6 },
  { id: "c6b", d: "M20,71 C12,67 8,65 6,63",    c: "cyan",   at: 6 },
  { id: "c6c", d: "M80,71 C88,67 92,65 94,63",  c: "cyan",   at: 6 },
];

// ─── Flow particles (phase 4+) ────────────────────────────────────────────────

const FLOWS = [
  { d: "M50,50 C38,40 30,30 27,25", c: "green"  as Col, dur: "2.4s" },
  { d: "M50,50 C62,40 70,30 73,25", c: "cyan"   as Col, dur: "2.9s" },
  { d: "M50,50 C32,58 24,66 20,71", c: "violet" as Col, dur: "2.1s" },
  { d: "M50,50 C68,58 76,66 80,71", c: "green"  as Col, dur: "2.6s" },
  { d: "M27,25 C18,33 12,40 10,46", c: "cyan"   as Col, dur: "3.1s" },
  { d: "M73,25 C82,33 88,40 90,46", c: "violet" as Col, dur: "2.3s" },
];

// ─── Floating glass cards ─────────────────────────────────────────────────────

interface CardDef {
  id: string; title: string; badge: string;
  rows: [string, string][];
  at: number; tone: Col;
  pos: { top?: string; bottom?: string; left?: string; right?: string };
}

const CARDS: CardDef[] = [
  {
    id: "audit", title: "AI Audit", badge: "Scanning",
    rows: [["Opportunities", "14 flagged"], ["Workflows", "4 mapped"], ["Risk zones", "3 found"]],
    at: 1, tone: "green", pos: { top: "7%", left: "2%" },
  },
  {
    id: "tools", title: "Tool Stack", badge: "3 / 9 selected",
    rows: [["Make.com", "active"], ["Claude API", "active"], ["Zapier", "not needed"]],
    at: 2, tone: "cyan", pos: { top: "7%", right: "2%" },
  },
  {
    id: "chain", title: "Approval Chain", badge: "Human gates on",
    rows: [["Content", "review required"], ["Payments", "blocked"], ["Reports", "auto-send"]],
    at: 3, tone: "violet", pos: { bottom: "11%", left: "2%" },
  },
  {
    id: "live", title: "System Live", badge: "Running",
    rows: [["Tasks", "42 automated"], ["Pending", "3 for review"], ["Errors", "0 this week"]],
    at: 4, tone: "green", pos: { bottom: "11%", right: "2%" },
  },
];

// ─── SVG canvas ───────────────────────────────────────────────────────────────

function PhaseCanvas({ phase }: { phase: number }) {
  const meta = PHASE_META[phase];
  const bgGlow = `radial-gradient(ellipse 80% 70% at 50% 50%, ${RGBA[meta.tone]}0.06), transparent 68%)`;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="branch-bg absolute inset-0 opacity-30" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ background: bgGlow }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {(["green", "cyan", "violet"] as Col[]).map((c) => (
            <filter key={c} id={`bw-glow-${c}`}>
              <feGaussianBlur stdDeviation="1.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Connections */}
        {CONNS.map((conn) => (
          <motion.path
            key={conn.id}
            d={conn.d}
            stroke={HEX[conn.c]}
            strokeOpacity={0.4}
            strokeWidth={0.42}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: phase >= conn.at ? 1 : 0, opacity: phase >= conn.at ? 1 : 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        ))}

        {/* Nodes */}
        {NODES.map((node) => {
          const active = phase >= node.at;
          return (
            <g key={node.id} filter={active ? `url(#bw-glow-${node.c})` : undefined}>
              <motion.circle
                cx={node.cx} cy={node.cy} r={node.r * 2.4}
                fill={HEX[node.c]}
                animate={{ fillOpacity: active ? 0.06 : 0 }}
                transition={{ duration: 0.6 }}
              />
              <motion.circle
                cx={node.cx} cy={node.cy} r={node.r}
                fill={HEX[node.c]}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: active ? 1 : 0, opacity: active ? 0.88 : 0 }}
                style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              {node.pulse && active && (
                <>
                  <motion.circle
                    cx={node.cx} cy={node.cy} r={node.r}
                    fill="none" stroke={HEX[node.c]} strokeWidth={0.5}
                    animate={{ r: [node.r + 2, node.r + 11], opacity: [0.35, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.circle
                    cx={node.cx} cy={node.cy} r={node.r}
                    fill="none" stroke={HEX[node.c]} strokeWidth={0.3}
                    animate={{ r: [node.r + 4, node.r + 16], opacity: [0.2, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.85 }}
                  />
                </>
              )}
            </g>
          );
        })}

        {/* Scanning sweep — phase 1 */}
        {phase === 1 && (
          <motion.line
            x1="0" x2="100" y1="0" y2="0"
            stroke={HEX.cyan} strokeOpacity={0.14} strokeWidth={0.7}
            animate={{ y1: [0, 100], y2: [0, 100] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Flow particles — phase 4+ */}
        {phase >= 4 &&
          FLOWS.map((fp, i) => (
            <circle key={i} r="0.85" fill={HEX[fp.c]} fillOpacity={0.65}>
              <animateMotion dur={fp.dur} repeatCount="indefinite" path={fp.d} />
            </circle>
          ))}
      </svg>

      {/* Floating glass cards */}
      {CARDS.map((card) => (
        <AnimatePresence key={card.id}>
          {phase >= card.at && (
            <motion.div
              key="shown"
              className="absolute z-20 w-40"
              style={card.pos}
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            >
              <GlassCard card={card} />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

// ─── Glass card ───────────────────────────────────────────────────────────────

function GlassCard({ card }: { card: CardDef }) {
  const border =
    card.tone === "green"  ? "rgba(74,222,128,0.22)"  :
    card.tone === "cyan"   ? "rgba(103,232,249,0.22)" :
                             "rgba(167,139,250,0.22)";
  const accent =
    card.tone === "green"  ? "#4ade80" :
    card.tone === "cyan"   ? "#67e8f9" :
                             "#a78bfa";
  return (
    <div
      className="rounded-xl p-3 text-[10px]"
      style={{ background: "rgba(5,5,5,0.78)", border: `1px solid ${border}`, backdropFilter: "blur(14px)", boxShadow: `0 8px 28px rgba(0,0,0,0.42), 0 0 20px ${border}` }}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="font-bold text-white">{card.title}</span>
        <span className="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest" style={{ color: accent }}>
          {card.badge}
        </span>
      </div>
      {card.rows.map(([label, val]) => (
        <div key={label} className="flex items-center justify-between border-t border-white/[0.07] py-1.5">
          <span className="text-gray-500">{label}</span>
          <span className="font-semibold text-gray-300">{val}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Text panel ───────────────────────────────────────────────────────────────

function PhaseTextPanel({ phase }: { phase: number }) {
  const step = workflowSteps[phase];
  const meta = PHASE_META[phase];

  return (
    <div className="flex h-full flex-col justify-between p-8 xl:p-12">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.42em] text-tree-green/55">
          Branching Systems
        </p>
        <p className="mt-2 max-w-[22ch] text-xs leading-6 text-gray-600">
          A workflow for deciding what AI should do, and what it should leave alone.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        >
          <p
            className="mb-4 font-black leading-none tracking-tighter"
            style={{ fontSize: "clamp(5rem,10vw,8.5rem)", color: `${RGBA[meta.tone]}0.13)` }}
          >
            {String(phase + 1).padStart(2, "0")}
          </p>

          <span
            className="mb-5 inline-block rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.24em]"
            style={{ borderColor: `${RGBA[meta.tone]}0.28)`, color: HEX[meta.tone], background: `${RGBA[meta.tone]}0.07)` }}
          >
            {meta.badge}
          </span>

          <h2 className="mt-1 text-[1.65rem] font-black leading-[1.12] tracking-tight text-white xl:text-4xl">
            {step.title}
          </h2>
          <p className="mt-4 max-w-[28ch] text-sm leading-7 text-gray-400 xl:text-base xl:leading-8">
            {step.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Step timeline */}
      <div className="space-y-2">
        {workflowSteps.map((s, i) => {
          const state = i < phase ? "done" : i === phase ? "active" : "future";
          return (
            <div
              key={s.title}
              className="flex items-center gap-3 transition-all duration-500"
              style={{ opacity: state === "active" ? 1 : state === "done" ? 0.38 : 0.13 }}
            >
              <div
                className="h-px flex-none rounded-full transition-all duration-500"
                style={{
                  width: state === "active" ? "2rem" : state === "done" ? "1rem" : "0.5rem",
                  background: state === "future" ? "rgba(255,255,255,0.15)" : "#4ade80",
                }}
              />
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${state === "future" ? "text-white/20" : "text-tree-green"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`text-xs ${state === "active" ? "font-bold text-white" : "text-gray-500"}`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mobile layout ────────────────────────────────────────────────────────────

function MobileLayout() {
  return (
    <section className="section-shell relative overflow-hidden">
      <div className="container-shell">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.42em] text-tree-green">
          Branching Systems
        </p>
        <h2 className="mb-3 text-3xl font-black tracking-tight text-white">
          A workflow for deciding what AI should do.
        </h2>
        <p className="mb-12 max-w-xl text-base leading-8 text-gray-400">
          Every engagement starts with the business problem, then grows into a system with approvals, training, and ongoing optimization.
        </p>
        <div className="relative">
          <div className="absolute bottom-4 left-[1.55rem] top-2 w-px bg-gradient-to-b from-tree-green/35 via-tree-green/15 to-transparent" />
          <div className="space-y-0">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex gap-5 pb-9"
              >
                <div className="flex-none">
                  <div className="flex h-[3.1rem] w-[3.1rem] items-center justify-center rounded-full border border-tree-green/22 bg-tree-green/[0.06]">
                    <span className="text-xs font-black text-tree-green">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Desktop pinned experience ────────────────────────────────────────────────

function DesktopExperience() {
  const pinnedRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = pinnedRef.current;
    if (!el) return;

    if (reducedMotion) {
      setPhase(0);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: `+=${workflowSteps.length * 92}vh`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const p = Math.min(workflowSteps.length - 1, Math.round(self.progress * (workflowSteps.length - 1)));
        setPhase(p);
      },
    });

    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <div ref={pinnedRef} className="flex h-screen bg-[#050505]">
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <PhaseCanvas phase={phase} />
      </div>
      <div className="w-px flex-none bg-white/[0.055]" />
      <div className="relative w-[42%] overflow-hidden bg-[#050505] xl:w-[38%]">
        <PhaseTextPanel phase={phase} />
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function BranchingWorkflow() {
  const [mode, setMode] = useState<"mobile" | "desktop" | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const check = () => setMode(window.innerWidth >= 900 ? "desktop" : "mobile");
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  if (mode === null) return null;
  if (mode === "mobile" || reducedMotion) return <MobileLayout />;
  return <DesktopExperience />;
}
