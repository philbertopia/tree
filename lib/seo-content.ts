export const siteUrl = "https://treesystems.ai";

export interface ContentFaq {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  body: string[];
  links?: Array<{
    label: string;
    href: string;
  }>;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  answer: string;
  sections: ContentSection[];
  fits: string[];
  doesNotFit: string[];
  faqs: ContentFaq[];
  relatedSolutions: string[];
}

export interface SolutionPage {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  answer: string;
  outcomes: string[];
  workflow: string[];
  fits: string[];
  doesNotFit: string[];
  faqs: ContentFaq[];
  relatedPosts: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hylander-mobile-local-food-truck-ai-systems-case-study",
    title: "How TREE Helped Hylander Mobile Build A Lean AI Operating System",
    description:
      "A practical case study on building low-cost AI inventory, pricing, menu, delivery, and business development systems for a local Kingston food truck.",
    category: "Case Study",
    publishedAt: "2026-05-26",
    readingTime: "9 min read",
    answer:
      "Hylander Mobile shows how AI agency work should happen for local businesses: start with the owner, understand the real operating pressure, build only the tools that fit, keep costs low, and teach the owner how to use the system.",
    sections: [
      {
        heading: "We started with consultation, not tools",
        body: [
          "The Hylander Mobile project began with a simple principle: do not sell a local business a pile of software before understanding the business. Hylan, the owner of Hylander Mobile in Uptown Kingston, already had the hard part: food people wanted, local energy, and a real operating rhythm. TREE's first job was to listen.",
          "We spent time understanding where the pressure actually lived: weekly food purchasing, inventory planning, menu visibility, customer communication, delivery, budget control, and the need to keep more money inside the business instead of handing it to large platforms.",
          "That discovery step shaped the entire build. The goal was not to make the business look artificially technical. The goal was to create a practical system that helped Hylan prepare for the week, spend more carefully, serve customers better, and keep control of his own operation."
        ],
        links: [
          { label: "Read the Hylander Mobile case study", href: "/case-studies/hylander-mobile" },
          { label: "Explore TREE consultation", href: "/contact" }
        ]
      },
      {
        heading: "We built the smallest useful system first",
        body: [
          "For many local operators, the right first system is not a complicated agent platform. It is a focused operating tool that saves time or money immediately. For Hylander Mobile, that meant inventory and food purchasing.",
          "TREE built an inventory tracking tool with AI-assisted planning that helps compare food pricing data from nearby grocery stores and suppliers around Kingston, New York. Instead of making purchasing decisions from memory, scattered notes, or last-minute runs, Hylan can plan the week with more visibility.",
          "The system helps answer practical questions: what needs to be restocked, what ingredients are getting expensive, what should be prepared before a busy week, and how to keep food quality high while working inside a tighter budget. That is the kind of AI that matters for a local food business: useful, specific, and tied to the owner's real decisions."
        ],
        links: [
          { label: "AI dashboard systems", href: "/solutions/ai-dashboard-systems" },
          { label: "Business automation", href: "/solutions/business-automation" }
        ]
      },
      {
        heading: "The stack stayed lean: Vercel, Supabase, and practical web tools",
        body: [
          "A major part of the project was cost discipline. Local businesses do not need bloated enterprise software when a focused web system can do the job. Hylander Mobile runs on a lean modern stack: Vercel for the web application and Supabase for the backend.",
          "That gives the project a low-cost path for hosting, database storage, authentication, and future expansion. It also keeps the system flexible. As the business grows, TREE can continue adding better tools, better dashboards, and better workflows without forcing the owner into a heavy monthly software burden.",
          "This matters because AI agency work should respect the economics of the client. If a tool saves $200 but costs $400 to maintain, it is not a win. The system should fit the size and stage of the business."
        ],
        links: [
          { label: "Vercel", href: "https://vercel.com/" },
          { label: "Supabase", href: "https://supabase.com/" },
          { label: "TREE AI dashboard systems", href: "/solutions/ai-dashboard-systems" }
        ]
      },
      {
        heading: "We helped create direct customer touchpoints",
        body: [
          "Hylander Mobile did not need to become dependent on Grubhub or another delivery marketplace to serve local customers. Those platforms can bring reach, but they can also take fees that local owners and drivers badly need to keep.",
          "TREE helped shape a direct digital customer path around the Hylander Mobile menu, QR access, Square payments, pickup and delivery workflows, and clear customer communication. The goal was simple: help customers order and engage without handing the whole relationship to a big platform.",
          "This is not anti-technology. It is pro-local ownership. Technology should help the owner and driver make more money, not quietly drain the margin from the people doing the work."
        ],
        links: [
          { label: "View Hylander Mobile", href: "https://hylander-mobile.vercel.app/#menu" },
          { label: "Square payments", href: "https://squareup.com/" },
          { label: "Human review AI workflows", href: "/solutions/human-review-ai-workflows" }
        ]
      },
      {
        heading: "We taught the owner how to use the system",
        body: [
          "A build is not finished when the website goes live. For TREE, implementation includes education. Hylan needed to understand how the system worked, how to use the inventory and planning tools, and how the digital customer touchpoints supported the business.",
          "This is where many AI projects fail. A consultant builds something impressive, leaves, and the owner is stuck with a tool they do not fully understand. TREE's model is different: build, explain, adjust, and keep improving the system with the person who actually runs the business.",
          "That education layer makes the system more durable. The owner can make better decisions because the tool is not mysterious. It becomes part of the operating rhythm."
        ],
        links: [
          { label: "TREE education and consultation", href: "/#training" },
          { label: "AI education for teams", href: "/solutions/ai-training-for-teams" }
        ]
      },
      {
        heading: "The pitch deck turned operations into a growth story",
        body: [
          "Beyond the operating system, TREE also helped Hylander Mobile frame a larger business development story. The Hylander Mobile Delivery Network pitch deck presents the long-term vision: start with food, prove repeatable local demand, then expand into late-night delivery, convenience runs, courier work, and local logistics across Hudson Valley towns.",
          "The financials page is intentionally framed as illustrative. It gives Hylan a way to think through market-by-market assumptions, revenue potential, service mix, and expansion phases without pretending projections are guarantees.",
          "That combination matters: operations plus story. A local owner needs tools to run the week, but also a plan for growth, funding conversations, partnerships, and future markets."
        ],
        links: [
          { label: "View the Hylander Mobile Network pitch deck", href: "https://hylander-mobile-network.vercel.app/" },
          { label: "View illustrative financials", href: "https://hylander-mobile-network.vercel.app/financials.html" },
          { label: "Business automation services", href: "/solutions/business-automation" }
        ]
      },
      {
        heading: "The lesson for local business AI",
        body: [
          "The Hylander Mobile project is a blueprint for how TREE wants to work with local businesses. Start with the real problem. Build the smallest useful system. Keep upkeep affordable. Teach the owner. Improve over time. Protect the business relationship from unnecessary platform dependency.",
          "AI should not be another way for big technology companies to swallow local margin. Used well, it can help local owners become more organized, more visible, more resilient, and more independent.",
          "For Hylander Mobile, that meant inventory visibility, local price comparison, menu infrastructure, direct ordering support, Square payment workflows, a lower-cost web stack, business development consulting, and a pitch deck that helps communicate the bigger vision. That is what practical AI agency work looks like when it is grounded in a real local operation."
        ],
        links: [
          { label: "Map your first automation with TREE", href: "/demo/ai-systems-planner" },
          { label: "Contact TREE", href: "/contact" },
          { label: "Local business AI services", href: "/industries/local-business-ai" }
        ]
      }
    ],
    fits: [
      "Local businesses that need practical systems before expensive software",
      "Food trucks, restaurants, shops, and operators with weekly purchasing or inventory pressure",
      "Owners who want direct customer relationships instead of full dependence on large platforms"
    ],
    doesNotFit: [
      "Businesses looking for generic AI hype without operational work",
      "Owners who want tools but do not want to participate in the process",
      "Projects where a simple spreadsheet or existing point-of-sale report already solves the problem"
    ],
    faqs: [
      {
        question: "What did TREE build for Hylander Mobile?",
        answer:
          "TREE helped build a low-cost operating layer around inventory tracking, AI-assisted purchasing visibility, local grocery price comparison, menu infrastructure, QR access, delivery planning, Square payment workflows, and business development."
      },
      {
        question: "Why not just use a big delivery platform?",
        answer:
          "Large marketplaces can be useful, but they often take fees and control the customer relationship. Hylander Mobile's direct system helps more value stay with the owner and driver while keeping the customer path simple."
      },
      {
        question: "Can TREE do this for other local businesses?",
        answer:
          "Yes. The exact system changes by business, but the process is repeatable: consult first, identify the real bottleneck, build the smallest useful system, teach the owner, and improve the workflow over time."
      }
    ],
    relatedSolutions: ["business-automation", "ai-dashboard-systems", "ai-training-for-teams"]
  },
  {
    slug: "what-is-a-supervised-ai-agent-system",
    title: "What Is A Supervised AI Agent System?",
    description: "A plain-English guide to supervised AI agent systems, human checkpoints, dashboards, and safe business workflows.",
    category: "AI Agents",
    publishedAt: "2026-05-24",
    readingTime: "5 min read",
    answer:
      "A supervised AI agent system is a group of specialized AI workflows that complete narrow tasks, route work between steps, and pause for human review when judgment, risk, money, or customer trust is involved.",
    sections: [
      {
        heading: "Agents are specialized workers",
        body: [
          "In practical business systems, an agent should not be a vague chatbot that tries to do everything. It should have a clear job such as intake, research, summarizing, drafting, sorting, alerting, or preparing a decision brief.",
          "TREE builds these systems around the workflow first. The question is not whether AI can do something impressive. The question is where a narrow AI step can reduce manual work without removing human control."
        ]
      },
      {
        heading: "Supervision is the operating model",
        body: [
          "Supervision means important outputs do not automatically become final actions. Drafts can wait for approval, finance flags can wait for review, and customer-facing messages can pause before sending.",
          "This is the difference between a useful system and a risky shortcut. The system moves the work forward, but people still own the decision."
        ]
      },
      {
        heading: "Visibility matters as much as automation",
        body: [
          "A good agent system should show what happened, what changed, what is waiting, and what needs review. Dashboards and logs make the system easier to trust and easier to improve.",
          "Without visibility, automation can become another hidden process. With visibility, it becomes an operating layer."
        ]
      }
    ],
    fits: ["Teams with repeatable intake, research, drafting, or reporting work", "Businesses that need approvals before action", "Owners who want visibility instead of black-box automation"],
    doesNotFit: ["Workflows with no repeatable pattern", "Decisions that require licensed professional judgment without review", "Teams looking for fully autonomous customer or financial actions"],
    faqs: [
      {
        question: "Is an AI agent system the same as a chatbot?",
        answer: "No. A chatbot is usually one interface. An agent system is a coordinated workflow with roles, routing, approvals, logs, and sometimes dashboards."
      },
      {
        question: "Can supervised agents work for small businesses?",
        answer: "Yes. Small businesses often benefit from narrow systems for intake, reviews, content drafts, customer FAQs, reporting, and follow-up."
      }
    ],
    relatedSolutions: ["ai-agent-orchestration", "human-review-ai-workflows"]
  },
  {
    slug: "ai-automation-vs-ai-agents",
    title: "AI Automation vs AI Agents: What Your Business Actually Needs",
    description: "Understand when a business needs simple automation, AI agents, dashboards, or a supervised workflow that combines all three.",
    category: "Strategy",
    publishedAt: "2026-05-24",
    readingTime: "6 min read",
    answer:
      "AI automation moves tasks through a predefined workflow, while AI agents add language, reasoning, classification, drafting, or research inside that workflow. Most businesses need a practical mix, not a trendy label.",
    sections: [
      {
        heading: "Automation handles the repeatable steps",
        body: [
          "Automation is best for predictable actions: sending reminders, moving form data, creating tasks, updating records, or routing notifications.",
          "If the step is consistent and rules-based, a simple automation may be better than a more complex agent system."
        ]
      },
      {
        heading: "Agents help where language and judgment appear",
        body: [
          "Agents are useful when the system needs to read messy information, summarize context, draft a response, classify a request, or prepare a recommendation.",
          "They should still be scoped tightly. A good agent has a job description, inputs, outputs, and review points."
        ]
      },
      {
        heading: "Dashboards connect the work to decisions",
        body: [
          "Dashboards make the system visible. They show pending approvals, key signals, recent outputs, risks, and the next recommended actions.",
          "For owners and teams, the dashboard is often what turns automation into something they can actually operate."
        ]
      }
    ],
    fits: ["Businesses comparing AI tools", "Teams with scattered manual processes", "Owners who need a first automation roadmap"],
    doesNotFit: ["One-off creative work with no recurring process", "Teams without a clear owner for approvals", "Fully autonomous decisions in sensitive workflows"],
    faqs: [
      {
        question: "Should I start with agents or automation?",
        answer: "Start with the workflow. If the task is rules-based, automate it. If the task needs reading, summarizing, drafting, or classification, add an agent step."
      },
      {
        question: "Do AI agents replace dashboards?",
        answer: "No. Agents perform or prepare work. Dashboards help people see, review, and control that work."
      }
    ],
    relatedSolutions: ["business-automation", "ai-dashboard-systems"]
  },
  {
    slug: "human-in-the-loop-ai-approvals",
    title: "Human-in-the-Loop AI: Why Approvals Matter",
    description: "Why human review points make AI workflows safer for finance, security, marketing, customer service, and operations.",
    category: "Safety",
    publishedAt: "2026-05-24",
    readingTime: "5 min read",
    answer:
      "Human-in-the-loop AI means the system can prepare, route, and recommend work, but people approve important actions before they affect customers, money, operations, or reputation.",
    sections: [
      {
        heading: "Approvals protect trust",
        body: [
          "AI can draft quickly, but speed is not the same as correctness. Approval steps protect the business from sending the wrong message, acting on weak information, or escalating a false signal.",
          "The goal is not to slow the system down. The goal is to make the important parts deliberate."
        ]
      },
      {
        heading: "Review points should match risk",
        body: [
          "A social caption may only need a light review. A finance alert, security event, legal intake, or healthcare-adjacent workflow needs stronger controls.",
          "TREE designs approval paths around the risk of the action, not around generic AI enthusiasm."
        ]
      },
      {
        heading: "Logs make reviews easier",
        body: [
          "A useful review screen should show the input, the AI output, the reason it was flagged, and the recommended next step.",
          "When reviewers can understand the context quickly, they can approve, edit, reject, or pause the workflow with confidence."
        ]
      }
    ],
    fits: ["Customer-facing messaging", "Finance, security, legal, healthcare, or high-trust workflows", "Teams that need auditability"],
    doesNotFit: ["Low-risk drafts where mistakes are harmless", "Workflows where no one can own review", "Decisions that should never be delegated to software"],
    faqs: [
      {
        question: "Does human review remove the value of automation?",
        answer: "No. The system still handles intake, routing, drafting, summaries, and prep work. Humans focus on the decision instead of the repetitive setup."
      },
      {
        question: "What should require approval?",
        answer: "Money movement, customer-facing messages, security responses, sensitive data handling, and decisions with legal, health, or reputational risk should usually require review."
      }
    ],
    relatedSolutions: ["human-review-ai-workflows", "ai-agent-orchestration"]
  },
  {
    slug: "ai-dashboards-for-business-owners",
    title: "How AI Dashboards Help Business Owners See What Matters",
    description: "How AI dashboards bring tasks, alerts, approvals, customer signals, and business metrics into one operating view.",
    category: "Dashboards",
    publishedAt: "2026-05-24",
    readingTime: "5 min read",
    answer:
      "An AI dashboard helps a business owner see the signals, tasks, approvals, and recommendations that would otherwise be scattered across tools, inboxes, spreadsheets, and memory.",
    sections: [
      {
        heading: "Dashboards reduce scattered attention",
        body: [
          "Most owners do not need more notifications. They need a calmer view of what matters: leads, reviews, tasks, risks, content, cash-flow checks, and approvals.",
          "A dashboard can turn scattered tools into one operating rhythm."
        ]
      },
      {
        heading: "AI can prepare the view",
        body: [
          "AI can summarize recent activity, flag changes, group similar issues, draft responses, and prepare decision briefs.",
          "The dashboard should not pretend to know everything. It should help people inspect the right things faster."
        ]
      },
      {
        heading: "The best dashboard leads to action",
        body: [
          "A useful dashboard does not stop at charts. It shows what needs review, what can wait, and what action is recommended next.",
          "TREE treats dashboards as control rooms for supervised systems, not decorative reporting screens."
        ]
      }
    ],
    fits: ["Owners managing several tools", "Teams with manual reporting", "Businesses with approvals, alerts, or recurring operating checks"],
    doesNotFit: ["Teams that only need a one-time report", "Metrics no one will act on", "Dashboards without a clear owner"],
    faqs: [
      {
        question: "Can AI dashboards connect to existing tools?",
        answer: "Often yes, depending on the tools, permissions, and data quality. TREE usually starts by mapping the workflow and deciding what needs to be visible."
      },
      {
        question: "Do dashboards need AI?",
        answer: "Not always. AI is useful when the dashboard needs summaries, classification, recommendations, or natural-language review of messy information."
      }
    ],
    relatedSolutions: ["ai-dashboard-systems", "business-automation"]
  },
  {
    slug: "what-to-automate-first-small-business",
    title: "What To Automate First In A Small Business",
    description: "A practical sequence for small businesses deciding where AI automation should start.",
    category: "Small Business",
    publishedAt: "2026-05-24",
    readingTime: "6 min read",
    answer:
      "Small businesses should usually automate the recurring work that is visible, time-consuming, low-risk, and easy to review: intake, follow-up, reviews, content drafts, reporting, and task routing.",
    sections: [
      {
        heading: "Start with the work that repeats",
        body: [
          "The best first automation is usually not the most exciting idea. It is the task that happens every week, drains attention, and follows a predictable pattern.",
          "Examples include customer FAQs, review responses, appointment reminders, lead intake, local SEO tasks, and weekly reporting."
        ]
      },
      {
        heading: "Keep the first system small",
        body: [
          "A small useful system is better than a giant unfinished transformation. TREE usually looks for the smallest workflow that can save time and create visibility quickly.",
          "Once the business trusts that system, the next workflow is easier to design."
        ]
      },
      {
        heading: "Add AI only where it helps",
        body: [
          "AI is strongest where information is messy: reading messages, summarizing notes, drafting content, classifying requests, or preparing options.",
          "If a basic rule can do the job, use the rule. If language or judgment is involved, consider a supervised AI step."
        ]
      }
    ],
    fits: ["Local businesses", "Owner-led teams", "Businesses with manual follow-up, reporting, content, or intake"],
    doesNotFit: ["Businesses with no clear workflow owner", "High-risk automations without review", "Projects that start with tools instead of problems"],
    faqs: [
      {
        question: "What is the safest first automation?",
        answer: "A draft-and-review workflow is often safest because AI prepares the work while a person approves the final output."
      },
      {
        question: "How do I know if a task should be automated?",
        answer: "Look for work that repeats, uses similar inputs, has a clear next step, and can be reviewed before it affects customers or money."
      }
    ],
    relatedSolutions: ["business-automation", "human-review-ai-workflows"]
  },
  {
    slug: "ai-training-literacy-vibe-coding-system-ownership",
    title: "AI Education For Teams: Literacy, Rapid Prototyping, And System Ownership",
    description: "How teams can learn enough AI to use systems safely, prototype practical tools, and avoid becoming full-time engineers.",
    category: "Education",
    publishedAt: "2026-05-24",
    readingTime: "5 min read",
    answer:
      "AI education for teams should focus on three practical skills: understanding what AI can and cannot do, prototyping safely with natural language AI tools, and operating the systems the team depends on.",
    sections: [
      {
        heading: "AI literacy builds judgment",
        body: [
          "AI literacy is not about memorizing every tool. It is about knowing when outputs need verification, what kinds of tasks fit AI, and where humans need to stay in control.",
          "This helps teams avoid both fear and overconfidence."
        ]
      },
      {
        heading: "Rapid prototyping needs guardrails",
        body: [
          "AI coding tools can help teams prototype internal tools, dashboards, and workflow ideas from plain-language direction. The useful version includes boundaries: test small, protect data, review outputs, and avoid shipping what no one understands.",
          "Rapid prototyping is most valuable when it helps a team think in systems."
        ]
      },
      {
        heading: "System ownership keeps the work alive",
        body: [
          "After an AI system launches, someone needs to know how to pause it, review it, update prompts, interpret logs, and request improvements.",
          "Education makes the system less mysterious and more useful over time."
        ]
      }
    ],
    fits: ["Owners and teams adopting AI tools", "Businesses receiving a new automation or dashboard", "People who want practical confidence without deep technical training"],
    doesNotFit: ["Teams looking for generic AI hype sessions", "Workflows without a real business use case", "Groups that need licensed professional training instead of operational AI education"],
    faqs: [
      {
        question: "Does AI education require coding experience?",
        answer: "No. TREE separates AI literacy, rapid prototyping, and system ownership so people can learn the level that matches their role."
      },
      {
        question: "What should a team know before using AI at work?",
        answer: "They should know how to verify outputs, protect sensitive data, use approval checkpoints, and identify where AI is helpful or risky."
      }
    ],
    relatedSolutions: ["ai-training-for-teams", "human-review-ai-workflows"]
  }
];

