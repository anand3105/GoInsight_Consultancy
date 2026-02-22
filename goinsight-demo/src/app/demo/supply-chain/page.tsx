import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import SupplyChainContent from "./SupplyChainContent";

export const metadata = createPageMetadata({
  title:
    "Supply Chain Analytics Solutions — Logistics Dashboard | India, Dubai, UAE, Australia",
  description:
    "GoInsight's supply chain analytics dashboard helps businesses across India, Dubai, UAE, Saudi Arabia & Australia optimize logistics, warehouse metrics with Power BI. Request a free demo.",
  keywords: [
    "supply chain analytics",
    "supply chain analytics India",
    "logistics dashboard",
    "delivery optimization",
    "warehouse analytics",
    "fulfillment tracking",
    "supply chain Power BI dashboard",
    "logistics data visualization India",
    "inventory management analytics",
    "supply chain business intelligence",
    "supply chain analytics Dubai",
    "supply chain analytics UAE",
    "logistics analytics Middle East",
    "supply chain analytics Saudi Arabia",
    "supply chain analytics Australia",
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
        data={serviceSchema({
          name: "GoInsight Supply Chain Analytics Solutions",
          description:
            "Supply chain analytics consulting and Power BI dashboard development for logistics, delivery, and warehouse insights in India.",
          url: "https://goinsight.in/demo/supply-chain",
          serviceType: "Supply Chain Analytics Consulting",
        })}
      />
    </>
  );
}
