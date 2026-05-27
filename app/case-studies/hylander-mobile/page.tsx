import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ClipboardList, QrCode, ShoppingCart, Store } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ConversionCTA } from "@/components/seo/ConversionCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteUrl } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "Hylander Mobile Case Study",
  description:
    "How TREE helped Hylander Mobile improve operations, menu infrastructure, customer engagement, weekly purchasing, and growth systems.",
  alternates: {
    canonical: "/case-studies/hylander-mobile"
  },
  openGraph: {
    title: "Hylander Mobile Case Study",
    description:
      "A grounded TREE implementation story covering weekly aggregation, menu systems, QR access, ordering workflows, and operational growth.",
    url: "/case-studies/hylander-mobile",
    images: ["/images/sections/hylander-menu.png"]
  }
};

const outcomes = [
  "Reported 50% revenue growth within the first 3 months",
  "Centralized weekly purchasing visibility",
  "Public menu and QR customer touchpoints",
  "Pickup and delivery workflow support",
  "Clearer marketing and customer engagement rhythm",
  "Operational flexibility for testing new offerings"
];

const timeline = [
  ["Discovery", "Mapped menu, customer touchpoints, ordering needs, weekly planning, and growth opportunities."],
  ["System design", "Defined the weekly aggregator, menu infrastructure, QR access, and admin workflow support."],
  ["Implementation", "Built practical digital systems around the real Hylander Mobile operation."],
  ["Training", "Supported owner understanding around the tools, workflows, and day-to-day operating rhythm."],
  ["Optimization", "Improved planning visibility, customer engagement, and expansion readiness after launch."]
];

const aggregatorBenefits = [
  "Compare pricing across local stores and suppliers",
  "Identify better purchasing options",
  "Reduce unnecessary spending",
  "Improve inventory planning",
  "React faster to price changes",
  "Test new menu ideas with more confidence"
];

