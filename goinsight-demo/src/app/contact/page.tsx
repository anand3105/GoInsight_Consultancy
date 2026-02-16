import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schemas";
import ContactContent from "./ContactContent";

const faqs = [
  {
    question: "What services does GoInsight offer?",
    answer:
      "GoInsight provides a range of analytics services, including data visualization, dashboard creation, business intelligence, and corporate training in tools like Power BI. We also offer consultation services, where our experts work directly with your team to deliver tailored analytics solutions.",
  },
  {
    question: "How can GoInsight help my business?",
    answer:
      "We help businesses transform raw data into actionable insights. Our solutions enable better decision-making, identify growth opportunities, optimize operations, and provide a competitive edge through data-driven strategies tailored to your industry.",
  },
  {
    question: "What industries does GoInsight specialize in?",
    answer:
      "GoInsight specializes in multiple industries including Education, Healthcare, Finance, Retail, Manufacturing, and E-commerce. Our team has deep expertise in understanding industry-specific challenges and delivering customized analytics solutions.",
  },
  {
    question: "How does GoInsight ensure data privacy and security?",
    answer:
      "Data privacy and security are our top priorities at GoInsight. We adhere to strict confidentiality protocols and sign Non-Disclosure Agreements (NDAs) with all our clients. Our team follows industry best practices to protect your data, ensuring it remains secure throughout the entire process.",
  },
  {
    question: "How do I get started with GoInsight?",
    answer:
      "Getting started is easy! Simply fill out the contact form above or reach out to us via email or phone. We'll schedule a free consultation to understand your needs, assess your current data infrastructure, and propose a tailored solution.",
  },
  {
    question: "What support do you offer after the service delivery?",
    answer:
      "We provide comprehensive post-delivery support including training sessions for your team, documentation, maintenance packages, and ongoing consultation. Our goal is to ensure you get maximum value from your analytics investment.",
  },
];

export const metadata = createPageMetadata({
  title: "Contact GoInsight — Book a Free Analytics Consultation",
  description:
    "Get in touch with GoInsight for analytics consulting, Power BI development, and AI/ML solutions in India. Free consultation available. Email: hello@goinsight.in | Phone: +91-7042549224 | New Delhi, India.",
  keywords: [
    "contact GoInsight",
    "analytics consultation",
    "Power BI consulting quote",
    "hire analytics consultant",
    "hire analytics consultant India",
    "data analytics inquiry",
    "free analytics consultation",
    "analytics consulting New Delhi",
  ],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactContent />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Contact", url: "https://goinsight.in/contact" },
        ])}
      />
    </>
  );
}
