import {
  ShoppingCart,
  TrendingUp,
  Heart,
  Factory,
  Truck,
  Megaphone,
  GraduationCap,
  Building2,
  LucideIcon,
} from "lucide-react";

// Section 1: Hero Stats
export const heroStats = [
  { label: "Avg ROI", value: 347, suffix: "%", prefix: "" },
  { label: "Revenue Generated", value: 24, suffix: "M+", prefix: "$" },
  { label: "Cost Reduction", value: 42, suffix: "%", prefix: "" },
  { label: "Industries", value: 8, suffix: "", prefix: "" },
];

// Section 2: Cumulative ROI Growth Data (AreaChart)
export const roiGrowthData = [
  { year: "2021", roi: 120 },
  { year: "2022", roi: 185 },
  { year: "2023", roi: 248 },
  { year: "2024", roi: 310 },
  { year: "2025", roi: 347 },
];

export const overviewStats = [
  { label: "Time to Value", value: "6.2 weeks", description: "Average implementation to first insight" },
  { label: "Data Accuracy", value: "99.7%", description: "Across all analytics deployments" },
  { label: "Decision Speed", value: "3.4x faster", description: "Compared to traditional methods" },
];

// Section 3: Sector-Specific ROI
export interface SectorROI {
  id: string;
  name: string;
  icon: LucideIcon;
  roi: number;
  kpis: { label: string; value: string; trend: string; positive: boolean }[];
  sparklineData: number[];
  demoLink: string;
}

export const sectorROIData: SectorROI[] = [
  {
    id: "retail",
    name: "Retail Analytics",
    icon: ShoppingCart,
    roi: 287,
    kpis: [
      { label: "Revenue Uplift", value: "+23%", trend: "↑", positive: true },
      { label: "Inventory Waste", value: "-31%", trend: "↓", positive: true },
      { label: "Customer Retention", value: "+18%", trend: "↑", positive: true },
    ],
    sparklineData: [2, 4, 3, 6, 5, 8, 7, 9, 8, 10],
    demoLink: "/demo/retail",
  },
  {
    id: "finance",
    name: "Finance Analytics",
    icon: TrendingUp,
    roi: 412,
    kpis: [
      { label: "Risk Detection", value: "+94%", trend: "↑", positive: true },
      { label: "Processing Time", value: "-67%", trend: "↓", positive: true },
      { label: "Compliance Score", value: "99.8%", trend: "↑", positive: true },
    ],
    sparklineData: [3, 5, 4, 7, 6, 9, 8, 11, 10, 13],
    demoLink: "/demo/finance",
  },
  {
    id: "healthcare",
    name: "Healthcare Analytics",
    icon: Heart,
    roi: 324,
    kpis: [
      { label: "Patient Outcomes", value: "+28%", trend: "↑", positive: true },
      { label: "Readmission Rate", value: "-42%", trend: "↓", positive: true },
      { label: "Operational Cost", value: "-35%", trend: "↓", positive: true },
    ],
    sparklineData: [2, 3, 5, 4, 7, 6, 8, 9, 8, 11],
    demoLink: "/demo/healthcare",
  },
  {
    id: "education",
    name: "Educational Analytics",
    icon: GraduationCap,
    roi: 256,
    kpis: [
      { label: "Student Success", value: "+34%", trend: "↑", positive: true },
      { label: "Dropout Rate", value: "-45%", trend: "↓", positive: true },
      { label: "Resource Efficiency", value: "+29%", trend: "↑", positive: true },
    ],
    sparklineData: [1, 3, 2, 5, 4, 6, 5, 7, 8, 9],
    demoLink: "/demo/education",
  },
  {
    id: "manufacturing",
    name: "Manufacturing Analytics",
    icon: Factory,
    roi: 378,
    kpis: [
      { label: "OEE Improvement", value: "+41%", trend: "↑", positive: true },
      { label: "Defect Rate", value: "-58%", trend: "↓", positive: true },
      { label: "Downtime", value: "-44%", trend: "↓", positive: true },
    ],
    sparklineData: [2, 4, 5, 6, 5, 8, 9, 10, 9, 12],
    demoLink: "/demo/manufacturing",
  },
  {
    id: "supply-chain",
    name: "Supply Chain Analytics",
    icon: Truck,
    roi: 341,
    kpis: [
      { label: "On-Time Delivery", value: "+27%", trend: "↑", positive: true },
      { label: "Inventory Cost", value: "-38%", trend: "↓", positive: true },
      { label: "Lead Time", value: "-52%", trend: "↓", positive: true },
    ],
    sparklineData: [3, 4, 3, 6, 7, 8, 7, 10, 9, 11],
    demoLink: "/demo/supply-chain",
  },
  {
    id: "sales-marketing",
    name: "Sales & Marketing",
    icon: Megaphone,
    roi: 396,
    kpis: [
      { label: "Lead Conversion", value: "+52%", trend: "↑", positive: true },
      { label: "CAC Reduction", value: "-39%", trend: "↓", positive: true },
      { label: "Campaign ROI", value: "+67%", trend: "↑", positive: true },
    ],
    sparklineData: [2, 5, 4, 7, 6, 9, 10, 11, 10, 13],
    demoLink: "/demo/sales-marketing",
  },
  {
    id: "real-estate",
    name: "Real Estate & Construction",
    icon: Building2,
    roi: 289,
    kpis: [
      { label: "Portfolio ROI", value: "+31%", trend: "↑", positive: true },
      { label: "Project Overruns", value: "-47%", trend: "↓", positive: true },
      { label: "Occupancy Rate", value: "+22%", trend: "↑", positive: true },
    ],
    sparklineData: [1, 3, 4, 3, 5, 6, 7, 6, 8, 9],
    demoLink: "/demo/real-estate",
  },
];

