# Global Project Plan -- KeepTrain Portfolio

## Project Purpose

Personal portfolio website to showcase skills, projects, and experience as a Software Engineer. Designed as both a personal branding tool and a learning sandbox for modern Next.js patterns.

### Goals
- Demonstrate technical skills to potential employers and collaborators
- Serve bilingual audience (English and Indonesian)
- Maintain minimalist aesthetic ("Less is More")
- Keep all content static -- no external APIs, no database

---

## Tech Stack

| Tech | Decision |
|------|----------|
| Next.js 15 (App Router) | RSC, server-first rendering, file-based routing |
| TypeScript | Type safety and better DX |
| Tailwind CSS v4 | Utility-first, fast iteration |
| shadcn/ui | Accessible components, copy-paste ownership, no dependency lock-in |
| pnpm | Faster and more disk-efficient than npm |
| No `next-intl` | Lightweight custom i18n via middleware and static JSON files |

---

## Conventions

### Mandatory
- Every visible text string must come from translation files (no hardcoded strings)
- Dark mode must work on every page (system / light / dark)
- Mobile-first design on every page
- Pathname-based i18n routing -- locale determined by URL prefix (`/en/...`, `/id/...`), not context toggle
- Every new feature: write a plan in `.agents/plans/<feature>.md` before building

### Prohibited
- Inline hardcoded strings in JSX (use translation keys)
- External API calls (all data is static)
- Direct DOM manipulation (use React patterns)
- Skipping SEO metadata on any page

---

## i18n Architecture

### URL Structure
```
/                       -> redirect to /<default-locale>
/en                     -> English landing page
/en/projects            -> English projects page
/en/contact             -> English contact page
/en/blog                -> English blog listing
/en/blog/my-first-post  -> English blog post
/id                     -> Indonesian landing page
/id/projects            -> Indonesian projects page (same path, translated content)
/id/contact             -> Indonesian contact page
/id/blog                -> Indonesian blog listing
/id/blog/my-first-post  -> Indonesian blog post
```

### Detection Flow (Middleware)
1. Check if URL already has locale prefix (`/en/...` or `/id/...`)
2. If yes, proceed normally
3. If no, detect from `Accept-Language` header or cookie
4. Redirect to `/<detected-locale>/...`

### File Structure
```
src/app/[locale]/           all pages live here
  layout.tsx                root layout, receives params.locale
  page.tsx                  landing page
  projects/page.tsx
  contact/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
src/app/layout.tsx          thin root -- only locale detection, redirect to /<locale>
src/app/page.tsx            redirect to default locale
src/middleware.ts            locale detection logic
src/i18n/
  messages/en.json          extracted from LanguageContext
  messages/id.json
  locales.ts                config: supported locales, default locale
  getTranslations.ts        server-side: load translations for current locale
```

### Translation File Format
```json
{
  "nav": { "about": "About", "projects": "My Projects", "contact": "Contact" },
  "hero": { "greeting": "Hi, I'm", "role": "Software Engineer" },
  "projects": { "title": "Projects" },
  "contact": { "title": "Get in Touch" },
  "footer": { "tagline": "", "copyright": "" },
  "blog": { "title": "Blog", "readMore": "Read more" }
}
```

### Language Switcher
Not a context toggle anymore. A link/button that navigates to the same page under the other locale prefix:
```
/en/about  -> switches to  /id/about
/id/about  -> switches to  /en/about
```

---

## SEO Strategy

### Per-page Metadata (generateMetadata)
Each page exports `generateMetadata({ params })` that uses `params.locale` to return locale-aware metadata.

```ts
// Example for /[locale]/projects/page.tsx
export async function generateMetadata({ params }: Props) {
  const t = await getTranslations(params.locale);
  return {
    title: t("projects.title"),
    description: t("projects.description"),
    alternates: {
      languages: {
        en: "/en/projects",
        id: "/id/projects",
      },
    },
    openGraph: { locale: params.locale === "id" ? "id_ID" : "en_US" },
    twitter: { card: "summary_large_image" },
  };
}
```

### Required for Every Page
- `title` and `description` from translations
- `alternates.languages` (hreflang)
- `openGraph` (title, description, locale, type, optionally image)
- `twitter` (card type, title, description)
- `robots` (index, follow)

### Static Files
- `sitemap.xml` per locale (or combined with hreflang)
- `robots.txt` (point to sitemap)
- Both auto-generated at build time or via `app/sitemap.ts` and `app/robots.ts`

### Structured Data
- JSON-LD `Person` schema on landing page
- JSON-LD `BreadcrumbList` on nested pages

### HTML
- `<html lang>` must reflect current locale (dynamic from layout)

---

## Testing

### Stack
- Vitest (fast, native ESM, Next.js compatible)
- React Testing Library (component behavior testing)
- Playwright (E2E for routing, i18n, SEO)

### What Must Be Tested
- Locale detection and redirect in middleware
- generateMetadata output per locale per page
- Translation coverage (no missing keys in either locale)
- Language switcher navigation preserves current path
- NavBar scroll behavior and mobile menu toggle

### What Does Not Need Testing
- Visual snapshots (flaky, low value for static portfolio)
- Simple presentational components without logic


