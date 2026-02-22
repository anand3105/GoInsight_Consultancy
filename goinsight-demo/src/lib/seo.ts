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
  // Brand
  "GoInsight",
  "GoInsight Consultancy",
  // Core services
  "analytics consulting",
  "data analytics",
  "business intelligence",
  "Power BI dashboard",
  "Power BI consulting",
  "data visualization",
  "AI ML solutions",
  "data-driven decisions",
  "custom dashboard development",
  "Tableau consulting",
  // India
  "analytics consulting India",
  "data analytics company India",
  "data analytics consulting India",
  "business intelligence consulting India",
  "Power BI consulting India",
  "data visualization services India",
  "dashboard development services India",
  "Tableau consulting India",
  // UAE / Dubai / Abu Dhabi
  "data analytics consulting Dubai",
  "data analytics company UAE",
  "Power BI consulting Dubai",
  "business intelligence consulting Dubai",
  "analytics consulting Abu Dhabi",
  "dashboard development Dubai",
  // Middle East / MENA / Saudi Arabia
  "data analytics consulting Saudi Arabia",
  "business intelligence consulting Middle East",
  "Power BI consulting Saudi Arabia",
  "analytics consulting MENA",
  // Australia
  "data analytics consulting Australia",
  "Power BI consulting Australia",
  "data analytics company Sydney",
  "business intelligence consulting Australia",
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
          alt: `${siteConfig.name} — Data Analytics Consulting India, Dubai, UAE, Australia`,
        },
      ],
      locale: "en_IN",
      alternateLocale: ["en_AE", "en_AU", "en_SA"],
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
