import { Locale } from "@/i18n/locales";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import BlogContent from "@/components/blog/BlogContent";

export async function generateStaticParams({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale } = params;
  const posts = (await import("@/data/blogPosts")).blogPosts;
  return posts.map((post) => ({
    slug: post[locale as Locale].id,
    locale,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale as Locale);

  if (!post) {
    notFound();
  }

  return <BlogContent slug={slug} locale={locale} />;
}
