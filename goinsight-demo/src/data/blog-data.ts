export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  linkedin?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  coverImage: string;
  keywords: string[];
  tableOfContents: { id: string; title: string }[];
}

export const blogAuthors: Record<string, BlogAuthor> = {
  anand: {
    name: "Anand Gupta",
    role: "Founder & Analytics Lead",
    avatar: "/Go-Insight-Color_ICON.png",
    bio: "Anand Gupta is the founder of GoInsight, with 8+ years of experience in data analytics, business intelligence, and AI/ML consulting. He has led 100+ analytics projects across India, UAE, and Australia.",
    linkedin: "https://www.linkedin.com/company/goinsight/",
  },
  team: {
    name: "GoInsight Team",
    role: "Analytics & BI Experts",
    avatar: "/Go-Insight-Color_ICON.png",
    bio: "The GoInsight team comprises 40+ analytics professionals specializing in Power BI, Tableau, Python, AI/ML, and data visualization across 10+ industries globally.",
    linkedin: "https://www.linkedin.com/company/goinsight/",
  },
};

export const blogCategories = [
  "All",
  "Data Analytics",
  "Business Intelligence",
  "AI & ML",
  "Regional Insights",
  "Dashboard Design",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const blogPosts: BlogPost[] = [
  {
    slug: "data-analytics-transforming-business-2026",
    title: "How Data Analytics is Transforming Business Decision-Making in 2026",
    excerpt:
      "Discover how modern data analytics is reshaping business strategies across industries in India, Dubai, UAE, and Australia. From real-time dashboards to predictive models, learn what leading companies are doing differently.",
    category: "Data Analytics",
    tags: ["data analytics", "business intelligence", "decision making", "2026 trends"],
    author: blogAuthors.anand,
    publishedAt: "2026-02-10",
    updatedAt: "2026-02-20",
    readTime: 10,
    coverImage: "/og-image.png",
    keywords: [
      "data analytics consulting",
      "data-driven decisions",
      "data analytics India",
      "data analytics Dubai",
      "data analytics Australia",
      "business analytics 2026",
      "data analytics trends",
      "enterprise analytics",
      "analytics ROI",
      "data analytics company",
    ],
    tableOfContents: [
      { id: "the-data-analytics-revolution", title: "The Data Analytics Revolution" },
      { id: "key-trends-2026", title: "Key Data Analytics Trends in 2026" },
      { id: "industry-impact", title: "Industry-by-Industry Impact" },
      { id: "building-analytics-culture", title: "Building a Data-Driven Culture" },
      { id: "implementation-roadmap", title: "Implementation Roadmap" },
      { id: "roi-of-analytics", title: "The ROI of Analytics" },
      { id: "conclusion", title: "Conclusion" },
    ],
  },
  {
    slug: "power-bi-vs-tableau",
    title: "Power BI vs Tableau: Which BI Tool is Right for Your Business?",
    excerpt:
      "An in-depth comparison of Power BI and Tableau — pricing, features, ease of use, data connectivity, and real-world performance. Find out which BI platform fits your organization best.",
    category: "Business Intelligence",
    tags: ["Power BI", "Tableau", "BI tools", "comparison", "data visualization"],
    author: blogAuthors.team,
    publishedAt: "2026-02-12",
    updatedAt: "2026-02-20",
    readTime: 12,
    coverImage: "/og-image.png",
    keywords: [
      "Power BI consulting",
      "Tableau consulting",
      "Power BI vs Tableau",
      "BI tool comparison",
      "Power BI India",
      "Tableau India",
      "Power BI Dubai",
      "Tableau Dubai",
      "business intelligence tools",
      "best BI tool 2026",
      "Power BI pricing",
      "Tableau pricing",
    ],
    tableOfContents: [
      { id: "introduction", title: "The BI Tool Dilemma" },
      { id: "overview", title: "Platform Overview" },
      { id: "pricing-comparison", title: "Pricing Comparison" },
      { id: "data-connectivity", title: "Data Connectivity & Integration" },
      { id: "visualization", title: "Visualization Capabilities" },
      { id: "ease-of-use", title: "Ease of Use & Learning Curve" },
      { id: "performance", title: "Performance & Scalability" },
      { id: "verdict", title: "The Verdict: Which Should You Choose?" },
    ],
  },
  {
    slug: "ai-powered-analytics-machine-learning-bi",
    title: "The Rise of AI-Powered Analytics: How Machine Learning is Reshaping BI",
    excerpt:
      "Explore how AI and machine learning are transforming business intelligence — from automated anomaly detection to predictive forecasting. Learn practical applications for your organization.",
    category: "AI & ML",
    tags: ["AI", "machine learning", "predictive analytics", "business intelligence", "automation"],
    author: blogAuthors.anand,
    publishedAt: "2026-02-15",
    updatedAt: "2026-02-20",
    readTime: 11,
    coverImage: "/og-image.png",
    keywords: [
      "AI ML solutions",
      "AI powered analytics",
      "machine learning business intelligence",
      "predictive analytics",
      "AI analytics India",
      "AI analytics Dubai",
      "automated analytics",
      "ML models for business",
      "AI consulting",
      "AI data analytics",
    ],
    tableOfContents: [
      { id: "ai-analytics-revolution", title: "The AI-Analytics Revolution" },
      { id: "key-ai-capabilities", title: "Key AI Capabilities in Modern BI" },
      { id: "real-world-applications", title: "Real-World Applications" },
      { id: "implementation-guide", title: "Implementation Guide" },
      { id: "tools-and-platforms", title: "Tools & Platforms" },
      { id: "challenges", title: "Challenges & How to Overcome Them" },
      { id: "future-outlook", title: "Future Outlook" },
    ],
  },
  {
    slug: "data-analytics-consulting-dubai-middle-east",
    title: "Data Analytics Consulting in Dubai & the Middle East: A Complete Guide",
    excerpt:
      "A comprehensive guide to data analytics consulting in Dubai, UAE, Saudi Arabia, and the MENA region. Understand the market landscape, Vision 2030 opportunities, and how to choose the right analytics partner.",
    category: "Regional Insights",
    tags: ["Dubai", "UAE", "Middle East", "MENA", "Saudi Arabia", "analytics consulting"],
    author: blogAuthors.anand,
    publishedAt: "2026-02-18",
    updatedAt: "2026-02-20",
    readTime: 10,
    coverImage: "/og-image.png",
    keywords: [
      "data analytics consulting Dubai",
      "data analytics UAE",
      "analytics consulting Middle East",
      "Power BI consulting Dubai",
      "business intelligence Dubai",
      "data analytics Saudi Arabia",
      "Vision 2030 analytics",
      "MENA analytics market",
      "Dubai analytics company",
      "analytics consulting Abu Dhabi",
    ],
    tableOfContents: [
      { id: "mena-analytics-landscape", title: "The MENA Analytics Landscape" },
      { id: "dubai-uae-market", title: "Dubai & UAE Market Deep Dive" },
      { id: "saudi-vision-2030", title: "Saudi Arabia & Vision 2030" },
      { id: "key-industries", title: "Key Industries Driving Demand" },
      { id: "choosing-partner", title: "Choosing the Right Analytics Partner" },
      { id: "goinsight-in-mena", title: "GoInsight in the MENA Region" },
      { id: "getting-started", title: "Getting Started" },
    ],
  },
  {
    slug: "top-10-kpi-dashboards-2026",
    title: "Top 10 KPI Dashboards Every Business Needs in 2026",
    excerpt:
      "Explore the top 10 KPI dashboards that drive growth — from executive summary dashboards to real-time operational monitors. Includes design best practices and implementation tips.",
    category: "Dashboard Design",
    tags: ["KPI dashboards", "dashboard design", "data visualization", "metrics", "reporting"],
    author: blogAuthors.team,
    publishedAt: "2026-02-20",
    updatedAt: "2026-02-22",
    readTime: 13,
    coverImage: "/og-image.png",
    keywords: [
      "KPI dashboard",
      "dashboard development",
      "custom dashboard",
      "dashboard design",
      "KPI dashboards 2026",
      "Power BI dashboard",
      "Tableau dashboard",
      "executive dashboard",
      "sales dashboard",
      "marketing dashboard",
      "dashboard development India",
      "dashboard development Dubai",
    ],
    tableOfContents: [
      { id: "why-kpi-dashboards-matter", title: "Why KPI Dashboards Matter" },
      { id: "executive-summary-dashboard", title: "1. Executive Summary Dashboard" },
      { id: "sales-performance-dashboard", title: "2. Sales Performance Dashboard" },
      { id: "marketing-analytics-dashboard", title: "3. Marketing Analytics Dashboard" },
      { id: "financial-kpi-dashboard", title: "4. Financial KPI Dashboard" },
      { id: "operations-dashboard", title: "5. Operations Dashboard" },
      { id: "customer-analytics-dashboard", title: "6. Customer Analytics Dashboard" },
      { id: "hr-workforce-dashboard", title: "7. HR & Workforce Dashboard" },
      { id: "supply-chain-dashboard", title: "8. Supply Chain Dashboard" },
      { id: "product-analytics-dashboard", title: "9. Product Analytics Dashboard" },
      { id: "real-time-monitoring-dashboard", title: "10. Real-Time Monitoring Dashboard" },
      { id: "design-best-practices", title: "Design Best Practices" },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return blogPosts.slice(0, limit);

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
