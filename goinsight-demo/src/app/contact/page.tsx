"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  Loader2,
  Send,
  Clock,
  Plus,
  Minus,
} from "lucide-react";
import Header from "@/components/Header";
import TrustedBy from "@/components/TrustedBy";

const timeSlots = [
  { value: "morning", label: "Morning (9AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 5PM)" },
  { value: "evening", label: "Evening (5PM - 8PM)" },
];

const services = [
  { value: "powerbi", label: "Power BI Reports" },
  { value: "dashboards", label: "Custom Dashboards" },
  { value: "ai-ml", label: "AI/ML Solutions" },
  { value: "data-warehouse", label: "Data Warehousing" },
  { value: "consultation", label: "Consultation" },
];

const companySizes = [
  { value: "1-250", label: "1-250" },
  { value: "251-1000", label: "251-1000" },
  { value: "1000+", label: "1000+" },
];

const countryCodes = [
  { value: "+91", label: "🇮🇳 +91", country: "India" },
  { value: "+1", label: "🇺🇸 +1", country: "USA" },
  { value: "+44", label: "🇬🇧 +44", country: "UK" },
  { value: "+61", label: "🇦🇺 +61", country: "Australia" },
  { value: "+49", label: "🇩🇪 +49", country: "Germany" },
  { value: "+33", label: "🇫🇷 +33", country: "France" },
  { value: "+81", label: "🇯🇵 +81", country: "Japan" },
  { value: "+86", label: "🇨🇳 +86", country: "China" },
  { value: "+971", label: "🇦🇪 +971", country: "UAE" },
  { value: "+65", label: "🇸🇬 +65", country: "Singapore" },
  { value: "+60", label: "🇲🇾 +60", country: "Malaysia" },
  { value: "+966", label: "🇸🇦 +966", country: "Saudi Arabia" },
];

