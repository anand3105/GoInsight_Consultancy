"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

interface EmailGateModalProps {
  onSubmit: (email: string) => void;
}

export default function EmailGateModal({ onSubmit }: EmailGateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if email was already submitted in this session
    const savedEmail = sessionStorage.getItem("goinsight_professional_email");
    if (!savedEmail) {
      // Small delay to let the dashboard load first
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const validateProfessionalEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Check for common personal email domains
    const personalDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "mail.com",
      "protonmail.com",
      "zoho.com",
      "yandex.com",
      "gmx.com",
      "live.com",
    ];

    const domain = email.split("@")[1]?.toLowerCase();
    return !personalDomains.includes(domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateProfessionalEmail(email)) {
      setError("Please enter a professional/work email address");
      return;
    }

    setIsLoading(true);

    // Save to session storage
    sessionStorage.setItem("goinsight_professional_email", email);

    // Send lead email notification
    try {
      await fetch("/api/demo-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          page: window.location.pathname,
        }),
      });
    } catch {
      // Don't block the user if notification fails
    }

    setIsLoading(false);
    setIsOpen(false);
    onSubmit(email);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-primary to-brand-primary/80 px-6 py-8 text-center">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Image
                    src="/Go-Insight-Color_ICON.png"
                    alt="GoInsight"
                    width={40}
                    height={40}
                  />
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome to GoInsight
                </motion.h2>
                <motion.p
                  className="text-white/80 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Access our interactive analytics dashboards
                </motion.p>
              </div>

              {/* Form */}
              <div className="p-6">
                <motion.p
                  className="text-brand-secondary text-center mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Please enter your professional email to continue
                </motion.p>

                <form onSubmit={handleSubmit}>
                  <motion.div
                    className="relative mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="yourname@company.com"
                      className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-primary transition-colors ${
                        error ? "border-red-400" : "border-transparent"
                      }`}
                      autoFocus
                    />
                  </motion.div>

                  {error && (
                    <motion.p
                      className="text-red-500 text-sm text-center mb-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 px-6 bg-brand-yellow text-brand-dark font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
                      isLoading
                        ? "opacity-90 cursor-wait"
                        : "hover:bg-yellow-400 hover:shadow-lg"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        Continue to Dashboard
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                <motion.p
                  className="text-xs text-gray-400 text-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