export default function HylanderMobileCaseStudyPage() {
  const pageUrl = `${siteUrl}/case-studies/hylander-mobile`;

  return (
    <main id="main" className="px-4 pb-20 pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Hylander Mobile Case Study",
          description: metadata.description,
          author: { "@type": "Organization", name: "TREE Systems" },
          publisher: { "@type": "Organization", name: "TREE Systems" },
          mainEntityOfPage: pageUrl
        }}
      />
      <section className="container-shell">
        <Breadcrumbs items={[{ label: "Hylander Mobile Case Study", href: "/case-studies/hylander-mobile" }]} />
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">Case Study</p>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Hylander Mobile: practical AI systems for a real local business.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              Hylander Mobile was already a growing Kingston, NY food business with strong identity and customer appeal. TREE helped organize the operation with practical systems for weekly purchasing, menu infrastructure, QR access, customer engagement, ordering support, and growth planning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="https://hylander-mobile.vercel.app/#menu" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-3 text-sm font-bold text-tree-green transition hover:bg-tree-green hover:text-black">
                View Hylander Mobile
              </Link>
              <Link href="https://hylander-mobile-network.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-tree-cyan/25 bg-tree-cyan/10 px-5 py-3 text-sm font-bold text-tree-cyan transition hover:border-tree-cyan/45 hover:bg-tree-cyan/15">
                View Pitch Deck
              </Link>
              <Link href="https://hylander-mobile-network.vercel.app/financials.html" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-gray-200 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
                View Financials
              </Link>
            </div>
          </div>
          <GlassCard className="overflow-hidden p-0">
            <div className="relative aspect-[16/10]">
              <Image src="/images/sections/hylander-open.png" alt="Hylander Mobile brand implementation visual" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-tree-black/80 via-tree-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/80">Implementation proof</p>
                <p className="mt-2 text-3xl font-black text-white">Reported 50% revenue growth within the first 3 months.</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
          <GlassCard>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-tree-green/70">Result</p>
            <div className="mt-5 flex items-end gap-4">
              <p className="text-7xl font-black leading-none text-white">50%</p>
              <ArrowUpRight className="mb-2 h-10 w-10 text-tree-green" />
            </div>
            <p className="mt-5 leading-8 text-gray-400">
              This is a client-reported outcome, not a guarantee or isolated attribution claim. TREE supported the growth with more organized operations, clearer customer touchpoints, better planning, and consistent systems around a business that already cared about quality.
            </p>
          </GlassCard>
          <div className="grid gap-4 md:grid-cols-2">
            {outcomes.map((outcome) => (
              <GlassCard key={outcome} className="h-full">
                <p className="font-bold leading-7 text-white">{outcome}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <section className="mt-14 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <GlassCard className="overflow-hidden p-0">
            <div className="relative aspect-[4/5] bg-white">
              <Image src="/images/sections/hylander-menu.png" alt="Hylander Mobile public menu system" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </div>
          </GlassCard>
          <div className="grid gap-5">
            <GlassCard>
              <QrCode className="h-7 w-7 text-tree-green" />
              <h2 className="mt-4 text-3xl font-black text-white">Menu, QR, and customer engagement systems.</h2>
              <p className="mt-4 leading-8 text-gray-400">
                TREE helped connect Hylander Mobile's bold brand identity to practical customer touchpoints: a shareable menu, QR-driven access, Sauce Roulette engagement, Instagram continuity, and a clearer path from interest to ordering.
              </p>
            </GlassCard>
            <GlassCard>
              <Store className="h-7 w-7 text-tree-green" />
              <h2 className="mt-4 text-3xl font-black text-white">Food people actually order.</h2>
              <p className="mt-4 leading-8 text-gray-400">
                The work centered on real menu demand: chop cheese, chop chicken, wings, sliders, pierogis, sauces, drinks, and weekly prep. The systems were built around actual operations, not abstract AI demos.
              </p>
            </GlassCard>
          </div>
        </section>

        <section className="mt-14">
          <GlassCard className="overflow-hidden p-0">
            <div className="border-b border-white/10 p-6">
              <ShoppingCart className="h-7 w-7 text-tree-green" />
              <h2 className="mt-4 text-3xl font-black text-white">Weekly Aggregator: operational intelligence for purchasing.</h2>
              <p className="mt-4 max-w-4xl leading-8 text-gray-400">
                The Weekly Aggregator is a custom operational intelligence and purchasing system that helps Hylander Mobile make smarter inventory and sourcing decisions. It compares food pricing, availability, and purchasing opportunities across local stores and suppliers, then turns scattered checks into one planning view.
              </p>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
              {aggregatorBenefits.map((benefit) => (
                <div key={benefit} className="rounded-xl border border-white/10 bg-white/[0.025] p-4 font-semibold leading-7 text-gray-300">
                  {benefit}
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="mt-14">
          <h2 className="mb-5 text-3xl font-black text-white">Implementation timeline</h2>
          <div className="grid gap-4">
            {timeline.map(([label, text], index) => (
              <GlassCard key={label} className="flex gap-5">
                <span className="text-xl font-black text-tree-green">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-black text-white">{label}</h3>
                  <p className="mt-2 leading-7 text-gray-400">{text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3">
          <GlassCard>
            <CalendarDays className="h-7 w-7 text-tree-green" />
            <h2 className="mt-4 text-xl font-black text-white">Before</h2>
            <p className="mt-3 leading-7 text-gray-400">Strong business momentum, but weekly planning, purchasing, menu touchpoints, and ordering workflows needed more structure.</p>
          </GlassCard>
          <GlassCard>
            <ClipboardList className="h-7 w-7 text-tree-green" />
            <h2 className="mt-4 text-xl font-black text-white">System</h2>
            <p className="mt-3 leading-7 text-gray-400">Weekly aggregator, public menu infrastructure, QR access, pickup/delivery workflow support, and admin visibility.</p>
          </GlassCard>
          <GlassCard>
            <ArrowUpRight className="h-7 w-7 text-tree-green" />
            <h2 className="mt-4 text-xl font-black text-white">Result</h2>
            <p className="mt-3 leading-7 text-gray-400">Clearer operating rhythm, stronger customer engagement, better planning, and measurable early growth.</p>
          </GlassCard>
        </section>

        <div className="mt-14">
          <ConversionCTA
            title="Want a practical system around your real operation?"
            description="TREE can map your first useful workflow, build the right-sized system, and train you to operate it with confidence."
            cta="Map my first automation"
          />
        </div>
      </section>
    </main>
  );
}
