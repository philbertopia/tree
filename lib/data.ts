import {
  Activity,
  AudioLines,
  Banknote,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  ChartNoAxesCombined,
  CheckCircle2,
  Code2,
  Coins,
  Dumbbell,
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
  ShieldAlert,
  Scale,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Truck,
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
  group?: string;
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

export interface ServicePackage {
  title: string;
  description: string;
  audience: string;
  price: string;
  icon: LucideIcon;
  tone?: "green" | "violet";
}

export interface AudienceCard {
  title: string;
  description: string;
  icon: LucideIcon;
  tone?: "green" | "violet";
}

export interface CaseStudyCard {
  title: string;
  problem: string;
  system: string;
  outcome: string;
  icon: LucideIcon;
  tone?: "green" | "violet";
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

export const servicePackages: ServicePackage[] = [
  {
    title: "AI Consultation",
    description: "Map what AI can actually improve, what should stay human, and where the first useful system should start.",
    audience: "Owners, individuals, and teams deciding where AI fits",
    price: "Custom scope",
    icon: BrainCircuit
  },
  {
    title: "Automation Build",
    description: "Design and build workflows that move information, trigger actions, route approvals, and reduce repetitive work.",
    audience: "Businesses with manual operations, follow-up, reporting, or intake bottlenecks",
    price: "Custom scope",
    icon: Workflow
  },
  {
    title: "Dashboard/System Build",
    description: "Create dashboards, internal tools, and operating panels that make tasks, metrics, risks, and decisions visible.",
    audience: "Teams and individuals who need clarity across scattered systems",
    price: "Custom scope",
    icon: LayoutDashboard
  },
  {
    title: "Security/Finance Systems",
    description: "Build monitored workflows for financial visibility, risk alerts, camera or sensor events, and human-approved response paths.",
    audience: "Finance, security, property, investment, and high-trust workflows",
    price: "Custom scope",
    icon: ShieldAlert,
    tone: "violet"
  },
  {
    title: "Training Program",
    description: "Teach owners, teams, and individuals how to use, review, prompt, and safely improve the AI systems around them.",
    audience: "People who want confidence without becoming programmers",
    price: "Custom scope",
    icon: GraduationCap,
    tone: "violet"
  }
];

export const audienceCards: AudienceCard[] = [
  {
    title: "Business Owners",
    description: "Get visibility into operations, leads, finances, customer follow-up, and the next practical automation to build.",
    icon: BriefcaseBusiness
  },
  {
    title: "Individuals",
    description: "Use AI for personal dashboards, productivity systems, finance tracking, healthcare routines, learning, and decision support.",
    icon: Smartphone,
    tone: "violet"
  },
  {
    title: "Finance/Security Clients",
    description: "Build systems around alerts, approvals, reporting, risk review, camera events, and human-controlled response workflows.",
    icon: ShieldAlert,
    tone: "violet"
  },
  {
    title: "Creators/Agencies",
    description: "Organize research, content pipelines, client reporting, scheduling, publishing, and repeatable delivery systems.",
    icon: AudioLines
  },
  {
    title: "Local Businesses",
    description: "Improve local SEO, reviews, menus, promotions, customer FAQs, bookings, inventory signals, and owner dashboards.",
    icon: Store
  }
];

export const caseStudyCards: CaseStudyCard[] = [
  {
    title: "Local business visibility system",
    problem: "A local operator needs more visibility but does not have time to manage SEO, reviews, menus, social posts, and customer FAQs by hand.",
    system: "TREE maps the customer journey, builds a dashboard, and connects review response, local SEO tasks, QR campaigns, and content approvals.",
    outcome: "The owner gets a clearer weekly operating rhythm and a system that shows what needs attention before it becomes another pile of tasks.",
    icon: Store
  },
  {
    title: "Finance/security dashboard system",
    problem: "Important financial or security signals are spread across accounts, cameras, alerts, reports, and manual checklists.",
    system: "TREE designs a monitored dashboard with risk flags, approval points, camera or sensor events, reporting views, and escalation steps.",
    outcome: "The client can see what changed, what matters, and what needs human review without relying on memory or scattered notifications.",
    icon: ShieldAlert,
    tone: "violet"
  },
  {
    title: "AI training and consultation system",
    problem: "A business owner or individual wants AI help but does not know what to trust, what to automate, or how to safely use the tools.",
    system: "TREE provides consultation, builds a practical starter system, and trains the person on prompting, review, guardrails, and safe changes.",
    outcome: "The client learns only what they need to operate and improve their system, with confidence about when to approve, pause, or override it.",
    icon: GraduationCap,
    tone: "violet"
  },
  {
    title: "Marketing and growth automation system",
    problem: "A business generates leads and content manually, leaving campaigns inconsistent and follow-up falling through the cracks.",
    system: "TREE builds a marketing automation layer: AI-assisted content scheduling, lead routing, email flows, social post queues, and CRM triggers — all with human approval checkpoints.",
    outcome: "Marketing runs on a consistent cadence with less manual effort. The team reviews and approves outputs instead of producing them from scratch.",
    icon: Megaphone
  }
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
  { title: "Food Trucks", description: "Local SEO, menu updates, QR campaigns, and social automation.", icon: Utensils, group: "Local Business" },
  { title: "Restaurants", description: "Reservation flows, review responses, and content engines.", icon: Store, group: "Local Business" },
  { title: "Local Shops", description: "Inventory alerts, loyalty automation, and local search.", icon: ShoppingBag, group: "Local Business" },
  { title: "Small Business Owners", description: "Business development systems, lead tracking, financial visibility, and owner training.", icon: BriefcaseBusiness, group: "Local Business" },
  { title: "Construction / Contractors", description: "Quote workflows, job scheduling, customer updates, invoice tracking, and project dashboards.", icon: Truck, group: "Local Business" },
  { title: "Gyms / Wellness Businesses", description: "Member communication, habit tracking, class scheduling, content automation, and retention workflows.", icon: Dumbbell, group: "Local Business" },
  { title: "Law Firms", description: "Intake automation, document sorting, and FAQ chatbots.", icon: Scale, group: "Professional Services" },
  { title: "Healthcare Offices", description: "Patient education, admin workflows, and content systems.", icon: HeartPulse, group: "Professional Services" },
  { title: "Real Estate", description: "Listing automation, lead qualification, and market research.", icon: Home, group: "Professional Services" },
  { title: "Consultants / Coaches", description: "Client intake, content systems, scheduling, CRM workflows, course delivery, and follow-up automation.", icon: CalendarCheck, group: "Professional Services" },
  { title: "Financial Institutions", description: "Reporting automation, compliance alerts, and research tools.", icon: Landmark, tone: "violet", group: "Finance & Security" },
  { title: "Banks", description: "Internal workflow automation and document processing.", icon: Building2, tone: "violet", group: "Finance & Security" },
  { title: "Hedge Funds", description: "Research agents, signal dashboards, and portfolio reporting.", icon: ChartNoAxesCombined, tone: "violet", group: "Finance & Security" },
  { title: "Financial Advisors", description: "Client education, document workflows, research dashboards, compliance-aware content, and meeting prep.", icon: Banknote, tone: "violet", group: "Finance & Security" },
  { title: "Traders / Investors", description: "Market research agents, signal dashboards, risk alerts, backtesting workflows, and portfolio visibility.", icon: LineChart, tone: "violet", group: "Finance & Security" },
  { title: "Security / Private Properties", description: "Camera workflows, access alerts, incident review, drone or robot-assisted monitoring, and response automation.", icon: ShieldAlert, tone: "violet", group: "Finance & Security" },
  { title: "Security Companies", description: "Dispatch workflows, camera review, incident reports, client dashboards, and monitoring automation.", icon: ShieldCheck, tone: "violet", group: "Finance & Security" },
  { title: "Online Businesses", description: "Funnel automation, product feeds, and support agents.", icon: Globe2, group: "Creators & Digital" },
  { title: "Creators", description: "Content pipelines, audience automation, and monetization tools.", icon: AudioLines, group: "Creators & Digital" },
  { title: "YouTube Channels", description: "Script research, thumbnail automation, and publish scheduling.", icon: PlaySquare, group: "Creators & Digital" },
  { title: "Agencies", description: "White-label AI systems, client reporting, and workflow tooling.", icon: BrainCircuit, tone: "violet", group: "Creators & Digital" },
  { title: "Blockchain Projects", description: "Launch content, community automation, and smart contract tooling.", icon: Coins, tone: "violet", group: "Creators & Digital" },
  { title: "Individuals / Personal Systems", description: "Personal dashboards, finance tracking, AI assistants, healthcare routines, and productivity automation.", icon: Smartphone, tone: "violet", group: "Individuals & Training" },
  { title: "Education / Training Programs", description: "Curriculum tools, student support assistants, lesson planning, progress dashboards, and AI literacy training.", icon: GraduationCap, tone: "violet", group: "Individuals & Training" },
  { title: "Nonprofits", description: "Grant research, donor outreach, and content automation.", icon: FileSearch, group: "Individuals & Training" }
];

export const trainingItems = [
  "AI literacy: know what to trust, what to question, and how to review outputs safely",
  "Vibe coding: prototype internal tools, workflows, and content systems with guardrails",
  "System ownership: operate, pause, edit, and improve your workflows with confidence",
  "Prompting and testing habits that make AI outputs easier to verify",
  "Human approval routines for finance, security, customer-facing, and operational work",
  "Practical consultation for choosing where AI belongs and where it does not",
  "Team handoff so the system can keep improving after launch"
].map((description) => ({ description, icon: CheckCircle2 }));

export const testimonials: Testimonial[] = [
  {
    quote:
      "TREE set up our social automation and local SEO system in two weeks. The training was just as valuable as the build.",
    name: "Owner",
    role: "Hylander Mobile Food Cart"
  },
  {
    quote:
      "AI, automation, security, and finance systems need clear visibility, strong review points, and practical implementation.",
    name: "Client Work",
    role: "Chase Bank"
  },
  {
    quote:
      "TREE supports financial and business development workflows with consultation, training, dashboards, and automation planning.",
    name: "Client Work",
    role: "Northwestern Mutual"
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
