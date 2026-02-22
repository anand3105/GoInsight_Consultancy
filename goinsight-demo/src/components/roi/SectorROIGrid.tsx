"use client";

import { motion } from "framer-motion";
import { sectorROIData } from "@/data/roi-data";
import SectorROICard from "./SectorROICard";

export default function SectorROIGrid() {
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
              Sector-Specific Results
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">
            ROI Across Every Industry
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mx-auto mb-2" />
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Measurable returns across 8 industries with tailored analytics solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectorROIData.map((sector, index) => (
            <SectorROICard key={sector.id} sector={sector} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
