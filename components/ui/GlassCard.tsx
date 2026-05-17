import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "green" | "violet";
}

export function GlassCard({ className, tone = "green", ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 shadow-glow",
        tone === "violet" && "glass-violet shadow-violet",
        className
      )}
      {...props}
    />
  );
}
