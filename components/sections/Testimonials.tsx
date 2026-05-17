import { testimonials } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Placeholder testimonials"
          title="The tone we build for: useful, specific, and honest."
          description="These sample testimonials are placeholder content for launch design. Replace them with client quotes when TREE has approved case studies."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <GlassCard key={testimonial.role} className="flex min-h-[280px] flex-col justify-between">
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
