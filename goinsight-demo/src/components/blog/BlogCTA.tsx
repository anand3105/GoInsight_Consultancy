"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function BlogCTA() {
  return (
    <motion.div
      className="relative bg-brand-primary rounded-2xl overflow-hidden my-10"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 md:px-10 py-8 md:py-10 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          Need Expert Analytics Help?
        </h3>
        <p className="text-white/50 text-sm mb-5 max-w-md mx-auto">
          GoInsight delivers end-to-end analytics consulting across India, Dubai, UAE & Australia.
          Let&apos;s discuss your project.
        </p>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-brand-yellow/20"
        >
          Schedule Free Consultation
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
