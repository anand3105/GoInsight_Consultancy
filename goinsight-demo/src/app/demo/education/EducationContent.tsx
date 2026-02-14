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
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Award,
  Clock,
  Target,
  AlertCircle,
  CheckCircle2,
  Brain,
  Lightbulb,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Share2,
  Filter,
  RefreshCw,
  Info,
  X,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  MessageSquare,
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

// Enrollment Trends
const enrollmentData = {
  years: ["2020", "2021", "2022", "2023", "2024", "2025"],
  students: [2850, 3120, 3450, 3780, 4150, 4520],
  retention: [88, 89, 91, 92, 93, null],
  graduation: [82, 84, 86, 88, 89, null],
};

// Course Performance
const coursePerformanceData = [
  { course: "Computer Science", avgGrade: 3.4, completion: 92, satisfaction: 4.5 },
  { course: "Business Admin", avgGrade: 3.2, completion: 88, satisfaction: 4.2 },
  { course: "Engineering", avgGrade: 3.1, completion: 85, satisfaction: 4.3 },
  { course: "Data Science", avgGrade: 3.5, completion: 94, satisfaction: 4.7 },
  { course: "Healthcare", avgGrade: 3.3, completion: 90, satisfaction: 4.4 },
];

// Student Demographics
const demographicsData = [
  { id: 0, value: 55, label: "Undergraduate", color: chartColors.primary },
  { id: 1, value: 30, label: "Graduate", color: chartColors.yellow },
  { id: 2, value: 10, label: "PhD", color: chartColors.green },
  { id: 3, value: 5, label: "Certificate", color: chartColors.blue },
];

// Weekly Engagement
const engagementData = {
  weeks: ["W1", "W2", "W3", "W4", "W5", "W6"],
  logins: [4250, 4580, 4320, 4890, 4650, 5120],
  assignments: [1820, 2150, 1950, 2380, 2210, 2540],
  discussions: [890, 1020, 950, 1150, 1080, 1280],
};

// At-Risk Students
const atRiskStudents = [
  { id: "S-4521", name: "Alex M.", gpa: 1.8, attendance: 65, risk: 92, factors: ["Low GPA", "Poor attendance", "Missing assignments"] },
  { id: "S-4892", name: "Jamie L.", gpa: 2.1, attendance: 72, risk: 78, factors: ["Declining grades", "Low engagement"] },
  { id: "S-5103", name: "Taylor R.", gpa: 2.3, attendance: 68, risk: 72, factors: ["Attendance issues", "Late submissions"] },
  { id: "S-5287", name: "Morgan K.", gpa: 2.0, attendance: 75, risk: 68, factors: ["Financial aid concern", "Work conflicts"] },
];

// Learning Outcomes
const learningOutcomesData = [
  { outcome: "Critical Thinking", achieved: 87, target: 85 },
  { outcome: "Communication", achieved: 82, target: 80 },
  { outcome: "Technical Skills", achieved: 91, target: 88 },
  { outcome: "Problem Solving", achieved: 85, target: 85 },
  { outcome: "Collaboration", achieved: 88, target: 82 },
];

// Faculty Performance
const facultyData = {
  metrics: ["Teaching Quality", "Student Feedback", "Research Output", "Availability", "Course Content"],
  score: [4.3, 4.5, 3.8, 4.1, 4.4],
  benchmark: [4.0, 4.2, 3.5, 4.0, 4.1],
};

// Grade Distribution
const gradeDistribution = [
  { grade: "A", count: 380, color: chartColors.green },
  { grade: "B", count: 520, color: "#8BC34A" },
  { grade: "C", count: 450, color: chartColors.yellow },
  { grade: "D", count: 240, color: chartColors.orange },
  { grade: "F", count: 140, color: chartColors.red },
];

// Predicted Outcomes
const predictedOutcomes = [
  { metric: "Graduation Rate", current: "88.7%", predicted: "91.2%", change: "+2.5%" },
  { metric: "Course Completion", current: "89.4%", predicted: "92.8%", change: "+3.4%" },
  { metric: "Employment Rate", current: "78.5%", predicted: "82.3%", change: "+3.8%" },
  { metric: "Student Satisfaction", current: "4.3/5", predicted: "4.6/5", change: "+7%" },
];

