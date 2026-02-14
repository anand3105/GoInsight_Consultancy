import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: "GoInsight - Analytics That Matter",
  description:
    "Explore industry-specific analytics dashboards with GoInsight. Navigate our data city to discover the perfect analytics solution for Retail, Finance, Healthcare, Manufacturing, Supply Chain, and Sales & Marketing.",
  keywords: [
    "analytics",
    "dashboard",
    "business intelligence",
    "data visualization",
    "retail analytics",
    "finance analytics",
    "healthcare analytics",
  ],
  authors: [{ name: "GoInsight Team" }],
  openGraph: {
    title: "GoInsight - Analytics That Matter",
    description:
      "Navigate our data city and preview industry-specific dashboards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-light text-brand-dark antialiased">{children}</body>
    </html>
  );
}
