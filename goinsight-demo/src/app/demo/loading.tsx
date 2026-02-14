"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <Image
          src="/Go-Insight-Color_ICON.png"
          alt="GoInsight"
          width={80}
          height={80}
          className="animate-pulse"
          priority
        />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-2">Loading Dashboard...</p>
      </motion.div>
    </div>
  );
}
