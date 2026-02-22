"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { roiGrowthData, overviewStats } from "@/data/roi-data";

export default function CrossIndustryOverview() {
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
              Cross-Industry Performance
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">
            Cumulative ROI Growth
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto mb-2" />
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Average ROI across all GoInsight client engagements, reaching 347% in 2025.
          </p>
        </motion.div>

        {/* Chart + Stats side by side on desktop */}
        <div className="grid lg:grid-cols-3 gap-4">
          <motion.div
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={roiGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F7C948" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F7C948" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F1B2D", border: "none", borderRadius: "8px", color: "#fff", fontSize: "12px" }}
                  formatter={(value) => [`${value}%`, "Average ROI"]}
                  labelStyle={{ color: "#F7C948" }}
                />
                <Area type="monotone" dataKey="roi" stroke="#F7C948" strokeWidth={2.5} fill="url(#roiGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid grid-cols-1 gap-3">
            {overviewStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 + index * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-2xl font-bold text-brand-dark">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-700">{stat.label}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
