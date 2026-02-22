"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { analyticsDomains, AnalyticsDomain } from "@/data/analytics-domains";
import Building from "./Building";

interface AnalyticsCityProps {
  onBuildingClick: (domain: AnalyticsDomain) => void;
}

export default function AnalyticsCity({ onBuildingClick }: AnalyticsCityProps) {
  const row1 = analyticsDomains.filter((d) => d.gridPosition.row === 1);
  const row2 = analyticsDomains.filter((d) => d.gridPosition.row === 2);

  return (
    <section id="services" className="py-10 md:py-16 bg-brand-background relative overflow-hidden">
      {/* City Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Clouds — CSS only, no JS animation */}
        <div className="absolute top-10 left-[10%] w-24 h-8 bg-white/60 rounded-full blur-sm hidden sm:block" />
        <div className="absolute top-20 right-[20%] w-32 h-10 bg-white/50 rounded-full blur-sm hidden sm:block" />
        <div className="absolute top-8 left-[50%] w-20 h-6 bg-white/40 rounded-full blur-sm hidden sm:block" />

        {/* Sun — static glow, no box-shadow animation */}
        <div
          className="absolute top-12 right-[5%] sm:right-[10%] w-10 h-10 sm:w-16 sm:h-16 bg-brand-yellow rounded-full"
          style={{ boxShadow: "0 0 50px rgba(236, 196, 26, 0.5)" }}
        />

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-primary/10 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-2 md:mb-4">
            <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
              Explore
            </span>
            {" "}GoInsight Analytics City
          </h2>
          <p className="text-brand-secondary max-w-2xl mx-auto text-sm md:text-base">
            Click on any building to explore industry-specific analytics dashboards
            and discover insights tailored to your business needs.
          </p>
        </motion.div>

        {/* City Grid */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {/* Road Above Row 1 */}
          <div className="w-full h-6 md:h-8 bg-gray-300 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
              <div className="w-full h-1 border-t-4 border-dashed border-brand-yellow" />
            </div>
          </div>

          {/* Row 1 Buildings with Trees and Landscaping */}
          <div className="flex flex-wrap justify-center items-end gap-2 sm:gap-4 md:gap-6 relative px-4">
            {/* Left side trees */}
            <div className="hidden lg:flex items-end gap-3">
              {/* Tree 1 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full" />
                <div className="w-6 h-6 bg-green-600 rounded-full -mt-2" />
                <div className="w-2 h-5 bg-amber-700" />
              </div>
              {/* Grass patch */}
              <div className="flex items-end gap-0.5 mb-1">
                <div className="w-1 h-3 bg-green-500 rounded-t-full" />
                <div className="w-1 h-4 bg-green-600 rounded-t-full" />
                <div className="w-1 h-2 bg-green-500 rounded-t-full" />
                <div className="w-1 h-3 bg-green-600 rounded-t-full" />
              </div>
              {/* Small bush */}
              <div className="w-6 h-4 bg-green-500 rounded-full mb-1" />
            </div>

            {row1.map((domain, index) => (
              <div key={domain.id} className="flex items-end gap-2 sm:gap-3 md:gap-4">
                {/* Tree before first building */}
                {index === 0 && (
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full" />
                    <div className="w-5 h-5 bg-green-600 rounded-full -mt-1.5" />
                    <div className="w-1.5 h-4 bg-amber-700" />
                  </div>
                )}

                <Building
                  domain={domain}
                  onClick={() => onBuildingClick(domain)}
                  index={index}
                />

                {/* Decorations between buildings */}
                {index < row1.length - 1 && (
                  <div className="hidden sm:flex items-end gap-1.5">
                    {/* Small tree */}
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full" />
                      <div className="w-4 h-4 bg-green-600 rounded-full -mt-1" />
                      <div className="w-1 h-3 bg-amber-700" />
                    </div>
                    {/* Grass */}
                    <div className="flex items-end gap-0.5 mb-1">
                      <div className="w-0.5 h-2 bg-green-500 rounded-t-full" />
                      <div className="w-0.5 h-3 bg-green-600 rounded-t-full" />
                      <div className="w-0.5 h-2 bg-green-500 rounded-t-full" />
                    </div>
                    {/* Bush */}
                    <div className="w-4 h-3 bg-green-600 rounded-full mb-1" />
                  </div>
                )}
              </div>
            ))}

            {/* Right side trees */}
            <div className="hidden lg:flex items-end gap-3">
              {/* Bush */}
              <div className="w-5 h-4 bg-green-600 rounded-full mb-1" />
              {/* Grass patch */}
              <div className="flex items-end gap-0.5 mb-1">
                <div className="w-1 h-4 bg-green-500 rounded-t-full" />
                <div className="w-1 h-3 bg-green-600 rounded-t-full" />
                <div className="w-1 h-5 bg-green-500 rounded-t-full" />
                <div className="w-1 h-3 bg-green-600 rounded-t-full" />
              </div>
              {/* Tree */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 bg-green-500 rounded-full" />
                <div className="w-7 h-7 bg-green-600 rounded-full -mt-2" />
                <div className="w-2 h-6 bg-amber-700" />
              </div>
            </div>

            {/* Walking Person 1 - hidden on mobile */}
            <motion.div
              className="absolute -bottom-2 left-[15%] z-20 hidden sm:block"
              animate={{ x: [0, 100, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-amber-300 rounded-full" />
                <div className="w-4 h-5 bg-blue-500 rounded-t-lg -mt-0.5" />
                <motion.div
                  className="flex gap-1 -mt-0.5"
                  animate={{ scaleX: [1, 0.8, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <div className="w-1.5 h-3 bg-gray-700 rounded-b" />
                  <div className="w-1.5 h-3 bg-gray-700 rounded-b" />
                </motion.div>
              </div>
            </motion.div>

            {/* Walking Person 2 - hidden on mobile */}
            <motion.div
              className="absolute -bottom-2 right-[20%] z-20 hidden sm:block"
              animate={{ x: [0, -80, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-amber-200 rounded-full" />
                <div className="w-4 h-5 bg-red-500 rounded-t-lg -mt-0.5" />
                <motion.div
                  className="flex gap-1 -mt-0.5"
                  animate={{ scaleX: [1, 0.8, 1] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                >
                  <div className="w-1.5 h-3 bg-gray-600 rounded-b" />
                  <div className="w-1.5 h-3 bg-gray-600 rounded-b" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Road Between Rows with Traffic Lights and Welcome Board */}
          <div className="w-full flex items-center justify-center gap-2 md:gap-4 px-4">
            {/* Welcome Board - Left side */}
            <motion.div
              className="flex-col items-center hidden sm:flex"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Sign Board */}
              <div className="bg-brand-primary border-2 border-brand-yellow rounded px-2 py-1.5 shadow-md">
                <div className="flex items-center gap-1.5">
                  {/* Icon */}
                  <div className="w-6 h-6 md:w-7 md:h-7 relative flex-shrink-0">
                    <Image
                      src="/Go-Insight-Color_ICON.png"
                      alt="GoInsight"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Text */}
                  <div>
                    <p className="text-brand-yellow text-[6px] md:text-[8px] font-medium leading-none">WELCOME TO</p>
                    <p className="text-white text-[8px] md:text-[10px] font-bold leading-tight">
                      GoInsight Analytics City
                    </p>
                  </div>
                </div>
                {/* Consult Now Button */}
                <a
                  href="/contact"
                  className="block mt-1.5 bg-brand-yellow text-brand-dark text-[7px] md:text-[9px] font-bold py-1 px-2 rounded text-center hover:bg-yellow-400 transition-colors"
                >
                  Consult Now
                </a>
              </div>
              {/* Sign Post */}
              <div className="w-1.5 h-6 bg-gray-600 rounded-b" />
            </motion.div>

            {/* Traffic Light - Left side (hidden on mobile) */}
            <div className="flex-col items-center hidden md:flex">
              <div className="w-4 h-10 bg-gray-800 rounded-sm flex flex-col items-center justify-around py-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-900/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-900/40" />
              </div>
              <div className="w-1.5 h-6 bg-gray-700" />
            </div>

            {/* Road */}
            <div className="flex-1 h-10 md:h-12 bg-gray-400 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
                <div className="w-full h-0 border-t-[6px] border-dashed border-white/70" />
              </div>
              {/* Car 1 - Yellow going right */}
              <motion.div
                className="absolute top-1 w-10 h-5 rounded-sm flex items-end"
                animate={{ x: ["-10%", "1100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute bottom-0 w-full h-3 bg-brand-yellow rounded-sm" />
                  <div className="absolute bottom-2 left-1 w-4 h-2 bg-brand-yellow rounded-t-sm" />
                  <div className="absolute bottom-0 left-1 w-2 h-1 bg-gray-800 rounded-full" />
                  <div className="absolute bottom-0 right-1 w-2 h-1 bg-gray-800 rounded-full" />
                </div>
              </motion.div>
              {/* Car 2 - Dark going left */}
              <motion.div
                className="absolute bottom-1 w-10 h-5 rounded-sm flex items-end"
                animate={{ x: ["1100%", "-10%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute bottom-0 w-full h-3 bg-brand-primary rounded-sm" />
                  <div className="absolute bottom-2 left-2 w-4 h-2 bg-brand-primary rounded-t-sm" />
                  <div className="absolute bottom-0 left-1 w-2 h-1 bg-gray-800 rounded-full" />
                  <div className="absolute bottom-0 right-1 w-2 h-1 bg-gray-800 rounded-full" />
                </div>
              </motion.div>
              {/* Bike going left on bottom lane (starts from right end) */}
              <motion.div
                className="absolute bottom-1 flex items-end"
                animate={{ x: ["1100%", "-10%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 7 }}
              >
                <div className="relative w-6 h-5">
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-2 border-gray-700 rounded-full" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-2 border-gray-700 rounded-full" />
                  <div className="absolute bottom-1 left-1 w-4 h-0.5 bg-red-500 rotate-[-20deg]" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-2 bg-green-500 rounded-t-full" />
                  <div className="absolute bottom-3.5 left-2 w-1.5 h-1.5 bg-amber-200 rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Traffic Light - Right side (hidden on mobile) */}
            <div className="flex-col items-center hidden md:flex">
              <div className="w-4 h-10 bg-gray-800 rounded-sm flex flex-col items-center justify-around py-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-900/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-900/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="w-1.5 h-6 bg-gray-700" />
            </div>
          </div>

          {/* Row 2 Buildings with Trees and Landscaping */}
          <div className="flex flex-wrap justify-center items-end gap-2 sm:gap-4 md:gap-6 relative px-4">
            {/* Left side trees */}
            <div className="hidden lg:flex items-end gap-3">
              {/* Bush */}
              <div className="w-5 h-4 bg-green-600 rounded-full mb-1" />
              {/* Grass patch */}
              <div className="flex items-end gap-0.5 mb-1">
                <div className="w-1 h-4 bg-green-600 rounded-t-full" />
                <div className="w-1 h-2 bg-green-500 rounded-t-full" />
                <div className="w-1 h-3 bg-green-600 rounded-t-full" />
                <div className="w-1 h-3 bg-green-500 rounded-t-full" />
              </div>
              {/* Tree */}
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 bg-green-600 rounded-full" />
                <div className="w-7 h-7 bg-green-500 rounded-full -mt-2" />
                <div className="w-2 h-5 bg-amber-700" />
              </div>
            </div>

            {row2.map((domain, index) => (
              <div key={domain.id} className="flex items-end gap-2 sm:gap-3 md:gap-4">
                {/* Tree before first building */}
                {index === 0 && (
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-6 h-6 bg-green-600 rounded-full" />
                    <div className="w-5 h-5 bg-green-500 rounded-full -mt-1.5" />
                    <div className="w-1.5 h-4 bg-amber-700" />
                  </div>
                )}

                <Building
                  domain={domain}
                  onClick={() => onBuildingClick(domain)}
                  index={index + 3}
                />

                {/* Decorations between buildings */}
                {index < row2.length - 1 && (
                  <div className="hidden sm:flex items-end gap-1.5">
                    {/* Grass */}
                    <div className="flex items-end gap-0.5 mb-1">
                      <div className="w-0.5 h-3 bg-green-600 rounded-t-full" />
                      <div className="w-0.5 h-2 bg-green-500 rounded-t-full" />
                      <div className="w-0.5 h-3 bg-green-600 rounded-t-full" />
                    </div>
                    {/* Small tree */}
                    <div className="flex flex-col items-center">
                      <div className="w-5 h-5 bg-green-600 rounded-full" />
                      <div className="w-4 h-4 bg-green-500 rounded-full -mt-1" />
                      <div className="w-1 h-3 bg-amber-700" />
                    </div>
                    {/* Bush */}
                    <div className="w-4 h-3 bg-green-500 rounded-full mb-1" />
                  </div>
                )}
              </div>
            ))}

            {/* Right side trees */}
            <div className="hidden lg:flex items-end gap-3">
              {/* Tree */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full" />
                <div className="w-6 h-6 bg-green-500 rounded-full -mt-2" />
                <div className="w-2 h-6 bg-amber-700" />
              </div>
              {/* Grass patch */}
              <div className="flex items-end gap-0.5 mb-1">
                <div className="w-1 h-3 bg-green-500 rounded-t-full" />
                <div className="w-1 h-4 bg-green-600 rounded-t-full" />
                <div className="w-1 h-2 bg-green-500 rounded-t-full" />
                <div className="w-1 h-4 bg-green-600 rounded-t-full" />
              </div>
              {/* Small bush */}
              <div className="w-6 h-4 bg-green-500 rounded-full mb-1" />
            </div>

            {/* Walking Person 3 - hidden on mobile */}
            <motion.div
              className="absolute -bottom-2 left-[30%] z-20 hidden sm:block"
              animate={{ x: [0, 60, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-amber-300 rounded-full" />
                <div className="w-4 h-5 bg-green-600 rounded-t-lg -mt-0.5" />
                <motion.div
                  className="flex gap-1 -mt-0.5"
                  animate={{ scaleX: [1, 0.8, 1] }}
                  transition={{ duration: 0.45, repeat: Infinity }}
                >
                  <div className="w-1.5 h-3 bg-blue-900 rounded-b" />
                  <div className="w-1.5 h-3 bg-blue-900 rounded-b" />
                </motion.div>
              </div>
            </motion.div>

            {/* Walking Person 4 - with briefcase (hidden on mobile) */}
            <motion.div
              className="absolute -bottom-2 right-[10%] z-20 hidden sm:block"
              animate={{ x: [0, -120, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              <div className="flex flex-col items-center relative">
                <div className="w-3 h-3 bg-amber-200 rounded-full" />
                <div className="w-4 h-5 bg-gray-700 rounded-t-lg -mt-0.5" />
                <div className="absolute top-4 -right-2 w-2 h-1.5 bg-amber-700 rounded-sm" />
                <motion.div
                  className="flex gap-1 -mt-0.5"
                  animate={{ scaleX: [1, 0.8, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <div className="w-1.5 h-3 bg-gray-800 rounded-b" />
                  <div className="w-1.5 h-3 bg-gray-800 rounded-b" />
                </motion.div>
              </div>
            </motion.div>

            {/* Walking Person 5 - hidden on mobile */}
            <motion.div
              className="absolute -bottom-2 left-[60%] z-20 hidden md:block"
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-amber-300 rounded-full" />
                <div className="w-4 h-5 bg-purple-500 rounded-t-lg -mt-0.5" />
                <motion.div
                  className="flex gap-1 -mt-0.5"
                  animate={{ scaleX: [1, 0.8, 1] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                >
                  <div className="w-1.5 h-3 bg-gray-700 rounded-b" />
                  <div className="w-1.5 h-3 bg-gray-700 rounded-b" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Road Below Row 2 */}
          <div className="w-full h-6 md:h-8 bg-gray-300 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
              <div className="w-full h-1 bg-brand-yellow" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
