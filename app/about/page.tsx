import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "About TREE — Practical AI Agency, Hudson Valley",
  description:
    "TREE is a small team of engineers and strategists building practical AI systems for real businesses. Based in the Hudson Valley, working globally."
};

const beliefs = [
  "AI should reduce stress, not create it.",
  "The human stays in the loop. Always.",
  "Systems should grow with the business.",
  "Good automation is quiet when it works.",
  "Bad automation is obvious when it doesn't."
];

export default function AboutPage() {
  return (
    <main id="main" className="min-h-screen px-4 pb-20 pt-32">
      <div className="container-shell">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-tree-green">About TREE</p>
          <h1 className="text-balance text-5xl font-black tracking-tight text-white md:text-7xl">
            TREE is a practical AI agency based in the Hudson Valley.
          </h1>
          <div className="mt-8 space-y-6 text-lg leading-9 text-gray-400">
            <p>
              We are not a software factory. We are not a chatbot vendor. We are not selling AI as a magic button.
            </p>
            <p>
              TREE is a small team of engineers, designers, and strategists who spend our time understanding real business
              operations and building real systems around them.
            </p>
            <p>
              We believe the best AI system is the one your team can actually use, understand, and improve over time.
            </p>
          </div>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <GlassCard>
            <h2 className="text-2xl font-black text-white">What We Believe</h2>
            <div className="mt-6 grid gap-3">
              {beliefs.map((belief) => (
                <p key={belief} className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-gray-300">
                  {belief}
                </p>
              ))}
            </div>
          </GlassCard>
          <GlassCard tone="violet">
            <h2 className="text-2xl font-black text-white">Where We Work</h2>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Hudson Valley, New York, and everywhere else. TREE works remotely with clients across the US and globally.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-tree-green px-5 py-3 font-bold text-black transition hover:bg-tree-leaf"
            >
              Talk to us <ArrowRight className="h-4 w-4" />
            </Link>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
