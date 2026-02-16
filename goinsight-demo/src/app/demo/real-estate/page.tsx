import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import RealEstateContent from "./RealEstateContent";

export const metadata = createPageMetadata({
  title:
    "Real Estate Analytics Solutions India — Property Portfolio Dashboard",
  description:
    "GoInsight's real estate analytics dashboard helps Indian developers and investors track property portfolio, construction progress, occupancy rates, and investment KPIs with Power BI visualizations. Request a free demo.",
  keywords: [
    "real estate analytics",
    "real estate analytics India",
    "property portfolio dashboard",
    "construction analytics",
    "occupancy rate tracking",
    "real estate KPI",
    "real estate Power BI dashboard",
    "property data visualization India",
    "real estate investment analytics",
    "real estate business intelligence",
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
        data={serviceSchema({
          name: "GoInsight Real Estate Analytics Solutions",
          description:
            "Real estate analytics consulting and Power BI dashboard development for property portfolio, construction, and investment insights in India.",
          url: "https://goinsight.in/demo/real-estate",
          serviceType: "Real Estate Analytics Consulting",
        })}
      />
    </>
  );
}
