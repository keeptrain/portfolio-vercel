'use client'

import Link from 'next/link'
import {useLanguage} from '@/contexts/LanguageContext'
import {BlogPost} from '@/data/blogPosts'
import {formatDate} from '@/lib/blog'

interface BlogCardProps {
    post: BlogPost
}

const BlogCard = ({post}: BlogCardProps) => {
    const {language} = useLanguage()

    return (
        <article
            className="card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
            <div className="p-6">
                {/* Featured badge */}
                {post.featured && (
                    <div className="mb-4">
            <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300">
              {language === 'en' ? 'Featured' : 'Unggulan'}
            </span>
                    </div>
                )}

                {/* Post meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <time dateTime={post.date}>
                        {formatDate(post.date, language)}
                    </time>
                    <span>•</span>
                    <span>
            {post.readTime} {language === 'en' ? 'min read' : 'menit baca'}
          </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    <Link href={`/blog/${post.id}`}>
                        {post.title}
                    </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                        >
              #{tag}
            </span>
                    ))}
                    {post.tags.length > 3 && (
                        <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-sm">
              +{post.tags.length - 3} {language === 'en' ? 'more' : 'lagi'}
            </span>
                    )}
                </div>

                {/* Read more link */}
                <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors group"
                >
                    {language === 'en' ? 'Read more' : 'Baca selengkapnya'}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                </Link>
            </div>
        </article>
    )
}

export default BlogCard