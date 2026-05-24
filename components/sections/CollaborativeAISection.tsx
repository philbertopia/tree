"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";

const principles = [
  {
    number: "01",
    title: "AI proposes. Humans decide.",
    body: "Outputs are drafts, suggestions, and ranked options — never silent actions. Every consequential step requires a person to review, approve, or override."
  },
  {
    number: "02",
    title: "Automation earns its scope.",
    body: "Systems start narrow and proven. Autonomy expands only after your team trusts the output. You define what AI is allowed to do on its own."
  },
  {
    number: "03",
    title: "Teams own what they use.",
    body: "TREE trains every client team on the systems we build. You should be able to pause, edit, extend, or question any part of your automation — without asking us first."
  }
];

export function CollaborativeAISection() {
  return (
    <section className="section-shell relative overflow-hidden">
      <FloatingNodeClusters density="medium" size="mixed" movement="school" focus="bottom-left" seed={66} />
      <div className="container-shell relative z-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <SectionHeading
            eyebrow="Human-Guided AI"
            title="AI that works with your team, not around them."
            description="Every system TREE builds is designed around one principle: humans stay in control of the things that matter. AI handles volume. Your team handles judgment."
          />
          <div className="mt-8 grid gap-4">
            {principles.map((p) => (
              <GlassCard key={p.number} className="flex gap-5">
                <span className="text-xl font-black text-tree-green">{p.number}</span>
                <div>
                  <h3 className="text-base font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-400">{p.body}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] lg:aspect-auto lg:min-h-[480px]"
        >
          <Image
            src="/images/sections/collaboration.png"
            alt="Human and AI collaboration with approval workflows and team-controlled automation"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tree-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-green/80">Collaborative AI</p>
            <p className="mt-1 text-sm font-semibold text-white">Human-guided automation with full team ownership</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
