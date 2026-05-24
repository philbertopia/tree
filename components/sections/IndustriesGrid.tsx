"use client";

import { motion } from "framer-motion";
import { industries } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const industryGroups = ["Local Business", "Professional Services", "Finance & Security", "Creators & Digital", "Individuals & Training"];

export function IndustriesGrid() {
  return (
    <section id="industries" className="section-shell relative overflow-hidden scroll-mt-24">
      <FloatingNodeClusters density="swarm" size="mixed" movement="school" focus="edges" seed={24} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Industries"
          title="Practical AI for real businesses, not one-size-fits-all software."
          description="TREE adapts to the business in front of us: local, regulated, creative, financial, operational, or deeply technical."
        />
        <div className="grid gap-10">
          {industryGroups.map((group) => {
            const groupIndustries = industries.filter((industry) => industry.group === group);

            return (
              <div key={group}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-white/10" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.28em] text-gray-500">{group}</h3>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                >
                  {groupIndustries.map((industry) => {
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
