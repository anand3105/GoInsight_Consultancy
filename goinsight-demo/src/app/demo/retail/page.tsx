import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import RetailContent from "./RetailContent";

export const metadata = createPageMetadata({
  title: "Retail Analytics Solutions India — Sales & Inventory Dashboard",
  description:
    "GoInsight's retail analytics dashboard helps Indian retailers track sales performance, inventory turnover, store KPIs, and customer behavior with Power BI visualizations. Request a free demo.",
  keywords: [
    "retail analytics dashboard",
    "retail analytics India",
    "store performance analytics",
    "retail KPI",
    "inventory analytics",
    "sales performance dashboard",
    "retail Power BI dashboard",
    "retail data visualization India",
    "store analytics solution",
    "retail business intelligence",
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
        data={serviceSchema({
          name: "GoInsight Retail Analytics Solutions",
          description:
            "Retail analytics consulting and Power BI dashboard development for sales, inventory, and store performance insights in India.",
          url: "https://goinsight.in/demo/retail",
          serviceType: "Retail Analytics Consulting",
        })}
      />
    </>
  );
}
