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
  Heart,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Clock,
  Bed,
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  Brain,
  Lightbulb,
  Calendar,
  Pill,
  FileText,
  Download,
  Share2,
  Filter,
  RefreshCw,
  Info,
  X,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  Thermometer,
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

// Patient Volume Data
const patientVolumeData = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  inpatient: [145, 152, 148, 156, 161, 138, 132],
  outpatient: [320, 345, 310, 358, 372, 245, 198],
  emergency: [85, 92, 78, 88, 95, 112, 125],
};

// Department Performance
const departmentData = [
  { name: "Cardiology", satisfaction: 96, efficiency: 88, quality: 94 },
  { name: "Orthopedics", satisfaction: 92, efficiency: 85, quality: 91 },
  { name: "Neurology", satisfaction: 94, efficiency: 82, quality: 93 },
  { name: "Oncology", satisfaction: 95, efficiency: 86, quality: 95 },
  { name: "Pediatrics", satisfaction: 97, efficiency: 90, quality: 92 },
];

// Bed Occupancy
const bedOccupancyData = [
  { unit: "ICU", occupied: 18, total: 20, critical: 8 },
  { unit: "General Ward", occupied: 85, total: 100, critical: 12 },
  { unit: "Maternity", occupied: 22, total: 30, critical: 2 },
  { unit: "Pediatric", occupied: 28, total: 35, critical: 5 },
  { unit: "Surgical", occupied: 42, total: 50, critical: 15 },
];

// Wait Time Trends
const waitTimeData = {
  hours: ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
  er: [12, 18, 25, 32, 28, 22, 35, 28],
  outpatient: [8, 15, 22, 28, 25, 18, 12, 8],
  lab: [5, 12, 18, 22, 15, 10, 8, 5],
};

// Diagnosis Distribution
const diagnosisData = [
  { id: 0, value: 28, label: "Cardiovascular", color: chartColors.primary },
  { id: 1, value: 22, label: "Respiratory", color: chartColors.yellow },
  { id: 2, value: 18, label: "Orthopedic", color: chartColors.green },
  { id: 3, value: 15, label: "Gastrointestinal", color: chartColors.blue },
  { id: 4, value: 12, label: "Neurological", color: chartColors.purple },
  { id: 5, value: 5, label: "Other", color: "#9CA3AF" },
];

// Readmission Risk Data
const readmissionRiskData = [
  { id: "P-1247", name: "John D.", age: 72, condition: "CHF", risk: 85, factors: ["Age", "Multiple comorbidities", "Previous readmission"] },
  { id: "P-1298", name: "Maria S.", age: 65, condition: "COPD", risk: 72, factors: ["Smoking history", "Poor medication adherence"] },
  { id: "P-1312", name: "Robert K.", age: 58, condition: "Diabetes", risk: 68, factors: ["HbA1c > 9%", "Recent surgery"] },
  { id: "P-1356", name: "Susan L.", age: 81, condition: "Hip Fracture", risk: 62, factors: ["Age", "Lives alone"] },
];

// Staff Utilization
const staffData = [
  { role: "Physicians", current: 45, optimal: 50, utilization: 92 },
  { role: "Nurses", current: 180, optimal: 200, utilization: 95 },
  { role: "Technicians", current: 60, optimal: 65, utilization: 88 },
  { role: "Support Staff", current: 85, optimal: 90, utilization: 85 },
];

// Outcome Predictions
const outcomeData = [
  { metric: "Length of Stay", current: "4.2 days", predicted: "3.8 days", improvement: "-9.5%" },
  { metric: "Readmission Rate", current: "8.3%", predicted: "6.2%", improvement: "-25.3%" },
  { metric: "Patient Satisfaction", current: "94.2%", predicted: "96.5%", improvement: "+2.4%" },
  { metric: "Mortality Index", current: "0.85", predicted: "0.78", improvement: "-8.2%" },
];

