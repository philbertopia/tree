"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  siAirtable,
  siAlgolia,
  siAnthropic,
  siAsana,
  siAstro,
  siBlockchaindotcom,
  siBuffer,
  siCalendly,
  siClaude,
  siCloudflare,
  siContentful,
  siClickup,
  siCrewai,
  siCursor,
  siDiscord,
  siDocker,
  siElasticsearch,
  siElevenlabs,
  siFigma,
  siFirebase,
  siFramer,
  siGithub,
  siGithubactions,
  siGmail,
  siGoogledrive,
  siGoogleanalytics,
  siGooglecalendar,
  siGooglegemini,
  siGooglesheets,
  siGraphql,
  siHootsuite,
  siHubspot,
  siHuggingface,
  siJira,
  siKubernetes,
  siLangchain,
  siLinear,
  siMake,
  siMailchimp,
  siMeta,
  siMiro,
  siMongodb,
  siN8n,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siNotion,
  siOllama,
  siOpenrouter,
  siPerplexity,
  siPostgresql,
  siPrisma,
  siPython,
  siQdrant,
  siRailway,
  siReact,
  siRedis,
  siRemix,
  siRender,
  siRetool,
  siSanity,
  siShopify,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTelegram,
  siTrello,
  siTypescript,
  siVercel,
  siVite,
  siWebflow,
  siWordpress,
  siYoutube,
  siZapier,
  type SimpleIcon
} from "simple-icons";
import * as THREE from "three";
import { tools, ToolItem } from "@/lib/data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ToolPoint extends ToolItem {
  position: THREE.Vector3;
  tone: "green" | "violet" | "cyan";
  detail: string;
  url: string;
  logo?: SimpleIcon;
  satellite?: boolean;
  special?: boolean;
  shape: "sphere" | "crystal" | "core" | "moon";
  size: number;
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitPhase?: number;
  orbitTilt?: number;
}

interface Connection {
  from: number;
  to: number;
}

const CATEGORY_TONES: Record<string, ToolPoint["tone"]> = {
  LLM: "cyan",
  Research: "cyan",
  Build: "green",
  Local: "violet",
  Agents: "green",
  Automation: "green",
  Web: "cyan",
  Data: "violet",
  Commerce: "violet",
  Bots: "green",
  Content: "green",
  Web3: "violet",
  Dashboards: "cyan",
  Design: "violet",
  Core: "green",
  Systems: "violet"
};

const TONE_COLORS: Record<ToolPoint["tone"], string> = {
  green: "#4ade80",
  violet: "#a78bfa",
  cyan: "#67e8f9"
};

const CATEGORY_DETAILS: Record<string, string> = {
  LLM: "TREE uses this class of model tooling to build assistants, reasoning workflows, summarizers, research helpers, and custom AI features. In practice, it can power drafting, classification, extraction, code support, customer-facing chat, and internal decision support with human review where needed.",
  Research: "TREE uses research tools to shorten discovery loops: collecting sources, comparing options, monitoring markets, summarizing technical material, and turning messy information into useful briefs. These tools are strongest when paired with verification and a clear business question.",
  Build: "TREE uses build tools to move from idea to working software faster. They support planning, coding, debugging, repository workflows, deployment checks, and maintenance, while still keeping architecture and review under human control.",
  Local: "TREE uses local AI tooling when privacy, experimentation, offline access, or cost control matter. Local models can support internal drafting, classification, retrieval, and prototype agents without sending every workflow through a hosted model provider.",
  Agents: "TREE uses agent frameworks and protocols to connect models with tools, data, memory, and multi-step workflows. This layer is where prompts, retrieval, approvals, browser actions, APIs, and business rules become repeatable operating systems.",
  Automation: "TREE uses automation platforms to connect apps, route data, trigger actions, and reduce repetitive operational work. Good automation handles approvals, retries, notifications, logging, and fallbacks instead of simply firing blind one-off tasks.",
  Web: "TREE uses web infrastructure for the surfaces people actually touch: websites, dashboards, portals, internal apps, APIs, hosting, and frontends. These tools turn AI and automation work into stable experiences users can open, understand, and trust.",
  Data: "TREE uses data tools to structure the information behind workflows: records, tables, embeddings, forms, dashboards, CRMs, and operational databases. This layer helps AI systems retrieve the right context and helps teams see what is happening.",
  Commerce: "TREE uses commerce tooling for payments, subscriptions, storefront workflows, order operations, customer journeys, and revenue automation. These systems are usually connected carefully because they touch money, inventory, and customer trust.",
  Bots: "TREE uses bot platforms for alerts, community workflows, support helpers, moderation, internal command interfaces, and conversational automation. The best bot systems are narrow, reliable, and clear about when a human should step in.",
  Content: "TREE uses content tools for research, scripting, publishing, repurposing, creative production, and performance feedback. They help teams keep a consistent content rhythm without losing editorial judgment.",
  Web3: "TREE uses blockchain tooling for wallet-aware apps, smart contract workflows, on-chain data, token-gated experiences, and project operations. These systems need extra attention to security, transaction clarity, and user trust.",
  Dashboards: "TREE uses dashboard and charting tools to turn live data into decision surfaces. Dashboards are useful when they make changes, risks, trends, and next actions easier to see at a glance.",
  Design: "TREE uses design tools for interface planning, prototypes, motion, brand consistency, and handoff from concept to build. Design tools help make AI systems feel usable instead of merely technically impressive.",
  Core: "A larger TREE system node representing how individual tools combine into a working business capability. These nodes sit above single products and describe the operating layer TREE designs around them.",
  Systems: "A larger TREE architecture node for the connected systems that sit above individual tools: model workflows, automations, data flows, interfaces, approvals, monitoring, and training."
};

