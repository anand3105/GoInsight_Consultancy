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
  Factory,
  Settings,
  Wrench,
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
  Cog,
  Gauge as GaugeIcon,
  Timer,
  Package,
  Cpu,
  Thermometer,
  Battery,
  AlertCircle,
  Target,
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

// OEE Components Data
const oeeData = {
  availability: 92,
  performance: 87,
  quality: 98.5,
  overall: 78.8, // 0.92 * 0.87 * 0.985 = 78.8%
};

// Production Volume Data
const productionData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  actual: [12500, 13200, 12800, 14100, 15200, 14800, 15600, 16200, 15900, 16800, 17200, 17800],
  target: [13000, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000],
  capacity: [18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000, 18000],
};

// Machine Performance Data
const machineData = [
  { id: "CNC-001", name: "CNC Lathe #1", uptime: 94, efficiency: 89, quality: 99.2, status: "running" },
  { id: "CNC-002", name: "CNC Mill #2", uptime: 88, efficiency: 85, quality: 98.8, status: "running" },
  { id: "INJ-001", name: "Injection Mold #1", uptime: 72, efficiency: 78, quality: 97.5, status: "warning" },
  { id: "ASM-001", name: "Assembly Line A", uptime: 96, efficiency: 92, quality: 99.5, status: "running" },
  { id: "PKG-001", name: "Packaging Unit", uptime: 91, efficiency: 88, quality: 99.8, status: "running" },
];

// Defect Analysis Data
const defectData = [
  { id: 0, value: 35, label: "Surface Defects", color: chartColors.red },
  { id: 1, value: 25, label: "Dimensional", color: chartColors.orange },
  { id: 2, value: 20, label: "Assembly Errors", color: chartColors.yellow },
  { id: 3, value: 12, label: "Material Flaws", color: chartColors.purple },
  { id: 4, value: 8, label: "Other", color: chartColors.blue },
];

// Downtime Analysis Data
const downtimeData = {
  categories: ["Mechanical", "Electrical", "Setup", "Material", "Quality", "Scheduled"],
  planned: [0, 0, 45, 0, 0, 120],
  unplanned: [35, 22, 0, 18, 12, 0],
};

// Shift Performance Data
const shiftData = {
  shifts: ["Morning (6AM-2PM)", "Afternoon (2PM-10PM)", "Night (10PM-6AM)"],
  output: [5800, 5200, 4600],
  efficiency: [94, 88, 82],
  defects: [12, 18, 28],
};

// Energy Consumption Data
const energyData = {
  months: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  consumption: [245000, 252000, 248000, 258000, 262000, 255000],
  costPerUnit: [0.48, 0.52, 0.49, 0.51, 0.54, 0.52],
};

// Maintenance Schedule Data
const maintenanceData = [
  { machine: "CNC Lathe #1", lastService: "2024-01-15", nextService: "2024-02-15", health: 85, risk: "low" },
  { machine: "CNC Mill #2", lastService: "2024-01-08", nextService: "2024-02-08", health: 72, risk: "medium" },
  { machine: "Injection Mold #1", lastService: "2023-12-20", nextService: "2024-01-20", health: 45, risk: "high" },
  { machine: "Assembly Line A", lastService: "2024-01-20", nextService: "2024-02-20", health: 92, risk: "low" },
];

// KPI Sparkline Data
const kpiSparklines = {
  oee: [72, 74, 76, 75, 78, 77, 79, 78, 80, 79, 78, 79],
  production: [12.5, 13.2, 12.8, 14.1, 15.2, 14.8, 15.6, 16.2, 15.9, 16.8, 17.2, 17.8],
  defectRate: [450, 420, 380, 350, 320, 310, 290, 280, 260, 250, 240, 235],
  cycleTime: [4.8, 4.6, 4.5, 4.4, 4.3, 4.2, 4.2, 4.1, 4.0, 4.0, 3.9, 3.9],
};

// Predictive Maintenance Scores
const predictiveMaintenanceData = [
  { component: "Spindle Motor A", health: 92, prediction: "4+ weeks", risk: "low" },
  { component: "Hydraulic Pump #2", health: 68, prediction: "2-3 weeks", risk: "medium" },
  { component: "Bearing Assembly C", health: 35, prediction: "3-5 days", risk: "high" },
  { component: "Drive Belt Unit", health: 78, prediction: "3-4 weeks", risk: "low" },
  { component: "Cooling System", health: 54, prediction: "1-2 weeks", risk: "medium" },
];

