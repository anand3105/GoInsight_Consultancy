import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, breadcrumbSchema, faqSchema } from "@/lib/schemas";
import AboutContent from "./AboutContent";

export const metadata = createPageMetadata({
  title: "About GoInsight — Analytics Consultancy | India, Dubai, UAE, Australia",
  description:
    "Founded by Fortune 500 veterans, GoInsight transforms raw data into strategic decisions. Serving 50+ clients across India, Dubai, UAE, Saudi Arabia, MENA & Australia with Power BI dashboards and AI/ML solutions.",
  keywords: [
    "about GoInsight",
    "analytics consultancy India",
    "data consulting company",
    "data analytics company New Delhi",
    "Fortune 500 analytics experts",
    "Anand Gupta GoInsight founder",
    "Power BI consulting company India",
    "business intelligence firm India",
    "best data analytics company in India",
    "data analytics consulting India",
    "hire data analytics consultant India",
    // International
    "analytics consultancy Dubai",
    "data analytics company Dubai UAE",
    "analytics consulting company Middle East",
    "data analytics consulting Saudi Arabia",
    "analytics consultancy Australia",
    "data analytics company Sydney Melbourne",
  ],
  path: "/about",
});

const aboutFaqs = [
  {
    question: "Who founded GoInsight and what is the company's background?",
    answer:
      "GoInsight was founded by Anand Gupta, a seasoned analytics professional with extensive experience at Fortune 500 companies including Nokia Networks, Nestl\u00e9, HCL Technologies, Carrier, General Motors, and Amul. The company was established in 2022 in New Delhi, India, with the mission of helping organizations transform raw data into strategic, actionable decisions.",
  },
  {
    question: "What makes GoInsight different from other analytics consulting firms in India?",
    answer:
      "GoInsight stands out through its team of 40+ analytics experts with Fortune 500 backgrounds, delivering enterprise-grade quality at competitive pricing. We offer end-to-end analytics solutions — from strategy and Power BI/Tableau dashboard development to AI/ML implementation and training. With 50+ enterprise clients, 95% retention rate, and expertise across 10+ industries, we bring deep domain knowledge that generic consulting firms can't match.",
  },
  {
    question: "How many clients and projects has GoInsight completed?",
    answer:
      "GoInsight has served 50+ enterprise clients across India and delivered 100+ analytics projects spanning retail, finance, healthcare, education, manufacturing, supply chain, sales & marketing, and real estate sectors. Our team maintains a 95% client retention rate, reflecting the consistent value we deliver.",
  },
];

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
      <JsonLd data={faqSchema(aboutFaqs)} />
    </>
  );
}
