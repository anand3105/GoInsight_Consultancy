"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  children?: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  sections,
  children,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections]);

  const handleTocClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-brand-background">
      <Header />

      {/* Compact Hero */}
      <section className="pt-28 pb-8 md:pt-32 md:pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-1.5 text-sm text-brand-secondary mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="hover:text-brand-yellow transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-dark font-medium">{title}</span>
          </motion.nav>

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-sm text-brand-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Last updated: {lastUpdated}
          </motion.p>
        </div>
      </section>

      {/* Content with TOC */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 lg:gap-12">
            {/* Sticky TOC — Desktop */}
            <motion.aside
              className="hidden lg:block w-64 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="sticky top-28">
                <p className="text-[10px] font-bold tracking-[0.2em] text-brand-dark/30 uppercase mb-3">
                  On this page
                </p>
                <nav className="space-y-0.5">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => handleTocClick(e, section.id)}
                      className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${
                        activeSection === section.id
                          ? "text-brand-yellow font-semibold border-brand-yellow"
                          : "text-brand-secondary border-transparent hover:text-brand-dark hover:border-gray-300"
                      }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
              className="flex-1 min-w-0 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Mobile TOC */}
              <div className="lg:hidden mb-8 bg-white rounded-xl border border-gray-100 p-4">
                <p className="text-[10px] font-bold tracking-[0.2em] text-brand-dark/30 uppercase mb-2">
                  On this page
                </p>
                <nav className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => handleTocClick(e, section.id)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30 font-semibold"
                          : "text-brand-secondary border-gray-200 hover:border-brand-yellow/30 hover:text-brand-dark"
                      }`}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>

              {sections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    if (el) sectionRefs.current.set(section.id, el);
                  }}
                  className="mb-10 scroll-mt-28"
                >
                  <h2 className="text-lg md:text-xl font-bold text-brand-dark pl-4 border-l-4 border-brand-yellow mb-4">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="text-brand-secondary leading-relaxed text-[15px] space-y-3">
                    {section.content}
                  </div>
                </div>
              ))}

              {children}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer showCTA={false} />
    </main>
  );
}
