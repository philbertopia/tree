import { BranchingWorkflow } from "@/components/sections/BranchingWorkflow";
import { CaseStudyCards } from "@/components/sections/CaseStudyCards";
import { ContactCTAStrip } from "@/components/sections/ContactCTAStrip";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { Hero } from "@/components/sections/Hero";
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
      <Hero />
      <TrustTicker />
      <NoHypeSection />
      <BranchingWorkflow />
      <ServicesGrid />
      <ServicePackages />
      <ToolsConstellation />
      <SectionCTA
        eyebrow="Tools into systems"
        title="Not sure which tools belong in your workflow?"
        description="TREE maps the stack around the problem first, then chooses the smallest practical system that can start helping."
        cta="Map your system"
      />
      <DashboardShowcase />
      <CaseStudyCards />
      <WhoThisIsFor />
      <IndustriesGrid />
      <SectionCTA
        eyebrow="Industry fit"
        title="Your business does not need a generic AI template."
        description="Bring the workflow, bottleneck, or idea. TREE will help decide what should be automated, trained, measured, or left alone."
        cta="Book a consultation"
      />
      <TrainingSection />
      <SectionCTA
        eyebrow="Training and consultation"
        title="Learn the parts of AI that matter for your system."
        description="You do not need to become technical overnight. You need enough understanding to operate, review, and improve what you use."
        cta="Start learning your system"
      />
      <TerminalChatSection />
      <Testimonials />
      <ContactCTAStrip />
    </main>
  );
}
