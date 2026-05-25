"use client";

import dynamic from "next/dynamic";

const SeedWidget = dynamic(() => import("@/components/assistant/SeedWidget").then((mod) => mod.SeedWidget), {
  ssr: false
});

export function SeedWidgetMount() {
  return <SeedWidget />;
}
