"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnalyticsDomain } from "@/data/analytics-domains";
import KPICard from "./KPICard";
import DashboardPreview from "./DashboardPreview";

interface DemoModalProps {
  domain: AnalyticsDomain | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ domain, isOpen, onClose }: DemoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Reset loading state when modal opens/closes or domain changes
  useEffect(() => {
    setIsLoading(false);
  }, [isOpen, domain?.id]);

  if (!domain) return null;

  const Icon = domain.icon;

  const handleViewDashboard = () => {
    setIsLoading(true);
    router.push(`/demo/${domain.id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-brand-light z-50 shadow-modal overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-brand-light border-b border-gray-100 p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-brand-primary flex items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <motion.h2
                      className="text-2xl font-bold text-brand-dark"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {domain.name}
                    </motion.h2>
                    <motion.p
                      className="text-brand-secondary text-sm mt-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      {domain.shortDescription}
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  className="w-10 h-10 rounded-full bg-brand-background flex items-center justify-center text-brand-secondary hover:text-brand-dark hover:bg-gray-200 transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <motion.p
                className="text-brand-secondary leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {domain.fullDescription}
              </motion.p>

              {/* KPI Section */}
              <div>
                <motion.h3
                  className="text-lg font-semibold text-brand-dark mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  Key Performance Indicators
                </motion.h3>
                <div className="grid grid-cols-2 gap-3">
                  {domain.kpis.map((kpi, index) => (
                    <KPICard key={kpi.label} kpi={kpi} index={index} />
                  ))}
                </div>
              </div>

              {/* Dashboard Preview */}
              <div>
                <motion.h3
                  className="text-lg font-semibold text-brand-dark mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Sample Dashboard
                </motion.h3>
                <DashboardPreview />
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleViewDashboard}
                disabled={isLoading}
                className={`w-full py-4 px-6 bg-brand-yellow text-brand-dark font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
                  isLoading
                    ? "opacity-90 cursor-wait"
                    : "hover:bg-yellow-400 hover:shadow-lg"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <Image
                      src="/Go-Insight-Color_ICON.png"
                      alt="Loading"
                      width={24}
                      height={24}
                      className="animate-pulse"
                    />
                    <span>Loading Dashboard...</span>
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </>
                ) : (
                  <>
                    View Demo Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
