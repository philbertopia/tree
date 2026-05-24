"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export function ServicesGrid() {
  return (
    <section id="services" className="section-shell relative overflow-hidden scroll-mt-24">
      <FloatingNodeClusters density="rich" size="mixed" movement="crossflow" focus="right" seed={12} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Services"
          title="Systems that grow with your business."
          description="From food trucks to hedge funds, TREE builds around the way your business actually works."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={fadeInUp}>
                <GlassCard tone={service.tone ?? "green"} className="h-full transition hover:-translate-y-1 hover:border-tree-green/45">
                  <Icon className="mb-6 h-7 w-7 text-tree-green" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{service.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
