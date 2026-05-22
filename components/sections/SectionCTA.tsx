import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";

interface SectionCTAProps {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
}

export function SectionCTA({ eyebrow, title, description, cta }: SectionCTAProps) {
  return (
    <section className="px-4 py-8 md:px-6">
      <div className="container-shell">
        <GlassCard className="grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-tree-green/70">{eyebrow}</p>
            <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">{title}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-gray-400">{description}</p>
          </div>
          <CTAButton href="/contact">{cta}</CTAButton>
        </GlassCard>
      </div>
    </section>
  );
}
