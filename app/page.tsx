import { AIAgentsSection } from "@/components/sections/AIAgentsSection";
import { BranchingWorkflow } from "@/components/sections/BranchingWorkflow";
import { CaseStudyCards } from "@/components/sections/CaseStudyCards";
import { CollaborativeAISection } from "@/components/sections/CollaborativeAISection";
import { ContactCTAStrip } from "@/components/sections/ContactCTAStrip";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { ExecutiveSection } from "@/components/sections/ExecutiveSection";
import { Hero } from "@/components/sections/Hero";
import { HylanderCaseStudy } from "@/components/sections/HylanderCaseStudy";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { NoHypeSection } from "@/components/sections/NoHypeSection";
import { SectionCTA } from "@/components/sections/SectionCTA";
import { ServicePackages } from "@/components/sections/ServicePackages";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TerminalChatSection } from "@/components/sections/TerminalChatSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ToolsConstellation } from "@/components/sections/ToolsConstellation";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { TrustTicker } from "@/components/sections/TrustTicker";
import { WhoThisIsFor } from "@/components/sections/WhoThisIsFor";

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
      <div className="section-divider" aria-hidden="true" />
      <Testimonials />
      <div className="section-divider" aria-hidden="true" />

      {/* AI Agent capabilities */}
      <AIAgentsSection />

      {/* Tools */}
      <ToolsConstellation />
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

      {/* Training */}
      <TrainingSection />
      <SectionCTA
        eyebrow="Training and consultation"
        title="Learn the parts of AI that matter for your system."
        description="You do not need to become technical overnight. You need enough understanding to operate, review, and improve what you use."
        cta="Start learning your system"
      />

      {/* Demo */}
      <TerminalChatSection />

      {/* Conversion */}
      <ContactCTAStrip />
    </main>
  );
}
