import { Locale } from "@/i18n/locales";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = getAllPosts(locale as Locale);

  return (
    <main className="min-h-screen bg-white py-24 dark:bg-gray-900">
      <div className="container-max section-padding">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Blog
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale as Locale} />
          ))}
        </div>
      </div>
    </main>
  );
}
