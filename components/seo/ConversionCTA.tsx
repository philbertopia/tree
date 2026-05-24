import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface ConversionCTAProps {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: string;
}

export function ConversionCTA({
  eyebrow = "Next step",
  title,
  description,
  cta = "Map my first automation"
}: ConversionCTAProps) {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(74,222,128,0.12),transparent_18rem),radial-gradient(circle_at_90%_80%,rgba(167,139,250,0.1),transparent_18rem)]" aria-hidden="true" />
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-tree-green/70">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-gray-400">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-tree-green px-5 py-3 font-bold text-black transition hover:bg-tree-leaf">
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/process" className="inline-flex items-center gap-2 rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-3 font-bold text-tree-green transition hover:bg-tree-green hover:text-black">
            See the process
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
