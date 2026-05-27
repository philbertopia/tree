"use client";

import dynamic from "next/dynamic";

type SeedOrbProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const SeedOrbCanvas = dynamic(() => import("@/components/assistant/SeedOrbCanvas").then((mod) => mod.SeedOrbCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-full bg-tree-green/20 shadow-[0_0_32px_rgba(74,222,128,0.28)]" />
});

const sizes = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-20 w-20",
  xl: "h-28 w-28"
};

export function SeedOrb({ size = "md", className = "" }: SeedOrbProps) {
  return (
    <div className={`${sizes[size]} ${className}`} aria-hidden="true">
      <SeedOrbCanvas />
    </div>
  );
}
