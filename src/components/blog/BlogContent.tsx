"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPostBySlug, getRelatedPosts, formatDate } from "@/lib/blog";
import { BlogPost } from "@/data/blogPosts";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogCard from "@/components/blog/BlogCard";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";

interface BlogContentProps {
  slug: string;
}

const BlogContent = ({ slug }: BlogContentProps) => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && slug) {
      setIsLoading(true);
      const foundPost = getPostBySlug(slug, language);

      if (foundPost) {
        setPost(foundPost);
        const related = getRelatedPosts(foundPost, language, 3);
        setRelatedPosts(related);
      } else {
        setPost(null);
        setRelatedPosts([]);
      }

      setIsLoading(false);
    }
  }, [mounted, slug, language]);

  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <BlogHeader />
        <main className="container-max section-padding py-20">
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">📝</div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {language === "en"
                ? "Post Not Found"
                : "Postingan Tidak Ditemukan"}
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              {language === "en"
                ? "The blog post you are looking for does not exist or has been moved."
                : "Postingan blog yang Anda cari tidak ada atau telah dipindahkan."}
            </p>
            <Link href="/blog" className="btn-primary">
              {language === "en" ? "Back to Blog" : "Kembali ke Blog"}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogHeader />

      <main className="container-max section-padding py-20">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              >
                Portfolio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/blog"
                className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
              >
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="truncate font-medium text-gray-900 dark:text-gray-100">
              {post.title}
            </li>
          </ol>
        </nav>

        <article className="mx-auto max-w-4xl">
          {/* Post header */}
          <header className="mb-12">
            {post.featured && (
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
                  {language === "en" ? "Featured Post" : "Postingan Unggulan"}
                </span>
              </div>
            )}

            <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 sm:text-5xl dark:text-gray-100">
              {post.title}
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <time dateTime={post.date} className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDate(post.date, language)}
              </time>

              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {post.readTime} {language === "en" ? "min read" : "menit baca"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </header>

          {/* Post content */}
          <div className="prose prose-lg dark:prose-invert mb-12 max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Post footer */}
          <footer className="border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                {language === "en" ? "Back to Blog" : "Kembali ke Blog"}
              </Link>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {language === "en"
                    ? "Share this post:"
                    : "Bagikan postingan ini:"}
                </span>
                <button
                  onClick={() =>
                    navigator.share?.({
                      title: post.title,
                      url: window.location.href,
                    })
                  }
                  className="p-2 text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  aria-label="Share post"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
              {language === "en" ? "Related Posts" : "Postingan Terkait"}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BlogContent;
