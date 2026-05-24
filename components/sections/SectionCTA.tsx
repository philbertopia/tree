import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";

interface SectionCTAProps {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  variant?: "card" | "inline";
}

export function SectionCTA({ eyebrow, title, description, cta, variant = "card" }: SectionCTAProps) {
  if (variant === "inline") {
    return (
      <div className="px-4 pb-2 pt-0 md:px-6">
        <div className="container-shell border-t border-white/[0.06] pt-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-tree-green/55">{eyebrow}</p>
              <p className="mt-1.5 max-w-xl text-base font-bold text-white">{title}</p>
            </div>
            <a
              href="/contact"
              className="shrink-0 text-sm font-bold text-tree-green transition hover:text-tree-leaf"
            >
              {cta} →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 py-8 md:px-6">
      <div className="container-shell">
        <GlassCard className="relative grid overflow-hidden p-6 md:p-8">
          <FloatingNodeClusters density="medium" size="large" movement="drift" focus="right" seed={48} />
          <div className="relative z-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-tree-green/70">{eyebrow}</p>
              <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">{title}</h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-400">{description}</p>
            </div>
            <CTAButton href="/contact">{cta}</CTAButton>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
