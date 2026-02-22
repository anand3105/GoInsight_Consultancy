import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schemas";
import BlogListingContent from "./BlogListingContent";

export const metadata = createPageMetadata({
  title: "Blog — Data Analytics Insights & BI Best Practices",
  description:
    "Expert insights on data analytics, Power BI, Tableau, AI/ML, and dashboard design. Actionable guides for businesses in India, Dubai, UAE, Saudi Arabia & Australia.",
  keywords: [
    "data analytics blog",
    "business intelligence blog",
    "Power BI tips",
    "Tableau tips",
    "analytics insights",
    "dashboard design best practices",
    "AI ML analytics blog",
    "data analytics India blog",
    "analytics consulting blog",
    "BI tool comparison",
  ],
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <BlogListingContent />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Blog", url: "https://goinsight.in/blog" },
        ])}
      />
    </>
  );
}
