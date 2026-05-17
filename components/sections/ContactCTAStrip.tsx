import { CTAButton } from "@/components/ui/CTAButton";
import { GlassCard } from "@/components/ui/GlassCard";

export function ContactCTAStrip() {
  return (
    <section id="contact" className="section-shell scroll-mt-24">
      <div className="container-shell">
        <GlassCard className="overflow-hidden p-8 text-center md:p-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green">Free Consultation</p>
            <h2 className="text-balance text-4xl font-black tracking-tight text-white md:text-6xl">Ready to build your system?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              Start with a real conversation about what automation can do for your business, what it should not do, and where the first useful system should grow.
            </p>
            <div className="mt-8">
              <CTAButton href="/contact">Get a Free Consultation</CTAButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
