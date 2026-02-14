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
  DollarSign,
  PieChart as PieChartIcon,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Shield,
  Brain,
  Lightbulb,
  Activity,
  Download,
  Share2,
  Calendar,
  Filter,
  RefreshCw,
  Info,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Building2,
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

// Revenue & Profit Data
const revenueData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  revenue: [2.4, 2.1, 2.8, 3.2, 2.9, 3.5, 3.8, 4.1, 4.4, 4.8, 5.2, 5.6],
  profit: [0.48, 0.38, 0.56, 0.72, 0.58, 0.84, 0.95, 1.07, null, null, null, null],
  forecast: [null, null, null, null, null, null, null, null, 1.15, 1.25, 1.35, 1.48],
};

// Cash Flow Data
const cashFlowData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  inflow: [2.8, 2.4, 3.2, 3.6, 3.1, 3.9],
  outflow: [2.2, 2.1, 2.5, 2.8, 2.6, 2.9],
};

// Expense Breakdown
const expenseBreakdown = [
  { id: 0, value: 35, label: "Operations", color: chartColors.primary },
  { id: 1, value: 22, label: "Marketing", color: chartColors.yellow },
  { id: 2, value: 18, label: "R&D", color: chartColors.green },
  { id: 3, value: 15, label: "Admin", color: chartColors.blue },
  { id: 4, value: 10, label: "Other", color: "#9CA3AF" },
];

// Risk Assessment Data
const riskData = [
  { category: "Market Risk", current: 65, threshold: 80 },
  { category: "Credit Risk", current: 45, threshold: 70 },
  { category: "Liquidity Risk", current: 30, threshold: 60 },
  { category: "Operational Risk", current: 55, threshold: 75 },
  { category: "Compliance Risk", current: 25, threshold: 50 },
];

// Budget vs Actual
const budgetData = {
  departments: ["Sales", "Marketing", "Operations", "IT", "HR"],
  budget: [1.2, 0.8, 1.5, 0.6, 0.4],
  actual: [1.1, 0.9, 1.4, 0.65, 0.38],
};

// Portfolio Data
const portfolioData = [
  { name: "Equities", value: 40, return: 12.5, risk: "High" },
  { name: "Bonds", value: 30, return: 5.2, risk: "Low" },
  { name: "Real Estate", value: 15, return: 8.7, risk: "Medium" },
  { name: "Cash", value: 10, return: 2.1, risk: "Low" },
  { name: "Alternatives", value: 5, return: 15.3, risk: "High" },
];

