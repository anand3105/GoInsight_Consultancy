import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import ROIAnalyticsContent from "./ROIAnalyticsContent";

export const metadata = createPageMetadata({
  title: "ROI Analytics Report 2025 — Data-Driven ROI Across 8 Industries | GoInsight",
  description:
    "Explore GoInsight's 2025 ROI Analytics Report: 347% average ROI, $24M+ revenue generated, 42% cost reduction across retail, finance, healthcare, manufacturing & more. See real results from 100+ enterprise engagements.",
  keywords: [
    "ROI analytics",
    "data analytics ROI",
    "analytics ROI report",
    "business intelligence ROI",
    "Power BI ROI",
    "enterprise analytics ROI India",
    "data-driven decisions ROI",
    "analytics consulting ROI",
    "GoInsight ROI report",
    "industry analytics benchmarks",
  ],
  path: "/roi-analytics",
  ogType: "article",
});

function reportSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    name: "GoInsight ROI Analytics Report 2025",
    description:
      "Comprehensive ROI analysis across 8 industries based on 100+ enterprise analytics engagements by GoInsight.",
    url: `${siteConfig.url}/roi-analytics`,
    datePublished: "2025-01-01",
    dateModified: "2025-12-31",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/Go-Insight-Color_ICON.png`,
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    about: {
      "@type": "Thing",
      name: "Return on Investment in Data Analytics",
    },
  };
}

export default function ROIAnalyticsPage() {
  return (
    <>
      <ROIAnalyticsContent />
      <JsonLd data={reportSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "ROI Analytics Report", url: `${siteConfig.url}/roi-analytics` },
        ])}
      />
    </>
  );
}
