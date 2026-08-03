import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://goinsight.in";
  const today = new Date().toISOString().split("T")[0];

  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: "2026-02-16",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/roi-analytics`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Industry demo pages — SEO-targeted landing pages
    {
      url: `${baseUrl}/demo/retail`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/finance`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/healthcare`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/education`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/manufacturing`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/supply-chain`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/sales-marketing`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/real-estate`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Blog posts — derived from blog-data so the sitemap never drifts
    ...blogPostEntries,
    // Legal pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2025-06-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2025-06-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: "2025-06-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
