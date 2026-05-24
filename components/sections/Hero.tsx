"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";

const HeroTreeCanvas = dynamic(() => import("@/components/visuals/HeroTreeCanvas").then((mod) => mod.HeroTreeCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full" />
});

const heroCapabilities = ["Automation", "Dashboards", "AI Training", "Security", "Finance", "Business Development", "Healthcare", "Justice"];

export function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="relative flex min-h-[96svh] items-center overflow-hidden px-4 pb-20 pt-28 md:min-h-[94svh]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 1.6s ease" }}
        aria-hidden="true"
      >
        <Image
          src="/images/sections/hero-fallback.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-95 md:object-[62%_center]"
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.42)_0%,rgba(5,5,5,0.64)_36%,rgba(5,5,5,0.72)_70%,#050505_100%)] md:bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.9)_24%,rgba(5,5,5,0.52)_49%,rgba(5,5,5,0.2)_72%,rgba(5,5,5,0.62)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(74,222,128,0.18),transparent_28rem),radial-gradient(circle_at_26%_52%,rgba(5,5,5,0.62),transparent_32rem)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <HeroTreeCanvas />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-tree-black/72 to-tree-black"
        aria-hidden="true"
      />
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="container-shell relative z-10 mx-auto"
      >
        <div className="mx-auto max-w-[22rem] text-center md:mx-0 md:max-w-[46rem] md:text-left">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-tree-green/85 [text-shadow:0_0_22px_rgba(0,0,0,0.9)]">
            AI Agency / Hudson Valley
          </p>
          <h1 className="text-balance text-[1.95rem] font-black leading-[1.04] tracking-tight text-white [text-shadow:0_0_34px_rgba(0,0,0,0.94)] sm:text-5xl md:text-6xl lg:text-[4.35rem] xl:text-[4.7rem]">
            <span className="sm:hidden">
              <span className="block">Custom AI Systems</span>
              <span className="block">for Business</span>
              <span className="block">Security, Finance,</span>
              <span className="block">and Growth.</span>
            </span>
            <span className="hidden sm:block">
              <span className="block">Custom AI Systems</span>
              <span className="block">for Business,</span>
              <span className="block">Security, Finance,</span>
              <span className="block">and Growth.</span>
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-[19rem] text-sm leading-7 text-gray-200 [text-shadow:0_0_22px_rgba(0,0,0,0.96)] sm:max-w-2xl sm:text-base md:mx-0 md:text-lg md:leading-8">
            TREE builds AI automation, dashboards, training programs, and decision systems for businesses and individuals
            who want practical results without losing control.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
            <div className="relative inline-flex">
              {/* Orbiting glow dots */}
              <span className="pointer-events-none absolute -left-3 -top-1.5 h-2 w-2 animate-pulse rounded-full bg-tree-green/85 blur-[3px] [animation-duration:1.7s]" aria-hidden="true" />
              <span className="pointer-events-none absolute -right-3 -bottom-1.5 h-2 w-2 animate-pulse rounded-full bg-cyan-400/75 blur-[3px] [animation-duration:2.2s] [animation-delay:0.5s]" aria-hidden="true" />
              <span className="pointer-events-none absolute -right-4 top-0.5 h-1.5 w-1.5 animate-pulse rounded-full bg-tree-green/65 blur-[2px] [animation-duration:1.5s] [animation-delay:1.1s]" aria-hidden="true" />
              <span className="pointer-events-none absolute -left-2 bottom-0 h-1.5 w-1.5 animate-pulse rounded-full bg-violet-400/70 blur-[2px] [animation-duration:2s] [animation-delay:0.3s]" aria-hidden="true" />
              <span className="pointer-events-none absolute left-1/3 -top-2.5 h-1 w-1 animate-pulse rounded-full bg-tree-green/90 blur-[1px] [animation-duration:1.4s] [animation-delay:0.7s]" aria-hidden="true" />
              <span className="pointer-events-none absolute right-1/4 -bottom-2.5 h-1 w-1 animate-pulse rounded-full bg-cyan-400/80 blur-[1px] [animation-duration:1.9s] [animation-delay:1.3s]" aria-hidden="true" />
              <CTAButton href="/contact">Get a Free Consultation</CTAButton>
            </div>
            <CTAButton href="/#services" variant="secondary">
              Explore Systems
            </CTAButton>
          </div>
          <div className="mx-auto mt-7 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 md:mx-0 md:justify-start">
            {heroCapabilities.map((capability) => (
              <span
                key={capability}
                className="shrink-0 rounded-full border border-white/10 bg-black/38 px-2.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-gray-200 shadow-[0_0_28px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-3 sm:text-xs sm:tracking-[0.16em]"
              >
                <span className="sm:hidden">{capability === "Business Development" ? "Business Dev" : capability}</span>
                <span className="hidden sm:inline">{capability}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.35em] text-gray-600">
        Scroll
      </div>
    </section>
  );
}
