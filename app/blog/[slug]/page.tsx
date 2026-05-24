import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { blogPosts, getBlogPost, getSolutionPage, siteUrl } from "@/lib/seo-content";
import { GlassCard } from "@/components/ui/GlassCard";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ConversionCTA } from "@/components/seo/ConversionCTA";
import { NewsletterForm } from "@/components/seo/NewsletterForm";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      images: ["/images/social/og-image.png"]
    }
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const workflowExample = getWorkflowExample(post.category);
  const relatedPosts = blogPosts.filter((related) => related.slug !== post.slug && related.category === post.category).slice(0, 2);
  const fallbackPosts = blogPosts.filter((related) => related.slug !== post.slug && !relatedPosts.includes(related)).slice(0, 2 - relatedPosts.length);
  const visibleRelatedPosts = [...relatedPosts, ...fallbackPosts];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "TREE Systems"
    },
    publisher: {
      "@type": "Organization",
      name: "TREE Systems",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/brand/tree-logo.png`
      }
    },
    mainEntityOfPage: articleUrl
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <main id="main" className="px-4 pb-20 pt-32">
      <JsonLd data={[articleSchema, faqSchema]} />
      <article className="container-shell max-w-4xl">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">{post.category}</p>
        <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">{post.title}</h1>
        <p className="mt-5 text-sm font-semibold text-gray-500">{post.readingTime} / Last updated May 2026</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.68fr_1.32fr]">
          <GlassCard>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/70">In this guide</p>
            <ol className="mt-4 space-y-3">
              {post.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#${slugify(section.heading)}`} className="flex gap-3 text-sm font-semibold text-gray-300 transition hover:text-tree-green">
                    <span className="text-tree-green">{String(index + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </GlassCard>
          <GlassCard className="border-tree-green/20 bg-tree-green/10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/80">Key takeaway</p>
            <p className="mt-3 text-lg leading-8 text-gray-100">{post.answer}</p>
          </GlassCard>
        </div>

        <div className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-28">
              <h2 className="text-2xl font-black text-white">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-gray-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <GlassCard className="mt-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/70">Workflow example</p>
          <h2 className="mt-3 text-2xl font-black text-white">{workflowExample.title}</h2>
          <p className="mt-3 leading-8 text-gray-400">{workflowExample.body}</p>
        </GlassCard>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Checklist title="When this fits" items={post.fits} />
          <Checklist title="When this does not fit" items={post.doesNotFit} />
        </div>

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-black text-white">FAQ</h2>
          <FaqBlock faqs={post.faqs} />
        </section>

        <GlassCard className="mt-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/70">TREE Field Notes</p>
          <h2 className="mt-3 text-2xl font-black text-white">Get practical AI systems notes.</h2>
          <p className="mt-3 leading-7 text-gray-400">Monthly workflow ideas, implementation notes, review habits, and grounded AI updates for businesses.</p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </GlassCard>

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-black text-white">Related TREE solutions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {post.relatedSolutions.map((slug) => {
              const solution = getSolutionPage(slug);
              if (!solution) return null;
              return (
                <Link key={slug} href={`/solutions/${slug}`} className="group block">
                  <GlassCard className="h-full hover:-translate-y-1 hover:border-tree-green/40">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-tree-green/70">{solution.eyebrow}</p>
                    <h3 className="mt-3 text-xl font-black text-white group-hover:text-tree-green">{solution.title}</h3>
                    <p className="mt-3 leading-7 text-gray-400">{solution.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-tree-green">
                      View solution
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-black text-white">Related guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleRelatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                <GlassCard className="h-full hover:-translate-y-1 hover:border-tree-green/40">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-tree-green/70">{related.category}</p>
                  <h3 className="mt-3 text-xl font-black text-white group-hover:text-tree-green">{related.title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{related.description}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        <GlassCard className="mt-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-tree-green/70">Written by TREE Systems</p>
          <h2 className="mt-3 text-2xl font-black text-white">Practical AI implementation, dashboards, automation, and training.</h2>
          <p className="mt-3 leading-7 text-gray-400">TREE writes from implementation work: scoped systems, human review, operational dashboards, training, and business workflows that need to stay understandable.</p>
        </GlassCard>

        <div className="mt-12">
          <ConversionCTA
            title="Want a supervised AI system for your workflow?"
            description="TREE maps the business process first, then builds the smallest useful system with human review built in."
            cta="Map my first automation"
          />
        </div>
      </article>
    </main>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <GlassCard>
      <h2 className="text-xl font-black text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="leading-7 text-gray-400">
            <span className="mr-2 text-tree-green">+</span>
            {item}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getWorkflowExample(category: string) {
  const examples: Record<string, { title: string; body: string }> = {
    "AI Agents": {
      title: "A supervised intake workflow",
      body: "A customer request enters a form, one agent summarizes the need, another prepares a draft response, and the owner approves or edits the output before anything is sent."
    },
    Strategy: {
      title: "A first automation map",
      body: "TREE separates rules-based steps from AI-assisted steps, then designs a small workflow with clear inputs, review points, and a dashboard for visibility."
    },
    Safety: {
      title: "A review queue for risky outputs",
      body: "AI prepares a summary or draft, but money, customer-facing messages, security events, and sensitive decisions wait for a human approval step."
    },
    Dashboards: {
      title: "An owner visibility dashboard",
      body: "Leads, tasks, approvals, risks, and weekly activity are pulled into one view so the owner can see what changed and what needs attention."
    },
    "Small Business": {
      title: "A local business operating rhythm",
      body: "Reviews, QR campaigns, menu updates, customer FAQs, content drafts, and weekly planning tasks move into a calmer owner-approved workflow."
    },
    Training: {
      title: "A system ownership handoff",
      body: "The team learns how to prompt, review, pause, update, and safely extend the workflow so the system becomes useful instead of mysterious."
    }
  };

  return examples[category] ?? examples.Strategy;
}
