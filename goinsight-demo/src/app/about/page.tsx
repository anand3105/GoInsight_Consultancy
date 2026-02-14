"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Lightbulb,
  Shield,
  Users,
  Target,
  Lock,
  TrendingUp,
  Award,
  Building2,
  GraduationCap,
  ChevronRight,
  Quote,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import TrustedBy from "@/components/TrustedBy";
import Footer from "@/components/Footer";

const stats = [
  { value: "50+", label: "Projects Delivered", suffix: "" },
  { value: "95", label: "Client Retention", suffix: "%" },
  { value: "40+", label: "Analytics Experts", suffix: "" },
  { value: "10+", label: "Industries Served", suffix: "" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly pursue cutting-edge technologies and stay ahead of industry trends to deliver transformative solutions.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We operate with complete transparency and honesty, building trust through every interaction and decision.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of teamwork, fostering strong partnerships with our clients and within our teams.",
  },
  {
    icon: Lock,
    title: "Data Security",
    description:
      "We enforce strict confidentiality protocols and NDAs, ensuring your data remains protected at all times.",
  },
  {
    icon: Target,
    title: "Client-Centric",
    description:
      "Every solution is customized to meet unique business needs, ensuring maximum value and impact.",
  },
  {
    icon: TrendingUp,
    title: "Excellence",
    description:
      "We strive for excellence in every project, delivering solutions that exceed expectations.",
  },
];

const milestones = [
  { year: "2022", title: "Founded", description: "GoInsight established in New Delhi" },
  { year: "2023", title: "Rapid Growth", description: "Expanded team & partnered with major clients" },
  { year: "2024", title: "Industry Leader", description: "Recognized as top analytics consultancy" },
  { year: "2025", title: "AI Integration", description: "Launched AI-powered analytics solutions" },
];

const expertise = [
  "Financial Analytics",
  "Healthcare Analytics",
  "Retail Analytics",
  "Educational Analytics",
  "Supply Chain Analytics",
  "Marketing Analytics",
];

