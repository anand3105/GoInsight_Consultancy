import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, breadcrumbSchema } from "@/lib/schemas";
import AboutContent from "./AboutContent";

export const metadata = createPageMetadata({
  title: "About GoInsight — India's Leading Analytics Consultancy",
  description:
    "Founded by Fortune 500 veterans in New Delhi, GoInsight transforms raw data into strategic decisions. 50+ enterprise clients, 100+ projects, 10+ industries served with custom Power BI dashboards and AI/ML solutions across India.",
  keywords: [
    "about GoInsight",
    "analytics consultancy India",
    "data consulting company",
    "data analytics company New Delhi",
    "Fortune 500 analytics experts",
    "Anand Gupta GoInsight founder",
    "Power BI consulting company India",
    "business intelligence firm India",
  ],
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "About", url: "https://goinsight.in/about" },
        ])}
      />
    </>
  );
}
