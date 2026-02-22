"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Rocket,
  Brain,
  Zap,
  Globe2,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";

const growthData = [
  { year: "2022", goinsight: 10, industry: 45 },
  { year: "2023", goinsight: 38, industry: 50 },
  { year: "2024", goinsight: 72, industry: 55 },
  { year: "2025", goinsight: 91, industry: 58 },
  { year: "2026", goinsight: 97, industry: 60 },
];

const capabilityData = [
  { subject: "AI/ML", goinsight: 95, competitors: 60 },
  { subject: "Real-Time", goinsight: 98, competitors: 45 },
  { subject: "Speed", goinsight: 92, competitors: 55 },
  { subject: "Accuracy", goinsight: 97, competitors: 65 },
  { subject: "Innovation", goinsight: 96, competitors: 50 },
  { subject: "Support", goinsight: 94, competitors: 58 },
];

const highlights = [
  { icon: Brain, title: "AI-First Analytics", stat: "50+", statLabel: "ML Models" },
  { icon: Clock, title: "Real-Time Intelligence", stat: "<2s", statLabel: "Refresh" },
  { icon: Sparkles, title: "Gen-AI Reports", stat: "1000+", statLabel: "Daily Insights" },
  { icon: Globe2, title: "India-Born, Global-Ready", stat: "20+", statLabel: "Industries" },
];

export default function WhyGoInsight() {
  return (
    <section className="relative py-12 md:py-16 bg-brand-primary overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-72 h-72 bg-brand-yellow/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header — compact */}
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
              The Future of Analytics
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            The Youngest Team Building the{" "}
            <span className="text-brand-yellow">World&apos;s #1</span>{" "}
            Analytics Consultancy
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto mb-2" />
          <p className="text-white/50 max-w-2xl mx-auto text-sm">
            Our AI-native team is redefining analytics consulting — real-time, intelligent,
            and built for the future.
          </p>
        </motion.div>

        {/* Charts + Highlights — single compact row on desktop */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          {/* Growth Chart */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-yellow/10 flex items-center justify-center">
                <Rocket className="w-3.5 h-3.5 text-brand-yellow" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-xs">Growth Trajectory</h3>
                <p className="text-white/30 text-[10px]">GoInsight vs Industry Avg</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={growthData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="goinsightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F7C948" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F7C948" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="industryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a2332", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "11px" }}
                  labelStyle={{ color: "#F7C948" }}
                />
                <Area type="monotone" dataKey="industry" stroke="#6b7280" strokeWidth={1.5} fill="url(#industryGrad)" name="Industry Avg" />
                <Area type="monotone" dataKey="goinsight" stroke="#F7C948" strokeWidth={2} fill="url(#goinsightGrad)" name="GoInsight" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-1 text-[10px] text-white/30">
              <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-brand-yellow rounded" /> GoInsight</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-gray-500 rounded" /> Industry</span>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-yellow/10 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-brand-yellow" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-xs">Capability Edge</h3>
                <p className="text-white/30 text-[10px]">vs Traditional Consultancies</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={capabilityData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 9 }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar name="Competitors" dataKey="competitors" stroke="#6b7280" fill="#6b7280" fillOpacity={0.12} strokeWidth={1} />
                <Radar name="GoInsight" dataKey="goinsight" stroke="#F7C948" fill="#F7C948" fillOpacity={0.18} strokeWidth={2} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a2332", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", fontSize: "11px" }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-1 text-[10px] text-white/30">
              <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-brand-yellow rounded" /> GoInsight</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-gray-500 rounded" /> Others</span>
            </div>
          </motion.div>

          {/* Highlight Stats — vertical stack in 3rd col */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3.5 flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-brand-yellow/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-brand-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-xs">{item.title}</h3>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-brand-yellow leading-tight">{item.stat}</span>
                    <span className="text-white/25 text-[10px]">{item.statLabel}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Banner — slim */}
        <motion.div
          className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 text-center md:text-left">
            <Zap className="w-5 h-5 text-brand-yellow flex-shrink-0 hidden md:block" />
            <p className="text-white text-sm md:text-base font-medium">
              By 2027, GoInsight will be the world&apos;s most trusted analytics partner —{" "}
              <span className="text-brand-yellow font-semibold">powered by AI, driven by data.</span>
            </p>
          </div>
          <Link
            href="/roi-analytics"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-brand-yellow text-brand-dark font-semibold text-sm rounded-xl shadow-lg shadow-brand-yellow/20 hover:bg-yellow-400 transition-all flex-shrink-0"
          >
            See ROI Impact
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
