# Landing Page Responsive Tailwind Refactor Plan

> Review & perbaikan className Tailwind agar konsisten, responsif, dan maintainable  
> Last updated: 2026-06-03

---

## 1. Problem Statement

### 1.1 Issues Teridentifikasi

| # | Issue | Contoh | Dampak |
|---|-------|--------|--------|
| 1 | **Class invalid / custom** | `wrap-break-word`, `rounded-4xl`, `font-medium-ex` | Tidak dirender browser, layout patah |
| 2 | **Magic numbers (arbitrary values)** | `md:h-[360px]`, `lg:basis-[45%]`, `md:w-[375px]` | Tidak scalable, sulit maintain |
| 3 | **Breakpoint gap** | Langsung `md:` tanpa `sm:` | Tablet (640-768px) tidak ter-handle |
| 4 | **Fixed height tanpa overflow** | `h-48 md:h-32`, `md:min-h-screen` | Content overflow saat text panjang |
| 5 | **Padding inconsistent** | Hero: `md:px-14`, Footer: `mx-4`, About: no padding | Layout terlihat "berantakan" antar section |
| 6 | **Template literals di className** | `` className={`... ${isOpen ? "scale-100" : "scale-95"}`} `` | Sulit lint, tidak terdeteksi Tailwind IntelliSense |
| 7 | **Missing container wrapper** | Section langsung tanpa `<Container>` | Max-width tidak konsisten |
| 8 | **Aspect ratio hardcoded** | `aspect-[4/3]` tapi size via `fill` + parent fixed | Layout shift potensial |

### 1.2 Current Breakpoint Usage

```
Mobile:  < 640px   (default)
Tablet:  640-768px  (sm:)   ← TIDAK PERNAH DIPAKAI
Desktop: > 768px    (md:, lg:)
```

**Gap:** Tidak ada styling untuk tablet → layout terlalu "mobile" atau terlalu "desktop" di tablet.

---

## 2. Design System & Token

### 2.1 Spacing Scale (Konsisten)

```
Section padding:     py-16 sm:py-20 md:py-24 lg:py-32
Container padding:   px-4  sm:px-6  md:px-8  lg:px-12
Gap (small):         gap-3  sm:gap-4  md:gap-6
Gap (medium):        gap-6  sm:gap-8  md:gap-10 lg:gap-12
Gap (large):         gap-8  sm:gap-12 md:gap-16 lg:gap-24
```

### 2.2 Container Pattern

```tsx
// components/ui/Container.tsx
export function Container({ children, className }) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
```

**Semua section WAJIB wrap dengan `<Container>`** — tidak boleh inline `px-4` masing-masing.

### 2.3 Typography Scale

```
Hero headline:       text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold
Section title:       text-xl  sm:text-2xl  md:text-3xl  font-medium
Body text:           text-sm  sm:text-base md:text-lg   font-normal
Caption/label:       text-xs  sm:text-sm   md:text-sm   font-medium
```

### 2.4 Color Token (Dark Mode)

```
Background primary:  bg-white dark:bg-zinc-950
Background card:     bg-white dark:bg-zinc-900
Text primary:        text-gray-900 dark:text-white
Text secondary:      text-gray-500 dark:text-gray-400
Text muted:          text-gray-400 dark:text-gray-500
Border:              border-gray-200 dark:border-zinc-800
```

---

## 3. Per-File Refactor Plan

### 3.1 Hero.tsx

#### Current Issues
```tsx
// ❌ Invalid class
<p className="... wrap-break-word ...">

// ❌ Magic numbers
<div className="size-40 md:h-[360px] md:w-80">

// ❌ Missing sm: breakpoint
<p className="text-xl ... md:text-5xl">

// ❌ Inconsistent padding
<div className="... md:px-14">

// ❌ Fixed height viewport (mobile browser bar issue)
<section className="... md:h-screen">
```

