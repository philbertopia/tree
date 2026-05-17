import {
  Activity,
  AudioLines,
  Banknote,
  Bot,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  Code2,
  Coins,
  FileSearch,
  Globe2,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  LayoutDashboard,
  LineChart,
  LockKeyhole,
  LucideIcon,
  Megaphone,
  MessageSquareText,
  MonitorSmartphone,
  PlaySquare,
  Scale,
  Search,
  ShieldCheck,
  ShoppingBag,
  Store,
  Utensils,
  WalletCards,
  Workflow,
  Wrench,
  Youtube
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: LucideIcon;
  tone?: "green" | "violet";
}

export interface WorkflowStep {
  title: string;
  description: string;
}

export interface ToolItem {
  name: string;
  category: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const navItems: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Tools", href: "/#tools" },
  { label: "Training", href: "/#training" },
  { label: "About", href: "/about" }
];

export const trustItems = [
  "Websites",
  "AI Agents",
  "SEO",
  "Automation",
  "Security",
  "Finance",
  "Social Media",
  "Blockchain",
  "Training",
  "LLMs"
];

export const workflowSteps: WorkflowStep[] = [
  { title: "Business Problem", description: "We start with the real bottleneck, not the newest tool." },
  { title: "AI Audit", description: "Your workflows, data, risks, and team habits get mapped first." },
  { title: "Tool Selection", description: "We choose only the systems that fit the job." },
  { title: "System Design", description: "Interfaces, approvals, prompts, and safeguards are planned together." },
  { title: "Automation Build", description: "Agents, dashboards, content engines, and workflows come online." },
  { title: "Human Training", description: "Your team learns how to use, review, and improve the system." },
  { title: "Optimization", description: "The system keeps growing as the business changes." }
];

export const services: FeatureCard[] = [
  { title: "AI Automation Systems", description: "End-to-end workflows that run without constant attention.", icon: Workflow },
  { title: "AI Agents & LLM Workflows", description: "Custom language model pipelines built around real tasks.", icon: Bot },
  { title: "Websites & Web Management", description: "Fast, accessible, AI-assisted sites that stay current.", icon: MonitorSmartphone },
  { title: "SEO & Search Strategy", description: "Content and technical strategy that compounds over time.", icon: Search },
  { title: "Automated Social Media", description: "Scheduled, AI-assisted posts across channels with human review.", icon: Megaphone },
  { title: "YouTube Automation Systems", description: "Research, scripting, thumbnails, and scheduling pipelines.", icon: Youtube },
  { title: "Marketing Automation", description: "Lead nurture, email flows, CRM routing, and campaign triggers.", icon: MessageSquareText },
  { title: "Internal Dashboards", description: "Custom visibility into the metrics your team actually uses.", icon: LayoutDashboard },
  { title: "Security Workflows", description: "Automated scanning, alerting, and response flows.", icon: ShieldCheck, tone: "violet" },
  { title: "Financial Automation", description: "Reporting, reconciliation, and alert systems.", icon: Banknote, tone: "violet" },
  { title: "Investment Research Automation", description: "Data aggregation, signal processing, and research agents.", icon: LineChart, tone: "violet" },
  { title: "Blockchain Development", description: "Smart contracts, wallet integrations, and on-chain tooling.", icon: WalletCards, tone: "violet" },
  { title: "AI Training & Vibe Coding", description: "Learn to use AI tools safely and practically.", icon: GraduationCap, tone: "violet" },
  { title: "Local LLM Setup", description: "Private AI workflows that can run close to your data.", icon: LockKeyhole, tone: "violet" },
  { title: "Custom Business Tools", description: "Bespoke internal apps built around how your team works.", icon: Wrench, tone: "violet" }
];

export const tools: ToolItem[] = [
  { name: "Claude Code", category: "LLM" },
  { name: "Anthropic API", category: "LLM" },
  { name: "OpenAI API", category: "LLM" },
  { name: "ChatGPT", category: "LLM" },
  { name: "Gemini", category: "LLM" },
  { name: "Perplexity", category: "Research" },
  { name: "Cursor", category: "Build" },
  { name: "Codex", category: "Build" },
  { name: "Ollama", category: "Local" },
  { name: "LM Studio", category: "Local" },
  { name: "Local LLMs", category: "Local" },
  { name: "LangChain", category: "Agents" },
  { name: "LlamaIndex", category: "Agents" },
  { name: "MCP Tools", category: "Agents" },
  { name: "Playwright", category: "Automation" },
  { name: "Make.com", category: "Automation" },
  { name: "Zapier", category: "Automation" },
  { name: "n8n", category: "Automation" },
  { name: "Vercel", category: "Web" },
  { name: "Next.js", category: "Web" },
  { name: "Supabase", category: "Data" },
  { name: "Airtable", category: "Data" },
  { name: "Shopify", category: "Commerce" },
  { name: "Webflow", category: "Web" },
  { name: "WordPress", category: "Web" },
  { name: "Stripe", category: "Commerce" },
  { name: "Discord Bots", category: "Bots" },
  { name: "Telegram Bots", category: "Bots" },
  { name: "YouTube Tools", category: "Content" },
  { name: "Blockchain Tooling", category: "Web3" },
  { name: "Recharts", category: "Dashboards" },
  { name: "Framer", category: "Design" },
  { name: "Figma", category: "Design" }
];

