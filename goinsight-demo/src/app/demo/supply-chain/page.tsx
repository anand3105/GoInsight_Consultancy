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
  Truck,
  Package,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
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
  Warehouse,
  Ship,
  Plane,
  Globe,
  Timer,
  DollarSign,
  AlertCircle,
  Target,
  Boxes,
  Route,
  Fuel,
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

// Inventory Turnover Data
const inventoryData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  turnover: [4.2, 4.5, 4.3, 4.8, 5.1, 4.9, 5.2, 5.4, 5.1, 5.6, 5.8, 6.0],
  target: [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.5, 5.5, 5.5, 5.5, 6.0, 6.0],
  stockouts: [12, 8, 15, 6, 4, 7, 3, 5, 4, 2, 3, 2],
};

// On-Time Delivery Data
const deliveryData = {
  weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
  onTime: [92, 94, 91, 95, 93, 96, 94, 97, 95, 96, 97, 98],
  early: [3, 2, 4, 2, 3, 1, 3, 1, 2, 2, 1, 1],
  late: [5, 4, 5, 3, 4, 3, 3, 2, 3, 2, 2, 1],
};

// Warehouse Distribution Data
const warehouseData = [
  { id: 0, value: 35, label: "North Region", color: chartColors.teal },
  { id: 1, value: 28, label: "South Region", color: chartColors.blue },
  { id: 2, value: 22, label: "East Region", color: chartColors.purple },
  { id: 3, value: 15, label: "West Region", color: chartColors.orange },
];

// Transportation Mode Data
const transportModeData = [
  { mode: "Road", cost: 45, time: 3.5, reliability: 92, volume: 58 },
  { mode: "Rail", cost: 28, time: 5.2, reliability: 88, volume: 22 },
  { mode: "Sea", cost: 15, time: 21, reliability: 95, volume: 15 },
  { mode: "Air", cost: 120, time: 0.5, reliability: 99, volume: 5 },
];

// Supplier Performance Data
const supplierData = [
  { name: "Supplier A", onTime: 98, quality: 99.2, cost: 92, flexibility: 85 },
  { name: "Supplier B", onTime: 94, quality: 97.5, cost: 88, flexibility: 92 },
  { name: "Supplier C", onTime: 91, quality: 98.8, cost: 95, flexibility: 78 },
  { name: "Supplier D", onTime: 88, quality: 96.5, cost: 98, flexibility: 82 },
  { name: "Supplier E", onTime: 96, quality: 99.5, cost: 85, flexibility: 90 },
];

// Lead Time Data
const leadTimeData = {
  categories: ["Order Processing", "Manufacturing", "Quality Check", "Packaging", "Transit", "Customs"],
  actual: [1.2, 4.5, 0.8, 0.5, 3.2, 1.5],
  target: [1.0, 4.0, 0.5, 0.5, 3.0, 1.0],
};

// Freight Cost Trend
const freightCostData = {
  months: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  perUnit: [2.45, 2.52, 2.38, 2.41, 2.35, 2.28],
  total: [245000, 278000, 262000, 285000, 295000, 310000],
};

// Demand Forecast Data
const demandForecastData = {
  weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
  actual: [12500, 13200, 12800, 14500, null, null, null, null],
  predicted: [null, null, null, 14500, 15200, 14800, 15600, 16200],
  lower: [null, null, null, 14500, 14400, 13800, 14200, 14800],
  upper: [null, null, null, 14500, 16000, 15800, 17000, 17600],
};

// Risk Assessment Data
const riskData = [
  { risk: "Supplier Disruption", probability: 35, impact: 85, score: 30, mitigation: "Multi-source" },
  { risk: "Demand Volatility", probability: 65, impact: 60, score: 39, mitigation: "Safety stock" },
  { risk: "Transit Delays", probability: 45, impact: 55, score: 25, mitigation: "Buffer time" },
  { risk: "Quality Issues", probability: 20, impact: 75, score: 15, mitigation: "Inspection" },
  { risk: "Cost Fluctuation", probability: 55, impact: 50, score: 28, mitigation: "Hedging" },
];

