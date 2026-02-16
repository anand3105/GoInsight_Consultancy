"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, Globe, Clock, ArrowUpRight } from "lucide-react";

interface FooterProps {
  showCTA?: boolean;
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const industries = [
  { label: "Retail", href: "/demo/retail" },
  { label: "Finance", href: "/demo/finance" },
  { label: "Healthcare", href: "/demo/healthcare" },
  { label: "Education", href: "/demo/education" },
  { label: "Manufacturing", href: "/demo/manufacturing" },
  { label: "Supply Chain", href: "/demo/supply-chain" },
  { label: "Sales & Marketing", href: "/demo/sales-marketing" },
  { label: "Real Estate", href: "/demo/real-estate" },
];

const columnVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-sm text-white/50 hover:text-brand-yellow transition-all duration-200"
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-yellow transition-all duration-300 group-hover:w-full" />
        </span>
        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x--0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
      </Link>
    </li>
  );
}

export default function Footer({ showCTA = true }: FooterProps) {
  return (
    <footer>
      {/* CTA Band */}
      {showCTA && (
        <section className="relative bg-brand-primary overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                Ready to Transform Your Data?
              </motion.h2>
              <motion.p
                className="text-white/50 mb-6 text-sm md:text-base"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
              >
                Join 50+ enterprises that have already unlocked the power of
                their data with GoInsight.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.16 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-brand-yellow/20 hover:shadow-brand-yellow/30 hover:shadow-xl"
                >
                  Schedule a Consultation
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Gradient separator between CTA and footer grid */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
      )}

      {/* Main Footer */}
      <div className="bg-brand-primary pt-8 pb-6">
        <div className="container mx-auto px-4">
          {/* Top separator when no CTA */}
          {!showCTA && (
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -mt-10 mb-10" />
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 pb-8">
            {/* Column 1 — Brand */}
            <motion.div
              className="col-span-2 lg:col-span-1"
              custom={0}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Image
                src="/Go-Insight-White_logo.png"
                alt="GoInsight"
                width={130}
                height={35}
                className="h-9 w-auto mb-3"
              />
              <p className="text-white/40 text-xs leading-relaxed mb-4 max-w-[240px]">
                Transforming raw data into strategic decisions for enterprises
                across the globe.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {[
                  {
                    href: "https://www.facebook.com/goinsight.in/",
                    label: "Facebook",
                    icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                  },
                  {
                    href: "https://x.com/goinsight_",
                    label: "X (Twitter)",
                    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  },
                  {
                    href: "https://www.linkedin.com/company/goinsight/",
                    label: "LinkedIn",
                    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-brand-yellow hover:bg-brand-yellow/10 transition-all duration-200 border border-white/[0.04] hover:border-brand-yellow/20"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Column 2 — Quick Links */}
            <motion.div
              className="order-1 lg:order-none"
              custom={1}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-3">
                <div className="w-6 h-0.5 bg-brand-yellow rounded-full mb-2" />
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                  Quick Links
                </h3>
              </div>
              <ul className="space-y-1.5">
                {quickLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 — Industries (2-col grid) */}
            <motion.div
              className="col-span-2 lg:col-span-1 order-3 lg:order-none"
              custom={2}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-3">
                <div className="w-6 h-0.5 bg-brand-yellow rounded-full mb-2" />
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                  Industries
                </h3>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {industries.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </motion.div>

            {/* Column 4 — Contact */}
            <motion.div
              className="order-2 lg:order-none"
              custom={3}
              variants={columnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-3">
                <div className="w-6 h-0.5 bg-brand-yellow rounded-full mb-2" />
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                  Contact
                </h3>
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:hello@goinsight.in"
                    className="group flex items-center gap-2.5 text-sm text-white/50 hover:text-brand-yellow transition-all duration-200"
                  >
                    <span className="w-7 h-7 rounded-md bg-white/[0.06] group-hover:bg-brand-yellow/10 flex items-center justify-center transition-colors duration-200 border border-white/[0.04] group-hover:border-brand-yellow/20">
                      <Mail className="w-3.5 h-3.5 text-brand-yellow/60 group-hover:text-brand-yellow transition-colors" />
                    </span>
                    hello@goinsight.in
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+917042549224"
                    className="group flex items-center gap-2.5 text-sm text-white/50 hover:text-brand-yellow transition-all duration-200"
                  >
                    <span className="w-7 h-7 rounded-md bg-white/[0.06] group-hover:bg-brand-yellow/10 flex items-center justify-center transition-colors duration-200 border border-white/[0.04] group-hover:border-brand-yellow/20">
                      <Phone className="w-3.5 h-3.5 text-brand-yellow/60 group-hover:text-brand-yellow transition-colors" />
                    </span>
                    +91-7042549224
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/50">
                  <span className="w-7 h-7 rounded-md bg-white/[0.06] flex items-center justify-center border border-white/[0.04]">
                    <Globe className="w-3.5 h-3.5 text-brand-yellow/60" />
                  </span>
                  Serving Clients Worldwide
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/50">
                  <span className="w-7 h-7 rounded-md bg-white/[0.06] flex items-center justify-center border border-white/[0.04]">
                    <Clock className="w-3.5 h-3.5 text-brand-yellow/60" />
                  </span>
                  Mon - Fri: 9AM - 6PM IST
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/[0.06] pt-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} GoInsight. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  href: "https://www.facebook.com/goinsight.in/",
                  label: "Facebook",
                  icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                },
                {
                  href: "https://x.com/goinsight_",
                  label: "X (Twitter)",
                  icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  href: "https://www.linkedin.com/company/goinsight/",
                  label: "LinkedIn",
                  icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/25 hover:text-brand-yellow transition-colors duration-200"
                  aria-label={social.label}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            <div className="flex items-center flex-wrap justify-center gap-x-5 gap-y-2">
              <Link
                href="/privacy"
                className="text-xs text-white/30 hover:text-brand-yellow transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Link
                href="/terms"
                className="text-xs text-white/30 hover:text-brand-yellow transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <Link
                href="/disclaimer"
                className="text-xs text-white/30 hover:text-brand-yellow transition-colors duration-200"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
