"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { useGsapReveal } from "@/components/animation/useGsapReveal";
import { fadeInUp } from "@/lib/utils";

const commandFeatures = [
  {
    label: "Strategic Visibility",
    text: "A single view across operations, finance, sales, security, and agent activity, surfaced for leadership instead of buried in tools."
  },
  {
    label: "Decision Support Layers",
    text: "AI-assisted briefings, risk summaries, and opportunity flags delivered early enough for a human to make the call."
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

const commandLayers = ["Live Signals", "Risk Review", "Agent Activity", "Escalations", "Decision Briefs"];

export function ExecutiveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-shell relative overflow-hidden" data-gsap="section">
      <FloatingNodeClusters density="medium" size="large" movement="drift" focus="left" seed={55} />
      <div className="container-shell relative z-10">
        <div data-gsap="heading">
          <SectionHeading
            eyebrow="Command Center Systems"
            title="See the signals before they become problems."
            description="TREE connects operations, finance, security, sales, and agent activity into command-center views that help decision-makers see what changed, what matters, and what needs review."
          />
        </div>

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
                <GlassCard data-gsap="card" className="flex gap-5 hover:-translate-y-1 hover:border-tree-green/40 hover:shadow-[0_8px_24px_rgba(74,222,128,0.08)]">
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
            <div data-gsap="image" className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <Image
                src="/images/sections/executive.png"
                alt="Executive AI dashboard with strategic oversight and decision support systems"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tree-black/80 via-tree-black/10 to-transparent" />
              <div className="image-node-glint" aria-hidden="true" />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-green/80">Executive Layer</p>
                <p className="mt-0.5 text-sm font-semibold text-white">Strategic visibility / Decision support</p>
              </div>
            </div>
            <div data-gsap="image" className="relative aspect-[16/7] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <Image
                src="/images/sections/command-center.png"
                alt="AI command center with operational monitoring and escalation workflows"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-tree-black/70 via-transparent to-transparent" />
              <div className="image-node-glint" aria-hidden="true" />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-violet/80">Command Center</p>
                <p className="mt-0.5 text-sm font-semibold text-white">Real-time monitoring / Escalation paths</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 hidden gap-2 rounded-xl border border-white/10 bg-white/[0.025] p-3 sm:grid sm:grid-cols-5">
          {commandLayers.map((layer) => (
            <div key={layer} data-gsap="pill" className="rounded-lg border border-white/10 bg-tree-black/40 px-3 py-3 text-center text-sm font-bold text-gray-200">
              {layer}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