const SPECIAL_TOOLS: ToolItem[] = [
  { name: "AI Systems", category: "Systems" },
  { name: "Automation Core", category: "Core" },
  { name: "Web & Data Stack", category: "Systems" },
  { name: "Agent Operations", category: "Core" },
  { name: "Private AI Lab", category: "Systems" },
  { name: "Content Engine", category: "Core" }
];

const SPECIAL_DETAILS: Record<string, string> = {
  "AI Systems": "The central layer where models, prompts, retrieval, tools, and human approvals become a useful operating system.",
  "Automation Core": "The workflow layer that moves data, triggers actions, routes approvals, and keeps business processes running.",
  "Web & Data Stack": "The app, website, database, dashboard, and deployment layer that turns AI work into usable business software.",
  "Agent Operations": "The monitoring, scheduling, evaluation, and fallback layer that keeps AI agents useful after launch.",
  "Private AI Lab": "A protected environment for local models, sensitive data experiments, and controlled AI prototyping.",
  "Content Engine": "The system layer for research, scripting, creative production, publishing, and performance feedback."
};

const TOOL_LOGOS: Record<string, SimpleIcon | undefined> = {
  "Claude Code": siClaude,
  "Anthropic API": siAnthropic,
  Gemini: siGooglegemini,
  Perplexity: siPerplexity,
  Cursor: siCursor,
  Ollama: siOllama,
  LangChain: siLangchain,
  "Make.com": siMake,
  Zapier: siZapier,
  n8n: siN8n,
  Vercel: siVercel,
  "Next.js": siNextdotjs,
  Supabase: siSupabase,
  Airtable: siAirtable,
  Shopify: siShopify,
  Webflow: siWebflow,
  WordPress: siWordpress,
  Stripe: siStripe,
  "Discord Bots": siDiscord,
  "Telegram Bots": siTelegram,
  "YouTube Tools": siYoutube,
  "Blockchain Tooling": siBlockchaindotcom,
  Framer: siFramer,
  Figma: siFigma,
  GitHub: siGithub,
  Docker: siDocker,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  "Tailwind CSS": siTailwindcss,
  React: siReact,
  TypeScript: siTypescript,
  Cloudflare: siCloudflare,
  Notion: siNotion,
  "Google Drive": siGoogledrive,
  HubSpot: siHubspot,
  Python: siPython,
  "Node.js": siNodedotjs,
  Firebase: siFirebase,
  MongoDB: siMongodb,
  Redis: siRedis,
  "GitHub Actions": siGithubactions,
  Retool: siRetool,
  Linear: siLinear,
  CrewAI: siCrewai,
  "Hugging Face": siHuggingface,
  ElevenLabs: siElevenlabs,
  "Google Analytics": siGoogleanalytics,
  "Meta Ads": siMeta,
  Mailchimp: siMailchimp,
  Calendly: siCalendly,
  GraphQL: siGraphql,
  Kubernetes: siKubernetes,
  Netlify: siNetlify,
  Render: siRender,
  Railway: siRailway,
  Sanity: siSanity,
  Contentful: siContentful,
  "Google Sheets": siGooglesheets,
  "Google Calendar": siGooglecalendar,
  Gmail: siGmail,
  OpenRouter: siOpenrouter,
  Jira: siJira,
  Asana: siAsana,
  Trello: siTrello,
  ClickUp: siClickup,
  Miro: siMiro,
  Buffer: siBuffer,
  Hootsuite: siHootsuite,
  Algolia: siAlgolia,
  Elasticsearch: siElasticsearch,
  Qdrant: siQdrant,
  Vite: siVite,
  Remix: siRemix,
  Astro: siAstro
};

