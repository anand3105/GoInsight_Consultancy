import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schemas";
import SalesMarketingContent from "./SalesMarketingContent";

export const metadata = createPageMetadata({
  title: "Sales & Marketing Analytics Dashboard — Campaign ROI & Pipeline",
  description:
    "Interactive sales & marketing analytics dashboard by GoInsight. Track campaign ROI, sales pipeline, lead conversion, and marketing performance with real-time visualizations.",
  keywords: [
    "sales analytics dashboard",
    "marketing ROI",
    "campaign analytics",
    "sales pipeline dashboard",
    "lead conversion analytics",
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
        data={softwareAppSchema({
          name: "GoInsight Sales & Marketing Analytics Dashboard",
          description:
            "Interactive sales & marketing analytics dashboard with campaign ROI, pipeline, and conversion insights.",
          url: "https://goinsight.in/demo/sales-marketing",
          industry: "Sales & Marketing",
        })}
      />
    </>
  );
}
