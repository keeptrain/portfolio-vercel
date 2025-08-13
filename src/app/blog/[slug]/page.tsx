import BlogContent from '@/components/blog/BlogContent'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogContent slug={params.slug} />
}