// Section 4: Before vs After
export const beforeAfterData = [
  { metric: "Decision Speed", before: "3-5 Days", after: "4-6 Hours", beforePercent: 25, afterPercent: 92 },
  { metric: "Data Accuracy", before: "72%", after: "99.7%", beforePercent: 72, afterPercent: 99 },
  { metric: "Report Generation", before: "2-3 Weeks", after: "Real-time", beforePercent: 15, afterPercent: 98 },
  { metric: "Cost per Insight", before: "$12,400", after: "$890", beforePercent: 85, afterPercent: 8 },
  { metric: "Cross-dept Visibility", before: "23%", after: "94%", beforePercent: 23, afterPercent: 94 },
  { metric: "Predictive Capability", before: "Manual", after: "AI-Powered", beforePercent: 10, afterPercent: 95 },
];

// Section 5: ROI Benchmarks (BarChart)
export const benchmarkData = [
  { sector: "Retail", industryAvg: 105, goinsight: 287 },
  { sector: "Finance", industryAvg: 152, goinsight: 412 },
  { sector: "Healthcare", industryAvg: 118, goinsight: 324 },
  { sector: "Education", industryAvg: 95, goinsight: 256 },
  { sector: "Manufacturing", industryAvg: 140, goinsight: 378 },
  { sector: "Supply Chain", industryAvg: 125, goinsight: 341 },
  { sector: "Sales & Mktg", industryAvg: 148, goinsight: 396 },
  { sector: "Real Estate", industryAvg: 108, goinsight: 289 },
];

// Section 6: AI Insights
export const aiInsights = [
  {
    title: "Predictive Revenue Forecasting",
    description: "ML models that predict revenue trends with exceptional precision, enabling proactive business strategies.",
    stat: "94.2%",
    statLabel: "Forecast Accuracy",
    chartData: [4, 6, 5, 8, 7, 10, 9, 12, 11, 14],
  },
  {
    title: "Anomaly Detection",
    description: "Real-time monitoring catches data anomalies before they impact operations or revenue streams.",
    stat: "<2 min",
    statLabel: "Detection Time",
    chartData: [8, 3, 7, 2, 6, 4, 5, 3, 6, 2],
  },
  {
    title: "Natural Language Insights",
    description: "AI-generated plain-English insights delivered to stakeholders, no data expertise required.",
    stat: "1,000+",
    statLabel: "Daily Insights",
    chartData: [3, 5, 7, 6, 8, 10, 9, 11, 13, 12],
  },
];

export const aiBottomStats = [
  { value: "12M+", label: "Data Points Processed" },
  { value: "50+", label: "ML Models Active" },
  { value: "94.2%", label: "Prediction Accuracy" },
  { value: "<2 min", label: "Anomaly Detection" },
];

