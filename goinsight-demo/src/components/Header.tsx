"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhoWeAreOpen, setIsWhoWeAreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hysteresis: hide when scrolling down past 50px, show only when back to top (< 10px)
      if (currentScrollY > 50 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY < 10 && isScrolled) {
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar - Yellow */}
      <div
        className={`bg-brand-yellow text-brand-dark px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isScrolled ? "max-h-0 py-0" : "max-h-12 py-1"
        }`}
      >
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] sm:text-xs">
          <a
            href="mailto:hello@goinsight.in"
            className="font-medium hover:text-brand-primary transition-colors"
          >
            Get connect with us hello@goinsight.in
          </a>
          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="tel:+917042549224"
              className="flex items-center gap-1 hover:text-brand-primary transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>+91-7042549224</span>
            </a>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Dark Navy */}
      <nav className="bg-brand-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - White version */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Go-Insight-White_logo.png"
                alt="GoInsight"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Who We Are Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsWhoWeAreOpen(true)}
                onMouseLeave={() => setIsWhoWeAreOpen(false)}
              >
                <button className="flex items-center gap-1 text-white font-medium hover:text-brand-yellow transition-colors">
                  Who We Are
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isWhoWeAreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isWhoWeAreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-brand-primary rounded-lg shadow-lg border border-white/10 overflow-hidden"
                    >
                      <Link
                        href="/about"
                        className="block px-4 py-3 text-white hover:bg-brand-yellow hover:text-brand-dark transition-colors"
                      >
                        About Us
                      </Link>
                      <Link
                        href="/careers"
                        className="block px-4 py-3 text-white hover:bg-brand-yellow hover:text-brand-dark transition-colors"
                      >
                        Careers
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/#services"
                className="text-white font-medium hover:text-brand-yellow transition-colors"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-white font-medium hover:text-brand-yellow transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Right Side - Social & CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/goinsight.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand-yellow transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/goinsight_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand-yellow transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/goinsight/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand-yellow transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>

              {/* CTA Button */}
              <motion.a
                href="/contact"
                className="px-5 py-2 text-sm bg-brand-yellow text-brand-dark font-semibold rounded-full hover:bg-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Now
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 space-y-2">
                  {/* Who We Are Accordion */}
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-2 text-white font-medium"
                      onClick={() => setIsWhoWeAreOpen(!isWhoWeAreOpen)}
                    >
                      Who We Are
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isWhoWeAreOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isWhoWeAreOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-2"
                        >
                          <Link
                            href="/about"
                            className="block py-2 text-white/70 hover:text-brand-yellow"
                          >
                            About Us
                          </Link>
                          <Link
                            href="/careers"
                            className="block py-2 text-white/70 hover:text-brand-yellow"
                          >
                            Careers
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href="/#services"
                    className="block py-2 text-white font-medium hover:text-brand-yellow"
                  >
                    Services
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-2 text-white font-medium hover:text-brand-yellow"
                  >
                    Contact
                  </Link>

                  {/* Social Icons - Mobile */}
                  <div className="flex items-center gap-4 py-3">
                    <a
                      href="https://www.facebook.com/goinsight.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-brand-yellow transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/goinsight_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-brand-yellow transition-colors"
                      aria-label="X (Twitter)"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/goinsight/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-brand-yellow transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>

                  {/* CTA Button - Mobile */}
                  <a
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    Get Started Now
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
