"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import AnalyticsCity from "@/components/AnalyticsCity";
import FeaturesSection from "@/components/FeaturesSection";
import ProcessSection from "@/components/ProcessSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import DemoModal from "@/components/DemoModal";
import Footer from "@/components/Footer";
import { AnalyticsDomain } from "@/data/analytics-domains";

export default function HomeContent() {
  const [selectedDomain, setSelectedDomain] = useState<AnalyticsDomain | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  const handleBuildingClick = (domain: AnalyticsDomain) => {
    setSelectedDomain(domain);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const scrollToCity = () => {
    cityRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero onCtaClick={scrollToCity} />

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Analytics City Section */}
      <div ref={cityRef}>
        <AnalyticsCity onBuildingClick={handleBuildingClick} />
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Technologies Section */}
      <TechnologiesSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Footer */}
      <Footer />

      {/* Demo Modal */}
      <DemoModal
        domain={selectedDomain}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
