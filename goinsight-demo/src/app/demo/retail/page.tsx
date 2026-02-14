"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import DemoSidebar from "@/components/DemoSidebar";
import { useTheme, getApexChartTheme, chartColors, chartColorArray } from "@/context/ThemeContext";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Brain,
  Lightbulb,
  Download,
  Share2,
  Calendar,
  Filter,
  RefreshCw,
  Info,
  X,
  Lock,
  Sun,
  Moon,
} from "lucide-react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

// MUI Charts
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

// Dynamic import for ApexCharts (client-side only)
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Styled Theme Switch
const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent("#fff")}" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1e293b",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#FFC629",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="${encodeURIComponent("#1a1a2e")}"/><path fill="${encodeURIComponent("#1a1a2e")}" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
  },
}));

// ============== DATA ==============

// Revenue Data
const revenueData = {
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  revenue: [245, 267, 298, 312, 345, 378, 356, 389, 412, 438, 456, 478],
  target: [230, 245, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440],
  lastYear: [210, 225, 248, 265, 290, 310, 325, 342, 358, 375, 390, 405],
};

// Category Sales Data
const categoryData = [
  { id: 0, value: 35, label: "Electronics", color: chartColors.yellow },
  { id: 1, value: 25, label: "Clothing", color: chartColors.blue },
  { id: 2, value: 20, label: "Home & Garden", color: chartColors.green },
  { id: 3, value: 12, label: "Sports", color: chartColors.purple },
  { id: 4, value: 8, label: "Others", color: chartColors.orange },
];

// Store Performance Data
const storePerformance = [
  { store: "Downtown", revenue: 85, traffic: 78, conversion: 92, satisfaction: 88 },
  { store: "Mall Central", revenue: 92, traffic: 85, conversion: 88, satisfaction: 95 },
  { store: "Airport", revenue: 78, traffic: 95, conversion: 72, satisfaction: 82 },
  { store: "Suburb East", revenue: 70, traffic: 65, conversion: 85, satisfaction: 90 },
];

// Hourly Traffic Data
const hourlyTraffic = {
  hours: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"],
  visitors: [120, 180, 250, 320, 280, 240, 290, 350, 420, 380, 290, 180],
  conversions: [12, 22, 35, 45, 38, 30, 40, 52, 58, 48, 35, 20],
};

// Customer Segments Data
const customerSegments = [
  { segment: "VIP", count: 1250, revenue: 45, retention: 95 },
  { segment: "Regular", count: 4500, revenue: 35, retention: 78 },
  { segment: "Occasional", count: 2800, revenue: 15, retention: 45 },
  { segment: "New", count: 1200, revenue: 5, retention: 30 },
];

// Forecast Data
const forecastData = {
  categories: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
  actual: [412, 438, null, null, null, null],
  forecast: [null, 438, 465, 492, 510, 535],
};

// Inventory Health Data
const inventoryForecast = [
  { product: "Electronics", current: 85, predicted: 72, action: "Reorder", daysLeft: 12 },
  { product: "Clothing", current: 92, predicted: 88, action: "Monitor", daysLeft: 25 },
  { product: "Home & Garden", current: 45, predicted: 35, action: "Urgent", daysLeft: 5 },
  { product: "Sports", current: 78, predicted: 70, action: "Reorder", daysLeft: 15 },
];

// Correlation Data (for scatter plot)
const correlationData = [
  { id: "high-traffic", data: [{ x: 450, y: 85, id: 1 }, { x: 520, y: 92, id: 2 }, { x: 380, y: 78, id: 3 }] },
  { id: "low-traffic", data: [{ x: 180, y: 45, id: 4 }, { x: 220, y: 52, id: 5 }, { x: 150, y: 38, id: 6 }] },
];

// KPI Sparkline Data
const kpiSparklines = {
  revenue: [65, 72, 68, 85, 78, 92, 88, 95, 102, 98, 110, 118],
  orders: [120, 135, 128, 145, 152, 168, 175, 182, 195, 188, 205, 218],
  avgOrder: [320, 325, 318, 335, 342, 358, 365, 372, 385, 378, 395, 408],
  customers: [850, 920, 890, 980, 1050, 1120, 1180, 1250, 1320, 1280, 1380, 1450],
};

