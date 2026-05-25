"use client";

import dynamic from "next/dynamic";

const ToolsConstellation = dynamic(
  () => import("@/components/sections/ToolsConstellation").then((mod) => mod.ToolsConstellation),
  {
    ssr: false,
    loading: () => (
      <section className="section-shell">
        <div className="container-shell rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-gray-400">
          Loading tools constellation...
        </div>
      </section>
    )
  }
);

export function ToolsConstellationMount() {
  return <ToolsConstellation />;
}
