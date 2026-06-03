# Arsitektur Static Projects — No Database

> Build-time data, static HTML output, minimal client hydration  
> Last updated: 2026-06-03

---

## 1. Filosofi

Projects tidak memerlukan rich content seperti blog. Data bersifat **struktural dan statis** — stack, links, images, deskripsi singkat. Semua disimpan sebagai **JSON files** dalam repo, diproses saat build, di-output sebagai static HTML.

**No MDX. No runtime DB. No API routes untuk read.**

---

## 2. Struktur File

```
content/
└── projects/
    ├── jakreq.json
    ├── cullinarix.json
    └── radiodent.json

data/
├── projects.ts          # Helper: read & parse project JSON
└── filters.ts           # Helper: filter by stack, featured, date

app/
├── [locale]/
│   └── projects/
│       ├── page.tsx           # List projects (RSC + ISR)
│       └── [slug]/
│           └── page.tsx       # Single project (RSC)
└── sitemap.ts

components/
├── projects/
│   ├── ProjectCard.tsx        # Client Component (hover effects)
│   ├── ProjectGrid.tsx        # Server Component (layout)
│   ├── ProjectDetail.tsx      # Server Component (single view)
│   └── FilterBar.tsx          # Client Component (state: stack, sort)
└── ui/
    └── TechBadge.tsx          # Client Component (stack icons)
```

---

## 3. Storage Strategy — JSON + Assets

### 3.1 Project Data: Pure JSON

```json
{
  "id": "jakreq",
  "title": "JakReq",
  "subtitle": "Request Management System",
  "description": "Aplikasi pengelolaan permohonan untuk pemerintah daerah dengan workflow approval multi-level.",
  "longDescription": "Built with Laravel and Livewire...",
  "stack": ["Laravel", "Livewire", "Alpine.js", "Tailwind"],
  "category": "Web Application",
  "featured": true,
  "date": "2024-03-01",
  "duration": "3 months",
  "role": "Full Stack Developer",
  "images": {
    "thumbnail": "/images/projects/jakreq-thumb.jpg",
    "cover": "/images/projects/jakreq-cover.jpg",
    "gallery": [
      "/images/projects/jakreq-1.jpg",
      "/images/projects/jakreq-2.jpg"
    ]
  },
  "links": {
    "demo": "https://jakreq.id",
    "github": "https://github.com/keeptrain/jakreq",
    "caseStudy": "/blog/jakreq-case-study"
  },
  "testimonial": {
    "quote": "Great work!",
    "author": "Client Name",
    "role": "IT Manager"
  },
  "stats": {
    "users": "500+",
    "requestsProcessed": "10k+"
  }
}
```

**Kenapa JSON?**
- Struktur rigid, konsisten antar project
- Mudah di-filter, sort, group by (stack, category, featured)
- Type-safe dengan TypeScript interface
- Tidak perlu rich text content seperti blog

### 3.2 Assets

```
public/
└── images/
    └── projects/
        ├── jakreq-thumb.jpg      # 800x600, WebP preferred
        ├── jakreq-cover.jpg      # 1200x630, OG image
        ├── jakreq-1.jpg          # Gallery full
        └── jakreq-2.jpg
```

**Asset Rules:**
- Thumbnail: `800x600`, max `200KB`
- Cover: `1200x630` (OG image), max `300KB`
- Gallery: `1600x900`, max `500KB` each
- Format: WebP dengan JPG fallback
- Compress semua images via `next/image` optimizer

---

## 4. Data Layer — Build Time Only

### 4.1 Static I/O with Cache

```ts
// data/projects.ts
import { readFileSync, readdirSync } from "fs";
import { join, basename } from "path";

const PROJECTS_DIR = join(process.cwd(), "content/projects");

// Module-level cache
const projectsCache = new Map<string, Project>();
const allProjectsCache: Project[] | null = null;

function parseProject(filePath: string): Project {
  const content = readFileSync(filePath, "utf8");
  return JSON.parse(content) as Project;
}

export function getAllProjects(): Project[] {
  if (allProjectsCache) return allProjectsCache;
  
  const files = readdirSync(PROJECTS_DIR).filter(f => f.endsWith(".json"));
  const projects = files
    .map(f => parseProject(join(PROJECTS_DIR, f)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  projects.forEach(p => projectsCache.set(p.id, p));
  return projects;
}

export function getProjectBySlug(slug: string): Project | null {
  if (projectsCache.has(slug)) return projectsCache.get(slug)!;
  
  try {
    const project = parseProject(join(PROJECTS_DIR, `${slug}.json`));
    projectsCache.set(slug, project);
    return project;
  } catch {
    return null;
  }
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(p => p.featured);
}

export function getProjectsByStack(stack: string): Project[] {
  return getAllProjects().filter(p => 
    p.stack.some(s => s.toLowerCase() === stack.toLowerCase())
  );
}
```

