"use client";

import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { useGsapReveal } from "@/components/animation/useGsapReveal";

export function ContactCTAStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  return (
    <section ref={sectionRef} id="contact" className="section-shell relative overflow-hidden scroll-mt-24" data-gsap="section">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 55% at 50% 100%, rgba(74,222,128,0.08), transparent)"
        }}
        aria-hidden="true"
      />
      <FloatingNodeClusters density="rich" size="large" movement="crossflow" focus="both" seed={60} />

      <div className="container-shell relative z-10 text-center">
        <p data-gsap="heading" className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-tree-green/80">
          Free Consultation
        </p>
        <h2
          data-gsap="heading"
          className="text-balance font-black leading-[0.96] tracking-tight text-white"
          style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
        >
          Ready to build<br className="hidden sm:block" /> your system?
        </h2>
        <p data-gsap="heading" className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400">
          Start with a real conversation. TREE scopes every system around your actual problem - no templates, no guesswork.
        </p>

        <div data-gsap="cta" className="mt-9">
          <CTAButton href="/contact">Get a Free Consultation</CTAButton>
        </div>

        <div className="mx-auto mt-10 max-w-xs">
          <a
            href="sms:+12012791840"
            data-gsap="card"
            className="flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-gray-300 transition hover:border-tree-green/30 hover:bg-tree-green/[0.06] hover:text-white"
          >
            <MessageCircle className="h-4 w-4 shrink-0 text-tree-green" aria-hidden="true" />
            Text (201) 279-1840
          </a>
        </div>

        <p data-gsap="pill" className="mt-5 text-sm text-gray-600">
          We respond within one business day
        </p>
      </div>
    </section>
  );
}
