import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/seo-content";
import { SeedWidget } from "@/components/assistant/SeedWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://treesystems.ai"),
  title: {
    default: "TREE — AI Agency Hudson Valley | Practical AI Systems for Real Businesses",
    template: "%s | TREE"
  },
  description:
    "TREE designs, builds, and teaches custom AI automation systems for businesses. AI agents, LLM workflows, SEO, social automation, blockchain development, and AI training. Hudson Valley based, globally focused.",
  keywords: [
    "AI agency Hudson Valley",
    "AI automation agency",
    "AI consulting for small business",
    "AI workflow automation",
    "LLM automation",
    "AI agents for business",
    "AI SEO services",
    "AI social media automation",
    "AI website management",
    "blockchain AI development",
    "local AI consultant",
    "vibe coding training",
    "custom AI systems"
  ],
  openGraph: {
    title: "TREE — Practical AI Systems for Real Businesses",
    description: "AI without the hype. Human-guided automation, AI agents, websites, SEO, dashboards, and training.",
    type: "website",
    images: [
      {
        url: "/images/social/og-image.png",
        width: 1200,
        height: 630,
        alt: "TREE AI automation systems and dashboards"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TREE — Practical AI Systems for Real Businesses",
    description: "AI without the hype. Human-guided automation, AI agents, websites, SEO, dashboards, and training.",
    images: ["/images/social/og-image.png"]
  },
  icons: {
    icon: "/images/brand/favicon.png",
    shortcut: "/images/brand/favicon.png",
    apple: "/images/brand/favicon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "TREE Systems",
              url: siteUrl,
              email: process.env.CONTACT_EMAIL,
              telephone: "+12012791840",
              areaServed: "United States",
              address: {
                "@type": "PostalAddress",
                addressRegion: "NY",
                addressCountry: "US"
              },
              description:
                "TREE builds supervised AI agent systems, dashboards, automations, and training for businesses and teams."
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TREE Systems",
              url: siteUrl,
              description:
                "Practical AI systems, human-guided automation, dashboards, and training for real business workflows."
            }
          ]}
        />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        {children}
        <SeedWidget />
        <Footer />
      </body>
    </html>
  );
}
