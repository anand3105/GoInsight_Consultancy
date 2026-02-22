"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { benchmarkData } from "@/data/roi-data";

export default function ROIBenchmarksChart() {
  return (
    <section className="py-10 md:py-14 bg-white">
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
              Interactive Benchmarks
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">
            ROI Benchmarks by Industry
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={benchmarkData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="sector" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={45} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0F1B2D", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                formatter={(value, name) => [`${value}%`, name === "industryAvg" ? "Industry Average" : "GoInsight Clients"]}
                labelStyle={{ color: "#F7C948" }}
              />
              <Legend formatter={(value: string) => (value === "industryAvg" ? "Industry Average" : "GoInsight Clients")} wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="industryAvg" fill="#d1d5db" radius={[3, 3, 0, 0]} />
              <Bar dataKey="goinsight" fill="#F7C948" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl px-5 py-4 text-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-sm md:text-base font-semibold text-brand-dark">
            GoInsight clients achieve{" "}
            <span className="text-brand-yellow text-xl font-bold">2.7x</span>{" "}
            the industry average ROI
          </p>
          <p className="text-xs text-gray-500 mt-1">Based on 100+ enterprise engagements</p>
        </motion.div>
      </div>
    </section>
  );
}
