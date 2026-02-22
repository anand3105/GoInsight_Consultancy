"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, X } from "lucide-react";

export default function DarkModePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("darkmode-popup-dismissed");
    if (dismissed) return;

    // Show popup after a short delay so the page loads first
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("darkmode-popup-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-16 right-4 z-50 flex items-start gap-3"
          initial={{ opacity: 0, x: 30, y: -10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Popup Card */}
          <div className="relative bg-gray-900 border border-white/10 rounded-xl shadow-2xl shadow-black/30 p-4 max-w-[260px]">
            {/* Arrow pointing to top-right */}
            <div className="absolute -top-2 right-6 w-4 h-4 bg-gray-900 border-l border-t border-white/10 rotate-45" />

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-yellow/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Moon className="w-4 h-4 text-brand-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium leading-snug">
                  Try <span className="text-brand-yellow font-semibold">Dark Mode</span>
                </p>
                <p className="text-white/40 text-xs mt-1 leading-relaxed">
                  Explore this dashboard in dark mode using the toggle in the toolbar.
                </p>
              </div>
            </div>

            <button
              onClick={dismiss}
              className="mt-3 w-full py-1.5 text-xs font-medium text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-lg transition-colors"
            >
              Got it, skip
            </button>

            {/* Close X */}
            <button
              onClick={dismiss}
              className="absolute top-2 right-2 text-white/20 hover:text-white/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
