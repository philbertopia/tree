import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SeedChat } from "@/components/assistant/SeedChat";
import { SeedOrb } from "@/components/assistant/SeedOrb";
import type { SeedMessage, SeedPrompt } from "@/components/assistant/types";

export const metadata: Metadata = {
  title: "Seed AI Systems Planner Demo",
  description:
    "Try Seed, TREE's AI systems planner. Map a practical AI automation, dashboard, or workflow for your business."
};

const starterPrompts: SeedPrompt[] = [
  { label: "Local business", prompt: "I run a local business and want to know what AI should help with first." },
  { label: "Lead follow-up", prompt: "I need better lead follow-up without losing the human touch." },
  { label: "Dashboard", prompt: "I want a dashboard that shows what is happening in my business." },
  { label: "Weekly planning", prompt: "I want to simplify weekly purchasing, planning, or operations." },
  { label: "Marketing", prompt: "I want more consistent marketing and customer engagement." },
  { label: "Training", prompt: "I need to train my team to safely use AI tools." }
];

const initialMessages: SeedMessage[] = [
  {
    id: "seed-planner-greeting",
    role: "assistant",
    content:
      "Hi, I'm Seed. Tell me what kind of business you run and what feels most repetitive, scattered, or hard to track. I'll help map a practical first AI system."
  }
];

const proofPoints = [
  "Practical workflow mapping",
  "Human review built in",
  "Dashboard and automation ideas",
  "Grounded implementation steps"
];

export default function AISystemsPlannerPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-16 pt-28 sm:pt-32">
      <div className="absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-tree-green/10 blur-3xl" aria-hidden="true" />
      <div className="container-shell relative z-10">
        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-tree-green/20 bg-tree-green/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-tree-green">
              <SeedOrb size="sm" />
              Seed demo
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Map your first practical AI system.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              Seed is TREE's AI systems planner. It asks about your business, finds operational friction, and turns
              the conversation into a grounded automation or dashboard plan.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-sm text-gray-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-tree-green" />
                  {point}
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-tree-cyan/25 bg-tree-cyan/10 px-5 py-3 text-sm font-bold text-tree-cyan transition hover:border-tree-cyan/45 hover:bg-tree-cyan/15"
            >
              Talk to TREE after the demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <SeedChat
            variant="page"
            initialMessages={initialMessages}
            starterPrompts={starterPrompts}
            className="min-h-[44rem]"
          />
        </section>
      </div>
    </main>
  );
}
