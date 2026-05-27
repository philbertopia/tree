import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getBlogPost, getSolutionPage, siteUrl, solutionPages } from "@/lib/seo-content";
import { GlassCard } from "@/components/ui/GlassCard";
import { FaqBlock } from "@/components/seo/FaqBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ConversionCTA } from "@/components/seo/ConversionCTA";

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return solutionPages.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionPage(slug);
  if (!solution) return {};

  return {
    title: solution.title,
    description: solution.description,
    alternates: {
      canonical: `/solutions/${solution.slug}`
    },
    openGraph: {
      title: solution.title,
      description: solution.description,
      url: `/solutions/${solution.slug}`,
      images: ["/images/social/og-image.png"]
    }
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionPage(slug);
  if (!solution) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.description,
    provider: {
      "@type": "ProfessionalService",
      name: "TREE Systems",
      url: siteUrl
    },
    areaServed: "United States",
    serviceType: solution.title,
    url: `${siteUrl}/solutions/${solution.slug}`
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solution.faqs.map((faq) => ({
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
      <JsonLd data={[serviceSchema, faqSchema]} />
      <section className="container-shell max-w-5xl">
        <Breadcrumbs items={[{ label: "Solutions", href: "/solutions" }, { label: solution.title, href: `/solutions/${solution.slug}` }]} />
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">{solution.eyebrow}</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">{solution.title}</h1>
        <p className="mt-8 max-w-3xl rounded-xl border border-tree-green/20 bg-tree-green/10 p-5 text-lg leading-8 text-gray-100">{solution.answer}</p>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <GlassCard>
            <h2 className="text-2xl font-black text-white">What this system creates</h2>
            <ul className="mt-5 space-y-3">
              {solution.outcomes.map((item) => (
                <li key={item} className="leading-7 text-gray-400">
                  <span className="mr-2 text-tree-green">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard tone="violet">
            <h2 className="text-2xl font-black text-white">Build path</h2>
            <ol className="mt-5 space-y-3">
              {solution.workflow.map((item, index) => (
                <li key={item} className="flex gap-3 leading-7 text-gray-400">
                  <span className="font-black text-tree-green">{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </GlassCard>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Checklist title="When this fits" items={solution.fits} />
          <Checklist title="When this does not fit" items={solution.doesNotFit} />
        </div>

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-black text-white">FAQ</h2>
          <FaqBlock faqs={solution.faqs} />
        </section>

        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-black text-white">Related guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {solution.relatedPosts.map((slug) => {
              const post = getBlogPost(slug);
              if (!post) return null;
              return (
                <Link key={slug} href={`/blog/${slug}`} className="group block">
                  <GlassCard className="h-full hover:-translate-y-1 hover:border-tree-green/40">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-tree-green/70">{post.category}</p>
                    <h3 className="mt-3 text-xl font-black text-white group-hover:text-tree-green">{post.title}</h3>
                    <p className="mt-3 leading-7 text-gray-400">{post.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-tree-green">
                      Read guide
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="mt-12">
          <ConversionCTA
            title="Map this to your business"
            description="TREE can help decide where the workflow should start, where human review belongs, and what the smallest useful version should include."
            cta={solution.slug === "ai-dashboard-systems" ? "Build a dashboard" : solution.slug === "ai-training-for-teams" ? "Educate my team" : solution.slug === "human-review-ai-workflows" ? "Review my AI setup" : "Map my first automation"}
          />
        </div>
      </section>
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
