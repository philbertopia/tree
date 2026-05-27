import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/seo-content";
import { SeedWidgetMount } from "@/components/assistant/SeedWidgetMount";

export const metadata: Metadata = {
  metadataBase: new URL("https://treesystems.ai"),
  title: {
    default: "TREE - Free AI Consultation + AI Agents for Local Businesses",
    template: "%s | TREE"
  },
  description:
    "TREE offers free AI consultations and limited-time free starter AI agents for qualifying local businesses. Practical AI automation, dashboards, websites, SEO, and education for real business workflows.",
  keywords: [
    "free AI consultation",
    "free AI agent for business",
    "free starter AI agent",
    "AI agents for local business",
    "AI consultation for small business",
    "AI agency Hudson Valley",
    "AI agency Kingston NY",
    "small business AI consultant",
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
    "AI rapid prototyping education",
    "custom AI systems"
  ],
  openGraph: {
    title: "TREE - Free AI Consultation + AI Agents for Local Businesses",
    description:
      "Limited-time offer: free consultation and a free starter AI agent for qualifying local businesses while promotional spots remain.",
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
    title: "TREE - Free AI Consultation + Starter AI Agent",
    description:
      "Practical AI systems for local businesses. Free consultation and limited-time free starter AI agent for qualifying businesses.",
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
                "TREE builds supervised AI agent systems, dashboards, automations, and education for businesses and teams. For a limited time, qualifying local businesses can receive a free consultation and free starter AI agent.",
              makesOffer: {
                "@type": "Offer",
                name: "Free AI Consultation and Free Starter AI Agent",
                description:
                "A limited-time promotional offer for qualifying local businesses: free consultation and a free starter AI agent with one focused workflow, 500 MB workspace storage, basic hosted interface, and light testing usage while promotional spots remain.",
                availability: "https://schema.org/LimitedAvailability",
                price: "0",
                priceCurrency: "USD",
                url: `${siteUrl}/contact`
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TREE Systems",
              url: siteUrl,
              description:
                "Practical AI systems, human-guided automation, dashboards, education, free AI consultations, and limited-time starter AI agents for local businesses."
            }
          ]}
        />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        {children}
        <SeedWidgetMount />
        <Footer />
      </body>
    </html>
  );
}
