import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://goinsight.in";

  return [
    {
      url: baseUrl,
      lastModified: "2026-02-16",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2026-02-16",
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
      url: `${baseUrl}/demo/retail`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/finance`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/healthcare`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/education`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/manufacturing`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/supply-chain`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/sales-marketing`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/real-estate`,
      lastModified: "2026-02-16",
      changeFrequency: "monthly",
      priority: 0.9,
    },
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
