"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, GitBranch, Shield, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageFXOverlay } from "@/components/visuals/ImageFXOverlay";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const agentCapabilities = [
  {
    icon: Bot,
    title: "Custom AI Agents",
    description: "Agents built around your actual workflows — not generic chatbots. They route, decide, draft, and escalate based on your rules.",
    tone: "green" as const
  },
  {
    icon: GitBranch,
    title: "Multi-Agent Orchestration",
    description: "Complex tasks split across specialized agents: research, writing, review, approval, and delivery — each with a defined role.",
    tone: "green" as const
  },
  {
    icon: Shield,
    title: "Human-in-the-Loop Controls",
    description: "Every agent has approval gates. Nothing reaches your customers, your finances, or your operations without a human checkpoint.",
    tone: "violet" as const
  },
  {
    icon: Zap,
    title: "LLM Workflow Pipelines",
    description: "Claude, GPT-4, Gemini, and local models connected to real data sources, APIs, and internal tools — not just a chat window.",
    tone: "violet" as const
  }
];

export function AIAgentsSection() {
  return (
    <section className="section-shell relative overflow-hidden">
      <FloatingNodeClusters density="rich" size="mixed" movement="crossflow" focus="right" seed={44} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="AI Agents &amp; Orchestration"
          title="Agents that do real work. Humans that stay in control."
          description="TREE designs and deploys AI agent systems built around specific business outcomes — not demos or prototypes. Every agent is scoped, tested, and supervised before it touches live operations."
        />

        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] lg:aspect-auto lg:min-h-[360px]">
            <Image
              src="/images/sections/agents.png"
              alt="AI agent orchestration system with multi-agent pipelines and human approval workflows"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-tree-black/75 via-tree-black/20 to-transparent" />
            <ImageFXOverlay variant="network" intensity="rich" />
            <div className="absolute bottom-5 left-5 right-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-green/80">Agent Orchestration</p>
              <p className="mt-1 text-sm font-semibold text-white">Multi-agent pipelines with human supervision layers</p>
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
                  <GlassCard tone={cap.tone} className="h-full">
                    <Icon className="mb-4 h-6 w-6 text-tree-green" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-400">{cap.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
