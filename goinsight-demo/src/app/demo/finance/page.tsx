import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import FinanceContent from "./FinanceContent";

export const metadata = createPageMetadata({
  title: "Finance Analytics Solutions — Financial KPI Dashboard | India, Dubai, UAE, Australia",
  description:
    "GoInsight's finance analytics dashboard helps businesses across India, Dubai, UAE, Saudi Arabia & Australia monitor financial KPIs, risk metrics, and revenue trends with Power BI. Request a free demo.",
  keywords: [
    "finance analytics dashboard",
    "finance analytics India",
    "financial reporting dashboard",
    "CFO dashboard",
    "financial KPI tracking",
    "risk analytics",
    "finance Power BI dashboard",
    "financial data visualization India",
    "revenue analytics solution",
    "financial business intelligence",
    "finance analytics Dubai",
    "finance analytics UAE",
    "financial dashboard Middle East",
    "finance analytics Saudi Arabia",
    "finance analytics Australia",
  ],
  path: "/demo/finance",
});

export default function FinanceDashboard() {
  return (
    <>
      <FinanceContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Demos", url: "https://goinsight.in/demo" },
          { name: "Finance", url: "https://goinsight.in/demo/finance" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "GoInsight Finance Analytics Solutions",
          description:
            "Finance analytics consulting and Power BI dashboard development for KPI tracking, risk metrics, and revenue insights in India.",
          url: "https://goinsight.in/demo/finance",
          serviceType: "Finance Analytics Consulting",
        })}
      />
    </>
  );
}
