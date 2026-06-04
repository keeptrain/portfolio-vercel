# Comprehensive Testing Plan — Portfolio Project

> 129 tests across 21 files, covering utilities, components, API routes, hooks  
> Last updated: 2026-06-03

---

## Current State

| Item | Status |
|------|--------|
| Framework | Vitest + jsdom + @testing-library/react ✅ |
| Existing tests | **1 file** — `cn()` only (4 tests) |
| Coverage | ~2% of codebase |

---

## Target Coverage

| Category | Files | Tests | P0 | P1 | P2 |
|----------|-------|-------|----|----|-----|
| Utilities (blog.ts) | 1 | 25 | 16 | 9 | 0 |
| Utilities (i18n) | 4 | 18 | 12 | 6 | 0 |
| Data validation | 1 | 4 | 0 | 2 | 2 |
| Components (UI) | 3 | 12 | 7 | 4 | 1 |
| Components (Blog) | 3 | 17 | 10 | 7 | 0 |
| Components (Other) | 5 | 31 | 15 | 13 | 3 |
| API Routes | 1 | 8 | 4 | 2 | 2 |
| Hooks | 2 | 9 | 5 | 4 | 0 |
| Proxy | 1 | 5 | 3 | 2 | 0 |
| **TOTAL** | **21** | **~129** | **72** | **49** | **8** |

---

## Implementation Order

### Phase 1 — Pure Functions (No Mocking)
1. `src/lib/blog.ts` — 25 tests
2. `src/i18n/getTranslations.ts` + `loadMessages.ts` — 9 tests
3. `src/i18n/locale-detection.ts` — 7 tests
4. `src/app/api/contact/route.ts` — 8 tests

### Phase 2 — Context & Hooks
5. `src/i18n/TranslationContext.tsx` — 5 tests
6. `src/hooks/useInView.ts` — 5 tests
7. `src/hooks/useIsMobile.ts` — 4 tests

### Phase 3 — Simple Components
8. `src/components/ui/Container.tsx` — 5 tests
9. `src/components/ui/Badge.tsx` — 5 tests
10. `src/components/ui/Skeleton.tsx` — 2 tests
11. `src/components/blog/MarkdownRenderer.tsx` — 8 tests

### Phase 4 — Complex Components
12. `src/components/contact/ContactForm.tsx` — 8 tests
13. `src/components/blog/BlogCard.tsx` — 6 tests
14. `src/components/BottomNav.tsx` — 4 tests
15. `src/components/animation/FadeInView.tsx` — 4 tests

### Phase 5 — Integration
16. `src/components/NavBar.tsx` — 7 tests
17. `src/proxy.ts` — 5 tests

---

## Test File Structure

```
src/
├── lib/
│   └── __tests__/
│       ├── utils.test.ts          ✅ exists
│       └── blog.test.ts           ← create
├── i18n/
│   └── __tests__/
│       ├── getTranslations.test.ts
│       ├── loadMessages.test.ts
│       └── locale-detection.test.ts
├── hooks/
│   └── __tests__/
│       ├── useInView.test.ts
│       └── useIsMobile.test.ts
├── components/
│   ├── ui/__tests__/
│   │   ├── Container.test.tsx
│   │   ├── Badge.test.tsx
│   │   └── Skeleton.test.tsx
│   ├── blog/__tests__/
│   │   ├── MarkdownRenderer.test.tsx
│   │   └── BlogCard.test.tsx
│   ├── contact/__tests__/
│   │   └── ContactForm.test.tsx
│   ├── animation/__tests__/
│   │   └── FadeInView.test.tsx
│   └── __tests__/
│       ├── BottomNav.test.tsx
│       └── NavBar.test.tsx
├── app/
│   └── api/contact/__tests__/
│       └── route.test.ts
└── __tests__/
    └── proxy.test.ts
```

---

*Total: 129 tests, 21 test files, ~95% function coverage target.*
