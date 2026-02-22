"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/data/blog-data";

interface BlogHeroProps {
  post: BlogPost;
}

export default function BlogHero({ post }: BlogHeroProps) {
  return (
    <section className="relative bg-brand-primary overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-yellow/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Breadcrumbs */}
        <motion.nav
          className="flex items-center gap-1.5 text-xs text-white/40 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-brand-yellow transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/60 truncate max-w-[200px] md:max-w-none">{post.title}</span>
        </motion.nav>

        {/* Category */}
        <motion.span
          className="inline-block px-3 py-1 text-xs font-semibold bg-brand-yellow/20 text-brand-yellow rounded-full mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {post.category}
        </motion.span>

        {/* Title */}
        <motion.h1
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {post.title}
        </motion.h1>

        {/* Excerpt */}
        <motion.p
          className="text-base md:text-lg text-white/50 mb-6 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {post.excerpt}
        </motion.p>

        {/* Meta row */}
        <motion.div
          className="flex flex-wrap items-center gap-4 text-sm text-white/40"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-yellow/60" />
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-yellow/60" />
            {post.readTime} min read
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>By {post.author.name}</span>
        </motion.div>
      </div>
    </section>
  );
}
