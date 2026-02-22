"use client";

import { motion } from "framer-motion";

interface BlogStatCardProps {
  value: string;
  label: string;
  description?: string;
}

export default function BlogStatCard({ value, label, description }: BlogStatCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-2xl md:text-3xl font-bold text-brand-yellow mb-1">{value}</div>
      <div className="text-sm font-semibold text-brand-dark mb-1">{label}</div>
      {description && (
        <div className="text-xs text-gray-400">{description}</div>
      )}
    </motion.div>
  );
}
