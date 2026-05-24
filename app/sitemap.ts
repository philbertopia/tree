import type { MetadataRoute } from "next";
import { blogPosts, siteUrl, solutionPages } from "@/lib/seo-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/industries",
    "/industries/local-business-ai",
    "/tools",
    "/training",
    "/blog",
    "/solutions",
    "/newsletter",
    "/llms.txt",
    "/process",
    "/demo/ai-systems-planner",
    "/case-studies/hylander-mobile"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75
    })),
    ...solutionPages.map((solution) => ({
      url: `${siteUrl}/solutions/${solution.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  ];
}