### 4.2 Filter Helpers

```ts
// data/filters.ts
export const STACK_OPTIONS = [
  "Laravel", "Livewire", "React", "Next.js", 
  "Tailwind", "Alpine.js", "Kotlin", "Android"
] as const;

export const CATEGORIES = [
  "Web Application",
  "Mobile Application", 
  "Open Source",
  "Experimental"
] as const;

export type SortOption = "date" | "name" | "featured";

export function filterProjects(
  projects: Project[],
  options: {
    stack?: string;
    category?: string;
    featured?: boolean;
    sort?: SortOption;
  }
): Project[] {
  let filtered = [...projects];
  
  if (options.stack) {
    filtered = filtered.filter(p => 
      p.stack.some(s => s.toLowerCase() === options.stack!.toLowerCase())
    );
  }
  
  if (options.category) {
    filtered = filtered.filter(p => p.category === options.category);
  }
  
  if (options.featured) {
    filtered = filtered.filter(p => p.featured);
  }
  
  switch (options.sort) {
    case "name":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "featured":
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
    default:
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  return filtered;
}
```

---

## 5. Page Architecture

### 5.1 List Page — Projects Grid

```tsx
// app/[locale]/projects/page.tsx
import { getAllProjects } from "@/data/projects";
import { STACK_OPTIONS, CATEGORIES } from "@/data/filters";
import ProjectGrid from "@/components/projects/ProjectGrid";
import FilterBar from "@/components/projects/FilterBar";

export const metadata = {
  title: "Projects | Gilang",
  description: "A collection of my work...",
};

export default function ProjectsPage() {
  const projects = getAllProjects(); // Build-time
  
  return (
    <main>
      <h1>Projects</h1>
      <FilterBar stacks={STACK_OPTIONS} categories={CATEGORIES} />
      <ProjectGrid projects={projects} />
    </main>
  );
}
```

### 5.2 Detail Page — Single Project

```tsx
// app/[locale]/projects/[slug]/page.tsx
import { getProjectBySlug, getAllProjects } from "@/data/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) return { title: "Not Found" };
  
  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      images: [{ url: project.images.cover, width: 1200, height: 630 }],
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) notFound();
  
  return <ProjectDetail project={project} />;
}
```

---

## 6. Component Architecture

### 6.1 Server Components (Zero Client JS)