const mncExperience = [
  { name: "Nokia Networks", logo: "/CompanyIcon/nokia.png" },
  { name: "Nestlé", logo: "/CompanyIcon/nestle.png" },
  { name: "HCL Technologies", logo: "/CompanyIcon/hcl.png" },
  { name: "Carrier", logo: "/CompanyIcon/carrier.png" },
  { name: "General Motors", logo: "/CompanyIcon/generalmotors.png" },
  { name: "Amul", logo: "/CompanyIcon/amul.png" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#13192608_1px,transparent_1px),linear-gradient(to_bottom,#13192608_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-yellow/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/10 rounded-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Award className="w-4 h-4 text-brand-yellow" />
                <span className="text-sm font-medium text-brand-dark">
                  India&apos;s Leading Analytics Consultancy
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Transforming Data into{" "}
                <span className="text-brand-yellow">Strategic Decisions</span>
              </motion.h1>

              <motion.p
                className="text-lg text-brand-secondary mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                At GoInsight, we bridge the gap between raw data and actionable intelligence.
                Our team of seasoned experts from Fortune 500 companies delivers customized
                analytics solutions that drive smarter decisions and measurable growth.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl"
                >
                  Start Your Journey
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="#our-story"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-dark font-semibold rounded-xl border-2 border-gray-200 hover:border-brand-yellow transition-all"
                >
                  Our Story
                </a>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  >
                    <p className="text-4xl md:text-5xl font-bold text-brand-dark mb-1">
                      {stat.value}
                      <span className="text-brand-yellow">{stat.suffix}</span>
                    </p>
                    <p className="text-sm text-brand-secondary">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-yellow/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBy />

      {/* Our Story Section */}
      <section id="our-story" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image/Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-brand-primary rounded-2xl p-8 md:p-12">
                <Quote className="w-12 h-12 text-brand-yellow mb-6" />
                <p className="text-white text-lg md:text-xl leading-relaxed mb-6 italic">
                  &quot;Organizations possess vast amounts of data, but many struggle to
                  convert it into strategic decisions. GoInsight was born to bridge
                  this gap and unlock the true potential of data.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-yellow rounded-full flex items-center justify-center">
                    <span className="text-brand-dark font-bold text-xl">AG</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Anand Gupta</p>
                    <p className="text-white/70 text-sm">Founder & CEO, GoInsight</p>
                  </div>
                </div>

                {/* Decorative */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl" />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-brand-yellow rounded-sm" />
                <span className="text-xs font-semibold tracking-widest text-brand-dark uppercase">
                  Our Story
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                From Vision to{" "}
                <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                  Industry Leader
                </span>
              </h2>

              <p className="text-brand-secondary mb-6 leading-relaxed">
                Founded by Anand Gupta, a veteran from Fortune 500 companies, GoInsight
                emerged from a pivotal realization: while organizations collect massive
                amounts of data, most lack the expertise to transform it into competitive
                advantage.
              </p>

              <p className="text-brand-secondary mb-8 leading-relaxed">
                Today, we&apos;re proud to be one of India&apos;s leading analytics consultancies,
                serving clients across Education, Healthcare, Finance, and Retail sectors.
                Our team combines deep industry expertise with cutting-edge technology to
                deliver solutions that drive real business impact.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {expertise.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                    <span className="text-sm text-brand-dark font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-brand-yellow rounded-sm" />
              <span className="text-xs font-semibold tracking-widest text-brand-dark uppercase">
                Our Values
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Principles That{" "}
              <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                Guide Us
              </span>
            </h2>
            <p className="text-brand-secondary max-w-2xl mx-auto">
              Our core values shape everything we do, from how we work with clients
              to how we develop solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-yellow/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-brand-secondary text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-brand-yellow rounded-sm" />
              <span className="text-xs font-semibold tracking-widest text-brand-dark uppercase">
                Our Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Milestones &{" "}
              <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                Achievements
              </span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <span className="text-brand-yellow font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-brand-dark font-semibold">{milestone.title}</h3>
                      <p className="text-brand-secondary text-sm">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-brand-yellow rounded-full transform -translate-x-1/2 border-4 border-white shadow" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Experience Section */}
      <section className="py-16 md:py-24 bg-brand-primary">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-brand-yellow rounded-sm" />
              <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experts from{" "}
              <span className="text-brand-yellow">Global MNCs</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our team brings invaluable experience from working with world-renowned
              organizations, delivering enterprise-grade solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mncExperience.map((company, index) => (
              <motion.div
                key={company.name}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center hover:bg-white/20 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={80}
                  height={40}
                  className="h-8 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>

          {/* Stats Row */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center">
              <Building2 className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-white/60 text-sm">Enterprise Clients</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">100+</p>
              <p className="text-white/60 text-sm">Projects Delivered</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">15+</p>
              <p className="text-white/60 text-sm">Years Experience</p>
            </div>
            <div className="text-center">
              <GraduationCap className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">20+</p>
              <p className="text-white/60 text-sm">Industries Served</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-brand-yellow rounded-sm" />
                <span className="text-xs font-semibold tracking-widest text-brand-dark uppercase">
                  Impact Story
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                Driving{" "}
                <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                  30% Efficiency
                </span>
                {" "}Gains
              </h2>

              <p className="text-brand-secondary mb-6 leading-relaxed">
                In a notable healthcare partnership, we developed a customized analytics
                dashboard that identified critical operational bottlenecks. The result?
                A remarkable 30% increase in operational efficiency.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">Custom Dashboard Development</p>
                    <p className="text-sm text-brand-secondary">Tailored to specific operational needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">Bottleneck Identification</p>
                    <p className="text-sm text-brand-secondary">Data-driven insights revealed hidden issues</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">Measurable Results</p>
                    <p className="text-sm text-brand-secondary">30% improvement in operational efficiency</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <p className="text-6xl md:text-7xl font-bold text-brand-yellow">30%</p>
                  <p className="text-xl font-semibold text-brand-dark">Efficiency Increase</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-brand-background rounded-xl">
                    <p className="text-2xl font-bold text-brand-dark">3x</p>
                    <p className="text-xs text-brand-secondary">Faster Insights</p>
                  </div>
                  <div className="p-4 bg-brand-background rounded-xl">
                    <p className="text-2xl font-bold text-brand-dark">50%</p>
                    <p className="text-xs text-brand-secondary">Cost Reduction</p>
                  </div>
                  <div className="p-4 bg-brand-background rounded-xl">
                    <p className="text-2xl font-bold text-brand-dark">24/7</p>
                    <p className="text-xs text-brand-secondary">Real-time Data</p>
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-yellow/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center bg-brand-primary rounded-3xl p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Data?
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Join 50+ enterprises that have already unlocked the power of their data
                with GoInsight. Let&apos;s discuss how we can help you achieve your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-all shadow-lg"
                >
                  Schedule a Consultation
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:hello@goinsight.in"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  hello@goinsight.in
                </a>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-yellow/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer showCTA={false} />
    </main>
  );
}
