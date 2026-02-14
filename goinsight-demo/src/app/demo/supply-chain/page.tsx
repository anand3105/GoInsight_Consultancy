import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schemas";
import SupplyChainContent from "./SupplyChainContent";

export const metadata = createPageMetadata({
  title: "Supply Chain Analytics Dashboard — Logistics & Delivery Tracking",
  description:
    "Interactive supply chain analytics dashboard by GoInsight. Track logistics, delivery optimization, warehouse metrics, and fulfillment KPIs with real-time visualizations.",
  keywords: [
    "supply chain analytics",
    "logistics dashboard",
    "delivery optimization",
    "warehouse analytics",
    "fulfillment tracking",
  ],
  path: "/demo/supply-chain",
});

export default function SupplyChainDashboard() {
  return (
    <>
      <SupplyChainContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Demos", url: "https://goinsight.in/demo" },
          {
            name: "Supply Chain",
            url: "https://goinsight.in/demo/supply-chain",
          },
        ])}
      />
      <JsonLd
        data={softwareAppSchema({
          name: "GoInsight Supply Chain Analytics Dashboard",
          description:
            "Interactive supply chain analytics dashboard with logistics, delivery, and warehouse insights.",
          url: "https://goinsight.in/demo/supply-chain",
          industry: "Supply Chain & Logistics",
        })}
      />
    </>
  );
}