export const industries: FeatureCard[] = [
  { title: "Food Trucks", description: "Local SEO, menu updates, QR campaigns, and social automation.", icon: Utensils },
  { title: "Restaurants", description: "Reservation flows, review responses, and content engines.", icon: Store },
  { title: "Local Shops", description: "Inventory alerts, loyalty automation, and local search.", icon: ShoppingBag },
  { title: "Online Businesses", description: "Funnel automation, product feeds, and support agents.", icon: Globe2 },
  { title: "Law Firms", description: "Intake automation, document sorting, and FAQ chatbots.", icon: Scale },
  { title: "Healthcare Offices", description: "Patient education, admin workflows, and content systems.", icon: HeartPulse },
  { title: "Financial Institutions", description: "Reporting automation, compliance alerts, and research tools.", icon: Landmark, tone: "violet" },
  { title: "Banks", description: "Internal workflow automation and document processing.", icon: Building2, tone: "violet" },
  { title: "Hedge Funds", description: "Research agents, signal dashboards, and portfolio reporting.", icon: ChartNoAxesCombined, tone: "violet" },
  { title: "Creators", description: "Content pipelines, audience automation, and monetization tools.", icon: AudioLines },
  { title: "YouTube Channels", description: "Script research, thumbnail automation, and publish scheduling.", icon: PlaySquare },
  { title: "Real Estate", description: "Listing automation, lead qualification, and market research.", icon: Home },
  { title: "Agencies", description: "White-label AI systems, client reporting, and workflow tooling.", icon: BrainCircuit, tone: "violet" },
  { title: "Blockchain Projects", description: "Launch content, community automation, and smart contract tooling.", icon: Coins, tone: "violet" },
  { title: "Nonprofits", description: "Grant research, donor outreach, and content automation.", icon: FileSearch }
];

export const trainingItems = [
  "Practical AI literacy for business owners and teams",
  "How to prompt, test, and review AI outputs safely",
  "Vibe coding with guardrails for content, workflows, and internal tools",
  "Understanding what your automation is doing and when to override it",
  "Keeping humans in control as AI systems grow"
].map((description) => ({ description, icon: CheckCircle2 }));

export const testimonials: Testimonial[] = [
  {
    quote:
      "We had no idea where to start with AI. TREE audited our whole operation, told us what actually made sense to automate, and built it.",
    name: "Operations Director",
    role: "Regional Law Firm"
  },
  {
    quote:
      "TREE set up our social automation and local SEO system in two weeks. The training was just as valuable as the build.",
    name: "Owner",
    role: "Hylander Mobile Food Cart"
  },
  {
    quote:
      "What I appreciated most was the honesty. They told us three ideas were a waste of money, then built the things that mattered.",
    name: "CTO",
    role: "Independent Research Fund"
  }
];

export const businessTypes = [
  "Food Truck",
  "Restaurant",
  "Local Shop",
  "Online Business",
  "Law Firm",
  "Healthcare",
  "Financial Institution",
  "Bank",
  "Hedge Fund",
  "Creator",
  "YouTube Channel",
  "Real Estate",
  "Agency",
  "Blockchain Project",
  "Nonprofit",
  "Other"
];

export const budgetRanges = [
  "Under $1,000",
  "$1,000-$5,000",
  "$5,000-$15,000",
  "$15,000-$50,000",
  "$50,000+",
  "Not sure yet"
];

export const dashboardData = [
  { name: "Mon", tasks: 18, seo: 6, leads: 2 },
  { name: "Tue", tasks: 24, seo: 9, leads: 4 },
  { name: "Wed", tasks: 22, seo: 11, leads: 3 },
  { name: "Thu", tasks: 34, seo: 14, leads: 5 },
  { name: "Fri", tasks: 42, seo: 18, leads: 7 },
  { name: "Sat", tasks: 30, seo: 16, leads: 4 },
  { name: "Sun", tasks: 38, seo: 18, leads: 6 }
];

export const terminalLines = [
  '$ tree-agent scan --business "local restaurant"',
  "> mapping website, menu, SEO, reviews, social channels...",
  "> detected 14 automation opportunities",
  "> recommended: reservation assistant, review response system, weekly content engine",
  "> human approval required",
  '$ tree-agent scan --business "law firm"',
  "> mapping intake flows, client communication, documents...",
  "> detected 9 automation points",
  "> recommended: intake form agent, document sorter, FAQ chatbot",
  "> human approval required"
];