// KPI Sparkline Data
const kpiSparklines = {
  otif: [89, 91, 90, 93, 92, 94, 93, 95, 94, 96, 97, 98],
  inventory: [4.2, 4.5, 4.3, 4.8, 5.1, 4.9, 5.2, 5.4, 5.1, 5.6, 5.8, 6.0],
  leadTime: [14, 13.5, 14.2, 13.8, 13.2, 12.8, 12.5, 12.2, 11.8, 11.5, 11.2, 11.0],
  costPerUnit: [2.65, 2.58, 2.52, 2.48, 2.45, 2.52, 2.38, 2.41, 2.35, 2.28, 2.25, 2.22],
};

// Route Optimization Data
const routeData = [
  { route: "NYC → LA", current: 4.2, optimized: 3.8, savings: "$12K", fuel: "-15%" },
  { route: "Chicago → Miami", current: 2.8, optimized: 2.4, savings: "$8K", fuel: "-12%" },
  { route: "Seattle → Denver", current: 1.8, optimized: 1.5, savings: "$5K", fuel: "-18%" },
  { route: "Boston → Dallas", current: 3.5, optimized: 3.0, savings: "$10K", fuel: "-14%" },
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
              <div className="p-1.5 rounded-lg bg-teal-100">
                <Lock className="w-3.5 h-3.5 text-teal-600" />
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
                    isDark ? "bg-teal-500/20" : "bg-teal-500/10"
                  }`}>
                    <Info className="w-5 h-5 text-teal-500" />
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
                          isDark ? "bg-teal-500/20 text-teal-400" : "bg-teal-500/10 text-teal-500"
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
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: any;
  sparklineData: number[];
  isDark: boolean;
  unit?: string;
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
        isDark ? "bg-teal-500/20" : "bg-teal-500/10"
      }`}>
        <Icon className="w-6 h-6 text-teal-500" />
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
      {value}<span className="text-sm font-normal ml-1">{unit}</span>
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

