"use client";

import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import type { BlogPost } from "@/data/blog-data";

interface BlogRelatedPostsProps {
  posts: BlogPost[];
}

export default function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-bold tracking-widest text-brand-yellow uppercase">
            Continue Reading
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mt-2">
            Related Articles
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
