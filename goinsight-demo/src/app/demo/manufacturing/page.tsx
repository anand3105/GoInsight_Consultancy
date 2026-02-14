import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schemas";
import ManufacturingContent from "./ManufacturingContent";

export const metadata = createPageMetadata({
  title: "Manufacturing Analytics Dashboard — OEE & Production Insights",
  description:
    "Interactive manufacturing analytics dashboard by GoInsight. Track OEE, production efficiency, quality metrics, and equipment performance with real-time visualizations.",
  keywords: [
    "manufacturing analytics",
    "OEE tracking",
    "production efficiency dashboard",
    "quality metrics dashboard",
    "factory analytics",
  ],
  path: "/demo/manufacturing",
});

export default function ManufacturingDashboard() {
  return (
    <>
      <ManufacturingContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Demos", url: "https://goinsight.in/demo" },
          {
            name: "Manufacturing",
            url: "https://goinsight.in/demo/manufacturing",
          },
        ])}
      />
      <JsonLd
        data={softwareAppSchema({
          name: "GoInsight Manufacturing Analytics Dashboard",
          description:
            "Interactive manufacturing analytics dashboard with OEE, production efficiency, and quality insights.",
          url: "https://goinsight.in/demo/manufacturing",
          industry: "Manufacturing",
        })}
      />
    </>
  );
}
