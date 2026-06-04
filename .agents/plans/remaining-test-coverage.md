# Remaining Test Coverage Plan

> Tests for uncovered components, hooks, and utilities  
> Last updated: 2026-06-03

---

## Current Coverage

| Category | Tested | Total | Coverage |
|----------|--------|-------|----------|
| Utilities | 7/7 | 100% | ✅ |
| i18n | 5/5 | 100% | ✅ |
| Hooks | 2/2 | 100% | ✅ |
| UI Components | 3/3 | 100% | ✅ |
| Blog Components | 1/3 | 33% | ⚠️ |
| Landing Components | 0/4 | 0% | ❌ |
| Layout Components | 1/3 | 33% | ⚠️ |
| API Routes | 1/1 | 100% | ✅ |
| Proxy/Middleware | 0/1 | 0% | ❌ |

---

## Tests to Create

### 1. BlogCard — `src/components/blog/__tests__/BlogCard.test.tsx`

**Priority:** P1  
**Mocking:** `useTranslations` via TranslationProvider  
**Est. tests:** 6

| Test | Description |
|------|-------------|
| Renders post title | Check title text appears |
| Renders excerpt | Check excerpt/description appears |
| Renders date | Check formatted date appears |
| Renders featured badge | When `featured: true` |
| No featured badge | When `featured: false` |
| Links to correct URL | Check href contains slug |

---

### 2. NavBar — `src/components/__tests__/NavBar.test.tsx`

**Priority:** P1  
**Mocking:** `usePathname`, `useIsMobile`, `useTranslations`  
**Est. tests:** 7

| Test | Description |
|------|-------------|
| Renders logo on root route | OpenToWorkBadge visible |
| Renders breadcrumb on non-root | ".. / Projects" text |
| Renders nav links on root | About, My Projects links |
| Hides nav links on non-root | No About/My Projects links |
| Menu toggle opens dropdown | Click hamburger → dropdown visible |
| Mobile overlay renders | When isMobile + menu open |
| buildHeaderClass returns correct classes | Unit test for helper |

---

### 3. Footer — `src/components/__tests__/Footer.test.tsx`

**Priority:** P2  
**Mocking:** `useTranslations` via TranslationProvider  
**Est. tests:** 5

| Test | Description |
|------|-------------|
| Renders contact CTA | Text from translations |
| Renders social links | GitHub + LinkedIn links |
| Renders copyright | "© 2026" text |
| Renders back to top link | Arrow up link |
| Renders signature image | Image with alt="logo" |

---

### 4. FadeInView — `src/components/animation/__tests__/FadeInView.test.tsx`

**Priority:** P2  
**Mocking:** IntersectionObserver  
**Est. tests:** 4

| Test | Description |
|------|-------------|
| Renders children | Content visible in DOM |
| Starts with opacity 0 | Initial state |
| Becomes visible when in view | Observer callback triggers |
| Applies delay | transitionDelay style |

---

### 5. proxy.ts — `src/__tests__/proxy.test.ts`

**Priority:** P1  
**Mocking:** `NextRequest`, `NextResponse`  
**Est. tests:** 5

| Test | Description |
|------|-------------|
| Passes through with locale | `/en/path` → NextResponse.next() |
| Redirects without locale | `/path` → redirect to `/en/path` |
| Indonesian redirect | Accept-Language: id → `/id/path` |
| Preserves search params | `/path?q=test` → `/en/path?q=test` |
| Skips internal paths | `/_next/static` → no redirect |

---

### 6. Section Components — `src/features/landing/__tests__/`

**Priority:** P2  
**Mocking:** `getTranslations`  
**Est. tests:** 9 (3 per component)

| Component | Tests |
|-----------|-------|
| Hero | Renders headline, renders profile image, renders "Less is More" |
| About | Renders title, renders description, renders TechStack |
| IBuildStuff | Renders title, renders project cards, renders "View more" link |

---

## Summary

| File | Tests | Priority |
|------|-------|----------|
| BlogCard.test.tsx | 6 | P1 |
| NavBar.test.tsx | 7 | P1 |
| proxy.test.ts | 5 | P1 |
| Footer.test.tsx | 5 | P2 |
| FadeInView.test.tsx | 4 | P2 |
| Hero.test.tsx | 3 | P2 |
| About.test.tsx | 3 | P2 |
| IBuildStuff.test.tsx | 3 | P2 |
| **Total** | **36** | |

---

## Execution Order

1. **BlogCard** — Simple, no complex mocking
2. **proxy.ts** — Pure function, needs NextRequest mock
3. **NavBar** — Complex, needs multiple mocks
4. **Footer** — Medium complexity
5. **FadeInView** — Needs IntersectionObserver mock
6. **Section components** — Simple presentational tests

---

*Target: 112 + 36 = 148 total tests, ~85% function coverage*
