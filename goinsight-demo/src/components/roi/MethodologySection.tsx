"use client";

import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle2 } from "lucide-react";
import { methodologySteps, trustBadges } from "@/data/roi-data";

const trustIcons = { shield: Shield, lock: Lock, check: CheckCircle2 } as const;

export default function MethodologySection() {
  return (
    <section className="py-10 md:py-14 bg-[#FFFBF5]">
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
              Our Process
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">
            Methodology & Credibility
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto" />
        </motion.div>

        {/* 4-Step Process */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {methodologySteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center h-full">
                <div className="w-8 h-8 rounded-full bg-brand-yellow/10 text-brand-yellow font-bold text-sm flex items-center justify-center mx-auto mb-2">
                  {step.step}
                </div>
                <h3 className="font-semibold text-brand-dark text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
              </div>
              {index < methodologySteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="#F7C948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {trustBadges.map((badge) => {
            const Icon = trustIcons[badge.icon];
            return (
              <div key={badge.label} className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                <Icon className="w-4 h-4 text-brand-yellow" />
                <span className="text-xs font-medium text-gray-700">{badge.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
