"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Zap,
  Heart,
  GraduationCap,
  TrendingUp,
  Coffee,
  Globe,
  ChevronRight,
  Send,
  Upload,
  CheckCircle2,
  Building2,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";

const benefits = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Clear career paths and continuous learning opportunities to advance your skills.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with talented professionals from Fortune 500 backgrounds in a supportive environment.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Projects",
    description: "Work on innovative analytics solutions using the latest technologies and tools.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible working hours and remote work options to maintain healthy balance.",
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Access to training programs, certifications, and conference participation.",
  },
  {
    icon: Coffee,
    title: "Great Perks",
    description: "Competitive salary, health insurance, team outings, and more.",
  },
];

const openPositions = [
  {
    title: "Senior Power BI Developer",
    department: "Analytics",
    location: "New Delhi / Remote",
    type: "Full-time",
    experience: "3-5 years",
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    location: "New Delhi",
    type: "Full-time",
    experience: "1-3 years",
  },
  {
    title: "Business Intelligence Consultant",
    department: "Consulting",
    location: "New Delhi / Remote",
    type: "Full-time",
    experience: "4-6 years",
  },
  {
    title: "ML/AI Engineer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
  },
  {
    title: "Frontend Developer (React)",
    department: "Technology",
    location: "New Delhi / Remote",
    type: "Full-time",
    experience: "2-4 years",
  },
  {
    title: "Analytics Intern",
    department: "Analytics",
    location: "New Delhi",
    type: "Internship",
    experience: "Fresher",
  },
];

