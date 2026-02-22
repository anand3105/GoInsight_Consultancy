"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, ChevronDown } from "lucide-react";
import { industryOptions, companySizeOptions, roiEstimates } from "@/data/roi-data";

export default function ROICalculatorCTA() {
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");

  const estimate = industry && companySize ? roiEstimates[industry]?.[companySize] : null;

  return (
    <section className="relative py-10 md:py-14 bg-brand-primary overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-5 left-1/4 w-60 h-60 bg-brand-yellow/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/50">
              ROI Estimator
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Estimate Your ROI
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
        </motion.div>

        <motion.div
          className="max-w-md mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-brand-yellow" />
            </div>
            <h3 className="text-sm font-semibold text-white">Quick ROI Calculator</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-white/60 mb-1">Industry</label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full appearance-none bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-yellow/50 transition-colors cursor-pointer"
                >
                  <option value="" className="bg-brand-primary">Select industry</option>
                  {industryOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-brand-primary">{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/60 mb-1">Company Size</label>
              <div className="relative">
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full appearance-none bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-yellow/50 transition-colors cursor-pointer"
                >
                  <option value="" className="bg-brand-primary">Select size</option>
                  {companySizeOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-brand-primary">{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
              </div>
            </div>

            {estimate && (
              <motion.div
                className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-lg p-4 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs text-white/60 mb-1">Estimated ROI Range</div>
                <div className="text-3xl font-bold text-brand-yellow">{estimate.min}% — {estimate.max}%</div>
                <div className="text-[10px] text-white/30 mt-0.5">Based on similar {industry} engagements</div>
              </motion.div>
            )}

            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-brand-yellow text-brand-dark font-semibold text-sm rounded-lg shadow-lg shadow-brand-yellow/20 hover:bg-yellow-400 transition-all"
            >
              Get Your Detailed ROI Report
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
