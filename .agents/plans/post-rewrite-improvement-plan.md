# Project Improvement Plan — Post mimo-v2.5-rewrite Audit

> Comprehensive audit of 70+ files, prioritized improvements  
> Last updated: 2026-06-03

---

## Executive Summary

| Category | P0 (Critical) | P1 (High) | P2 (Medium) |
|----------|---------------|-----------|-------------|
| Structure | 3 | 2 | 2 |
| Components | 1 | 3 | 3 |
| Data/i18n | 1 | 3 | 1 |
| Styling | 1 | 3 | 2 |
| Performance | 0 | 2 | 2 |
| SEO | 1 | 2 | 2 |
| Security | 1 | 2 | 0 |
| Accessibility | 0 | 3 | 1 |
| Testing | 0 | 1 | 1 |
| Dependencies | 0 | 1 | 2 |
| **Total** | **8** | **22** | **16** |

---

## P0 — Critical (Fix Immediately)

### 1. XSS Risk in MarkdownRenderer

**File:** `src/components/blog/MarkdownRenderer.tsx:61`

**Problem:** Custom regex-based markdown parser using `dangerouslySetInnerHTML`. Regex sanitization is inherently unsafe.

**Fix:** Replace with proper markdown library:
```bash
pnpm add remark remark-html
```

```tsx
// components/blog/MarkdownRenderer.tsx
import { remark } from "remark";
import html from "remark-html";

export async function MarkdownRenderer({ content }: { content: string }) {
  const processed = await remark().use(html).process(content);
  return (
    <div
      className="prose prose-lg dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: processed.toString() }}
    />
  );
}
```

---

### 2. Undefined CSS Classes

**Files:** 5+ files use `container-max`, `section-padding`, `btn-primary`

**Problem:** These classes are never defined in `globals.css`. Elements have no styling.

**Fix:** Either define them OR replace with Tailwind utilities:

```css
/* globals.css — if keeping custom classes */
@layer components {
  .container-max {
    @apply mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8;
  }
  
  .section-padding {
    @apply py-16 sm:py-20 md:py-24 lg:py-32;
  }
  
  .btn-primary {
    @apply inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black;
  }
}
```

**OR** replace in all files:
```tsx
// Before
<div className="container-max section-padding">

// After
<Container className="py-16 sm:py-20 md:py-24">
```

**Action:** Search all files for `container-max`, `section-padding`, `btn-primary` and fix.

---

### 3. Missing i18n Keys for Projects

**File:** `src/components/Projects.tsx:32-36`

**Problem:** References `projects.ecommerce.title`, `projects.taskmanager.title`, etc. — none exist in `en.json` or `id.json`. Will render raw key strings.

**Fix:** Add missing keys to both JSON files:

```json
// en.json — add to "projects" section
"ecommerce": { "title": "E-Commerce Platform" },
"taskmanager": { "title": "Task Manager" },
"weather": { "title": "Weather App" },
"code": "Code",
"demo": "Demo"
```

```json
// id.json
"ecommerce": { "title": "Platform E-Commerce" },
"taskmanager": { "title": "Manajer Tugas" },
"weather": { "title": "Aplikasi Cuaca" },
"code": "Kode",
"demo": "Demo"
```

---

### 4. No OG/Twitter Images

**File:** `src/app/[locale]/layout.tsx:32-43`

**Problem:** OpenGraph and Twitter metadata have no `images` field. Social sharing shows no preview.

**Fix:** Add OG image:

```tsx
openGraph: {
  title: "Portfolio | Gilang",
  description: t("hero.description"),
  images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  type: "website",
  locale: locale === "id" ? "id_ID" : "en_US",
},
twitter: {
  card: "summary_large_image",
  title: "Portfolio | Gilang",
  description: t("hero.description"),
  images: ["/images/og-cover.jpg"],
},
```

**Action:** Create `public/images/og-cover.jpg` (1200x630px).

---

### 5. 16 Orphaned Files

**Files:** See audit list above

**Problem:** Files exist but are never imported. Wastes bundle analysis time, confuses developers.

**Action:** Delete all orphaned files:
```bash
# Verify no imports first
grep -r "ExperienceDescription" src/ --include="*.tsx" --include="*.ts"
# If no results, delete
rm src/components/_/ExperienceDescription.tsx
# Repeat for each orphaned file
```

