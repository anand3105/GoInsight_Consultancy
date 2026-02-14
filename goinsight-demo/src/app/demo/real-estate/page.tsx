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
  Building2,
  Home,
  DollarSign,
  MapPin,
  Users,
  Key,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Brain,
  Lightbulb,
  Download,
  Share2,
  Filter,
  RefreshCw,
  Info,
  X,
  Clock,
  Percent,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Target,
  Building,
  Bed,
  Bath,
  Square,
  TrendingUp as TrendIcon,
  Landmark,
  Banknote,
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

// Portfolio Overview Data
const portfolioData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  value: [45.2, 45.8, 46.5, 47.2, 48.1, 49.0, 49.8, 50.5, 51.2, 52.0, 52.8, 53.5],
  noi: [2.8, 2.9, 2.85, 2.95, 3.0, 3.1, 3.05, 3.15, 3.2, 3.25, 3.3, 3.4],
  occupancy: [92, 93, 91, 94, 95, 94, 96, 95, 97, 96, 97, 98],
};

// Property Type Distribution
const propertyTypeData = [
  { id: 0, value: 38, label: "Residential", color: chartColors.blue },
  { id: 1, value: 28, label: "Commercial", color: chartColors.purple },
  { id: 2, value: 18, label: "Industrial", color: chartColors.orange },
  { id: 3, value: 10, label: "Retail", color: chartColors.green },
  { id: 4, value: 6, label: "Mixed Use", color: chartColors.pink },
];

// Regional Performance Data
const regionalData = [
  { region: "Metro City", properties: 24, value: 18.5, occupancy: 97, capRate: 5.8, appreciation: 8.2 },
  { region: "Downtown", properties: 18, value: 15.2, occupancy: 95, capRate: 5.2, appreciation: 9.5 },
  { region: "Suburbs East", properties: 15, value: 10.8, occupancy: 98, capRate: 6.5, appreciation: 6.8 },
  { region: "Suburbs West", properties: 12, value: 8.5, occupancy: 96, capRate: 6.2, appreciation: 7.2 },
  { region: "Industrial Park", properties: 8, value: 5.5, occupancy: 94, capRate: 7.5, appreciation: 5.5 },
];

// Lease Expiration Data
const leaseExpirationData = {
  years: ["2024", "2025", "2026", "2027", "2028+"],
  sqft: [125000, 180000, 220000, 95000, 280000],
  revenue: [3.2, 4.8, 5.8, 2.5, 7.2],
};

// Tenant Mix Data
const tenantMixData = [
  { tenant: "Tech Corp", sqft: 85000, rent: 2.1, expiry: "2026", health: "A" },
  { tenant: "RetailMax", sqft: 62000, rent: 1.5, expiry: "2025", health: "A" },
  { tenant: "FinanceHub", sqft: 48000, rent: 1.2, expiry: "2027", health: "A+" },
  { tenant: "HealthCo", sqft: 35000, rent: 0.9, expiry: "2024", health: "B+" },
  { tenant: "StartupInc", sqft: 22000, rent: 0.6, expiry: "2025", health: "B" },
];

// Market Comparison Data
const marketCompData = {
  metrics: ["Cap Rate", "Occupancy", "Rent PSF", "Appreciation", "NOI Growth"],
  portfolio: [5.8, 98, 42, 8.2, 6.5],
  market: [5.2, 94, 38, 6.5, 4.8],
};

// Maintenance & CapEx Data
const capexData = {
  quarters: ["Q1", "Q2", "Q3", "Q4"],
  planned: [450, 680, 520, 890],
  actual: [420, 720, 485, 0],
  roi: [12, 15, 18, 0],
};

// Valuation Forecast Data
const valuationForecastData = {
  years: ["2023", "2024", "2025", "2026", "2027", "2028"],
  actual: [45.2, 53.5, null, null, null, null],
  forecast: [null, 53.5, 58.2, 63.5, 69.2, 75.8],
};

// KPI Sparkline Data
const kpiSparklines = {
  portfolioValue: [45.2, 45.8, 46.5, 47.2, 48.1, 49.0, 49.8, 50.5, 51.2, 52.0, 52.8, 53.5],
  noi: [2.8, 2.9, 2.85, 2.95, 3.0, 3.1, 3.05, 3.15, 3.2, 3.25, 3.3, 3.4],
  occupancy: [92, 93, 91, 94, 95, 94, 96, 95, 97, 96, 97, 98],
  capRate: [5.5, 5.6, 5.5, 5.7, 5.6, 5.8, 5.7, 5.8, 5.9, 5.8, 5.9, 5.8],
};

