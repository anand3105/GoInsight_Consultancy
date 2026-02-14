"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  PieChart,
  TrendingUp,
  Brain,
  Lightbulb,
  Settings,
  Download,
  Bell,
  HelpCircle,
  ChevronRight,
  ShoppingCart,
  Heart,
  Factory,
  Truck,
  Megaphone,
  Building2,
  GraduationCap,
  Home,
  Calendar,
  FileText,
  Layers,
  Filter,
  RefreshCw,
  Share2,
  Bookmark,
  LucideIcon,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import DemoFeatureTooltip from "./DemoFeatureTooltip";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
  tooltipTitle?: string;
  tooltipDescription?: string;
}

interface DemoSidebarProps {
  activeDomain: string;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const analyticsDomains = [
  { id: "retail", name: "Retail", icon: ShoppingCart, color: "bg-brand-primary" },
  { id: "finance", name: "Finance", icon: TrendingUp, color: "bg-brand-primary" },
  { id: "healthcare", name: "Healthcare", icon: Heart, color: "bg-red-500" },
  { id: "education", name: "Education", icon: GraduationCap, color: "bg-purple-500" },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, color: "bg-orange-500" },
  { id: "supply-chain", name: "Supply Chain", icon: Truck, color: "bg-teal-500" },
  { id: "sales-marketing", name: "Sales & Marketing", icon: Megaphone, color: "bg-pink-500" },
  { id: "real-estate", name: "Real Estate", icon: Building2, color: "bg-indigo-500" },
];

const mainNavItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "descriptive", label: "Descriptive Analytics", icon: BarChart3 },
  { id: "diagnostic", label: "Diagnostic Analytics", icon: PieChart },
  { id: "predictive", label: "Predictive Analytics", icon: Brain },
  { id: "prescriptive", label: "Prescriptive Analytics", icon: Lightbulb },
];

const reportItems: NavItem[] = [
  {
    id: "daily-report",
    label: "Daily Report",
    icon: FileText,
    badge: "New",
    tooltipTitle: "Daily Report",
    tooltipDescription: "Access automated daily performance summaries with key metrics, trends, and alerts delivered to your inbox every morning."
  },
  {
    id: "weekly-summary",
    label: "Weekly Summary",
    icon: Calendar,
    tooltipTitle: "Weekly Summary",
    tooltipDescription: "Comprehensive weekly analysis combining all KPIs, trend comparisons, and performance highlights in one consolidated view."
  },
  {
    id: "monthly-analysis",
    label: "Monthly Analysis",
    icon: Layers,
    tooltipTitle: "Monthly Analysis",
    tooltipDescription: "In-depth monthly reports with period-over-period comparisons, goal tracking, and strategic recommendations."
  },
  {
    id: "custom-report",
    label: "Custom Report",
    icon: Filter,
    tooltipTitle: "Custom Report Builder",
    tooltipDescription: "Build your own reports with drag-and-drop interface. Select metrics, set date ranges, and create personalized dashboards."
  },
];

const toolItems: NavItem[] = [
  {
    id: "alerts",
    label: "Alerts & Notifications",
    icon: Bell,
    badge: "3",
    tooltipTitle: "Smart Alerts",
    tooltipDescription: "Set up custom alerts for KPI thresholds, anomaly detection, and automated notifications via email, SMS, or Slack."
  },
  {
    id: "export",
    label: "Export Data",
    icon: Download,
    tooltipTitle: "Export Data",
    tooltipDescription: "Export your data in multiple formats (Excel, CSV, PDF, PowerPoint) with customizable layouts and branding options."
  },
  {
    id: "share",
    label: "Share Dashboard",
    icon: Share2,
    tooltipTitle: "Share Dashboard",
    tooltipDescription: "Share dashboards with team members, set permissions, and schedule automated report distribution to stakeholders."
  },
  {
    id: "bookmarks",
    label: "Saved Views",
    icon: Bookmark,
    tooltipTitle: "Saved Views",
    tooltipDescription: "Save your favorite filter configurations, date ranges, and dashboard layouts for quick access to frequently used views."
  },
];

