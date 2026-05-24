"use client";

import Image from "next/image";
import { trainingItems } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";

export function TrainingSection() {
  return (
    <section id="training" className="section-shell relative overflow-hidden scroll-mt-24">
      <FloatingNodeClusters density="medium" size="large" movement="school" focus="left" seed={36} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="TREE Training &amp; Consultation"
          title="You don't need to become a programmer. You only need to know what you need to know to run your system."
          description="TREE doesn't just build and disappear. We train and consult with business owners, teams, and individuals so they can understand the AI systems around them, use them confidently, and know when to approve, pause, edit, or override the automation."
        />

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            <Image
              src="/images/sections/education.png"
              alt="AI literacy and practical training for business teams"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tree-black/80 via-tree-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/80">AI Literacy</p>
              <p className="mt-1 text-sm font-semibold text-white">Practical training for teams and business owners</p>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            <Image
              src="/images/sections/ai-training-2.png"
              alt="Vibe coding and AI workflow implementation training"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tree-black/80 via-tree-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-violet/80">Implementation</p>
              <p className="mt-1 text-sm font-semibold text-white">Guided AI workflow adoption and system ownership</p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
              You do not need to learn everything about AI. You need practical literacy: how your system works, what it can safely do, what it should never do without you, and how to make smart changes without breaking the workflow.
            </p>
          </div>
          <GlassCard tone="violet" className="grid gap-4">
            {trainingItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.description} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <Icon className="mt-1 h-5 w-5 flex-none text-tree-green" />
                  <p className="leading-7 text-gray-300">{item.description}</p>
                </div>
              );
            })}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
