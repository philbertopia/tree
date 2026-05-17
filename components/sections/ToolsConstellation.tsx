"use client";

import { motion } from "framer-motion";
import { tools } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ToolsConstellation() {
  return (
    <section id="tools" className="section-shell scroll-mt-24 overflow-hidden">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Tools"
          title="A constellation of practical AI infrastructure."
          description="TREE works across the modern AI stack, from local models and coding agents to automation platforms, dashboards, websites, and blockchain tooling."
          align="center"
        />
        <GlassCard className="relative min-h-[540px] overflow-hidden p-6 md:p-10">
          <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1100 520" fill="none" aria-hidden="true">
            <path d="M90 360 C280 160 420 420 580 230 S820 120 1010 300" stroke="#4ade80" strokeOpacity="0.22" />
            <path d="M180 180 C380 120 420 300 720 170 S900 260 1010 120" stroke="#a78bfa" strokeOpacity="0.18" />
            <path d="M150 420 C420 320 560 470 980 380" stroke="#4ade80" strokeOpacity="0.16" />
          </svg>
          <div className="relative hidden h-[460px] md:block">
            {tools.map((tool, index) => {
              const x = 5 + ((index * 19) % 88);
              const y = 8 + ((index * 31) % 80);
              const violet = index % 5 === 0 || tool.category === "Local" || tool.category === "Web3";
              return (
                <motion.div
                  key={tool.name}
                  className="absolute"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ y: [0, index % 2 ? -10 : 10, 0] }}
                  transition={{ duration: 5 + (index % 6), repeat: Infinity, ease: "easeInOut" }}
                >
                  <span
                    className={
                      violet
                        ? "rounded-full border border-tree-violet/25 bg-tree-violet/10 px-3 py-1.5 text-sm text-tree-violet"
                        : "rounded-full border border-tree-green/25 bg-tree-green/10 px-3 py-1.5 text-sm text-tree-green"
                    }
                    title={tool.category}
                  >
                    {tool.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div className="relative grid gap-3 sm:grid-cols-2 md:hidden">
            {tools.map((tool) => (
              <span key={tool.name} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-gray-300">
                {tool.name}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
