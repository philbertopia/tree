# TREE Website — Design Spec
**Date:** 2026-05-16  
**Status:** Approved  

---

## 1. Project Overview

TREE is a futuristic AI consultancy based in the Hudson Valley serving clients globally. The site must communicate that TREE is a serious, practical AI agency — not a hype machine. Brand language centers on trees, branches, roots, living systems, and branching intelligence.

**Core message:** "AI is not magic. AI is infrastructure. TREE helps you decide what to automate, what not to automate, and how to build systems your team can actually use."

**Business model:** Consultation-based only. No e-commerce, no booking system, no CMS.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router, TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion (component transitions), GSAP + ScrollTrigger (scroll effects) |
| 3D | React Three Fiber + @react-three/drei (hero tree) |
| Charts | Recharts (dashboard mockups) |
| Icons | Lucide React |
| UI primitives | shadcn/ui (button, form, select, textarea) |
| Forms | Front-end only (no backend yet) |
| Deployment target | Vercel |

**Package versions (latest stable at spec time):**
- `next`: 14.x
- `framer-motion`: 11.x
- `gsap`: 3.x
- `@react-three/fiber`: 8.x
- `@react-three/drei`: 9.x
- `three`: 0.165.x
- `recharts`: 2.x

---

## 3. Site Structure

### Routes

| Route | Type | Description |
|---|---|---|
| `/` | Full landing page | All major sections, the primary experience |
| `/contact` | Essential | Full consultation form page |
| `/about` | Light | Company story, mission, approach |
| `/services` | Stub | Redirects to `/#services` section |
| `/industries` | Stub | Redirects to `/#industries` section |
| `/tools` | Stub | Redirects to `/#tools` section |
| `/training` | Stub | Redirects to `/#training` section |

No portfolio page in v1.

### Navigation anchor IDs on homepage
`#services` · `#tools` · `#industries` · `#training` · `#contact`

---

## 4. Visual Language

### Colors
```
Background:        #050505  (near-black)
Surface:           #080808  (card backgrounds)
Border default:    #111111
Border green:      rgba(74, 222, 128, 0.15–0.25)
Border purple:     rgba(139, 92, 246, 0.15–0.25)
Green primary:     #4ade80  (electric green)
Purple accent:     #a78bfa  (violet)
Text primary:      #f9fafb  (near-white)
Text secondary:    #6b7280  (mid-grey)
Text muted:        #374151  (dark-grey)
Green glow:        rgba(74, 222, 128, 0.04–0.08)  (section bg tint)
Purple glow:       rgba(139, 92, 246, 0.04–0.08)
```

### Typography
- Font: `Inter` (Google Fonts, variable)
- Display: 800–900 weight, tight letter-spacing (-0.02em to -0.04em), large (64px–120px on desktop)
- Body: 400–500 weight, 16–18px, `#6b7280`
- Labels: 700, 10–11px, 3–4px letter-spacing, uppercase, `#374151`
- Code/terminal: `JetBrains Mono` or `Fira Code`, monospace

### Glass Panel Pattern
Every card/panel uses this pattern:
```css
background: rgba(255,255,255,0.02–0.04)
border: 1px solid rgba(green or purple, 0.15–0.25)
border-radius: 12px
backdrop-filter: blur(8–12px)
```
Green-tinted panels for primary content, purple-tinted for secondary/accent.

### Glow / Radial Backgrounds
Section backgrounds use subtle `radial-gradient` glows:
```css
background: radial-gradient(ellipse at X% Y%, rgba(34,197,94,0.06) 0%, transparent 60%)
```
These shift position per section to create depth variety.

### Motion Principles
- **Framer Motion**: `fadeInUp` (y: 30 → 0, opacity: 0 → 1) for component entrances, staggered children
- **GSAP ScrollTrigger**: Pinned sections, parallax glows, branching line draws
- **Three.js**: Hero tree — continuous slow rotation, pulse on nodes, scroll-driven branch growth
- **Reduced motion**: All animations disabled via `prefers-reduced-motion`. Static states only.

---

## 5. Navigation

### Desktop
```
[TREE]    Services  Industries  Tools  About    [Consult →]
```
- Position: fixed top, full width
- Default: `background: transparent`
- On scroll (>80px): `background: rgba(5,5,5,0.90)`, `backdrop-filter: blur(12px)`, bottom border `#111`
- "Consult →" pill: `background: rgba(74,222,128,0.1)`, `border: 1px solid rgba(74,222,128,0.25)`, `color: #4ade80`, rounded-full
- Active link: `color: #f9fafb`
- Inactive links: `color: #6b7280`, hover `color: #f9fafb`

