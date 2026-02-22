"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { BlogAuthor } from "@/data/blog-data";

interface BlogAuthorCardProps {
  author: BlogAuthor;
}

export default function BlogAuthorCard({ author }: BlogAuthorCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-4">
        <Image
          src={author.avatar}
          alt={author.name}
          width={56}
          height={56}
          className="w-14 h-14 rounded-full bg-gray-50 object-contain"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-brand-dark">{author.name}</h4>
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-yellow hover:text-yellow-500 transition-colors"
                aria-label={`${author.name} LinkedIn`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
          </div>
          <p className="text-xs text-brand-yellow font-medium mb-2">{author.role}</p>
          <p className="text-sm text-gray-500 leading-relaxed">{author.bio}</p>
        </div>
      </div>
    </motion.div>
  );
}
