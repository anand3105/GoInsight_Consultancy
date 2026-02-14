"use client";

import { motion } from "framer-motion";
import { FileText, Settings, Monitor } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Discovery & Planning",
    description:
      "We start by understanding your business needs, challenges, and objectives. Through detailed consultation, we identify the best analytics solutions for your goals and ensure all data security protocols are in place, including signing NDAs.",
    icon: FileText,
    color: "bg-brand-yellow",
    iconColor: "text-white",
  },
  {
    step: 2,
    title: "Design & Implementation",
    description:
      "With a clear plan in place, our experts design and implement the customized solution. We integrate the necessary technologies, develop analytics tools, and create interactive dashboards, keeping your team informed and involved throughout the process.",
    icon: Settings,
    color: "bg-brand-dark",
    iconColor: "text-white",
  },
  {
    step: 3,
    title: "Delivery & Ongoing Support",
    description:
      "After rigorous testing, we deliver the final solution and provide comprehensive training. We ensure you can effectively use the insights for decision-making and offer ongoing support to adapt to your evolving business needs.",
    icon: Monitor,
    color: "bg-brand-sky",
    iconColor: "text-white",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-20 bg-brand-light overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-brand-dark rounded-sm" />
            <span className="text-xs font-semibold tracking-widest text-brand-dark uppercase">
              Work Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-sky mb-4 italic">
            How GoInsight's Process works
          </h2>
          <p className="text-brand-secondary max-w-3xl mx-auto text-sm md:text-base">
            This concise, three-step process illustrates how GoInsight effectively
            delivers tailored IT solutions to clients.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-1/2 -translate-x-1/2 w-[60%]">
            <svg className="w-full h-12" viewBox="0 0 600 50" fill="none">
              <motion.path
                d="M 50 25 Q 150 25 150 25 L 280 25"
                stroke="#d1d5db"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.path
                d="M 320 25 Q 420 25 420 25 L 550 25"
                stroke="#d1d5db"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 }}
              />
              {/* Arrows */}
              <motion.polygon
                points="285,20 295,25 285,30"
                fill="#d1d5db"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
              />
              <motion.polygon
                points="555,20 565,25 555,30"
                fill="#d1d5db"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2 }}
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Icon Container */}
                <div className="relative inline-block mb-6">
                  {/* Step Badge */}
                  <motion.div
                    className={`absolute -top-2 -right-2 z-10 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                      step.step === 3
                        ? "bg-brand-sky text-white"
                        : "bg-white text-brand-dark"
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                  >
                    STEP {step.step}
                  </motion.div>

                  {/* Blob Shape */}
                  <motion.div
                    className={`relative w-28 h-28 md:w-32 md:h-32 ${step.color} flex items-center justify-center`}
                    style={{
                      borderRadius: step.step === 1
                        ? "60% 40% 50% 50% / 50% 50% 50% 50%"
                        : step.step === 2
                        ? "50% 50% 45% 55% / 60% 60% 40% 40%"
                        : "45% 55% 50% 50% / 50% 45% 55% 50%",
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <step.icon className={`w-12 h-12 md:w-14 md:h-14 ${step.iconColor}`} strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Content */}
                <motion.h3
                  className="text-xl md:text-2xl font-bold text-brand-dark mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.2 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-brand-secondary text-sm leading-relaxed max-w-sm mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Journey
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