const TOOL_URLS: Record<string, string> = {
  "Claude Code": "https://www.anthropic.com/claude-code",
  "Anthropic API": "https://www.anthropic.com/api",
  "OpenAI API": "https://platform.openai.com/",
  ChatGPT: "https://chatgpt.com/",
  Gemini: "https://gemini.google.com/",
  Perplexity: "https://www.perplexity.ai/",
  Cursor: "https://cursor.com/",
  Codex: "https://openai.com/codex/",
  Ollama: "https://ollama.com/",
  "LM Studio": "https://lmstudio.ai/",
  "Local LLMs": "https://huggingface.co/models",
  LangChain: "https://www.langchain.com/",
  LlamaIndex: "https://www.llamaindex.ai/",
  "MCP Tools": "https://modelcontextprotocol.io/",
  Playwright: "https://playwright.dev/",
  "Make.com": "https://www.make.com/",
  Zapier: "https://zapier.com/",
  n8n: "https://n8n.io/",
  Vercel: "https://vercel.com/",
  "Next.js": "https://nextjs.org/",
  Supabase: "https://supabase.com/",
  Airtable: "https://www.airtable.com/",
  Shopify: "https://www.shopify.com/",
  Webflow: "https://webflow.com/",
  WordPress: "https://wordpress.org/",
  Stripe: "https://stripe.com/",
  "Discord Bots": "https://discord.com/developers/docs/intro",
  "Telegram Bots": "https://core.telegram.org/bots",
  "YouTube Tools": "https://www.youtube.com/",
  "Blockchain Tooling": "https://www.blockchain.com/",
  Recharts: "https://recharts.org/",
  Framer: "https://www.framer.com/",
  Figma: "https://www.figma.com/",
  GitHub: "https://github.com/",
  Docker: "https://www.docker.com/",
  PostgreSQL: "https://www.postgresql.org/",
  Prisma: "https://www.prisma.io/",
  "Tailwind CSS": "https://tailwindcss.com/",
  React: "https://react.dev/",
  TypeScript: "https://www.typescriptlang.org/",
  Cloudflare: "https://www.cloudflare.com/",
  Slack: "https://slack.com/",
  Notion: "https://www.notion.com/",
  "Google Drive": "https://drive.google.com/",
  HubSpot: "https://www.hubspot.com/",
  Python: "https://www.python.org/",
  "Node.js": "https://nodejs.org/",
  Firebase: "https://firebase.google.com/",
  MongoDB: "https://www.mongodb.com/",
  Redis: "https://redis.io/",
  "GitHub Actions": "https://github.com/features/actions",
  Retool: "https://retool.com/",
  Linear: "https://linear.app/",
  CrewAI: "https://www.crewai.com/",
  "Vector Databases": "https://www.pinecone.io/learn/vector-database/",
  "Hugging Face": "https://huggingface.co/",
  Pinecone: "https://www.pinecone.io/",
  ElevenLabs: "https://elevenlabs.io/",
  "Google Analytics": "https://analytics.google.com/",
  "Meta Ads": "https://www.facebook.com/business/ads",
  Twilio: "https://www.twilio.com/",
  Mailchimp: "https://mailchimp.com/",
  Calendly: "https://calendly.com/",
  Turso: "https://turso.tech/",
  GraphQL: "https://graphql.org/",
  AWS: "https://aws.amazon.com/",
  Azure: "https://azure.microsoft.com/",
  Kubernetes: "https://kubernetes.io/",
  Netlify: "https://www.netlify.com/",
  Render: "https://render.com/",
  Railway: "https://railway.com/",
  Sanity: "https://www.sanity.io/",
  Contentful: "https://www.contentful.com/",
  Salesforce: "https://www.salesforce.com/",
  "Google Sheets": "https://sheets.google.com/",
  "Google Calendar": "https://calendar.google.com/",
  Gmail: "https://mail.google.com/",
  OpenRouter: "https://openrouter.ai/",
  Jira: "https://www.atlassian.com/software/jira",
  Asana: "https://asana.com/",
  Trello: "https://trello.com/",
  ClickUp: "https://clickup.com/",
  Miro: "https://miro.com/",
  Canva: "https://www.canva.com/",
  Buffer: "https://buffer.com/",
  Hootsuite: "https://www.hootsuite.com/",
  Algolia: "https://www.algolia.com/",
  Elasticsearch: "https://www.elastic.co/elasticsearch",
  Qdrant: "https://qdrant.tech/",
  Weaviate: "https://weaviate.io/",
  Vite: "https://vite.dev/",
  Remix: "https://remix.run/",
  Astro: "https://astro.build/",
  "AI Systems": "/#services",
  "Automation Core": "/#services",
  "Web & Data Stack": "/#services",
  "Agent Operations": "/#services",
  "Private AI Lab": "/#services",
  "Content Engine": "/#services"
};

const EXTRA_TOOLS: ToolItem[] = [
  { name: "GitHub", category: "Build" },
  { name: "Docker", category: "Build" },
  { name: "PostgreSQL", category: "Data" },
  { name: "Prisma", category: "Data" },
  { name: "Tailwind CSS", category: "Web" },
  { name: "React", category: "Web" },
  { name: "TypeScript", category: "Build" },
  { name: "Cloudflare", category: "Web" },
  { name: "Slack", category: "Automation" },
  { name: "Notion", category: "Data" },
  { name: "Google Drive", category: "Data" },
  { name: "HubSpot", category: "Automation" },
  { name: "Python", category: "Build" },
  { name: "Node.js", category: "Web" },
  { name: "Firebase", category: "Data" },
  { name: "MongoDB", category: "Data" },
  { name: "Redis", category: "Data" },
  { name: "GitHub Actions", category: "Automation" },
  { name: "Retool", category: "Data" },
  { name: "Linear", category: "Build" },
  { name: "CrewAI", category: "Agents" },
  { name: "Vector Databases", category: "Data" },
  { name: "Hugging Face", category: "LLM" },
  { name: "Pinecone", category: "Data" },
  { name: "ElevenLabs", category: "Content" },
  { name: "Google Analytics", category: "Dashboards" },
  { name: "Meta Ads", category: "Automation" },
  { name: "Twilio", category: "Bots" },
  { name: "Mailchimp", category: "Automation" },
  { name: "Calendly", category: "Automation" },
  { name: "Turso", category: "Data" },
  { name: "GraphQL", category: "Agents" },
  { name: "AWS", category: "Web" },
  { name: "Azure", category: "Web" },
  { name: "Kubernetes", category: "Web" },
  { name: "Netlify", category: "Web" },
  { name: "Render", category: "Web" },
  { name: "Railway", category: "Web" },
  { name: "Sanity", category: "Content" },
  { name: "Contentful", category: "Content" },
  { name: "Salesforce", category: "Automation" },
  { name: "Google Sheets", category: "Data" },
  { name: "Google Calendar", category: "Automation" },
  { name: "Gmail", category: "Automation" },
  { name: "OpenRouter", category: "LLM" },
  { name: "Jira", category: "Build" },
  { name: "Asana", category: "Automation" },
  { name: "Trello", category: "Automation" },
  { name: "ClickUp", category: "Automation" },
  { name: "Miro", category: "Design" },
  { name: "Canva", category: "Design" },
  { name: "Buffer", category: "Automation" },
  { name: "Hootsuite", category: "Automation" },
  { name: "Algolia", category: "Data" },
  { name: "Elasticsearch", category: "Data" },
  { name: "Qdrant", category: "Data" },
  { name: "Weaviate", category: "Data" },
  { name: "Vite", category: "Web" },
  { name: "Remix", category: "Web" },
  { name: "Astro", category: "Web" }
];

