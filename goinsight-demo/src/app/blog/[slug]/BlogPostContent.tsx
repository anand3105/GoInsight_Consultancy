"use client";

import dynamic from "next/dynamic";
import { type BlogPost, getRelatedPosts } from "@/data/blog-data";
import BlogHero from "@/components/blog/BlogHero";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogAuthorCard from "@/components/blog/BlogAuthorCard";
import BlogRelatedPosts from "@/components/blog/BlogRelatedPosts";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogFAQ from "@/components/blog/BlogFAQ";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const postComponents: Record<string, React.ComponentType> = {
  "power-bi-consulting-services-guide": dynamic(
    () => import("./posts/power-bi-consulting-services-guide")
  ),
  "microsoft-fabric-vs-power-bi": dynamic(
    () => import("./posts/microsoft-fabric-vs-power-bi")
  ),
  "how-to-build-a-data-strategy": dynamic(
    () => import("./posts/how-to-build-a-data-strategy")
  ),
  "data-analytics-for-small-business": dynamic(
    () => import("./posts/data-analytics-for-small-business")
  ),
  "how-to-use-ai-in-data-analytics": dynamic(
    () => import("./posts/how-to-use-ai-in-data-analytics")
  ),
  "data-analytics-transforming-business-2026": dynamic(
    () => import("./posts/data-analytics-transforming-business-2026")
  ),
  "power-bi-vs-tableau": dynamic(
    () => import("./posts/power-bi-vs-tableau")
  ),
  "ai-powered-analytics-machine-learning-bi": dynamic(
    () => import("./posts/ai-powered-analytics-machine-learning-bi")
  ),
  "data-analytics-consulting-dubai-middle-east": dynamic(
    () => import("./posts/data-analytics-consulting-dubai-middle-east")
  ),
  "top-10-kpi-dashboards-2026": dynamic(
    () => import("./posts/top-10-kpi-dashboards-2026")
  ),
};

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const PostArticle = postComponents[post.slug];
  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <main className="min-h-screen bg-brand-background">
      <Header />

      <BlogHero post={post} />

      <div className="bg-[#fefaf7]">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex gap-10 max-w-6xl mx-auto">
            {/* Sidebar TOC — desktop only */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <BlogTableOfContents items={post.tableOfContents} />
            </aside>

            {/* Article Body */}
            <article className="flex-1 min-w-0">
              <div className="prose prose-lg max-w-none prose-headings:text-brand-dark prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-brand-yellow prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-dark prose-li:text-gray-600">
                {PostArticle ? <PostArticle /> : <p>Article content coming soon.</p>}
              </div>

              {post.faqs.length > 0 && <BlogFAQ faqs={post.faqs} />}

              <BlogCTA />
              <BlogAuthorCard author={post.author} />
            </article>
          </div>
        </div>
      </div>

      <BlogRelatedPosts posts={relatedPosts} />

      <Footer />
    </main>
  );
}