#### Refactor
```tsx
<section id="hero" className="relative pt-20 sm:pt-24 md:pt-32 lg:pt-40">
  <Container>
    <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
      {/* Left: Text */}
      <div className="order-2 flex flex-col justify-center gap-4 sm:gap-5 md:order-1 md:gap-6">
        {/* Mobile-only badges */}
        <div className="flex flex-wrap gap-2 md:hidden">
          <OpenToWorkBadge />
          <Link href={`/${locale}/contact`} className="...">
            <PaperAirplane className="size-4" />
            {t("hero.reachOut")}
          </Link>
        </div>
        
        <h1 className="text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
          {t("hero.headline")}
        </h1>
      </div>
      
      {/* Right: Image */}
      <div className="order-1 flex justify-center md:order-2 md:justify-end">
        <div className="relative aspect-square w-40 sm:w-48 md:w-72 lg:w-80">
          <Image
            src="/images/photos.png"
            alt="Profile"
            fill
            priority
            sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 288px, 320px"
            className="rounded-3xl bg-white object-cover p-1 shadow-md dark:bg-zinc-800 md:p-2"
          />
        </div>
      </div>
    </div>
    
    {/* Bottom tagline */}
    <div className="mt-12 flex flex-col items-center gap-2 sm:mt-16 md:mt-20">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-medium sm:text-xl md:text-2xl">
          {t("hero.lessIsMore")}
        </h2>
        <MultiStarts className="size-5" />
      </div>
      <Underline className="text-gray-300 dark:text-zinc-700" />
    </div>
  </Container>
</section>
```

#### Perubahan Kunci
| Aspek | Before | After |
|-------|--------|-------|
| Height | `md:h-screen` (fixed) | `pt-*` padding-based (fluid) |
| Image size | `size-40 md:h-[360px] md:w-80` | `aspect-square w-40 sm:w-48 md:w-72 lg:w-80` |
| Text | `text-xl md:text-5xl` | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` |
| Breakpoint | Mobile → Desktop (loncat) | Mobile → Tablet → Desktop |
| Padding | `md:px-14` inline | `<Container>` uniform |

---

### 3.2 About.tsx

#### Current Issues
```tsx
// ❌ Grid tanpa columns definition
<div className="grid grid-rows-1 ... lg:grid-rows-2">

// ❌ Fixed height section
<section className="md:min-h-screen">

// ❌ Missing sm: text
<h1 className="text-xl ... md:text-3xl">

