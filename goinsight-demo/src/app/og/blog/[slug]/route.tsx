import { notFound } from "next/navigation";
import { renderOgImage } from "@/lib/og";
import { getAllSlugs, getPostBySlug } from "@/data/blog-data";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  return renderOgImage({ title: post.title, eyebrow: post.category, footer: "goinsight.in/blog" });
}
