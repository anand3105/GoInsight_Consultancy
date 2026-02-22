"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Brain,
  Zap,
  Target,
  Rocket,
  ArrowRight,
  Activity,
  Cpu,
  LineChart,
} from "lucide-react";

const teamAgeData = [
  { name: "GoInsight", avgAge: 26, fill: "#F7C948" },
  { name: "Big 4", avgAge: 38, fill: "#d1d5db" },
  { name: "Legacy IT", avgAge: 42, fill: "#d1d5db" },
  { name: "Boutique", avgAge: 35, fill: "#d1d5db" },
];

const aiCapabilities = [
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "Our AI models forecast trends 6 months ahead with 94%+ accuracy, giving clients a decisive edge.",
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    icon: Activity,
    title: "Real-Time Dashboards",
    description: "Live data streams processed in under 2 seconds. No stale reports — every decision is based on right-now data.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Cpu,
    title: "Auto-Generated Insights",
    description: "Our Gen-AI engine writes plain-English reports automatically, surfacing 1000+ actionable insights daily.",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: LineChart,
    title: "Anomaly Detection",
    description: "ML-powered monitoring catches data anomalies in under 2 minutes — before they impact your bottom line.",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
];

const visionMilestones = [
  { year: "2025", label: "AI Integration", description: "50+ ML models deployed across client dashboards", done: true },
  { year: "2026", label: "India's #1", description: "Largest analytics consultancy by enterprise clients", done: false },
  { year: "2027", label: "Global Expansion", description: "Offices in 3 countries, serving Fortune 500 clients", done: false },
  { year: "2028", label: "World's #1", description: "Most trusted analytics partner for data-driven enterprises", done: false },
];

export default function VisionAISection() {
  return (
    <>
      {/* AI Capabilities Section */}
      <section className="py-16 md:py-24 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-20 left-0 w-80 h-80 bg-brand-yellow/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-brand-yellow/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/50">
                AI-Native DNA
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The <span className="text-brand-yellow">Youngest & Smartest</span> Team in Analytics
            </h2>
            <div className="w-16 h-1 bg-brand-yellow rounded-full mx-auto mb-4" />
            <p className="text-white/50 max-w-2xl mx-auto">
              Average age 26. Every team member is AI-native. We don&apos;t adapt to new
              technology — we grew up building it.
            </p>
          </motion.div>

          {/* Chart + Cards Layout */}
          <div className="grid lg:grid-cols-5 gap-8 mb-14">
            {/* Bar Chart — Team Age Comparison */}
            <motion.div
              className="lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-brand-yellow/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Team Average Age</h3>
                  <p className="text-white/30 text-[10px]">We&apos;re younger — and faster</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={teamAgeData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} domain={[0, 50]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1a2332", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", fontSize: "12px" }}
                    formatter={(value) => [`${value} years`, "Avg Age"]}
                    labelStyle={{ color: "#F7C948" }}
                  />
                  <Bar dataKey="avgAge" radius={[6, 6, 0, 0]}>
                    {teamAgeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* AI Capability Cards */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {aiCapabilities.map((cap, index) => (
                <motion.div
                  key={cap.title}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cap.color} flex items-center justify-center mb-3`}>
                    <cap.icon className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1.5">{cap.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{cap.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Live Pulse Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { value: "12M+", label: "Data Points / Day" },
              { value: "94.2%", label: "Prediction Accuracy" },
              { value: "<2s", label: "Dashboard Refresh" },
              { value: "24/7", label: "AI Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center py-4 bg-white/[0.03] rounded-xl border border-white/[0.05]">
                <div className="text-xl md:text-2xl font-bold text-brand-yellow">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-white/30 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Roadmap Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-brand-yellow rounded-sm" />
              <span className="text-xs font-semibold tracking-widest text-brand-dark uppercase">
                Our Vision
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Road to{" "}
              <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                World&apos;s #1
              </span>
            </h2>
            <p className="text-brand-secondary max-w-2xl mx-auto">
              A clear, ambitious roadmap — backed by execution speed that legacy firms
              can&apos;t match.
            </p>
          </motion.div>

          {/* Roadmap */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

              {visionMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="relative flex items-start gap-6 mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    milestone.done
                      ? "bg-brand-yellow text-brand-dark"
                      : "bg-white border-2 border-gray-200 text-gray-400"
                  }`}>
                    {milestone.done ? (
                      <Rocket className="w-5 h-5" />
                    ) : (
                      <Target className="w-5 h-5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 rounded-xl p-5 ${
                    milestone.done
                      ? "bg-brand-yellow/5 border border-brand-yellow/20"
                      : "bg-gray-50 border border-gray-100"
                  }`}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-sm font-bold ${milestone.done ? "text-brand-yellow" : "text-gray-400"}`}>
                        {milestone.year}
                      </span>
                      <span className="font-semibold text-brand-dark">{milestone.label}</span>
                      {milestone.done && (
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-brand-yellow text-brand-dark rounded-full">
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-brand-secondary">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/roi-analytics"
              className="group inline-flex items-center gap-2 px-7 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-xl shadow-lg shadow-brand-yellow/20 hover:bg-yellow-400 hover:shadow-brand-yellow/30 hover:shadow-xl transition-all"
            >
              See Our Results in Numbers
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
