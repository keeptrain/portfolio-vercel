# Performance Optimization Plan

> Core Web Vitals, bundle size, runtime performance  
> Last updated: 2026-06-03

---

## 1. Current State Analysis

### 1.1 Build Output Review

```
Route (app)
├ ● /[locale]                            21.7 kB         130 kB First Load JS
├ ● /[locale]/projects                   1.66 kB         107 kB
├ ● /[locale]/contact                    486 B           109 kB
```

**Observations:**
- Shared chunk: ~100 KB (acceptable but could be smaller)
- Landing page: 21.7 kB (good, but mostly server-rendered)
- Dependencies include: `embla-carousel-react`, `radix-ui`, `tw-animate-css`

### 1.2 Identified Bottlenecks

| # | Issue | Impact |
|---|-------|--------|
| 1 | `embla-carousel-react` loaded on every page (via HowIWork) | ~15 KB JS di shared chunk |
| 2 | `radix-ui` full import (bukan tree-shakeable) | ~20 KB JS |
| 3 | Images tidak di-optimize: `/test-png.jpg`, placeholder | LCP delay |
| 4 | No `loading.tsx` atau `error.tsx` | Poor UX saat slow connection |
| 5 | No resource hints (preconnect, dns-prefetch) | DNS lookup delay |
| 6 | `tw-animate-css` loaded globally | Unused animation classes |

---

## 2. Bundle Optimization

### 2.1 Tree-Shakeable Imports

```tsx
// ❌ Before — Full package import
import * as Carousel from "@/components/ui/carousel";

// ✅ After — Specific import
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
```

```tsx
// ❌ Before — Full radix-ui
import { Dialog, DialogContent } from "radix-ui";

// ✅ After — Specific component (if available)
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
```

### 2.2 Dynamic Imports untuk Heavy Components

```tsx
// components/sections/AboutSection.tsx
import dynamic from "next/dynamic";

// Only load carousel when About section is visible
const HowIWorkCarousel = dynamic(
  () => import("@/components/HowIWork"),
  { 
    loading: () => <CarouselSkeleton />,
    ssr: false // Client-only component
  }
);

export function AboutSection() {
  return (
    <section id="about">
      <h2>How I Work</h2>
      <HowIWorkCarousel />
    </section>
  );
}
```

### 2.3 Lazy Load Below-Fold Sections

```tsx
// features/landing/LandingPage.tsx
import dynamic from "next/dynamic";

// Hero selalu load (above fold)
import { HeroSection } from "./HeroSection";

// Lazy load below-fold sections
const AboutSection = dynamic(() => import("./AboutSection"));
const ProjectsSection = dynamic(() => import("./ProjectsSection"));

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
    </>
  );
}
```

### 2.4 Remove Unused Dependencies

```bash
# Cek unused dependencies
pnpm dlx depcheck

# Potensi yang bisa di-remove:
# - `tw-animate-css` → ganti ke Tailwind built-in animate
# - `shadcn` → CLI tool, bukan runtime dependency
# - `class-variance-authority` → sudah ada, pastikan dipakai
```

---

## 3. Image Optimization

### 3.1 Next.js Image Config

```ts
// next.config.js
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], // AVIF first (smaller)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
};
```

### 3.2 Image Best Practices

```tsx
// Hero profile — LCP image, eager load
<Image
  src="/images/photos.png"
  alt="Profile"
  fill
  priority        // Eager load
  sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 320px"
  className="object-cover"
/>

// Project thumbnails — lazy load
<Image
  src={project.thumbnail}
  alt={project.title}
  fill
  loading="lazy"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover"
/>

// Blog cover — responsive
<Image
  src={post.coverImage}
  alt={post.title}
  width={1200}
  height={630}
  priority={index === 0} // First image eager
  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="rounded-lg"
/>
```

### 3.3 Image Preloading

```tsx
// app/layout.tsx
import { preload } from "react-dom";

export default function RootLayout() {
  // Preload hero image
  preload("/images/photos.png", { as: "image" });
  
  return (...);
}
```

### 3.4 Blur Placeholder

```tsx
// Generate blur Data URL untuk placeholder
<Image
  src="/images/photos.png"
  alt="Profile"
  fill
  placeholder="blur"
  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANS..."
/>
```

---

## 4. Font Optimization

### 4.1 Next.js Font (Already Done ✓)

```tsx
// app/layout.tsx
import { Montserrat, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  preload: true,
});
```

### 4.2 Font Subsetting (Reduce Size)

