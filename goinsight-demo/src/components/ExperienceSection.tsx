"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Award, Users } from "lucide-react";
import Image from "next/image";

const companies = [
  {
    name: "Nokia Networks",
    type: "Telecom Giant",
    logo: "/CompanyIcon/nokia.png",
  },
  {
    name: "Nestlé",
    type: "FMCG Leader",
    logo: "/CompanyIcon/nestle.png",
  },
  {
    name: "HCL Technologies",
    type: "IT Services",
    logo: "/CompanyIcon/hcl.png",
  },
  {
    name: "Carrier",
    type: "HVAC & Refrigeration",
    logo: "/CompanyIcon/carrier.png",
  },
  {
    name: "General Motors",
    type: "Automotive",
    logo: "/CompanyIcon/generalmotors.png",
  },
  {
    name: "Amul",
    type: "Dairy Cooperative",
    logo: "/CompanyIcon/amul.png",
  },
];

const stats = [
  { icon: Building2, value: "50+", label: "Enterprise Clients" },
  { icon: Users, value: "100+", label: "Projects Delivered" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: GraduationCap, value: "20+", label: "Industries Served" },
];

export default function ExperienceSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-brand-background to-brand-light overflow-hidden">
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
            <div className="w-3 h-3 bg-brand-dark rounded-sm" />
            <span className="text-xs font-semibold tracking-widest text-brand-dark uppercase">
              Our Experience
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Team with{" "}
            <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
              Global MNC
            </span>
            {" "}Experience
          </h2>
          <p className="text-brand-secondary max-w-2xl mx-auto text-sm md:text-base">
            Our experts bring invaluable experience from working with world-renowned organizations,
            delivering enterprise-grade solutions.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 md:p-6 rounded-2xl bg-white shadow-lg border border-gray-100"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-yellow/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-brand-yellow" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-brand-dark">{stat.value}</p>
              <p className="text-xs md:text-sm text-brand-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Companies */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-sm text-brand-secondary mb-6">
            Our team members have contributed to success at
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <motion.div
                className="relative p-6 md:p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-brand-yellow transition-all duration-300 h-full flex flex-col items-center justify-center"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Logo */}
                <div className="w-24 h-12 mb-3 flex items-center justify-center">
                  {company.logo === "graduation" ? (
                    <GraduationCap className="w-10 h-10 text-brand-dark group-hover:text-brand-yellow transition-colors" />
                  ) : (
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={96}
                      height={48}
                      className="w-auto h-10 object-contain"
                    />
                  )}
                </div>

                {/* Name & Type */}
                <h3 className="text-sm font-semibold text-brand-dark text-center">
                  {company.name}
                </h3>
                <p className="text-xs text-brand-secondary text-center">
                  {company.type}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-brand-secondary text-sm mb-4">
            Ready to work with experienced professionals?
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-full hover:bg-brand-dark transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get in Touch
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
