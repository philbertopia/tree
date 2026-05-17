import { BranchingWorkflow } from "@/components/sections/BranchingWorkflow";
import { ContactCTAStrip } from "@/components/sections/ContactCTAStrip";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { Hero } from "@/components/sections/Hero";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { NoHypeSection } from "@/components/sections/NoHypeSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { TerminalChatSection } from "@/components/sections/TerminalChatSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { ToolsConstellation } from "@/components/sections/ToolsConstellation";
import { TrainingSection } from "@/components/sections/TrainingSection";
import { TrustTicker } from "@/components/sections/TrustTicker";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TrustTicker />
      <NoHypeSection />
      <BranchingWorkflow />
      <ServicesGrid />
      <ToolsConstellation />
      <DashboardShowcase />
      <IndustriesGrid />
      <TrainingSection />
      <TerminalChatSection />
      <Testimonials />
      <ContactCTAStrip />
    </main>
  );
}