### Mobile
- Logo left, hamburger right
- Full-screen overlay menu on open: dark bg, large centered links, CTA button
- Close via X or outside tap

---

## 6. Homepage Sections

### 6.1 Hero
**Layout:** Fullscreen (`100vh`), centered content, WebGL tree fills background.

**Content:**
```
[eyebrow]  AI AGENCY · HUDSON VALLEY
[h1]       Branching Intelligence
           for Real Businesses.
[sub]      TREE designs, builds, and teaches practical AI systems
           for businesses that want automation without the hype.
[buttons]  [Get a Free Consultation]  [Explore Systems →]
[bottom]   ↓  (scroll indicator, pulses)
```

**WebGL Tree (`HeroTreeCanvas`):**
- React Three Fiber, `dynamic` import (no SSR)
- Procedurally generated tree: trunk → branches → sub-branches → leaf nodes
- Roots = data streams (downward glowing lines)
- Nodes = pulsing spheres (green, occasional purple)
- Connections = thin glowing lines between nodes
- Continuous slow Y-rotation (~0.05 rad/s)
- Scroll-driven: branches extend and light up as user scrolls down
- Color: `#4ade80` primary, `#a78bfa` secondary nodes, `#1a1a2a` dark scene background
- Performance: instanced meshes, max 200 nodes, `frameloop="demand"` on reduced motion

**Cursor glow:** A radial glow follows the cursor (green, `pointer-events: none`, `position: fixed`), only on desktop.

**Scroll progress:** Thin 1px green line along the top of the viewport tracking scroll depth.

---

### 6.2 Trust Ticker
Continuous horizontal marquee of service categories, infinitely scrolling:

```
Websites  ·  AI Agents  ·  SEO  ·  Automation  ·  Security  ·
Finance  ·  Social Media  ·  Blockchain  ·  Training  ·  LLMs  ·  ...
```

- Two copies of the list for seamless loop
- Font: 11px, 3px letter-spacing, uppercase, `#374151`
- Separator: `·` in `#1f2937`
- Thin top and bottom borders `#0d0d0d`
- GSAP `gsap.to` infinite x-translate, pauses on hover

---

### 6.3 "AI Without the Hype"
Two-column layout (60/40 split on desktop, stacked on mobile).

**Left column:**
```
[label]    THE TREE APPROACH
[h2]       Most businesses don't need more AI tools.
           They need a system.
[body]     TREE helps you choose the right tools, connect them
           to your real workflow, and train your team to use
           them without losing control.

           Automation should feel like a living extension of
           your business — not a pile of disconnected apps.
```

**Right column:** Three numbered statements with green accent numbers:
```
01  We audit before we build.
    We map your actual business before recommending any tool.

02  We build for humans.
    Every system TREE builds has a human in the loop.

03  We teach, not just deliver.
    Your team learns to own what we build.
```

Framer Motion: left column slides in from left, right from right, on scroll enter.

---

### 6.4 Branching Workflow
An animated, horizontal step diagram showing TREE's process.

**7 steps:**
```
Business Problem → AI Audit → Tool Selection → System Design →
Automation Build → Human Training → Ongoing Optimization
```

**Visual treatment:**
- Each step: glass panel card with step number (green), title, 1-line description
- Between steps: animated SVG branch/line that draws in with GSAP ScrollTrigger
- Lines are organic/curved, not straight — suggest tree branching
- On mobile: vertical stack with lines connecting downward
- Active step highlights as user scrolls through the section (pin + scrub)

---

### 6.5 Services Grid
**Section ID:** `#services`

15 services in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile).

Each card: glass panel, icon (Lucide), service name, 1-sentence description.

**Green-bordered cards (primary services):**
1. AI Automation Systems — End-to-end workflows that run without constant attention
2. AI Agents & LLM Workflows — Custom language model pipelines for real tasks
3. Websites & Web Management — Fast, accessible, AI-assisted sites that stay current
4. SEO & Search Strategy — Content and technical strategy that compounds over time
5. Automated Social Media — Scheduled, AI-assisted posts across channels
6. YouTube Automation Systems — Research, scripting, thumbnails, scheduling pipelines
7. Marketing Automation — Lead nurture, email flows, campaign triggers
8. Internal Dashboards — Custom visibility into the metrics that matter

