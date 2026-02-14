import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schemas";
import FinanceContent from "./FinanceContent";

export const metadata = createPageMetadata({
  title: "Finance Analytics Dashboard — Financial KPI & Risk Insights",
  description:
    "Interactive finance analytics dashboard by GoInsight. Monitor financial KPIs, risk metrics, revenue trends, and portfolio performance with real-time visualizations.",
  keywords: [
    "finance analytics dashboard",
    "financial reporting dashboard",
    "CFO dashboard",
    "financial KPI tracking",
    "risk analytics",
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
        data={softwareAppSchema({
          name: "GoInsight Finance Analytics Dashboard",
          description:
            "Interactive finance analytics dashboard with KPI tracking, risk metrics, and revenue insights.",
          url: "https://goinsight.in/demo/finance",
          industry: "Finance",
        })}
      />
    </>
  );
}