**Files to delete:**
- `src/components/_/ExperienceDescription.tsx`
- `src/components/_/ExperienceTimeline.tsx`
- `src/components/_/EmailInput.tsx`
- `src/components/_/Marquee.tsx`
- `src/components/ui/SkillCards.tsx`
- `src/components/ui/button/ReachOut.tsx`
- `src/components/ui/button/MoreButton.tsx`
- `src/components/Projects.tsx`
- `src/components/icons/DevIcons.jsx`

**Keep (used internally):**
- `src/components/ui/Badge.tsx` — exported from barrel
- `src/components/ui/button.tsx` — used by carousel
- `src/proxy.ts` — reference for middleware

---

### 6. Duplicate CSS Variables

**File:** `src/app/globals.css`

**Problem:** `--primary`, `--border`, `--secondary` defined twice. `fadeIn` and `animate-fade-in` duplicated.

**Fix:** Remove the first set of CSS variables (lines 13-29) and keep only the oklch set (lines 206-238). Remove duplicate keyframes.

---

### 7. No Middleware for Locale Routing

**File:** `src/proxy.ts` exists but `middleware.ts` doesn't

**Problem:** Locale detection/redirect not active. Users visiting `/` don't get redirected to `/en` or `/id`.

**Fix:** Create `middleware.ts`:

```ts
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "id"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0];
  return locales.includes(preferred) ? preferred : defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|images|icons).*)"],
};
```

---

### 8. Hardcoded Project Data with Placeholders

**Files:**
- `src/features/landing/components/IBuildStuff.tsx:17-30`
- `src/app/[locale]/projects/page.tsx:15-40`

**Problem:** Project data hardcoded with `"bla bla bla bla"` placeholder text and `/test-png.jpg` test images.

**Fix:** Create `content/projects/*.json` files (per static-projects-architecture plan) and read from there:

```json
// content/projects/jakreq.json
{
  "id": "jakreq",
  "title": "JakReq",
  "description": "Request management system for government agencies",
  "stack": ["Laravel", "Livewire"],
  "image": "/images/projects/jakreq.jpg",
  "links": { "demo": "https://jakreq.id", "github": "https://github.com/keeptrain/jakreq" },
  "featured": true,
  "date": "2024-03-01"
}
```

---

## P1 — High Priority

### 9. BlogContent Should Be Server-Rendered

**File:** `src/components/blog/BlogContent.tsx`

**Problem:** `"use client"` with `useEffect` data fetching. Blog data is available at build time.

**Fix:** Remove `"use client"`, fetch data in the page component:

```tsx
// app/[locale]/blog/[slug]/page.tsx
export default async function BlogPostPage({ params }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  
  return (
    <article>
      <BlogHeader post={post} />
      <MarkdownRenderer content={post.content} />
    </article>
  );
}
```

---

### 10. Unnecessary `loading="eager"` on Thumbnails

**File:** `src/components/shared/ProjectAdapter.tsx:23`

**Problem:** Project thumbnails use `loading="eager"` but are below the fold.

**Fix:** Change to `loading="lazy"`:
```tsx
<Image
  src={project.imageSrc}
  alt={project.title}
  fill
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 375px"
  className="rounded-lg object-cover"
/>
```

---

### 11. Duplicate Translation Logic

**Files:**
- `src/components/Projects.tsx:9-22` — custom `t()` function
- `src/components/blog/BlogHeader.tsx:10-23` — hardcoded `translations` object

**Fix:** Use `useTranslations()` from `@/i18n/TranslationContext` in both files.

---

### 12. `font-serif` Not Configured

**File:** Multiple files use `font-serif` class

**Problem:** Only `font-sans` and `font-montserrat` are configured in layout. `font-serif` falls back to system serif.

**Fix:** Either add a serif font:
```tsx
// app/layout.tsx
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
```

**OR** replace `font-serif` with `font-montserrat` throughout.

---

### 13. Heading Hierarchy Violations

**File:** `src/app/[locale]/projects/page.tsx:48-49`

**Problem:** `<h1>` containing `<h2>` — improper nesting.

**Fix:** Use proper heading hierarchy:
```tsx
<h1 className="text-2xl font-bold">Projects</h1>
// Section titles should be <h2>, not <h1>
```

---

### 14. Contact API Logs PII

**File:** `src/app/api/contact/route.ts:25`

**Problem:** `console.log("Contact form submission:", { name, email, subject, message })` — logs personal data in production.

**Fix:** Remove or use proper logging:
```tsx
// Remove in production
if (process.env.NODE_ENV === "development") {
  console.log("Contact form submission:", { name, subject });
}
```

---

### 15. Missing `@tailwindcss/typography`

