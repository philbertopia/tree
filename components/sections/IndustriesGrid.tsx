"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export function IndustriesGrid() {
  return (
    <section id="industries" className="section-shell scroll-mt-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Industries"
          title="Practical AI for real businesses, not one-size-fits-all software."
          description="TREE adapts to the business in front of us: local, regulated, creative, financial, operational, or deeply technical."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <motion.div key={industry.title} variants={fadeInUp}>
                <GlassCard tone={industry.tone ?? "green"} className="h-full">
                  <Icon className="mb-6 h-7 w-7 text-tree-green" />
                  <h3 className="text-xl font-bold text-white">{industry.title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{industry.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
