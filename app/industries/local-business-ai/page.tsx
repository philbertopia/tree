import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, MessageSquareText, QrCode, Search, ShoppingCart, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ConversionCTA } from "@/components/seo/ConversionCTA";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteUrl } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "AI Systems For Local Businesses + Free AI Consultation",
  description:
    "Practical AI automation, dashboards, QR systems, review workflows, local SEO, and operational planning for local businesses. Limited-time free AI consultation and starter AI agent for qualifying businesses.",
  keywords: [
    "free AI consultation for local business",
    "free AI agent for local business",
    "local business AI automation",
    "small business AI agent",
    "Kingston NY AI consulting",
    "Hudson Valley local business AI"
  ],
  alternates: {
    canonical: "/industries/local-business-ai"
  },
  openGraph: {
    title: "AI Systems For Local Businesses + Free AI Consultation",
    description:
      "Practical AI systems for local businesses plus a limited-time free consultation and starter AI agent for qualifying businesses.",
    url: "/industries/local-business-ai"
  }
};

const problems = ["Manual follow-up", "Inconsistent marketing", "Review management", "Inventory planning", "Local SEO", "Scattered tools"];
const systems = [
  { title: "QR menu and customer touchpoints", icon: QrCode, text: "Shareable menus, QR access, offers, event links, and customer-facing flows." },
  { title: "Review response workflow", icon: Star, text: "Draft-and-review responses so reputation work happens without becoming another pile of tasks." },
  { title: "Weekly content queue", icon: MessageSquareText, text: "AI-assisted social, email, and local updates with human approval." },
  { title: "Owner visibility dashboard", icon: BarChart3, text: "Leads, tasks, reviews, weekly activity, ordering, and approvals in one calmer view." },
  { title: "Inventory and purchasing planner", icon: ShoppingCart, text: "Compare weekly needs, pricing signals, and sourcing opportunities before buying." },
  { title: "Local SEO rhythm", icon: Search, text: "Keep pages, offers, menus, FAQs, and local search signals more current." }
];

const faqs = [
  {
    question: "What should a local business automate first?",
    answer: "Start with repeatable, low-risk work such as customer FAQs, review response drafts, menu updates, QR campaigns, local SEO tasks, weekly content, and owner reporting."
  },
  {
    question: "Can AI help without taking control away from the owner?",
    answer: "Yes. TREE builds supervised workflows where AI prepares drafts, summaries, and recommendations while the owner approves important actions."
  },
  {
    question: "Do local businesses need a dashboard?",
    answer: "A dashboard helps when tasks, leads, reviews, orders, events, and weekly planning are scattered across tools or memory."
  }
];

export default function LocalBusinessAIPage() {
  return (
    <main id="main" className="px-4 pb-20 pt-32">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Systems For Local Businesses",
            description: metadata.description,
            provider: { "@type": "ProfessionalService", name: "TREE Systems", url: siteUrl },
            areaServed: "United States",
            url: `${siteUrl}/industries/local-business-ai`
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer }
            }))
          }
        ]}
      />
      <section className="container-shell">
        <Breadcrumbs items={[{ label: "Industries", href: "/industries" }, { label: "Local Business AI", href: "/industries/local-business-ai" }]} />
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">Local Business AI</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          Practical AI systems for local businesses that already care about quality.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          TREE helps local operators organize follow-up, reviews, menus, local SEO, weekly content, inventory planning, dashboards, and customer engagement without turning the business into an AI experiment.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <GlassCard>
            <h2 className="text-2xl font-black text-white">Common bottlenecks</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {problems.map((problem) => (
                <span key={problem} className="rounded-full border border-tree-green/20 bg-tree-green/10 px-3 py-1 text-xs font-bold text-tree-green">
                  {problem}
                </span>
              ))}
            </div>
            <p className="mt-5 leading-8 text-gray-400">
              Local business owners rarely need more tools. They need fewer loose ends, clearer visibility, and practical systems that support the real weekly rhythm.
            </p>
          </GlassCard>
          <GlassCard tone="violet">
            <h2 className="text-2xl font-black text-white">Best fit</h2>
            <p className="mt-4 leading-8 text-gray-400">
              TREE is a good fit if you have recurring workflows, scattered tools, manual follow-up, reporting bottlenecks, review work, ordering friction, or AI tools your team does not fully trust yet.
            </p>
          </GlassCard>
        </div>

        <section className="mt-14">
          <h2 className="mb-5 text-3xl font-black text-white">Example systems TREE can build</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {systems.map(({ title, text, icon: Icon }) => (
              <GlassCard key={title} className="h-full">
                <Icon className="h-7 w-7 text-tree-green" />
                <h3 className="mt-4 text-xl font-black text-white">{title}</h3>
                <p className="mt-3 leading-7 text-gray-400">{text}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <GlassCard className="mt-14">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-tree-green/70">Real example</p>
          <h2 className="mt-3 text-3xl font-black text-white">Hylander Mobile shows the pattern.</h2>
          <p className="mt-4 max-w-3xl leading-8 text-gray-400">
            TREE helped Hylander Mobile connect menu infrastructure, QR access, weekly planning, customer engagement, ordering support, and operational visibility around a business that already had strong local momentum.
          </p>
          <Link href="/case-studies/hylander-mobile" className="mt-6 inline-flex rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-3 font-bold text-tree-green transition hover:bg-tree-green hover:text-black">
            Read the case study
          </Link>
        </GlassCard>

        <section className="mt-14">
          <h2 className="mb-5 text-3xl font-black text-white">FAQ</h2>
          <FaqBlock faqs={faqs} />
        </section>

        <div className="mt-14">
          <ConversionCTA
            title="Want to find the first useful AI system for your local business?"
            description="TREE can audit the workflow, map the first automation, and build a practical system your team can actually operate."
            cta="Audit my workflow"
          />
        </div>
      </section>
    </main>
  );
}
