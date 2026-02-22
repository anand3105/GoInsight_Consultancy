import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import {
  professionalServiceSchema,
  websiteSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schemas";
import HomeContent from "./HomeContent";

export const metadata = createPageMetadata({
  title:
    "GoInsight — Data Analytics Consulting & BI Solutions | India, Dubai, UAE, Australia",
  description:
    "GoInsight delivers data analytics consulting, Power BI dashboards, AI/ML solutions & data visualization across India, Dubai, UAE, Saudi Arabia, MENA & Australia. Serving retail, finance, healthcare & 10+ industries. Book a free consultation.",
  keywords: [
    // Core
    "analytics consulting firm",
    "enterprise dashboard development",
    "predictive analytics consulting",
    "custom dashboard solutions",
    "data-driven decision making",
    "interactive dashboard for business",
    // India
    "analytics consulting firm India",
    "data analytics company India",
    "best data analytics company in India",
    "business intelligence solutions India",
    "BI consulting services India",
    "custom dashboard development company India",
    "dashboard development services India",
    "hire data analyst India",
    "hire data analytics consultant India",
    "analytics company New Delhi",
    // UAE / Dubai / Abu Dhabi
    "data analytics consulting Dubai",
    "data analytics company UAE",
    "best data analytics company Dubai",
    "Power BI consulting Dubai UAE",
    "business intelligence consulting Dubai",
    "analytics consulting Abu Dhabi",
    "dashboard development Dubai",
    "data visualization services Dubai",
    "hire data analyst Dubai UAE",
    "Tableau consulting Dubai",
    "BI consulting services UAE",
    // Middle East / MENA / Saudi Arabia
    "data analytics consulting Saudi Arabia",
    "data analytics company Riyadh",
    "Power BI consulting Saudi Arabia",
    "business intelligence consulting Middle East",
    "data analytics company MENA",
    "dashboard development Middle East",
    "analytics consulting Qatar",
    "analytics consulting Kuwait",
    "analytics consulting Bahrain",
    // Australia
    "data analytics consulting Australia",
    "data analytics company Sydney",
    "data analytics company Melbourne",
    "Power BI consulting Australia",
    "business intelligence consulting Australia",
    "Tableau consulting Australia",
    "dashboard development company Australia",
    "best data analytics company Australia",
    "hire data analyst Australia",
  ],
  path: "",
});

const homeFaqs = [
  {
    question: "What data analytics consulting services does GoInsight offer?",
    answer:
      "GoInsight offers end-to-end analytics consulting including Power BI dashboard development, custom React & Next.js dashboards that embed directly into your platform, AI/ML-powered predictive analytics, data visualization, data warehousing, and BI strategy. We build both standalone analytics portals and embeddable dashboard components tailored to your product. Serving 10+ industries across India, Dubai, UAE, Saudi Arabia, MENA, and Australia.",
  },
  {
    question: "Does GoInsight build AI models for predictive analytics?",
    answer:
      "Yes. GoInsight builds custom AI and machine learning models for demand forecasting, customer churn prediction, anomaly detection, sentiment analysis, and more. We use Python, scikit-learn, TensorFlow, and Azure ML to deliver production-ready predictive models that integrate directly into your Power BI or Tableau dashboards for real-time decision-making.",
  },
  {
    question: "What ROI can I expect from GoInsight's analytics solutions?",
    answer:
      "Our clients typically see 25–40% improvement in operational efficiency, 15–30% reduction in costs through data-driven optimization, and 3–5x faster reporting cycles. We also offer a dedicated ROI analytics report that quantifies the exact business impact of your analytics investment before you commit.",
  },
  {
    question: "Which industries does GoInsight serve?",
    answer:
      "We serve 10+ industries: Retail (sales & inventory analytics), Finance (financial KPI dashboards), Healthcare (patient & operational analytics), Education (student performance), Manufacturing (OEE & production), Supply Chain (logistics optimization), Sales & Marketing (campaign ROI), and Real Estate (market analytics).",
  },
  {
    question: "What tools and technologies does GoInsight use?",
    answer:
      "We specialize in React, Next.js, and Tailwind CSS for building custom embeddable dashboards, alongside Microsoft Power BI and Tableau for enterprise BI. Our tech stack also includes Python, SQL, Azure, AWS, D3.js, Recharts, scikit-learn, and TensorFlow. Whether you need a Power BI report or a fully custom analytics UI embedded in your SaaS product, we deliver both.",
  },
  {
    question: "How much does it cost to hire GoInsight as your analytics partner?",
    answer:
      "GoInsight offers flexible engagement models — from project-based consulting starting at competitive rates to dedicated analyst hiring and retainer plans. Pricing depends on scope, complexity, and duration. Contact us for a free consultation and custom quote.",
  },
  {
    question: "Does GoInsight serve clients in Dubai, UAE, Saudi Arabia, and Australia?",
    answer:
      "Yes. GoInsight serves clients across India (Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune), UAE (Dubai, Abu Dhabi, Sharjah), Saudi Arabia (Riyadh, Jeddah), Qatar, Bahrain, Kuwait, Oman across the MENA region, and Australia (Sydney, Melbourne, Brisbane). We deliver both remotely and on-site.",
  },
];

export default function Home() {
  return (
    <>
      <HomeContent />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
        ])}
      />
      <JsonLd data={faqSchema(homeFaqs)} />
    </>
  );
}
