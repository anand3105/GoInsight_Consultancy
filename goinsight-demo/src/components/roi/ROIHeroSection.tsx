"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { heroStats } from "@/data/roi-data";

export default function ROIHeroSection() {
  return (
    <section className="relative bg-brand-primary overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-yellow/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-yellow/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full text-brand-yellow text-sm font-medium">
            <Award className="w-4 h-4" />
            2025 ROI Analytics Report
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The ROI of{" "}
          <span className="text-brand-yellow">Data-Driven</span>{" "}
          Decisions
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/60 text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Insights from 100+ enterprise analytics engagements across 8 industries.
          See how data-driven organizations outperform their peers.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
          {heroStats.map((stat, index) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              duration={2 + index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
