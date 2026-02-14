"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroProps {
  onCtaClick: () => void;
}

const dashboardImages = [
  {
    src: "/Completitive_marketreport.png",
    alt: "Competitive Market Report",
  },
  {
    src: "/Completitive_marketchart.png",
    alt: "Competitive Market Chart",
  },
  {
    src: "/Sales_roi_chart.png",
    alt: "Sales and ROI Chart",
  },
];

export default function Hero({ onCtaClick }: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % dashboardImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[calc(100vh-200px)] relative flex items-center bg-gradient-to-b from-brand-light to-brand-background overflow-hidden py-8 lg:py-0">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#13192608_1px,transparent_1px),linear-gradient(to_bottom,#13192608_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Content - 40% */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Headline */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empowering Businesses with{" "}
              <span className="text-brand-sky">Insightful Analytics</span>
            </motion.h1>

            {/* Subtext */}
            <motion.div
              className="mb-6 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg font-semibold text-brand-dark mb-2">
                Explore Analytics That Matter to You
              </p>
              <p className="text-base text-brand-secondary">
                Navigate our Analytics City and preview industry-specific dashboards.
                Discover the perfect analytics solution for your business needs.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-brand-dark font-semibold text-base rounded-xl shadow-lg hover:bg-yellow-400 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 196, 26, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={onCtaClick}
            >
              Start Exploring
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>

            {/* Trust Badges */}
            <motion.div
              className="mt-6 flex flex-wrap justify-center lg:justify-start gap-5 text-brand-secondary/70 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-sky" />
                <span>Custom Dashboards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-yellow" />
                <span>Enterprise Ready</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* Main Image Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                    <Image
                      src={dashboardImages[currentImage].src}
                      alt={dashboardImages[currentImage].alt}
                      width={550}
                      height={350}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative Elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-brand-yellow/30 rounded-full blur-xl -z-10" />
              <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-brand-sky/20 rounded-full blur-xl -z-10" />

              {/* Image Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {dashboardImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImage
                        ? "bg-brand-yellow w-6"
                        : "bg-brand-dark/20 hover:bg-brand-dark/40 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
