import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, siteUrl } from "@/lib/seo-content";
import { GlassCard } from "@/components/ui/GlassCard";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Systems Blog",
  description: "Practical guides on supervised AI agents, business automation, dashboards, AI training, and human-reviewed workflows.",
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    title: "TREE AI Systems Blog",
    description: "Practical guides on supervised AI agents, business automation, dashboards, AI training, and human-reviewed workflows.",
    url: "/blog",
    images: ["/images/social/og-image.png"]
  }
};

export default function BlogPage() {
  return (
    <main id="main" className="px-4 pb-20 pt-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "TREE AI Systems Blog",
          description: metadata.description,
          url: `${siteUrl}/blog`
        }}
      />
      <section className="container-shell">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-tree-green/70">AI Systems Blog</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
          Practical AI notes for supervised systems, dashboards, and automation.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          Clear, evergreen guides for owners and teams who want useful AI systems without losing human control.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <GlassCard className="flex h-full flex-col hover:-translate-y-1 hover:border-tree-green/40">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-tree-green/70">{post.category}</p>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-white group-hover:text-tree-green">{post.title}</h2>
                <p className="mt-4 flex-1 leading-7 text-gray-400">{post.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-gray-500">
                  <span>{post.readingTime}</span>
                  <span className="inline-flex items-center gap-2 font-bold text-tree-green">
                    Read
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