**Purple-bordered cards (specialized services):**
9. Security Workflows — Automated scanning, alerting, and response flows
10. Financial Automation — Reporting, reconciliation, and alert systems
11. Investment Research Automation — Data aggregation, signal processing, research agents
12. Blockchain Development — Smart contracts, wallet integrations, on-chain tooling
13. AI Training & Vibe Coding Education — Learn to use AI tools safely and practically
14. Local LLM Setup — Private, on-premise AI that never leaves your infrastructure
15. Custom Business Tools — Bespoke internal apps built around how your team works

Framer Motion stagger: cards fade up with 0.05s delay per card.

---

### 6.6 Tools Constellation
**Section ID:** `#tools`

A canvas-based or SVG floating visualization of 35+ tool/platform names connected by glowing branching lines. Tools float gently (CSS keyframe or Framer Motion `animate` loop).

**Tools list:**
Claude Code, Anthropic API, OpenAI API, ChatGPT, Gemini, Perplexity, Cursor, Codex, Ollama, LM Studio, Local LLMs, LangChain, LlamaIndex, MCP Tools, Playwright, Make.com, Zapier, n8n, Vercel, Next.js, Supabase, Airtable, Shopify, Webflow, WordPress, Stripe, Discord Bots, Telegram Bots, YouTube Tools, Blockchain Tooling, Recharts, Framer, Figma

**Visual:**
- Tool names: white text, varying font sizes (10–14px) based on category weight
- Connected by thin `rgba(74,222,128,0.2)` lines between related tools
- Clusters: LLMs cluster, Automation cluster, Web cluster, Blockchain cluster
- Hover: name brightens, connections highlight, tooltip shows category
- On mobile: simplified grid layout, no SVG connections

---

### 6.7 Dashboard Showcase
Six mock metric cards arranged in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile).

Each card is a glass panel with a label, a primary metric, and either a Recharts sparkline or a status list.

**Cards:**
1. **AI Agent Activity** — "42 tasks automated this week" + sparkline bar chart (weekly activity)
2. **SEO Growth** — "18 pages generated for review" + Recharts `LineChart` (upward trend)
3. **Social Queue** — "24 posts scheduled" + status list with green/yellow dots
4. **Lead Pipeline** — "12 leads captured" + Recharts `BarChart` by source
5. **Security Scan** — "3 risks flagged" + severity list (low/medium/high with color badges)
6. **Workflow Accuracy** — "91% approval rate" + Recharts `RadialBarChart` donut

All metrics are hardcoded. Charts animate in on scroll enter (Recharts `isAnimationActive`).

---

### 6.8 Industries
**Section ID:** `#industries`

15 industries in a glass card grid. Each card: industry name, 1 icon, 1-line description.

1. Food Trucks — Local SEO, menu updates, QR campaigns, social automation
2. Restaurants — Reservation flows, review responses, content engines
3. Local Shops — Inventory alerts, loyalty automation, local search
4. Online Businesses — Funnel automation, product feeds, support agents
5. Law Firms — Intake automation, document sorting, FAQ chatbots
6. Healthcare Offices — Patient education, admin workflows, content systems
7. Financial Institutions — Reporting automation, compliance alerts, research tools
8. Banks — Internal workflow automation, document processing
9. Hedge Funds — Research agents, signal dashboards, portfolio reporting
10. Creators — Content pipelines, audience automation, monetization tools
11. YouTube Channels — Script research, thumbnail automation, publish scheduling
12. Real Estate — Listing automation, lead qualification, market research
13. Agencies — White-label AI systems, client reporting, workflow tooling
14. Blockchain Projects — Launch content, community automation, smart contract tooling
15. Nonprofits — Grant research, donor outreach, content automation

---

### 6.9 Training / Vibe Coding
**Section ID:** `#training`

Two-column layout: statement block left, feature list right.

**Left:**
```
[label]   TREE TRAINING
[h2]      You don't need to become a programmer.
          You need to understand your system.
[body]    TREE doesn't just build and disappear. We teach clients
          how to use what we build — and how to safely prompt,
          test, review, and deploy AI-assisted changes on their own.
```

**Right:** Feature list (5 items with green check icons):
- Practical AI literacy for business owners and teams
- How to prompt, test, and review AI outputs safely
- "Vibe coding" — using AI tools to update content and create workflows
- Understanding what your automation is doing (and when to override it)
- How to stay in control of your AI systems as they grow

---

