"use client";

import { motion } from "framer-motion";
import { audienceCards } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export function WhoThisIsFor() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Who this is for"
          title="AI systems for the people carrying the real decisions."
          description="TREE works with businesses and individuals who need practical support, clearer visibility, and tools they can actually understand."
        />
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
