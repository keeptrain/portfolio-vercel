# Component Architecture & Code Splitting Plan

> Modularisasi, separation of concerns, dan DRY  
> Last updated: 2026-06-03

---

## 1. Current Issues

### 1.1 God Components

| File | Lines | Problem |
|------|-------|---------|
| `NavBar.tsx` | 419 | Handles scroll logic, mobile menu, desktop dropdown, active section detection — semua di satu file |
| `Footer.tsx` | 146 | Contact CTA + footer info + social links + theme/lang switcher |
| `HowIWork.tsx` | 80 | Data + carousel + card styling di satu file |

### 1.2 Inline SVG Icons

```tsx
// ❌ 15+ baris SVG inline di setiap file
<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
  <path d="M12 0c-6.626 0-12..." />
</svg>
```

**Dampak:**
- Bundle size meningkat (SVG duplikat)
- Tidak reusable
- Sulit maintain (ubah warna/ukuran = edit semua file)

### 1.3 No Barrel Exports

```tsx
// ❌ Import panjang
import Hero from "@/features/landing/components/Hero";
import About from "@/features/landing/components/About";
import IBuildStuff from "@/features/landing/components/IBuildStuff";

// ✅ Seharusnya
import { Hero, About, IBuildStuff } from "@/features/landing";
```

### 1.4 Client Components Leaking Logic

```tsx
// ❌ Client Component handle data
"use client";
const IBuildStuff = ({ locale }) => {
  const projectData = [...]; // ❌ Hardcoded di client bundle
  // ...
};
```

---

## 2. Target Architecture

### 2.1 Component Categories

```
components/
├── ui/                    # Primitive, reusable, no business logic
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Badge.tsx
│   └── Icon.tsx           # Semua icon via props
├── layout/                # Layout components
│   ├── NavBar/
│   │   ├── index.tsx       # Entry: compose sub-components
│   │   ├── Logo.tsx
│   │   ├── DesktopNav.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ScrollTracker.ts # Hook extracted
│   │   └── constants.ts
│   ├── Footer/
│   │   ├── index.tsx
│   │   ├── ContactCTA.tsx
│   │   ├── FooterInfo.tsx
│   │   └── SocialLinks.tsx
│   └── BottomNav.tsx
├── sections/              # Page section components (composition)
│   ├── HeroSection.tsx    # Compose: Container + Headline + Image
│   ├── AboutSection.tsx
│   ├── ProjectsSection.tsx
│   └── HowIWorkSection.tsx
├── shared/                # Cross-feature components
│   ├── ProjectCard.tsx
│   ├── TechBadge.tsx
│   └── ImageWithFallback.tsx
└── icons/                 # Centralized icons only
    ├── index.ts            # Barrel export
    ├── SocialIcons.tsx
    ├── ArrowIcons.tsx
    └── LogoIcons.tsx
```

### 2.2 Server vs Client Boundary

```
Server Components (default):
├── page.tsx
├── layout.tsx
├── Section wrappers
├── Container
└── Data fetching

Client Components (minimal, labeled):
├── "use client"
├── NavBar (scroll logic)
├── MobileMenu (state)
├── Carousel (embla)
├── FilterBar (URL state)
├── ThemeSwitcher (DOM)
├── LanguageSwitcher (DOM)
└── Form inputs
```

---

## 3. Refactor Steps

### 3.1 Extract Icons to Centralized Module

```tsx
// components/icons/index.ts
export { GitHubIcon } from "./SocialIcons";
export { LinkedInIcon } from "./SocialIcons";
export { ArrowUpIcon, ArrowUpRightIcon } from "./ArrowIcons";
export { PaperAirplaneIcon, DocumentTextIcon } from "./ActionIcons";

// Usage
import { GitHubIcon } from "@/components/icons";
```

**Bundle impact:** Hanya icon yang dipakai yang masuk chunk (tree-shakeable).

### 3.2 Split NavBar into Sub-Components

