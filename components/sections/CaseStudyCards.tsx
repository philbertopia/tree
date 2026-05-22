"use client";

import { motion } from "framer-motion";
import { caseStudyCards } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export function CaseStudyCards() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Example Systems"
          title="From problem to system to outcome."
          description="These examples show the pattern: identify the bottleneck, build the smallest useful system, and keep humans in control of important decisions."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {caseStudyCards.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeInUp}>
                <GlassCard tone={item.tone ?? "green"} className="flex h-full min-h-[420px] flex-col">
                  <Icon className="mb-6 h-7 w-7 text-tree-green" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <CaseLine label="Problem" text={item.problem} />
                  <CaseLine label="System built" text={item.system} />
                  <CaseLine label="Outcome" text={item.outcome} />
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-6 border-t border-white/10 pt-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-green/70">{label}</p>
      <p className="mt-2 leading-7 text-gray-400">{text}</p>
    </div>
  );
}
