"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  ["01", "We audit before we build.", "We map your actual business before recommending any tool."],
  ["02", "We build for humans.", "Every system TREE builds keeps human judgment in the loop."],
  ["03", "We teach, not just deliver.", "Your team learns to own what we build, improve it, and question it."]
];

export function NoHypeSection() {
  return (
    <section className="section-shell">
      <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            eyebrow="The TREE approach"
            title="Most businesses don't need more AI tools. They need a system."
            description="TREE helps you choose the right tools, connect them to your real workflow, and train your team to use them without losing control."
          />
          <p className="max-w-2xl text-xl leading-9 text-white">
            Automation should feel like a living extension of your business, not a pile of disconnected apps.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid gap-4"
        >
          {points.map(([number, title, description]) => (
            <GlassCard key={number} className="flex gap-5">
              <span className="text-2xl font-black text-tree-green">{number}</span>
              <div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 leading-7 text-gray-400">{description}</p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