function makeToolPoints(): ToolPoint[] {
  return [...SPECIAL_TOOLS, ...tools, ...EXTRA_TOOLS].map((tool, index) => {
    const special = index < SPECIAL_TOOLS.length;
    const toolIndex = special ? index : index - SPECIAL_TOOLS.length;
    const satellite = !special && toolIndex >= tools.length;
    const angle = index * 1.31;
    const ring = index % 6;
    const radius = special ? 1.85 + index * 0.58 : 6.4 + ring * 1.55 + (index % 7) * 0.16 + (satellite ? 1.05 : 0);
    const spiral = index * 0.115;
    const x = Math.cos(angle + spiral) * radius + Math.sin(index * 0.68) * (special ? 1.55 : 2.35);
    const y = special
      ? Math.sin(angle * 0.82) * (1.05 + ring * 0.29) + Math.cos(index * 0.37) * 0.85
      : Math.sin(angle * 0.82) * (1.55 + ring * 0.38) + Math.cos(index * 0.37) * 1.25;
    const z = special ? Math.sin(angle * 1.08) * 3.25 + (ring - 2.5) * 0.64 : Math.sin(angle * 1.08) * 5.6 + (ring - 2.5) * 1.05;
    const specialSizes = [0.62, 0.52, 0.74, 0.46, 0.56, 0.5];
    const shape = special ? (["core", "sphere", "crystal", "moon", "sphere", "core"] as const)[index] : (["sphere", "crystal", "core", "moon"] as const)[index % 4];
    const size = special ? specialSizes[index] : satellite ? 0.12 + (index % 3) * 0.018 : 0.18 + (index % 4) * 0.018;

    return {
      ...tool,
      position: new THREE.Vector3(x, y, z),
      tone: special ? (["cyan", "green", "violet", "green", "cyan", "violet"] as const)[index] : CATEGORY_TONES[tool.category] ?? "green",
      detail: SPECIAL_DETAILS[tool.name] ?? CATEGORY_DETAILS[tool.category] ?? "Used as part of TREE's practical AI infrastructure stack.",
      url: TOOL_URLS[tool.name] ?? "https://www.google.com/search?q=" + encodeURIComponent(tool.name),
      logo: TOOL_LOGOS[tool.name],
      satellite,
      special,
      shape,
      size,
      orbitRadius: special ? 2.25 + index * 0.72 : undefined,
      orbitSpeed: special ? 0.024 + index * 0.007 : undefined,
      orbitPhase: special ? index * ((Math.PI * 2) / SPECIAL_TOOLS.length) + 0.45 : undefined,
      orbitTilt: special ? 0.08 + index * 0.105 : undefined
    };
  });
}

function makeConnections(points: ToolPoint[]): Connection[] {
  const keys = new Set<string>();
  const connections: Connection[] = [];

  const addConnection = (from: number, to: number) => {
    const low = Math.min(from, to);
    const high = Math.max(from, to);
    const key = `${low}-${high}`;

    if (!keys.has(key)) {
      keys.add(key);
      connections.push({ from: low, to: high });
    }
  };

  points.forEach((point, index) => {
    if (point.special) return;

    let first = -1;
    let second = -1;
    let firstDistance = Infinity;
    let secondDistance = Infinity;

    points.forEach((candidate, candidateIndex) => {
      if (candidateIndex === index) return;
      if (candidate.special) return;

      const categoryBonus = candidate.category === point.category ? 0.66 : 1;
      const distance = point.position.distanceTo(candidate.position) * categoryBonus;

      if (distance < firstDistance) {
        second = first;
        secondDistance = firstDistance;
        first = candidateIndex;
        firstDistance = distance;
      } else if (distance < secondDistance) {
        second = candidateIndex;
        secondDistance = distance;
      }
    });

    if (first >= 0) addConnection(index, first);
    if (second >= 0 && index % 2 === 0) addConnection(index, second);
    if (index > 0 && index % 8 === 0) addConnection(index, index - 1);
  });

  return connections;
}

function getAnimatedPosition(point: ToolPoint, index: number, time: number, pointer: THREE.Vector2, target: THREE.Vector3) {
  if (point.special) {
    const radius = point.orbitRadius ?? 2.4;
    const speed = point.orbitSpeed ?? 0.18;
    const phase = point.orbitPhase ?? 0;
    const tilt = point.orbitTilt ?? 0.16;
    const angle = time * speed + phase;

    target.set(
      Math.cos(angle) * radius,
      Math.sin(angle * 1.15 + phase) * 0.24 + Math.sin(angle) * tilt,
      Math.sin(angle) * radius * 0.72
    );
    return;
  }

  const base = point.position;
  const driftX = Math.sin(time * 0.16 + index * 0.83) * 0.11;
  const driftY = Math.cos(time * 0.14 + index * 0.61) * 0.09;
  const driftZ = Math.sin(time * 0.12 + index * 0.47) * 0.14;
  const pointerDistance = Math.max(0, 1 - pointer.distanceTo(new THREE.Vector2(base.x / 6, base.y / 3.8)));
  const pull = pointerDistance * 0.26;

  target.set(
    base.x + driftX + pointer.x * pull,
    base.y + driftY + pointer.y * pull * 0.5,
    base.z + driftZ + pull * 0.28
  );
}

