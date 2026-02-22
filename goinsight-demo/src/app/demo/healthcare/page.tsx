import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import HealthcareContent from "./HealthcareContent";

export const metadata = createPageMetadata({
  title:
    "Healthcare Analytics Solutions — Patient & Hospital Dashboard | India, Dubai, UAE, Australia",
  description:
    "GoInsight's healthcare analytics dashboard helps hospitals across India, Dubai, UAE, Saudi Arabia & Australia track patient outcomes, clinical KPIs, and operational efficiency. Request a free demo.",
  keywords: [
    "healthcare analytics dashboard",
    "healthcare analytics India",
    "hospital performance",
    "patient analytics",
    "clinical KPI dashboard",
    "health operations analytics",
    "healthcare Power BI dashboard",
    "hospital data visualization India",
    "patient outcome analytics",
    "healthcare business intelligence",
    "healthcare analytics Dubai",
    "healthcare analytics UAE",
    "healthcare analytics Saudi Arabia",
    "healthcare analytics Middle East",
    "healthcare analytics Australia",
  ],
  path: "/demo/healthcare",
});

export default function HealthcareDashboard() {
  return (
    <>
      <HealthcareContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Demos", url: "https://goinsight.in/demo" },
          { name: "Healthcare", url: "https://goinsight.in/demo/healthcare" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "GoInsight Healthcare Analytics Solutions",
          description:
            "Healthcare analytics consulting and Power BI dashboard development for patient outcomes, operations, and clinical KPI insights in India.",
          url: "https://goinsight.in/demo/healthcare",
          serviceType: "Healthcare Analytics Consulting",
        })}
      />
    </>
  );
}