// Section 7: Methodology Steps
export const methodologySteps = [
  {
    step: 1,
    title: "Data Collection",
    description: "Secure ingestion from 100+ data sources with automated quality checks",
  },
  {
    step: 2,
    title: "Analysis & Modeling",
    description: "Advanced statistical analysis and ML model training on your datasets",
  },
  {
    step: 3,
    title: "Validation",
    description: "Rigorous A/B testing and peer review of all insights and recommendations",
  },
  {
    step: 4,
    title: "Continuous Optimization",
    description: "Ongoing model refinement and dashboard evolution based on feedback",
  },
];

export const trustBadges = [
  { label: "ISO 27001 Compliant", icon: "shield" as const },
  { label: "NDA-Protected", icon: "lock" as const },
  { label: "Peer-Reviewed Methodology", icon: "check" as const },
];

// Section 8: Client Impact
export const clientTestimonial = {
  quote:
    "GoInsight transformed our entire analytics infrastructure. Within 6 months, we saw a 312% ROI on our investment. Their dashboards didn't just visualize data — they fundamentally changed how we make decisions across all departments.",
  author: "VP of Analytics",
  company: "Fortune 500 Retail Enterprise",
  metrics: [
    { label: "ROI Achieved", value: "312%" },
    { label: "Time to Value", value: "4 weeks" },
    { label: "Departments Impacted", value: "12" },
    { label: "Annual Savings", value: "$3.2M" },
  ],
};

// Section 9: ROI Calculator
export const industryOptions = [
  "Retail",
  "Finance",
  "Healthcare",
  "Education",
  "Manufacturing",
  "Supply Chain",
  "Sales & Marketing",
  "Real Estate",
];

export const companySizeOptions = [
  "Small (50-200 employees)",
  "Medium (200-1000 employees)",
  "Large (1000-5000 employees)",
  "Enterprise (5000+ employees)",
];

export const roiEstimates: Record<string, Record<string, { min: number; max: number }>> = {
  Retail: {
    "Small (50-200 employees)": { min: 180, max: 240 },
    "Medium (200-1000 employees)": { min: 220, max: 290 },
    "Large (1000-5000 employees)": { min: 260, max: 340 },
    "Enterprise (5000+ employees)": { min: 300, max: 420 },
  },
  Finance: {
    "Small (50-200 employees)": { min: 220, max: 310 },
    "Medium (200-1000 employees)": { min: 280, max: 380 },
    "Large (1000-5000 employees)": { min: 340, max: 440 },
    "Enterprise (5000+ employees)": { min: 380, max: 520 },
  },
  Healthcare: {
    "Small (50-200 employees)": { min: 190, max: 260 },
    "Medium (200-1000 employees)": { min: 240, max: 320 },
    "Large (1000-5000 employees)": { min: 290, max: 380 },
    "Enterprise (5000+ employees)": { min: 320, max: 450 },
  },
  Education: {
    "Small (50-200 employees)": { min: 150, max: 210 },
    "Medium (200-1000 employees)": { min: 190, max: 260 },
    "Large (1000-5000 employees)": { min: 230, max: 300 },
    "Enterprise (5000+ employees)": { min: 260, max: 370 },
  },
  Manufacturing: {
    "Small (50-200 employees)": { min: 210, max: 290 },
    "Medium (200-1000 employees)": { min: 270, max: 360 },
    "Large (1000-5000 employees)": { min: 320, max: 420 },
    "Enterprise (5000+ employees)": { min: 360, max: 490 },
  },
  "Supply Chain": {
    "Small (50-200 employees)": { min: 200, max: 270 },
    "Medium (200-1000 employees)": { min: 250, max: 340 },
    "Large (1000-5000 employees)": { min: 300, max: 390 },
    "Enterprise (5000+ employees)": { min: 340, max: 460 },
  },
  "Sales & Marketing": {
    "Small (50-200 employees)": { min: 220, max: 300 },
    "Medium (200-1000 employees)": { min: 280, max: 380 },
    "Large (1000-5000 employees)": { min: 340, max: 430 },
    "Enterprise (5000+ employees)": { min: 370, max: 510 },
  },
  "Real Estate": {
    "Small (50-200 employees)": { min: 170, max: 230 },
    "Medium (200-1000 employees)": { min: 210, max: 290 },
    "Large (1000-5000 employees)": { min: 250, max: 340 },
    "Enterprise (5000+ employees)": { min: 280, max: 400 },
  },
};
