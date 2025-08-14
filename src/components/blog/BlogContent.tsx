'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getPostBySlug, getRelatedPosts, formatDate } from '@/lib/blog'
import { BlogPost } from '@/data/blogPosts'
import BlogHeader from '@/components/blog/BlogHeader'
import BlogCard from '@/components/blog/BlogCard'
import MarkdownRenderer from '@/components/blog/MarkdownRenderer'

interface BlogContentProps {
    slug: string
}

const BlogContent = ({ slug }: BlogContentProps) => {
    const { language } = useLanguage()
    const [mounted, setMounted] = useState(false)
    const [post, setPost] = useState<BlogPost | null>(null)
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && slug) {
            setIsLoading(true)
            const foundPost = getPostBySlug(slug, language)

            if (foundPost) {
                setPost(foundPost)
                const related = getRelatedPosts(foundPost, language, 3)
                setRelatedPosts(related)
            } else {
                setPost(null)
                setRelatedPosts([])
            }

            setIsLoading(false)
        }
    }, [mounted, slug, language])

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900">
                <BlogHeader />
                <main className="container-max section-padding py-20">
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            {language === 'en' ? 'Post Not Found' : 'Postingan Tidak Ditemukan'}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            {language === 'en'
                                ? 'The blog post you are looking for does not exist or has been moved.'
                                : 'Postingan blog yang Anda cari tidak ada atau telah dipindahkan.'
                            }
                        </p>
                        <Link
                            href="/blog"
                            className="btn-primary"
                        >
                            {language === 'en' ? 'Back to Blog' : 'Kembali ke Blog'}
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <BlogHeader />

            <main className="container-max section-padding py-20">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <li>
                            <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Portfolio
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/blog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Blog
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 dark:text-gray-100 font-medium truncate">
                            {post.title}
                        </li>
                    </ol>
                </nav>

                <article className="max-w-4xl mx-auto">
                    {/* Post header */}
                    <header className="mb-12">
                        {post.featured && (
                            <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300">
                  {language === 'en' ? 'Featured Post' : 'Postingan Unggulan'}
                </span>
                            </div>
                        )}

                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
                            <time dateTime={post.date} className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(post.date, language)}
                            </time>

                            <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                                {post.readTime} {language === 'en' ? 'min read' : 'menit baca'}
              </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    </header>

                    {/* Post content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                        <MarkdownRenderer content={post.content} />
                    </div>

                    {/* Post footer */}
                    <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
                        <div className="flex justify-between items-center">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {language === 'en' ? 'Back to Blog' : 'Kembali ke Blog'}
                            </Link>

                            <div className="flex items-center gap-4">
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {language === 'en' ? 'Share this post:' : 'Bagikan postingan ini:'}
                </span>
                                <button
                                    onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                    aria-label="Share post"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </footer>
                </article>

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                            {language === 'en' ? 'Related Posts' : 'Postingan Terkait'}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}

export default BlogContent