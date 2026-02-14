"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import AnalyticsCity from "@/components/AnalyticsCity";
import FeaturesSection from "@/components/FeaturesSection";
import ProcessSection from "@/components/ProcessSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import DemoModal from "@/components/DemoModal";
import { AnalyticsDomain } from "@/data/analytics-domains";

export default function Home() {
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
      <footer className="bg-brand-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <Image
                src="/Go-Insight-White_logo.png"
                alt="GoInsight"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Industries
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </nav>

            <p className="text-sm text-white/60">
              © 2024 GoInsight. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <DemoModal
        domain={selectedDomain}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