// Investment Opportunities
const investmentOpportunities = [
  { property: "Metro Tower II", price: 12.5, capRate: 6.2, irr: 14.5, score: 92, status: "hot" },
  { property: "Suburb Plaza", price: 5.8, capRate: 7.1, irr: 16.2, score: 88, status: "hot" },
  { property: "Industrial Park E", price: 8.2, capRate: 7.8, irr: 15.8, score: 85, status: "warm" },
  { property: "Downtown Lofts", price: 15.5, capRate: 5.5, irr: 12.8, score: 78, status: "warm" },
];

// Risk Assessment Data
const riskData = [
  { risk: "Interest Rate Rise", probability: 65, impact: 75, score: 49, mitigation: "Fixed-rate financing" },
  { risk: "Tenant Default", probability: 25, impact: 60, score: 15, mitigation: "Diversified tenants" },
  { risk: "Market Downturn", probability: 35, impact: 85, score: 30, mitigation: "Long leases" },
  { risk: "Vacancy Spike", probability: 20, impact: 70, score: 14, mitigation: "Active marketing" },
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
              <div className="p-1.5 rounded-lg bg-indigo-100">
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
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
                    isDark ? "bg-indigo-500/20" : "bg-indigo-500/10"
                  }`}>
                    <Info className="w-5 h-5 text-indigo-500" />
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
                          isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-500/10 text-indigo-500"
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
        isDark ? "bg-indigo-500/20" : "bg-indigo-500/10"
      }`}>
        <Icon className="w-6 h-6 text-indigo-500" />
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

