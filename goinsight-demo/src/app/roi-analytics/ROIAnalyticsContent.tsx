"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ROIHeroSection from "@/components/roi/ROIHeroSection";
import CrossIndustryOverview from "@/components/roi/CrossIndustryOverview";
import SectorROIGrid from "@/components/roi/SectorROIGrid";
import BeforeAfterSection from "@/components/roi/BeforeAfterSection";
import ROIBenchmarksChart from "@/components/roi/ROIBenchmarksChart";
import AIInsightsSection from "@/components/roi/AIInsightsSection";
import MethodologySection from "@/components/roi/MethodologySection";
import ClientImpactSection from "@/components/roi/ClientImpactSection";
import ROICalculatorCTA from "@/components/roi/ROICalculatorCTA";

export default function ROIAnalyticsContent() {
  return (
    <>
      <Header />
      <main>
        <ROIHeroSection />
        <CrossIndustryOverview />
        <SectorROIGrid />
        <BeforeAfterSection />
        <ROIBenchmarksChart />
        <AIInsightsSection />
        <MethodologySection />
        <ClientImpactSection />
        <ROICalculatorCTA />
      </main>
      <Footer showCTA={true} />
    </>
  );
}
