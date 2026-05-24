import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, newsletterIssues, siteUrl } from "@/lib/seo-content";
import { GlassCard } from "@/components/ui/GlassCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { NewsletterForm } from "@/components/seo/NewsletterForm";

export const metadata: Metadata = {
  title: "TREE Field Notes Newsletter",
  description: "Monthly practical notes on AI systems, workflow ideas, tool changes, risks, and supervised automation.",
  alternates: {
    canonical: "/newsletter"
  }
};

export default function NewsletterPage() {
  return (
    <main id="main" className="px-4 pb-20 pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "TREE Field Notes",
          description: metadata.description,
          url: `${siteUrl}/newsletter`
        }}
      />
      <section className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">TREE Field Notes</p>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Monthly AI systems notes for people building real workflows.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              TREE Field Notes is a practical briefing on supervised AI systems, workflow ideas, tool changes, risks, and human-reviewed automation.
            </p>
          </div>
          <GlassCard>
            <h2 className="text-2xl font-black text-white">Join the list</h2>
            <p className="mt-3 leading-7 text-gray-400">Get practical AI systems notes without hype or daily noise.</p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </GlassCard>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {newsletterIssues.map((item) => (
            <GlassCard key={item} className="h-full">
              <p className="text-lg font-bold leading-7 text-white">{item}</p>
            </GlassCard>
          ))}
        </div>

        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-tree-green/70">Start Reading</p>
              <h2 className="mt-3 text-3xl font-black text-white">Recent practical guides</h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-tree-green hover:text-tree-leaf">
              View all guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <GlassCard className="h-full hover:-translate-y-1 hover:border-tree-green/40">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-tree-green/70">{post.category}</p>
                  <h3 className="mt-4 text-xl font-black text-white group-hover:text-tree-green">{post.title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">{post.description}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
