import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schemas";
import { blogPosts, getPostBySlug, getAllSlugs } from "@/data/blog-data";
import BlogPostContent from "./BlogPostContent";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    path: `/blog/${post.slug}`,
    ogType: "article",
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <BlogPostContent post={post} />
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          url: `https://goinsight.in/blog/${post.slug}`,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          authorName: post.author.name,
          imageUrl: `https://goinsight.in${post.coverImage}`,
          keywords: post.keywords,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "https://goinsight.in" },
          { name: "Blog", url: "https://goinsight.in/blog" },
          { name: post.title, url: `https://goinsight.in/blog/${post.slug}` },
        ])}
      />
    </>
  );
}
