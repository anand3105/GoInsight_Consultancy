import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  metadataBase: new URL("https://goinsight.in"),
  title: {
    default:
      "GoInsight — Data Analytics Consulting & Business Intelligence Solutions",
    template: "%s | GoInsight",
  },
  description:
    "GoInsight delivers enterprise analytics consulting, Power BI dashboards, AI/ML solutions, and data visualization. Serving retail, finance, healthcare & 10+ industries globally.",
  keywords: [
    "analytics consulting",
    "data analytics",
    "business intelligence",
    "Power BI dashboard",
    "data visualization",
    "GoInsight",
    "AI ML solutions",
    "data-driven decisions",
    "enterprise analytics",
    "predictive analytics",
    "custom dashboard development",
    "data warehousing",
    "retail analytics",
    "finance analytics",
    "healthcare analytics",
    "manufacturing analytics",
    "supply chain analytics",
    "education analytics",
    "real estate analytics",
    "analytics consulting India",
    "Power BI consulting",
    "data strategy",
  ],
  authors: [{ name: "GoInsight Team" }],
  openGraph: {
    title:
      "GoInsight — Data Analytics Consulting & Business Intelligence Solutions",
    description:
      "Enterprise analytics consulting, Power BI dashboards, AI/ML solutions & data visualization across 10+ industries.",
    url: "https://goinsight.in",
    siteName: "GoInsight",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GoInsight — Data Analytics Consulting",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "GoInsight — Data Analytics Consulting & Business Intelligence Solutions",
    description:
      "Enterprise analytics consulting, Power BI dashboards, AI/ML solutions & data visualization across 10+ industries.",
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
  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_VERIFICATION",
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
