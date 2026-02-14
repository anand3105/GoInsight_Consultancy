import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schemas";
import RealEstateContent from "./RealEstateContent";

export const metadata = createPageMetadata({
  title: "Real Estate Analytics Dashboard — Property Portfolio Insights",
  description:
    "Interactive real estate analytics dashboard by GoInsight. Track property portfolio, construction progress, occupancy rates, and investment KPIs with real-time visualizations.",
  keywords: [
    "real estate analytics",
    "property portfolio dashboard",
    "construction analytics",
    "occupancy rate tracking",
    "real estate KPI",
  ],
  path: "/demo/real-estate",
});

export default function RealEstateDashboard() {
  return (
    <>
      <RealEstateContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Demos", url: "https://goinsight.in/demo" },
          {
            name: "Real Estate",
            url: "https://goinsight.in/demo/real-estate",
          },
        ])}
      />
      <JsonLd
        data={softwareAppSchema({
          name: "GoInsight Real Estate Analytics Dashboard",
          description:
            "Interactive real estate analytics dashboard with property portfolio, construction, and investment insights.",
          url: "https://goinsight.in/demo/real-estate",
          industry: "Real Estate",
        })}
      />
    </>
  );
}
