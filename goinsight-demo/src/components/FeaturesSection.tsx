"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Plus } from "lucide-react";

const features = [
  {
    title: "Tailored Analytics Solutions:",
    description: "Customized data analytics for Education, Healthcare, Finance, and Retail industries.",
  },
  {
    title: "Data to Decisions:",
    description: "Transform raw data into actionable insights that drive growth.",
  },
  {
    title: "Comprehensive Services:",
    description: "From cloud migration and data integration to advanced analytics and AI.",
  },
  {
    title: "Data Security Guaranteed:",
    description: "We sign NDAs to ensure your data remains confidential and secure.",
  },
  {
    title: "Business-Focused Approach:",
    description: "Solutions aligned with your goals for data-driven decision-making.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 md:py-14 bg-brand-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Headline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark leading-tight mb-5">
              <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                Supercharge
              </span>
              {" "}Your Business with Tailored Data Analytics Solutions
            </h2>

            {/* What it does label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-brand-dark rounded-sm" />
              <span className="text-xs font-semibold tracking-wider text-brand-dark uppercase">
                What it does
              </span>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-brand-yellow stroke-[3]" />
                  </div>
                  <p className="text-sm text-brand-secondary">
                    <span className="font-semibold text-brand-dark">{feature.title}</span>{" "}
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-5">
              <p className="text-[10px] md:text-xs font-bold text-brand-dark leading-relaxed uppercase tracking-wide">
                GoInsight is a leading analytics consultancy with expertise across various industries, including Education, Healthcare, Finance, and Retail. We specialize in transforming raw data into actionable insights that drive business growth and innovation.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Dashboard Images */}
          <motion.div
            className="relative h-[350px] md:h-[400px] lg:h-[450px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Plus Button Decoration */}
            <motion.div
              className="absolute -top-2 left-[10%] z-10"
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-9 h-9 md:w-11 md:h-11 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg">
                <Plus className="w-5 h-5 md:w-6 md:h-6 text-brand-dark" />
              </div>
            </motion.div>

            {/* Sales ROI Chart - Top Right */}
            <motion.div
              className="absolute top-0 right-0 w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] z-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                <Image
                  src="/Sales_roi_chart.png"
                  alt="Sales and ROI Chart"
                  width={340}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Competitive Market Chart - Middle Left */}
            <motion.div
              className="absolute top-20 sm:top-24 md:top-28 left-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] z-30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                <Image
                  src="/Completitive_marketchart.png"
                  alt="Competitive Market Chart"
                  width={320}
                  height={220}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Competitive Market Report - Bottom Right */}
            <motion.div
              className="absolute bottom-0 right-0 w-[230px] sm:w-[280px] md:w-[320px] lg:w-[360px] z-40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                <Image
                  src="/Completitive_marketreport.png"
                  alt="Competitive Market Report"
                  width={360}
                  height={280}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-16 right-16 w-24 h-24 bg-brand-yellow/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-8 w-28 h-28 bg-brand-sky/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
