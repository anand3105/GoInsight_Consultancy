"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor } from "lucide-react";
import Link from "next/link";

export default function MobileDesktopPrompt() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setIsOpen(true);
    }
  }, []);

  const handleRequestDesktop = () => {
    // Attempt to request desktop site via meta tag
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute("content", "width=1280");
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Icon */}
            <div className="mx-auto w-16 h-16 bg-brand-sky/10 rounded-full flex items-center justify-center mb-4">
              <Monitor className="w-8 h-8 text-brand-sky" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-brand-dark mb-2">
              Best Viewed on Desktop
            </h2>

            {/* Description */}
            <p className="text-sm text-brand-secondary mb-6 leading-relaxed">
              Our interactive dashboards and reports are optimized for larger
              screens. For the best experience, please switch to desktop view or
              open this page on a computer.
            </p>

            {/* Desktop View Button */}
            <button
              onClick={handleRequestDesktop}
              className="w-full py-3 px-4 bg-brand-dark text-white font-semibold rounded-xl hover:bg-brand-dark/90 transition-colors mb-3 flex items-center justify-center gap-2"
            >
              <Monitor size={18} />
              Switch to Desktop View
            </button>

            {/* Go Back Button */}
            <Link
              href="/"
              className="block w-full py-3 px-4 bg-gray-100 text-brand-dark font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Go Back to Home
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