### 6.10 Terminal Panel + Chatbot Mockup
Side-by-side glass panels (stacked on mobile).

**Terminal panel (left):**
```
▸ TREE AGENT v1.0
──────────────────────────────────
$ tree-agent scan --business "local restaurant"
> mapping website, menu, SEO, reviews, social channels...
> detected 14 automation opportunities
> recommended: reservation assistant, review response
  system, weekly content engine
> human approval required

$ tree-agent scan --business "law firm"
> mapping intake flows, client communication, documents...
> detected 9 automation points
> recommended: intake form agent, document sorter,
  FAQ chatbot
> human approval required
_
```
Typewriter effect: lines appear one by one on scroll enter, cursor blinks, loops after pause.

**Chatbot panel (right):**
```
┌─────────────────────────────┐
│ 💬 TREE AI  ●               │
├─────────────────────────────┤
│ [User] Can AI help my       │
│ food truck?                 │
│                             │
│ [TREE] Yes — but only in    │
│ specific places. Start with │
│ menu updates, local SEO,    │
│ social posts, QR campaigns, │
│ and customer FAQs.          │
│                             │
│ [User] What about a law     │
│ firm?                       │
│                             │
│ [TREE] Intake automation,   │
│ document sorting, and a FAQ │
│ chatbot are the highest-ROI │
│ starting points.            │
└─────────────────────────────┘
```
Scripted conversation plays through automatically on scroll enter, message by message with typing indicator.

---

### 6.11 Testimonials
Three glass cards in a row (stacked on mobile).

**Placeholders (clearly fictitious):**

> "We had no idea where to start with AI. TREE audited our whole operation, told us what actually made sense to automate, and built it. Six months later our team runs it without thinking about it."
> — Operations Director, Regional Law Firm

> "TREE set up our social automation and local SEO system in two weeks. Our food truck now gets found by people we'd never have reached. The training was just as valuable as the build."
> — Owner, Hylander Mobile Food Cart

> "What I appreciated most was the honesty. They told us three things we were planning to automate were a waste of money. Then they built the things that actually mattered."
> — CTO, Independent Research Fund

---

### 6.12 Contact CTA Strip
Full-width section at the bottom of the homepage.

```
[h2]     Ready to build your system?
[sub]    Start with a free consultation. No pitch decks, no pressure.
         Just a real conversation about what automation can do for your business.
[btn]    Get a Free Consultation →    (links to /contact)
```

Background: radial green glow centered, glass panel wrapping the text.

---

## 7. /contact Page

### Layout
Full-page form. Two columns on desktop: left = headline + context text, right = form. Stacked on mobile.

**Left:**
```
[label]   FREE CONSULTATION
[h1]      Let's talk about your system.
[body]    Tell us about your business and what you're trying
          to improve. We'll come back to you within one business
          day with a real, specific response — not a sales pitch.

[contact options]
  📧  hello@treesystems.ai
  💬  Speak with our AI secretary  (links to chatbot mockup)
  👤  Contact a human directly
```

### Form Fields
All required unless noted:
1. **Full Name** — text input
2. **Email Address** — email input
3. **Business Type** — select dropdown:
   Food Truck / Restaurant / Local Shop / Online Business / Law Firm / Healthcare / Financial Institution / Bank / Hedge Fund / Creator / YouTube Channel / Real Estate / Agency / Blockchain Project / Nonprofit / Other
4. **Estimated Budget** — select dropdown:
   Under $1,000 / $1,000–$5,000 / $5,000–$15,000 / $15,000–$50,000 / $50,000+ / Not sure yet
5. **What do you want to automate?** — textarea (placeholder: "Describe your biggest time sink, bottleneck, or the thing you wish happened automatically...")
6. **How did you hear about TREE?** — text input (optional)

**Submit button:** "Start Growing Your System →" (full-width, green)

**Post-submit state:** Form replaces with a confirmation message:
```
Your message is growing roots.
We'll be in touch within one business day.
```

Form is front-end only — no backend submission in v1. `onSubmit` logs to console and shows confirmation state.

---

## 8. /about Page

Light page. Content:

