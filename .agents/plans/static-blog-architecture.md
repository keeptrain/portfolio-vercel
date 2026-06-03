# Arsitektur Static Blog & Projects — No Database

> Compute at build time, serve static HTML, hydrate minimally  
> Last updated: 2026-06-03

---

## 1. Filosofi

Semua data disimpan sebagai **file dalam repo** → diproses saat `next build` → di-output sebagai **static HTML** → browser hanya hydrasi interaksi minimal.

**No runtime database. No API routes untuk read. Build-time only.**

---

## 2. Struktur File

```
content/
├── blog/
│   ├── my-coding-journey-2024.mdx
│   └── building-this-portfolio.mdx
└── projects/
    ├── jakreq.mdx
    └── cullinarix.mdx

data/
├── blog.ts          # Helper: read & parse blog MDX
├── projects.ts      # Helper: read & parse project MDX
└── metadata.ts      # Shared SEO defaults

app/
├── [locale]/
│   ├── blog/
│   │   ├── page.tsx           # List posts (RSC)
│   │   └── [slug]/
│   │       └── page.tsx       # Single post (RSC)
│   ├── projects/
│   │   ├── page.tsx           # List projects (RSC)
│   │   └── [slug]/
│   │       └── page.tsx       # Single project (RSC)
│   └── layout.tsx
├── layout.tsx
└── sitemap.ts                 # Dynamic sitemap

components/
├── blog/
│   ├── BlogCard.tsx           # Client Component (minimal)
│   └── MDXContent.tsx         # Client Component (MDX renderer)
├── projects/
│   └── ProjectCard.tsx        # Client Component (minimal)
└── ui/
    └── Image.tsx              # Wrapper next/image
```

---

## 3. Storage Strategy

### 3.1 Blog Posts: MDX + Frontmatter

```mdx
---
title: "My Coding Journey 2024"
date: "2024-01-15"
description: "How I learned to code in one year"
coverImage: "/images/blog/journey.jpg"
tags: ["career", "learning"]
---

# My Coding Journey

This is the content...
```

**Kenapa MDX?**
- Content + React components dalam satu file
- Frontmatter untuk metadata (JSON parsable)
- Git version control native
- Build-time parsing via `gray-matter` + `next-mdx-remote`

### 3.2 Projects: MDX atau JSON

```json
{
  "id": "jakreq",
  "title": "JakReq",
  "description": "A request management system",
  "stack": ["Laravel", "Livewire"],
  "image": "/images/projects/jakreq.jpg",
  "links": {
    "demo": "https://jakreq.id",
    "github": "https://github.com/keeptrain/jakreq"
  },
  "featured": true,
  "date": "2024-03-01"
}
```

**Kenapa JSON untuk Projects?**
- Struktur data lebih rigid/consisten
- Lebih mudah di-filter/sort (stack, featured, date)
- Tidak perlu rich content seperti blog

---

## 4. Data Fetching — Build Time Only

### 4.1 Pattern: Static I/O Hoisting

```ts
// data/blog.ts
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const BLOG_DIR = join(process.cwd(), "content/blog");

// Hoist static I/O ke module level
const postsCache = new Map<string, BlogPost>();

function parsePost(filePath: string): BlogPost {
  const file = readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  return { ...data, content, slug: basename(filePath, ".mdx") } as BlogPost;
}

// Build-time only — tidak di-request saat runtime
export function getAllPosts(): BlogPost[] {
  if (postsCache.size > 0) return Array.from(postsCache.values());
  
  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));
  const posts = files.map(f => parsePost(join(BLOG_DIR, f)));
  
  posts.forEach(p => postsCache.set(p.slug, p));
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (postsCache.has(slug)) return postsCache.get(slug)!;
  
  try {
    const post = parsePost(join(BLOG_DIR, `${slug}.mdx`));
    postsCache.set(slug, post);
    return post;
  } catch {
    return null;
  }
}
```

### 4.2 Page Components — RSC Default

```tsx
// app/[locale]/blog/page.tsx
import { getAllPosts } from "@/data/blog";

export default async function BlogPage() {
  const posts = getAllPosts(); // Build-time execution
  
  return (
    <main>
      <h1>Blog</h1>
      {posts.map(post => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </main>
  );
}
```

```tsx
// app/[locale]/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "@/data/blog";
import { MDXContent } from "@/components/blog/MDXContent";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: { images: [post.coverImage] },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <MDXContent source={post.content} />
    </article>
  );
}
```

---

## 5. Performance Optimization

### 5.1 Eliminate Waterfalls

```tsx
// ❌ Sequential (waterfall)
const posts = await getPosts();
const authors = await getAuthors();
const tags = await getTags();

// ✅ Parallel
const [posts, authors, tags] = await Promise.all([
  getPosts(), getAuthors(), getTags()
]);
```

### 5.2 Bundle Optimization

