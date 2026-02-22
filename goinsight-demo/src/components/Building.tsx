"use client";

import { motion } from "framer-motion";
import { AnalyticsDomain } from "@/data/analytics-domains";
import { useState } from "react";

interface BuildingProps {
  domain: AnalyticsDomain;
  onClick: () => void;
  index: number;
}

const heightClasses = {
  short: "h-28 sm:h-32",
  medium: "h-36 sm:h-40",
  tall: "h-44 sm:h-48",
};

export default function Building({ domain, onClick, index }: BuildingProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = domain.icon;

  return (
    <motion.div
      className="relative cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Tooltip - outside the overflow-hidden container (hidden on mobile, show on tap/hover) */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 -top-10 sm:-top-12
          bg-brand-dark text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap
          z-50 pointer-events-none
          transition-all duration-200
          hidden sm:block
          ${isHovered ? 'sm:opacity-100 sm:visible' : 'sm:opacity-0 sm:invisible'}
        `}
      >
        {domain.shortDescription}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-brand-dark rotate-45" />
      </div>

      {/* Building */}
      <motion.div
        className={`
          relative ${heightClasses[domain.buildingHeight]} w-28 sm:w-36
          bg-brand-light border-2 border-brand-primary rounded-t-lg
          flex flex-col items-center justify-end pb-3 sm:pb-4
          overflow-hidden
        `}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(236, 196, 26, 0.7)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Windows Grid — static, uses group-hover for glow */}
        <div className="absolute top-4 left-0 right-0 px-3">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: domain.buildingHeight === "tall" ? 9 : domain.buildingHeight === "medium" ? 6 : 3 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded-sm bg-brand-sky/20 transition-colors duration-300 group-hover:bg-brand-yellow/40"
              />
            ))}
          </div>
        </div>

        {/* Icon and Label */}
        <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2">
          <motion.div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-primary flex items-center justify-center"
            animate={{
              backgroundColor: isHovered ? "#ecc41a" : "#131926",
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>
          <span className="text-[10px] sm:text-xs font-semibold text-brand-dark text-center px-1 sm:px-2 leading-tight">
            {domain.name}
          </span>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-brand-light-blue/30 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Building Base */}
      <div className="h-3 sm:h-4 w-32 sm:w-40 -ml-2 bg-brand-primary/20 rounded-b-sm" />
    </motion.div>
  );
}
