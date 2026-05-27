"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { trainingItems } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { useGsapReveal } from "@/components/animation/useGsapReveal";

const trainingOffers = [
  {
    label: "AI Literacy",
    image: "/images/sections/literacy.png",
    alt: "AI literacy and practical education for business teams",
    tone: "text-tree-green/80",
    description: "Understand what AI can do, what it cannot do, and how to review outputs safely."
  },
  {
    label: "Rapid Prototyping",
    image: "/images/sections/vibe-coding.png",
    alt: "Rapid prototyping and AI workflow implementation education",
    tone: "text-tree-violet/80",
    description: "Use natural language AI tools to prototype workflows, internal tools, content systems, and automations with guardrails."
  },
  {
    label: "System Ownership",
    image: "/images/sections/implementation.png",
    alt: "Guided AI workflow adoption and system ownership",
    tone: "text-tree-green/80",
    description: "Learn how to operate, pause, improve, and safely extend the systems TREE builds."
  }
];

export function TrainingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  return (
    <section ref={sectionRef} id="training" className="section-shell relative overflow-hidden scroll-mt-24" data-gsap="section">
      <FloatingNodeClusters density="medium" size="large" movement="school" focus="left" seed={36} />
      <div className="container-shell relative z-10">
        <div data-gsap="heading">
          <SectionHeading
            eyebrow="TREE Education &amp; Consultation"
            title="You don't need to become a programmer. You only need to know what you need to know to run your system."
            description="TREE doesn't just build and disappear. We train and consult with business owners, teams, and individuals so they can understand the AI systems around them, use them confidently, and know when to approve, pause, edit, or override the automation."
          />
        </div>

        <div className="mb-10 grid gap-4 lg:grid-cols-3">
          {trainingOffers.map((offer) => (
            <div key={offer.label} data-gsap="image" className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <Image
                src={offer.image}
                alt={offer.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tree-black/85 via-tree-black/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className={`text-xs font-bold uppercase tracking-[0.25em] ${offer.tone}`}>{offer.label}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-white">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div data-gsap="card">
            <p className="max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
              You do not need to learn everything about AI. You need practical literacy: how your system works, what it can safely do, what it should never do without you, and how to make smart changes without breaking the workflow.
            </p>
          </div>
          <GlassCard tone="violet" className="grid gap-4">
            {trainingItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.description} data-gsap="card" className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <Icon className="mt-1 h-5 w-5 flex-none text-tree-green" />
                  <p className="leading-7 text-gray-300">{item.description}</p>
                </div>
              );
            })}
          </GlassCard>
        </div>
        <Link href="/solutions/ai-training-for-teams" data-gsap="cta" className="mt-8 inline-flex rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-3 text-sm font-bold text-tree-green transition hover:bg-tree-green hover:text-black">
          Explore AI education for teams
        </Link>
      </div>
    </section>
  );
}
