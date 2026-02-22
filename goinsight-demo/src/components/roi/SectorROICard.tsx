"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { ArrowRight } from "lucide-react";
import type { SectorROI } from "@/data/roi-data";

interface SectorROICardProps {
  sector: SectorROI;
  index: number;
}

export default function SectorROICard({ sector, index }: SectorROICardProps) {
  const Icon = sector.icon;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-yellow/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-brand-yellow" />
          </div>
          <h3 className="font-semibold text-brand-dark text-xs">{sector.name}</h3>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-brand-dark leading-none">{sector.roi}%</div>
          <div className="text-[9px] text-gray-400 uppercase tracking-wider">ROI</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="space-y-1 mb-3 flex-1">
        {sector.kpis.map((kpi) => (
          <div key={kpi.label} className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{kpi.label}</span>
            <span className={`font-semibold ${kpi.positive ? "text-emerald-600" : "text-red-500"}`}>
              {kpi.trend} {kpi.value}
            </span>
          </div>
        ))}
      </div>

      {/* Sparkline */}
      <div className="h-8 mb-3">
        <SparkLineChart
          data={sector.sparklineData}
          height={32}
          curve="natural"
          area
          color="#F7C948"
        />
      </div>

      {/* Link */}
      <Link
        href={sector.demoLink}
        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-dark hover:text-brand-yellow transition-colors group"
      >
        View Dashboard
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
