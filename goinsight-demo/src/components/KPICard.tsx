"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { KPI } from "@/data/analytics-domains";

interface KPICardProps {
  kpi: KPI;
  index: number;
}

export default function KPICard({ kpi, index }: KPICardProps) {
  return (
    <motion.div
      className="bg-brand-background rounded-xl p-4 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-brand-secondary font-medium">{kpi.label}</p>
          <p className="text-2xl font-bold text-brand-dark mt-1">{kpi.value}</p>
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
            kpi.positive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {kpi.positive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{kpi.change}</span>
        </div>
      </div>
    </motion.div>
  );
}