// ❌ No Container wrapper
<SectionContainer>  {/* ini custom, ganti ke Container */}
```

#### Refactor
```tsx
<section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32">
  <Container>
    <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24">
      {/* Experience */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
        <h2 className="text-xl font-medium text-gray-900 sm:text-2xl md:text-3xl dark:text-white">
          {t("about.title")}
        </h2>
        
        <p className="max-w-prose text-center text-sm text-gray-600 sm:text-base md:text-lg dark:text-gray-300">
          {t("about.description").replace("{duration}", duration)}
        </p>
        
        <TechStack />
      </div>
      
      {/* How I Work */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <h2 className="text-xl font-medium text-gray-900 sm:text-2xl md:text-3xl dark:text-white">
          {t("about.howIWork")}
        </h2>
        <HowIWork />
      </div>
    </div>
  </Container>
</section>
```

---

### 3.3 IBuildStuff.tsx

#### Current Issues
```tsx
// ❌ Hardcoded data (harusnya dari JSON per plan sebelumnya)
const projectData = [...]

// ❌ Fixed height container
<div className="flex items-center md:h-screen">

// ❌ Missing sm: breakpoints
<h1 className="text-2xl ... md:text-3xl">

// ❌ Arbitrary padding
className="... md:px-8 md:py-3 ..."
```

#### Refactor
```tsx
<section id="projects-blogs" className="py-16 sm:py-20 md:py-24 lg:py-32">
  <Container>
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
            {t("projects.title")}
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base md:text-lg dark:text-gray-400">
            {t("projects.description")}
          </p>
        </div>
        <FilterLatestButton />
      </div>
      
      {/* Project List */}
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-zinc-800">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {/* CTA */}
      <div className="flex justify-center pt-4">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:px-6 sm:py-3 md:text-base"
        >
          {t("projects.viewMore")}
        </Link>
      </div>
    </div>
  </Container>
</section>
```

---

### 3.4 HowIWork.tsx

#### Current Issues
```tsx
// ❌ Fractional basis (layout unstable)
className="... basis-full md:basis-1/2 lg:basis-[45%]"

// ❌ Absolute positioned controls (overlay risk)
<div className="... md:absolute md:top-0 md:right-0 ...">

// ❌ Min-height arbitrary
className="... min-h-[200px] ... md:min-h-[240px]"

// ❌ Missing sm: text sizes
className="text-lg ... md:text-2xl"
```

#### Refactor
```tsx
// Ganti carousel ke responsive grid untuk stabilitas
// Atau pakai basis yang clean:

<Carousel opts={{ align: "start", loop: true }} className="w-full">
  <CarouselContent className="-ml-3 sm:-ml-4">
    {data.map((item, index) => (
      <CarouselItem
        key={index}
        className="pl-3 basis-full sm:pl-4 sm:basis-1/2 lg:basis-1/3"
      >
        <Card className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 p-5 dark:border-zinc-800 sm:p-6">
          <div>
            <CardTitle className="text-lg font-medium text-gray-900 sm:text-xl dark:text-white">
              {item.title}
            </CardTitle>
            <p className="mt-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
              {item.desc}
            </p>
          </div>
          <span className="mt-6 text-3xl font-bold text-gray-200 dark:text-zinc-800 sm:text-4xl md:text-5xl">
            0{index + 1}
          </span>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  
  {/* Controls: static, tidak absolute */}
  <div className="mt-6 flex justify-center gap-3">
    <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0" />
    <CarouselNext className="relative inset-0 translate-x-0 translate-y-0" />
  </div>
</Carousel>
```

---

### 3.5 Footer.tsx

#### Current Issues
```tsx
// ❌ Fixed height dengan absolute center
<div className="relative mx-4 h-48 md:mx-0 md:h-32">

// ❌ Invalid class
<h2 className="... wrap-break-word ...">

// ❌ Complex absolute positioning
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ...">

// ❌ Image tanpa sizes
<Image src="/signature.svg" fill ... />
```

#### Refactor
```tsx
<footer id="footer" className="bg-white dark:bg-black">
  {/* Contact CTA */}
  <Container className="py-8 sm:py-10 md:py-12">
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:p-8 md:p-10">
      <h2 className="text-center font-serif text-sm text-gray-600 sm:text-left sm:text-base md:text-lg dark:text-gray-300">
        {t("footer.contactCta")}
      </h2>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 underline decoration-wavy hover:text-blue-700 dark:text-blue-400 md:text-base"
      >
        {t("footer.sendMessage")}
        <ArrowUpRight className="size-4" />
      </Link>
    </div>
  </Container>
  
  {/* Footer Bottom */}
  <Container className="py-6 sm:py-8">
    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
      {/* Left: Copyright & Location */}
      <div className="text-center text-sm text-gray-500 sm:text-left dark:text-gray-400">
        <p>&copy; 2026</p>
        <p>{t("footer.basedIn")}</p>
        <p className="text-xs">{jakartaTime}</p>
      </div>
      
      {/* Center: Signature */}
      <div className="relative h-8 w-16 sm:h-10 sm:w-20">
        <Image
          src="/signature.svg"
          alt="Signature"
          fill
          sizes="80px"
          className="object-contain opacity-30 dark:invert"
        />
      </div>
      
      {/* Right: Social + Tools */}
      <div className="flex items-center gap-4 sm:gap-6">
        <SocialLinks />
        <div className="hidden h-5 w-px bg-gray-200 sm:block dark:bg-zinc-800" />
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  </Container>
</footer>
```

---

### 3.6 NavBar.tsx

#### Current Issues
```tsx
// ❌ Template literals di className (sulit lint)
className={`... ${isOpen ? "scale-100" : "scale-95"} ...`}

// ❌ Fixed positioning asimetris
"fixed top-0 right-0 z-10 md:inset-x-0"

// ❌ Custom animation arbitrary
"animate-[headerHideFromPeek_260ms_ease-out_forwards]"

// ❌ Mixing md: with lg: tanpa sm:
"mx-4 ... md:mx-12 lg:mx-28"
```

#### Refactor
```tsx
// Gunakan cn() helper untuk conditional classes
import { cn } from "@/lib/utils";

function buildHeaderClass(phase: HeaderPhase) {
  return cn(
    "fixed inset-x-0 top-0 z-50",
    "bg-white/80 backdrop-blur-md dark:bg-zinc-950/80",
    "transition-all duration-300",
    phase === "hidden" && "-translate-y-full",
    phase === "top" && "translate-y-0",
    phase !== "top" && "mx-4 mt-3 rounded-full shadow-sm sm:mx-6 md:mx-12 lg:mx-20 dark:shadow-none"
  );
}

// Desktop dropdown pakai data-attribute atau state class
<div
  className={cn(
    "absolute right-0 top-0 z-50 w-72 origin-top-right border border-gray-200 bg-white transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-950",
    isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
  )}
>
```

---

## 4. Utility Improvements

### 4.1 cn() Helper — Wajib Digunakan

```tsx
// ❌ JANGAN
className={`flex items-center ${active ? "bg-black" : "bg-white"} ${large ? "p-4" : "p-2"}`}

// ✅ DO
className={cn(
  "flex items-center",
  active ? "bg-black text-white" : "bg-white text-black",
  large ? "p-4" : "p-2"
)}
```

### 4.2 Class Variance Authority (CVA)

```tsx
// components/ui/Button.tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black",
        outline: "border border-gray-300 bg-white hover:bg-gray-50 dark:border-zinc-800 dark:bg-zinc-950",
        ghost: "hover:bg-gray-100 dark:hover:bg-zinc-800",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
```

### 4.3 Aspect Ratio > Fixed Sizes

```tsx
// ❌ JANGAN
<div className="h-20 w-32 md:h-[250px] md:w-[375px]">
  <Image fill ... />
</div>

// ✅ DO
<div className="relative aspect-[3/2] w-full sm:w-48 md:w-72 lg:w-96">
  <Image fill sizes="..." className="object-cover" />
</div>
```

---

## 5. Responsive Checklist

### 5.1 Mobile (< 640px)
- [ ] Touch target minimal 44x44px untuk semua button/link
- [ ] Font size tidak < 14px (bacaan sulit)
- [ ] Padding horizontal `px-4` (16px) minimal
- [ ] Tidak ada horizontal scroll
- [ ] Stack vertically (flex-col / grid-cols-1)

### 5.2 Tablet (640px - 1024px)
- [ ] `sm:` breakpoint digunakan untuk transisi
- [ ] Grid 2 columns (`sm:grid-cols-2`)
- [ ] Font size medium (`sm:text-*`)
- [ ] Padding `sm:px-6` (24px)

### 5.3 Desktop (> 1024px)
- [ ] `lg:` breakpoint untuk refinement
- [ ] Max-width container `max-w-7xl`
- [ ] Spacing lebih longgar (`lg:gap-*`, `lg:py-*`)

---

## 6. Performance CSS

### 6.1 content-visibility untuk Section

```tsx
<section className="content-visibility-auto contain-intrinsic-size-0-500px">
  {/* ... */}
</section>
```

**Kenapa:** Browser skip rendering off-screen sections, improve scroll performance.

### 6.2 contain: layout untuk Card

```tsx
<Card className="contain-layout">
  {/* ... */}
</Card>
```

**Kenapa:** Isolate layout calculation per card, prevent layout thrashing.

---

## 7. Action Items

- [ ] **Buat `<Container>` component** di `components/ui/Container.tsx`
- [ ] **Install & configure** `tailwind-merge` + `clsx` → `cn()` helper (sudah ada, pastikan dipakai)
- [ ] **Refactor Hero.tsx** — hapus invalid classes, add sm: breakpoints, pakai Container
- [ ] **Refactor About.tsx** — hapus fixed heights, ganti grid ke flex stack
- [ ] **Refactor IBuildStuff.tsx** — pindahkan data ke JSON (per plan sebelumnya), pakai Container
- [ ] **Refactor HowIWork.tsx** — hapus absolute positioning, basis clean
- [ ] **Refactor Footer.tsx** — hapus fixed heights & absolute centering
- [ ] **Refactor NavBar.tsx** — pakai `cn()` untuk semua conditional classes
- [ ] **Global search** — cari semua `[]` arbitrary values, ganti ke token bila memungkinkan
- [ ] **Test responsive** — Chrome DevTools: 375px, 768px, 1024px, 1440px
- [ ] **Lighthouse audit** — target: Performance 95+, Accessibility 100

---

## 8. Don'ts

| # | Jangan | Gunakan |
|---|--------|---------|
| 1 | `h-screen` / `min-h-screen` di section | Padding-based spacing (`py-24`) |
| 2 | `wrap-break-word` | `break-words` (Tailwind native) |
| 3 | `rounded-4xl` | `rounded-3xl` atau `rounded-[2rem]` |
| 4 | `font-medium-ex` | `font-semibold` atau `font-bold` |
| 5 | `basis-[45%]` | `basis-1/2` atau `w-1/2` |
| 6 | Template literals di className | `cn()` helper |
| 7 | Arbitrary values `[360px]` | Standard sizes (`size-72`, `w-80`) |
| 8 | `fixed` height untuk card | `aspect-ratio` atau `min-height` |
| 9 | Skip `sm:` breakpoint | Mobile → sm → md → lg |
| 10 | Inline `px-4` per section | `<Container>` wrapper |

---

*Plan ini mengacu pada Vercel React Best Practices: `rendering-content-visibility`, `bundle-barrel-imports`, `server-serialization`.*
