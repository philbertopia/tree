import { testimonials } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";

export function Testimonials() {
  return (
    <section className="section-shell relative overflow-hidden">
      <FloatingNodeClusters density="soft" size="small" movement="drift" focus="both" seed={99} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Client work"
          title="Useful, specific, and honest systems for real organizations."
          description="TREE works with local operators, financial teams, and business owners who need practical AI, automation, training, and strategy that stays grounded in the work."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <GlassCard key={testimonial.role} className="flex flex-col justify-between md:min-h-[320px]">
              <p className="text-lg leading-8 text-gray-200">“{testimonial.quote}”</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
