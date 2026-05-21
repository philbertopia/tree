import { trainingItems } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TrainingSection() {
  return (
    <section id="training" className="section-shell scroll-mt-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="TREE Training"
          title="You don't need to become a programmer. You need to understand your system."
          description="TREE doesn't just build and disappear. We train and consult with business owners, teams, and individuals so they can use AI systems confidently, safely prompt and review outputs, and make better decisions with the tools around them."
        />
        <GlassCard tone="violet" className="grid gap-4">
          {trainingItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.description} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <Icon className="mt-1 h-5 w-5 flex-none text-tree-green" />
                <p className="leading-7 text-gray-300">{item.description}</p>
              </div>
            );
          })}
        </GlassCard>
      </div>
    </section>
  );
}
