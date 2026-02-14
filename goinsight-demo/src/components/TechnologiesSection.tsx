"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Database,
  Bot,
  Brain,
  Cpu,
  Cloud,
  Workflow,
  Sparkles,
  LineChart,
  Server,
  Code2
} from "lucide-react";

const technologies = [
  {
    name: "Power BI",
    description: "Interactive dashboards & reports",
    icon: BarChart3,
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    name: "Next.js Dashboards",
    description: "Modern React-based analytics",
    icon: Workflow,
    color: "from-gray-300 to-white",
    bgColor: "bg-white/10",
    iconColor: "text-white",
  },
  {
    name: "REST APIs & Prisma",
    description: "Backend & ORM solutions",
    icon: Code2,
    color: "from-cyan-400 to-blue-500",
    bgColor: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    name: "SQL & Databases",
    description: "Advanced data management",
    icon: Database,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    name: "Data Warehouses",
    description: "Scalable data storage solutions",
    icon: Server,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    name: "Microsoft Power Platform",
    description: "Low-code automation & apps",
    icon: Workflow,
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  {
    name: "AI Chatbots",
    description: "Intelligent conversational AI",
    icon: Bot,
    color: "from-teal-400 to-teal-600",
    bgColor: "bg-teal-500/20",
    iconColor: "text-teal-400",
  },
  {
    name: "AI & ML",
    description: "Predictive analytics & models",
    icon: Brain,
    color: "from-pink-400 to-orange-500",
    bgColor: "bg-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    name: "Cloud Solutions",
    description: "Azure, AWS & GCP integration",
    icon: Cloud,
    color: "from-indigo-400 to-indigo-600",
    bgColor: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    name: "Generative AI",
    description: "GPT & LLM integrations",
    icon: Sparkles,
    color: "from-violet-400 to-violet-600",
    bgColor: "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
];

export default function TechnologiesSection() {
  return (
    <section className="py-16 md:py-20 bg-brand-primary overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 bg-brand-yellow rounded-sm" />
            <span className="text-xs font-semibold tracking-widest text-brand-yellow uppercase">
              Our Tech Stack
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
              Cutting-Edge
            </span>
            {" "}Technologies We Use
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
            We leverage the latest technologies to deliver powerful, scalable, and intelligent analytics solutions.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <motion.div
                className={`relative p-4 md:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 h-full`}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${tech.bgColor} flex items-center justify-center mb-3 mx-auto border border-white/10`}>
                  <tech.icon className={`w-6 h-6 md:w-7 md:h-7 ${tech.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-white font-semibold text-sm md:text-base text-center mb-1">
                  {tech.name}
                </h3>
                <p className="text-white/50 text-xs text-center hidden md:block">
                  {tech.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
