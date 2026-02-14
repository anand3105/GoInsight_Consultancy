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
  Megaphone,
  Target,
  Users,
  DollarSign,
  MousePointer,
  Eye,
  ShoppingCart,
  Mail,
  Share2,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Brain,
  Lightbulb,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Info,
  X,
  Clock,
  Percent,
  MessageSquare,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  Award,
  TrendingUp as TrendingIcon,
  AlertTriangle,
  CheckCircle2,
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

// Sales Pipeline Data
const pipelineData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  leads: [450, 520, 480, 590, 620, 680, 720, 780, 850, 920, 980, 1050],
  qualified: [180, 210, 195, 240, 255, 280, 295, 320, 350, 380, 405, 435],
  closed: [72, 85, 78, 98, 105, 115, 122, 132, 145, 158, 168, 182],
  value: [280, 325, 298, 385, 420, 465, 495, 535, 590, 645, 695, 750],
};

// Marketing Channel ROI Data
const channelData = [
  { id: 0, value: 35, label: "Paid Search", color: chartColors.pink },
  { id: 1, value: 25, label: "Social Media", color: chartColors.blue },
  { id: 2, value: 18, label: "Email", color: chartColors.green },
  { id: 3, value: 12, label: "Content", color: chartColors.purple },
  { id: 4, value: 10, label: "Referrals", color: chartColors.orange },
];

// Campaign Performance Data
const campaignData = [
  { name: "Summer Sale 2024", spend: 45000, revenue: 185000, roi: 311, leads: 1250, cpl: 36 },
  { name: "Product Launch", spend: 32000, revenue: 142000, roi: 344, leads: 890, cpl: 36 },
  { name: "Brand Awareness", spend: 28000, revenue: 95000, roi: 239, leads: 680, cpl: 41 },
  { name: "Retargeting Q4", spend: 18000, revenue: 92000, roi: 411, leads: 520, cpl: 35 },
  { name: "Webinar Series", spend: 12000, revenue: 68000, roi: 467, leads: 380, cpl: 32 },
];

// Funnel Conversion Data
const funnelData = {
  stages: ["Website Visitors", "Leads", "MQLs", "SQLs", "Opportunities", "Closed Won"],
  values: [100000, 8500, 3400, 1700, 680, 245],
  conversion: [100, 8.5, 40, 50, 40, 36],
};

// Customer Acquisition Cost Data
const cacData = {
  months: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  cac: [285, 268, 245, 232, 218, 195],
  ltv: [1850, 1920, 1980, 2050, 2120, 2200],
  ratio: [6.5, 7.2, 8.1, 8.8, 9.7, 11.3],
};

// Channel Attribution Data
const attributionData = [
  { channel: "Paid Search", firstTouch: 32, lastTouch: 28, linear: 30, datadriven: 35 },
  { channel: "Social Media", firstTouch: 25, lastTouch: 18, linear: 22, datadriven: 20 },
  { channel: "Email", firstTouch: 15, lastTouch: 28, linear: 20, datadriven: 22 },
  { channel: "Organic", firstTouch: 18, lastTouch: 15, linear: 17, datadriven: 15 },
  { channel: "Direct", firstTouch: 10, lastTouch: 11, linear: 11, datadriven: 8 },
];

// Lead Score Distribution
const leadScoreData = {
  scores: ["0-20", "21-40", "41-60", "61-80", "81-100"],
  count: [1250, 2100, 1850, 980, 420],
  conversionRate: [2, 8, 22, 45, 72],
};

// Revenue Forecast Data
const revenueForecastData = {
  months: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
  actual: [590, 645, null, null, null, null],
  predicted: [null, 645, 720, 810, 780, 850],
};

