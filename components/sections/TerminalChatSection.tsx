import { ChatbotMockup } from "@/components/visuals/ChatbotMockup";
import { TerminalPanel } from "@/components/visuals/TerminalPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TerminalChatSection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
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
      </div>
    </section>
  );
}
