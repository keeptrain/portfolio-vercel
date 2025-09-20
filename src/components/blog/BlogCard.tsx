"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost } from "@/data/blogPosts";
import { formatDate } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { language } = useLanguage();

  return (
    <article className="card group overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        {/* Featured badge */}
        {post.featured && (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900/20 dark:text-primary-300">
              {language === "en" ? "Featured" : "Unggulan"}
            </span>
          </div>
        )}

        {/* Post meta */}
        <div className="mb-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.date}>{formatDate(post.date, language)}</time>
          <span>•</span>
          <span>
            {post.readTime} {language === "en" ? "min read" : "menit baca"}
          </span>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 text-sm text-gray-500 dark:text-gray-400">
              +{post.tags.length - 3} {language === "en" ? "more" : "lagi"}
            </span>
          )}
        </div>

        {/* Read more link */}
        <Link
          href={`/blog/${post.id}`}
          className="group inline-flex items-center gap-2 font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {language === "en" ? "Read more" : "Baca selengkapnya"}
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