```tsx
// components/layout/NavBar/index.tsx
import { useScrollPhase } from "./useScrollPhase";
import { useActiveSection } from "./useActiveSection";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

export default function NavBar({ locale }: { locale: string }) {
  const phase = useScrollPhase();
  const activeSection = useActiveSection();
  
  return (
    <header className={getHeaderClasses(phase)}>
      <Container className="flex h-14 items-center justify-between">
        <Logo locale={locale} />
        <DesktopNav locale={locale} activeSection={activeSection} />
        <MobileMenu locale={locale} />
      </Container>
    </header>
  );
}
```

### 3.3 Extract Hooks

```ts
// hooks/useScrollPhase.ts
export type ScrollPhase = "top" | "floating" | "hidden" | "peek";

export function useScrollPhase(): ScrollPhase {
  const [phase, setPhase] = useState<ScrollPhase>("top");
  
  useEffect(() => {
    // logic extracted from NavBar.tsx
  }, []);
  
  return phase;
}
```

```ts
// hooks/useActiveSection.ts
export function useActiveSection(sections: string[]): string {
  const [active, setActive] = useState("");
  
  useEffect(() => {
    // IntersectionObserver logic extracted
  }, [sections]);
  
  return active;
}
```

### 3.4 Create Section Components

```tsx
// components/sections/HeroSection.tsx
import { Container } from "@/components/ui/Container";
import { ProfileImage } from "@/components/shared/ProfileImage";

interface HeroSectionProps {
  headline: string;
  locale: string;
}

export function HeroSection({ headline, locale }: HeroSectionProps) {
  return (
    <section id="hero" className="py-20 sm:py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center gap-4">
            <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
              {headline}
            </h1>
            <HeroCTA locale={locale} />
          </div>
          <div className="flex justify-center md:justify-end">
            <ProfileImage />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

### 3.5 Barrel Exports per Feature

```ts
// features/landing/index.ts
export { HeroSection } from "./components/HeroSection";
export { AboutSection } from "./components/AboutSection";
export { ProjectsSection } from "./components/ProjectsSection";
export { HowIWorkSection } from "./components/HowIWorkSection";

// Usage di page.tsx
import { HeroSection, AboutSection, ProjectsSection } from "@/features/landing";
```

---

## 4. Code Splitting Strategy

### 4.1 Route-Based (Automatic)

```tsx
// next.config.js
module.exports = {
  experimental: {
    // Next.js 16 automatic code splitting by route
  },
};
```

### 4.2 Component-Based (Manual)

```tsx
// Lazy load heavy components
import dynamic from "next/dynamic";

const ProjectGallery = dynamic(
  () => import("@/components/projects/ProjectGallery"),
  { ssr: false, loading: () => <GallerySkeleton /> }
);

const MDXContent = dynamic(
  () => import("@/components/blog/MDXContent"),
  { loading: () => <ContentSkeleton /> }
);
```

### 4.3 Preload Critical Components

```tsx
// components/layout/NavBar/DesktopNav.tsx
import Link from "next/link";

export function DesktopNav({ locale }: { locale: string }) {
  return (
    <nav className="hidden md:flex">
      <Link href={`/${locale}/projects`} prefetch>
        Projects
      </Link>
      <Link href={`/${locale}/blog`} prefetch>
        Blog
      </Link>
    </nav>
  );
}
```

---

## 5. Action Items

- [ ] **Create `components/ui/` primitives**: Button, Card, Container, Badge
- [ ] **Centralize icons**: Pindahkan semua SVG ke `components/icons/`
- [ ] **Split NavBar**: `NavBar/index.tsx`, `DesktopNav.tsx`, `MobileMenu.tsx`, hooks
- [ ] **Split Footer**: `Footer/index.tsx`, `ContactCTA.tsx`, `SocialLinks.tsx`
- [ ] **Create section wrappers**: `features/landing/components/*Section.tsx`
- [ ] **Barrel exports**: `features/landing/index.ts`, `components/icons/index.ts`
- [ ] **Extract hooks**: `useScrollPhase.ts`, `useActiveSection.ts`, `useIsMobile.ts`
- [ ] **Add dynamic imports**: ProjectGallery, MDXContent, heavy modals
- [ ] **Delete dead code**: Cari file/file yang tidak di-import
- [ ] **Bundle audit**: `pnpm analyze` untuk cek chunk sizes

---

*Ref ini mengacu pada Vercel: `bundle-barrel-imports`, `bundle-dynamic-imports`, `server-hoist-static-io`.*
