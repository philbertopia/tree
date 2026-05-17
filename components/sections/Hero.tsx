"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";

const HeroTreeCanvas = dynamic(() => import("@/components/visuals/HeroTreeCanvas").then((mod) => mod.HeroTreeCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[radial-gradient(circle,rgba(74,222,128,0.12),transparent_55%)]" />
});

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 opacity-70">
        <HeroTreeCanvas />
      </div>
      <div className="branch-bg absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.18),#050505_72%)]" />
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="container-shell relative z-10 mx-auto max-w-5xl text-center"
      >
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.45em] text-tree-green/70">
          AI Agency · Hudson Valley
        </p>
        <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          Branching Intelligence for Real Businesses.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
          TREE designs, builds, and teaches practical AI systems for businesses that want automation without the hype.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton href="/contact">Get a Free Consultation</CTAButton>
          <CTAButton href="/#services" variant="secondary">
            Explore Systems
          </CTAButton>
        </div>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.35em] text-gray-700">
        Scroll
      </div>
    </section>
  );
}