// KPI Sparkline Data
const kpiSparklines = {
  success: [86, 87, 88, 89, 90, 91, 91, 92, 92, 92, 92, 92.4],
  completion: [82, 83, 84, 85, 86, 87, 87, 88, 88, 88, 88, 88.7],
  gpa: [3.1, 3.15, 3.2, 3.25, 3.3, 3.32, 3.35, 3.38, 3.4, 3.41, 3.42, 3.42],
  enrollment: [10, 11, 12, 13, 13, 14, 14, 14.5, 15, 15, 15.2, 15.2],
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
              <div className="p-1.5 rounded-lg bg-purple-100">
                <Lock className="w-3.5 h-3.5 text-purple-600" />
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
                    isDark ? "bg-purple-500/20" : "bg-purple-100"
                  }`}>
                    <Info className="w-5 h-5 text-purple-500" />
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
                          isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"
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
  color = "purple",
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
    purple: { bg: "bg-purple-100", text: "text-purple-600", darkBg: "bg-purple-500/20", darkText: "text-purple-400" },
    green: { bg: "bg-green-100", text: "text-green-600", darkBg: "bg-green-500/20", darkText: "text-green-400" },
    blue: { bg: "bg-blue-100", text: "text-blue-600", darkBg: "bg-blue-500/20", darkText: "text-blue-400" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-600", darkBg: "bg-yellow-500/20", darkText: "text-yellow-400" },
  };
  const colors = colorMap[color] || colorMap.purple;

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

export default function EducationContent() {
  const [selectedCourse, setSelectedCourse] = useState("Computer Science");
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

  // Radar Chart for Course Performance
  const radarChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "radar", height: 300 },
    colors: [chartColors.primary, chartColors.purple],
    xaxis: { categories: coursePerformanceData.map(c => c.course) },
    yaxis: { show: false, max: 5 },
    markers: { size: 4 },
    fill: { opacity: 0.25 },
    stroke: { width: 2 },
    legend: { ...apexTheme.legend, position: "bottom" },
  };

  const radarChartSeries = [
    { name: "Avg GPA", data: coursePerformanceData.map(c => c.avgGrade) },
    { name: "Satisfaction", data: coursePerformanceData.map(c => c.satisfaction) },
  ];

  // Area Chart for Enrollment Forecast
  const enrollmentChartOptions: ApexCharts.ApexOptions = {
    ...apexTheme,
    chart: { ...apexTheme.chart, type: "area", height: 300 },
    colors: [chartColors.primary, chartColors.green, chartColors.purple],
    stroke: { curve: "smooth", width: [3, 2, 2] },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1 } },
    xaxis: { ...apexTheme.xaxis, categories: enrollmentData.years },
    yaxis: [
      { ...apexTheme.yaxis, title: { text: "Students", style: { color: isDark ? '#E5E7EB' : '#374151' } } },
      { ...apexTheme.yaxis, opposite: true, max: 100, title: { text: "Rate %", style: { color: isDark ? '#E5E7EB' : '#374151' } } },
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
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <DemoSidebar
        activeDomain="education"
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300">
        {/* Top Navigation */}
        <nav className={`sticky top-0 z-30 shadow-lg ${isDark ? "bg-gray-800" : "bg-gradient-to-r from-purple-600 to-purple-700"}`}>
          <div className="px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Image src="/Go-Insight-White_logo.png" alt="GoInsight" width={100} height={28} className="h-7 w-auto" />
                <div className="h-6 w-px bg-white/20" />
                <span className="text-white font-medium">Education Analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg">
                  Fall Semester 2024
                </div>
                <ToolbarTooltip title="Advanced Filters" description="Apply multi-dimensional filters across all visualizations. Filter by date range, departments, courses, and student segments.">
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
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-purple-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-default">
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDark ? "bg-purple-500/20" : "bg-purple-100"}`}>
                  <GraduationCap className={`w-7 h-7 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-brand-dark"}`}>
                    Educational Analytics Dashboard
                  </h1>
                  <p className={isDark ? "text-gray-400" : "text-brand-secondary"}>
                    Student Success Intelligence | 4,150+ students | 5 programs
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>
                <Clock className="w-4 h-4" />
                Last updated: 30 min ago
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
              title="Student Success Rate"
              value="92.4%"
              change="+6.2%"
              changeType="positive"
              icon={Award}
              sparklineData={kpiSparklines.success}
              isDark={isDark}
              color="purple"
            />
            <KPICard
              title="Course Completion"
              value="88.7%"
              change="+4.5%"
              changeType="positive"
              icon={BookOpen}
              sparklineData={kpiSparklines.completion}
              isDark={isDark}
              color="green"
            />
            <KPICard
              title="Avg. GPA"
              value="3.42"
              change="+0.18"
              changeType="positive"
              icon={Target}
              sparklineData={kpiSparklines.gpa}
              isDark={isDark}
              color="blue"
            />
            <KPICard
              title="Enrollment Growth"
              value="15.2%"
              change="+8.1%"
              changeType="positive"
              icon={Users}
              sparklineData={kpiSparklines.enrollment}
              isDark={isDark}
              color="yellow"
            />
          </div>

          {/* ============== DESCRIPTIVE ANALYTICS ============== */}
          <section ref={descriptiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={BarChart3}
              title="Descriptive Analytics"
              subtitle="What happened? - Historical performance and enrollment metrics"
              color={chartColors.purple}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Enrollment Trends - MUI Line Chart */}
              <ChartCard
                title="Enrollment & Success Trends"
                subtitle="Multi-year student enrollment with retention and graduation rates"
                infoTitle="Enrollment Analysis"
                infoDescription="This composite chart shows student enrollment growth alongside retention and graduation rate trends over the past 6 years."
                infoHowToRead={[
                  "Bars show total student enrollment per year",
                  "Green line tracks retention rate (%)",
                  "Purple line shows graduation rate (%)",
                  "2025 projections based on ML forecasting",
                  "Strong growth trajectory indicates healthy recruitment"
                ]}
                infoDataSource="Student Information System (SIS), annual enrollment reports"
                isDark={isDark}
                className="lg:col-span-2"
              >
                <ApexChart
                  options={enrollmentChartOptions}
                  series={[
                    { name: "Students", type: "column", data: enrollmentData.students },
                    { name: "Retention %", type: "line", data: enrollmentData.retention as number[] },
                    { name: "Graduation %", type: "line", data: enrollmentData.graduation as number[] },
                  ]}
                  type="line"
                  height={300}
                />
              </ChartCard>

              {/* Student Demographics - MUI Pie Chart */}
              <ChartCard
                title="Student Demographics"
                subtitle="Distribution by academic level"
                infoTitle="Demographics Breakdown"
                infoDescription="This donut chart shows the composition of the student body across different academic programs."
                infoHowToRead={[
                  "Undergraduate students make up 55% of enrollment",
                  "Graduate programs represent 30%",
                  "PhD candidates are 10% of the population",
                  "Certificate programs are growing at 5%",
                  "Compare with peer institutions for benchmarking"
                ]}
                infoDataSource="Registrar enrollment data, updated each semester"
                isDark={isDark}
              >
                <PieChart
                  height={200}
                  series={[{
                    data: demographicsData,
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
                  {demographicsData.map((item) => (
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

            {/* Engagement & Grade Distribution */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              {/* Weekly Engagement - MUI Line Chart */}
              <ChartCard
                title="Weekly Student Engagement"
                subtitle="Platform activity across logins, assignments, and discussions"
                infoTitle="Engagement Metrics"
                infoDescription="Tracks student activity levels across the learning management system, showing engagement patterns over the semester."
                infoHowToRead={[
                  "Blue line = Total platform logins",
                  "Green line = Assignment submissions",
                  "Purple line = Discussion participation",
                  "Week 4 and 6 show peak engagement (midterms)",
                  "Use to identify engagement drops early"
                ]}
                infoDataSource="Learning Management System (LMS) analytics"
                isDark={isDark}
              >
                <LineChart
                  height={280}
                  series={[
                    { data: engagementData.logins, label: "Logins", color: chartColors.primary },
                    { data: engagementData.assignments, label: "Assignments", color: chartColors.green },
                    { data: engagementData.discussions, label: "Discussions", color: chartColors.purple },
                  ]}
                  xAxis={[{ data: engagementData.weeks, scaleType: "point" }]}
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

              {/* Grade Distribution - MUI Bar Chart */}
              <ChartCard
                title="Grade Distribution"
                subtitle="Current semester grade breakdown across all courses"
                infoTitle="Grade Distribution"
                infoDescription="Shows the distribution of final grades across all courses, color-coded from A (green) to F (red)."
                infoHowToRead={[
                  "Green (A): Top performers, 22% of students",
                  "Light green (B): Above average, 30%",
                  "Yellow (C): Average, 26%",
                  "Orange (D): Below average, 14%",
                  "Red (F): Failing, 8% - intervention needed"
                ]}
                infoDataSource="Grade book system, end-of-semester data"
                isDark={isDark}
              >
                <BarChart
                  height={280}
                  series={[{
                    data: gradeDistribution.map(g => g.count),
                    label: "Students",
                    color: chartColors.purple,
                  }]}
                  xAxis={[{ data: gradeDistribution.map(g => g.grade), scaleType: "band" }]}
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
              subtitle="Why did it happen? - Course and faculty performance analysis"
              color={chartColors.blue}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Course Performance Radar */}
              <ChartCard
                title="Course Performance Comparison"
                subtitle="GPA and satisfaction scores across programs"
                infoTitle="Course Performance Radar"
                infoDescription="This radar chart compares all academic programs across average GPA and student satisfaction ratings."
                infoHowToRead={[
                  "Each axis represents a course/program",
                  "Blue area shows average GPA (0-4.0 scale)",
                  "Purple area shows satisfaction (0-5 scale)",
                  "Data Science leads in both metrics",
                  "Engineering needs attention on satisfaction"
                ]}
                infoDataSource="Grade reports and course evaluation surveys"
                isDark={isDark}
              >
                <ApexChart options={radarChartOptions} series={radarChartSeries} type="radar" height={300} />
              </ChartCard>

              {/* Learning Outcomes with Gauges */}
              <ChartCard
                title="Learning Outcomes Assessment"
                subtitle="Achievement vs targets for institutional outcomes"
                infoTitle="Learning Outcomes"
                infoDescription="Shows achievement levels for each institutional learning outcome compared to target benchmarks."
                infoHowToRead={[
                  "Green = Exceeds target (good performance)",
                  "Yellow = At or slightly below target",
                  "Progress bar shows actual achievement",
                  "Gray background shows target level",
                  "Technical Skills at 91% is highest performer"
                ]}
                infoDataSource="Assessment committee rubric evaluations"
                isDark={isDark}
              >
                <div className="space-y-4">
                  {learningOutcomesData.map((outcome, index) => (
                    <div key={outcome.outcome}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{outcome.outcome}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${outcome.achieved >= outcome.target ? "text-green-500" : "text-yellow-500"}`}>
                            {outcome.achieved}%
                          </span>
                          {outcome.achieved >= outcome.target ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      <div className={`h-3 rounded-full overflow-hidden relative ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
                        <div
                          className={`absolute h-full ${isDark ? "bg-gray-600" : "bg-gray-300"} rounded-full`}
                          style={{ width: `${outcome.target}%` }}
                        />
                        <motion.div
                          className={`absolute h-full rounded-full ${outcome.achieved >= outcome.target ? "bg-green-500" : "bg-yellow-500"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${outcome.achieved}%` }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <p className={`text-xs mt-1 text-right ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                        Target: {outcome.target}%
                      </p>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Faculty Performance */}
            <div className="mt-6">
              <ChartCard
                title="Faculty Performance Metrics"
                subtitle="Score vs benchmark comparison across key areas"
                infoTitle="Faculty Performance"
                infoDescription="Compares faculty performance scores against institutional benchmarks across five key metrics."
                infoHowToRead={[
                  "Purple bars show actual faculty scores",
                  "Gray bars show benchmark targets",
                  "All metrics exceeding benchmarks",
                  "Student Feedback at 4.5/5 is highest",
                  "Research Output at 3.8/5 needs focus"
                ]}
                infoDataSource="Faculty evaluation system, student surveys"
                isDark={isDark}
              >
                <BarChart
                  height={220}
                  series={[
                    { data: facultyData.score, label: "Score", color: chartColors.purple },
                    { data: facultyData.benchmark, label: "Benchmark", color: isDark ? "#4B5563" : "#D1D5DB" },
                  ]}
                  xAxis={[{ data: facultyData.metrics, scaleType: "band" }]}
                  yAxis={[{ max: 5 }]}
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
            </div>
          </section>

          {/* ============== PREDICTIVE ANALYTICS ============== */}
          <section ref={predictiveRef} className="scroll-mt-20">
            <SectionHeader
              icon={Brain}
              title="Predictive Analytics"
              subtitle="What will happen? - AI-powered student success predictions with 89% accuracy"
              color={chartColors.cyan}
              isDark={isDark}
            />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* At-Risk Students */}
              <ChartCard
                title="Students At Risk of Dropout"
                subtitle="ML-predicted dropout probability based on 25+ factors"
                infoTitle="At-Risk Prediction"
                infoDescription="Our ML model identifies students at risk of dropping out based on GPA, attendance, engagement, financial factors, and historical patterns."
                infoHowToRead={[
                  "Red badge (>80%): Critical, immediate outreach",
                  "Yellow badge (60-80%): High risk, intervention needed",
                  "Risk factors shown below each student",
                  "Click student card for intervention plan",
                  "Model trained on 5 years of student data"
                ]}
                infoDataSource="SIS, LMS, Financial Aid - ML ensemble model"
                isDark={isDark}
              >
                <div className="space-y-3">
                  {atRiskStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isDark ? "bg-gray-700/30 border-gray-600 hover:border-purple-500/50" : "border-gray-100 hover:border-purple-200"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{student.name}</span>
                            <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>({student.id})</span>
                          </div>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            GPA: {student.gpa} | Attendance: {student.attendance}%
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          student.risk >= 80
                            ? (isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
                            : student.risk >= 60
                            ? (isDark ? "bg-yellow-900/50 text-yellow-400" : "bg-yellow-100 text-yellow-600")
                            : (isDark ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600")
                        }`}>
                          {student.risk}% risk
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {student.factors.map((factor) => (
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

              {/* Predicted Outcomes */}
              <ChartCard
                title="Predicted Institutional Outcomes"
                subtitle="Expected metrics with early intervention implementation"
                infoTitle="Outcome Predictions"
                infoDescription="These predictions show expected improvements in key institutional metrics if recommended early interventions are implemented."
                infoHowToRead={[
                  "Current column shows today's performance",
                  "Predicted shows expected improvement",
                  "Purple percentage shows projected gain",
                  "Employment rate could improve +3.8%",
                  "Based on peer institution benchmarks"
                ]}
                infoDataSource="Predictive analytics, peer comparison data"
                isDark={isDark}
              >
                <div className="space-y-4">
                  {predictedOutcomes.map((outcome, index) => (
                    <motion.div
                      key={outcome.metric}
                      className={`p-4 rounded-xl ${isDark ? "bg-gradient-to-r from-purple-900/30 to-violet-900/30" : "bg-gradient-to-r from-purple-50 to-violet-50"}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{outcome.metric}</span>
                        <span className={`font-semibold ${isDark ? "text-purple-400" : "text-purple-600"}`}>{outcome.change}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>Current: </span>
                          <span className={`font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>{outcome.current}</span>
                        </div>
                        <span className={isDark ? "text-gray-600" : "text-gray-400"}>→</span>
                        <div>
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>Predicted: </span>
                          <span className={`font-medium ${isDark ? "text-purple-400" : "text-purple-600"}`}>{outcome.predicted}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className={`mt-4 p-3 rounded-xl ${isDark ? "bg-gray-700/50" : "bg-purple-50"}`}>
                  <div className="flex items-center gap-2">
                    <Brain className={`w-4 h-4 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                    <span className={`text-sm font-medium ${isDark ? "text-white" : "text-brand-dark"}`}>ML Model Accuracy: 89%</span>
                  </div>
                  <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Trained on 5 years of student data with 25,000+ records.
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
              subtitle="What should we do? - AI-powered intervention recommendations"
              color={chartColors.green}
              isDark={isDark}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { priority: "Critical", icon: Users, title: "Immediate Outreach Program", description: "Contact 12 high-risk students (90%+ dropout probability) within 48 hours.", impact: "Prevent 8-10 potential dropouts", action: "Launch Outreach" },
                { priority: "High", icon: BookOpen, title: "Tutoring Resource Allocation", description: "Increase tutoring hours for Engineering and Business courses.", impact: "+15% course completion", action: "Allocate Resources" },
                { priority: "High", icon: Calendar, title: "Study Group Formation", description: "Create peer study groups for at-risk students in STEM courses.", impact: "Improve GPA by 0.3 points", action: "Create Groups" },
                { priority: "Medium", icon: Target, title: "Financial Aid Review", description: "Review 45 students flagged for financial stress indicators.", impact: "Reduce financial dropouts by 40%", action: "Start Review" },
                { priority: "Medium", icon: MessageSquare, title: "Early Warning Notifications", description: "Send automated alerts to students with 3+ missed assignments.", impact: "+25% assignment submission", action: "Enable Alerts" },
                { priority: "Low", icon: Award, title: "Recognition Program", description: "Launch achievement badges for consistent attendance and performance.", impact: "+12% student engagement", action: "Design Program" },
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
                      ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}>
                    {rec.action}
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className={`rounded-2xl p-8 shadow-sm ${isDark ? "bg-gradient-to-r from-purple-900/50 to-violet-900/50" : "bg-gradient-to-r from-purple-600 to-purple-700"} text-white`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Empower Student Success with Data-Driven Insights</h2>
                <p className="text-white/80">
                  Transform educational outcomes with predictive analytics and personalized interventions.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Schedule a Demo
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
          <footer className={`py-6 mt-8 -mx-6 px-6 ${isDark ? "bg-gray-800" : "bg-gradient-to-r from-purple-600 to-purple-700"} text-white`}>
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
