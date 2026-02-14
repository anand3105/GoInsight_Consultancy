"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

interface DemoFeatureTooltipProps {
  children: React.ReactNode;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
  isDark?: boolean;
}

export default function DemoFeatureTooltip({
  children,
  title,
  description,
  position = "right",
  isDark = false,
}: DemoFeatureTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 256; // w-64 = 16rem = 256px
    const tooltipHeight = 120; // approximate height
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case "right":
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + gap;
        // If tooltip goes off right edge, show on left
        if (left + tooltipWidth > window.innerWidth - 20) {
          left = rect.left - tooltipWidth - gap;
        }
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - gap;
        break;
      case "top":
        top = rect.top - tooltipHeight - gap;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case "bottom":
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
    }

    // Keep tooltip within viewport
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth - 10) {
      left = window.innerWidth - tooltipWidth - 10;
    }
    if (top < 10) top = 10;
    if (top + tooltipHeight > window.innerHeight - 10) {
      top = window.innerHeight - tooltipHeight - 10;
    }

    setTooltipPosition({ top, left });
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed z-[9999]"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className={`w-64 p-3 rounded-xl shadow-2xl border ${
              isDark
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-start gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${isDark ? "bg-brand-yellow/20" : "bg-brand-yellow/10"}`}>
                <Lock className={`w-3.5 h-3.5 ${isDark ? "text-brand-yellow" : "text-brand-dark"}`} />
              </div>
              <h4 className={`font-semibold text-sm ${isDark ? "text-white" : "text-brand-dark"}`}>
                {title}
              </h4>
            </div>
            <p className={`text-xs leading-relaxed mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {description}
            </p>
            <div className={`flex items-center gap-1.5 pt-2 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              <span className={`text-xs font-medium ${isDark ? "text-brand-yellow" : "text-brand-dark"}`}>
                Available in Custom Reports
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
}
