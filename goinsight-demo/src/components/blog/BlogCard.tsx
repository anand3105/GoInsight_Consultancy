"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blog-data";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-yellow/30 transition-all duration-300">
          {/* Category Badge */}
          <div className="p-6 pb-0">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-brand-yellow/10 text-brand-dark rounded-full">
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-brand-dark mb-3 group-hover:text-brand-yellow transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </span>
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Read
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
