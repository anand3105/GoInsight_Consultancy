import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import SalesMarketingContent from "./SalesMarketingContent";

export const metadata = createPageMetadata({
  title:
    "Sales & Marketing Analytics Solutions India — Campaign ROI Dashboard",
  description:
    "GoInsight's sales & marketing analytics dashboard helps Indian businesses track campaign ROI, sales pipeline, lead conversion, and marketing performance with Power BI visualizations. Request a free demo.",
  keywords: [
    "sales analytics dashboard",
    "sales analytics India",
    "marketing ROI",
    "campaign analytics",
    "sales pipeline dashboard",
    "lead conversion analytics",
    "marketing Power BI dashboard",
    "sales data visualization India",
    "digital marketing analytics",
    "sales business intelligence",
  ],
  path: "/demo/sales-marketing",
});

export default function SalesMarketingDashboard() {
  return (
    <>
      <SalesMarketingContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Demos", url: "https://goinsight.in/demo" },
          {
            name: "Sales & Marketing",
            url: "https://goinsight.in/demo/sales-marketing",
          },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "GoInsight Sales & Marketing Analytics Solutions",
          description:
            "Sales & marketing analytics consulting and Power BI dashboard development for campaign ROI, pipeline, and conversion insights in India.",
          url: "https://goinsight.in/demo/sales-marketing",
          serviceType: "Sales & Marketing Analytics Consulting",
        })}
      />
    </>
  );
}
