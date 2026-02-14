import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schemas";
import HealthcareContent from "./HealthcareContent";

export const metadata = createPageMetadata({
  title: "Healthcare Analytics Dashboard — Patient & Operations Insights",
  description:
    "Interactive healthcare analytics dashboard by GoInsight. Track patient outcomes, hospital operations, bed occupancy, and clinical KPIs with real-time visualizations.",
  keywords: [
    "healthcare analytics dashboard",
    "hospital performance",
    "patient analytics",
    "clinical KPI dashboard",
    "health operations analytics",
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
        data={softwareAppSchema({
          name: "GoInsight Healthcare Analytics Dashboard",
          description:
            "Interactive healthcare analytics dashboard with patient outcomes, operations, and clinical KPI insights.",
          url: "https://goinsight.in/demo/healthcare",
          industry: "Healthcare",
        })}
      />
    </>
  );
}