// ============== COMPONENTS ==============

// Toolbar Tooltip Component with Portal
const ToolbarTooltip = ({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [portalMounted, setPortalMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPortalMounted(true);
    return () => setPortalMounted(false);
  }, []);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 256;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth - 10) left = window.innerWidth - tooltipWidth - 10;
    setPosition({ top: rect.bottom + 8, left });
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, 400);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-[9999]"
          style={{ top: position.top, left: position.left }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-64 p-3 rounded-xl shadow-2xl bg-white border border-gray-200">
            <div className="flex items-start gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-brand-yellow/20">
                <Lock className="w-3.5 h-3.5 text-brand-dark" />
              </div>
              <h4 className="font-semibold text-sm text-brand-dark">{title}</h4>
            </div>
            <p className="text-xs leading-relaxed text-gray-600 mb-2">{description}</p>
            <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              <span className="text-xs font-medium text-brand-dark">Available in Custom Reports</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {portalMounted && createPortal(tooltipContent, document.body)}
    </>
  );
};

// Info Button Component
const ChartInfoButton = ({
  title,
  description,
  howToRead,
  dataSource,
  isDark,
}: {
  title: string;
  description: string;
  howToRead: string[];
  dataSource: string;
  isDark: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
          isDark
            ? "bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
        }`}
        title="Chart Information"
      >
        <Info className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop - closes modal on click */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsOpen(false)}
            />
            {/* Modal */}
            <motion.div
              className={`relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl p-6 shadow-2xl ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isDark ? "bg-brand-yellow/20" : "bg-brand-yellow/10"
                  }`}>
                    <Info className="w-5 h-5 text-brand-yellow" />
                  </div>
                  <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-brand-dark"}`}>
                    {title}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* What This Shows */}
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    What This Chart Shows
                  </h4>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {description}
                  </p>
                </div>

                {/* How to Read */}
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    How to Read This Chart
                  </h4>
                  <ul className="space-y-2">
                    {howToRead.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5 ${
                          isDark ? "bg-brand-yellow/20 text-brand-yellow" : "bg-brand-yellow/10 text-brand-yellow"
                        }`}>
                          {index + 1}
                        </span>
                        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Data Source */}
                <div className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                  <h4 className={`text-xs font-semibold mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    DATA SOURCE
                  </h4>
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {dataSource}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Chart Card Wrapper
const ChartCard = ({
  title,
  subtitle,
  infoTitle,
  infoDescription,
  infoHowToRead,
  infoDataSource,
  children,
  isDark,
  className = "",
}: {
  title: string;
  subtitle?: string;
  infoTitle: string;
  infoDescription: string;
  infoHowToRead: string[];
  infoDataSource: string;
  children: React.ReactNode;
  isDark: boolean;
  className?: string;
}) => (
  <div className={`rounded-2xl p-6 shadow-sm border ${
    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
  } ${className}`}>
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>{title}</h3>
        {subtitle && (
          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>
        )}
      </div>
      <ChartInfoButton
        title={infoTitle}
        description={infoDescription}
        howToRead={infoHowToRead}
        dataSource={infoDataSource}
        isDark={isDark}
      />
    </div>
    {children}
  </div>
);

// KPI Card Component
const KPICard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  sparklineData,
  isDark,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: any;
  sparklineData: number[];
  isDark: boolean;
}) => (
  <motion.div
    className={`rounded-2xl p-5 shadow-sm border transition-all ${
      isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        isDark ? "bg-brand-yellow/20" : "bg-brand-yellow/10"
      }`}>
        <Icon className="w-6 h-6 text-brand-yellow" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${
        changeType === "positive" ? "text-green-500" : "text-red-500"
      }`}>
        {changeType === "positive" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>{title}</p>
    <p className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-brand-dark"}`}>{value}</p>
    <div className="h-10">
      <SparkLineChart
        data={sparklineData}
        height={40}
        curve="natural"
        area
        color={changeType === "positive" ? chartColors.green : chartColors.red}
        sx={{
          '.MuiAreaElement-root': {
            fillOpacity: 0.2,
          },
        }}
      />
    </div>
  </motion.div>
);

