"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, MessageCircleQuestion } from "lucide-react";

const faqs = [
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
    question: "What ROI can I expect from GoInsight\u2019s analytics solutions?",
    answer:
      "Our clients typically see 25\u201340% improvement in operational efficiency, 15\u201330% reduction in costs through data-driven optimization, and 3\u20135x faster reporting cycles. We also offer a dedicated ROI analytics report that quantifies the exact business impact of your analytics investment before you commit.",
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
      "GoInsight offers flexible engagement models \u2014 from project-based consulting starting at competitive rates to dedicated analyst hiring and retainer plans. Pricing depends on scope, complexity, and duration. Contact us for a free consultation and custom quote.",
  },
  {
    question: "Does GoInsight serve clients in Dubai, UAE, Saudi Arabia, and Australia?",
    answer:
      "Yes. GoInsight serves clients across India (Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune), UAE (Dubai, Abu Dhabi, Sharjah), Saudi Arabia (Riyadh, Jeddah), Qatar, Bahrain, Kuwait, Oman across the MENA region, and Australia (Sydney, Melbourne, Brisbane). We deliver both remotely and on-site.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 max-w-6xl mx-auto">
          {/* Left — Sticky heading */}
          <motion.div
            className="lg:w-[300px] lg:flex-shrink-0 lg:sticky lg:top-28 lg:self-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 bg-brand-yellow rounded-sm" />
              <span className="text-[10px] font-semibold tracking-widest text-brand-dark uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3 leading-tight">
              Frequently Asked{" "}
              <span className="underline decoration-brand-yellow decoration-3 underline-offset-4">
                Questions
              </span>
            </h2>
            <p className="text-sm text-brand-secondary leading-relaxed mb-5">
              Everything you need to know about GoInsight&apos;s analytics
              consulting across India, UAE, Middle East &amp; Australia.
            </p>

            <div className="hidden lg:flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-xs text-gray-400">
                <MessageCircleQuestion className="w-4 h-4 text-brand-yellow/60" />
                <span>{faqs.length} questions answered</span>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand-yellow hover:text-yellow-500 transition-colors"
              >
                Still have questions? Contact us
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right — Accordion */}
          <div className="flex-1 space-y-1.5">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-brand-yellow/50 transition-colors"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <h3 className="text-sm font-semibold text-brand-dark pr-3">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-yellow flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-3 text-xs text-brand-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