export default function RealEstateDashboard() {
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

  // Market Comparison Radar Chart
  const marketRadarOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "radar", height: 320 },
    colors: [chartColors.blue, chartColors.purple],
    xaxis: { categories: marketCompData.metrics },
    yaxis: { show: false },
    legend: { ...apexTheme.legend, position: "bottom" },
    markers: { size: 4 },
    fill: { opacity: 0.2 },
  };

  const marketRadarSeries = [
    { name: "Your Portfolio", data: marketCompData.portfolio },
    { name: "Market Average", data: marketCompData.market },
  ];

  // Valuation Forecast Chart
  const valuationForecastOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "area", height: 280 },
    colors: [chartColors.blue, chartColors.cyan],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 5] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    xaxis: { ...apexTheme.xaxis, categories: valuationForecastData.years },
    yaxis: { ...apexTheme.yaxis, labels: { ...apexTheme.yaxis.labels, formatter: (val: number) => `$${val}M` } },
  };

  // Lease Expiration Chart
  const leaseExpirationOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "bar", height: 280 },
    colors: [chartColors.blue, chartColors.green],
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 4 } },
    dataLabels: { enabled: false },
    xaxis: { ...apexTheme.xaxis, categories: leaseExpirationData.years },
    yaxis: [
      { ...apexTheme.yaxis, title: { text: 'Sq Ft (K)', style: { color: isDark ? '#E5E7EB' : '#374151' } }, labels: { ...apexTheme.yaxis.labels, formatter: (val: number) => `${(val / 1000).toFixed(0)}K` } },
      { ...apexTheme.yaxis, opposite: true, title: { text: 'Revenue ($M)', style: { color: isDark ? '#E5E7EB' : '#374151' } }, labels: { ...apexTheme.yaxis.labels, formatter: (val: number) => `$${val}M` } },
    ],
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
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <DemoSidebar
        activeDomain="real-estate"
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300">
        {/* Top Navigation */}
        <nav className={`sticky top-0 z-30 shadow-lg ${isDark ? "bg-gray-800" : "bg-indigo-600"}`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Image src="/Go-Insight-White_logo.png" alt="GoInsight" width={100} height={28} className="h-7 w-auto" />
                <div className="h-6 w-px bg-white/20" />
                <span className="text-white font-medium">Real Estate Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
                  <Calendar className="w-4 h-4" />{dateRange}
                </div>
                <ToolbarTooltip title="Advanced Filters" description="Apply multi-dimensional filters across all visualizations. Filter by property types, locations, tenant segments, and lease terms.">
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
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-indigo-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-default">
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-indigo-500/20" : "bg-indigo-500/10"}`}>
                  <Building2 className="w-7 h-7 text-indigo-500" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>
                    Real Estate Analytics Dashboard
                  </h1>
                  <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                    Portfolio overview across 77 properties, 5 regions, and 900K sq ft | Updated daily
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>
                <Clock className="w-4 h-4" />
                Last updated: Today, 9:00 AM
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 py-6 space-y-8">
          {/* KPI Cards with Sparklines */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="Portfolio Value"
              value="53.5M"
              prefix="$"
              change="+18.4%"
              changeType="positive"
              icon={Landmark}
              sparklineData={kpiSparklines.portfolioValue}
              isDark={isDark}
            />
            <KPICard
              title="Net Operating Income"
              value="3.4M"
              unit="/yr"
              prefix="$"
              change="+21.4%"
              changeType="positive"
              icon={Banknote}
              sparklineData={kpiSparklines.noi}
              isDark={isDark}
            />
            <KPICard
              title="Occupancy Rate"
              value="98"
              unit="%"
              change="+6.5%"
              changeType="positive"
              icon={Key}
              sparklineData={kpiSparklines.occupancy}
              isDark={isDark}
            />
            <KPICard
              title="Average Cap Rate"
              value="5.8"
              unit="%"
              change="+5.5%"
              changeType="positive"
              icon={Percent}
              sparklineData={kpiSparklines.capRate}
              isDark={isDark}
            />
          </div>

          {/* ============== DESCRIPTIVE ANALYTICS ============== */}
          <section ref={descriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={BarChart3}
              title="Descriptive Analytics"
              subtitle="What happened? - Historical portfolio performance and asset analysis"
              color={chartColors.blue}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Portfolio Value Trend - MUI Line Chart */}
              <ChartCard
                title="Portfolio Value & NOI Trend"
                subtitle="Monthly portfolio value and net operating income"
                infoTitle="Portfolio Performance Analysis"
                infoDescription="This chart tracks your total portfolio value and Net Operating Income (NOI) over time. It reveals wealth accumulation and income generation trends."
                infoHowToRead={[
                  "Blue line shows total portfolio value in $M",
                  "Teal line shows monthly NOI in $M",
                  "Upward trends indicate appreciation and income growth",
                  "Portfolio grew 18.4% YTD",
                  "NOI yield: NOI / Portfolio Value × 100"
                ]}
                infoDataSource="Property management system and appraisal data"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <LineChart
                  height={350}
                  series={[
                    { data: portfolioData.value, label: "Portfolio Value ($M)", color: chartColors.blue },
                    { data: portfolioData.noi.map(n => n * 10), label: "NOI ($M × 10)", color: chartColors.teal },
                  ]}
                  xAxis={[{ data: portfolioData.months, scaleType: "point" }]}
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

              {/* Property Type Distribution - MUI Pie Chart */}
              <ChartCard
                title="Property Type Mix"
                subtitle="Portfolio allocation by property type"
                infoTitle="Asset Class Distribution"
                infoDescription="This pie chart shows how your portfolio is diversified across different property types. Diversification reduces risk and provides exposure to different market cycles."
                infoHowToRead={[
                  "Each segment represents a property type",
                  "Residential leads at 38% of portfolio",
                  "Commercial provides stable long-term leases",
                  "Industrial showing strong appreciation",
                  "Consider rebalancing based on market outlook"
                ]}
                infoDataSource="Asset management database"
                isDark={isDark}
              >
                <PieChart
                  height={300}
                  series={[{
                    data: propertyTypeData,
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

            {/* Second Row - Regional Performance and Lease Expiration */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Regional Performance Table */}
              <ChartCard
                title="Regional Performance"
                subtitle="Key metrics by geographic region"
                infoTitle="Regional Analysis"
                infoDescription="This table compares performance across your geographic regions, showing property count, value, occupancy, cap rates, and appreciation."
                infoHowToRead={[
                  "Value: Total portfolio value in that region",
                  "Occupancy: % of leasable space occupied",
                  "Cap Rate: NOI / Property Value (higher = better yield)",
                  "Appreciation: YoY value increase",
                  "Downtown shows highest appreciation (9.5%)"
                ]}
                infoDataSource="Property management and appraisal systems"
                isDark={isDark}
              >
                <div className="space-y-3 max-h-[280px] overflow-y-auto">
                  {regionalData.map((region, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                            {region.region}
                          </span>
                        </div>
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {region.properties} properties
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Value</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>${region.value}M</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Occupancy</p>
                          <p className={`font-medium text-green-500`}>{region.occupancy}%</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Cap Rate</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{region.capRate}%</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Appreciation</p>
                          <p className={`font-medium text-green-500`}>+{region.appreciation}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* Lease Expiration - ApexCharts */}
              <ChartCard
                title="Lease Expiration Schedule"
                subtitle="Square footage and revenue by expiration year"
                infoTitle="Lease Maturity Analysis"
                infoDescription="This chart shows when leases expire, helping plan for renewals, re-leasing, or property repositioning. Understanding lease roll is critical for cash flow planning."
                infoHowToRead={[
                  "Blue bars show expiring square footage",
                  "Green bars show associated annual revenue",
                  "2026 has highest exposure ($5.8M)",
                  "Plan renewal discussions 12-18 months ahead",
                  "High 2024 expirations need immediate attention"
                ]}
                infoDataSource="Lease management database"
                isDark={isDark}
              >
                <ApexChart
                  options={leaseExpirationOptions}
                  series={[
                    { name: "Sq Ft", data: leaseExpirationData.sqft },
                    { name: "Revenue ($M)", data: leaseExpirationData.revenue },
                  ]}
                  type="bar"
                  height={280}
                />
              </ChartCard>
            </div>
          </section>

          {/* ============== DIAGNOSTIC ANALYTICS ============== */}
          <section ref={diagnosticRef} className="scroll-mt-20">
            <SectionHeader
              icon={PieChartIcon}
              title="Diagnostic Analytics"
              subtitle="Why did it happen? - Market comparison and tenant analysis"
              color={chartColors.purple}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Market Comparison Radar - ApexCharts */}
              <ChartCard
                title="Portfolio vs Market Benchmark"
                subtitle="Performance comparison against market averages"
                infoTitle="Market Benchmark Analysis"
                infoDescription="This radar chart compares your portfolio performance against market averages across key metrics. It reveals where you're outperforming or underperforming."
                infoHowToRead={[
                  "Blue area = Your portfolio performance",
                  "Purple area = Market average",
                  "Points further from center = better performance",
                  "You're beating market on all metrics",
                  "Biggest advantage: Occupancy (+4%) and NOI Growth (+1.7%)"
                ]}
                infoDataSource="Industry benchmarks and market research data"
                isDark={isDark}
              >
                <ApexChart options={marketRadarOptions} series={marketRadarSeries} type="radar" height={320} />
              </ChartCard>

              {/* Top Tenants Table */}
              <ChartCard
                title="Top Tenants Analysis"
                subtitle="Largest tenants by square footage and revenue"
                infoTitle="Tenant Concentration Analysis"
                infoDescription="This table shows your largest tenants, their lease terms, and financial health. Tenant concentration risk is critical for income stability."
                infoHowToRead={[
                  "Sq Ft: Space occupied by tenant",
                  "Rent: Annual rent in $M",
                  "Expiry: Lease expiration year",
                  "Health: Credit rating (A+ best)",
                  "Top 5 tenants = 45% of revenue - monitor concentration"
                ]}
                infoDataSource="Tenant portal and credit monitoring services"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {tenantMixData.map((tenant, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                          {tenant.tenant}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          tenant.health.startsWith("A") ? (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600") :
                          (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600")
                        }`}>
                          {tenant.health}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Sq Ft</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{(tenant.sqft / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Rent/Yr</p>
                          <p className={`font-medium text-green-500`}>${tenant.rent}M</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Expires</p>
                          <p className={`font-medium ${tenant.expiry === "2024" ? "text-red-500" : isDark ? "text-white" : "text-brand-dark"}`}>
                            {tenant.expiry}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* KPI Gauges */}
            <div className="mt-6">
              <ChartCard
                title="Portfolio Health Indicators"
                subtitle="Real-time performance against targets"
                infoTitle="Portfolio KPI Gauges"
                infoDescription="These gauges show real-time performance of critical real estate metrics against industry benchmarks and internal targets."
                infoHowToRead={[
                  "Debt Coverage: NOI / Debt Service (>1.25 healthy)",
                  "Break-even Occupancy: Min occupancy to cover costs",
                  "Expense Ratio: Operating expenses / Revenue",
                  "Tenant Retention: % of tenants renewing leases",
                  "All indicators in healthy range"
                ]}
                infoDataSource="Financial systems and property management"
                isDark={isDark}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Debt Coverage Ratio", value: 1.65, target: "Target: 1.25x", max: 2.5, display: "1.65x" },
                    { label: "Break-even Occupancy", value: 72, target: "Target: <75%", max: 100, display: "72%" },
                    { label: "Expense Ratio", value: 35, target: "Target: <40%", max: 100, display: "35%" },
                    { label: "Tenant Retention", value: 88, target: "Target: 85%", max: 100, display: "88%" },
                  ].map((gauge, index) => (
                    <div key={index} className="text-center">
                      <Gauge
                        value={gauge.value}
                        valueMax={gauge.max}
                        height={120}
                        startAngle={-110}
                        endAngle={110}
                        text={gauge.display}
                        sx={{
                          [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 18,
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
                            fill: chartColors.green,
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
                    Automatically detected patterns and opportunities from portfolio data
                  </p>
                </div>
                <ChartInfoButton
                  title="AI Insights"
                  description="These insights are automatically generated by our AI engine analyzing market trends, tenant behavior, and portfolio performance patterns."
                  howToRead={[
                    "Green insights indicate positive trends",
                    "Yellow insights are opportunities to capture",
                    "Red insights need immediate attention",
                    "Each insight includes actionable recommendations"
                  ]}
                  dataSource="Machine learning models analyzing market and portfolio data"
                  isDark={isDark}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: TrendingUp, title: "Value Growth", desc: "+18.4% YTD - outpacing market by 11.9%", type: "positive" },
                  { icon: AlertTriangle, title: "HealthCo Lease", desc: "Expires Q4 2024 - initiate renewal talks", type: "warning" },
                  { icon: CheckCircle2, title: "98% Occupancy", desc: "All-time high - premium rent opportunities", type: "positive" },
                  { icon: Building, title: "Industrial Surge", desc: "Industrial Park showing 7.5% cap rate - consider expansion", type: "opportunity" },
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
              subtitle="What will happen? - Valuation forecasts and investment opportunities"
              color={chartColors.cyan}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Valuation Forecast */}
              <ChartCard
                title="Portfolio Valuation Forecast"
                subtitle="5-year projection with ML confidence"
                infoTitle="ML-Powered Valuation Forecast"
                infoDescription="This chart shows predicted portfolio value for the next 5 years using machine learning models trained on historical appreciation, market trends, and economic indicators."
                infoHowToRead={[
                  "Solid blue line shows actual historical value",
                  "Dashed cyan line shows ML predictions",
                  "Portfolio projected to reach $75.8M by 2028",
                  "Annual appreciation: ~8% predicted",
                  "Model confidence: 85% for 3-year forecast"
                ]}
                infoDataSource="Ensemble ML model using market data and economic indicators"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <ApexChart
                  options={valuationForecastOptions}
                  series={[
                    { name: "Actual", data: valuationForecastData.actual },
                    { name: "Forecast", data: valuationForecastData.forecast },
                  ]}
                  type="area"
                  height={280}
                />
              </ChartCard>

              {/* Investment Opportunities */}
              <ChartCard
                title="AI-Ranked Investment Opportunities"
                subtitle="Properties scored by investment potential"
                infoTitle="Investment Scoring"
                infoDescription="AI analyzes market conditions, property metrics, and comparable sales to score investment opportunities. Higher scores indicate better risk-adjusted returns."
                infoHowToRead={[
                  "Score: 0-100 based on investment quality",
                  "Cap Rate: Annual NOI / Purchase Price",
                  "IRR: Projected internal rate of return",
                  "Hot: Score >85, act fast",
                  "Warm: Score 70-85, worth investigating"
                ]}
                infoDataSource="AI investment analysis using market comps"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {investmentOpportunities.map((opp, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                          {opp.property}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          opp.status === "hot" ? (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600") :
                          (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600")
                        }`}>
                          {opp.status === "hot" ? "🔥 Hot" : "Warm"}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-xs">
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Price</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>${opp.price}M</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Cap</p>
                          <p className={`font-medium text-green-500`}>{opp.capRate}%</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>IRR</p>
                          <p className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{opp.irr}%</p>
                        </div>
                        <div>
                          <p className={isDark ? "text-gray-400" : "text-gray-500"}>Score</p>
                          <p className={`font-medium ${opp.score >= 85 ? "text-green-500" : "text-blue-500"}`}>{opp.score}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Risk Assessment */}
            <div className="mt-6">
              <ChartCard
                title="Portfolio Risk Assessment"
                subtitle="Probability × Impact analysis with mitigation strategies"
                infoTitle="Risk Assessment Matrix"
                infoDescription="AI-powered risk assessment evaluating probability and potential impact of various portfolio risks. Higher scores indicate greater risk requiring mitigation."
                infoHowToRead={[
                  "Risk Score = Probability × Impact (normalized)",
                  "Red (40+): High risk, active mitigation needed",
                  "Yellow (20-40): Medium risk, monitor closely",
                  "Green (<20): Low risk, standard monitoring",
                  "Mitigation column shows your defense strategy"
                ]}
                infoDataSource="Risk models using market and economic data"
                isDark={isDark}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-left text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        <th className="pb-3 font-medium">Risk Factor</th>
                        <th className="pb-3 font-medium">Probability</th>
                        <th className="pb-3 font-medium">Impact</th>
                        <th className="pb-3 font-medium">Score</th>
                        <th className="pb-3 font-medium">Mitigation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskData.map((item, index) => (
                        <tr key={index} className={`${isDark ? "text-gray-300" : "text-gray-700"} border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                          <td className="py-3 text-sm font-medium">{item.risk}</td>
                          <td className="py-3 text-sm">{item.probability}%</td>
                          <td className="py-3 text-sm">{item.impact}%</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              item.score >= 40 ? (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600") :
                              item.score >= 20 ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600") :
                              (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600")
                            }`}>
                              {item.score}
                            </span>
                          </td>
                          <td className="py-3 text-sm font-medium text-indigo-500">{item.mitigation}</td>
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
              subtitle="What should we do? - AI-powered recommendations for portfolio optimization"
              color={chartColors.green}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className={`rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>AI Action Recommendations</h3>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Prioritized by ROI and risk</p>
                  </div>
                  <ChartInfoButton
                    title="AI Recommendations"
                    description="These actions are recommended by our AI based on market analysis, portfolio optimization models, and risk-adjusted return calculations."
                    howToRead={[
                      "High priority: Act within 30 days",
                      "Medium priority: Plan for this quarter",
                      "Impact shows estimated value or return effect",
                      "Click each card for detailed analysis"
                    ]}
                    dataSource="Prescriptive AI analyzing portfolio and market data"
                    isDark={isDark}
                  />
                </div>
                <div className="space-y-4">
                  <RecommendationCard
                    priority="high"
                    title="Acquire Metro Tower II"
                    description="Score 92, 6.2% cap rate, 14.5% IRR. Strategic location complements existing Metro City portfolio. Negotiate before Q1."
                    impact="+$2.1M annual NOI"
                    icon={Building}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="high"
                    title="Renew HealthCo Lease Early"
                    description="Current tenant expiring Q4 2024. B+ credit but long tenure. Offer 3% rent increase with 5-year extension."
                    impact="Secure $0.9M revenue"
                    icon={Key}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="medium"
                    title="Implement Rent Increases"
                    description="98% occupancy supports 5-8% rent bumps on renewals. Market rents have risen 12% while your portfolio averaged 6%."
                    impact="+$1.2M NOI/year"
                    icon={DollarSign}
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
                    description="This calculator shows the combined financial impact of implementing all AI recommendations over the next 3 years."
                    howToRead={[
                      "Total projected impact shown at top",
                      "Progress bars show contribution by initiative",
                      "Acquisitions: New property additions",
                      "NOI Growth: Income optimization",
                      "Appreciation: Value growth from improvements"
                    ]}
                    dataSource="Financial modeling based on comparable transactions"
                    isDark={isDark}
                  />
                </div>
                <div className={`p-6 rounded-xl ${isDark ? "bg-gradient-to-br from-indigo-600 to-gray-800" : "bg-gradient-to-br from-indigo-500 to-indigo-600"} text-white`}>
                  <div className="text-center mb-6">
                    <p className="text-white/70 text-sm">Total Projected 3-Year Impact</p>
                    <p className="text-4xl font-bold mt-2">$18.5M</p>
                    <p className="text-white/70 text-sm mt-1">Portfolio value increase: 34.6%</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Strategic Acquisitions", value: "$8.2M", percent: 85 },
                      { label: "NOI Growth (Rent Optimization)", value: "$4.8M", percent: 55 },
                      { label: "Market Appreciation", value: "$3.5M", percent: 45 },
                      { label: "CapEx ROI", value: "$2.0M", percent: 30 },
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
                  Ready to Maximize Your Real Estate Portfolio?
                </h2>
                <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                  Get comprehensive portfolio analytics with AI-powered valuations, risk assessment, and investment recommendations.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors"
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
          <footer className={`py-6 mt-8 -mx-6 px-6 ${isDark ? "bg-gray-800" : "bg-indigo-600"} text-white`}>
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
