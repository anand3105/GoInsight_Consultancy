"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companies = [
  { name: "Amploop", logo: "/CompanyIcon/amploop.webp" },
  { name: "Genverse Biotech", logo: "/CompanyIcon/GenverseBiotech.png" },
  { name: "Rauha Wellness", logo: "/CompanyIcon/Rauhawellness.png" },
  { name: "Regex", logo: "/CompanyIcon/Regex.png" },
  { name: "Rhynogrip", logo: "/CompanyIcon/rhynogrip.png" },
];

// Duplicate for seamless loop
const allCompanies = [...companies, ...companies, ...companies, ...companies];

export default function TrustedBy() {
  return (
    <section className="py-4 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-3">
        <p className="text-center text-brand-secondary/60 text-xs font-medium">
          Trusted by companies all over the world
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Track */}
        <motion.div
          className="flex items-center gap-12 md:gap-16"
          animate={{
            x: [0, -100 * companies.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {allCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-4"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={40}
                className="h-6 md:h-7 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