```tsx
// Hanya load karakter yang dipakai
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  // Optional: reduce to specific weights
  weight: ["400", "500", "600", "700"],
});
```

---

## 5. Resource Hints

### 5.1 Preconnect & DNS-Prefetch

```tsx
// app/layout.tsx
export const metadata = {
  // Preconnect to third-party domains
  other: {
    preconnect: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ],
  },
};

// Or in JSX
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://analytics.vercel.com" />
</head>
```

### 5.2 Prefetch on Hover

```tsx
// components/ui/Link.tsx
import Link from "next/link";

export function PrefetchLink({ href, children, ...props }) {
  return (
    <Link href={href} prefetch={false} {...props}>
      {children}
    </Link>
  );
}

// Next.js automatically prefetches on hover for <Link>
// No manual implementation needed
```

---

## 6. Runtime Performance

### 6.1 Event Debouncing

```ts
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
}

// Usage: filter input
function FilterBar() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);
  
  useEffect(() => {
    performSearch(debouncedInput);
  }, [debouncedInput]);
}
```

### 6.2 Intersection Observer untuk Lazy Load

```tsx
// hooks/useInView.ts
import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, options);
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return { ref, isInView };
}

// Usage
function LazySection() {
  const { ref, isInView } = useInView({ margin: "200px" });
  
  return (
    <div ref={ref}>
      {isInView && <HeavyContent />}
    </div>
  );
}
```

### 6.3 Content Visibility

```css
/* globals.css */
@layer utilities {
  .content-visibility-auto {
    content-visibility: auto;
    contain-intrinsic-size: 0 500px;
  }
}

/* Usage */
<section className="content-visibility-auto">
  {/* Section content */}
</section>
```

---

## 7. Loading & Error States

### 7.1 Loading UI

```tsx
// app/[locale]/loading.tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black dark:border-zinc-800 dark:border-t-white" />
    </div>
  );
}
```

```tsx
// app/[locale]/blog/loading.tsx
export default function BlogLoading() {
  return (
    <div className="space-y-4 py-24">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-[3/2] animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 7.2 Error Boundaries

```tsx
// app/[locale]/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <button
        onClick={reset}
        className="rounded-full bg-black px-6 py-2 text-white dark:bg-white dark:text-black"
      >
        Try again
      </button>
    </div>
  );
}
```

### 7.3 Not Found Pages

```tsx
// app/[locale]/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500">Page not found</p>
      <a href="/" className="text-blue-600 underline">
        Go home
      </a>
    </div>
  );
}
```

---

## 8. Metrics Monitoring

### 8.1 Web Vitals Reporting

```tsx
// app/layout.tsx (or instrument via analytics)
import { useReportWebVitals } from "next/web-vitals";

export function reportWebVitals(metric) {
  // Send to analytics
  console.log(metric);
  
  // Example: send to Vercel Analytics
  // import { webVitals } from "@vercel/analytics";
  // webVitals(metric);
}
```

### 8.2 Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g @lhci/cli@0.12.x
      - run: pnpm build
      - run: lhci autorun
```

```json
// lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
  },
};
```

---

## 9. Action Items

- [ ] **Bundle audit**: `pnpm analyze` → identifikasi largest chunks
- [ ] **Remove unused deps**: `depcheck` → remove/shrink
- [ ] **Dynamic imports**: Carousel, heavy modals, charts
- [ ] **Image audit**: Semua `<img>` → `<Image>` dengan proper `sizes`
- [ ] **AVIF/WebP**: Convert all images, enable `formats: ["image/avif"]`
- [ ] **Resource hints**: Preconnect Google Fonts, analytics
- [ ] **Loading states**: `loading.tsx` untuk semua route segments
- [ ] **Error boundaries**: `error.tsx` untuk root dan nested routes
- [ ] **404 page**: `not-found.tsx` dengan helpful links
- [ ] **Content visibility**: Add `content-visibility: auto` untuk sections
- [ ] **Lighthouse CI**: Setup GitHub Action dengan thresholds
- [ ] **Vercel Analytics**: Install `@vercel/analytics` dan `@vercel/speed-insights`

---

## 10. Dependencies

```json
{
  "dependencies": {
    "@vercel/analytics": "^1.3.0",
    "@vercel/speed-insights": "^1.1.0"
  },
  "devDependencies": {
    "@lhci/cli": "^0.14.0"
  }
}
```

---

*Target: FCP <1s, LCP <1.5s, TBT <200ms, CLS <0.1, Lighthouse Performance 95+.*
