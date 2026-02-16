import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import {
  professionalServiceSchema,
  websiteSchema,
  breadcrumbSchema,
} from "@/lib/schemas";
import HomeContent from "./HomeContent";

export const metadata = createPageMetadata({
  title:
    "GoInsight — Data Analytics Consulting & Business Intelligence Solutions India",
  description:
    "GoInsight is India's leading analytics consulting firm. We deliver Power BI dashboards, AI/ML solutions, and data visualization for retail, finance, healthcare & 10+ industries. Book a free consultation today.",
  keywords: [
    "analytics consulting firm",
    "analytics consulting firm India",
    "Power BI consulting India",
    "enterprise dashboard development",
    "data analytics company",
    "data analytics company India",
    "business intelligence solutions",
    "business intelligence solutions India",
    "predictive analytics consulting",
    "custom dashboard solutions",
    "data-driven decision making",
    "hire data analyst India",
    "analytics company New Delhi",
  ],
  path: "",
});

export default function Home() {
  return (
    <>
      <HomeContent />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
        ])}
      />
    </>
  );
}
