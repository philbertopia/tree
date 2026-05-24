"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { fadeInUp } from "@/lib/utils";

const commandFeatures = [
  {
    label: "Strategic Visibility",
    text: "A single view across operations, finance, pipeline, and risk — surfaced for leadership, not buried in spreadsheets."
  },
  {
    label: "Decision Support Layers",
    text: "AI-assisted briefings, risk summaries, and opportunity flags delivered before you need them — reviewed before they reach you."
  },
  {
    label: "Escalation Architecture",
    text: "Tiered approval flows so the right decisions reach the right people at the right moment. No noise. No missed signals."
  },
  {
    label: "Secure, Private Infrastructure",
    text: "Executive systems built on local or private cloud infrastructure where appropriate. Your data stays in your control."
  }
];

export function ExecutiveSection() {
  return (
    <section className="section-shell relative overflow-hidden">
      <FloatingNodeClusters density="medium" size="large" movement="drift" focus="left" seed={55} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Executive Command Systems"
          title="Clarity at the level that matters most."
          description="TREE builds command-layer systems for executives, founders, and decision-makers who need high-signal visibility without operational noise. Designed for the people who make final calls."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="grid gap-4"
          >
            {commandFeatures.map((feat, i) => (
              <motion.div
                key={feat.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="flex gap-5 hover:-translate-y-1 hover:border-tree-green/40 hover:shadow-[0_8px_24px_rgba(74,222,128,0.08)]">
                  <span className="mt-0.5 text-xl font-black text-tree-green">0{i + 1}</span>
                  <div>
                    <h3 className="text-base font-bold text-white">{feat.label}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-400">{feat.text}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <Image
                src="/images/sections/executive.png"
                alt="Executive AI dashboard with strategic oversight and decision support systems"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tree-black/80 via-tree-black/10 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-green/80">Executive Layer</p>
                <p className="mt-0.5 text-sm font-semibold text-white">Strategic visibility · Decision support</p>
              </div>
            </div>
            <div className="relative aspect-[16/7] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <Image
                src="/images/sections/command-center.png"
                alt="AI command center with operational monitoring and escalation workflows"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-tree-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-violet/80">Command Center</p>
                <p className="mt-0.5 text-sm font-semibold text-white">Real-time monitoring · Escalation paths</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
