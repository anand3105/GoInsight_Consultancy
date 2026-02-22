"use client";

import { motion } from "framer-motion";
import { Brain, AlertTriangle, MessageSquare } from "lucide-react";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { aiInsights, aiBottomStats } from "@/data/roi-data";

const icons = [Brain, AlertTriangle, MessageSquare];

export default function AIInsightsSection() {
  return (
    <section className="relative py-10 md:py-14 bg-brand-primary overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-60 h-60 bg-brand-yellow/[0.05] rounded-full blur-3xl pointer-events-none" />

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
              AI-Powered Intelligence
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            AI-Powered Insights Engine
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {aiInsights.map((insight, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={insight.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-yellow/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{insight.title}</h3>
                </div>
                <p className="text-white/40 text-xs leading-relaxed mb-4">{insight.description}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold text-brand-yellow leading-none">{insight.stat}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{insight.statLabel}</div>
                  </div>
                  <div className="w-20 h-8">
                    <SparkLineChart data={insight.chartData} height={32} curve="natural" area color="#F7C948" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {aiBottomStats.map((stat) => (
            <div key={stat.label} className="text-center py-2">
              <div className="text-lg md:text-xl font-bold text-white">{stat.value}</div>
              <div className="text-[10px] text-white/30">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