function getMotionTime(point: ToolPoint, time: number, paused: boolean, pausedTime: number) {
  return point.special && paused ? pausedTime : time;
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(2600 * 3);

    for (let i = 0; i < 2600; i += 1) {
      const galaxy = i < 1050;
      const angle = Math.random() * Math.PI * 2;
      const radius = galaxy ? 2 + Math.random() * 12 : Math.random() * 16;

      values[i * 3] = galaxy ? Math.cos(angle) * radius : (Math.random() - 0.5) * 30;
      values[i * 3 + 1] = galaxy ? (Math.random() - 0.5) * 2.6 : (Math.random() - 0.5) * 16;
      values[i * 3 + 2] = galaxy ? Math.sin(angle) * radius - 7 : -9 - Math.random() * 16;
    }

    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = clock.elapsedTime * 0.008;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.035;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#dffbff" size={0.018} sizeAttenuation transparent opacity={0.82} />
    </points>
  );
}

function FarStarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(3400 * 3);

    for (let i = 0; i < 4200; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * 46;
      values[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 9;
      values[i * 3 + 1] = (Math.random() - 0.5) * 34;
      values[i * 3 + 2] = Math.sin(angle) * radius - 34 - Math.random() * 28;
    }

    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = clock.elapsedTime * 0.0025;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.035) * 0.018;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f4fbff" size={0.05} sizeAttenuation transparent opacity={0.68} />
    </points>
  );
}

function GalaxyDust() {
  const dustRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(1500 * 3);

    for (let i = 0; i < 1500; i += 1) {
      const angle = i * 0.42;
      const radius = 1.2 + Math.sqrt(i / 1500) * 8.8;
      values[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.82;
      values[i * 3 + 1] = (Math.random() - 0.5) * 0.62;
      values[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.82;
    }

    return values;
  }, []);

  useFrame(({ clock }) => {
    if (!dustRef.current) return;

    dustRef.current.rotation.y = -clock.elapsedTime * 0.014;
    dustRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={dustRef} rotation={[0.16, 0, -0.06]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8ff6ff" size={0.012} sizeAttenuation transparent opacity={0.34} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function CentralSun() {
  const sunRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!sunRef.current) return;

    sunRef.current.rotation.y = clock.elapsedTime * 0.16;
    sunRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.12) * 0.08;
  });

  return (
    <group ref={sunRef}>
      <mesh>
        <sphereGeometry args={[0.58, 56, 56]} />
        <meshBasicMaterial color="#fff7ad" transparent opacity={0.92} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.02, 56, 56]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.14} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function SpecialOrbitPaths({ points }: { points: ToolPoint[] }) {
  return (
    <group>
      {points
        .filter((point) => point.special)
        .map((point) => (
          <SpecialOrbitPath key={point.name} point={point} />
        ))}
    </group>
  );
}

function SpecialOrbitPath({ point }: { point: ToolPoint }) {
  const positions = useMemo(() => {
    const segments = 192;
    const radius = point.orbitRadius ?? 2.4;
    const phase = point.orbitPhase ?? 0;
    const tilt = point.orbitTilt ?? 0.16;
    const values = new Float32Array((segments + 1) * 3);

    for (let i = 0; i <= segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2 + phase;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = Math.sin(angle * 1.15 + phase) * 0.24 + Math.sin(angle) * tilt;
      values[i * 3 + 2] = Math.sin(angle) * radius * 0.72;
    }

    return values;
  }, [point.orbitPhase, point.orbitRadius, point.orbitTilt]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={TONE_COLORS[point.tone]} transparent opacity={0.34} blending={THREE.AdditiveBlending} />
    </line>
  );
}

