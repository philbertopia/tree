import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteUrl, solutionPages } from "@/lib/seo-content";
import { GlassCard } from "@/components/ui/GlassCard";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation Solutions",
  description: "TREE solutions for AI agent orchestration, dashboards, business automation, AI education, and human-reviewed workflows.",
  alternates: {
    canonical: "/solutions"
  },
  openGraph: {
    title: "TREE AI Automation Solutions",
    description: "TREE solutions for AI agent orchestration, dashboards, business automation, AI education, and human-reviewed workflows.",
    url: "/solutions",
    images: ["/images/social/og-image.png"]
  }
};

export default function SolutionsPage() {
  return (
    <main id="main" className="px-4 pb-20 pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TREE AI Automation Solutions",
          description: metadata.description,
          url: `${siteUrl}/solutions`
        }}
      />
      <section className="container-shell">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">Solutions</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          Supervised AI systems for real business workflows.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          TREE builds agent systems, dashboards, automations, and education around the work your team actually needs to run.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {solutionPages.map((solution) => (
            <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="group block h-full">
              <GlassCard className="flex h-full flex-col hover:-translate-y-1 hover:border-tree-green/40">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-tree-green/70">{solution.eyebrow}</p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-white group-hover:text-tree-green">{solution.title}</h2>
                <p className="mt-4 flex-1 leading-7 text-gray-400">{solution.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-bold text-tree-green">
                  Explore solution
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
