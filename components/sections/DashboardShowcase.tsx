"use client";

import { Bar, BarChart, Cell, Line, LineChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Activity, AlertTriangle, CheckCircle2, Clock, FileText, ShieldAlert } from "lucide-react";
import { dashboardData } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DashboardShowcase() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Dashboard showcase"
          title="Mock operations panels for AI systems that stay accountable."
          description="These are sample metrics, but the pattern is real: every automation needs visibility, approval, and a way for humans to steer."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard title="AI Agent Activity" metric="42 tasks automated this week" icon={Activity}>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={dashboardData}>
                <Bar dataKey="tasks" fill="#4ade80" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </MetricCard>
          <MetricCard title="SEO Growth" metric="18 pages generated for review" icon={FileText}>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={dashboardData}>
                <Line type="monotone" dataKey="seo" stroke="#a78bfa" strokeWidth={3} dot={false} />
                <Tooltip contentStyle={{ background: "#080808", border: "1px solid rgba(255,255,255,.1)" }} />
              </LineChart>
            </ResponsiveContainer>
          </MetricCard>
          <MetricCard title="Social Queue" metric="24 posts scheduled" icon={Clock}>
            <StatusList items={["8 waiting for review", "11 scheduled", "5 published today"]} />
          </MetricCard>
          <MetricCard title="Lead Pipeline" metric="12 leads captured" icon={CheckCircle2}>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={dashboardData}>
                <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Bar dataKey="leads" fill="#a78bfa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </MetricCard>
          <MetricCard title="Risk / Security Scan" metric="3 risks flagged" icon={ShieldAlert}>
            <StatusList items={["1 high-priority approval", "2 medium alerts", "0 exposed secrets"]} tone="violet" />
          </MetricCard>
          <MetricCard title="Workflow Approval" metric="91% approval accuracy" icon={AlertTriangle}>
            <ResponsiveContainer width="100%" height={120}>
              <RadialBarChart innerRadius="62%" outerRadius="95%" data={[{ name: "approval", value: 91 }]}>
                <RadialBar dataKey="value" cornerRadius={10}>
                  <Cell fill="#4ade80" />
                </RadialBar>
              </RadialBarChart>
            </ResponsiveContainer>
          </MetricCard>
        </div>
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
    <GlassCard className="min-h-[260px]">
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
