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
    "GoInsight — Data Analytics Consulting & Business Intelligence Solutions",
  description:
    "GoInsight delivers enterprise analytics consulting, Power BI dashboards, AI/ML solutions, and data visualization. Serving retail, finance, healthcare, manufacturing, and 10+ industries globally. Book a free consultation.",
  keywords: [
    "analytics consulting firm",
    "Power BI consulting India",
    "enterprise dashboard development",
    "data analytics company",
    "business intelligence solutions",
    "predictive analytics consulting",
    "custom dashboard solutions",
    "data-driven decision making",
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
