import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schemas";
import EducationContent from "./EducationContent";

export const metadata = createPageMetadata({
  title: "Education Analytics Dashboard — Student Performance Insights",
  description:
    "Interactive education analytics dashboard by GoInsight. Track student performance, enrollment trends, institutional KPIs, and academic outcomes with real-time visualizations.",
  keywords: [
    "education analytics dashboard",
    "student tracking",
    "institutional analytics",
    "academic performance dashboard",
    "enrollment analytics",
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
        data={softwareAppSchema({
          name: "GoInsight Education Analytics Dashboard",
          description:
            "Interactive education analytics dashboard with student performance, enrollment, and institutional insights.",
          url: "https://goinsight.in/demo/education",
          industry: "Education",
        })}
      />
    </>
  );
}
