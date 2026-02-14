import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import CareersContent from "./CareersContent";

export const metadata = createPageMetadata({
  title: "Careers at GoInsight — Join India's Top Analytics Team",
  description:
    "Join GoInsight and work on transformative analytics projects. Open positions in Power BI, data analysis, AI/ML engineering. Remote-friendly roles in New Delhi.",
  keywords: [
    "GoInsight careers",
    "analytics jobs India",
    "Power BI developer jobs",
    "data analyst careers",
    "business intelligence jobs",
  ],
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <CareersContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Careers", url: "https://goinsight.in/careers" },
        ])}
      />
    </>
  );
}
