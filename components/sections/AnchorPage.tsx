import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function AnchorPage({ title, href }: { title: string; href: string }) {
  return (
    <main id="main" className="grid min-h-screen place-items-center px-4 py-32">
      <GlassCard className="max-w-2xl text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green">TREE</p>
        <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-md leading-8 text-gray-400">
          This section lives on the main TREE landing page so the story stays connected.
        </p>
        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-tree-green/30 bg-tree-green/10 px-5 py-3 font-bold text-tree-green transition hover:bg-tree-green hover:text-black"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </GlassCard>
    </main>
  );
}
