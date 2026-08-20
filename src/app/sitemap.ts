import { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import { blogPosts } from "@/features/blog/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://keeptrain.vercel.app";
  const routes = ["", "/projects", "/blog"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }

    // Blog posts
    for (const post of blogPosts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post[locale as keyof typeof post].id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}