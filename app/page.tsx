import type { Metadata } from "next";
import { AIAgentsSection } from "@/components/sections/AIAgentsSection";
import { BranchingWorkflow } from "@/components/sections/BranchingWorkflow";
import { CaseStudyCards } from "@/components/sections/CaseStudyCards";
import { CollaborativeAISection } from "@/components/sections/CollaborativeAISection";
import { ContactCTAStrip } from "@/components/sections/ContactCTAStrip";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { ExecutiveSection } from "@/components/sections/ExecutiveSection";
import { FreeAgentPromo } from "@/components/sections/FreeAgentPromo";
import { Hero } from "@/components/sections/Hero";
import { HylanderCaseStudy } from "@/components/sections/HylanderCaseStudy";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { NoHypeSection } from "@/components/sections/NoHypeSection";
import { SectionCTA } from "@/components/sections/SectionCTA";
import { ServicePackages } from "@/components/sections/ServicePackages";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TerminalChatSection } from "@/components/sections/TerminalChatSection";
import { ToolsConstellationMount } from "@/components/sections/ToolsConstellationMount";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { TrustTicker } from "@/components/sections/TrustTicker";
import { WhoThisIsFor } from "@/components/sections/WhoThisIsFor";

export const metadata: Metadata = {
  title: "Free AI Agent for Local Businesses",
  description:
    "Claim a free AI consultation and limited-time free starter AI agent from TREE. Practical AI agents, automation, dashboards, websites, and education for qualifying local businesses.",
  keywords: [
    "free AI agent",
    "free AI consultation",
    "free starter AI agent",
    "AI agent for local business",
    "AI agents Kingston NY",
    "Hudson Valley AI consulting",
    "small business automation"
  ],
  openGraph: {
    title: "Free AI Agent for Local Businesses | TREE",
    description:
      "Limited-time offer: TREE is giving qualifying local businesses a free consultation and free starter AI agent while promotional spots remain."
  },
  twitter: {
    title: "Free AI Agent for Local Businesses | TREE",
    description:
      "Free AI consultation plus limited-time free starter AI agent for qualifying local businesses."
  }
};

export default function HomePage() {
  return (
    <main id="main">
      {/* Entry */}
      <Hero />
      <TrustTicker />

      {/* Approach */}
      <NoHypeSection />
      <BranchingWorkflow />

      {/* Services */}
      <ServicesGrid />
      <ServicePackages />

      {/* Social proof — placed right after services for credibility */}
      {/* AI Agent capabilities */}
      <AIAgentsSection />

      {/* Tools */}
      <ToolsConstellationMount />
      <SectionCTA
        eyebrow="Tools into systems"
        title="Not sure which tools belong in your workflow?"
        description="TREE maps the stack around the problem first, then chooses the smallest practical system that can start helping."
        cta="Map your system"
        variant="inline"
      />

      {/* Dashboards + command layer */}
      <DashboardShowcase />
      <ExecutiveSection />

      {/* Case studies */}
      <HylanderCaseStudy />
      <CaseStudyCards />

      {/* Audience */}
      <WhoThisIsFor />

      {/* Industries */}
      <IndustriesGrid />

      {/* Human + AI collaboration principle */}
      <CollaborativeAISection />

      {/* Education */}
      <TrainingSection />
      <SectionCTA
        eyebrow="Education and consultation"
        title="Learn the parts of AI that matter for your system."
        description="You do not need to become technical overnight. You need enough understanding to operate, review, and improve what you use."
        cta="Start learning your system"
      />

      {/* Demo */}
      <TerminalChatSection />

      {/* Limited-time offer */}
      <FreeAgentPromo />

      {/* Conversion */}
      <ContactCTAStrip />
    </main>
  );
}
