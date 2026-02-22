"use client";

import { motion } from "framer-motion";
import { beforeAfterData } from "@/data/roi-data";

function AnimatedBar({ percent, color, delay }: { percent: number; color: string; delay: number }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section className="py-10 md:py-14 bg-[#FFFBF5]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">
              Transformation Impact
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">
            Before vs After GoInsight
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Headers */}
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
              <h3 className="font-semibold text-gray-400 text-xs uppercase tracking-wider">Before</h3>
            </div>
            <div className="bg-brand-yellow/5 px-4 py-2.5 border-b border-gray-100">
              <h3 className="font-semibold text-brand-yellow text-xs uppercase tracking-wider">After GoInsight</h3>
            </div>

            {beforeAfterData.map((row, index) => (
              <motion.div
                key={row.metric}
                className="contents"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={`px-4 py-3 ${index < beforeAfterData.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">{row.metric}</div>
                  <div className="text-sm font-semibold text-gray-700 mb-1.5">{row.before}</div>
                  <AnimatedBar percent={row.beforePercent} color="bg-gray-300" delay={0.1 + index * 0.06} />
                </div>
                <div className={`px-4 py-3 bg-brand-yellow/[0.02] ${index < beforeAfterData.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">{row.metric}</div>
                  <div className="text-sm font-semibold text-brand-dark mb-1.5">{row.after}</div>
                  <AnimatedBar percent={row.afterPercent} color="bg-brand-yellow" delay={0.2 + index * 0.06} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
