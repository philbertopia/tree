"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflowSteps } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BranchingWorkflow() {
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const path = lineRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        end: "bottom 35%",
        scrub: 1
      }
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="section-shell overflow-hidden">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Branching systems"
          title="A workflow for deciding what AI should do, and what it should leave alone."
          description="Every engagement starts with the business problem, then grows into a system with approvals, training, and ongoing optimization."
          align="center"
        />
        <div className="relative">
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1180 520" fill="none">
            <path
              ref={lineRef}
              d="M90 100 C230 40 250 250 380 170 S570 80 680 210 S870 420 1080 260"
              stroke="#4ade80"
              strokeOpacity="0.45"
              strokeWidth="2"
            />
          </svg>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <GlassCard key={step.title} tone={index > 3 ? "violet" : "green"} className={index % 2 ? "md:translate-y-10" : ""}>
                <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-tree-green">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 leading-7 text-gray-400">{step.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
