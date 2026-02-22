import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import SalesMarketingContent from "./SalesMarketingContent";

export const metadata = createPageMetadata({
  title:
    "Sales & Marketing Analytics — Campaign ROI Dashboard | India, Dubai, UAE, Australia",
  description:
    "GoInsight's sales & marketing analytics dashboard helps businesses across India, Dubai, UAE, Saudi Arabia & Australia track campaign ROI, sales pipeline with Power BI. Request a free demo.",
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
    "sales analytics Dubai",
    "sales analytics UAE",
    "marketing analytics Middle East",
    "sales analytics Saudi Arabia",
    "sales analytics Australia",
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
