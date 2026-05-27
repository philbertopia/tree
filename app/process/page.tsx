import type { Metadata } from "next";
import { Bot, CheckCircle2, GraduationCap, LayoutDashboard, Map, Search, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ConversionCTA } from "@/components/seo/ConversionCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteUrl } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "TREE Process",
  description:
    "How TREE works after you reach out: discovery, workflow audit, system map, build, human review setup, education, and optimization.",
  alternates: {
    canonical: "/process"
  },
  openGraph: {
    title: "TREE Process",
    description: "A practical implementation process for supervised AI systems, dashboards, automation, and education.",
    url: "/process"
  }
};

const processSteps = [
  { title: "Discovery", icon: Search, text: "Clarify the real business problem, current tools, team habits, risks, and what success should look like." },
  { title: "Workflow audit", icon: CheckCircle2, text: "Map recurring work, manual handoffs, scattered systems, approval needs, and places AI should not act alone." },
  { title: "System map", icon: Map, text: "Design the smallest useful system: inputs, outputs, agent roles, dashboards, automations, and review points." },
  { title: "Build", icon: Bot, text: "Implement practical workflows, dashboards, content systems, routing, forms, integrations, and AI-assisted steps." },
  { title: "Human review setup", icon: ShieldCheck, text: "Add approval queues, escalation paths, logs, and guardrails around customer, finance, security, or reputation-sensitive actions." },
  { title: "Training", icon: GraduationCap, text: "Teach the owner or team how to operate, pause, approve, edit, and safely improve the system." },
  { title: "Optimization", icon: LayoutDashboard, text: "Review real usage, reduce friction, improve prompts, add visibility, and expand only where the system earns trust." }
];

const ctas = ["Map my first automation", "Audit my workflow", "Build a dashboard", "Train my team", "Review my AI setup"];

export default function ProcessPage() {
  return (
    <main id="main" className="px-4 pb-20 pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TREE Process",
          description: metadata.description,
          url: `${siteUrl}/process`
        }}
      />
      <section className="container-shell">
        <Breadcrumbs items={[{ label: "Process", href: "/process" }]} />
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">How TREE Works</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          What happens after you contact TREE.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          TREE does not start with tools. We start with the business workflow, then design a practical AI system with clear ownership, human review, education, and room to improve.
        </p>

        <div className="mt-10 grid gap-4">
          {processSteps.map(({ title, text, icon: Icon }, index) => (
            <GlassCard key={title} className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-tree-green">{String(index + 1).padStart(2, "0")}</span>
                <Icon className="h-7 w-7 text-tree-green" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">{title}</h2>
                <p className="mt-3 max-w-3xl leading-8 text-gray-400">{text}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-tree-green/70">Choose the right starting point</p>
          <h2 className="mt-3 text-3xl font-black text-white">Specific asks lead to better systems.</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {ctas.map((cta) => (
              <span key={cta} className="rounded-full border border-tree-green/20 bg-tree-green/10 px-3 py-1 text-xs font-bold text-tree-green">
                {cta}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-3xl leading-8 text-gray-400">
            You do not need to know the technical answer before reaching out. You only need to know the workflow that feels too scattered, too manual, or too hard to see clearly.
          </p>
        </GlassCard>

        <div className="mt-12">
          <ConversionCTA
            title="Ready to map the first useful system?"
            description="TREE will help turn a messy workflow into a scoped build plan with review points, dashboards, education, and practical next steps."
            cta="Map my first automation"
          />
        </div>
      </section>
    </main>
  );
}