```tsx
// MDX Renderer — heavy, load only when needed
import dynamic from "next/dynamic";

const MDXContent = dynamic(
  () => import("@/components/blog/MDXContent"),
  { loading: () => <Skeleton /> }
);
```

### 5.3 Image Optimization

```tsx
<Image
  src="/images/blog/cover.jpg"
  alt="Blog cover"
  width={1200}
  height={630}
  priority={isHero}     // LCP image
  sizes="(max-width: 768px) 100vw, 1200px"
  className="rounded-lg"
/>
```

### 5.4 Minimal Client JavaScript

```
app/[locale]/blog/page.tsx        → Server Component (0 KB client JS)
components/blog/BlogCard.tsx      → Client Component (5 KB)
components/blog/MDXContent.tsx    → Client Component (15 KB — MDX parser)
components/ui/ThemeSwitcher.tsx   → Client Component (3 KB)
```

**Target:** < 50 KB total client JS untuk blog list page

---

## 6. SEO Strategy

### 6.1 Metadata API (Next.js 16)

```tsx
// app/[locale]/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  return {
    title: `${post.title} | Gilang's Blog`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "Gilang" }],
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `/blog/${slug}`,
      languages: { en: `/en/blog/${slug}`, id: `/id/blog/${slug}` },
    },
  };
}
```

### 6.2 Structured Data (JSON-LD)

```tsx
// components/seo/ArticleSchema.tsx
export function ArticleSchema({ post }: { post: BlogPost }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.coverImage,
    datePublished: post.date,
    author: { "@type": "Person", name: "Gilang" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 6.3 Dynamic Sitemap

```ts
// app/sitemap.ts
import { getAllPosts } from "@/data/blog";
import { getAllProjects } from "@/data/projects";

export default async function sitemap() {
  const posts = getAllPosts().map(post => ({
    url: `https://keeptrain.vercel.app/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projects = getAllProjects().map(project => ({
    url: `https://keeptrain.vercel.app/projects/${project.id}`,
    lastModified: project.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: "https://keeptrain.vercel.app", priority: 1.0 },
    ...posts,
    ...projects,
  ];
}
```

### 6.4 RSS Feed (Optional but recommended)

```ts
// app/feed.xml/route.ts
export async function GET() {
  const posts = getAllPosts();
  const xml = generateRSS(posts); // helper function
  
  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
```

---

## 7. React Best Practices (Vercel Style)

| Rule | Implementasi |
|------|-------------|
| `server-hoist-static-io` | `fs.readFileSync` di module level, cache di `Map` |
| `server-parallel-fetching` | `Promise.all([posts, projects])` |
| `server-serialization` | Hanya pass primitive/string ke Client Components |
| `bundle-barrel-imports` | Import langsung dari `lucide-react` icon spesifik |
| `bundle-dynamic-imports` | MDX parser di-load dynamic |
| `rerender-memo` | `BlogCard` di-memo kalau props tidak berubah |
| `rendering-conditional-render` | Ternary, bukan `&&` untuk conditional |
| `rendering-content-visibility` | `content-visibility: auto` untuk long lists |

---

## 8. Metrics Target

| Metric | Target |
|--------|--------|
| **First Contentful Paint (FCP)** | < 1.0s |
| **Largest Contentful Paint (LCP)** | < 1.5s |
| **Time to Interactive (TTI)** | < 2.5s |
| **Total Blocking Time (TBT)** | < 200ms |
| **Cumulative Layout Shift (CLS)** | < 0.1 |
| **Bundle Size (blog list)** | < 50 KB JS |
| **Bundle Size (blog post)** | < 80 KB JS |
| **Lighthouse Performance** | 95+ |

---

## 9. Action Items

- [ ] **Setup MDX**: Install `gray-matter`, `next-mdx-remote`, `@mdx-js/react`
- [ ] **Migrate konten**: Pindahkan blog posts ke `/content/blog/*.mdx`
- [ ] **Refactor data layer**: Buat `data/blog.ts` dan `data/projects.ts`
- [ ] **Update pages**: Convert blog/project pages ke pure RSC
- [ ] **SEO components**: Buat `ArticleSchema`, `ProjectSchema`
- [ ] **Sitemap & RSS**: Generate dynamic di `app/sitemap.ts` dan `app/feed.xml`
- [ ] **Image audit**: Semua `<img>` → `<Image>` dengan proper `sizes`
- [ ] **Bundle audit**: `pnpm analyze` untuk cek chunk size

---

## 10. Dependencies

```json
{
  "dependencies": {
    "gray-matter": "^4.0.3",
    "next-mdx-remote": "^5.0.0",
    "@mdx-js/react": "^3.0.0"
  }
}
```

---

*Dibuat dengan panduan Vercel React Best Practices.  
Fokus pada: build-time computation, minimal client JS, optimal SEO.*
