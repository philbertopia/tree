"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { caseStudyCards } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { useGsapReveal } from "@/components/animation/useGsapReveal";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const caseImages: Record<string, string> = {
  "Local business visibility system": "/images/sections/local-business.png",
  "Finance/security dashboard system": "/images/sections/security-finance-case-study.png",
  "AI training and consultation system": "/images/sections/literacy.png",
  "Marketing and growth automation system": "/images/sections/marketing.png"
};

const caseComponents: Record<string, string[]> = {
  "Local business visibility system": ["SEO", "Reviews", "QR Campaigns", "Dashboard"],
  "Finance/security dashboard system": ["Risk Flags", "Camera Events", "Approvals", "Reporting"],
  "AI training and consultation system": ["Prompting", "Guardrails", "Starter System", "Ownership"],
  "Marketing and growth automation system": ["CRM", "Content Queue", "Email Flow", "Approvals"]
};

const proofPoints = ["Human review built in", "Custom scoped systems", "Dashboards and training included"];
const staticImageCases = new Set(["AI training and consultation system", "Marketing and growth automation system"]);

export function CaseStudyCards() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-shell relative overflow-hidden" data-gsap="section">
      <FloatingNodeClusters density="medium" size="mixed" movement="drift" focus="both" seed={96} />
      <div className="container-shell relative z-10">
        <div data-gsap="heading">
          <SectionHeading
            eyebrow="Example Systems"
            title="From problem to system to outcome."
            description="These examples show the pattern: identify the bottleneck, build the smallest useful system, and keep humans in control of important decisions."
          />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2"
        >
          {caseStudyCards.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeInUp}>
                <GlassCard data-gsap="card" tone={item.tone ?? "green"} className="flex h-full flex-col hover:-translate-y-1.5 hover:border-tree-green/40 hover:shadow-[0_12px_32px_rgba(74,222,128,0.1)] md:min-h-[420px]">
                  <div data-gsap="image" className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                    <Image
                      src={caseImages[item.title]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tree-black/75 via-transparent to-transparent" />
                    {!staticImageCases.has(item.title) ? <div className="image-node-glint" aria-hidden="true" /> : null}
                  </div>
                  <Icon className="mb-6 h-7 w-7 text-tree-green" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <CaseLine label="Before" text={item.problem} />
                  <CaseLine label="System" text={item.system} />
                  <CaseLine label="Result" text={item.outcome} />
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                    {(caseComponents[item.title] ?? []).map((component) => (
                      <span key={component} data-gsap="pill" className="rounded-full border border-tree-green/20 bg-tree-green/10 px-3 py-1 text-xs font-bold text-tree-green">
                        {component}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-6 hidden gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3 md:grid md:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point} data-gsap="pill" className="rounded-lg border border-white/10 bg-tree-black/40 px-4 py-3 text-center text-sm font-bold text-gray-200">
              {point}
            </div>
          ))}
        </div>
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
