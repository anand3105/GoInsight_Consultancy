"use client";

import { Filter, RefreshCw, Download, Share2 } from "lucide-react";
import DemoFeatureTooltip from "./DemoFeatureTooltip";

interface DemoToolbarProps {
  periodLabel: string;
  accentColor?: string;
  isDark?: boolean;
}

const toolbarItems = [
  {
    id: "filters",
    icon: Filter,
    label: "Filters",
    tooltipTitle: "Advanced Filters",
    tooltipDescription: "Apply multi-dimensional filters across all visualizations. Filter by date range, categories, regions, and custom dimensions.",
    showLabel: true,
    variant: "default",
  },
  {
    id: "refresh",
    icon: RefreshCw,
    label: "Refresh",
    tooltipTitle: "Refresh Data",
    tooltipDescription: "Manually refresh dashboard data from connected sources. Configure auto-refresh intervals in settings.",
    showLabel: false,
    variant: "default",
  },
  {
    id: "export",
    icon: Download,
    label: "Export",
    tooltipTitle: "Export Options",
    tooltipDescription: "Export data and visualizations in multiple formats: Excel, CSV, PDF, PowerPoint. Schedule automated exports.",
    showLabel: true,
    variant: "default",
  },
  {
    id: "share",
    icon: Share2,
    label: "Share",
    tooltipTitle: "Share & Collaborate",
    tooltipDescription: "Share dashboards with team members, create public links, embed reports, and schedule email distributions.",
    showLabel: true,
    variant: "primary",
  },
];

export default function DemoToolbar({ periodLabel, accentColor = "purple", isDark = false }: DemoToolbarProps) {
  const colorMap: Record<string, { gradient: string; text: string; primaryBtn: string }> = {
    purple: {
      gradient: "from-purple-600 to-purple-700",
      text: "text-purple-600",
      primaryBtn: "bg-white text-purple-600 hover:bg-gray-100",
    },
    blue: {
      gradient: "from-blue-600 to-blue-700",
      text: "text-blue-600",
      primaryBtn: "bg-white text-blue-600 hover:bg-gray-100",
    },
    green: {
      gradient: "from-green-600 to-green-700",
      text: "text-green-600",
      primaryBtn: "bg-white text-green-600 hover:bg-gray-100",
    },
    red: {
      gradient: "from-red-500 to-red-600",
      text: "text-red-600",
      primaryBtn: "bg-white text-red-600 hover:bg-gray-100",
    },
    teal: {
      gradient: "from-teal-600 to-teal-700",
      text: "text-teal-600",
      primaryBtn: "bg-white text-teal-600 hover:bg-gray-100",
    },
    orange: {
      gradient: "from-orange-500 to-orange-600",
      text: "text-orange-600",
      primaryBtn: "bg-white text-orange-600 hover:bg-gray-100",
    },
    pink: {
      gradient: "from-pink-500 to-pink-600",
      text: "text-pink-600",
      primaryBtn: "bg-white text-pink-600 hover:bg-gray-100",
    },
    indigo: {
      gradient: "from-indigo-600 to-indigo-700",
      text: "text-indigo-600",
      primaryBtn: "bg-white text-indigo-600 hover:bg-gray-100",
    },
    brand: {
      gradient: "from-brand-primary to-brand-dark",
      text: "text-brand-primary",
      primaryBtn: "bg-white text-brand-primary hover:bg-gray-100",
    },
  };

  const colors = colorMap[accentColor] || colorMap.brand;

  return (
    <div className="flex items-center gap-3">
      {/* Period Label */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
        {periodLabel}
      </div>

      {/* Toolbar Buttons */}
      {toolbarItems.map((item) => (
        <DemoFeatureTooltip
          key={item.id}
          title={item.tooltipTitle}
          description={item.tooltipDescription}
          position="bottom"
          isDark={false}
        >
          <button
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors cursor-default ${
              item.variant === "primary"
                ? `${colors.primaryBtn} font-semibold`
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.showLabel && item.label}
          </button>
        </DemoFeatureTooltip>
      ))}
    </div>
  );
}
