"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Bot, GitBranch, Shield, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { useGsapReveal } from "@/components/animation/useGsapReveal";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const agentProcess = ["Intake", "Research", "Draft", "Review", "Approve", "Act"];

const agentCapabilities = [
  {
    icon: Bot,
    title: "Specialized Workers",
    description: "Each agent gets a narrow role: collect context, research, draft, classify, summarize, or prepare the next step.",
    tone: "green" as const
  },
  {
    icon: GitBranch,
    title: "Orchestrated Routing",
    description: "The system moves work between agents like a coordinated team, with clear handoffs instead of one overloaded chatbot.",
    tone: "green" as const
  },
  {
    icon: Shield,
    title: "Human Checkpoints",
    description: "Important outputs pause for review, approval, edits, or rejection before anything reaches customers or operations.",
    tone: "violet" as const
  },
  {
    icon: Zap,
    title: "Visible System Logs",
    description: "Dashboards and activity trails show what the agents did, what changed, what needs review, and where the system is learning.",
    tone: "violet" as const
  }
];

export function AIAgentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef, { pulseSelector: '[data-gsap="process-item"]', desktopOnlyPulse: true });

  return (
    <section ref={sectionRef} className="section-shell relative overflow-hidden" data-gsap="section">
      <FloatingNodeClusters density="rich" size="mixed" movement="crossflow" focus="right" seed={44} />
      <div className="container-shell relative z-10">
        <div data-gsap="heading">
          <SectionHeading
            eyebrow="AI Agents &amp; Orchestration"
            title="Agent systems that move together, with humans in control."
            description="TREE builds coordinated groups of AI agents around real workflows. Each agent has a job, the system routes work between them, and people keep final control through review points, dashboards, and logs."
          />
        </div>

        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div data-gsap="image" className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] lg:aspect-auto lg:min-h-[360px]">
            <Image
              src="/images/sections/agents.png"
              alt="AI agent orchestration system with multi-agent pipelines and human approval workflows"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-tree-black/75 via-tree-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-green/80">Agent Orchestration</p>
              <p className="mt-1 text-sm font-semibold text-white">Specialized agents moving together through supervised workflows</p>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
          >
            {agentCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <motion.div key={cap.title} variants={fadeInUp}>
                  <GlassCard data-gsap="card" tone={cap.tone} className="h-full hover:-translate-y-1.5 hover:border-tree-green/40 hover:shadow-[0_12px_32px_rgba(74,222,128,0.1)]">
                    <Icon className="mb-4 h-6 w-6 text-tree-green" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-400">{cap.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div data-gsap="stagger" className="hidden gap-2 rounded-xl border border-white/10 bg-white/[0.025] p-3 sm:grid sm:grid-cols-3 lg:grid-cols-6">
          {agentProcess.map((step, index) => (
            <div key={step} data-gsap="process-item" className="rounded-lg border border-white/10 bg-tree-black/40 px-3 py-3 text-center">
              <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-tree-green/70">0{index + 1}</p>
              <p className="mt-1 text-sm font-bold text-white">{step}</p>
            </div>
          ))}
        </div>
        <Link href="/solutions/ai-agent-orchestration" data-gsap="cta" className="mt-6 inline-flex rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-3 text-sm font-bold text-tree-green transition hover:bg-tree-green hover:text-black">
          Explore agent orchestration
        </Link>
      </div>
    </section>
  );
}