// KPI Sparkline Data
const kpiSparklines = {
  satisfaction: [89, 90, 91, 92, 92, 93, 93, 94, 94, 94, 94, 94.2],
  occupancy: [82, 84, 85, 86, 85, 87, 86, 88, 87, 87, 86, 87],
  waitTime: [18, 17, 16, 15, 14, 13, 13, 12, 12, 12, 12, 12],
  readmission: [10.5, 10.2, 9.8, 9.5, 9.2, 8.8, 8.6, 8.5, 8.4, 8.3, 8.3, 8.3],
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
              <div className="p-1.5 rounded-lg bg-red-100">
                <Lock className="w-3.5 h-3.5 text-red-600" />
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
                    isDark ? "bg-red-500/20" : "bg-red-100"
                  }`}>
                    <Info className="w-5 h-5 text-red-500" />
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
                          isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600"
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
  color = "red",
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: any;
  sparklineData: number[];
  isDark: boolean;
  color?: string;
}) => {
  const colorMap: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
    red: { bg: "bg-red-100", text: "text-red-600", darkBg: "bg-red-500/20", darkText: "text-red-400" },
    blue: { bg: "bg-blue-100", text: "text-blue-600", darkBg: "bg-blue-500/20", darkText: "text-blue-400" },
    green: { bg: "bg-green-100", text: "text-green-600", darkBg: "bg-green-500/20", darkText: "text-green-400" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", darkBg: "bg-purple-500/20", darkText: "text-purple-400" },
  };
  const colors = colorMap[color] || colorMap.red;

  return (
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
          isDark ? colors.darkBg : colors.bg
        }`}>
          <Icon className={`w-6 h-6 ${isDark ? colors.darkText : colors.text}`} />
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
};

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