export default function SupplyChainDashboard() {
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

  // Radar Chart Options (Supplier Comparison)
  const radarChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "radar", height: 350 },
    colors: [chartColors.teal, chartColors.blue, chartColors.purple, chartColors.orange, chartColors.green],
    xaxis: { categories: ["On-Time", "Quality", "Cost", "Flexibility"] },
    yaxis: { show: false, max: 100 },
    legend: { ...apexTheme.legend, position: "bottom" },
    markers: { size: 4 },
    fill: { opacity: 0.2 },
  };

  const radarChartSeries = supplierData.map(supplier => ({
    name: supplier.name,
    data: [supplier.onTime, supplier.quality, supplier.cost, supplier.flexibility],
  }));

  // Demand Forecast Chart Options
  const demandForecastOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "area", height: 280 },
    colors: [chartColors.teal, chartColors.cyan],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 5] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    xaxis: { ...apexTheme.xaxis, categories: demandForecastData.weeks },
    yaxis: { ...apexTheme.yaxis, labels: { ...apexTheme.yaxis.labels, formatter: (val: number) => `${(val / 1000).toFixed(0)}K` } },
  };

  // Lead Time Comparison Chart Options
  const leadTimeOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "bar", height: 280 },
    colors: [chartColors.teal, chartColors.cyan],
    plotOptions: { bar: { horizontal: true, barHeight: '60%', dataLabels: { position: 'top' } } },
    dataLabels: { enabled: false },
    xaxis: { ...apexTheme.xaxis, categories: leadTimeData.categories },
    yaxis: { ...apexTheme.yaxis, labels: { ...apexTheme.yaxis.labels } },
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
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <DemoSidebar
        activeDomain="supply-chain"
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300">
        {/* Top Navigation */}
        <nav className={`sticky top-0 z-30 shadow-lg ${isDark ? "bg-gray-800" : "bg-teal-600"}`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Image src="/Go-Insight-White_logo.png" alt="GoInsight" width={100} height={28} className="h-7 w-auto" />
                <div className="h-6 w-px bg-white/20" />
                <span className="text-white font-medium">Supply Chain Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
                  <Calendar className="w-4 h-4" />{dateRange}
                </div>
                <ToolbarTooltip title="Advanced Filters" description="Apply multi-dimensional filters across all visualizations. Filter by suppliers, regions, transportation modes, and warehouses.">
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
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-teal-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-default">
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-teal-500/20" : "bg-teal-500/10"}`}>
                  <Truck className="w-7 h-7 text-teal-500" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>
                    Supply Chain Analytics Dashboard
                  </h1>
                  <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                    End-to-end visibility across 4 warehouses, 5 suppliers, and 12 distribution routes | Updated hourly
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>
                <Clock className="w-4 h-4" />
                Last updated: 15 minutes ago
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 py-6 space-y-8">
          {/* KPI Cards with Sparklines */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="OTIF (On-Time In-Full)"
              value="98.2"
              unit="%"
              change="+3.8%"
              changeType="positive"
              icon={CheckCircle2}
              sparklineData={kpiSparklines.otif}
              isDark={isDark}
            />
            <KPICard
              title="Inventory Turnover"
              value="6.0"
              unit="x/year"
              change="+14.3%"
              changeType="positive"
              icon={Boxes}
              sparklineData={kpiSparklines.inventory}
              isDark={isDark}
            />
            <KPICard
              title="Avg. Lead Time"
              value="11.0"
              unit="days"
              change="-21.4%"
              changeType="positive"
              icon={Timer}
              sparklineData={kpiSparklines.leadTime}
              isDark={isDark}
            />
            <KPICard
              title="Cost Per Unit"
              value="$2.22"
              unit=""
              change="-16.2%"
              changeType="positive"
              icon={DollarSign}
              sparklineData={kpiSparklines.costPerUnit}
              isDark={isDark}
            />
          </div>

          {/* ============== DESCRIPTIVE ANALYTICS ============== */}
          <section ref={descriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={BarChart3}
              title="Descriptive Analytics"
              subtitle="What happened? - Historical supply chain performance and inventory analysis"
              color={chartColors.blue}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Inventory Turnover Trend - MUI Line Chart */}
              <ChartCard
                title="Inventory Turnover & Stockouts"
                subtitle="Monthly turnover rate vs target and stockout incidents"
                infoTitle="Inventory Turnover Analysis"
                infoDescription="This chart tracks inventory turnover ratio (how many times inventory is sold/replaced per year) against stockout incidents. Higher turnover with fewer stockouts indicates optimal inventory management."
                infoHowToRead={[
                  "Teal line shows inventory turnover ratio",
                  "Higher turnover = more efficient inventory use",
                  "Blue line represents the target turnover",
                  "Bars show stockout incidents (lower is better)",
                  "Goal: High turnover with zero stockouts"
                ]}
                infoDataSource="WMS (Warehouse Management System) and ERP inventory data"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <LineChart
                  height={350}
                  series={[
                    { data: inventoryData.turnover, label: "Turnover Rate", color: chartColors.teal },
                    { data: inventoryData.target, label: "Target", color: chartColors.blue },
                  ]}
                  xAxis={[{ data: inventoryData.months, scaleType: "point" }]}
                  yAxis={[{ valueFormatter: (v: number) => `${v}x` }]}
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

              {/* Warehouse Distribution - MUI Pie Chart */}
              <ChartCard
                title="Inventory by Warehouse"
                subtitle="Distribution of stock across regional warehouses"
                infoTitle="Warehouse Inventory Distribution"
                infoDescription="This pie chart shows how inventory is distributed across your regional warehouses. It helps identify imbalances and opportunities for rebalancing to meet regional demand."
                infoHowToRead={[
                  "Each segment represents a warehouse region",
                  "Larger segments indicate more inventory",
                  "North Region holds the most stock (35%)",
                  "Compare with regional demand patterns",
                  "Rebalance if distribution doesn't match demand"
                ]}
                infoDataSource="WMS real-time inventory counts across all locations"
                isDark={isDark}
              >
                <PieChart
                  height={300}
                  series={[{
                    data: warehouseData,
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

            {/* Second Row - Delivery Performance and Transport Modes */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Delivery Performance - MUI Bar Chart */}
              <ChartCard
                title="On-Time Delivery Performance"
                subtitle="Weekly delivery status breakdown"
                infoTitle="Delivery Performance Tracking"
                infoDescription="This stacked bar chart shows delivery performance by week, breaking down shipments into on-time, early, and late categories."
                infoHowToRead={[
                  "Green bars show on-time deliveries (%)",
                  "Blue bars show early deliveries (%)",
                  "Red/orange bars show late deliveries (%)",
                  "Goal: Maximize green, minimize late",
                  "Trend shows improvement over 12 weeks"
                ]}
                infoDataSource="TMS (Transportation Management System) delivery confirmations"
                isDark={isDark}
              >
                <BarChart
                  height={280}
                  series={[
                    { data: deliveryData.onTime, label: "On-Time", color: chartColors.green, stack: 'delivery' },
                    { data: deliveryData.early, label: "Early", color: chartColors.blue, stack: 'delivery' },
                    { data: deliveryData.late, label: "Late", color: chartColors.red, stack: 'delivery' },
                  ]}
                  xAxis={[{ data: deliveryData.weeks, scaleType: "band" }]}
                  yAxis={[{ valueFormatter: (v: number) => `${v}%` }]}
                  sx={{
                    '.MuiChartsAxis-tickLabel': { fill: isDark ? '#E5E7EB' : '#374151', fontSize: 10 },
                    '.MuiChartsAxis-tickLabel tspan': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-label': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-series text': { fill: isDark ? '#E5E7EB' : '#374151' },
                  }}
                />
              </ChartCard>

              {/* Transportation Mode Analysis */}
              <ChartCard
                title="Transportation Mode Comparison"
                subtitle="Cost, time, reliability, and volume by mode"
                infoTitle="Transport Mode Analysis"
                infoDescription="This table compares different transportation modes across key metrics: cost per unit, transit time, reliability, and volume share."
                infoHowToRead={[
                  "Cost: Lower is better ($/unit)",
                  "Time: Days in transit (lower is better)",
                  "Reliability: % of on-time deliveries",
                  "Volume: Share of total shipments",
                  "Balance cost vs speed based on product needs"
                ]}
                infoDataSource="TMS and freight billing systems"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {transportModeData.map((mode, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {mode.mode === "Road" && <Truck className="w-4 h-4 text-teal-500" />}
                          {mode.mode === "Rail" && <Package className="w-4 h-4 text-blue-500" />}
                          {mode.mode === "Sea" && <Ship className="w-4 h-4 text-purple-500" />}
                          {mode.mode === "Air" && <Plane className="w-4 h-4 text-orange-500" />}
                          <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                            {mode.mode}
                          </span>
                        </div>
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{mode.volume}% volume</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Cost/Unit</p>
                          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>${mode.cost}</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Transit</p>
                          <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>{mode.time}d</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Reliability</p>
                          <p className={`text-sm font-semibold ${mode.reliability >= 95 ? "text-green-500" : mode.reliability >= 90 ? "text-yellow-500" : "text-red-500"}`}>
                            {mode.reliability}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </section>

          {/* ============== DIAGNOSTIC ANALYTICS ============== */}
          <section ref={diagnosticRef} className="scroll-mt-20">
            <SectionHeader
              icon={PieChartIcon}
              title="Diagnostic Analytics"
              subtitle="Why did it happen? - Root cause analysis and supplier performance"
              color={chartColors.purple}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Supplier Performance Radar - ApexCharts */}
              <ChartCard
                title="Supplier Performance Comparison"
                subtitle="Multi-dimensional analysis across 5 key suppliers"
                infoTitle="Supplier Performance Radar"
                infoDescription="This radar chart compares all suppliers across 4 key metrics: On-Time Delivery, Quality, Cost Competitiveness, and Flexibility. It reveals each supplier's strengths and weaknesses."
                infoHowToRead={[
                  "Each colored shape represents one supplier",
                  "Points further from center = better performance",
                  "Ideal shape: large and balanced",
                  "Supplier E shows best overall performance",
                  "Supplier D has best cost but lowest on-time delivery"
                ]}
                infoDataSource="Supplier scorecards and procurement system data"
                isDark={isDark}
              >
                <ApexChart options={radarChartOptions} series={radarChartSeries} type="radar" height={350} />
              </ChartCard>

              {/* Lead Time Breakdown - ApexCharts */}
              <ChartCard
                title="Lead Time Breakdown"
                subtitle="Actual vs target time for each supply chain stage"
                infoTitle="Lead Time Analysis"
                infoDescription="This horizontal bar chart breaks down total lead time into stages, comparing actual performance against targets. It identifies bottlenecks in your supply chain."
                infoHowToRead={[
                  "Teal bars show actual time per stage",
                  "Cyan bars show target time",
                  "Longer bars = more time consumed",
                  "Manufacturing is the biggest bottleneck",
                  "Customs clearance exceeding target by 50%"
                ]}
                infoDataSource="Order management and logistics tracking systems"
                isDark={isDark}
              >
                <ApexChart
                  options={leadTimeOptions}
                  series={[
                    { name: "Actual (days)", data: leadTimeData.actual },
                    { name: "Target (days)", data: leadTimeData.target },
                  ]}
                  type="bar"
                  height={280}
                />
              </ChartCard>
            </div>

            {/* KPI Gauges */}
            <div className="mt-6">
              <ChartCard
                title="Supply Chain Health Indicators"
                subtitle="Real-time performance against targets"
                infoTitle="Supply Chain KPI Gauges"
                infoDescription="These gauge charts show real-time performance of critical supply chain metrics against targets. Green indicates on-target, yellow needs attention, red is critical."
                infoHowToRead={[
                  "Needle position shows current value",
                  "Green (80-100%): Healthy, on target",
                  "Yellow (60-80%): Needs monitoring",
                  "Red (0-60%): Critical, requires action",
                  "Perfect Order Rate is the gold standard metric"
                ]}
                infoDataSource="Aggregated from TMS, WMS, and ERP systems"
                isDark={isDark}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Perfect Order Rate", value: 94, target: "Target: 95%" },
                    { label: "Fill Rate", value: 97, target: "Target: 98%" },
                    { label: "Supplier Quality", value: 98, target: "Target: 99%" },
                    { label: "Freight Accuracy", value: 92, target: "Target: 95%" },
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
                            fill: gauge.value >= 95 ? chartColors.green : gauge.value >= 85 ? chartColors.teal : chartColors.orange,
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
                    Automatically detected patterns and anomalies from supply chain data
                  </p>
                </div>
                <ChartInfoButton
                  title="AI Insights"
                  description="These insights are automatically generated by our AI engine that analyzes patterns, anomalies, and correlations in your supply chain data."
                  howToRead={[
                    "Green insights indicate positive trends",
                    "Yellow insights are warnings to monitor",
                    "Red insights need immediate attention",
                    "Each insight includes context and recommendations"
                  ]}
                  dataSource="Machine learning models analyzing 100+ data points"
                  isDark={isDark}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: TrendingUp, title: "OTIF Improving", desc: "98.2% OTIF - best quarter in 2 years", type: "positive" },
                  { icon: AlertTriangle, title: "Supplier D Alert", desc: "On-time delivery dropped to 88% - investigate", type: "warning" },
                  { icon: CheckCircle2, title: "Stockouts Down", desc: "Only 2 stockouts this month vs 12 last year", type: "positive" },
                  { icon: Globe, title: "Transit Delay Risk", desc: "Port congestion in Asia - expect 2-3 day delays", type: "critical" },
                ].map((insight, index) => (
                  <div key={index} className={`p-4 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        insight.type === "positive" ? (isDark ? "bg-green-900/50" : "bg-green-100") :
                        insight.type === "warning" ? (isDark ? "bg-yellow-900/50" : "bg-yellow-100") :
                        (isDark ? "bg-red-900/50" : "bg-red-100")
                      }`}>
                        <insight.icon className={`w-4 h-4 ${
                          insight.type === "positive" ? "text-green-500" :
                          insight.type === "warning" ? "text-yellow-500" : "text-red-500"
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
              subtitle="What will happen? - Demand forecasting and supply chain risk prediction"
              color={chartColors.cyan}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Demand Forecast */}
              <ChartCard
                title="Demand Forecast"
                subtitle="8-week prediction with confidence intervals"
                infoTitle="ML-Powered Demand Forecast"
                infoDescription="This chart shows predicted demand for the next 8 weeks using machine learning models trained on historical sales, seasonality, promotions, and external factors."
                infoHowToRead={[
                  "Solid teal line shows actual historical demand",
                  "Dashed cyan line shows ML predictions",
                  "Shaded area represents 95% confidence interval",
                  "Wider shading = more uncertainty",
                  "Use for inventory planning and procurement"
                ]}
                infoDataSource="Ensemble ML model: ARIMA + Prophet + Neural Networks"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <ApexChart
                  options={demandForecastOptions}
                  series={[
                    { name: "Actual", data: demandForecastData.actual },
                    { name: "Predicted", data: demandForecastData.predicted },
                  ]}
                  type="area"
                  height={280}
                />
              </ChartCard>

              {/* Supply Chain Risk Assessment */}
              <ChartCard
                title="Supply Chain Risk Assessment"
                subtitle="Probability × Impact scoring"
                infoTitle="Risk Assessment Matrix"
                infoDescription="AI-powered risk assessment evaluating probability and potential impact of supply chain disruptions. Higher scores indicate greater risk requiring mitigation."
                infoHowToRead={[
                  "Risk Score = Probability × Impact (normalized)",
                  "Red (30+): High risk, immediate action needed",
                  "Yellow (20-30): Medium risk, monitor closely",
                  "Green (<20): Low risk, standard monitoring",
                  "Mitigation column shows recommended strategy"
                ]}
                infoDataSource="Risk models using supplier data, news, weather, and geopolitics"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {riskData.map((item, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                          {item.risk}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.score >= 30 ? (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600") :
                          item.score >= 20 ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600") :
                          (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600")
                        }`}>
                          Score: {item.score}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>Probability: </span>
                          <span className={isDark ? "text-gray-300" : "text-gray-700"}>{item.probability}%</span>
                        </div>
                        <div>
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>Impact: </span>
                          <span className={isDark ? "text-gray-300" : "text-gray-700"}>{item.impact}%</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs">
                        <span className={isDark ? "text-gray-400" : "text-gray-500"}>Mitigation: </span>
                        <span className={`font-medium ${isDark ? "text-teal-400" : "text-teal-600"}`}>{item.mitigation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Route Optimization Forecast */}
            <div className="mt-6">
              <ChartCard
                title="Route Optimization Opportunities"
                subtitle="AI-identified savings through route optimization"
                infoTitle="Route Optimization Analysis"
                infoDescription="AI analyzes current routes and identifies optimization opportunities including shorter paths, better carriers, and consolidated shipments."
                infoHowToRead={[
                  "Current: Current transit time in days",
                  "Optimized: Predicted time after optimization",
                  "Savings: Estimated cost reduction",
                  "Fuel: Expected fuel consumption reduction",
                  "Higher savings = prioritize implementation"
                ]}
                infoDataSource="Route optimization AI using traffic, fuel, and carrier data"
                isDark={isDark}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-left text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        <th className="pb-3 font-medium">Route</th>
                        <th className="pb-3 font-medium">Current (days)</th>
                        <th className="pb-3 font-medium">Optimized (days)</th>
                        <th className="pb-3 font-medium">Cost Savings</th>
                        <th className="pb-3 font-medium">Fuel Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routeData.map((item, index) => (
                        <tr key={index} className={`${isDark ? "text-gray-300" : "text-gray-700"} border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                          <td className="py-3 text-sm font-medium flex items-center gap-2">
                            <Route className="w-4 h-4 text-teal-500" />
                            {item.route}
                          </td>
                          <td className="py-3 text-sm">{item.current}</td>
                          <td className="py-3 text-sm text-green-500 font-medium">{item.optimized}</td>
                          <td className="py-3 text-sm text-green-500 font-medium">{item.savings}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600"}`}>
                              {item.fuel}
                            </span>
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
              subtitle="What should we do? - AI-powered recommendations for supply chain optimization"
              color={chartColors.green}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className={`rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>AI Action Recommendations</h3>
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Prioritized by ROI and urgency</p>
                  </div>
                  <ChartInfoButton
                    title="AI Recommendations"
                    description="These actions are recommended by our AI based on current data patterns, predicted outcomes, and estimated ROI. Each is scored and ranked by potential business impact."
                    howToRead={[
                      "High priority (red): Act within 24-48 hours",
                      "Medium priority (yellow): Plan for this week",
                      "Impact shows estimated cost savings",
                      "Click each card for detailed implementation steps"
                    ]}
                    dataSource="Prescriptive AI engine analyzing all metrics"
                    isDark={isDark}
                  />
                </div>
                <div className="space-y-4">
                  <RecommendationCard
                    priority="high"
                    title="Diversify Asia Sourcing"
                    description="Port congestion risk high. Activate secondary supplier in Vietnam to reduce dependency on China ports by 30%."
                    impact="Avoid $450K delay costs"
                    icon={Globe}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="high"
                    title="Renegotiate with Supplier D"
                    description="On-time delivery at 88% vs contract SLA of 95%. Schedule performance review and penalty enforcement."
                    impact="Recover $125K in penalties"
                    icon={AlertTriangle}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="medium"
                    title="Implement Route Optimization"
                    description="AI analysis shows $35K monthly savings through route consolidation on 4 major corridors."
                    impact="$420K annual savings"
                    icon={Route}
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
                    description="This calculator shows the combined financial impact of implementing all AI recommendations. Values are based on historical data from similar initiatives and predictive modeling."
                    howToRead={[
                      "Total projected impact shown at top",
                      "Progress bars show contribution by category",
                      "Transportation: Route and carrier optimization",
                      "Inventory: Better stocking and turnover",
                      "Risk Mitigation: Avoided disruption costs"
                    ]}
                    dataSource="Financial modeling based on similar past initiatives"
                    isDark={isDark}
                  />
                </div>
                <div className={`p-6 rounded-xl ${isDark ? "bg-gradient-to-br from-teal-600 to-gray-800" : "bg-gradient-to-br from-teal-500 to-teal-600"} text-white`}>
                  <div className="text-center mb-6">
                    <p className="text-white/70 text-sm">Total Projected Annual Savings</p>
                    <p className="text-4xl font-bold mt-2">$1.95M</p>
                    <p className="text-white/70 text-sm mt-1">Payback period: 3.2 months</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Transportation Optimization", value: "$720K", percent: 75 },
                      { label: "Inventory Efficiency", value: "$485K", percent: 55 },
                      { label: "Supplier Consolidation", value: "$380K", percent: 45 },
                      { label: "Risk Mitigation", value: "$365K", percent: 40 },
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
                  Ready to Optimize Your Supply Chain?
                </h2>
                <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                  Get end-to-end visibility with demand forecasting, supplier analytics, and AI-powered optimization.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors"
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
          <footer className={`py-6 mt-8 -mx-6 px-6 ${isDark ? "bg-gray-800" : "bg-teal-600"} text-white`}>
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