// Yield Forecast Data
const yieldForecastData = {
  weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
  actual: [97.2, 97.5, 97.8, 98.1, null, null, null, null],
  predicted: [null, null, null, 98.1, 98.3, 98.5, 98.6, 98.8],
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
              <div className="p-1.5 rounded-lg bg-orange-100">
                <Lock className="w-3.5 h-3.5 text-orange-600" />
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
                    isDark ? "bg-orange-500/20" : "bg-orange-500/10"
                  }`}>
                    <Info className="w-5 h-5 text-orange-500" />
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
                          isDark ? "bg-orange-500/20 text-orange-400" : "bg-orange-500/10 text-orange-500"
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
        isDark ? "bg-orange-500/20" : "bg-orange-500/10"
      }`}>
        <Icon className="w-6 h-6 text-orange-500" />
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

export default function ManufacturingDashboard() {
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

  // Radar Chart Options (Machine Comparison)
  const radarChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "radar", height: 350 },
    colors: [chartColors.orange, chartColors.blue, chartColors.green, chartColors.purple, chartColors.cyan],
    xaxis: { categories: ["Uptime", "Efficiency", "Quality"] },
    yaxis: { show: false, max: 100 },
    legend: { ...apexTheme.legend, position: "bottom" },
    markers: { size: 4 },
    fill: { opacity: 0.2 },
  };

  const radarChartSeries = machineData.map(machine => ({
    name: machine.name,
    data: [machine.uptime, machine.efficiency, machine.quality],
  }));

  // Heatmap Options (Shift Performance)
  const heatmapOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "heatmap", height: 200 },
    dataLabels: { enabled: true, style: { colors: [isDark ? "#fff" : "#000"] } },
    colors: ["#f97316"],
    xaxis: { categories: shiftData.shifts },
  };

  const heatmapSeries = [
    { name: "Output (K)", data: shiftData.output.map((v, i) => ({ x: shiftData.shifts[i], y: Math.round(v / 100) })) },
    { name: "Efficiency %", data: shiftData.efficiency.map((v, i) => ({ x: shiftData.shifts[i], y: v })) },
    { name: "Defects", data: shiftData.defects.map((v, i) => ({ x: shiftData.shifts[i], y: v })) },
  ];

  // Yield Forecast Chart Options
  const yieldForecastOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "area", height: 280 },
    colors: [chartColors.green, chartColors.cyan],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 5] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    xaxis: { ...apexTheme.xaxis, categories: yieldForecastData.weeks },
    yaxis: { ...apexTheme.yaxis, min: 96, max: 100, labels: { ...apexTheme.yaxis.labels, formatter: (val: number) => `${val}%` } },
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
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <DemoSidebar
        activeDomain="manufacturing"
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300">
        {/* Top Navigation */}
        <nav className={`sticky top-0 z-30 shadow-lg ${isDark ? "bg-gray-800" : "bg-orange-600"}`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Image src="/Go-Insight-White_logo.png" alt="GoInsight" width={100} height={28} className="h-7 w-auto" />
                <div className="h-6 w-px bg-white/20" />
                <span className="text-white font-medium">Manufacturing Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
                  <Calendar className="w-4 h-4" />{dateRange}
                </div>
                <ToolbarTooltip title="Advanced Filters" description="Apply multi-dimensional filters across all visualizations. Filter by production lines, shifts, equipment types, and product categories.">
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
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-orange-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-default">
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-orange-500/20" : "bg-orange-500/10"}`}>
                  <Factory className="w-7 h-7 text-orange-500" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>
                    Manufacturing Analytics Dashboard
                  </h1>
                  <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                    Real-time production insights from 5 machines across 3 production lines | Updated every 5 minutes
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>
                <Clock className="w-4 h-4" />
                Last updated: 2 minutes ago
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-6 py-6 space-y-8">
          {/* KPI Cards with Sparklines */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard
              title="Overall Equipment Effectiveness"
              value="78.8"
              unit="%"
              change="+4.2%"
              changeType="positive"
              icon={GaugeIcon}
              sparklineData={kpiSparklines.oee}
              isDark={isDark}
            />
            <KPICard
              title="Monthly Production"
              value="17.8K"
              unit="units"
              change="+8.5%"
              changeType="positive"
              icon={Package}
              sparklineData={kpiSparklines.production}
              isDark={isDark}
            />
            <KPICard
              title="Defect Rate (PPM)"
              value="235"
              unit="PPM"
              change="-12.3%"
              changeType="positive"
              icon={Target}
              sparklineData={kpiSparklines.defectRate}
              isDark={isDark}
            />
            <KPICard
              title="Average Cycle Time"
              value="3.9"
              unit="min"
              change="-8.2%"
              changeType="positive"
              icon={Timer}
              sparklineData={kpiSparklines.cycleTime}
              isDark={isDark}
            />
          </div>

          {/* ============== DESCRIPTIVE ANALYTICS ============== */}
          <section ref={descriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={BarChart3}
              title="Descriptive Analytics"
              subtitle="What happened? - Historical production performance and output analysis"
              color={chartColors.blue}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Production Trend - MUI Line Chart */}
              <ChartCard
                title="Production Volume Trend"
                subtitle="Monthly output vs target vs capacity"
                infoTitle="Production Volume Analysis"
                infoDescription="This chart tracks monthly production output against targets and maximum capacity. It helps identify production trends, seasonal patterns, and capacity utilization."
                infoHowToRead={[
                  "Orange line shows actual production volume",
                  "Blue line represents the monthly target",
                  "Gray line shows maximum capacity ceiling",
                  "Gap between actual and target indicates performance",
                  "Approaching capacity line signals need for expansion"
                ]}
                infoDataSource="MES (Manufacturing Execution System) - real-time production counts"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <LineChart
                  height={350}
                  series={[
                    { data: productionData.actual, label: "Actual", color: chartColors.orange },
                    { data: productionData.target, label: "Target", color: chartColors.blue },
                    { data: productionData.capacity, label: "Capacity", color: "#9CA3AF" },
                  ]}
                  xAxis={[{ data: productionData.months, scaleType: "point" }]}
                  yAxis={[{ valueFormatter: (v: number) => `${(v / 1000).toFixed(0)}K` }]}
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

              {/* Defect Distribution - MUI Pie Chart */}
              <ChartCard
                title="Defect Type Distribution"
                subtitle="Breakdown of quality issues by category"
                infoTitle="Defect Analysis Chart"
                infoDescription="This pie chart shows the distribution of defect types in your production. It helps prioritize quality improvement efforts by identifying the most common issues."
                infoHowToRead={[
                  "Each segment represents a defect category",
                  "Larger segments indicate more frequent issues",
                  "Surface defects are currently the biggest problem",
                  "Focus quality efforts on largest segments first",
                  "Track changes over time to measure improvement"
                ]}
                infoDataSource="Quality inspection system - automated + manual checks"
                isDark={isDark}
              >
                <PieChart
                  height={300}
                  series={[{
                    data: defectData,
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

            {/* Second Row - OEE Breakdown and Downtime */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* OEE Components - MUI Gauges */}
              <ChartCard
                title="OEE Component Breakdown"
                subtitle="Availability × Performance × Quality = OEE"
                infoTitle="OEE Components"
                infoDescription="OEE (Overall Equipment Effectiveness) is the gold standard for measuring manufacturing productivity. It combines three factors: Availability, Performance, and Quality."
                infoHowToRead={[
                  "Availability: % time machine was running (vs downtime)",
                  "Performance: Actual speed vs theoretical max speed",
                  "Quality: Good units vs total units (first pass yield)",
                  "OEE = Availability × Performance × Quality",
                  "World-class OEE is typically 85%+"
                ]}
                infoDataSource="PLC/SCADA systems with real-time machine monitoring"
                isDark={isDark}
              >
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Availability", value: oeeData.availability, target: "Target: 95%" },
                    { label: "Performance", value: oeeData.performance, target: "Target: 90%" },
                    { label: "Quality", value: oeeData.quality, target: "Target: 99%" },
                    { label: "Overall OEE", value: oeeData.overall, target: "Target: 85%" },
                  ].map((gauge, index) => (
                    <div key={index} className="text-center">
                      <Gauge
                        value={gauge.value}
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
                            fill: gauge.value >= 85 ? chartColors.green : gauge.value >= 70 ? chartColors.orange : chartColors.red,
                          },
                          [`& .${gaugeClasses.referenceArc}`]: {
                            fill: isDark ? '#374151' : '#E5E7EB',
                          },
                        }}
                      />
                      <p className={`text-xs font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{gauge.label}</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{gauge.target}</p>
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* Downtime Analysis - MUI Bar Chart */}
              <ChartCard
                title="Downtime Analysis"
                subtitle="Planned vs unplanned downtime by category (minutes)"
                infoTitle="Downtime Breakdown"
                infoDescription="This chart shows equipment downtime categorized by cause and whether it was planned (scheduled maintenance) or unplanned (breakdowns, issues)."
                infoHowToRead={[
                  "Orange bars show unplanned downtime (losses)",
                  "Teal bars show planned/scheduled downtime",
                  "Unplanned downtime is the key metric to reduce",
                  "Mechanical failures are the biggest unplanned loss",
                  "Goal: Convert unplanned to planned through preventive maintenance"
                ]}
                infoDataSource="Machine logs and maintenance management system"
                isDark={isDark}
              >
                <BarChart
                  height={250}
                  series={[
                    { data: downtimeData.unplanned, label: "Unplanned", color: chartColors.orange },
                    { data: downtimeData.planned, label: "Planned", color: chartColors.teal },
                  ]}
                  xAxis={[{ data: downtimeData.categories, scaleType: "band" }]}
                  yAxis={[{ valueFormatter: (v: number) => `${v}m` }]}
                  sx={{
                    '.MuiChartsAxis-tickLabel': { fill: isDark ? '#E5E7EB' : '#374151', fontSize: 10 },
                    '.MuiChartsAxis-tickLabel tspan': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-label': { fill: isDark ? '#E5E7EB' : '#374151' },
                    '.MuiChartsLegend-series text': { fill: isDark ? '#E5E7EB' : '#374151' },
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
              {/* Machine Performance Radar - ApexCharts */}
              <ChartCard
                title="Machine Performance Comparison"
                subtitle="Multi-dimensional analysis across all machines"
                infoTitle="Machine Performance Radar"
                infoDescription="This radar chart compares all machines across 3 key metrics: Uptime, Efficiency, and Quality. It reveals each machine's strengths and weaknesses at a glance."
                infoHowToRead={[
                  "Each colored shape represents one machine",
                  "Points further from center = better performance",
                  "Ideal shape: large and triangular (all metrics high)",
                  "Dips indicate areas needing attention",
                  "Injection Mold #1 shows lowest performance - investigate"
                ]}
                infoDataSource="Real-time machine telemetry and quality inspection data"
                isDark={isDark}
              >
                <ApexChart options={radarChartOptions} series={radarChartSeries} type="radar" height={350} />
              </ChartCard>

              {/* Machine Status Table */}
              <ChartCard
                title="Machine Status Overview"
                subtitle="Real-time status and performance metrics"
                infoTitle="Machine Status Dashboard"
                infoDescription="This table shows the current status and key metrics for each machine on the production floor. It enables quick identification of machines needing attention."
                infoHowToRead={[
                  "Green indicators = running normally",
                  "Yellow indicators = warning/attention needed",
                  "Red indicators = critical/down",
                  "Uptime below 85% needs investigation",
                  "Quality below 98% triggers root cause analysis"
                ]}
                infoDataSource="SCADA system with 5-second refresh rate"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {machineData.map((machine, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            machine.status === "running" ? "bg-green-500" :
                            machine.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                          }`} />
                          <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                            {machine.name}
                          </span>
                        </div>
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{machine.id}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Uptime</p>
                          <p className={`text-sm font-semibold ${
                            machine.uptime >= 90 ? "text-green-500" : machine.uptime >= 80 ? "text-yellow-500" : "text-red-500"
                          }`}>{machine.uptime}%</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Efficiency</p>
                          <p className={`text-sm font-semibold ${
                            machine.efficiency >= 85 ? "text-green-500" : machine.efficiency >= 75 ? "text-yellow-500" : "text-red-500"
                          }`}>{machine.efficiency}%</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Quality</p>
                          <p className={`text-sm font-semibold ${
                            machine.quality >= 99 ? "text-green-500" : machine.quality >= 98 ? "text-yellow-500" : "text-red-500"
                          }`}>{machine.quality}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Shift Performance Heatmap */}
            <div className="mt-6">
              <ChartCard
                title="Shift Performance Analysis"
                subtitle="Comparing output, efficiency, and defects across shifts"
                infoTitle="Shift Performance Heatmap"
                infoDescription="This heatmap compares performance metrics across different shifts. It helps identify patterns and staffing/training needs by shift."
                infoHowToRead={[
                  "Darker colors indicate higher values",
                  "Morning shift shows highest output and efficiency",
                  "Night shift has highest defect rate - needs attention",
                  "Consider fatigue and lighting factors for night shift",
                  "Use for shift scheduling and resource allocation"
                ]}
                infoDataSource="Shift logs and production tracking system"
                isDark={isDark}
              >
                <ApexChart options={heatmapOptions} series={heatmapSeries} type="heatmap" height={200} />
              </ChartCard>
            </div>

            {/* AI Insights */}
            <div className={`mt-6 rounded-2xl p-6 shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`font-semibold ${isDark ? "text-white" : "text-brand-dark"}`}>AI-Generated Insights</h3>
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Automatically detected patterns and anomalies from production data
                  </p>
                </div>
                <ChartInfoButton
                  title="AI Insights"
                  description="These insights are automatically generated by our AI engine that analyzes patterns, anomalies, and correlations in your manufacturing data."
                  howToRead={[
                    "Green insights indicate positive trends to maintain",
                    "Yellow insights are warnings requiring monitoring",
                    "Red insights are critical issues needing immediate action",
                    "Each insight includes context and recommended action"
                  ]}
                  dataSource="Machine learning models analyzing 50+ data points"
                  isDark={isDark}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: TrendingUp, title: "OEE Improving", desc: "Up 4.2% this quarter, driven by reduced changeover time", type: "positive" },
                  { icon: AlertTriangle, title: "Injection Mold Alert", desc: "Machine #1 showing 20% efficiency drop - check hydraulics", type: "warning" },
                  { icon: CheckCircle2, title: "Quality Milestone", desc: "Achieved 99.5% first-pass yield on Assembly Line A", type: "positive" },
                  { icon: AlertCircle, title: "Night Shift Defects", desc: "3x defect rate vs morning - lighting/fatigue factors", type: "critical" },
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
              subtitle="What will happen? - ML-powered forecasting for maintenance and yield"
              color={chartColors.cyan}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Yield Forecast */}
              <ChartCard
                title="Yield Rate Forecast"
                subtitle="8-week prediction with ML confidence"
                infoTitle="ML-Powered Yield Forecast"
                infoDescription="This chart shows predicted yield rates for the next 8 weeks using machine learning models trained on historical production data, quality patterns, and equipment performance."
                infoHowToRead={[
                  "Solid green line shows actual historical yield",
                  "Dashed cyan line shows ML predictions",
                  "Yield trending upward = quality improving",
                  "Model predicts 98.8% yield in 8 weeks",
                  "Based on current improvement trajectory"
                ]}
                infoDataSource="Ensemble ML model: Random Forest + LSTM neural network"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <ApexChart
                  options={yieldForecastOptions}
                  series={[
                    { name: "Actual", data: yieldForecastData.actual },
                    { name: "Predicted", data: yieldForecastData.predicted },
                  ]}
                  type="area"
                  height={280}
                />
              </ChartCard>

              {/* Predictive Maintenance */}
              <ChartCard
                title="Predictive Maintenance"
                subtitle="Component health and failure predictions"
                infoTitle="Predictive Maintenance Scores"
                infoDescription="AI analyzes vibration, temperature, and performance data to predict when components will fail, enabling proactive maintenance before breakdowns occur."
                infoHowToRead={[
                  "Health score: 100 = new condition, 0 = failure imminent",
                  "Green (80+): Healthy, no action needed",
                  "Yellow (50-80): Monitor closely, plan maintenance",
                  "Red (<50): Schedule maintenance immediately",
                  "Prediction shows estimated time to failure"
                ]}
                infoDataSource="IoT sensors + predictive maintenance ML models"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {predictiveMaintenanceData.map((item, index) => (
                    <div key={index} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                          {item.component}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          item.risk === "low" ? (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600") :
                          item.risk === "medium" ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600") :
                          (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
                        }`}>
                          {item.prediction}
                        </span>
                      </div>
                      <div className={`h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                        <div
                          className={`h-full rounded-full transition-all ${
                            item.health >= 80 ? "bg-green-500" : item.health >= 50 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${item.health}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Health: {item.health}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Maintenance Schedule Forecast */}
            <div className="mt-6">
              <ChartCard
                title="Maintenance Schedule Forecast"
                subtitle="Upcoming maintenance based on predictive analysis"
                infoTitle="Maintenance Scheduling"
                infoDescription="This table shows the recommended maintenance schedule based on predictive models. It helps plan maintenance windows to minimize production disruption."
                infoHowToRead={[
                  "Last Service: Date of most recent maintenance",
                  "Next Service: Predicted optimal maintenance date",
                  "Health Score: Current equipment condition",
                  "Risk Level: Probability of failure before next maintenance",
                  "Red risk = schedule immediately to avoid breakdown"
                ]}
                infoDataSource="Maintenance management system + predictive models"
                isDark={isDark}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-left text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        <th className="pb-3 font-medium">Machine</th>
                        <th className="pb-3 font-medium">Last Service</th>
                        <th className="pb-3 font-medium">Next Service</th>
                        <th className="pb-3 font-medium">Health</th>
                        <th className="pb-3 font-medium">Risk</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      {maintenanceData.map((item, index) => (
                        <tr key={index} className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          <td className="py-2 text-sm font-medium">{item.machine}</td>
                          <td className="py-2 text-sm">{item.lastService}</td>
                          <td className="py-2 text-sm">{item.nextService}</td>
                          <td className="py-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-16 h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                                <div
                                  className={`h-full rounded-full ${
                                    item.health >= 80 ? "bg-green-500" : item.health >= 50 ? "bg-yellow-500" : "bg-red-500"
                                  }`}
                                  style={{ width: `${item.health}%` }}
                                />
                              </div>
                              <span className="text-xs">{item.health}%</span>
                            </div>
                          </td>
                          <td className="py-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              item.risk === "low" ? (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600") :
                              item.risk === "medium" ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600") :
                              (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
                            }`}>
                              {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
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
                    <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Prioritized by ROI and urgency</p>
                  </div>
                  <ChartInfoButton
                    title="AI Recommendations"
                    description="These actions are recommended by our AI based on current data patterns, predicted outcomes, and estimated ROI. Each is scored and ranked by potential business impact."
                    howToRead={[
                      "High priority (red): Act within 24-48 hours",
                      "Medium priority (yellow): Plan for this week",
                      "Impact shows estimated cost savings/revenue",
                      "Click each card for detailed implementation steps"
                    ]}
                    dataSource="Prescriptive AI engine analyzing all metrics"
                    isDark={isDark}
                  />
                </div>
                <div className="space-y-4">
                  <RecommendationCard
                    priority="high"
                    title="Emergency: Bearing Assembly C Replacement"
                    description="Predictive model indicates 85% probability of failure within 5 days. Schedule immediate replacement during next shift change."
                    impact="Avoid $180K unplanned downtime"
                    icon={Wrench}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="high"
                    title="Injection Mold #1: Hydraulic System Check"
                    description="20% efficiency drop detected. Likely cause: hydraulic pressure fluctuation. Schedule inspection within 48 hours."
                    impact="+12% efficiency = $45K/month"
                    icon={Settings}
                    isDark={isDark}
                  />
                  <RecommendationCard
                    priority="medium"
                    title="Night Shift Training Program"
                    description="Defect rate 3x higher on night shift. Implement refresher training on quality protocols and improve lighting in inspection area."
                    impact="-65% night shift defects"
                    icon={AlertTriangle}
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
                      "Downtime reduction: avoided production losses",
                      "Quality improvement: reduced scrap and rework",
                      "Energy savings: optimized machine operation"
                    ]}
                    dataSource="Financial modeling based on similar past initiatives"
                    isDark={isDark}
                  />
                </div>
                <div className={`p-6 rounded-xl ${isDark ? "bg-gradient-to-br from-orange-600 to-gray-800" : "bg-gradient-to-br from-orange-500 to-orange-600"} text-white`}>
                  <div className="text-center mb-6">
                    <p className="text-white/70 text-sm">Total Projected Annual Savings</p>
                    <p className="text-4xl font-bold mt-2">$2.85M</p>
                    <p className="text-white/70 text-sm mt-1">Payback period: 2.8 months</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Downtime Reduction", value: "$1.45M", percent: 85 },
                      { label: "Quality Improvement", value: "$820K", percent: 65 },
                      { label: "Energy Savings", value: "$380K", percent: 45 },
                      { label: "Labor Efficiency", value: "$200K", percent: 35 },
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
                  Ready to Optimize Your Manufacturing Operations?
                </h2>
                <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                  Get a customized analytics solution with OEE tracking, predictive maintenance, and AI-powered optimization.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
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
          <footer className={`py-6 mt-8 -mx-6 px-6 ${isDark ? "bg-gray-800" : "bg-orange-600"} text-white`}>
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