export const solutionPages: SolutionPage[] = [
  {
    slug: "ai-agent-orchestration",
    title: "AI Agent Orchestration",
    description: "Coordinated AI agent systems with scoped roles, task routing, human checkpoints, logs, and dashboards.",
    eyebrow: "Solution",
    answer:
      "AI agent orchestration connects specialized agents into one supervised workflow so intake, research, drafting, review, approval, and action happen in a clear order.",
    outcomes: ["Scoped agents with narrow jobs", "Task routing between tools and people", "Approval checkpoints before sensitive actions", "Logs and dashboards for visibility"],
    workflow: ["Map the real business process", "Define each agent role and output", "Add review and escalation points", "Build the dashboard or operating view", "Train the team to operate the system"],
    fits: ["Multi-step workflows", "Teams with repeatable knowledge work", "Businesses that need visibility and review"],
    doesNotFit: ["Vague chatbot requests", "Fully autonomous high-risk actions", "Processes no one owns internally"],
    faqs: [
      {
        question: "What makes agent orchestration different from automation?",
        answer: "Automation moves steps. Agent orchestration adds specialized AI roles that read, summarize, draft, classify, or recommend inside the workflow."
      },
      {
        question: "Can agents work with human approvals?",
        answer: "Yes. TREE designs supervised systems where important outputs pause for review before action."
      }
    ],
    relatedPosts: ["what-is-a-supervised-ai-agent-system", "human-in-the-loop-ai-approvals"]
  },
  {
    slug: "ai-dashboard-systems",
    title: "AI Dashboard Systems",
    description: "Custom dashboards for business activity, agent workflows, approvals, risks, content, finance, security, and operations.",
    eyebrow: "Solution",
    answer:
      "An AI dashboard system gives owners and teams one place to see signals, tasks, approvals, summaries, alerts, and recommended next actions.",
    outcomes: ["Cleaner operating visibility", "AI summaries and decision briefs", "Approval queues for supervised workflows", "Charts and status views tied to real actions"],
    workflow: ["Choose the decisions the dashboard should support", "Connect the data and workflow sources", "Design status, alert, and approval views", "Add AI summaries where useful", "Train users on the operating rhythm"],
    fits: ["Owners managing scattered information", "Teams with recurring reports", "Security, finance, marketing, or operations workflows"],
    doesNotFit: ["Decorative charts with no action", "One-time reporting projects", "Data sources that cannot be accessed or trusted"],
    faqs: [
      {
        question: "Can a dashboard include AI summaries?",
        answer: "Yes. AI can summarize activity, flag changes, draft briefs, and group similar issues when the data supports it."
      },
      {
        question: "Is a dashboard useful before automation?",
        answer: "Often yes. Visibility can reveal which workflow should be automated first."
      }
    ],
    relatedPosts: ["ai-dashboards-for-business-owners", "ai-automation-vs-ai-agents"]
  },
  {
    slug: "business-automation",
    title: "Business Automation",
    description: "Practical automation for intake, follow-up, reporting, content, CRM routing, reviews, and recurring operations.",
    eyebrow: "Solution",
    answer:
      "Business automation connects recurring tasks so information moves, reminders happen, drafts are prepared, and people review the important steps instead of rebuilding the same work by hand.",
    outcomes: ["Less repetitive admin work", "More consistent follow-up", "Draft-and-review content workflows", "Clearer task routing and ownership"],
    workflow: ["Find the repeatable bottleneck", "Separate rules-based steps from AI-assisted steps", "Build the smallest useful workflow", "Add monitoring and review points", "Improve after real use"],
    fits: ["Small businesses", "Local operators", "Teams with intake, reviews, reporting, content, or CRM tasks"],
    doesNotFit: ["Processes that change every time", "Teams with no internal owner", "Sensitive actions without approval"],
    faqs: [
      {
        question: "What should a small business automate first?",
        answer: "Start with repeatable, low-risk work such as intake, follow-up, review response drafts, local SEO tasks, content queues, or weekly reports."
      },
      {
        question: "Does every automation need AI?",
        answer: "No. TREE uses AI where language, summarization, classification, or drafting helps. Simple rules are better for simple tasks."
      }
    ],
    relatedPosts: ["what-to-automate-first-small-business", "ai-automation-vs-ai-agents"]
  },
  {
    slug: "ai-training-for-teams",
    title: "AI Education For Teams",
    description: "Practical AI literacy, rapid prototyping, and system ownership education for owners, teams, and operators.",
    eyebrow: "Solution",
    answer:
      "AI education for teams helps people understand AI limits, use tools safely, prototype workflows with guardrails, and operate the systems their business relies on.",
    outcomes: ["Clear AI literacy for nontechnical teams", "Safer prompting and review habits", "Rapid prototyping workflows with guardrails", "System ownership after launch"],
    workflow: ["Identify the team's actual AI use cases", "Teach safe review and verification habits", "Prototype small workflows where appropriate", "Document operating rules", "Train handoff and ongoing improvement"],
    fits: ["Owners adopting AI", "Teams receiving a new dashboard or automation", "People who need confidence without becoming engineers"],
    doesNotFit: ["Generic AI keynote requests", "Education with no practical workflow", "Replacing licensed professional judgment"],
    faqs: [
      {
        question: "What is rapid prototyping with AI?",
        answer: "It teaches people how to use natural language AI tools to prototype internal tools and workflows safely, with review habits and boundaries."
      },
      {
        question: "Who should take AI literacy education?",
        answer: "Owners, managers, operators, creators, and team members who need to use or review AI-assisted work."
      }
    ],
    relatedPosts: ["ai-training-literacy-vibe-coding-system-ownership", "human-in-the-loop-ai-approvals"]
  },
  {
    slug: "human-review-ai-workflows",
    title: "Human Review AI Workflows",
    description: "Human-in-the-loop AI workflows for approvals, escalations, customer-facing drafts, financial checks, and high-trust operations.",
    eyebrow: "Solution",
    answer:
      "Human review AI workflows let AI prepare and route work while people approve, edit, reject, or escalate the actions that carry risk.",
    outcomes: ["Approval queues for important outputs", "Clear escalation paths", "Safer customer-facing and high-trust workflows", "Logs that show what happened and why"],
    workflow: ["Classify workflow risk", "Define what needs approval", "Design review screens or notifications", "Log inputs, outputs, and decisions", "Train reviewers on pause, edit, approve, and reject habits"],
    fits: ["Finance, security, legal, healthcare-adjacent, and customer-facing workflows", "Teams needing auditability", "Businesses that want AI help without losing control"],
    doesNotFit: ["Work no one has time to review", "Actions that should never be automated", "Systems designed to bypass accountability"],
    faqs: [
      {
        question: "What is human-in-the-loop AI?",
        answer: "It is an AI workflow where people remain responsible for reviewing and approving important actions."
      },
      {
        question: "Can review workflows still save time?",
        answer: "Yes. AI can handle intake, summaries, classification, and drafts so humans spend time on the decision, not the setup."
      }
    ],
    relatedPosts: ["human-in-the-loop-ai-approvals", "what-is-a-supervised-ai-agent-system"]
  }
];

export const newsletterIssues = [
  "One practical AI workflow idea",
  "One tool or model change worth understanding",
  "One risk, approval, or review habit",
  "One example of supervised automation in the real world"
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getSolutionPage(slug: string) {
  return solutionPages.find((solution) => solution.slug === slug);
}
