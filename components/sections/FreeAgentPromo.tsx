"use client";

import { useRef } from "react";
import { Bot, CalendarClock, CheckCircle2, HardDrive, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { useGsapReveal } from "@/components/animation/useGsapReveal";

const offerSteps = [
  "Book a free consultation with TREE.",
  "We identify one useful workflow for your business.",
  "Qualifying businesses receive a free starter AI agent."
];

const agentIdeas = ["Customer questions", "Inventory notes", "Scheduling", "Follow-ups", "Pricing prep", "Internal SOPs"];

const starterLimits = [
  "One focused workflow or use case",
  "500 MB workspace storage for business info, reference files, and lightweight records",
  "Light monthly usage for testing and early local-business activity",
  "Basic hosted web interface you can test and share",
  "No payment, CRM, POS, accounting, or large database integrations in the free starter version"
];

export function FreeAgentPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-shell relative overflow-hidden" data-gsap="section">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(74,222,128,0.10), transparent 34%), radial-gradient(circle at 80% 20%, rgba(34,211,238,0.10), transparent 30%)"
        }}
        aria-hidden="true"
      />
      <FloatingNodeClusters density="medium" size="mixed" movement="school" focus="edges" seed={132} />

      <div className="container-shell relative z-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div data-gsap="heading" className="rounded-xl border border-tree-green/20 bg-tree-green/[0.07] p-6 md:p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-tree-green/25 bg-black/20 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-tree-green">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Limited-Time Offer
            </div>
            <h2 className="text-balance text-4xl font-black leading-[0.98] tracking-tight text-white md:text-6xl">
              Free AI agent for local businesses.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
              Start with a free consultation. If we find a simple workflow where AI can genuinely help, TREE will build a
              free starter AI agent for qualifying businesses while promotional spots remain.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/contact">Claim Free AI Agent</CTAButton>
              <CTAButton href="sms:+12012791840" variant="secondary">
                Text TREE
              </CTAButton>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-500">
              No commitment. No pressure. The free starter version has practical size and usage limits so you can test
              the idea before deciding whether it should grow.
            </p>
          </div>

          <div className="grid gap-4">
            <div data-gsap="card" className="rounded-xl border border-white/10 bg-white/[0.035] p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-tree-green/15 text-tree-green">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">What the starter agent can help with</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {agentIdeas.map((idea) => (
                      <span key={idea} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-gray-300">
                        {idea}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div data-gsap="card" className="rounded-xl border border-white/10 bg-white/[0.035] p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-300/10 text-amber-200">
                  <HardDrive className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Starter limits</h3>
                  <p className="mt-3 leading-7 text-gray-400">
                    The free agent is a lightweight test system, not a full custom platform. You get room to try it,
                    learn from it, and decide what deserves to grow.
                  </p>
                  <div className="mt-4 grid gap-2">
                    {starterLimits.map((limit) => (
                      <div key={limit} className="flex gap-3 text-sm leading-6 text-gray-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-tree-green" aria-hidden="true" />
                        <span>{limit}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Advanced automation, higher usage, long-term maintenance, custom integrations, and mission-critical
                    uptime can be scoped as a paid plan after the free consultation.
                  </p>
                </div>
              </div>
            </div>

            <div data-gsap="card" className="rounded-xl border border-white/10 bg-white/[0.035] p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <CalendarClock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">How it works</h3>
                  <div className="mt-4 grid gap-3">
                    {offerSteps.map((step) => (
                      <div key={step} className="flex gap-3 text-sm leading-6 text-gray-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-tree-green" aria-hidden="true" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div data-gsap="card" className="rounded-xl border border-white/10 bg-white/[0.035] p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/10 text-white">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Built around your actual work</h3>
                  <p className="mt-3 leading-7 text-gray-400">
                    We do not hand you a generic chatbot and disappear. We learn the workflow, build the first useful
                    version, and show you how to use it.
                  </p>
                  <a
                    href="sms:+12012791840"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-tree-green transition hover:text-tree-leaf"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Text (201) 279-1840
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
