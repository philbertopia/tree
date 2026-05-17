import type { Metadata } from "next";
import { ContactForm, ContactOptions } from "@/components/sections/ContactForm";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = {
  title: "Free AI Consultation",
  description:
    "Book a free consultation with TREE. We'll map your business, identify automation opportunities, and tell you honestly what AI can and can't do for you."
};

export default function ContactPage() {
  return (
    <main id="main" className="min-h-screen px-4 pb-20 pt-32">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-tree-green">Free Consultation</p>
          <h1 className="text-balance text-5xl font-black tracking-tight text-white md:text-7xl">Let's talk about your system.</h1>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Tell us about your business and what you're trying to improve. We'll come back with a real, specific response,
            not a sales pitch.
          </p>
          <ContactOptions />
        </div>
        <GlassCard className="p-5 md:p-8">
          <ContactForm />
        </GlassCard>
      </div>
    </main>
  );
}
