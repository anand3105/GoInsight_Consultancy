import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schemas";
import EducationContent from "./EducationContent";

export const metadata = createPageMetadata({
  title:
    "Education Analytics Solutions — Student Performance Dashboard | India, Dubai, UAE, Australia",
  description:
    "GoInsight's education analytics dashboard helps institutions across India, Dubai, UAE, Saudi Arabia & Australia track student performance, enrollment trends with Power BI. Request a free demo.",
  keywords: [
    "education analytics dashboard",
    "education analytics India",
    "student tracking",
    "institutional analytics",
    "academic performance dashboard",
    "enrollment analytics",
    "education Power BI dashboard",
    "student data visualization India",
    "university analytics solution",
    "education business intelligence",
    "education analytics Dubai",
    "education analytics UAE",
    "education analytics Saudi Arabia",
    "education analytics Middle East",
    "education analytics Australia",
  ],
  path: "/demo/education",
});

export default function EducationDashboard() {
  return (
    <>
      <EducationContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Demos", url: "https://goinsight.in/demo" },
          { name: "Education", url: "https://goinsight.in/demo/education" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          name: "GoInsight Education Analytics Solutions",
          description:
            "Education analytics consulting and Power BI dashboard development for student performance, enrollment, and institutional insights in India.",
          url: "https://goinsight.in/demo/education",
          serviceType: "Education Analytics Consulting",
        })}
      />
    </>
  );
}
