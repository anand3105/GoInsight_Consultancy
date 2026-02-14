import {
  ShoppingCart,
  TrendingUp,
  Heart,
  Factory,
  Truck,
  Megaphone,
  GraduationCap,
  Building2,
  LucideIcon
} from "lucide-react";

export interface KPI {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface AnalyticsDomain {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  kpis: KPI[];
  gridPosition: { row: number; col: number };
  buildingHeight: "short" | "medium" | "tall";
}

export const analyticsDomains: AnalyticsDomain[] = [
  {
    id: "retail",
    name: "Retail Analytics",
    shortDescription: "Optimize store performance & customer experience",
    fullDescription: "Transform your retail operations with real-time inventory tracking, customer behavior analysis, and predictive demand forecasting. Our retail analytics suite helps you maximize revenue per square foot and deliver exceptional shopping experiences.",
    icon: ShoppingCart,
    kpis: [
      { label: "Revenue per Sqft", value: "$847", change: "+12.3%", positive: true },
      { label: "Conversion Rate", value: "3.8%", change: "+0.5%", positive: true },
      { label: "Avg. Basket Size", value: "$127", change: "+8.2%", positive: true },
      { label: "Inventory Turnover", value: "8.4x", change: "-0.3x", positive: false },
    ],
    gridPosition: { row: 1, col: 1 },
    buildingHeight: "tall",
  },
  {
    id: "finance",
    name: "Finance Analytics",
    shortDescription: "Real-time financial insights & risk management",
    fullDescription: "Gain complete visibility into your financial health with automated reporting, cash flow forecasting, and risk assessment tools. Make data-driven decisions with confidence using our comprehensive finance analytics platform.",
    icon: TrendingUp,
    kpis: [
      { label: "Operating Margin", value: "24.7%", change: "+2.1%", positive: true },
      { label: "Cash Runway", value: "18 mo", change: "+3 mo", positive: true },
      { label: "Debt-to-Equity", value: "0.45", change: "-0.08", positive: true },
      { label: "ROI", value: "156%", change: "+23%", positive: true },
    ],
    gridPosition: { row: 1, col: 2 },
    buildingHeight: "medium",
  },
  {
    id: "healthcare",
    name: "Healthcare Analytics",
    shortDescription: "Patient outcomes & operational efficiency",
    fullDescription: "Improve patient care and streamline operations with advanced healthcare analytics. Track clinical outcomes, optimize resource allocation, and ensure compliance while reducing costs across your healthcare organization.",
    icon: Heart,
    kpis: [
      { label: "Patient Satisfaction", value: "94.2%", change: "+4.8%", positive: true },
      { label: "Readmission Rate", value: "8.3%", change: "-2.1%", positive: true },
      { label: "Avg. Wait Time", value: "12 min", change: "-5 min", positive: true },
      { label: "Bed Utilization", value: "87%", change: "+6%", positive: true },
    ],
    gridPosition: { row: 1, col: 3 },
    buildingHeight: "tall",
  },
  {
    id: "education",
    name: "Educational Analytics",
    shortDescription: "Student performance & institutional insights",
    fullDescription: "Transform educational outcomes with data-driven insights. Track student performance, optimize curriculum effectiveness, and improve institutional efficiency with comprehensive analytics for schools, colleges, and universities.",
    icon: GraduationCap,
    kpis: [
      { label: "Student Success Rate", value: "92.4%", change: "+6.2%", positive: true },
      { label: "Course Completion", value: "88.7%", change: "+4.5%", positive: true },
      { label: "Avg. Grade Score", value: "3.6 GPA", change: "+0.3", positive: true },
      { label: "Enrollment Growth", value: "15.2%", change: "+8.1%", positive: true },
    ],
    gridPosition: { row: 1, col: 4 },
    buildingHeight: "medium",
  },
  {
    id: "manufacturing",
    name: "Manufacturing Analytics",
    shortDescription: "Production optimization & quality control",
    fullDescription: "Maximize production efficiency with IoT-powered analytics. Monitor equipment health, predict maintenance needs, and maintain quality standards across your manufacturing operations in real-time.",
    icon: Factory,
    kpis: [
      { label: "OEE Score", value: "89.4%", change: "+5.2%", positive: true },
      { label: "Defect Rate", value: "0.12%", change: "-0.08%", positive: true },
      { label: "Cycle Time", value: "4.2 min", change: "-0.6 min", positive: true },
      { label: "Uptime", value: "98.7%", change: "+1.2%", positive: true },
    ],
    gridPosition: { row: 2, col: 1 },
    buildingHeight: "medium",
  },
  {
    id: "supply-chain",
    name: "Supply Chain Analytics",
    shortDescription: "End-to-end visibility & logistics optimization",
    fullDescription: "Gain complete supply chain visibility from procurement to delivery. Optimize logistics, reduce lead times, and build resilient operations with predictive analytics and real-time tracking capabilities.",
    icon: Truck,
    kpis: [
      { label: "On-Time Delivery", value: "96.8%", change: "+3.4%", positive: true },
      { label: "Fill Rate", value: "98.2%", change: "+1.7%", positive: true },
      { label: "Avg. Lead Time", value: "4.2 days", change: "-1.3 days", positive: true },
      { label: "Freight Cost", value: "$2.14/lb", change: "-$0.23", positive: true },
    ],
    gridPosition: { row: 2, col: 2 },
    buildingHeight: "short",
  },
  {
    id: "sales-marketing",
    name: "Sales & Marketing Analytics",
    shortDescription: "Campaign performance & revenue attribution",
    fullDescription: "Unify your sales and marketing data for complete revenue attribution. Track campaign performance, optimize customer acquisition costs, and identify your highest-value channels with powerful analytics.",
    icon: Megaphone,
    kpis: [
      { label: "CAC", value: "$42", change: "-$8", positive: true },
      { label: "LTV:CAC Ratio", value: "4.2x", change: "+0.6x", positive: true },
      { label: "Pipeline Value", value: "$2.4M", change: "+18%", positive: true },
      { label: "Win Rate", value: "32%", change: "+5%", positive: true },
    ],
    gridPosition: { row: 2, col: 3 },
    buildingHeight: "tall",
  },
  {
    id: "real-estate",
    name: "Real Estate & Construction",
    shortDescription: "Project tracking & property portfolio insights",
    fullDescription: "Optimize real estate investments and construction projects with comprehensive analytics. Track property performance, monitor construction progress, analyze market trends, and maximize ROI across your property portfolio.",
    icon: Building2,
    kpis: [
      { label: "Occupancy Rate", value: "94.8%", change: "+3.2%", positive: true },
      { label: "Project On-Time", value: "91.5%", change: "+7.3%", positive: true },
      { label: "Cost Variance", value: "-2.1%", change: "-1.8%", positive: true },
      { label: "Portfolio ROI", value: "18.4%", change: "+4.2%", positive: true },
    ],
    gridPosition: { row: 2, col: 4 },
    buildingHeight: "short",
  },
];