function ConnectionLines({
  points,
  connections,
  activeIndex,
  orbitPaused,
  orbitPausedTime,
  highlighted = false
}: {
  points: ToolPoint[];
  connections: Connection[];
  activeIndex: number | null;
  orbitPaused: boolean;
  orbitPausedTime: number;
  highlighted?: boolean;
}) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const { pointer } = useThree();
  const visibleConnections = useMemo(() => {
    if (!highlighted || activeIndex === null) return connections;

    return connections.filter((connection) => connection.from === activeIndex || connection.to === activeIndex);
  }, [activeIndex, connections, highlighted]);
  const positions = useMemo(() => new Float32Array(visibleConnections.length * 6), [visibleConnections.length]);
  const fromPosition = useMemo(() => new THREE.Vector3(), []);
  const toPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;

    visibleConnections.forEach((connection, index) => {
      getAnimatedPosition(
        points[connection.from],
        connection.from,
        getMotionTime(points[connection.from], clock.elapsedTime, orbitPaused, orbitPausedTime),
        pointer,
        fromPosition
      );
      getAnimatedPosition(
        points[connection.to],
        connection.to,
        getMotionTime(points[connection.to], clock.elapsedTime, orbitPaused, orbitPausedTime),
        pointer,
        toPosition
      );

      positions[index * 6] = fromPosition.x;
      positions[index * 6 + 1] = fromPosition.y;
      positions[index * 6 + 2] = fromPosition.z;
      positions[index * 6 + 3] = toPosition.x;
      positions[index * 6 + 4] = toPosition.y;
      positions[index * 6 + 5] = toPosition.z;
    });

    const attribute = lineRef.current.geometry.getAttribute("position");
    const material = lineRef.current.material as THREE.LineBasicMaterial;

    attribute.needsUpdate = true;
    material.opacity = highlighted ? 0.92 : activeIndex === null ? 0.28 : 0.1;
  });

  if (highlighted && activeIndex === null) return null;

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={highlighted ? "#f1ffff" : "#8ee8ff"}
        transparent
        opacity={highlighted ? 0.92 : 0.28}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function ToolPlanet({
  point,
  index,
  activeIndex,
  searchActive,
  searchMatch,
  orbitPaused,
  orbitPausedTime,
  onHover,
  onSelect
}: {
  point: ToolPoint;
  index: number;
  activeIndex: number | null;
  searchActive: boolean;
  searchMatch: boolean;
  orbitPaused: boolean;
  orbitPausedTime: number;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const workingPosition = useMemo(() => new THREE.Vector3(), []);
  const isActive = activeIndex === index;
  const isDimmed = searchActive && !searchMatch && !isActive;
  const color = TONE_COLORS[point.tone];
  const planetSize = point.size;
  const activePlanetSize = point.size * 1.35;
  const atmosphereSize = point.special ? point.size * 2.15 : point.satellite ? 0.28 : 0.38;
  const ringRadius = isActive ? point.size * 1.95 : point.special ? point.size * 1.62 : point.satellite ? 0.22 : 0.28;
  const labelOffset = point.special ? -0.72 : -0.45;

  useFrame(({ clock }) => {
    if (!groupRef.current || !planetRef.current || !glowRef.current) return;

    const motionTime = getMotionTime(point, clock.elapsedTime, orbitPaused, orbitPausedTime);

    getAnimatedPosition(point, index, motionTime, pointer, workingPosition);
    groupRef.current.position.copy(workingPosition);
    planetRef.current.rotation.y = motionTime * (0.24 + (index % 5) * 0.035);
    planetRef.current.rotation.x = Math.sin(motionTime * 0.18 + index) * 0.12;
    glowRef.current.scale.setScalar(isActive || searchMatch ? 1.62 : 1.08 + Math.sin(motionTime * 1.4 + index) * 0.05);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[atmosphereSize, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isDimmed ? 0.035 : isActive || searchMatch ? 0.24 : 0.11}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh
        ref={planetRef}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(index);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "default";
        }}
      >
        <NodeGeometry point={point} size={isActive ? activePlanetSize : planetSize} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isDimmed ? 0.16 : isActive || searchMatch ? 1.35 : 0.68}
          transparent
          opacity={isDimmed ? 0.28 : 1}
          roughness={0.38}
          metalness={0.25}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, index * 0.27]}>
        <torusGeometry args={[ringRadius, point.special ? 0.008 : 0.005, 8, 72]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isDimmed ? 0.05 : isActive || searchMatch ? 0.72 : 0.26}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {point.special && index % 2 === 0 ? (
        <mesh rotation={[Math.PI / 2.75, 0.38, index * 0.41]}>
          <torusGeometry args={[point.size * 2.08, 0.006, 8, 96]} />
          <meshBasicMaterial color="#f8fdff" transparent opacity={isDimmed ? 0.05 : 0.28} blending={THREE.AdditiveBlending} />
        </mesh>
      ) : null}
      {point.special && index % 3 === 0 ? (
        <mesh rotation={[Math.PI / 2.05, 0.1, index * 0.22]}>
          <torusGeometry args={[point.size * 2.46, 0.004, 8, 110]} />
          <meshBasicMaterial color={color} transparent opacity={isDimmed ? 0.04 : 0.18} blending={THREE.AdditiveBlending} />
        </mesh>
      ) : null}
      <Html
        center
        distanceFactor={7.8}
        position={[0, 0, 0]}
        style={{ transform: "translate(-50%, -50%)" }}
        zIndexRange={point.special ? [70, 60] : isActive ? [45, 36] : [5, 0]}
      >
        <button
          className={`tools-planet-logo tools-planet-logo-${point.tone} ${isActive || searchMatch ? "tools-planet-logo-active" : ""} ${
            isDimmed ? "tools-planet-logo-dimmed" : ""
          } ${point.logo ? "" : "tools-planet-logo-empty"} ${point.special ? "tools-planet-logo-special" : ""}`}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onSelect(index);
          }}
          onPointerEnter={() => onHover(index)}
          onPointerLeave={() => onHover(null)}
          aria-label={`Open ${point.name} details`}
        >
          <ToolLogo point={point} />
        </button>
      </Html>
      <Html
        center
        distanceFactor={7.6}
        position={[0, labelOffset, 0]}
        style={{ pointerEvents: "none" }}
        zIndexRange={point.special ? [68, 58] : isActive ? [42, 34] : [4, 0]}
      >
        <span
          className={`tools-constellation-label tools-constellation-label-${point.tone} ${
            isActive || searchMatch ? "tools-constellation-label-active" : ""
          } ${
            isDimmed ? "tools-constellation-label-dimmed" : ""
          }`}
        >
          {point.name}
        </span>
      </Html>
    </group>
  );
}

function NodeGeometry({ point, size }: { point: ToolPoint; size: number }) {
  if (point.shape === "crystal") return <octahedronGeometry args={[size * 1.12, 1]} />;
  if (point.shape === "core") return <icosahedronGeometry args={[size * 1.08, 1]} />;
  if (point.shape === "moon") return <dodecahedronGeometry args={[size * 0.96, 0]} />;

  return <sphereGeometry args={[size, 40, 40]} />;
}

function ToolLogo({ point }: { point: ToolPoint }) {
  if (point.logo) {
    return (
      <svg aria-hidden="true" className="tools-planet-logo-svg" role="img" viewBox="0 0 24 24">
        <path d={point.logo.path} />
      </svg>
    );
  }

  return null;
}

function getNodeDetailParagraphs(point: ToolPoint) {
  return [
    point.detail,
    `${point.name} is most useful when it is not treated as a standalone gadget. TREE looks at where it fits in the larger system: what data it needs, what decisions it can support, what should stay manual, and what needs an approval step before anything important happens.`,
    `For business owners and individuals, this can mean turning scattered work into clearer workflows: dashboards, alerts, financial checks, security reviews, content pipelines, customer follow-up, personal tracking, or internal tools that make the next action easier to see.`,
    `The right setup depends on risk and context. TREE usually connects nodes like this with complementary tools for data, automation, monitoring, human review, and reporting so the system stays practical instead of becoming another thing to manage.`
  ];
}

