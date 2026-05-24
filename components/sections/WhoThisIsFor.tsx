"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { audienceCards } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const audienceImage = "/images/sections/buisness-dev.png";

export function WhoThisIsFor() {
  return (
    <section className="section-shell relative overflow-hidden">
      <FloatingNodeClusters density="medium" size="mixed" movement="school" focus="both" seed={120} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Who this is for"
          title="AI systems for the people carrying the real decisions."
          description="TREE works with businesses and individuals who need practical support, clearer visibility, and tools they can actually understand."
        />
        <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
          <Image
            src={audienceImage}
            alt="AI systems for business owners, individuals, finance teams, creators, and local businesses"
            fill
            sizes="(min-width: 1180px) 1180px, 100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-tree-black/75 via-tree-black/20 to-tree-black/60" />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        >
          {audienceCards.map((audience) => {
            const Icon = audience.icon;
            return (
              <motion.div key={audience.title} variants={fadeInUp}>
                <GlassCard tone={audience.tone ?? "green"} className="h-full min-h-[245px]">
                  <Icon className="mb-6 h-7 w-7 text-tree-green" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-white">{audience.title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{audience.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
