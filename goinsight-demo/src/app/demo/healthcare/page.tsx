import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import HealthcareContent from "./HealthcareContent";

export const metadata = createPageMetadata({
  title:
    "Healthcare Analytics Solutions India — Patient & Hospital Dashboard",
  description:
    "GoInsight's healthcare analytics dashboard helps Indian hospitals track patient outcomes, bed occupancy, clinical KPIs, and operational efficiency with Power BI visualizations. Request a free demo.",
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