const values = [
  "Innovation-driven mindset",
  "Data-first approach",
  "Client success focus",
  "Continuous learning",
  "Team collaboration",
  "Integrity & transparency",
];

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-brand-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#13192608_1px,transparent_1px),linear-gradient(to_bottom,#13192608_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-yellow/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/10 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-brand-yellow" />
              <span className="text-sm font-medium text-brand-dark">
                We&apos;re Hiring!
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Build Your Career at{" "}
              <span className="text-brand-yellow">GoInsight</span>
            </motion.h1>

            <motion.p
              className="text-lg text-brand-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Join India&apos;s leading analytics consultancy and work on transformative
              projects with a team of experts from Fortune 500 companies. Shape the
              future of data-driven decision making.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl"
              >
                View Open Positions
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-dark font-semibold rounded-xl border-2 border-gray-200 hover:border-brand-yellow transition-all"
              >
                Submit Resume
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-dark">40+</p>
                <p className="text-sm text-brand-secondary">Team Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand-dark">10+</p>
                <p className="text-sm text-brand-secondary">Open Roles</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
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
                Why GoInsight
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              More Than Just a{" "}
              <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                Workplace
              </span>
            </h2>
            <p className="text-brand-secondary max-w-2xl mx-auto">
              We believe in creating an environment where talent thrives, ideas flourish,
              and everyone has the opportunity to make an impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-brand-background rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-brand-yellow/30"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-brand-yellow/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-brand-secondary text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 md:py-24 bg-brand-primary">
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
                <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                  Our Culture
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                A Culture of{" "}
                <span className="text-brand-yellow">Excellence</span>
              </h2>

              <p className="text-white/80 mb-8 leading-relaxed">
                At GoInsight, we foster a culture where curiosity is encouraged,
                collaboration is celebrated, and excellence is the standard. Our team
                members come from diverse backgrounds, bringing unique perspectives
                that drive innovation.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                    <span className="text-sm text-white">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Globe className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">7+</p>
                    <p className="text-white/60 text-sm">Countries Served</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Building2 className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">50+</p>
                    <p className="text-white/60 text-sm">Clients</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <Users className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">40+</p>
                    <p className="text-white/60 text-sm">Team Members</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">95%</p>
                    <p className="text-white/60 text-sm">Retention Rate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-16 md:py-24 bg-brand-background">
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
                Open Positions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Find Your{" "}
              <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                Perfect Role
              </span>
            </h2>
            <p className="text-brand-secondary max-w-2xl mx-auto">
              Explore our current openings and find the opportunity that matches your skills and aspirations.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all duration-300 cursor-pointer ${
                  selectedPosition === position.title
                    ? "border-brand-yellow"
                    : "border-transparent hover:border-gray-200"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  setSelectedPosition(
                    selectedPosition === position.title ? null : position.title
                  )
                }
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-brand-dark">
                        {position.title}
                      </h3>
                      {position.type === "Internship" && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Internship
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-brand-secondary">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.experience}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:hr@goinsight.in?subject=Application for ${position.title}&body=Hi,%0D%0A%0D%0AI am interested in the ${position.title} position at GoInsight.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ARegards`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-yellow text-brand-dark font-semibold rounded-lg hover:bg-yellow-400 transition-all text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Apply Now
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-brand-secondary mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Don&apos;t see a role that fits?{" "}
            <a href="#apply" className="text-brand-yellow font-semibold hover:underline">
              Send us your resume anyway
            </a>
          </motion.p>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-brand-yellow rounded-sm" />
                  <span className="text-xs font-semibold tracking-widest text-brand-dark uppercase">
                    Join Us
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                  Ready to Make an{" "}
                  <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">
                    Impact?
                  </span>
                </h2>

                <p className="text-brand-secondary mb-6 leading-relaxed">
                  We&apos;re always looking for talented individuals who are passionate
                  about data and analytics. Even if you don&apos;t see a perfect match
                  in our current openings, we&apos;d love to hear from you.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">Share Your Resume</p>
                      <p className="text-sm text-brand-secondary">
                        Send your CV to hr@goinsight.in
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">Quick Response</p>
                      <p className="text-sm text-brand-secondary">
                        We review applications within 48 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">Transparent Process</p>
                      <p className="text-sm text-brand-secondary">
                        Clear communication throughout the hiring journey
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right - CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-brand-primary rounded-2xl p-8 text-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-8 h-8 text-brand-dark" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      Submit Your Resume
                    </h3>
                    <p className="text-white/70 mb-6">
                      Send your resume and a brief introduction to our HR team
                    </p>

                    <a
                      href="mailto:hr@goinsight.in?subject=Career Opportunity at GoInsight&body=Hi HR Team,%0D%0A%0D%0AI am interested in exploring career opportunities at GoInsight.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABrief Introduction:%0D%0A[Your introduction here]%0D%0A%0D%0ARegards,%0D%0A[Your Name]"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-brand-dark font-semibold rounded-xl hover:bg-yellow-400 transition-all shadow-lg w-full justify-center"
                    >
                      <Send className="w-5 h-5" />
                      Email: hr@goinsight.in
                    </a>

                    <p className="text-white/50 text-sm mt-4">
                      Include your resume, portfolio (if applicable), and a brief cover letter
                    </p>
                  </div>

                  {/* Decorative */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-yellow/5 rounded-full blur-3xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Hiring FAQs
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-white rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-brand-dark mb-2">
                What is the interview process like?
              </h3>
              <p className="text-sm text-brand-secondary">
                Our process typically includes an initial screening, technical assessment,
                and final interviews with the team leads.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-semibold text-brand-dark mb-2">
                Do you offer remote work options?
              </h3>
              <p className="text-sm text-brand-secondary">
                Yes, we offer flexible remote and hybrid work options for most positions
                based on role requirements.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-brand-dark mb-2">
                What skills are you looking for?
              </h3>
              <p className="text-sm text-brand-secondary">
                We value analytical thinking, problem-solving abilities, and a passion
                for data. Technical skills vary by role.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-semibold text-brand-dark mb-2">
                How long does the hiring process take?
              </h3>
              <p className="text-sm text-brand-secondary">
                Typically 2-3 weeks from application to offer, depending on the role
                and interview scheduling.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary text-white py-8">
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
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/careers" className="hover:text-white transition-colors">
                Careers
              </Link>
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