// KPI Sparkline Data
const kpiSparklines = {
  revenue: [280, 325, 298, 385, 420, 465, 495, 535, 590, 645, 695, 750],
  conversionRate: [12.5, 13.2, 12.8, 14.5, 15.2, 15.8, 16.2, 16.8, 17.2, 17.5, 17.8, 18.2],
  cac: [320, 305, 295, 285, 268, 245, 232, 218, 205, 195, 188, 182],
  leads: [450, 520, 480, 590, 620, 680, 720, 780, 850, 920, 980, 1050],
};

// Lead Scoring Predictions
const leadPredictions = [
  { name: "Acme Corp", score: 92, probability: 85, value: "$125K", nextAction: "Schedule demo" },
  { name: "TechStart Inc", score: 87, probability: 78, value: "$85K", nextAction: "Send proposal" },
  { name: "Global Foods", score: 78, probability: 65, value: "$210K", nextAction: "Follow up call" },
  { name: "Metro Bank", score: 72, probability: 55, value: "$165K", nextAction: "Product trial" },
  { name: "HealthCo", score: 68, probability: 48, value: "$95K", nextAction: "Nurture sequence" },
];

// Content Performance Data
const contentData = [
  { type: "Blog Posts", views: 125000, engagement: 4.2, leads: 320, cost: 2800 },
  { type: "Videos", views: 85000, engagement: 8.5, leads: 280, cost: 8500 },
  { type: "Whitepapers", views: 12000, engagement: 15.2, leads: 450, cost: 4200 },
  { type: "Webinars", views: 4500, engagement: 35.8, leads: 380, cost: 6000 },
  { type: "Case Studies", views: 8500, engagement: 12.5, leads: 290, cost: 3500 },
];

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
              <div className="p-1.5 rounded-lg bg-pink-100">
                <Lock className="w-3.5 h-3.5 text-pink-600" />
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
                    isDark ? "bg-pink-500/20" : "bg-pink-500/10"
                  }`}>
                    <Info className="w-5 h-5 text-pink-500" />
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
                          isDark ? "bg-pink-500/20 text-pink-400" : "bg-pink-500/10 text-pink-500"
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
  unit = "",
  prefix = "",
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: any;
  sparklineData: number[];
  isDark: boolean;
  unit?: string;
  prefix?: string;
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
        isDark ? "bg-pink-500/20" : "bg-pink-500/10"
      }`}>
        <Icon className="w-6 h-6 text-pink-500" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${
        changeType === "positive" ? "text-green-500" : "text-red-500"
      }`}>
        {changeType === "positive" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        {change}
      </div>
    </div>
    <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>{title}</p>
    <p className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-brand-dark"}`}>
      {prefix}{value}<span className="text-sm font-normal ml-1">{unit}</span>
    </p>
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

