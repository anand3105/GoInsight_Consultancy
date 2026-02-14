import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schemas";
import RetailContent from "./RetailContent";

export const metadata = createPageMetadata({
  title: "Retail Analytics Dashboard — Sales & Inventory Insights",
  description:
    "Interactive retail analytics dashboard by GoInsight. Track sales performance, inventory turnover, store KPIs, and customer behavior with real-time Power BI visualizations.",
  keywords: [
    "retail analytics dashboard",
    "store performance analytics",
    "retail KPI",
    "inventory analytics",
    "sales performance dashboard",
  ],
  path: "/demo/retail",
});

export default function RetailDashboard() {
  return (
    <>
      <RetailContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Demos", url: "https://goinsight.in/demo" },
          { name: "Retail", url: "https://goinsight.in/demo/retail" },
        ])}
      />
      <JsonLd
        data={softwareAppSchema({
          name: "GoInsight Retail Analytics Dashboard",
          description:
            "Interactive retail analytics dashboard with sales, inventory, and store performance insights.",
          url: "https://goinsight.in/demo/retail",
          industry: "Retail",
        })}
      />
    </>
  );
}
