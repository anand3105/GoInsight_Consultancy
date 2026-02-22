"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { clientTestimonial } from "@/data/roi-data";

export default function ClientImpactSection() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-yellow" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">
              Client Success
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">
            Real Client Impact
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Quote */}
          <motion.div
            className="bg-brand-primary rounded-xl p-6 flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Quote className="w-8 h-8 text-brand-yellow/30 mb-3" />
            <blockquote className="text-white/90 text-sm leading-relaxed mb-4">
              &ldquo;{clientTestimonial.quote}&rdquo;
            </blockquote>
            <div>
              <div className="text-white font-semibold text-sm">{clientTestimonial.author}</div>
              <div className="text-white/50 text-xs">{clientTestimonial.company}</div>
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <h3 className="font-semibold text-brand-dark mb-4 text-sm">Engagement Results</h3>
            <div className="grid grid-cols-2 gap-4">
              {clientTestimonial.metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <div className="text-2xl font-bold text-brand-dark">{metric.value}</div>
                  <div className="text-xs text-gray-500">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
