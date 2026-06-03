# Animation & Micro-interactions Plan

> Delightful, purposeful, performant animations  
> Last updated: 2026-06-03

---

## 1. Philosophy

> "Animation should guide, not distract. Every motion has a purpose."

- **Purposeful**: Animasi membantu user memahami hierarchy, state change, dan flow
- **Subtle**: Tidak mencolok, tidak mengganggu
- **Performant**: Hanya animate `transform` dan `opacity` (GPU accelerated)
- **Respectful**: `prefers-reduced-motion` selalu di-honor

---

## 2. Current State

### 2.1 Existing Animations

| Element | Current | Issue |
|---------|---------|-------|
| NavBar scroll hide/show | `animate-[headerHideFromPeek_260ms_ease-out_forwards]` | Custom arbitrary keyframes, tidak reusable |
| Mobile menu | `transition-opacity duration-200` | Kurang smooth, hanya opacity |
| Carousel | Embla built-in | OK, tapi heavy bundle |
| Image hover | `transition-transform group-hover:scale-105` | ✅ Sudah bagus |
| Theme switch | Instant | No transition, jarring |
| Language switch | Instant page reload | No transition feedback |

### 2.2 Missing Animations

| Interaction | Missing |
|-------------|---------|
| Page transitions | None — hard cut |
| Section entrance | None — content appears instantly |
| Button interactions | No press/hover feedback |
| Card hover | Only image scale, no lift/shadow |
| Loading states | No skeleton atau progress |
| Scroll indicator | None — user doesn't know there's more content |
| Success/error feedback | None on form submit |

---

## 3. Animation System

### 3.1 Design Tokens

```css
/* globals.css */
@layer base {
  :root {
    /* Duration */
    --duration-instant: 0ms;
    --duration-fast: 150ms;
    --duration-normal: 250ms;
    --duration-slow: 350ms;
    --duration-page: 500ms;
    
    /* Easing */
    --ease-default: cubic-bezier(0.4, 0, 0.2, 1);      /* Tailwind default */
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy */
    
    /* Stagger */
    --stagger-fast: 50ms;
    --stagger-normal: 100ms;
    --stagger-slow: 150ms;
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
    --duration-page: 0ms;
  }
}
```

### 3.2 Utility Classes

```css
/* globals.css */
@layer utilities {
  .animate-fade-in {
    animation: fadeIn var(--duration-normal) var(--ease-out) forwards;
  }
  
  .animate-fade-up {
    animation: fadeUp var(--duration-normal) var(--ease-out) forwards;
  }
  
  .animate-fade-scale {
    animation: fadeScale var(--duration-normal) var(--ease-out) forwards;
  }
  
  .animate-slide-in-right {
    animation: slideInRight var(--duration-normal) var(--ease-out) forwards;
  }
  
  .animate-slide-in-bottom {
    animation: slideInBottom var(--duration-normal) var(--ease-out) forwards;
  }
  
  .animate-shake {
    animation: shake var(--duration-normal) var(--ease-default);
  }
  
  .animate-pulse-subtle {
    animation: pulseSubtle 2s var(--ease-default) infinite;
  }
  
  /* Stagger delays */
  .stagger-1 { animation-delay: calc(var(--stagger-normal) * 1); }
  .stagger-2 { animation-delay: calc(var(--stagger-normal) * 2); }
  .stagger-3 { animation-delay: calc(var(--stagger-normal) * 3); }
  .stagger-4 { animation-delay: calc(var(--stagger-normal) * 4); }
  .stagger-5 { animation-delay: calc(var(--stagger-normal) * 5); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInBottom {
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes pulseSubtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## 4. Component Animations

### 4.1 Page Transitions (Next.js App Router)

```tsx
// components/animation/PageTransition.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Alternatif tanpa Framer Motion (lighter):**

