import { ChatbotMockup } from "@/components/visuals/ChatbotMockup";
import { TerminalPanel } from "@/components/visuals/TerminalPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingNodeClusters } from "@/components/visuals/FloatingNodeClusters";
import { CTAButton } from "@/components/ui/CTAButton";

export function TerminalChatSection() {
  return (
    <section className="section-shell relative overflow-hidden">
      <FloatingNodeClusters density="soft" size="mixed" movement="drift" focus="edges" seed={77} />
      <div className="container-shell relative z-10">
        <SectionHeading
          eyebrow="Human-guided automation"
          title="Agents can run tasks. Humans still approve the system."
          description="TREE designs AI workflows with visible decisions, audit trails, and clear places for your team to say yes, no, or not yet."
          align="center"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <TerminalPanel />
          <ChatbotMockup />
        </div>
        <div className="mt-8 flex justify-center">
          <CTAButton href="/demo/ai-systems-planner" variant="secondary">
            Try Seed
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