```
[h1]     TREE is a practical AI agency.
         We are based in the Hudson Valley.
         We work with clients everywhere.

[body]   We are not a software factory. We are not a chatbot
         vendor. We are not selling AI as a magic button.

         TREE is a small team of engineers, designers, and
         strategists who spend our time understanding real
         business operations — and building real systems around them.

         We believe the best AI system is the one your team
         can actually use, understand, and improve over time.

[section: What We Believe]
  — AI should reduce stress, not create it
  — The human stays in the loop. Always.
  — Systems should grow with the business
  — Good automation is invisible when it works
  — Bad automation is obvious when it doesn't

[section: Where We Work]
  Hudson Valley, New York — and everywhere else.
  We work remotely with clients across the US and globally.

[CTA]    Talk to us →  (links to /contact)
```

---

## 9. Stub Pages (/services, /industries, /tools, /training)

Each stub page:
- Imports the `Navbar` and `Footer`
- Shows a centered message: "See our full [Services/Industries/Tools/Training] section"
- A button: "← Back to Home" linking to the relevant anchor (`/#services` etc.)
- Meta description and title set correctly for SEO

---

## 10. Folder Structure

```
app/
  layout.tsx          ← root layout, fonts, metadata, Navbar, Footer
  page.tsx            ← homepage (imports all section components)
  contact/page.tsx
  about/page.tsx
  services/page.tsx   ← stub
  industries/page.tsx ← stub
  tools/page.tsx      ← stub
  training/page.tsx   ← stub

components/
  layout/
    Navbar.tsx
    Footer.tsx
    MobileNav.tsx
  sections/
    Hero.tsx
    TrustTicker.tsx
    NoHypeSection.tsx
    BranchingWorkflow.tsx
    ServicesGrid.tsx
    ToolsConstellation.tsx
    DashboardShowcase.tsx
    IndustriesGrid.tsx
    TrainingSection.tsx
    TerminalChatSection.tsx
    Testimonials.tsx
    ContactCTAStrip.tsx
  ui/
    GlassCard.tsx
    CTAButton.tsx
    SectionHeading.tsx
    ScrollProgress.tsx
    CursorGlow.tsx
  visuals/
    HeroTreeCanvas.tsx  ← dynamic import, client-only
    TerminalPanel.tsx
    ChatbotMockup.tsx
    BranchLine.tsx      ← SVG animated branch connector

lib/
  data.ts             ← all static content (services, tools, industries, etc.)
  utils.ts            ← cn() helper, animation variants

public/
  images/             ← (empty for now, no images required)

styles/
  globals.css         ← Tailwind base, custom scrollbar, font imports
```

---

## 11. SEO Metadata

Each page exports a `metadata` object:

**Homepage:**
```ts
title: "TREE — AI Agency Hudson Valley | Practical AI Systems for Real Businesses"
description: "TREE designs, builds, and teaches custom AI automation systems for businesses. AI agents, LLM workflows, SEO, social automation, blockchain development, and AI training. Hudson Valley based, globally focused."
keywords: ["AI agency Hudson Valley", "AI automation agency", "AI consulting small business", "LLM automation", "AI agents for business", "vibe coding training", "custom AI systems"]
```

**Contact:**
```ts
title: "Free AI Consultation — TREE"
description: "Book a free consultation with TREE. We'll map your business, identify automation opportunities, and tell you honestly what AI can and can't do for you."
```

**About:**
```ts
title: "About TREE — Practical AI Agency, Hudson Valley"
description: "TREE is a small team of engineers and strategists building practical AI systems for real businesses. Based in the Hudson Valley, working globally."
```

---

## 12. Performance Considerations

- `HeroTreeCanvas` imported with `next/dynamic` and `ssr: false`
- `ToolsConstellation` canvas deferred until in viewport (IntersectionObserver)
- `Recharts` charts animate only when scrolled into view
- `GSAP` and `ScrollTrigger` registered once in a client component
- Image optimization: `next/image` for any future image assets
- Fonts: `next/font/google` for Inter and JetBrains Mono (subset, swap)
- `frameloop="demand"` on Three.js canvas when `prefers-reduced-motion` is set

---

## 13. Accessibility

- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`
- All interactive elements keyboard-focusable with visible focus rings
- `aria-label` on icon-only buttons
- Color contrast: all body text meets WCAG AA against dark backgrounds
- `prefers-reduced-motion`: all Framer Motion, GSAP, and Three.js animations disabled/static
- Form: all inputs have associated `<label>` elements
- Skip-to-main-content link at top of document

---

## 14. What Is Not In Scope (v1)

- Backend form submission (no email service, no database)
- CMS or content management
- Authentication
- Portfolio page
- Real chatbot (AI chatbot is a scripted mockup)
- Payment processing
- Analytics integration (placeholder for future)
- Blog or content hub
