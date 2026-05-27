import type { Metadata } from "next";
import { ContactForm, ContactOptions } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteUrl } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "Free AI Consultation + Free Starter AI Agent",
  description:
    "Book a free AI consultation with TREE. For a limited time, qualifying local businesses can receive a free starter AI agent while promotional spots remain.",
  keywords: [
    "free AI consultation",
    "free AI agent",
    "free starter AI agent",
    "AI consultation for local business",
    "AI agent for small business",
    "Kingston NY AI consultant",
    "Hudson Valley AI agency"
  ],
  openGraph: {
    title: "Free AI Consultation + Free Starter AI Agent | TREE",
    description:
      "No commitment. No pressure. Qualifying local businesses can receive a free starter AI agent after a free consultation while promotional spots remain."
  },
  twitter: {
    title: "Free AI Consultation + Free Starter AI Agent | TREE",
    description:
      "Claim a free AI consultation and limited-time free starter AI agent for your local business."
  }
};

export default function ContactPage() {
  return (
    <main id="main" className="min-h-screen px-4 pb-20 pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Offer",
          name: "Free AI Consultation and Free Starter AI Agent",
          description:
            "TREE offers a free AI consultation and a limited-time free starter AI agent for qualifying local businesses. The starter agent includes one focused workflow, 500 MB workspace storage, a basic hosted interface, and light testing usage while promotional spots remain.",
          availability: "https://schema.org/LimitedAvailability",
          price: "0",
          priceCurrency: "USD",
          url: `${siteUrl}/contact`,
          offeredBy: {
            "@type": "ProfessionalService",
            name: "TREE Systems",
            url: siteUrl,
            telephone: "+12012791840"
          }
        }}
      />
      <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-tree-green">Limited-Time Offer</p>
          <h1 className="text-balance text-5xl font-black tracking-tight text-white md:text-7xl">
            Free consultation. Free starter AI agent.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Tell us about your business and what you're trying to improve. If we find one practical workflow where AI can
            help, qualifying businesses can receive a free starter AI agent while promotional spots remain.
          </p>
          <div className="mt-6 rounded-xl border border-tree-green/20 bg-tree-green/[0.07] p-4 text-sm leading-6 text-gray-300">
            No commitment required. The free starter agent includes one focused workflow, 500 MB workspace storage, a
            basic hosted interface, and light usage for testing. Advanced integrations, higher usage, long-term
            maintenance, and mission-critical operations can be scoped as a paid plan.
          </div>
          <ContactOptions />
        </div>
        <GlassCard className="p-5 md:p-8">
          <ContactForm />
        </GlassCard>
      </div>
    </main>
  );
}
