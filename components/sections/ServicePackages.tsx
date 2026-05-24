"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { servicePackages } from "@/lib/data";
import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const packageImages: Record<string, string> = {
  "AI Consultation": "/images/sections/consultant.png",
  "Automation Build": "/images/sections/automation.png",
  "Dashboard/System Build": "/images/sections/floating-dashboard.png",
  "Security/Finance Systems": "/images/sections/security-finance.png",
  "Training Program": "/images/sections/vide-coding.png"
};

export function ServicePackages() {
  return (
    <section className="section-shell relative overflow-hidden">
      <FloatingNodeClusters density="rich" size="mixed" movement="crossflow" focus="edges" seed={84} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Service Packages"
          title="Clear starting points, custom-built around your situation."
          description="Every system is scoped around the real problem, but these packages give the work a shape before we start."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        >
          {servicePackages.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeInUp}>
                <GlassCard tone={item.tone ?? "green"} className="flex h-full min-h-[310px] flex-col hover:-translate-y-1.5 hover:border-tree-green/40 hover:shadow-[0_12px_32px_rgba(74,222,128,0.1)]">
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                    <Image
                      src={packageImages[item.title]}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tree-black/70 via-transparent to-transparent" />
                  </div>
                  <Icon className="mb-6 h-7 w-7 text-tree-green" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-gray-400">{item.description}</p>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Best fit</p>
                    <p className="mt-2 text-sm leading-6 text-gray-300">{item.audience}</p>
                    <p className="mt-4 inline-flex rounded-full border border-tree-green/20 bg-tree-green/10 px-3 py-1 text-xs font-bold text-tree-green">
                      {item.price}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-8">
          <CTAButton href="/contact">Map your system</CTAButton>
        </div>
      </div>
    </section>
  );
}