function CameraRig({
  points,
  selectedIndex,
  paused,
  resetSignal
}: {
  points: ToolPoint[];
  selectedIndex: number | null;
  paused: boolean;
  resetSignal: number;
}) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const resetPosition = useMemo(() => new THREE.Vector3(0, 15.8, 8.2), []);
  const resetTarget = useMemo(() => new THREE.Vector3(0, -0.6, 0), []);

  useEffect(() => {
    camera.position.copy(resetPosition);

    if (controlsRef.current) {
      controlsRef.current.target.copy(resetTarget);
      controlsRef.current.update();
    }
  }, [camera, resetPosition, resetSignal, resetTarget]);

  useFrame(({ clock }) => {
    if (selectedIndex !== null) {
      getAnimatedPosition(points[selectedIndex], selectedIndex, clock.elapsedTime, new THREE.Vector2(0, 0), target);
      desiredPosition.set(target.x + 1.2, target.y + 0.72, target.z + 3.15);
      camera.position.lerp(desiredPosition, 0.055);
    }

    if (controlsRef.current) {
      if (selectedIndex !== null) {
        controlsRef.current.target.lerp(target, 0.075);
      }
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={selectedIndex === null && !paused}
      autoRotateSpeed={-0.12}
      enableDamping
      dampingFactor={0.08}
      enablePan
      enableZoom
      minDistance={2.6}
      maxDistance={22}
      rotateSpeed={0.62}
      zoomSpeed={0.7}
      panSpeed={0.45}
    />
  );
}

const ConstellationScene = memo(function ConstellationScene({
  selectedIndex,
  searchQuery,
  searchMatches,
  resetSignal,
  onSelect,
  onClear,
  onPointsReady,
  onHoverChange
}: {
  selectedIndex: number | null;
  searchQuery: string;
  searchMatches: Set<number>;
  resetSignal: number;
  onSelect: (index: number) => void;
  onClear: () => void;
  onPointsReady: (points: ToolPoint[]) => void;
  onHoverChange: (index: number | null) => void;
}) {
  const points = useMemo(() => makeToolPoints(), []);
  const connections = useMemo(() => makeConnections(points), [points]);
  const regularPoints = useMemo(() => points.map((point, index) => ({ point, index })).filter(({ point }) => !point.special), [points]);
  const specialPoints = useMemo(() => points.map((point, index) => ({ point, index })).filter(({ point }) => point.special), [points]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const orbitPausedTimeRef = useRef(0);
  const activeIndex = hoveredIndex ?? selectedIndex;
  const searchActive = searchQuery.trim().length > 0;
  const orbitPaused = hoveredIndex !== null && Boolean(points[hoveredIndex]?.special);

  const handleHover = (index: number | null) => {
    setHoveredIndex(index);
    onHoverChange(index);
  };

  useFrame(({ clock }) => {
    if (orbitPaused) return;
    orbitPausedTimeRef.current = clock.elapsedTime;
  });

  useEffect(() => {
    onPointsReady(points);
  }, [onPointsReady, points]);

  return (
    <>
      <color attach="background" args={["#020307"]} />
      <fog attach="fog" args={["#020307", 10, 24]} />
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 3, 4]} intensity={18} color="#c8fbff" />
      <pointLight position={[-5, -3, 2]} intensity={9} color="#a78bfa" />
      <FarStarField />
      <StarField />
      <GalaxyDust />
      <group
        rotation={[-0.38, -0.08, 0.03]}
        onPointerMissed={() => {
          onClear();
          handleHover(null);
        }}
      >
        <CentralSun />
        <SpecialOrbitPaths points={points} />
        <ConnectionLines
          points={points}
          connections={connections}
          activeIndex={activeIndex}
          orbitPaused={orbitPaused}
          orbitPausedTime={orbitPausedTimeRef.current}
        />
        <ConnectionLines
          points={points}
          connections={connections}
          activeIndex={activeIndex}
          orbitPaused={orbitPaused}
          orbitPausedTime={orbitPausedTimeRef.current}
          highlighted
        />
        {regularPoints.map(({ point, index }) => (
          <ToolPlanet
            key={point.name}
            point={point}
            index={index}
            activeIndex={activeIndex}
            searchActive={searchActive}
            searchMatch={searchMatches.has(index)}
            orbitPaused={orbitPaused}
            orbitPausedTime={orbitPausedTimeRef.current}
            onHover={handleHover}
            onSelect={onSelect}
          />
        ))}
        {specialPoints.map(({ point, index }) => (
          <ToolPlanet
            key={point.name}
            point={point}
            index={index}
            activeIndex={activeIndex}
            searchActive={searchActive}
            searchMatch={searchMatches.has(index)}
            orbitPaused={orbitPaused}
            orbitPausedTime={orbitPausedTimeRef.current}
            onHover={handleHover}
            onSelect={onSelect}
          />
        ))}
      </group>
      <CameraRig
        points={points}
        selectedIndex={selectedIndex}
        paused={hoveredIndex !== null}
        resetSignal={resetSignal}
      />
    </>
  );
});