```tsx
// components/projects/ProjectGrid.tsx — Server Component
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

```tsx
// components/projects/ProjectDetail.tsx — Server Component
export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <ProjectHero project={project} />
      <ProjectGallery images={project.images.gallery} />
      <ProjectInfo project={project} />
      <ProjectStats stats={project.stats} />
    </article>
  );
}
```

### 6.2 Client Components (Minimal, Interactive Only)

```tsx
// components/projects/FilterBar.tsx — Client Component
"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar({ stacks, categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeStack, setActiveStack] = useState(searchParams.get("stack") || "");
  
  const handleFilter = useCallback((stack: string) => {
    const params = new URLSearchParams(searchParams);
    if (stack) params.set("stack", stack);
    else params.delete("stack");
    router.push(`/projects?${params.toString()}`);
  }, [searchParams, router]);
  
  return (
    <div className="flex gap-2">
      {stacks.map(stack => (
        <button
          key={stack}
          onClick={() => handleFilter(stack === activeStack ? "" : stack)}
          className={activeStack === stack ? "bg-black text-white" : "bg-gray-100"}
        >
          {stack}
        </button>
      ))}
    </div>
  );
}
```

```tsx
// components/projects/ProjectCard.tsx — Client Component
"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={project.images.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <h3>{project.title}</h3>
      <div className="flex gap-2">
        {project.stack.slice(0, 3).map(s => (
          <TechBadge key={s} name={s} />
        ))}
      </div>
    </Link>
  );
}
```

---

## 7. Performance Optimization

### 7.1 Image Strategy

```tsx
// Thumbnail (grid view)
<Image
  src={project.images.thumbnail}
  alt={project.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"           // Below the fold
  className="object-cover"
/>

// Cover (detail view, above fold)
<Image
  src={project.images.cover}
  alt={project.title}
  width={1200}
  height={630}
  priority={true}          // LCP image
  sizes="100vw"
  className="rounded-lg"
/>
```

### 7.2 Dynamic Imports untuk Heavy Components

```tsx
// components/projects/ProjectGallery.tsx
import dynamic from "next/dynamic";

const Lightbox = dynamic(
  () => import("yet-another-react-lightbox"),
  { ssr: false, loading: () => <Skeleton /> }
);

export default function ProjectGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {images.map(img => (
          <button key={img} onClick={() => setOpen(true)}>
            <Image src={img} alt="" width={400} height={300} />
          </button>
        ))}
      </div>
      {open && <Lightbox slides={images} onClose={() => setOpen(false)} />}
    </>
  );
}
```

### 7.3 Route Segment Config

```tsx
// app/[locale]/projects/page.tsx
export const revalidate = 3600; // ISR: revalidate setiap 1 jam
export const dynamic = "force-static"; // Static generation
```

---

## 8. SEO Strategy

### 8.1 Metadata per Project

```tsx
// app/[locale]/projects/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.description,
    keywords: [...project.stack, project.category, "portfolio"],
    authors: [{ name: "Gilang" }],
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        { url: project.images.cover, width: 1200, height: 630 }
      ],
      type: "article",
      publishedTime: project.date,
      tags: project.stack,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.images.cover],
    },
    alternates: {
      canonical: `/projects/${project.id}`,
    },
  };
}
```

### 8.2 Project Schema (JSON-LD)

```tsx
// components/seo/ProjectSchema.tsx
export function ProjectSchema({ project }: { project: Project }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.images.cover,
    datePublished: project.date,
    author: { "@type": "Person", name: "Gilang" },
    programmingLanguage: project.stack,
    url: `https://keeptrain.vercel.app/projects/${project.id}`,
    applicationCategory: project.category,
    ...(project.links.demo && { url: project.links.demo }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 9. React Best Practices (Vercel Style)

| Rule | Implementasi |
|------|-------------|
| `server-hoist-static-io` | `fs.readFileSync` di module level, cache di `Map` |
| `server-serialization` | Hanya pass `Project` object (POJO) ke Client Components |
| `bundle-barrel-imports` | Import icon spesifik: `import { Folder } from "lucide-react"` |
| `bundle-dynamic-imports` | Lightbox gallery di-load dynamic |
| `rerender-memo` | `ProjectCard` di-memo kalau project list tidak berubah |
| `rendering-content-visibility` | `content-visibility: auto` untuk grid dengan banyak item |
| `client-passive-event-listeners` | Passive listeners untuk scroll di gallery |

---

## 10. Metrics Target

| Metric | Target |
|--------|--------|
| **First Contentful Paint (FCP)** | < 1.0s |
| **Largest Contentful Paint (LCP)** | < 1.5s |
| **Time to Interactive (TTI)** | < 2.0s |
| **Cumulative Layout Shift (CLS)** | < 0.1 |
| **Bundle Size (projects list)** | < 40 KB JS |
| **Bundle Size (project detail)** | < 70 KB JS (termasuk lightbox) |
| **Lighthouse Performance** | 95+ |
| **Image Load** | < 200ms per thumbnail |

---

## 11. Action Items

- [ ] **Setup content dir**: Buat `/content/projects/*.json`
- [ ] **Migrate data**: Pindahkan project data dari hardcoded ke JSON files
- [ ] **Buat data layer**: Implementasi `data/projects.ts` dan `data/filters.ts`
- [ ] **Update list page**: Refactor `app/[locale]/projects/page.tsx` ke RSC
- [ ] **Update detail page**: Buat `app/[locale]/projects/[slug]/page.tsx`
- [ ] **Komponen UI**: `ProjectCard`, `ProjectGrid`, `FilterBar`, `TechBadge`
- [ ] **Image optimization**: Convert semua project images ke WebP
- [ ] **SEO**: Implementasi `generateMetadata` dan `ProjectSchema`
- [ ] **Filter state**: URL-based filter dengan `useSearchParams`
- [ ] **Testing**: Cek Lighthouse score setelah implementasi

---

## 12. Dependencies

```json
{
  "dependencies": {
    "lucide-react": "^1.17.0"
  },
  "optionalDependencies": {
    "yet-another-react-lightbox": "^3.0.0"
  }
}
```

---

*Dibuat dengan panduan Vercel React Best Practices.  
Fokus pada: JSON simplicity, build-time computation, image-first performance.*