export default function DemoSidebar({ activeDomain, activeSection = "overview", onSectionChange }: DemoSidebarProps) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>("analytics");
  const { theme, toggleTheme, isDark } = useTheme();
  const isCollapsed = false; // Sidebar always expanded

  const currentDomain = analyticsDomains.find(d => d.id === activeDomain);

  const handleSectionClick = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  const toggleGroup = (group: string) => {
    setExpandedGroup(expandedGroup === group ? null : group);
  };

  return (
    <motion.aside
      className={`fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } ${isDark ? "bg-gray-900 border-r border-gray-700" : "bg-white border-r border-gray-200"}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo Section */}
      <div className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
        <Link href="/" className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${currentDomain?.color || "bg-brand-primary"} flex items-center justify-center flex-shrink-0`}>
            {currentDomain && <currentDomain.icon className="w-5 h-5 text-white" />}
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className={`font-bold text-sm ${isDark ? "text-white" : "text-brand-dark"}`}>GoInsight</h1>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-brand-secondary"}`}>{currentDomain?.name} Analytics</p>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Main Analytics Navigation */}
        <div className="px-3 mb-4">
          {!isCollapsed && (
            <button
              onClick={() => toggleGroup("analytics")}
              className={`flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-gray-400" : "text-brand-secondary"
              }`}
            >
              Analytics Views
              <ChevronRight className={`w-3 h-3 transition-transform ${expandedGroup === "analytics" ? "rotate-90" : ""}`} />
            </button>
          )}
          <AnimatePresence>
            {(expandedGroup === "analytics" || isCollapsed) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 mt-2"
              >
                {mainNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      activeSection === item.id
                        ? "bg-brand-primary text-white"
                        : isDark
                          ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                          : "text-brand-secondary hover:bg-gray-100 hover:text-brand-dark"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reports Section */}
        <div className="px-3 mb-4">
          {!isCollapsed && (
            <button
              onClick={() => toggleGroup("reports")}
              className={`flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-gray-400" : "text-brand-secondary"
              }`}
            >
              Reports
              <ChevronRight className={`w-3 h-3 transition-transform ${expandedGroup === "reports" ? "rotate-90" : ""}`} />
            </button>
          )}
          <AnimatePresence>
            {(expandedGroup === "reports" || isCollapsed) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 mt-2"
              >
                {reportItems.map((item) => (
                  <DemoFeatureTooltip
                    key={item.id}
                    title={item.tooltipTitle || item.label}
                    description={item.tooltipDescription || ""}
                    position="right"
                    isDark={isDark}
                  >
                    <button
                      onClick={() => handleSectionClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-default ${
                        activeSection === item.id
                          ? "bg-brand-primary text-white"
                          : isDark
                            ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                            : "text-brand-secondary hover:bg-gray-100 hover:text-brand-dark"
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                              activeSection === item.id ? "bg-white/20 text-white" : "bg-brand-yellow text-brand-dark"
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </DemoFeatureTooltip>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tools Section */}
        <div className="px-3 mb-4">
          {!isCollapsed && (
            <button
              onClick={() => toggleGroup("tools")}
              className={`flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-gray-400" : "text-brand-secondary"
              }`}
            >
              Tools
              <ChevronRight className={`w-3 h-3 transition-transform ${expandedGroup === "tools" ? "rotate-90" : ""}`} />
            </button>
          )}
          <AnimatePresence>
            {(expandedGroup === "tools" || isCollapsed) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 mt-2"
              >
                {toolItems.map((item) => (
                  <DemoFeatureTooltip
                    key={item.id}
                    title={item.tooltipTitle || item.label}
                    description={item.tooltipDescription || ""}
                    position="right"
                    isDark={isDark}
                  >
                    <button
                      onClick={() => handleSectionClick(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-default ${
                        activeSection === item.id
                          ? "bg-brand-primary text-white"
                          : isDark
                            ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                            : "text-brand-secondary hover:bg-gray-100 hover:text-brand-dark"
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                              activeSection === item.id ? "bg-white/20 text-white" : isDark ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600"
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </DemoFeatureTooltip>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="px-4 my-4">
          <div className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`} />
        </div>

        {/* Other Domains */}
        <div className="px-3">
          {!isCollapsed && (
            <button
              onClick={() => toggleGroup("domains")}
              className={`flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-gray-400" : "text-brand-secondary"
              }`}
            >
              Other Domains
              <ChevronRight className={`w-3 h-3 transition-transform ${expandedGroup === "domains" ? "rotate-90" : ""}`} />
            </button>
          )}
          <AnimatePresence>
            {(expandedGroup === "domains" || isCollapsed) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-1 mt-2"
              >
                {analyticsDomains.filter(d => d.id !== activeDomain).map((domain) => (
                  <Link
                    key={domain.id}
                    href={`/demo/${domain.id}`}
                    prefetch={true}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isDark ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-brand-secondary hover:bg-gray-100 hover:text-brand-dark"
                    }`}
                    title={isCollapsed ? domain.name : undefined}
                  >
                    <div className={`w-6 h-6 rounded-lg ${domain.color} flex items-center justify-center flex-shrink-0`}>
                      <domain.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{domain.name}</span>
                    )}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`border-t p-3 ${isDark ? "border-gray-700" : "border-gray-100"}`}>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2 transition-all ${
            isDark
              ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
              : "bg-gray-900/5 text-gray-700 hover:bg-gray-900/10"
          }`}
          title={isCollapsed ? (isDark ? "Light Mode" : "Dark Mode") : undefined}
        >
          {isDark ? (
            <Sun className="w-5 h-5 flex-shrink-0" />
          ) : (
            <Moon className="w-5 h-5 flex-shrink-0" />
          )}
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {isDark ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="flex items-center gap-2 mb-3">
            <DemoFeatureTooltip
              title="Refresh Data"
              description="Instantly refresh all dashboard data with real-time updates from your connected data sources."
              position="top"
              isDark={isDark}
            >
              <button className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-default ${
                isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-brand-secondary"
              }`}>
                <RefreshCw className="w-4 h-4" />
                <span className="text-xs font-medium">Refresh</span>
              </button>
            </DemoFeatureTooltip>
            <DemoFeatureTooltip
              title="Dashboard Settings"
              description="Configure dashboard preferences, data connections, refresh intervals, and user permissions."
              position="top"
              isDark={isDark}
            >
              <button className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-default ${
                isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-brand-secondary"
              }`}>
                <Settings className="w-4 h-4" />
                <span className="text-xs font-medium">Settings</span>
              </button>
            </DemoFeatureTooltip>
          </div>
        )}

        {/* Home & Help */}
        <div className="space-y-1">
          <Link
            href="/"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              isDark ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-brand-secondary hover:bg-gray-100 hover:text-brand-dark"
            }`}
            title={isCollapsed ? "Back to Home" : undefined}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Back to Home</span>}
          </Link>
          <DemoFeatureTooltip
            title="Help & Support"
            description="Access documentation, video tutorials, live chat support, and book training sessions with our analytics experts."
            position="top"
            isDark={isDark}
          >
            <button
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-default ${
                isDark ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-brand-secondary hover:bg-gray-100 hover:text-brand-dark"
              }`}
              title={isCollapsed ? "Help & Support" : undefined}
            >
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">Help & Support</span>}
            </button>
          </DemoFeatureTooltip>
        </div>

      </div>
    </motion.aside>
  );
}