export function ToolsConstellation() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scenePoints, setScenePoints] = useState<ToolPoint[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const selectedTool = selectedIndex === null ? null : scenePoints[selectedIndex];
  const hoveredTool = hoveredIndex === null ? null : scenePoints[hoveredIndex];
  const selectedDetailParagraphs = selectedTool ? getNodeDetailParagraphs(selectedTool) : [];
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!normalizedSearch) return [];

    return scenePoints
      .map((point, index) => ({ point, index }))
      .filter(({ point }) => {
        return point.name.toLowerCase().includes(normalizedSearch) || point.category.toLowerCase().includes(normalizedSearch);
      })
      .slice(0, 8);
  }, [normalizedSearch, scenePoints]);
  const searchMatches = useMemo(() => new Set(searchResults.map((result) => result.index)), [searchResults]);
  const relatedNodes = useMemo(() => {
    if (selectedIndex === null || !scenePoints[selectedIndex]) return [];

    const selected = scenePoints[selectedIndex];

    return scenePoints
      .map((point, index) => ({ point, index }))
      .filter(({ index }) => index !== selectedIndex)
      .map((item) => {
        const categoryScore = item.point.category === selected.category ? 3 : 0;
        const toneScore = item.point.tone === selected.tone ? 1 : 0;
        const specialScore = selected.special !== item.point.special ? 0.5 : 0;

        return { ...item, score: categoryScore + toneScore + specialScore };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [scenePoints, selectedIndex]);

  const selectTool = (index: number) => {
    setSelectedIndex(index);
  };

  const submitSearch = () => {
    if (searchResults.length > 0) {
      selectTool(searchResults[0].index);
    }
  };

  const resetView = () => {
    setSelectedIndex(null);
    setSearchQuery("");
    setResetSignal((value) => value + 1);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    const element = carouselRef.current;
    if (!element) return;

    element.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth"
    });
  };

  return (
    <section id="tools" className="section-shell scroll-mt-24 overflow-hidden">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Tools"
          title="A constellation of practical AI infrastructure."
          description="TREE works across the modern AI stack, from local models and coding agents to automation platforms, dashboards, websites, and blockchain tooling."
          align="center"
        />
        <GlassCard className="relative overflow-hidden p-0">
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(103,232,249,0.08),transparent_32rem),radial-gradient(circle_at_10%_80%,rgba(74,222,128,0.08),transparent_24rem),radial-gradient(circle_at_90%_20%,rgba(167,139,250,0.1),transparent_26rem)]" />
          <div className="relative h-[560px] max-h-[calc(100vh-5rem)] min-h-[440px] md:h-[650px] md:max-h-[calc(100vh-6rem)] md:min-h-[590px]">
            <Canvas
              camera={{ position: [0, 15.8, 8.2], fov: 52 }}
              dpr={[1, 1.6]}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            >
              <ConstellationScene
                selectedIndex={selectedIndex}
                searchQuery={searchQuery}
                searchMatches={searchMatches}
                resetSignal={resetSignal}
                onSelect={selectTool}
                onClear={() => setSelectedIndex(null)}
                onPointsReady={setScenePoints}
                onHoverChange={setHoveredIndex}
              />
            </Canvas>
            <div className="tools-constellation-controls">
              <div className="tools-node-carousel" aria-label="Browse tool nodes">
                <button type="button" onClick={() => scrollCarousel("left")} aria-label="Previous tools">
                  ‹
                </button>
                <div ref={carouselRef} className="tools-node-carousel-track">
                  {scenePoints.map((point, index) => (
                    <button
                      key={point.name}
                      type="button"
                      className={`tools-node-chip ${selectedIndex === index ? "tools-node-chip-active" : ""}`}
                      onClick={() => selectTool(index)}
                    >
                      <span className={`tools-node-chip-mark tools-node-chip-mark-${point.tone} ${point.logo ? "" : "tools-node-chip-mark-empty"}`}>
                        <ToolLogo point={point} />
                      </span>
                      <span>{point.name}</span>
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => scrollCarousel("right")} aria-label="Next tools">
                  ›
                </button>
              </div>
              <form
                className="tools-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitSearch();
                }}
              >
                <input
                  aria-label="Search technologies"
                  className="tools-search-input"
                  placeholder="Search tools or categories"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
                <button className="tools-search-button" type="submit">
                  Search
                </button>
              </form>
              {hoveredTool ? (
                <div className={`tools-hover-card tools-hover-card-${hoveredTool.tone}`}>
                  <div className={`tools-hover-mark tools-hover-mark-${hoveredTool.tone}`}>
                    <ToolLogo point={hoveredTool} />
                  </div>
                  <div>
                    <p>{hoveredTool.name}</p>
                    <span>{hoveredTool.detail}</span>
                  </div>
                </div>
              ) : null}
              {searchResults.length > 0 ? (
                <div className="tools-search-results">
                  {searchResults.map(({ point, index }) => (
                    <button key={point.name} type="button" onClick={() => selectTool(index)}>
                      <span>{point.name}</span>
                      <small>{point.category}</small>
                    </button>
                  ))}
                </div>
              ) : null}
              <div className="tools-orbit-note">
                {hoveredTool ? "Hover pause active. Click to inspect." : "Slow galaxy drift. Drag to steer. Scroll to zoom."}
              </div>
            </div>
            <button className="tools-reset-button tools-reset-button-floating" type="button" onClick={resetView}>
              Center view
            </button>
            {selectedTool ? (
              <aside className="tools-detail-panel">
                <button className="tools-detail-x" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close details">
                  ×
                </button>
                <div className={`tools-detail-mark tools-detail-mark-${selectedTool.tone}`}>
                  <ToolLogo point={selectedTool} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{selectedTool.category}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{selectedTool.name}</h3>
                </div>
                <div className="tools-detail-copy">
                  {selectedDetailParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {relatedNodes.length > 0 ? (
                  <div className="tools-related">
                    <p>Related nodes</p>
                    <div>
                      {relatedNodes.map(({ point, index }) => (
                        <button key={point.name} type="button" onClick={() => selectTool(index)}>
                          {point.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                <a className="tools-detail-link" href={selectedTool.url} target="_blank" rel="noreferrer">
                  Visit official site
                </a>
              </aside>
            ) : null}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
