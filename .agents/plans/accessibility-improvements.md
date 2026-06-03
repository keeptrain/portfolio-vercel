# Accessibility (a11y) Improvement Plan

> WCAG 2.1 AA compliance, keyboard navigation, screen reader support  
> Last updated: 2026-06-03

---

## 1. Current Issues

### 1.1 Keyboard Navigation

| Element | Issue |
|---------|-------|
| Mobile hamburger menu | Tidak ada `Escape` key handler untuk close |
| Filter buttons | Tidak ada visual focus indicator |
| Carousel controls | Focus trap tidak ada saat modal open |
| Language switcher | Tidak keyboard accessible (hanya click) |

### 1.2 Screen Reader

| Issue | Contoh |
|-------|--------|
| Icon-only buttons | `<button>` dengan hanya SVG, tanpa `aria-label` |
| Decorative images | Tidak ada `alt=""` atau `role="presentation"` |
| Missing landmarks | `<main>`, `<nav>`, `<aside>` tidak konsisten |
| Form errors | Tidak ada `aria-describedby` atau `aria-invalid` |
| Live regions | Toast/notifikasi tidak diumumkan ke screen reader |

### 1.3 Color & Contrast

| Element | Ratio (estimated) | Target |
|---------|------------------|--------|
| `text-gray-400` on white | ~3.0:1 | 4.5:1 |
| `text-zinc-500` dark mode | ~3.5:1 | 4.5:1 |
| Link underline (hover) | Tidak ada (hanya color change) | Underline OR 3:1 contrast |

---

## 2. Implementation Plan

### 2.1 Semantic HTML

```tsx
// ❌ Before
<div className="...">
  <div className="text-xl">Projects</div>
  <div onClick={...}>Learn More</div>
</div>

// ✅ After
<main>
  <h1>Projects</h1>
  <button onClick={...}>Learn More</button>
</main>
```

**Checklist landmarks:**
- [ ] `<header>` untuk NavBar
- [ ] `<main>` untuk page content (sudah ada di beberapa, pastikan semua)
- [ ] `<footer>` untuk Footer (sudah ada)
- [ ] `<nav>` untuk navigation links (desktop + mobile)
- [ ] `<aside>` untuk sidebar/filter (jika ada)
- [ ] `<article>` untuk blog posts, project cards

### 2.2 Focus Management

```tsx
// components/layout/NavBar/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";

export function MobileMenu({ isOpen, onClose, children }) {
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    // Trap focus inside menu
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      
      if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
        e.preventDefault();
        lastFocusableRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
        e.preventDefault();
        firstFocusableRef.current?.focus();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEscape);
    firstFocusableRef.current?.focus();
    
    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button ref={firstFocusableRef} aria-label="Close menu" onClick={onClose}>
        <XIcon />
      </button>
      <nav>{children}</nav>
      {/* Hidden last focusable element */}
      <a ref={lastFocusableRef} href="#" tabIndex={-1} aria-hidden="true" />
    </div>
  );
}
```

### 2.3 Skip Links

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        
        <NavBar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### 2.4 Icon Buttons with ARIA

```tsx
// ❌ Before
<button className="p-2">
  <svg>...</svg>  {/* No label! */}
</button>

// ✅ After
<button
  aria-label="Toggle navigation menu"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {isOpen ? <CloseIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
</button>
```

### 2.5 Image Accessibility

```tsx
// Decorative image (no meaning)
<Image
  src="/signature.svg"
  alt=""
  role="presentation"
  ...
/>

// Informative image
<Image
  src="/images/photos.png"
  alt="Portrait of Gilang, a software engineer"
  ...
/>

// Complex image (chart/diagram)
<figure>
  <Image src="/diagram.png" alt="System architecture diagram" />
  <figcaption>Figure 1: High-level system architecture</figcaption>
</figure>
```

### 2.6 Reduced Motion Support

```tsx
// globals.css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// Atau pakai Tailwind
transition-all motion-reduce:transition-none
```

### 2.7 Color Contrast Fixes

```tsx
// ❌ Before
<p className="text-gray-400">Secondary text</p>  // ~3.0:1

// ✅ After
<p className="text-gray-500">Secondary text</p>   // ~4.6:1

// ❌ Before
<a className="text-blue-300 hover:text-blue-400">Link</a>  // ~2.8:1

// ✅ After
<a className="text-blue-600 underline hover:text-blue-700">Link</a>  // ~5.2:1
```

**Color token audit:**
```css
/* Custom tokens dengan guaranteed contrast */
:root {
  --text-primary: #111827;    /* gray-900, 15.3:1 on white */
  --text-secondary: #6B7280;  /* gray-500, 6.6:1 on white */
  --text-muted: #9CA3AF;      /* gray-400, 3.7:1 — HANYA untuk decorative */
  --text-link: #2563EB;       /* blue-600, 5.2:1 on white */
}
```

---

## 3. Testing Checklist

### 3.1 Automated

- [ ] **axe-core** via jest-axe untuk unit tests
- [ ] **Lighthouse accessibility audit** target 100
- [ ] **WAVE browser extension** untuk manual spot-check
- [ ] **Pa11y** untuk CI/CD accessibility testing

### 3.2 Manual

- [ ] Tab melalui seluruh page (keyboard only)
- [ ] Test dengan screen reader (VoiceOver / NVDA)
- [ ] Zoom 200%, 400% — pastikan layout tidak patah
- [ ] High contrast mode (Windows / macOS)
- [ ] Reduce motion preference

---

## 4. Action Items

- [ ] **Add skip link** di `app/layout.tsx`
- [ ] **Audit all `<img>`**: Tambah `alt` yang bermakna atau `role="presentation"`
- [ ] **Audit all `<button>` dengan icon**: Tambah `aria-label`, `aria-expanded`, `aria-controls`
- [ ] **Focus trap**: Implementasi di MobileMenu dan modal apa pun
- [ ] **Escape key handler**: MobileMenu, dropdowns, modal
- [ ] **Semantic landmarks**: Pastikan `<header>`, `<main>`, `<nav>`, `<footer>` benar
- [ ] **Heading hierarchy**: `<h1>` → `<h2>` → `<h3>` tidak loncat
- [ ] **Color contrast**: Ganti semua `text-gray-400` yang di atas `bg-white`
- [ ] **Reduced motion**: Add `prefers-reduced-motion` media query
- [ ] **Form labels**: Pastikan semua input punya `<label>` atau `aria-label`
- [ ] **Live regions**: Toast/notifikasi pakai `aria-live="polite"`
- [ ] **E2E a11y tests**: Setup jest-axe untuk component tests

---

## 5. Dependencies

```json
{
  "devDependencies": {
    "jest-axe": "^9.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  }
}
```

---

*Target: WCAG 2.1 AA compliance, Lighthouse Accessibility 100.*
