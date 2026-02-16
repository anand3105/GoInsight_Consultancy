import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import ManufacturingContent from "./ManufacturingContent";

export const metadata = createPageMetadata({
  title:
    "Manufacturing Analytics Solutions India — OEE & Production Dashboard",
  description:
    "GoInsight's manufacturing analytics dashboard helps Indian manufacturers track OEE, production efficiency, quality metrics, and equipment performance with Power BI visualizations. Request a free demo.",
  keywords: [
    "manufacturing analytics",
    "manufacturing analytics India",
    "OEE tracking",
    "production efficiency dashboard",
    "quality metrics dashboard",
    "factory analytics",
    "manufacturing Power BI dashboard",
    "production data visualization India",
    "plant performance analytics",
    "manufacturing business intelligence",
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
        data={serviceSchema({
          name: "GoInsight Manufacturing Analytics Solutions",
          description:
            "Manufacturing analytics consulting and Power BI dashboard development for OEE, production efficiency, and quality insights in India.",
          url: "https://goinsight.in/demo/manufacturing",
          serviceType: "Manufacturing Analytics Consulting",
        })}
      />
    </>
  );
}