// KPI Sparkline Data
const kpiSparklines = {
  revenue: [2.4, 2.1, 2.8, 3.2, 2.9, 3.5, 3.8, 4.1, 4.4, 4.8, 5.2, 5.6],
  profit: [20, 19, 21, 22, 21, 23, 24, 24.7, 25, 26, 27, 28],
  cashFlow: [0.6, 0.3, 0.7, 0.8, 0.5, 1.0, 1.2, 1.1, 1.3, 1.4],
  debtEquity: [0.6, 0.58, 0.55, 0.52, 0.48, 0.45, 0.44, 0.43, 0.42, 0.40],
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
              <div className="p-1.5 rounded-lg bg-blue-100">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
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

// Info Button Component with Centered Modal
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
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsOpen(false)}
            />
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
                <div>
                  <h4 className={`text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    What This Chart Shows
                  </h4>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {description}
                  </p>
                </div>

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
  <div className={`rounded-2xl p-6 shadow-sm border transition-colors ${
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
        isDark ? "bg-blue-500/20" : "bg-brand-primary/10"
      }`}>
        <Icon className={`w-6 h-6 ${isDark ? "text-blue-400" : "text-brand-primary"}`} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${
        changeType === "positive" ? "text-green-500" : "text-red-500"
      }`}>
        {changeType === "positive" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
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

// ============== MAIN COMPONENT ==============

export default function FinanceContent() {
  const [selectedScenario, setSelectedScenario] = useState("Base Case");
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [activeSection, setActiveSection] = useState("overview");
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

  // Radar Chart for Financial Health
  const radarChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "radar", height: 300 },
    colors: [chartColors.blue, chartColors.yellow],
    xaxis: { categories: ["Liquidity", "Solvency", "Profitability", "Efficiency", "Growth"] },
    yaxis: { show: false },
    markers: { size: 4 },
    fill: { opacity: 0.25 },
    stroke: { width: 2 },
  };

  const radarChartSeries = [
    { name: "Current", data: [85, 72, 78, 88, 92] },
    { name: "Target", data: [90, 80, 85, 90, 95] },
  ];

  // Area Chart for Forecast
  const forecastChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "area", height: 300 },
    colors: [chartColors.blue, chartColors.green, chartColors.yellow],
    stroke: { curve: "smooth", width: [3, 3, 2], dashArray: [0, 0, 5] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    xaxis: { ...apexTheme.xaxis, categories: revenueData.months },
    yaxis: { ...apexTheme.yaxis, labels: { ...apexTheme.yaxis.labels, formatter: (val: number) => `$${val}M` } },
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
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <DemoSidebar
        activeDomain="finance"
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
                <span className="text-white font-medium">Finance Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
                  <Calendar className="w-4 h-4" />FY 2024
                </div>
                <ToolbarTooltip title="Advanced Filters" description="Apply multi-dimensional filters across all visualizations. Filter by fiscal periods, cost centers, departments, and GL accounts.">
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-blue-500/20" : "bg-brand-primary/10"}`}>
                  <TrendingUp className={`w-7 h-7 ${isDark ? "text-blue-400" : "text-brand-primary"}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>
                    Finance Analytics Dashboard
                  </h1>
                  <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                    Real-time financial intelligence | Q4 FY2024 | Updated every 5 minutes
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>
                <Clock className="w-4 h-4" />
                Last updated: 2 min ago
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-2" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 py-6 space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="Total Revenue"
              value="$24.8M"
              change="+18.2%"
              changeType="positive"
              icon={DollarSign}
              sparklineData={kpiSparklines.revenue}
              isDark={isDark}
            />
            <KPICard
              title="Net Profit Margin"
              value="24.7%"
              change="+2.1%"
              changeType="positive"
              icon={Target}
              sparklineData={kpiSparklines.profit}
              isDark={isDark}
            />
            <KPICard
              title="Operating Cash Flow"
              value="$3.9M"
              change="+15.4%"
              changeType="positive"
              icon={Wallet}
              sparklineData={kpiSparklines.cashFlow}
              isDark={isDark}
            />
            <KPICard
              title="Debt-to-Equity"
              value="0.45"
              change="-0.08"
              changeType="positive"
              icon={Shield}
              sparklineData={kpiSparklines.debtEquity}
              isDark={isDark}
            />
          </div>

          {/* ============== DESCRIPTIVE ANALYTICS ============== */}
          <section ref={descriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={BarChart3}
              title="Descriptive Analytics"
              subtitle="What happened? - Historical financial performance analysis"
              color={chartColors.blue}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue Trend - MUI Line Chart */}
              <ChartCard
                title="Revenue & Profit Performance"
                subtitle="Monthly revenue with profit margins and AI forecast"
                infoTitle="Revenue Performance Chart"
                infoDescription="This chart shows monthly revenue performance with profit trends and AI-generated forecasts for upcoming quarters."
                infoHowToRead={[
                  "Blue line shows actual revenue in millions",
                  "Green line represents profit (visible for past months)",
                  "Yellow dashed line shows AI-predicted forecast",
                  "Upward trend indicates healthy growth trajectory",
                  "Compare actual vs forecast to assess prediction accuracy"
                ]}
                infoDataSource="ERP system financial data, updated daily at market close"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <LineChart
                  height={320}
                  series={[
                    { data: revenueData.revenue, label: "Revenue ($M)", color: chartColors.blue },
                    { data: revenueData.profit.map(v => v ?? undefined) as number[], label: "Profit ($M)", color: chartColors.green },
                    { data: revenueData.forecast.map(v => v ?? undefined) as number[], label: "Forecast ($M)", color: chartColors.yellow },
                  ]}
                  xAxis={[{ data: revenueData.months, scaleType: "point" }]}
                  yAxis={[{ valueFormatter: (v: number) => `$${v}M` }]}
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

              {/* Expense Distribution - MUI Pie Chart */}
              <ChartCard
                title="Expense Distribution"
                subtitle="Breakdown of operational costs by category"
                infoTitle="Expense Breakdown Chart"
                infoDescription="This donut chart visualizes how company expenses are distributed across different operational categories."
                infoHowToRead={[
                  "Each segment represents a cost category",
                  "Larger segments indicate higher spending",
                  "Operations (35%) is the largest expense area",
                  "Compare against industry benchmarks for optimization",
                  "Track changes quarter-over-quarter"
                ]}
                infoDataSource="Accounting system expense reports, categorized by GL codes"
                isDark={isDark}
              >
                <PieChart
                  height={220}
                  series={[{
                    data: expenseBreakdown,
                    innerRadius: 50,
                    outerRadius: 85,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    highlightScope: { fade: 'global', highlight: 'item' },
                  }]}
                  sx={{
                    '.MuiChartsLegend-label': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-series text': { fill: isDark ? '#E5E7EB' : '#374151' },
                  }}
                />
                <div className="mt-2 space-y-1">
                  {expenseBreakdown.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className={isDark ? "text-gray-400" : "text-gray-600"}>{item.label}</span>
                      </div>
                      <span className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Cash Flow Analysis */}
            <div className="mt-6">
              <ChartCard
                title="Cash Flow Analysis"
                subtitle="Monthly inflow vs outflow comparison"
                infoTitle="Cash Flow Chart"
                infoDescription="This bar chart compares cash inflows against outflows, helping visualize liquidity and working capital health."
                infoHowToRead={[
                  "Green bars represent cash inflows (revenue received)",
                  "Red bars show cash outflows (expenses paid)",
                  "Positive gap (green > red) indicates positive cash flow",
                  "Consistent positive flow ensures operational stability",
                  "Monitor for seasonal patterns in cash movement"
                ]}
                infoDataSource="Treasury management system, real-time bank reconciliation"
                isDark={isDark}
              >
                <BarChart
                  height={280}
                  series={[
                    { data: cashFlowData.inflow, label: "Cash Inflow ($M)", color: chartColors.green },
                    { data: cashFlowData.outflow, label: "Cash Outflow ($M)", color: chartColors.red },
                  ]}
                  xAxis={[{ data: cashFlowData.months, scaleType: "band" }]}
                  yAxis={[{ valueFormatter: (v: number) => `$${v}M` }]}
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
              subtitle="Why did it happen? - Root cause analysis and variance insights"
              color={chartColors.purple}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Budget vs Actual - MUI Bar Chart */}
              <ChartCard
                title="Budget vs Actual Analysis"
                subtitle="Department-wise budget utilization comparison"
                infoTitle="Budget Variance Analysis"
                infoDescription="Compare planned budgets against actual spending for each department. This helps identify over/under spending patterns."
                infoHowToRead={[
                  "Blue bars show allocated budget",
                  "Yellow bars show actual spending",
                  "When yellow exceeds blue = over budget (attention needed)",
                  "When blue exceeds yellow = under budget (potential savings)",
                  "Marketing is 12.5% over budget this quarter"
                ]}
                infoDataSource="Financial planning system, monthly budget reviews"
                isDark={isDark}
              >
                <BarChart
                  height={280}
                  series={[
                    { data: budgetData.budget, label: "Budget ($M)", color: chartColors.blue },
                    { data: budgetData.actual, label: "Actual ($M)", color: chartColors.yellow },
                  ]}
                  xAxis={[{ data: budgetData.departments, scaleType: "band" }]}
                  yAxis={[{ valueFormatter: (v: number) => `$${v}M` }]}
                  layout="vertical"
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

              {/* Risk Assessment with Gauges */}
              <ChartCard
                title="Risk Assessment Matrix"
                subtitle="Current risk levels vs thresholds"
                infoTitle="Risk Assessment Gauges"
                infoDescription="These gauges show current risk levels for key financial risk categories. Each gauge indicates proximity to the risk threshold."
                infoHowToRead={[
                  "Green zone (0-60%): Risk within acceptable limits",
                  "Yellow zone (60-80%): Risk elevated, monitor closely",
                  "Red zone (80-100%): Risk critical, action required",
                  "Market Risk at 65% needs attention",
                  "Compliance Risk at 25% is well controlled"
                ]}
                infoDataSource="Risk management system, updated weekly"
                isDark={isDark}
              >
                <div className="grid grid-cols-3 gap-4">
                  {riskData.slice(0, 3).map((risk) => (
                    <div key={risk.category} className="text-center">
                      <Gauge
                        value={risk.current}
                        height={100}
                        startAngle={-110}
                        endAngle={110}
                        text={({ value }) => `${value}`}
                        sx={{
                          [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 16,
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
                            fill: risk.current >= 65 ? chartColors.red : risk.current >= 45 ? chartColors.yellow : chartColors.green,
                          },
                          [`& .${gaugeClasses.referenceArc}`]: {
                            fill: isDark ? '#374151' : '#E5E7EB',
                          },
                        }}
                      />
                      <p className={`text-xs font-medium mt-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {risk.category.replace(" Risk", "")}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-3">
                  {riskData.map((risk) => (
                    <div key={risk.category}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>{risk.category}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${
                            risk.current >= risk.threshold * 0.8 ? "text-red-500" :
                            risk.current >= risk.threshold * 0.6 ? "text-yellow-500" : "text-green-500"
                          }`}>
                            {risk.current}%
                          </span>
                          {risk.current >= risk.threshold * 0.8 && (
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                          )}
                        </div>
                      </div>
                      <div className={`h-1.5 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
                        <motion.div
                          className={`h-full rounded-full ${
                            risk.current >= risk.threshold * 0.8 ? "bg-red-500" :
                            risk.current >= risk.threshold * 0.6 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${risk.current}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Key Insights */}
            <div className={`mt-6 rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>AI-Generated Financial Insights</h3>
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Automatically detected patterns and anomalies
                  </p>
                </div>
                <ChartInfoButton
                  title="AI Financial Insights"
                  description="These insights are generated by our AI analyzing financial patterns, anomalies, and correlations across all your financial data."
                  howToRead={[
                    "Green insights = positive trends to maintain",
                    "Yellow insights = warnings needing attention",
                    "Blue insights = opportunities to explore",
                    "Each insight includes actionable context",
                    "Click insights for detailed analysis"
                  ]}
                  dataSource="ML models analyzing 50+ financial metrics"
                  isDark={isDark}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: TrendingUp, title: "Revenue Driver", desc: "SaaS subscriptions grew 28% QoQ, now 45% of revenue", type: "positive" },
                  { icon: AlertTriangle, title: "Cost Alert", desc: "Marketing exceeded budget by 12.5% (new campaign)", type: "warning" },
                  { icon: CheckCircle2, title: "Efficiency Win", desc: "Operations costs down 6.7% via automation", type: "positive" },
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
              icon={Brain}
              title="Predictive Analytics"
              subtitle="What will happen? - AI-powered financial forecasting with 89% accuracy"
              color={chartColors.cyan}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Scenario Forecast */}
              <ChartCard
                title="Revenue Scenario Analysis"
                subtitle="ML-powered forecast with multiple scenarios"
                infoTitle="Scenario Forecasting"
                infoDescription="This chart shows three forecast scenarios: Base Case (most likely), Optimistic (best case), and Conservative (worst case) based on ML models."
                infoHowToRead={[
                  "Select scenario buttons to focus on specific projections",
                  "Base Case: 87% confidence based on current trajectory",
                  "Optimistic: Assumes favorable market conditions",
                  "Conservative: Risk-adjusted downside scenario",
                  "Use for budget planning and investor communications"
                ]}
                infoDataSource="Ensemble ML: ARIMA + Prophet + Gradient Boosting"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <div className="flex gap-2 mb-4">
                  {["Base Case", "Optimistic", "Conservative"].map((scenario) => (
                    <button
                      key={scenario}
                      onClick={() => setSelectedScenario(scenario)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedScenario === scenario
                          ? "bg-brand-primary text-white"
                          : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {scenario}
                    </button>
                  ))}
                </div>
                <ApexChart
                  options={forecastChartOptions}
                  series={[
                    { name: "Revenue", data: revenueData.revenue },
                    { name: "Profit", data: [0.48, 0.38, 0.56, 0.72, 0.58, 0.84, 0.95, 1.07, 1.15, 1.25, 1.35, 1.48] },
                    { name: "Forecast", data: [null, null, null, null, null, null, null, null, 1.15, 1.25, 1.35, 1.48] as (number | null)[] },
                  ]}
                  type="area"
                  height={280}
                />
                <div className={`mt-4 p-4 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gradient-to-r from-blue-50 to-cyan-50"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className={`w-4 h-4 ${isDark ? "text-cyan-400" : "text-cyan-600"}`} />
                    <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>ML Forecast Insight</span>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {selectedScenario} projects annual revenue of{" "}
                    <span className="font-bold">
                      ${selectedScenario === "Optimistic" ? "21.2M" : selectedScenario === "Conservative" ? "16.5M" : "18.7M"}
                    </span>
                    {" "}with 87% confidence interval.
                  </p>
                </div>
              </ChartCard>

              {/* Financial Health Radar */}
              <ChartCard
                title="Financial Health Score"
                subtitle="Multi-dimensional health assessment"
                infoTitle="Financial Health Radar"
                infoDescription="This radar chart shows your company's financial health across 5 key dimensions compared to target benchmarks."
                infoHowToRead={[
                  "Blue area shows current performance",
                  "Yellow line shows target benchmarks",
                  "Larger blue area = better overall health",
                  "Points closer to center indicate weak areas",
                  "Growth (92%) and Efficiency (88%) are strengths"
                ]}
                infoDataSource="Composite score from 25+ financial ratios"
                isDark={isDark}
              >
                <ApexChart options={radarChartOptions} series={radarChartSeries} type="radar" height={280} />
                <div className={`mt-2 p-3 rounded-xl text-center ${isDark ? "bg-green-900/30" : "bg-green-50"}`}>
                  <p className={`text-3xl font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>78/100</p>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>Overall Health Score</p>
                </div>
              </ChartCard>
            </div>
          </section>

          {/* ============== PRESCRIPTIVE ANALYTICS ============== */}
          <section ref={prescriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={Lightbulb}
              title="Prescriptive Analytics"
              subtitle="What should we do? - AI-powered recommendations ranked by ROI impact"
              color={chartColors.green}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Portfolio Optimizer */}
              <ChartCard
                title="Portfolio Optimization Simulator"
                subtitle="Interactive investment allocation tool"
                infoTitle="Portfolio Optimizer"
                infoDescription="Adjust the investment amount slider to see optimal allocation across asset classes based on your risk profile and market conditions."
                infoHowToRead={[
                  "Drag slider to set total investment amount",
                  "See real-time allocation by asset class",
                  "Risk badges indicate volatility level",
                  "Green percentage shows expected annual return",
                  "Bottom card shows projected total return"
                ]}
                infoDataSource="Modern Portfolio Theory optimization engine"
                isDark={isDark}
              >
                <div className="mb-4">
                  <label className={`text-sm mb-2 block ${isDark ? "text-gray-400" : "text-gray-600"}`}>Investment Amount</label>
                  <input
                    type="range"
                    min="50000"
                    max="500000"
                    step="10000"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>$50K</span>
                    <span className={`text-lg font-bold ${isDark ? "text-blue-400" : "text-brand-primary"}`}>${(investmentAmount / 1000).toFixed(0)}K</span>
                    <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>$500K</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {portfolioData.map((asset, index) => (
                    <div key={asset.name} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-medium text-sm ${isDark ? "text-white" : "text-brand-dark"}`}>{asset.name}</span>
                        <span className={`text-sm font-semibold ${isDark ? "text-blue-400" : "text-brand-primary"}`}>
                          ${((investmentAmount * asset.value / 100) / 1000).toFixed(1)}K
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>Allocation: {asset.value}%</span>
                          <span className={`px-2 py-0.5 rounded-full ${
                            asset.risk === "Low" ? (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600") :
                            asset.risk === "Medium" ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600") :
                            (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
                          }`}>
                            {asset.risk}
                          </span>
                        </div>
                        <span className="text-green-500 font-medium">+{asset.return}%</span>
                      </div>
                      <motion.div className={`h-1.5 rounded-full mt-2 ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                        <motion.div
                          className="h-full bg-brand-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${asset.value}%` }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className={`mt-4 p-4 rounded-xl ${isDark ? "bg-green-900/30" : "bg-gradient-to-r from-green-50 to-emerald-50"}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>Projected Annual Return</span>
                    <span className={`text-xl font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>
                      +${((investmentAmount * 0.089) / 1000).toFixed(1)}K
                    </span>
                  </div>
                </div>
              </ChartCard>

              {/* AI Recommendations */}
              <ChartCard
                title="AI-Powered Recommendations"
                subtitle="Prioritized actions ranked by financial impact"
                infoTitle="AI Recommendations"
                infoDescription="These recommendations are generated by our AI analyzing your financial data and identifying the highest-impact opportunities for improvement."
                infoHowToRead={[
                  "Red badge = High priority, act within 48 hours",
                  "Yellow badge = Medium priority, plan this week",
                  "Impact shows estimated financial benefit",
                  "Click each card for implementation details",
                  "Recommendations update as data changes"
                ]}
                infoDataSource="Prescriptive AI analyzing financial operations"
                isDark={isDark}
              >
                <div className="space-y-4">
                  {[
                    { priority: "High", title: "Accelerate AR Collection", desc: "Implement automated reminders to reduce DSO by 8 days", impact: "+$320K cash flow", icon: Zap },
                    { priority: "High", title: "Renegotiate Supplier Terms", desc: "Extend payment terms Net-30 to Net-45 with top suppliers", impact: "+$180K working capital", icon: Clock },
                    { priority: "Medium", title: "Optimize Tax Strategy", desc: "Utilize R&D tax credits for AI development", impact: "-$95K tax liability", icon: Shield },
                    { priority: "Medium", title: "Refinance Long-term Debt", desc: "Market conditions favor 1.2% lower rate", impact: "-$45K annual interest", icon: Building2 },
                  ].map((rec, index) => (
                    <motion.div
                      key={rec.title}
                      className={`p-4 rounded-xl border transition-all ${
                        isDark ? "bg-gray-700/30 border-gray-600 hover:border-gray-500" : "border-gray-100 hover:border-brand-yellow"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          rec.priority === "High"
                            ? (isDark ? "bg-red-900/50" : "bg-red-100")
                            : (isDark ? "bg-yellow-900/50" : "bg-yellow-100")
                        }`}>
                          <rec.icon className={`w-5 h-5 ${
                            rec.priority === "High" ? "text-red-500" : "text-yellow-500"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              rec.priority === "High"
                                ? (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
                                : (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600")
                            }`}>
                              {rec.priority} Priority
                            </span>
                          </div>
                          <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-brand-dark"}`}>{rec.title}</h4>
                          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{rec.desc}</p>
                          <div className="mt-2">
                            <span className={`text-sm font-semibold ${isDark ? "text-green-400" : "text-green-600"}`}>{rec.impact}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </section>

          {/* CTA Section */}
          <section className={`rounded-2xl p-8 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-brand-dark"}`}>
                  Ready to Transform Your Financial Analytics?
                </h2>
                <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                  Get real-time visibility into your financial health with AI-powered insights.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
                >
                  Schedule a Demo
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