**File:** `BlogContent.tsx:174` uses `prose prose-lg dark:prose-invert`

**Problem:** `@tailwindcss/typography` not installed.

**Fix:**
```bash
pnpm add @tailwindcss/typography
```

---

### 16. No Per-Blog-Post Metadata

**File:** `src/app/[locale]/blog/[slug]/page.tsx`

**Problem:** No `generateMetadata()` function. Blog posts have no individual SEO.

**Fix:**
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.coverImage],
      type: "article",
      publishedTime: post.date,
    },
  };
}
```

---

### 17. Missing Form Labels

**File:** `src/app/[locale]/contact/page.tsx:49-55`

**Problem:** Radio inputs have `id` but labels don't have matching `htmlFor`.

**Fix:** Add `htmlFor` to all labels:
```tsx
<input id="project" type="radio" name="subject" />
<label htmlFor="project">Project Inquiry</label>
```

---

### 18. Non-Semantic Interactive Elements

**Files:**
- `src/components/_/ExperienceDescription.tsx:36` — `<a onClick={...}>`
- `src/app/[locale]/projects/page.tsx:54` — `<span onClick={...}>`

**Fix:** Use `<button>` instead:
```tsx
// Before
<a onClick={onClear}>X</a>

// After
<button onClick={onClear} aria-label="Clear">X</button>
```

---

### 19. `shadcn` as Runtime Dependency

**File:** `package.json`

**Problem:** `shadcn` listed in dependencies but it's a CLI tool.

**Fix:** Move to devDependencies:
```bash
pnpm remove shadcn && pnpm add -D shadcn
```

---

## P2 — Medium Priority

### 20. Custom Regex Markdown Parser

**File:** `src/components/blog/MarkdownRenderer.tsx`

**Problem:** Custom regex-based markdown parser is fragile and unsafe.

**Fix:** Replace with `remark` + `remark-html` (see P0 #1).

---

### 21. Inline Styles

**Files:** Multiple files use inline `style={{...}}`

**Fix:** Where possible, use Tailwind classes:
```tsx
// Before
style={{ visibility: "hidden" }}

// After  
className="invisible"
```

---

### 22. JSX Icon Files Without TypeScript

**Files:** `HeroIcons.jsx`, `HandyArrows.jsx`, `FlagIcons.jsx`

**Fix:** Rename to `.tsx` and add proper types:
```tsx
interface IconProps {
  className?: string;
  color?: string;
}

export function ArrowLeft({ className, color }: IconProps) {
  // ...
}
```

---

### 23. No E2E Tests

**Fix:** Install Playwright and add critical path tests (per testing-strategy plan).

---

### 24. `autoprefixer` May Be Redundant

**Problem:** Tailwind CSS v4 handles autoprefixing internally.

**Fix:**
```bash
pnpm remove autoprefixer
```

---

### 25. Hardcoded `<title>` Tag

**File:** `src/app/layout.tsx:47`

**Problem:** `<title>KeepTrain</title>` in `<head>` conflicts with Metadata API.

**Fix:** Remove the hardcoded `<title>` tag. Use metadata API instead:
```tsx
export const metadata: Metadata = {
  title: "KeepTrain | Gilang",
  // ...
};
```

---

## Implementation Order

### Phase 1 — Critical Fixes (Day 1)
1. Delete 16 orphaned files
2. Fix undefined CSS classes
3. Add missing i18n keys
4. Add OG images
5. Create middleware.ts
6. Fix duplicate CSS in globals.css
7. Replace MarkdownRenderer with remark
8. Fix hardcoded project data

### Phase 2 — High Priority (Day 2-3)
9. Make BlogContent server-rendered
10. Fix loading="eager" on thumbnails
11. Fix duplicate translation logic
12. Add serif font OR replace font-serif
13. Fix heading hierarchy
14. Remove PII logging
15. Install @tailwindcss/typography
16. Add per-blog-post metadata
17. Fix form labels
18. Fix non-semantic interactive elements
19. Move shadcn to devDependencies

### Phase 3 — Medium Priority (Day 4-5)
20. Convert JSX icons to TSX
21. Replace inline styles with Tailwind
22. Add E2E tests
23. Remove autoprefixer
24. Remove hardcoded title tag

---

## Dependencies to Add

```bash
pnpm add remark remark-html @tailwindcss/typography
```

## Dependencies to Remove

```bash
pnpm remove autoprefixer shadcn
pnpm add -D shadcn
```

---

*Generated from comprehensive project audit. Total issues: 8 P0, 22 P1, 16 P2.*
