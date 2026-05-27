"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, CalendarDays, ClipboardList, LineChart, QrCode, ShoppingCart, Store, Workflow } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { useGsapReveal } from "@/components/animation/useGsapReveal";

const systemPillars = [
  { label: "Weekly Aggregator", detail: "Inventory, pricing, and purchasing decisions in one planning view", icon: ShoppingCart },
  { label: "Menu & QR System", detail: "A public menu touchpoint for Kingston customers, specials, and fast sharing", icon: QrCode },
  { label: "Ordering Operations", detail: "Pickup, delivery, customer notes, and admin order-status workflows", icon: ClipboardList },
  { label: "Brand & Engagement", detail: "Consistent digital presence around Hylander Mobile's bold local identity", icon: Store }
];

const flow = [
  {
    label: "Before",
    title: "Strong business, scattered systems",
    points: ["Manual weekly planning", "Purchasing decisions spread across sources", "Menu, ordering, and customer touchpoints needed tighter structure", "Growth opportunities needed clearer operating rhythm"]
  },
  {
    label: "System",
    title: "Practical implementation layer",
    points: ["Weekly aggregation tool", "Inventory and pricing comparison support", "Public menu and QR customer touchpoints", "Pickup/delivery order flow and admin dashboard support"]
  },
  {
    label: "Result",
    title: "More organized growth",
    points: ["Reported 50% revenue growth within the first 3 months", "Better operational visibility", "More consistent customer engagement", "Systems that could support expansion"]
  }
];

const aggregatorRows = [
  ["Chop cheese", "Weekly", "High-demand staple", "Plan"],
  ["Wings", "Sauces", "Flavor mix tracked", "Prep"],
  ["Pierogis", "Sides", "Inventory check", "Order"],
  ["Drinks", "Mango / Gatorade", "Restock signal", "Adjust"]
];

const menuReferences = ["Chop cheese", "Chop chicken", "Wings", "Sliders", "Pierogis", "Sauce Roulette", "Pickup / Delivery"];

const aggregatorBenefits = [
  "Best prices on ingredients and supplies",
  "Lower unnecessary spending",
  "Simpler weekly purchasing decisions",
  "Better inventory planning",
  "Faster response to pricing changes",
  "More confidence testing new menu ideas"
];