// Section Header Component
const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  color,
  isDark,
}: {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  isDark: boolean;
}) => (
  <div className="flex items-center gap-4 mb-6">
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon className="w-6 h-6" style={{ color }} />
    </div>
    <div>
      <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>{title}</h2>
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>{subtitle}</p>
    </div>
  </div>
);

// Recommendation Card Component
const RecommendationCard = ({
  priority,
  title,
  description,
  impact,
  icon: Icon,
  isDark,
}: {
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  icon: any;
  isDark: boolean;
}) => {
  const priorityColors = {
    high: { bg: isDark ? "bg-red-900/30" : "bg-red-50", text: "text-red-500", badge: isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600" },
    medium: { bg: isDark ? "bg-yellow-900/30" : "bg-yellow-50", text: "text-yellow-500", badge: isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600" },
    low: { bg: isDark ? "bg-blue-900/30" : "bg-blue-50", text: "text-blue-500", badge: isDark ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600" },
  };

  return (
    <motion.div
      className={`p-4 rounded-xl border transition-all ${
        isDark ? "bg-gray-800 border-gray-700 hover:border-gray-600" : "bg-white border-gray-100 hover:border-gray-200"
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${priorityColors[priority].bg}`}>
          <Icon className={`w-5 h-5 ${priorityColors[priority].text}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[priority].badge}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </span>
          </div>
          <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-brand-dark"}`}>{title}</h4>
          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>{description}</p>
          <div className={`mt-2 text-xs font-medium ${isDark ? "text-green-400" : "text-green-600"}`}>
            Impact: {impact}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============== MAIN COMPONENT ==============

export default function RetailDashboard() {
  const [dateRange, setDateRange] = useState("This Year");
  const [activeSection, setActiveSection] = useState("overview");
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Refs for scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const descriptiveRef = useRef<HTMLDivElement>(null);
  const diagnosticRef = useRef<HTMLDivElement>(null);
  const predictiveRef = useRef<HTMLDivElement>(null);
  const prescriptiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      overview: overviewRef,
      descriptive: descriptiveRef,
      diagnostic: diagnosticRef,
      predictive: predictiveRef,
      prescriptive: prescriptiveRef,
    };
    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ApexCharts theme
  const apexTheme = getApexChartTheme(isDark);

  // MUI theme colors
  const muiPalette = isDark
    ? { text: "#E5E7EB", background: "#1F2937", grid: "#374151" }
    : { text: "#374151", background: "#FFFFFF", grid: "#E5E7EB" };

  // Radar Chart Options (ApexCharts - for store comparison)
  const radarChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "radar", height: 350 },
    colors: [chartColors.yellow, chartColors.blue, chartColors.green, chartColors.purple],
    xaxis: { categories: ["Revenue", "Traffic", "Conversion", "Satisfaction"] },
    yaxis: { show: false },
    legend: { ...apexTheme.legend, position: "bottom" },
    markers: { size: 4 },
    fill: { opacity: 0.2 },
  };

  const radarChartSeries = storePerformance.map(store => ({
    name: store.store,
    data: [store.revenue, store.traffic, store.conversion, store.satisfaction],
  }));

  // Forecast Chart Options
  const forecastChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "area", height: 300 },
    colors: [chartColors.yellow, chartColors.cyan],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 5] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    xaxis: { ...apexTheme.xaxis, categories: forecastData.categories },
    yaxis: { ...apexTheme.yaxis, labels: { ...apexTheme.yaxis.labels, formatter: (val: number) => `$${val}K` } },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/Go-Insight-Color_ICON.png"
              alt="GoInsight"
              width={80}
              height={80}
              className="animate-pulse"
              priority
            />
          </motion.div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <DemoSidebar
        activeDomain="retail"
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300">
        {/* Top Navigation */}
        <nav className={`sticky top-0 z-30 shadow-lg ${isDark ? "bg-gray-800" : "bg-brand-primary"}`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Image src="/Go-Insight-White_logo.png" alt="GoInsight" width={100} height={28} className="h-7 w-auto" />
                <div className="h-6 w-px bg-white/20" />
                <span className="text-white font-medium">Retail Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
                  <Calendar className="w-4 h-4" />{dateRange}
                </div>
                <ToolbarTooltip title="Advanced Filters" description="Apply multi-dimensional filters across all visualizations. Filter by date range, store locations, product categories, and customer segments.">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors cursor-default">
                    <Filter className="w-4 h-4" />Filters
                  </button>
                </ToolbarTooltip>
                <ToolbarTooltip title="Refresh Data" description="Manually refresh dashboard data from connected sources. Configure auto-refresh intervals in settings.">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors cursor-default">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </ToolbarTooltip>
                <div className="h-6 w-px bg-white/20" />
                <ToolbarTooltip title="Export Options" description="Export data and visualizations in multiple formats: Excel, CSV, PDF, PowerPoint. Schedule automated exports.">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-colors cursor-default">
                    <Download className="w-4 h-4" />Export
                  </button>
                </ToolbarTooltip>
                <ToolbarTooltip title="Share & Collaborate" description="Share dashboards with team members, create public links, embed reports, and schedule email distributions.">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-yellow text-brand-dark text-sm font-semibold rounded-lg hover:bg-yellow-400 transition-colors cursor-default">
                    <Share2 className="w-4 h-4" />Share
                  </button>
                </ToolbarTooltip>
                <div className="h-6 w-px bg-white/20" />
                <ToolbarTooltip title="Toggle Theme" description="Switch between light and dark mode for comfortable viewing in any environment.">
                  <div className="flex items-center">
                    <ThemeSwitch checked={isDark} onChange={toggleTheme} />
                  </div>
                </ToolbarTooltip>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Header */}
        <header ref={overviewRef} className={`border-b scroll-mt-16 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-brand-yellow/20" : "bg-brand-yellow/10"}`}>
                  <ShoppingCart className="w-7 h-7 text-brand-yellow" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>
                    Retail Analytics Dashboard
                  </h1>
                  <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                    Real-time insights from 4 stores across 5 product categories | Updated every 15 minutes
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>
                <Clock className="w-4 h-4" />
                Last updated: 5 minutes ago
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 py-6 space-y-8">
          {/* KPI Cards with Sparklines */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="Total Revenue"
              value="$4.47M"
              change="+18.2%"
              changeType="positive"
              icon={DollarSign}
              sparklineData={kpiSparklines.revenue}
              isDark={isDark}
            />
            <KPICard
              title="Total Orders"
              value="12,847"
              change="+12.5%"
              changeType="positive"
              icon={ShoppingCart}
              sparklineData={kpiSparklines.orders}
              isDark={isDark}
            />
            <KPICard
              title="Avg. Order Value"
              value="$347"
              change="+8.3%"
              changeType="positive"
              icon={Target}
              sparklineData={kpiSparklines.avgOrder}
              isDark={isDark}
            />
            <KPICard
              title="Customer Count"
              value="8,234"
              change="+15.7%"
              changeType="positive"
              icon={Users}
              sparklineData={kpiSparklines.customers}
              isDark={isDark}
            />
          </div>

          {/* ============== DESCRIPTIVE ANALYTICS ============== */}
          <section ref={descriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={BarChart3}
              title="Descriptive Analytics"
              subtitle="What happened? - Historical performance analysis across all retail channels"
              color={chartColors.blue}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue Trend - MUI Line Chart */}
              <ChartCard
                title="Revenue Performance Trend"
                subtitle="Monthly revenue vs target vs last year comparison"
                infoTitle="Revenue Performance Chart"
                infoDescription="This line chart displays your monthly revenue performance compared to targets and last year's figures. It helps identify seasonal patterns and growth trajectory."
                infoHowToRead={[
                  "Yellow line shows actual revenue - higher is better",
                  "Blue line represents the target - aim to stay above this",
                  "Gray line shows last year's performance for comparison",
                  "The gap between lines indicates over/under performance",
                  "Look for trends: upward slope means growth"
                ]}
                infoDataSource="POS transactions aggregated daily, updated every 15 minutes"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <LineChart
                  height={350}
                  series={[
                    { data: revenueData.revenue, label: "Revenue", color: chartColors.yellow },
                    { data: revenueData.target, label: "Target", color: chartColors.blue },
                    { data: revenueData.lastYear, label: "Last Year", color: "#9CA3AF" },
                  ]}
                  xAxis={[{ data: revenueData.categories, scaleType: "point" }]}
                  yAxis={[{ valueFormatter: (v: number) => `$${v}K` }]}
                  sx={{
                    '.MuiChartsAxis-tickLabel': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsAxis-tickLabel tspan': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-label': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-series text': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsAxis-line': { stroke: isDark ? '#374151' : '#E5E7EB' },
                    '.MuiChartsAxis-tick': { stroke: isDark ? '#374151' : '#E5E7EB' },
                  }}
                />
              </ChartCard>

              {/* Category Distribution - MUI Pie Chart */}
              <ChartCard
                title="Sales by Category"
                subtitle="Revenue distribution across product categories"
                infoTitle="Category Distribution Chart"
                infoDescription="This donut chart shows how your total revenue is distributed across different product categories. It helps identify top-performing categories and diversification opportunities."
                infoHowToRead={[
                  "Each segment represents a product category's share of total revenue",
                  "Larger segments indicate higher revenue contribution",
                  "Hover over segments to see exact percentages",
                  "Compare segment sizes to identify imbalances",
                  "Ideal: balanced distribution unless strategic focus on specific categories"
                ]}
                infoDataSource="Sales data from all stores, categorized by SKU product hierarchy"
                isDark={isDark}
              >
                <PieChart
                  height={300}
                  series={[{
                    data: categoryData,
                    innerRadius: 60,
                    outerRadius: 100,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    highlightScope: { fade: 'global', highlight: 'item' },
                  }]}
                  sx={{
                    '.MuiChartsLegend-label': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-series text': { fill: isDark ? '#E5E7EB' : '#374151' },
                  }}
                />
              </ChartCard>
            </div>

            {/* Second Row - Traffic and Conversions */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Hourly Traffic - MUI Bar Chart */}
              <ChartCard
                title="Hourly Store Traffic & Conversions"
                subtitle="Visitor count and purchase conversions throughout the day"
                infoTitle="Hourly Traffic Analysis"
                infoDescription="This combined chart shows the number of store visitors (bars) and how many made purchases (line) at each hour. It helps optimize staffing and identify peak shopping times."
                infoHowToRead={[
                  "Bars show total visitor count per hour",
                  "Taller bars = more foot traffic",
                  "Peak hours (5-6 PM) need more staff",
                  "Line shows actual conversions (purchases)",
                  "Gap between bars and line = missed conversion opportunities"
                ]}
                infoDataSource="Door sensors for traffic, POS for conversions - real-time data"
                isDark={isDark}
              >
                <BarChart
                  height={280}
                  series={[
                    { data: hourlyTraffic.visitors, label: "Visitors", color: chartColors.cyan },
                    { data: hourlyTraffic.conversions, label: "Conversions", color: chartColors.green },
                  ]}
                  xAxis={[{ data: hourlyTraffic.hours, scaleType: "band" }]}
                  sx={{
                    '.MuiChartsAxis-tickLabel': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsAxis-tickLabel tspan': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-label': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-series text': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsAxis-line': { stroke: isDark ? '#374151' : '#E5E7EB' },
                    '.MuiChartsAxis-tick': { stroke: isDark ? '#374151' : '#E5E7EB' },
                  }}
                />
              </ChartCard>

              {/* Customer Segments - MUI Bar Chart */}
              <ChartCard
                title="Customer Segment Analysis"
                subtitle="Revenue and retention by customer type"
                infoTitle="Customer Segmentation"
                infoDescription="This chart breaks down your customer base into segments (VIP, Regular, Occasional, New) showing their count, revenue contribution, and retention rates."
                infoHowToRead={[
                  "Segment size (bar height) shows customer count",
                  "VIP customers are few but high-value",
                  "New customers have lowest retention - focus here",
                  "Regular customers are your bread & butter",
                  "Revenue % shows disproportionate value of VIPs"
                ]}
                infoDataSource="CRM data merged with transaction history, updated daily"
                isDark={isDark}
              >
                <BarChart
                  height={280}
                  series={[
                    { data: customerSegments.map(s => s.count), label: "Customers", color: chartColors.purple },
                    { data: customerSegments.map(s => s.retention), label: "Retention %", color: chartColors.green },
                  ]}
                  xAxis={[{ data: customerSegments.map(s => s.segment), scaleType: "band" }]}
                  sx={{
                    '.MuiChartsAxis-tickLabel': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsAxis-tickLabel tspan': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-label': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-series text': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsAxis-line': { stroke: isDark ? '#374151' : '#E5E7EB' },
                    '.MuiChartsAxis-tick': { stroke: isDark ? '#374151' : '#E5E7EB' },
                  }}
                />
              </ChartCard>
            </div>
          </section>

          {/* ============== DIAGNOSTIC ANALYTICS ============== */}
          <section ref={diagnosticRef} className="scroll-mt-20">
            <SectionHeader
              icon={PieChartIcon}
              title="Diagnostic Analytics"
              subtitle="Why did it happen? - Root cause analysis and performance drivers"
              color={chartColors.purple}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Store Performance Radar - ApexCharts */}
              <ChartCard
                title="Store Performance Comparison"
                subtitle="Multi-dimensional analysis across 4 stores"
                infoTitle="Store Performance Radar"
                infoDescription="This radar chart compares all stores across 4 key metrics: Revenue, Traffic, Conversion Rate, and Customer Satisfaction. It reveals each store's strengths and weaknesses."
                infoHowToRead={[
                  "Each colored shape represents one store",
                  "Points further from center = better performance",
                  "Ideal shape: large and symmetrical",
                  "Dips in the shape indicate weak areas",
                  "Compare shapes to identify best practices to share"
                ]}
                infoDataSource="Aggregated from POS, traffic sensors, and customer surveys"
                isDark={isDark}
              >
                <ApexChart options={radarChartOptions} series={radarChartSeries} type="radar" height={350} />
              </ChartCard>

              {/* Performance Gauges */}
              <ChartCard
                title="Key Performance Indicators"
                subtitle="Current performance vs targets"
                infoTitle="KPI Gauges"
                infoDescription="These gauge charts show real-time performance against targets for critical metrics. Green zone indicates on-target, yellow is caution, red needs attention."
                infoHowToRead={[
                  "Needle position shows current value",
                  "Green area (80-100%) = on target",
                  "Yellow area (60-80%) = needs attention",
                  "Red area (0-60%) = critical, action required",
                  "Compare gauges to prioritize focus areas"
                ]}
                infoDataSource="Real-time calculations from all data sources"
                isDark={isDark}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Conversion Rate", value: 78, target: "Target: 80%" },
                    { label: "Avg. Satisfaction", value: 92, target: "Target: 90%" },
                    { label: "Inventory Health", value: 65, target: "Target: 85%" },
                    { label: "Staff Efficiency", value: 88, target: "Target: 85%" },
                  ].map((gauge, index) => (
                    <div key={index} className="text-center">
                      <Gauge
                        value={gauge.value}
                        height={120}
                        startAngle={-110}
                        endAngle={110}
                        text={({ value }) => `${value}`}
                        sx={{
                          [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 20,
                            fill: isDark ? '#FFFFFF' : '#1a1a2e',
                            fontWeight: 600,
                          },
                          [`& .${gaugeClasses.valueText} text`]: {
                            fill: isDark ? '#FFFFFF' : '#1a1a2e',
                          },
                          [`& .${gaugeClasses.valueText} tspan`]: {
                            fill: isDark ? '#FFFFFF' : '#1a1a2e',
                          },
                          [`& .${gaugeClasses.valueArc}`]: {
                            fill: gauge.value >= 80 ? chartColors.green : gauge.value >= 60 ? chartColors.yellow : chartColors.red,
                          },
                          [`& .${gaugeClasses.referenceArc}`]: {
                            fill: isDark ? '#374151' : '#E5E7EB',
                          },
                        }}
                      />
                      <p className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{gauge.label}</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{gauge.target}</p>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Key Insights */}
            <div className={`mt-6 rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>AI-Generated Insights</h3>
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Automatically detected patterns and anomalies from your data
                  </p>
                </div>
                <ChartInfoButton
                  title="AI Insights"
                  description="These insights are automatically generated by our AI engine that analyzes patterns, anomalies, and correlations in your retail data."
                  howToRead={[
                    "Green insights indicate positive trends to maintain",
                    "Yellow insights are warnings requiring monitoring",
                    "Blue insights are opportunities to explore",
                    "Each insight includes the metric and context",
                    "Click on insights to drill down into details"
                  ]}
                  dataSource="Machine learning models analyzing 30+ data points"
                  isDark={isDark}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: TrendingUp, title: "Electronics Leading", desc: "35% of sales, up 12% QoQ", type: "positive" },
                  { icon: AlertTriangle, title: "Inventory Alert", desc: "Home & Garden low in 5 days", type: "warning" },
                  { icon: CheckCircle2, title: "NPS Score Up", desc: "Improved by 8 points to 72", type: "positive" },
                  { icon: Target, title: "Conversion Gap", desc: "Airport: high traffic, low convert", type: "info" },
                ].map((insight, index) => (
                  <div key={index} className={`p-4 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        insight.type === "positive" ? (isDark ? "bg-green-900/50" : "bg-green-100") :
                        insight.type === "warning" ? (isDark ? "bg-yellow-900/50" : "bg-yellow-100") :
                        (isDark ? "bg-blue-900/50" : "bg-blue-100")
                      }`}>
                        <insight.icon className={`w-4 h-4 ${
                          insight.type === "positive" ? "text-green-500" :
                          insight.type === "warning" ? "text-yellow-500" : "text-blue-500"
                        }`} />
                      </div>
                      <div>
                        <h4 className={`font-medium text-sm ${isDark ? "text-white" : "text-brand-dark"}`}>{insight.title}</h4>
                        <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>{insight.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============== PREDICTIVE ANALYTICS ============== */}
          <section ref={predictiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={Activity}
              title="Predictive Analytics"
              subtitle="What will happen? - ML-powered forecasting with 92% accuracy"
              color={chartColors.cyan}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Sales Forecast */}
              <ChartCard
                title="Revenue Forecast"
                subtitle="6-month prediction with confidence intervals"
                infoTitle="ML-Powered Revenue Forecast"
                infoDescription="This chart shows predicted revenue for the next 6 months using machine learning models trained on 3 years of historical data, seasonal patterns, and market indicators."
                infoHowToRead={[
                  "Solid yellow line shows actual historical revenue",
                  "Dashed cyan line shows ML predictions",
                  "Shaded area represents 95% confidence interval",
                  "Wider shading = more uncertainty further out",
                  "Model accuracy: 92% for 3-month forecasts"
                ]}
                infoDataSource="Ensemble ML model: ARIMA + Prophet + XGBoost"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <ApexChart
                  options={forecastChartOptions}
                  series={[
                    { name: "Actual", data: forecastData.actual },
                    { name: "Forecast", data: forecastData.forecast },
                  ]}
                  type="area"
                  height={300}
                />
              </ChartCard>

              {/* Inventory Predictions */}
              <ChartCard
                title="Inventory Health Forecast"
                subtitle="Stock level predictions by category"
                infoTitle="Inventory Prediction"
                infoDescription="This shows predicted inventory levels for each category over the next 30 days, helping prevent stockouts and overstock situations."
                infoHowToRead={[
                  "Progress bar shows current stock level",
                  "Predicted value shows where stock will be in 30 days",
                  "Red/Urgent: Reorder immediately (< 40%)",
                  "Yellow/Reorder: Place order this week (40-70%)",
                  "Green/Monitor: Stock is healthy (> 70%)"
                ]}
                infoDataSource="Sales velocity analysis + supplier lead times"
                isDark={isDark}
              >
                <div className="space-y-4">
                  {inventoryForecast.map((item, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{item.product}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.action === "Urgent" ? (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600") :
                          item.action === "Reorder" ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600") :
                          (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600")
                        }`}>
                          {item.action} • {item.daysLeft}d
                        </span>
                      </div>
                      <div className={`h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                        <div
                          className={`h-full rounded-full transition-all ${
                            item.predicted < 40 ? "bg-red-500" : item.predicted < 70 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          style={{ width: `${item.current}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Now: {item.current}%</span>
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>30d: {item.predicted}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </section>

          {/* ============== PRESCRIPTIVE ANALYTICS ============== */}
          <section ref={prescriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={Lightbulb}
              title="Prescriptive Analytics"
              subtitle="What should we do? - AI-powered recommendations ranked by impact"
              color={chartColors.green}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className={`rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>AI Action Recommendations</h3>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Prioritized by ROI impact</p>
                  </div>
                  <ChartInfoButton
                    title="AI Recommendations"
                    description="These actions are recommended by our AI based on current data patterns, predicted outcomes, and estimated ROI. Each is scored and ranked by potential business impact."
                    howToRead={[
                      "High priority (red): Act within 24-48 hours",
                      "Medium priority (yellow): Plan for this week",
                      "Impact shows estimated revenue/cost effect",
                      "Click each card for detailed implementation steps",
                      "Recommendations update as new data arrives"
                    ]}
                    dataSource="Prescriptive AI engine analyzing all metrics"
                    isDark={isDark}
                  />
                </div>
                <div className="space-y-4">
                  <RecommendationCard
                    priority="high"
                    title="Emergency Restock: Home & Garden"
                    description="Stock will hit critical level in 5 days. Place order for 500 units immediately."
                    impact="+$45K revenue protection"
                    icon={Package}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="high"
                    title="Airport Store: Add Express Checkout"
                    description="High traffic (95%) but low conversion (72%). Express checkout could recover 18% of lost sales."
                    impact="+$62K annual revenue"
                    icon={Zap}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="medium"
                    title="Dynamic Pricing: Electronics"
                    description="Demand surge detected. Increase prices by 5-8% on top 20 SKUs for next 2 weeks."
                    impact="+$28K margin improvement"
                    icon={Target}
                    isDark={isDark}
                  />
                </div>
              </div>

              {/* ROI Calculator */}
              <div className={`rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>Projected ROI Impact</h3>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>If all recommendations implemented</p>
                  </div>
                  <ChartInfoButton
                    title="ROI Projection"
                    description="This calculator shows the combined financial impact of implementing all AI recommendations. Values are based on historical data from similar actions and predictive modeling."
                    howToRead={[
                      "Total projected impact shown at top",
                      "Progress bars show contribution by category",
                      "Revenue increase: additional sales generated",
                      "Cost reduction: operational savings",
                      "Payback period based on implementation costs"
                    ]}
                    dataSource="Financial modeling based on similar past initiatives"
                    isDark={isDark}
                  />
                </div>
                <div className={`p-6 rounded-xl ${isDark ? "bg-gradient-to-br from-brand-primary to-gray-800" : "bg-gradient-to-br from-brand-primary to-brand-primary/80"} text-white`}>
                  <div className="text-center mb-6">
                    <p className="text-white/70 text-sm">Total Projected Annual Impact</p>
                    <p className="text-4xl font-bold mt-2">$1.35M</p>
                    <p className="text-white/70 text-sm mt-1">Payback period: 4.2 months</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Revenue Increase", value: "+$892K", percent: 75 },
                      { label: "Cost Reduction", value: "-$312K", percent: 55 },
                      { label: "Customer Retention", value: "+$146K", percent: 60 },
                    ].map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-white/80">{metric.label}</span>
                          <span className="font-semibold">{metric.value}</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-brand-yellow rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.percent}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className={`rounded-2xl p-8 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-brand-dark"}`}>
                  Ready to Transform Your Retail Business?
                </h2>
                <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                  Get a customized analytics solution with all 4 types of analytics for your business.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
                >
                  Schedule Consultation
                </Link>
                <button className={`px-6 py-3 font-semibold rounded-xl transition-colors ${
                  isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-brand-primary text-white hover:bg-gray-800"
                }`}>
                  Download Report
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`py-6 mt-8 -mx-6 px-6 ${isDark ? "bg-gray-800" : "bg-brand-primary"} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/Go-Insight-White_logo.png" alt="GoInsight" width={100} height={28} className="h-6 w-auto" />
                <span className="text-white/60 text-sm">© 2024 All rights reserved</span>
              </div>
              <p className="text-white/60 text-sm">Demo Dashboard - For Illustration Purposes</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