export default function SalesMarketingDashboard() {
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

  // Funnel Chart Options (ApexCharts)
  const funnelOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "bar", height: 350 },
    plotOptions: { bar: { borderRadius: 4, horizontal: true, distributed: true, barHeight: '80%' } },
    colors: [chartColors.pink, chartColors.purple, chartColors.blue, chartColors.cyan, chartColors.teal, chartColors.green],
    dataLabels: { enabled: true, formatter: (val: number) => val.toLocaleString(), style: { fontSize: '12px' } },
    xaxis: { categories: funnelData.stages },
    yaxis: { labels: { style: { colors: isDark ? '#E5E7EB' : '#374151' } } },
    legend: { show: false },
  };

  // Attribution Model Chart Options
  const attributionOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "radar", height: 320 },
    colors: [chartColors.pink, chartColors.blue, chartColors.green, chartColors.purple],
    xaxis: { categories: attributionData.map(a => a.channel) },
    yaxis: { show: false, max: 40 },
    legend: { ...apexTheme.legend, position: "bottom" },
    markers: { size: 3 },
    fill: { opacity: 0.2 },
  };

  const attributionSeries = [
    { name: "First Touch", data: attributionData.map(a => a.firstTouch) },
    { name: "Last Touch", data: attributionData.map(a => a.lastTouch) },
    { name: "Linear", data: attributionData.map(a => a.linear) },
    { name: "Data-Driven", data: attributionData.map(a => a.datadriven) },
  ];

  // Revenue Forecast Chart Options
  const revenueForecastOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "area", height: 280 },
    colors: [chartColors.pink, chartColors.cyan],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 5] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    xaxis: { ...apexTheme.xaxis, categories: revenueForecastData.months },
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
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <DemoSidebar
        activeDomain="sales-marketing"
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300">
        {/* Top Navigation */}
        <nav className={`sticky top-0 z-30 shadow-lg ${isDark ? "bg-gray-800" : "bg-pink-600"}`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Image src="/Go-Insight-White_logo.png" alt="GoInsight" width={100} height={28} className="h-7 w-auto" />
                <div className="h-6 w-px bg-white/20" />
                <span className="text-white font-medium">Sales & Marketing Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
                  <Calendar className="w-4 h-4" />{dateRange}
                </div>
                <ToolbarTooltip title="Advanced Filters" description="Apply multi-dimensional filters across all visualizations. Filter by campaigns, channels, regions, and customer segments.">
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
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-pink-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-default">
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-pink-500/20" : "bg-pink-500/10"}`}>
                  <Megaphone className="w-7 h-7 text-pink-500" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>
                    Sales & Marketing Analytics Dashboard
                  </h1>
                  <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                    Full-funnel visibility across 5 channels, 12 campaigns, and 10K+ leads | Updated in real-time
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>
                <Clock className="w-4 h-4" />
                Last updated: Just now
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 py-6 space-y-8">
          {/* KPI Cards with Sparklines */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="Pipeline Revenue"
              value="750K"
              prefix="$"
              change="+28.4%"
              changeType="positive"
              icon={DollarSign}
              sparklineData={kpiSparklines.revenue}
              isDark={isDark}
            />
            <KPICard
              title="Conversion Rate"
              value="18.2"
              unit="%"
              change="+5.7%"
              changeType="positive"
              icon={Target}
              sparklineData={kpiSparklines.conversionRate}
              isDark={isDark}
            />
            <KPICard
              title="Customer Acquisition Cost"
              value="182"
              prefix="$"
              change="-43%"
              changeType="positive"
              icon={Users}
              sparklineData={kpiSparklines.cac}
              isDark={isDark}
            />
            <KPICard
              title="Total Leads"
              value="1,050"
              unit="/mo"
              change="+133%"
              changeType="positive"
              icon={MousePointer}
              sparklineData={kpiSparklines.leads}
              isDark={isDark}
            />
          </div>

          {/* ============== DESCRIPTIVE ANALYTICS ============== */}
          <section ref={descriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={BarChart3}
              title="Descriptive Analytics"
              subtitle="What happened? - Historical sales and marketing performance analysis"
              color={chartColors.blue}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Sales Pipeline Trend - MUI Line Chart */}
              <ChartCard
                title="Sales Pipeline Trend"
                subtitle="Monthly leads, qualified opportunities, and closed deals"
                infoTitle="Sales Pipeline Analysis"
                infoDescription="This chart tracks the sales funnel progression over time: total leads generated, marketing qualified leads (MQLs), and closed-won deals. It reveals pipeline health and conversion efficiency."
                infoHowToRead={[
                  "Pink line shows total leads generated",
                  "Blue line shows qualified leads (MQLs/SQLs)",
                  "Green line shows closed-won deals",
                  "Teal bars show pipeline value in $K",
                  "Healthy funnel: consistent ratios between stages"
                ]}
                infoDataSource="CRM system (Salesforce/HubSpot) and marketing automation"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <LineChart
                  height={350}
                  series={[
                    { data: pipelineData.leads, label: "Leads", color: chartColors.pink },
                    { data: pipelineData.qualified, label: "Qualified", color: chartColors.blue },
                    { data: pipelineData.closed, label: "Closed Won", color: chartColors.green },
                  ]}
                  xAxis={[{ data: pipelineData.months, scaleType: "point" }]}
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

              {/* Channel Distribution - MUI Pie Chart */}
              <ChartCard
                title="Revenue by Channel"
                subtitle="Marketing channel contribution to pipeline"
                infoTitle="Channel Revenue Attribution"
                infoDescription="This pie chart shows how different marketing channels contribute to your total pipeline revenue. It helps optimize budget allocation across channels."
                infoHowToRead={[
                  "Each segment represents a marketing channel",
                  "Larger segments indicate higher revenue contribution",
                  "Paid Search leads with 35% of pipeline",
                  "Compare segment sizes to channel spend",
                  "ROI = Revenue contribution / Channel spend"
                ]}
                infoDataSource="Multi-touch attribution model from analytics platform"
                isDark={isDark}
              >
                <PieChart
                  height={300}
                  series={[{
                    data: channelData,
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

            {/* Second Row - Campaign Performance and CAC/LTV */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Campaign Performance Table */}
              <ChartCard
                title="Campaign Performance"
                subtitle="ROI analysis across active campaigns"
                infoTitle="Campaign ROI Analysis"
                infoDescription="This table shows performance metrics for each marketing campaign including spend, revenue generated, ROI percentage, leads generated, and cost per lead."
                infoHowToRead={[
                  "ROI = (Revenue - Spend) / Spend × 100",
                  "Green ROI (>300%): High performers",
                  "CPL: Cost to acquire each lead",
                  "Lower CPL = more efficient campaigns",
                  "Sort by ROI to identify best performers"
                ]}
                infoDataSource="Campaign management and attribution systems"
                isDark={isDark}
              >
                <div className="space-y-3 max-h-[280px] overflow-y-auto">
                  {campaignData.map((campaign, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                          {campaign.name}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          campaign.roi >= 400 ? (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600") :
                          campaign.roi >= 300 ? (isDark ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600") :
                          (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600")
                        }`}>
                          {campaign.roi}% ROI
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Spend</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>${(campaign.spend / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Revenue</p>
                          <p className={`font-medium text-green-500`}>${(campaign.revenue / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Leads</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{campaign.leads}</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>CPL</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>${campaign.cpl}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* CAC vs LTV - MUI Line Chart */}
              <ChartCard
                title="CAC vs LTV Trend"
                subtitle="Customer acquisition cost vs lifetime value ratio"
                infoTitle="CAC:LTV Analysis"
                infoDescription="This chart tracks Customer Acquisition Cost (CAC) against Customer Lifetime Value (LTV). A healthy ratio is 3:1 or higher, meaning each customer is worth 3x what it costs to acquire them."
                infoHowToRead={[
                  "Pink line shows CAC (lower is better)",
                  "Teal line shows LTV (higher is better)",
                  "LTV:CAC ratio shown (higher is better)",
                  "Industry benchmark: 3:1 ratio minimum",
                  "Your ratio: 11.3x (excellent!)"
                ]}
                infoDataSource="Financial systems and customer analytics"
                isDark={isDark}
              >
                <LineChart
                  height={280}
                  series={[
                    { data: cacData.cac, label: "CAC ($)", color: chartColors.pink, yAxisId: 'cac' },
                    { data: cacData.ltv, label: "LTV ($)", color: chartColors.teal, yAxisId: 'ltv' },
                  ]}
                  xAxis={[{ data: cacData.months, scaleType: "point" }]}
                  yAxis={[
                    { id: 'cac', scaleType: 'linear' },
                    { id: 'ltv', scaleType: 'linear' },
                  ]}
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
              subtitle="Why did it happen? - Conversion analysis and channel attribution"
              color={chartColors.purple}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Marketing Funnel - ApexCharts */}
              <ChartCard
                title="Marketing & Sales Funnel"
                subtitle="Full-funnel conversion analysis"
                infoTitle="Conversion Funnel Analysis"
                infoDescription="This funnel visualization shows visitor progression through each stage of your marketing and sales process, from initial website visit to closed deal."
                infoHowToRead={[
                  "Each bar represents a funnel stage",
                  "Numbers show absolute count at each stage",
                  "Width indicates relative volume",
                  "Look for major drop-offs between stages",
                  "MQL→SQL (50%) and SQL→Opp (40%) need focus"
                ]}
                infoDataSource="Marketing automation and CRM pipeline data"
                isDark={isDark}
              >
                <ApexChart
                  options={funnelOptions}
                  series={[{ name: "Count", data: funnelData.values }]}
                  type="bar"
                  height={350}
                />
              </ChartCard>

              {/* Attribution Model Comparison - ApexCharts Radar */}
              <ChartCard
                title="Attribution Model Comparison"
                subtitle="Channel credit across different attribution models"
                infoTitle="Multi-Touch Attribution"
                infoDescription="This radar chart compares how different attribution models assign credit to marketing channels. It helps understand the true value of each touchpoint in the customer journey."
                infoHowToRead={[
                  "First Touch: Credit to first interaction",
                  "Last Touch: Credit to final conversion point",
                  "Linear: Equal credit across all touchpoints",
                  "Data-Driven: AI-calculated based on impact",
                  "Use Data-Driven for most accurate picture"
                ]}
                infoDataSource="Multi-touch attribution platform (GA4, Bizible, etc.)"
                isDark={isDark}
              >
                <ApexChart options={attributionOptions} series={attributionSeries} type="radar" height={320} />
              </ChartCard>
            </div>

            {/* KPI Gauges */}
            <div className="mt-6">
              <ChartCard
                title="Marketing Health Indicators"
                subtitle="Real-time performance against targets"
                infoTitle="Marketing KPI Gauges"
                infoDescription="These gauges show real-time performance of critical marketing metrics against targets. Green indicates on-target, yellow needs attention, red is critical."
                infoHowToRead={[
                  "MQL Conversion: Leads becoming qualified",
                  "SQL Acceptance: Sales accepting marketing leads",
                  "Win Rate: Opportunities becoming customers",
                  "Email Open Rate: Engagement with campaigns",
                  "Target zones shown below each gauge"
                ]}
                infoDataSource="Marketing automation and CRM analytics"
                isDark={isDark}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "MQL Conversion", value: 40, target: "Target: 35%" },
                    { label: "SQL Acceptance", value: 78, target: "Target: 80%" },
                    { label: "Win Rate", value: 36, target: "Target: 30%" },
                    { label: "Email Open Rate", value: 28, target: "Target: 25%" },
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
                            fill: gauge.value >= 35 ? chartColors.green : gauge.value >= 25 ? chartColors.pink : chartColors.orange,
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

            {/* AI Insights */}
            <div className={`mt-6 rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>AI-Generated Insights</h3>
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Automatically detected patterns and opportunities from marketing data
                  </p>
                </div>
                <ChartInfoButton
                  title="AI Insights"
                  description="These insights are automatically generated by our AI engine that analyzes patterns, anomalies, and opportunities in your marketing and sales data."
                  howToRead={[
                    "Green insights indicate positive trends",
                    "Yellow insights are opportunities to capture",
                    "Red insights need immediate attention",
                    "Each insight includes actionable recommendations"
                  ]}
                  dataSource="Machine learning models analyzing 200+ data points"
                  isDark={isDark}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: TrendingUp, title: "CAC Dropping", desc: "Down 43% YTD - efficiency improving significantly", type: "positive" },
                  { icon: Award, title: "Webinar ROI", desc: "467% ROI - highest performing channel", type: "positive" },
                  { icon: AlertTriangle, title: "SQL Gap", desc: "78% vs 80% target - review qualification criteria", type: "warning" },
                  { icon: Zap, title: "Retargeting Win", desc: "411% ROI with lowest CPL - increase budget", type: "opportunity" },
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
              subtitle="What will happen? - Revenue forecasting and lead scoring predictions"
              color={chartColors.cyan}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue Forecast */}
              <ChartCard
                title="Revenue Forecast"
                subtitle="6-month pipeline prediction"
                infoTitle="ML-Powered Revenue Forecast"
                infoDescription="This chart shows predicted pipeline revenue for the next 6 months using machine learning models trained on historical conversion patterns, deal velocity, and seasonality."
                infoHowToRead={[
                  "Solid pink line shows actual historical revenue",
                  "Dashed cyan line shows ML predictions",
                  "December peak: $810K predicted (Holiday season)",
                  "Model accuracy: 89% for 3-month forecasts",
                  "Use for quota setting and resource planning"
                ]}
                infoDataSource="Ensemble ML model using CRM and marketing data"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <ApexChart
                  options={revenueForecastOptions}
                  series={[
                    { name: "Actual", data: revenueForecastData.actual },
                    { name: "Predicted", data: revenueForecastData.predicted },
                  ]}
                  type="area"
                  height={280}
                />
              </ChartCard>

              {/* Lead Scoring Predictions */}
              <ChartCard
                title="Top Predicted Conversions"
                subtitle="AI-scored leads most likely to close"
                infoTitle="Predictive Lead Scoring"
                infoDescription="AI analyzes lead behavior, firmographics, and engagement to predict conversion probability. Higher scores indicate leads more likely to become customers."
                infoHowToRead={[
                  "Score: 0-100 based on conversion likelihood",
                  "Probability: ML-predicted chance to close",
                  "Value: Estimated deal size",
                  "Next Action: AI-recommended engagement",
                  "Focus efforts on high-score, high-value leads"
                ]}
                infoDataSource="Predictive lead scoring ML model"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {leadPredictions.map((lead, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                          {lead.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${
                            lead.score >= 85 ? "text-green-500" : lead.score >= 70 ? "text-blue-500" : "text-yellow-500"
                          }`}>
                            {lead.score}
                          </span>
                          <div className={`w-8 h-1 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                            <div
                              className={`h-full rounded-full ${
                                lead.score >= 85 ? "bg-green-500" : lead.score >= 70 ? "bg-blue-500" : "bg-yellow-500"
                              }`}
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                          {lead.probability}% prob • {lead.value}
                        </span>
                        <span className={`font-medium ${isDark ? "text-pink-400" : "text-pink-600"}`}>
                          {lead.nextAction}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Content Performance Predictions */}
            <div className="mt-6">
              <ChartCard
                title="Content Performance Analysis"
                subtitle="Views, engagement, leads, and cost efficiency by content type"
                infoTitle="Content ROI Analysis"
                infoDescription="This table analyzes content marketing performance across different formats, showing which content types generate the most leads at the best cost."
                infoHowToRead={[
                  "Views: Total content consumption",
                  "Engagement: Average time/interaction rate",
                  "Leads: Direct lead generation",
                  "Cost: Production cost",
                  "Webinars: Highest engagement & lead gen"
                ]}
                infoDataSource="Content management and marketing automation systems"
                isDark={isDark}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-left text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        <th className="pb-3 font-medium">Content Type</th>
                        <th className="pb-3 font-medium">Views</th>
                        <th className="pb-3 font-medium">Engagement</th>
                        <th className="pb-3 font-medium">Leads</th>
                        <th className="pb-3 font-medium">Cost</th>
                        <th className="pb-3 font-medium">CPL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentData.map((item, index) => (
                        <tr key={index} className={`${isDark ? "text-gray-300" : "text-gray-700"} border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                          <td className="py-3 text-sm font-medium">{item.type}</td>
                          <td className="py-3 text-sm">{(item.views / 1000).toFixed(0)}K</td>
                          <td className="py-3 text-sm">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              item.engagement >= 15 ? (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600") :
                              item.engagement >= 8 ? (isDark ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600") :
                              (isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600")
                            }`}>
                              {item.engagement}%
                            </span>
                          </td>
                          <td className="py-3 text-sm font-medium text-green-500">{item.leads}</td>
                          <td className="py-3 text-sm">${(item.cost / 1000).toFixed(1)}K</td>
                          <td className="py-3 text-sm font-medium">
                            ${(item.cost / item.leads).toFixed(0)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ChartCard>
            </div>
          </section>

          {/* ============== PRESCRIPTIVE ANALYTICS ============== */}
          <section ref={prescriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={Lightbulb}
              title="Prescriptive Analytics"
              subtitle="What should we do? - AI-powered recommendations for growth"
              color={chartColors.green}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className={`rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>AI Action Recommendations</h3>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Prioritized by revenue impact</p>
                  </div>
                  <ChartInfoButton
                    title="AI Recommendations"
                    description="These actions are recommended by our AI based on current performance patterns, predicted outcomes, and estimated revenue impact."
                    howToRead={[
                      "High priority: Act this week",
                      "Medium priority: Plan for this month",
                      "Impact shows estimated revenue effect",
                      "Click each card for implementation details"
                    ]}
                    dataSource="Prescriptive AI analyzing all marketing data"
                    isDark={isDark}
                  />
                </div>
                <div className="space-y-4">
                  <RecommendationCard
                    priority="high"
                    title="Double Retargeting Budget"
                    description="411% ROI with lowest CPL ($35). Increase monthly budget from $18K to $36K to capture high-intent prospects."
                    impact="+$92K pipeline/month"
                    icon={Target}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="high"
                    title="Launch Webinar Series Q1"
                    description="Webinars show 467% ROI and highest engagement (35.8%). Plan monthly webinar calendar for Q1."
                    impact="+$145K pipeline/quarter"
                    icon={MessageSquare}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="medium"
                    title="Optimize MQL→SQL Handoff"
                    description="78% SQL acceptance vs 80% target. Implement lead scoring threshold of 70+ before sales handoff."
                    impact="+15% conversion rate"
                    icon={Users}
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
                    description="This calculator shows the combined revenue impact of implementing all AI recommendations. Values are based on historical campaign performance and predictive modeling."
                    howToRead={[
                      "Total projected impact shown at top",
                      "Progress bars show contribution by initiative",
                      "Pipeline Increase: Additional qualified opportunities",
                      "CAC Reduction: Lower acquisition costs",
                      "Conversion Lift: Better lead-to-customer rates"
                    ]}
                    dataSource="Financial modeling based on historical campaign data"
                    isDark={isDark}
                  />
                </div>
                <div className={`p-6 rounded-xl ${isDark ? "bg-gradient-to-br from-pink-600 to-gray-800" : "bg-gradient-to-br from-pink-500 to-pink-600"} text-white`}>
                  <div className="text-center mb-6">
                    <p className="text-white/70 text-sm">Total Projected Annual Impact</p>
                    <p className="text-4xl font-bold mt-2">$2.4M</p>
                    <p className="text-white/70 text-sm mt-1">ROI: 385% on marketing spend</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Pipeline Increase", value: "$1.2M", percent: 80 },
                      { label: "CAC Reduction", value: "$520K", percent: 55 },
                      { label: "Conversion Rate Lift", value: "$480K", percent: 50 },
                      { label: "Content ROI Gains", value: "$200K", percent: 35 },
                    ].map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-white/80">{metric.label}</span>
                          <span className="font-semibold">{metric.value}</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white rounded-full"
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
                  Ready to Supercharge Your Marketing ROI?
                </h2>
                <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                  Get full-funnel visibility with attribution modeling, predictive lead scoring, and AI optimization.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-600 transition-colors"
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
          <footer className={`py-6 mt-8 -mx-6 px-6 ${isDark ? "bg-gray-800" : "bg-pink-600"} text-white`}>
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