export default function HealthcareContent() {
  const [selectedDepartment, setSelectedDepartment] = useState("Cardiology");
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

  // Radar Chart for Department Performance
  const radarChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "radar", height: 300 },
    colors: [chartColors.green, chartColors.blue, chartColors.yellow],
    xaxis: { categories: departmentData.map(d => d.name) },
    yaxis: { show: false, max: 100 },
    markers: { size: 4 },
    fill: { opacity: 0.25 },
    stroke: { width: 2 },
    legend: { ...apexTheme.legend, position: "bottom" },
  };

  const radarChartSeries = [
    { name: "Satisfaction", data: departmentData.map(d => d.satisfaction) },
    { name: "Efficiency", data: departmentData.map(d => d.efficiency) },
    { name: "Quality", data: departmentData.map(d => d.quality) },
  ];

  // Heatmap for Wait Times
  const heatmapOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "heatmap", height: 250 },
    dataLabels: { enabled: true, style: { colors: [isDark ? "#fff" : "#000"] } },
    colors: ["#ef4444"],
    xaxis: { ...apexTheme.xaxis, categories: waitTimeData.hours },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 15, color: "#22c55e", name: "Low" },
            { from: 16, to: 25, color: "#ecc41a", name: "Medium" },
            { from: 26, to: 40, color: "#ef4444", name: "High" },
          ],
        },
      },
    },
  };

  const heatmapSeries = [
    { name: "ER", data: waitTimeData.er },
    { name: "Outpatient", data: waitTimeData.outpatient },
    { name: "Lab", data: waitTimeData.lab },
  ];

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
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <DemoSidebar
        activeDomain="healthcare"
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300">
        {/* Top Navigation */}
        <nav className={`sticky top-0 z-30 shadow-lg ${isDark ? "bg-gray-800" : "bg-gradient-to-r from-red-600 to-red-700"}`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Image src="/Go-Insight-White_logo.png" alt="GoInsight" width={100} height={28} className="h-7 w-auto" />
                <div className="h-6 w-px bg-white/20" />
                <span className="text-white font-medium">Healthcare Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Live Data
                </div>
                <ToolbarTooltip title="Advanced Filters" description="Apply multi-dimensional filters across all visualizations. Filter by departments, time periods, patient demographics, and care units.">
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
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-red-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-default">
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-red-500/20" : "bg-red-100"}`}>
                  <Heart className={`w-7 h-7 ${isDark ? "text-red-400" : "text-red-600"}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>
                    Healthcare Analytics Dashboard
                  </h1>
                  <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                    Patient-centric intelligence | 5 departments | Updated in real-time
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>
                <Clock className="w-4 h-4" />
                Last updated: Just now
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
              title="Patient Satisfaction"
              value="94.2%"
              change="+4.8%"
              changeType="positive"
              icon={Heart}
              sparklineData={kpiSparklines.satisfaction}
              isDark={isDark}
              color="red"
            />
            <KPICard
              title="Bed Occupancy"
              value="87%"
              change="+6%"
              changeType="positive"
              icon={Bed}
              sparklineData={kpiSparklines.occupancy}
              isDark={isDark}
              color="blue"
            />
            <KPICard
              title="Avg. Wait Time"
              value="12 min"
              change="-5 min"
              changeType="positive"
              icon={Clock}
              sparklineData={kpiSparklines.waitTime}
              isDark={isDark}
              color="green"
            />
            <KPICard
              title="Readmission Rate"
              value="8.3%"
              change="-2.1%"
              changeType="positive"
              icon={Activity}
              sparklineData={kpiSparklines.readmission}
              isDark={isDark}
              color="purple"
            />
          </div>

          {/* ============== DESCRIPTIVE ANALYTICS ============== */}
          <section ref={descriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={Activity}
              title="Descriptive Analytics"
              subtitle="What happened? - Real-time operational metrics and patient flow"
              color={chartColors.red}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Patient Volume - MUI Bar Chart */}
              <ChartCard
                title="Weekly Patient Volume"
                subtitle="Inpatient, outpatient, and emergency visits by day"
                infoTitle="Patient Volume Analysis"
                infoDescription="This stacked bar chart shows the distribution of patient visits across three categories for each day of the week."
                infoHowToRead={[
                  "Blue bars show inpatient admissions",
                  "Green bars show outpatient visits",
                  "Red bars indicate emergency cases",
                  "Weekends show higher emergency volume",
                  "Friday has highest overall traffic"
                ]}
                infoDataSource="Hospital admissions system, real-time patient tracking"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <BarChart
                  height={300}
                  series={[
                    { data: patientVolumeData.inpatient, label: "Inpatient", color: chartColors.primary },
                    { data: patientVolumeData.outpatient, label: "Outpatient", color: chartColors.green },
                    { data: patientVolumeData.emergency, label: "Emergency", color: chartColors.red },
                  ]}
                  xAxis={[{ data: patientVolumeData.days, scaleType: "band" }]}
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

              {/* Diagnosis Distribution - MUI Pie Chart */}
              <ChartCard
                title="Diagnosis Distribution"
                subtitle="Primary diagnoses by medical category"
                infoTitle="Diagnosis Breakdown"
                infoDescription="This donut chart shows the percentage distribution of primary diagnoses across major medical categories."
                infoHowToRead={[
                  "Cardiovascular conditions lead at 28%",
                  "Respiratory issues are second at 22%",
                  "Segment size indicates proportion of cases",
                  "Use for resource allocation planning",
                  "Track seasonal variations in conditions"
                ]}
                infoDataSource="EHR diagnosis codes, ICD-10 classification"
                isDark={isDark}
              >
                <PieChart
                  height={200}
                  series={[{
                    data: diagnosisData,
                    innerRadius: 45,
                    outerRadius: 80,
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
                  {diagnosisData.slice(0, 4).map((item) => (
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

            {/* Bed Occupancy & Wait Times */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Bed Occupancy */}
              <ChartCard
                title="Real-time Bed Occupancy"
                subtitle="Current bed status by hospital unit"
                infoTitle="Bed Occupancy Monitor"
                infoDescription="Shows current bed utilization across hospital units with critical patient indicators and capacity alerts."
                infoHowToRead={[
                  "Bar length shows occupied beds vs total",
                  "Red portion indicates critical patients",
                  "Warning icon appears at 90%+ occupancy",
                  "ICU at 90% requires immediate attention",
                  "Plan discharges to free capacity"
                ]}
                infoDataSource="Bed management system, nurse station updates"
                isDark={isDark}
              >
                <div className="space-y-4">
                  {bedOccupancyData.map((unit, index) => (
                    <div key={unit.unit}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{unit.unit}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>
                            {unit.occupied}/{unit.total}
                          </span>
                          {unit.occupied / unit.total > 0.9 && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                      <div className={`h-3 rounded-full overflow-hidden flex ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
                        <motion.div
                          className="h-full bg-brand-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${((unit.occupied - unit.critical) / unit.total) * 100}%` }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                        />
                        <motion.div
                          className="h-full bg-red-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(unit.critical / unit.total) * 100}%` }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>Critical: {unit.critical}</span>
                        <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          {Math.round((unit.occupied / unit.total) * 100)}% occupied
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* Wait Time Heatmap */}
              <ChartCard
                title="Wait Time Analysis"
                subtitle="Department wait times by hour (minutes)"
                infoTitle="Wait Time Heatmap"
                infoDescription="This heatmap visualizes wait times across departments throughout the day, helping identify peak congestion periods."
                infoHowToRead={[
                  "Green cells = Low wait (< 15 min)",
                  "Yellow cells = Medium wait (15-25 min)",
                  "Red cells = High wait (> 25 min)",
                  "ER peaks at 6PM with 35 min wait",
                  "Schedule staff for peak hours"
                ]}
                infoDataSource="Queue management system, patient check-in times"
                isDark={isDark}
              >
                <ApexChart
                  options={heatmapOptions}
                  series={heatmapSeries}
                  type="heatmap"
                  height={250}
                />
              </ChartCard>
            </div>
          </section>

          {/* ============== DIAGNOSTIC ANALYTICS ============== */}
          <section ref={diagnosticRef} className="scroll-mt-20">
            <SectionHeader
              icon={Stethoscope}
              title="Diagnostic Analytics"
              subtitle="Why did it happen? - Performance variance and root cause analysis"
              color={chartColors.purple}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Department Performance Radar */}
              <ChartCard
                title="Department Performance Comparison"
                subtitle="Satisfaction, efficiency, and quality scores by department"
                infoTitle="Department Performance Radar"
                infoDescription="This radar chart compares all departments across three key performance metrics: patient satisfaction, operational efficiency, and care quality."
                infoHowToRead={[
                  "Each axis represents a department",
                  "Green line = Patient Satisfaction scores",
                  "Blue line = Operational Efficiency",
                  "Yellow line = Care Quality Index",
                  "Larger coverage area = better overall performance"
                ]}
                infoDataSource="Patient surveys, operational metrics, quality audits"
                isDark={isDark}
              >
                <ApexChart options={radarChartOptions} series={radarChartSeries} type="radar" height={300} />
              </ChartCard>

              {/* Staff Utilization with Gauges */}
              <ChartCard
                title="Staff Utilization Analysis"
                subtitle="Current staffing levels vs optimal capacity"
                infoTitle="Staff Utilization"
                infoDescription="Shows staff utilization rates by role, comparing current staffing against optimal levels. High utilization indicates potential burnout risk."
                infoHowToRead={[
                  "Green (< 85%): Healthy utilization",
                  "Yellow (85-90%): Elevated, monitor closely",
                  "Red (> 90%): Critical, burnout risk",
                  "Nursing at 95% needs immediate attention",
                  "Consider hiring or shift optimization"
                ]}
                infoDataSource="HR scheduling system, time tracking"
                isDark={isDark}
              >
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {staffData.slice(0, 2).map((staff) => (
                    <div key={staff.role} className="text-center">
                      <Gauge
                        value={staff.utilization}
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
                            fill: staff.utilization > 90 ? chartColors.red : staff.utilization > 85 ? chartColors.yellow : chartColors.green,
                          },
                          [`& .${gaugeClasses.referenceArc}`]: {
                            fill: isDark ? '#374151' : '#E5E7EB',
                          },
                        }}
                      />
                      <p className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>{staff.role}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {staffData.map((staff, index) => (
                    <div key={staff.role} className={`p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{staff.role}</span>
                        <span className={`text-sm font-medium ${
                          staff.utilization > 90 ? "text-red-500" : staff.utilization > 85 ? "text-yellow-500" : "text-green-500"
                        }`}>
                          {staff.utilization}%
                        </span>
                      </div>
                      <div className={`h-2 rounded-full ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                        <motion.div
                          className={`h-full rounded-full ${
                            staff.utilization > 90 ? "bg-red-500" : staff.utilization > 85 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${staff.utilization}%` }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                        {staff.current}/{staff.optimal} staff
                      </p>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </section>

          {/* ============== PREDICTIVE ANALYTICS ============== */}
          <section ref={predictiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={Brain}
              title="Predictive Analytics"
              subtitle="What will happen? - AI-powered clinical predictions with 91% accuracy"
              color={chartColors.cyan}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Readmission Risk */}
              <ChartCard
                title="High-Risk Readmission Patients"
                subtitle="ML-predicted 30-day readmission probability"
                infoTitle="Readmission Risk Prediction"
                infoDescription="Our ML model predicts 30-day readmission risk based on patient demographics, diagnosis, comorbidities, and historical data."
                infoHowToRead={[
                  "Red badge (>80%): Immediate intervention needed",
                  "Yellow badge (60-80%): Enhanced monitoring",
                  "Risk factors shown below each patient",
                  "Click patient card for care plan",
                  "Model trained on 50,000+ patient records"
                ]}
                infoDataSource="EHR data, ML prediction model (91% accuracy)"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {readmissionRiskData.map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isDark ? "bg-gray-700/30 border-gray-600 hover:border-red-500/50" : "border-gray-100 hover:border-red-200"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{patient.name}</span>
                            <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>({patient.id})</span>
                          </div>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Age: {patient.age} | {patient.condition}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          patient.risk >= 80
                            ? (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
                            : patient.risk >= 60
                            ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600")
                            : (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600")
                        }`}>
                          {patient.risk}% risk
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {patient.factors.map((factor) => (
                          <span key={factor} className={`text-xs px-2 py-0.5 rounded-full ${
                            isDark ? "bg-gray-600 text-gray-300" : "bg-gray-100 text-gray-600"
                          }`}>
                            {factor}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ChartCard>

              {/* Outcome Predictions */}
              <ChartCard
                title="AI-Predicted Outcome Improvements"
                subtitle="Expected metrics after implementing recommendations"
                infoTitle="Outcome Predictions"
                infoDescription="Based on ML analysis, these are the predicted improvements in key metrics if recommended interventions are implemented."
                infoHowToRead={[
                  "Current column shows today's values",
                  "Predicted shows expected outcomes",
                  "Green percentage is improvement rate",
                  "Readmission could drop 25.3%",
                  "Predictions based on similar hospital implementations"
                ]}
                infoDataSource="Predictive analytics engine, benchmark comparison"
                isDark={isDark}
              >
                <div className="space-y-4">
                  {outcomeData.map((outcome, index) => (
                    <motion.div
                      key={outcome.metric}
                      className={`p-4 rounded-xl ${isDark ? "bg-gradient-to-r from-green-900/30 to-emerald-900/30" : "bg-gradient-to-r from-green-50 to-emerald-50"}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{outcome.metric}</span>
                        <span className={`font-semibold ${isDark ? "text-green-400" : "text-green-600"}`}>{outcome.improvement}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>Current: </span>
                          <span className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{outcome.current}</span>
                        </div>
                        <span className={isDark ? "text-gray-600" : "text-gray-400"}>→</span>
                        <div>
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>Predicted: </span>
                          <span className={`font-medium ${isDark ? "text-green-400" : "text-green-600"}`}>{outcome.predicted}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className={`mt-4 p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-brand-primary/5"}`}>
                  <div className="flex items-center gap-2">
                    <Brain className={`w-4 h-4 ${isDark ? "text-cyan-400" : "text-brand-primary"}`} />
                    <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>ML Confidence: 91%</span>
                  </div>
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Predictions based on analysis of 50,000+ patient records and clinical outcomes.
                  </p>
                </div>
              </ChartCard>
            </div>
          </section>

          {/* ============== PRESCRIPTIVE ANALYTICS ============== */}
          <section ref={prescriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={Lightbulb}
              title="Prescriptive Analytics"
              subtitle="What should we do? - AI-powered actionable recommendations"
              color={chartColors.green}
              isDark={isDark}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { priority: "Critical", icon: Bed, title: "Open Additional ICU Beds", description: "ICU at 90% capacity. Open 4 flex beds in surgical wing.", impact: "Prevent 6-hour wait for critical admissions", action: "Initiate Protocol" },
                { priority: "High", icon: Users, title: "Adjust Staffing Ratios", description: "Nursing utilization critical. Deploy 8 PRN nurses for evening.", impact: "Reduce nurse fatigue, improve care quality", action: "Approve Staffing" },
                { priority: "High", icon: Calendar, title: "Reschedule Elective Surgeries", description: "Move 3 non-urgent surgeries to next week.", impact: "Emergency surgery availability +40%", action: "Review Schedule" },
                { priority: "Medium", icon: Pill, title: "Medication Inventory Alert", description: "Low stock on cardiac medications. Reorder triggered.", impact: "Prevent stockout in 48 hours", action: "Place Order" },
                { priority: "Medium", icon: FileText, title: "Discharge Planning", description: "15 patients ready for discharge with completed plans.", impact: "Free 15 beds within 4 hours", action: "Process Discharges" },
                { priority: "Low", icon: Thermometer, title: "Equipment Maintenance", description: "2 MRI machines due for preventive maintenance.", impact: "Prevent unplanned downtime", action: "Schedule Service" },
              ].map((rec, index) => (
                <motion.div
                  key={rec.title}
                  className={`rounded-xl p-5 shadow-sm border transition-all ${
                    isDark ? "bg-gray-800 border-gray-700 hover:border-gray-600" : "bg-white border-gray-100 hover:border-gray-200"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      rec.priority === "Critical"
                        ? (isDark ? "bg-red-900/50" : "bg-red-100")
                        : rec.priority === "High"
                        ? (isDark ? "bg-yellow-900/50" : "bg-yellow-100")
                        : (isDark ? "bg-blue-900/50" : "bg-blue-100")
                    }`}>
                      <rec.icon className={`w-5 h-5 ${
                        rec.priority === "Critical" ? "text-red-500" :
                        rec.priority === "High" ? "text-yellow-500" : "text-blue-500"
                      }`} />
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      rec.priority === "Critical"
                        ? (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
                        : rec.priority === "High"
                        ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600")
                        : (isDark ? "bg-blue-900/50 text-blue-400" : "bg-blue-100 text-blue-600")
                    }`}>
                      {rec.priority}
                    </span>
                  </div>
                  <h4 className={`font-semibold text-sm mb-2 ${isDark ? "text-white" : "text-brand-dark"}`}>{rec.title}</h4>
                  <p className={`text-xs mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{rec.description}</p>
                  <div className={`p-2 rounded-lg mb-3 ${isDark ? "bg-green-900/30" : "bg-green-50"}`}>
                    <p className={`text-xs ${isDark ? "text-green-400" : "text-green-700"}`}>
                      <span className="font-medium">Impact:</span> {rec.impact}
                    </p>
                  </div>
                  <button className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${
                    isDark
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}>
                    {rec.action}
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className={`rounded-2xl p-8 shadow-sm ${isDark ? "bg-gradient-to-r from-red-900/50 to-red-800/50" : "bg-gradient-to-r from-red-600 to-red-700"} text-white`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Transform Patient Care with Data-Driven Insights</h2>
                <p className="text-white/80">
                  Improve outcomes, reduce costs, and deliver exceptional patient experiences.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Request a Demo
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`py-6 mt-8 -mx-6 px-6 ${isDark ? "bg-gray-800" : "bg-gradient-to-r from-red-600 to-red-700"} text-white`}>
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