const faqs = [
  {
    question: "What services does GoInsight offer?",
    answer:
      "GoInsight provides a range of analytics services, including data visualization, dashboard creation, business intelligence, and corporate training in tools like Power BI. We also offer consultation services, where our experts work directly with your team to deliver tailored analytics solutions.",
  },
  {
    question: "How can GoInsight help my business?",
    answer:
      "We help businesses transform raw data into actionable insights. Our solutions enable better decision-making, identify growth opportunities, optimize operations, and provide a competitive edge through data-driven strategies tailored to your industry.",
  },
  {
    question: "What industries does GoInsight specialize in?",
    answer:
      "GoInsight specializes in multiple industries including Education, Healthcare, Finance, Retail, Manufacturing, and E-commerce. Our team has deep expertise in understanding industry-specific challenges and delivering customized analytics solutions.",
  },
  {
    question: "How does GoInsight ensure data privacy and security?",
    answer:
      "Data privacy and security are our top priorities at GoInsight. We adhere to strict confidentiality protocols and sign Non-Disclosure Agreements (NDAs) with all our clients. Our team follows industry best practices to protect your data, ensuring it remains secure throughout the entire process.",
  },
  {
    question: "How do I get started with GoInsight?",
    answer:
      "Getting started is easy! Simply fill out the contact form above or reach out to us via email or phone. We'll schedule a free consultation to understand your needs, assess your current data infrastructure, and propose a tailored solution.",
  },
  {
    question: "What support do you offer after the service delivery?",
    answer:
      "We provide comprehensive post-delivery support including training sessions for your team, documentation, maintenance packages, and ongoing consultation. Our goal is to ensure you get maximum value from your analytics investment.",
  },
];

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  companySize: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  company: "",
  companySize: "",
  preferredDate: "",
  preferredTime: "",
  service: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setIsSuccess(true);
    } catch {
      alert("Something went wrong. Please email us directly at hello@goinsight.in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setIsSuccess(false);
    setErrors({});
  };

  const inputClasses =
    "w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-brand-dark text-sm placeholder:text-gray-400 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 focus:outline-none transition-all duration-200";
  const labelClasses = "block text-xs font-medium text-brand-dark mb-1";

  return (
    <main className="min-h-screen bg-brand-background">
      <Header />

      {/* Main Content Section */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
            {/* Left Column - Contact Info */}
            <motion.div
              className="lg:col-span-2 flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Header */}
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-2">
                  <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                    Get in Touch
                  </span>
                </h1>
                <p className="text-brand-secondary text-sm">
                  Ready to transform your data into actionable insights? Book a
                  consultation or send us your inquiry.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="bg-white rounded-xl shadow-md p-4 flex-1">
                <h3 className="text-sm font-semibold text-brand-dark mb-3">
                  Contact Information
                </h3>

                <div className="space-y-2">
                  <a
                    href="mailto:hello@goinsight.in"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-background transition-colors group"
                  >
                    <div className="w-8 h-8 bg-brand-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow/30 transition-colors">
                      <Mail className="w-4 h-4 text-brand-dark" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-brand-dark">Email</p>
                      <p className="text-brand-secondary text-sm">hello@goinsight.in</p>
                    </div>
                  </a>

                  <a
                    href="tel:+917042549224"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-brand-background transition-colors group"
                  >
                    <div className="w-8 h-8 bg-brand-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-yellow/30 transition-colors">
                      <Phone className="w-4 h-4 text-brand-dark" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-brand-dark">Phone</p>
                      <p className="text-brand-secondary text-sm">+91-7042549224</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-2 rounded-lg">
                    <div className="w-8 h-8 bg-brand-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-brand-dark" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-brand-dark">Location</p>
                      <p className="text-brand-secondary text-sm">New Delhi, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg">
                    <div className="w-8 h-8 bg-brand-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-brand-dark" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-brand-dark">Business Hours</p>
                      <p className="text-brand-secondary text-sm">Mon - Fri: 9AM - 6PM IST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links & Quick Response in row */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-sm font-semibold text-brand-dark mb-2">
                    Follow Us
                  </h3>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.facebook.com/goinsight.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white hover:bg-brand-primary/90 transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a
                      href="https://x.com/goinsight_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white hover:bg-brand-primary/90 transition-colors"
                      aria-label="X (Twitter)"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/goinsight/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white hover:bg-brand-primary/90 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="bg-brand-primary rounded-xl shadow-md p-4 text-white">
                  <h3 className="text-sm font-semibold mb-1">Quick Response</h3>
                  <p className="text-white/80 text-xs">
                    We respond within 24 hours on business days.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              className="lg:col-span-3 flex"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-5 w-full flex flex-col">
                <h2 className="text-lg font-semibold text-brand-dark mb-4">
                  Book a Consultation
                </h2>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-3">
                  {/* Row 1: Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`${inputClasses} ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`${inputClasses} ${errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone Number
                      </label>
                      <div className="flex">
                        <select
                          id="countryCode"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleChange}
                          className="px-2 py-2 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-brand-dark text-sm focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 focus:outline-none transition-all duration-200"
                        >
                          {countryCodes.map((code) => (
                            <option key={code.value} value={code.value}>
                              {code.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="98765 43210"
                          className="flex-1 px-3 py-2 rounded-r-lg border border-gray-200 bg-white text-brand-dark text-sm placeholder:text-gray-400 focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/20 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className={labelClasses}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Row 3: Company Size */}
                  <div>
                    <label className={labelClasses}>Company Size</label>
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                      {companySizes.map((size) => (
                        <button
                          key={size.value}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              companySize: size.value,
                            }))
                          }
                          className={`flex-1 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            formData.companySize === size.value
                              ? "bg-brand-primary/10 text-brand-primary border-brand-primary"
                              : "bg-white text-brand-secondary hover:bg-gray-50"
                          } ${size.value !== "1-250" ? "border-l border-gray-200" : ""}`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Date & Time */}
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="preferredDate" className={labelClasses}>
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="preferredTime" className={labelClasses}>
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="service" className={labelClasses}>
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        <option value="">Select service</option>
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Message */}
                  <div className="flex-1 flex flex-col">
                    <label htmlFor="message" className={labelClasses}>
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      className={`${inputClasses} resize-none flex-1 min-h-[80px] ${errors.message ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-0.5">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-2.5 bg-brand-yellow text-brand-dark font-semibold rounded-lg hover:bg-yellow-400 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-auto"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Success Checkmark */}
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 200,
                  delay: 0.2,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
                </motion.div>
              </motion.div>

              <motion.h3
                className="text-2xl font-bold text-brand-dark mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Message Sent!
              </motion.h3>

              <motion.p
                className="text-brand-secondary mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Thank you for reaching out. We&apos;ll get back to you within 24
                hours.
              </motion.p>

              <motion.button
                onClick={handleReset}
                className="px-6 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Another Inquiry
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trusted By Section */}
      <TrustedBy />

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-brand-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Left Side - Title & Decorative */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:sticky lg:top-24">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark mb-4">
                  Frequently asked{" "}
                  <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                    questions
                  </span>
                </h2>
                <p className="text-brand-secondary mb-6">
                  Everything you need to know about our services. Can&apos;t find what you&apos;re looking for? Feel free to contact us.
                </p>

                {/* Decorative Elements */}
                <div className="hidden lg:block relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand-yellow/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-brand-dark" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-dark">Still have questions?</p>
                      <a href="mailto:hello@goinsight.in" className="text-sm text-brand-secondary hover:text-brand-yellow transition-colors">
                        hello@goinsight.in
                      </a>
                    </div>
                  </div>

                  {/* Decorative Dots */}
                  <div className="absolute -bottom-8 left-0 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-yellow"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-yellow/60"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-yellow/30"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - FAQ Items */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "border-l-4 border-brand-yellow" : ""
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-brand-dark pr-4 text-sm md:text-base">
                        {faq.question}
                      </span>
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          openFaq === index
                            ? "bg-brand-yellow text-brand-dark"
                            : "bg-gray-100 text-brand-secondary"
                        }`}
                      >
                        {openFaq === index ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-brand-secondary text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <Image
                src="/Go-Insight-White_logo.png"
                alt="GoInsight"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>

            <nav className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Industries
              </a>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </nav>

            <p className="text-xs text-white/60">
              © 2024 GoInsight. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