export function HylanderCaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-shell relative overflow-hidden" data-gsap="section">
      <FloatingNodeClusters density="rich" size="large" movement="school" focus="both" seed={144} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tree-green/30 to-transparent" aria-hidden="true" />
      <div className="container-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div data-gsap="heading">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">Case Study: Hylander Mobile</p>
            <h2 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Real systems for a real business already built on quality.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              Hylander Mobile was already growing with strong product identity, community trust, and ambition in Kingston, NY. TREE helped accelerate that momentum with operational strategy, practical AI systems, workflow automation, marketing support, menu infrastructure, and implementation guidance.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="https://hylander-mobile.vercel.app/#menu" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-3 text-sm font-bold text-tree-green transition hover:bg-tree-green hover:text-black">
                View Hylander Mobile
              </Link>
              <Link href="https://hylander-mobile-network.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-tree-cyan/25 bg-tree-cyan/10 px-5 py-3 text-sm font-bold text-tree-cyan transition hover:border-tree-cyan/45 hover:bg-tree-cyan/15">
                View Pitch Deck
              </Link>
            </div>
          </div>

          <GlassCard data-gsap="card" className="relative overflow-hidden p-0">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/sections/hylander-open.png"
                alt="Hylander Mobile open sign and brand identity used in the TREE implementation case study"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-tree-black via-tree-black/45 to-transparent" />
              <div className="image-node-glint" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/80">Implementation Partnership</p>
                <p className="mt-2 max-w-lg text-xl font-black leading-tight text-white md:text-3xl">
                  AI works best when paired with businesses that already care about quality.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <GlassCard data-gsap="card" className="relative overflow-hidden">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-tree-green/70">Highlighted Result</p>
            <div className="mt-6 flex items-end gap-4">
              <p className="text-6xl font-black leading-none tracking-tight text-white md:text-8xl">50%</p>
              <ArrowUpRight className="mb-3 h-10 w-10 text-tree-green" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-2xl font-black text-white">Reported revenue growth within the first 3 months.</h3>
            <p className="mt-4 leading-8 text-gray-400">
              Presented as a client-reported business outcome, not a promise of identical results. TREE supported the growth with stronger organization, clearer weekly planning, menu and QR customer touchpoints, better customer engagement, and operational systems around momentum already underway.
            </p>
          </GlassCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {systemPillars.map(({ label, detail, icon: Icon }) => (
              <GlassCard key={label} data-gsap="card" className="h-full">
                <Icon className="mb-4 h-6 w-6 text-tree-green" aria-hidden="true" />
                <h3 className="text-xl font-black text-white">{label}</h3>
                <p className="mt-3 leading-7 text-gray-400">{detail}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <GlassCard data-gsap="image" className="overflow-hidden p-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              <Image
                src="/images/sections/hylander-menu.png"
                alt="Hylander Mobile public menu with chop cheese, chop chicken, wings, sliders, pierogis, drinks, and Sauce Roulette flavors"
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
          </GlassCard>

          <div className="grid gap-4">
            <GlassCard data-gsap="card">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-tree-green/70">Real customer touchpoint</p>
              <h3 className="mt-3 text-2xl font-black text-white">Menu infrastructure, not just marketing.</h3>
              <p className="mt-4 leading-8 text-gray-400">
                The Hylander Mobile project connected brand, menu clarity, customer engagement, and operational planning around the actual items people order: chop cheese, chop chicken, wings, sliders, pierogis, Sauce Roulette flavors, mango drinks, water, and Gatorade.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {menuReferences.map((item) => (
                  <span key={item} className="rounded-full border border-tree-green/20 bg-tree-green/10 px-3 py-1 text-xs font-bold text-tree-green">
                    {item}
                  </span>
                ))}
              </div>
            </GlassCard>

            <div className="grid gap-4 md:grid-cols-[0.74fr_1.26fr]">
              <GlassCard data-gsap="image" className="overflow-hidden p-0">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/sections/hylander-qr.png"
                    alt="Hylander Mobile QR menu artwork used for customer menu access"
                    fill
                    sizes="(min-width: 1024px) 22vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </GlassCard>
              <GlassCard data-gsap="card">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-tree-violet/80">Customer Engagement</p>
                <h3 className="mt-3 text-2xl font-black text-white">QR access, Sauce Roulette, and social momentum.</h3>
                <p className="mt-4 leading-8 text-gray-400">
                  TREE helped shape practical digital touchpoints around the Hylander Mobile experience: a shareable menu, QR-driven access, playful Sauce Roulette engagement, Instagram continuity, and a clearer path from interest to order.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <GlassCard data-gsap="image" className="overflow-hidden p-0">
            <div className="border-b border-white/10 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/70">Featured System</p>
                  <h3 className="mt-2 text-2xl font-black text-white">Weekly Aggregator Tool</h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-tree-green/20 bg-tree-green/10 px-3 py-1 text-xs font-bold text-tree-green">
                  <CalendarDays className="h-4 w-4" />
                  Weekly planning
                </div>
              </div>
              <p className="mt-4 max-w-3xl leading-7 text-gray-400">
                A custom operational intelligence and purchasing system designed to help Hylander Mobile make smarter weekly inventory and sourcing decisions. The Weekly Aggregator compares food pricing, availability, and purchasing opportunities across local stores and suppliers, then organizes the best options into one centralized planning view.
              </p>
              <p className="mt-3 max-w-3xl leading-7 text-gray-400">
                It is not just a pricing tool. It functions as an AI-assisted operational planning system that turns fragmented purchasing workflows into a clearer decision-making process for sourcing, inventory, menu experiments, and expansion.
              </p>
            </div>

            <div className="relative overflow-hidden bg-[#050505] p-4 md:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(74,222,128,0.13),transparent_20rem),radial-gradient(circle_at_82%_68%,rgba(103,232,249,0.11),transparent_18rem)]" aria-hidden="true" />
              <div className="relative grid gap-4 xl:grid-cols-[1fr_0.68fr]">
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <div className="mb-4 grid grid-cols-[1fr_0.8fr_1fr_0.7fr] gap-3 text-[0.65rem] font-black uppercase tracking-[0.16em] text-gray-500">
                    <span>Category</span>
                    <span>Sources</span>
                    <span>Signal</span>
                    <span>Next</span>
                  </div>
                  <div className="space-y-3">
                    {aggregatorRows.map(([category, sources, signal, next]) => (
                      <div key={category} className="grid grid-cols-[1fr_0.8fr_1fr_0.7fr] gap-3 rounded-lg border border-white/10 bg-tree-black/55 p-3 text-sm">
                        <span className="font-bold text-white">{category}</span>
                        <span className="text-gray-400">{sources}</span>
                        <span className="text-gray-300">{signal}</span>
                        <span className="font-bold text-tree-green">{next}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-xl border border-tree-green/20 bg-tree-green/[0.06] p-4">
                    <LineChart className="h-6 w-6 text-tree-green" aria-hidden="true" />
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-tree-green/80">Planning Signal</p>
                    <p className="mt-2 text-2xl font-black text-white">Buy with visibility</p>
                    <p className="mt-2 text-sm leading-6 text-gray-400">Compare price movement, menu demand, event prep, and restock needs before purchasing.</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                    <Workflow className="h-6 w-6 text-tree-violet" aria-hidden="true" />
                    <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-tree-violet/80">Workflow</p>
                    <p className="mt-2 text-2xl font-black text-white">Plan, source, expand</p>
                    <p className="mt-2 text-sm leading-6 text-gray-400">Reduce overhead while giving the owner more flexibility to test products and optimize sourcing decisions.</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 grid gap-2 md:grid-cols-2">
                {aggregatorBenefits.map((benefit) => (
                  <div key={benefit} className="rounded-lg border border-white/10 bg-tree-black/50 px-3 py-2 text-sm font-semibold text-gray-300">
                    {benefit}
                  </div>
                ))}
              </div>
              <div className="relative mt-4 rounded-xl border border-tree-green/20 bg-tree-green/[0.06] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-tree-green/70">Operational Result</p>
                <p className="mt-2 leading-7 text-gray-300">
                  Faster planning, better purchasing visibility, improved organization, lower day-to-day friction, and more room for growth and experimentation.
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-4">
            {flow.map((item) => (
              <GlassCard key={item.label} data-gsap="card">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/70">{item.label}</p>
                <h3 className="mt-3 text-2xl font-black text-white">{item.title}</h3>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-7 text-gray-400">
                      <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-tree-green" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