```tsx
// components/animation/PageTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);
  
  return (
    <div
      className={`transition-all duration-300 ${
        isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
```

### 4.2 Scroll-Triggered Section Reveal

```tsx
// components/animation/FadeInView.tsx
"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeInView({ children, delay = 0, direction = "up" }) {
  const { ref, isInView } = useInView({ margin: "-100px", once: true });
  
  const transforms = {
    up: "translateY(30px)",
    down: "translateY(-30px)",
    left: "translateX(30px)",
    right: "translateX(-30px)",
  };
  
  return (
    <div
      ref={ref}
      className="transition-all duration-500 ease-out"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translate(0)" : transforms[direction],
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Usage in section
<section id="about">
  <FadeInView>
    <h2>About</h2>
  </FadeInView>
  <FadeInView delay={100}>
    <p>Description...</p>
  </FadeInView>
  <FadeInView delay={200}>
    <TechStack />
  </FadeInView>
</section>
```

### 4.3 Button Micro-interactions

```tsx
// components/ui/Button.tsx
export function Button({ children, variant = "primary", ...props }) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full font-medium",
        "transition-all duration-200 ease-out",
        "active:scale-95",           // Press feedback
        "hover:shadow-md",           // Lift on hover
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" && "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black",
        variant === "outline" && "border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 4.4 Card Hover Animation

```tsx
// components/projects/ProjectCard.tsx
export function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group">
      <div className="overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 transition-colors duration-300 group-hover:bg-gray-50 dark:group-hover:bg-zinc-800">
          <h3 className="font-medium">{project.title}</h3>
          <div className="mt-2 flex gap-2">
            {project.stack.slice(0, 3).map(tech => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

### 4.5 Theme Transition

```tsx
// contexts/ThemeContext.tsx
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");
  
  useEffect(() => {
    // Add transition class before theme change
    document.documentElement.classList.add("theme-transition");
    
    // Apply theme
    applyTheme(theme);
    
    // Remove transition class after animation
    const timer = setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);
    
    return () => clearTimeout(timer);
  }, [theme]);
  
  return (...);
}

/* globals.css */
html.theme-transition,
html.theme-transition * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
}
```

### 4.6 Loading Skeleton

```tsx
// components/ui/Skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-gray-200 dark:bg-zinc-800",
        className
      )}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[4/3] w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
```

### 4.7 Scroll Indicator

```tsx
// components/ui/ScrollIndicator.tsx
"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="h-6 w-4 rounded-full border-2 border-gray-400 p-1">
        <div className="h-2 w-full rounded-full bg-gray-400" />
      </div>
    </motion.div>
  );
}
```

---

## 5. Performance Rules

### 5.1 GPU-Accelerated Properties Only

```css
/* ✅ DO animate */
transform: translateX(), translateY(), scale(), rotate();
opacity: 0 to 1;

/* ❌ DON'T animate (causes layout/paint) */
width, height;
top, left, right, bottom;
margin, padding;
font-size;
border-width;
```

### 5.2 will-change (Use Sparingly)

```css
/* Only apply to elements that are actively animating */
.animating {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animation-complete {
  will-change: auto;
}
```

### 5.3 contain: layout for Animation Containers

```css
.animated-card {
  contain: layout style;
}
```

### 5.4 prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"  // Optional — for complex sequences
  }
}
```

**Note:** Untuk use case kita, CSS transitions + keyframes sudah cukup. Framer Motion hanya untuk page transitions kompleks atau gesture-based animations.

---

## 7. Action Items

- [ ] **Create animation CSS**: `globals.css` dengan keyframes dan utilities
- [ ] **Create FadeInView component**: IntersectionObserver-based reveal
- [ ] **Page transition wrapper**: Di layout atau page wrapper
- [ ] **Button micro-interactions**: `active:scale-95`, `hover:shadow-md`
- [ ] **Card hover**: `-translate-y-1` + `shadow-xl` + image scale
- [ ] **Theme transition**: `theme-transition` class pada HTML
- [ ] **Loading skeletons**: `Skeleton` component + variants
- [ ] **Scroll indicator**: Di hero section bottom
- [ ] **Stagger children**: `FadeInView` dengan delay prop
- [ ] **prefers-reduced-motion**: Global media query disable
- [ ] **Test performance**: Chrome DevTools → Performance → record animation

---

*Target: 60fps animations, no layout thrashing, respectful of user preferences.*
