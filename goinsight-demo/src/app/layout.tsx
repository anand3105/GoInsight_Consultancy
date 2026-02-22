import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  metadataBase: new URL("https://goinsight.in"),
  title: {
    default:
      "GoInsight — Data Analytics Consulting & BI Solutions | India, Dubai, UAE, Australia",
    template: "%s | GoInsight",
  },
  description:
    "GoInsight delivers data analytics consulting, Power BI dashboards, AI/ML solutions & data visualization across India, Dubai, UAE, Saudi Arabia, MENA & Australia. 10+ industries. Book a free consultation.",
  keywords: [
    // Brand
    "GoInsight",
    "GoInsight Consultancy",
    // Core services
    "analytics consulting",
    "data analytics",
    "business intelligence",
    "Power BI dashboard",
    "Power BI consulting",
    "data visualization",
    "AI ML solutions",
    "data-driven decisions",
    "enterprise analytics",
    "predictive analytics",
    "custom dashboard development",
    "data warehousing",
    "Tableau consulting",
    "data strategy",
    // Industry
    "retail analytics",
    "finance analytics",
    "healthcare analytics",
    "manufacturing analytics",
    "supply chain analytics",
    "education analytics",
    "real estate analytics",
    // India
    "analytics consulting India",
    "data analytics company India",
    "Power BI consulting India",
    "business intelligence India",
    "analytics company New Delhi",
    "hire data analyst India",
    // UAE / Dubai / Abu Dhabi
    "data analytics consulting Dubai",
    "data analytics company UAE",
    "Power BI consulting Dubai",
    "business intelligence consulting Dubai",
    "analytics consulting Abu Dhabi",
    "dashboard development Dubai",
    // Middle East / MENA / Saudi Arabia
    "data analytics consulting Saudi Arabia",
    "business intelligence consulting Middle East",
    "Power BI consulting Saudi Arabia",
    "analytics consulting MENA",
    // Australia
    "data analytics consulting Australia",
    "data analytics company Sydney",
    "Power BI consulting Australia",
    "business intelligence consulting Australia",
    "data analytics company Melbourne",
  ],
  authors: [{ name: "GoInsight Team" }],
  openGraph: {
    title:
      "GoInsight — Data Analytics Consulting & BI Solutions | India, Dubai, UAE, Australia",
    description:
      "Enterprise analytics consulting, Power BI dashboards, AI/ML solutions & data visualization across India, UAE, Middle East & Australia.",
    url: "https://goinsight.in",
    siteName: "GoInsight",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GoInsight — Data Analytics Consulting India, Dubai, UAE, Australia",
      },
    ],
    locale: "en_IN",
    alternateLocale: ["en_AE", "en_AU", "en_SA"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "GoInsight — Data Analytics Consulting | India, Dubai, UAE, MENA, Australia",
    description:
      "Enterprise analytics consulting, Power BI dashboards, AI/ML solutions & data visualization across India, UAE, Middle East & Australia.",
    site: "@goinsight_",
    creator: "@goinsight_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: "https://goinsight.in",
    languages: {
      "en-IN": "https://goinsight.in",
      "en-AE": "https://goinsight.in",
      "en-AU": "https://goinsight.in",
      "en-SA": "https://goinsight.in",
      "x-default": "https://goinsight.in",
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    // other: { "msvalidate.01": "BING_WEBMASTER_VERIFICATION" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-light text-brand-dark antialiased">
        {children}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
