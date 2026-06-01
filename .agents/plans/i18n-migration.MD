# i18n Migration: Context to Pathname

## Summary

Replace the current LanguageContext (client-side toggle, single URL per page) with pathname-based i18n routing (`/en/...`, `/id/...`). Each locale gets its own URL, enabling per-locale SEO metadata, hreflang tags, and static generation.

## Files Affected

| Action | File |
|--------|------|
| Create | `src/i18n/messages/en.json` |
| Create | `src/i18n/messages/id.json` |
| Create | `src/i18n/locales.ts` |
| Create | `src/i18n/getTranslations.ts` |
| Create | `src/middleware.ts` |
| Create | `src/app/[locale]/layout.tsx` |
| Create | `src/app/[locale]/page.tsx` |
| Create | `src/app/[locale]/projects/page.tsx` |
| Create | `src/app/[locale]/projects/layout.tsx` |
| Create | `src/app/[locale]/contact/page.tsx` |
| Create | `src/app/[locale]/blog/page.tsx` |
| Create | `src/app/[locale]/blog/[slug]/page.tsx` |
| Create | `src/app/sitemap.ts` |
| Create | `src/app/robots.ts` |
| Modify | `src/app/layout.tsx` |
| Modify | `src/app/page.tsx` |
| Modify | `src/components/NavBar.tsx` |
| Modify | `src/components/ui/button/LanguageSwitcher.tsx` |
| Delete | `src/contexts/LanguageContext.tsx` |
| Modify | All components using `useLanguage()` or `t()` |

## Steps

### Step 1: Extract Translations
- Copy all key-value pairs from `src/contexts/LanguageContext.tsx` translations object
- Create `src/i18n/messages/en.json` (English keys)
- Create `src/i18n/messages/id.json` (Indonesian keys)
- Keep the same nested key structure

### Step 2: Locale Config
Create `src/i18n/locales.ts`:
```ts
export const locales = ["en", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
```

### Step 3: Server-Side Translation Loader
Create `src/i18n/getTranslations.ts`:
- Accept `locale: Locale` parameter
- Dynamically import the correct JSON file
- Return a `t(key: string): string` function
- Support nested key lookup (e.g., `t("nav.about")`)

### Step 4: Middleware
Create `src/middleware.ts`:
- Match request pathname against supported locales
- If pathname has locale prefix, continue
- If no locale prefix, detect from `Accept-Language` header
- Fallback to `defaultLocale`
- Rewrite or redirect to `/<locale>/...`

### Step 5: `[locale]` Page Structure
- Create `src/app/[locale]/layout.tsx`:
  - Receive `params.locale`
  - Set `html lang` attribute dynamically
  - Reuse existing layout logic (ThemeProvider, NavBar, Footer)
  - Pass locale down via props or React context (NOT the old LanguageProvider)
- Create `src/app/[locale]/page.tsx` (landing page re-export from LandingPage)
- Create `src/app/[locale]/projects/layout.tsx` and `page.tsx`
- Create `src/app/[locale]/contact/page.tsx`
- Create `src/app/[locale]/blog/page.tsx` and `blog/[slug]/page.tsx`

### Step 6: Root Route Handling
- Modify `src/app/layout.tsx`: strip LanguageProvider, become a thin pass-through that handles locale-less paths
- Modify `src/app/page.tsx`: redirect to `/<defaultLocale>`

### Step 7: Update Components
- `NavBar.tsx`: generate links with locale prefix (`/<locale>/#about`)
- `LanguageSwitcher.tsx`: navigate to other locale version of current path (not toggle state)
- All components consuming `useLanguage()`: refactor to receive translations via props from server component

### Step 8: SEO (generateMetadata)
- Add `generateMetadata({ params })` to every page in `[locale]`
- Include `alternates.languages` with both locale URLs
- Include per-locale `openGraph.locale`
- Use translation keys for title and description

### Step 9: Static SEO Files
- Create `src/app/sitemap.ts`: generate sitemap entries for all locales
- Create `src/app/robots.ts`: point to sitemap

### Step 10: Cleanup
- Remove `<LanguageProvider>` from `src/app/layout.tsx`
- Delete `src/contexts/LanguageContext.tsx`
- Remove all `useLanguage()` and `t()` imports from components
- Verify no remaining client-side translation logic

## Edge Cases

- **Direct URL access** without locale prefix: redirect to detected locale
- **Unsupported locale in URL**: redirect to default locale
- **Language switcher on nested pages**: preserve pathname, swap locale prefix
- **Bookmarked URLs**: must still work after migration (redirect from old paths)
- **Blog slugs**: same slug works in both locales (content is bilingual per post)
- **LocalStorage cleanup**: remove old "language" key (no longer relevant)

## Testing Plan

- Middleware: test locale detection, redirect, fallback behavior
- Routing: verify all `/en/...` and `/id/...` pages render correctly
- generateMetadata: test output per locale per page
- Translation coverage: script to verify all keys exist in both JSON files
- Language switcher: verify navigation preserves current path segment
- Old URL redirects: `/projects` should redirect to `/<locale>/projects`
