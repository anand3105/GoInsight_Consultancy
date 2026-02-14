import type { Metadata } from "next";

export const siteConfig = {
  name: "GoInsight",
  url: "https://goinsight.in",
  description:
    "GoInsight delivers enterprise analytics consulting, Power BI dashboards, AI/ML solutions, and data visualization across 10+ industries globally.",
  founder: "Anand Gupta",
  foundingDate: "2022",
  email: "hello@goinsight.in",
  phone: "+91-7042549224",
  address: {
    streetAddress: "New Delhi",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
  },
  social: {
    twitter: "https://x.com/goinsight_",
    linkedin: "https://www.linkedin.com/company/goinsight/",
    facebook: "https://www.facebook.com/goinsight.in/",
  },
};

const baseKeywords = [
  "analytics consulting",
  "data analytics",
  "business intelligence",
  "Power BI dashboard",
  "data visualization",
  "GoInsight",
  "AI ML solutions",
  "data-driven decisions",
];

export function createPageMetadata({
  title,
  description,
  keywords = [],
  path = "",
  ogType = "website" as const,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  ogType?: "website" | "article";
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const allKeywords = Array.from(new Set([...baseKeywords, ...keywords]));

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Data Analytics Consulting`,
        },
      ],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@goinsight_",
      creator: "@goinsight_",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
