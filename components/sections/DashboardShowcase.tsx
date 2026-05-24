"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Bar, BarChart, Cell, Line, LineChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Activity, Banknote, BriefcaseBusiness, CheckCircle2, HeartPulse, ShieldAlert } from "lucide-react";
import { dashboardData } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { useGsapReveal } from "@/components/animation/useGsapReveal";

export function DashboardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section-shell relative overflow-hidden" data-gsap="section">
      <FloatingNodeClusters density="medium" size="mixed" movement="crossflow" focus="edges" seed={108} />
      <div className="container-shell relative z-10">
        <div data-gsap="heading">
          <SectionHeading
            eyebrow="Dashboard showcase"
            title="Operational visibility for businesses, individuals, and AI-powered systems."
            description="TREE builds dashboards, automations, and decision systems that help people see what matters, act faster, and stay in control across business development, finance, security, healthcare, and personal productivity."
          />
        </div>
        <div className="mb-8 grid gap-4 md:grid-cols-[1.6fr_1fr]">
          <div data-gsap="image" className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
            <Image
              src="/images/sections/dashboard.png"
              alt="Custom AI dashboard with business, finance, security, and workflow metrics"
              fill
              sizes="(min-width: 1180px) 720px, 100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-tree-black/70 via-transparent to-tree-black/60" />
            <div className="absolute bottom-4 left-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-green/80">Operational Dashboard</p>
              <p className="mt-0.5 text-sm font-semibold text-white">Business · Finance · Security · Workflow</p>
            </div>
          </div>
          <div data-gsap="image" className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] md:aspect-auto">
            <Image
              src="/images/sections/futuristic-dashboard.png"
              alt="Futuristic AI command dashboard with real-time system metrics"
              fill
              sizes="(min-width: 1180px) 430px, 100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tree-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-tree-violet/80">AI Command Layer</p>
              <p className="mt-0.5 text-sm font-semibold text-white">Agent orchestration &amp; decision visibility</p>
            </div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard title="AI System Activity" metric="42 tasks routed with human review" icon={Activity}>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={dashboardData}>
                <Bar dataKey="tasks" fill="#4ade80" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </MetricCard>
          <MetricCard title="Business Development" metric="18 growth actions ready for review" icon={BriefcaseBusiness}>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={dashboardData}>
                <Line type="monotone" dataKey="seo" stroke="#a78bfa" strokeWidth={3} dot={false} />
                <Tooltip contentStyle={{ background: "#080808", border: "1px solid rgba(255,255,255,.1)" }} />
              </LineChart>
            </ResponsiveContainer>
          </MetricCard>
          <MetricCard title="Finance Automation" metric="24 transactions categorized" icon={Banknote}>
            <StatusList items={["8 cash-flow checks queued", "11 reports updated", "5 alerts ready for approval"]} />
          </MetricCard>
          <MetricCard title="Decision Pipeline" metric="12 opportunities prioritized" icon={CheckCircle2}>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={dashboardData}>
                <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Bar dataKey="leads" fill="#a78bfa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </MetricCard>
          <MetricCard title="Security Monitoring" metric="3 risks flagged for review" icon={ShieldAlert}>
            <StatusList items={["1 camera or sensor event", "2 medium-priority alerts", "0 exposed secrets"]} tone="violet" />
          </MetricCard>
          <MetricCard title="Healthcare / Personal Systems" metric="91% habit and workflow consistency" icon={HeartPulse}>
            <ResponsiveContainer width="100%" height={120}>
              <RadialBarChart innerRadius="62%" outerRadius="95%" data={[{ name: "approval", value: 91 }]}>
                <RadialBar dataKey="value" cornerRadius={10}>
                  <Cell fill="#4ade80" />
                </RadialBar>
              </RadialBarChart>
            </ResponsiveContainer>
          </MetricCard>
        </div>
        <Link href="/solutions/ai-dashboard-systems" data-gsap="cta" className="mt-8 inline-flex rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-3 text-sm font-bold text-tree-green transition hover:bg-tree-green hover:text-black">
          Explore AI dashboard systems
        </Link>
      </div>
    </section>
  );
}

function MetricCard({
  title,
  metric,
  icon: Icon,
  children
}: {
  title: string;
  metric: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <GlassCard data-gsap="card" className="md:min-h-[260px] hover:-translate-y-1 hover:border-tree-green/40 hover:shadow-[0_12px_32px_rgba(74,222,128,0.08)]">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">{title}</p>
          <h3 className="mt-3 text-2xl font-black text-white">{metric}</h3>
        </div>
        <Icon className="h-7 w-7 text-tree-green" />
      </div>
      {children}
    </GlassCard>
  );
}

function StatusList({ items, tone = "green" }: { items: string[]; tone?: "green" | "violet" }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-sm text-gray-300">
          <span className={tone === "green" ? "h-2 w-2 rounded-full bg-tree-green" : "h-2 w-2 rounded-full bg-tree-violet"} />
          {item}
        </div>
      ))}
    </div>
  );
}
