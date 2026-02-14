"use client";

import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <motion.div
      className="bg-brand-background rounded-xl p-6 border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-brand-dark">Dashboard Preview</h4>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>

      {/* Mock Chart Area */}
      <div className="space-y-4">
        {/* Bar Chart Placeholder */}
        <div className="h-32 bg-brand-light rounded-lg p-4 border border-gray-100">
          <div className="flex items-end justify-between h-full gap-2">
            {[65, 85, 45, 95, 70, 55, 80].map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-brand-primary to-brand-sky rounded-t"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Users", value: "12.4K" },
            { label: "Sessions", value: "48.2K" },
            { label: "Bounce Rate", value: "23.1%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-brand-light rounded-lg p-3 border border-gray-100 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
            >
              <p className="text-xs text-brand-secondary">{stat.label}</p>
              <p className="text-lg font-bold text-brand-dark">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Line Indicator */}
        <div className="h-16 bg-brand-light rounded-lg p-4 border border-gray-100 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 40">
            <motion.path
              d="M 0 30 Q 25 10, 50 20 T 100 15 T 150 25 T 200 10"
              fill="none"
              stroke="#ecc41a"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
            <motion.path
              d="M 0 30 Q 25 10, 50 20 T 100 15 T 150 25 T 200 10 V 40 H 0 Z"
              fill="url(#gradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.5, delay: 2 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ecc41a" />
                <stop offset="100%" stopColor="#ecc41a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
