# Idea: Server-First i18n with `React.cache()`

## Problem Statement

Saat ini project menggunakan **dua metode i18n yang redundan**:

| Metode | Digunakan di | Cara kerja |
|--------|-------------|------------|
| `getTranslations(locale)` + prop `t` | Server Components (LandingPage, BentoHeroSection, Hero, About, BentoProjectCard, BentoLearningCard) | Locale di-pass manual dari `page.tsx` → `LandingPage` → `BentoHeroSection` → child components |
| `TranslationProvider` + `useTranslations()` | Client Components (NavBar, Footer, BottomNav, IBuildStuff, SectionTwo, TechStack, ContactForm) | Seluruh JSON messages di-serialize dari server ke client via React Context |

### Masalah utama:

1. **Prop drilling `t` melelahkan** — Server Components harus menerima `t: (key: string) => string` sebagai props, lalu forward ke semua children. Setiap tambah komponen baru = tambah props.

2. **Duplikasi logic** — `getTranslations()` dan `useTranslations()` punya logic key lookup yang **identik** (nested dot notation traversal), tapi ditulis dua kali.

3. **Payload berlebihan** — `TranslationProvider` mengirim **seluruh** JSON translation ke client bundle. Untuk portfolio ini masih kecil, tapi akan membengkak kalau konten bertambah.

4. **`<html lang>` problem** — Root `layout.tsx` tidak punya akses langsung ke `[locale]` param secara semantik benar (harus await params yang sebenarnya undefined di root layout).

---

## Proposed Solution: `React.cache()` + Server-Only Translation

### Core Idea

Buat fungsi `getLocale()` dan `getT()` yang bisa dipanggil di **server component manapun** tanpa passing props, menggunakan `React.cache()` untuk deduplikasi per-request.

### Architecture

```
[Request masuk: /id/page]
        │
        ▼
┌─────────────────────────┐
│ [locale]/layout.tsx     │  ← setRequestLocale("id")  ← menyimpan ke cache
│                         │
│  ┌──────────────────┐   │
│  │ children (page)  │   │  ← getLocale() → "id" (dari cache, tanpa props)
│  │  ┌────────────┐  │   │
│  │  │ Component  │  │   │  ← getT() → t("key") (dari cache, tanpa props)
│  │  └────────────┘  │   │
│  └──────────────────┘   │
└─────────────────────────┘
```

### Step-by-Step Implementation

---

#### Step 1: Buat `src/i18n/server.ts` — Cached Server-Only Translation

```ts
// src/i18n/server.ts
import "server-only"; // Mencegah import dari client components

import { cache } from "react";
import type { Locale } from "./locales";
import en from "./messages/en.json";
import id from "./messages/id.json";

const messagesMap: Record<string, Record<string, unknown>> = { en, id };

// React.cache() menjamin fungsi ini hanya di-eksekusi SEKALI per HTTP request
// Semua server component yang memanggil getLocale() dalam 1 request
// akan mendapat return value yang SAMA tanpa re-execution
const requestLocale = cache(() => {
  return { current: "en" as Locale };
});

/**
 * Dipanggil SEKALI di [locale]/layout.tsx untuk menyimpan locale ke cache.
 * Ini "menanam" locale ke dalam request context sehingga
 * semua server component turunannya bisa akses tanpa props.
 */
export function setRequestLocale(locale: Locale) {
  requestLocale().current = locale;
}

/**
 * Dipanggil di server component MANAPUN untuk mendapat locale.
 * Tidak perlu props, tidak perlu context — cukup import dan panggil.
 *
 * @example
 * // Di dalam server component:
 * import { getLocale } from "@/i18n/server";
 * const locale = getLocale(); // "en" | "id"
 */
export function getLocale(): Locale {
  return requestLocale().current;
}

/**
 * Mendapatkan fungsi translator `t()` untuk locale saat ini.
 * Menggunakan React.cache() sehingga JSON hanya di-parse SEKALI per request.
 *
 * @example
 * // Di dalam server component:
 * import { getT } from "@/i18n/server";
 * const t = getT();
 * return <h1>{t("hero.title")}</h1>;
 */
export const getT = cache(() => {
  const locale = getLocale();
  const messages = messagesMap[locale] || messagesMap.en;

  return function t(key: string): string {
    const parts = key.split(".");
    let current: unknown = messages;

    for (const part of parts) {
      if (typeof current === "object" && current !== null) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }

    return typeof current === "string" ? current : key;
  };
});
```

#### Mengapa `React.cache()` dan bukan `AsyncLocalStorage`?

| | `React.cache()` | `AsyncLocalStorage` |
|---|---|---|
| Built-in React | ✅ Ya | ❌ Node.js API |
| Request-scoped | ✅ Ya (per React render) | ✅ Ya |
| Works in Edge Runtime | ✅ Ya | ❌ Tidak |
| Zero config | ✅ Ya | Perlu setup manual |
| Next.js recommended | ✅ Ya (docs.next) | Untuk internal saja |

---

#### Step 2: Update `[locale]/layout.tsx` — Set locale sekali

```tsx
// src/app/[locale]/layout.tsx
import { setRequestLocale } from "@/i18n/server";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // ✅ Set locale ke request cache — semua server component di bawah
  //    bisa akses via getLocale() / getT() tanpa props
  setRequestLocale(locale as Locale);

  // TranslationProvider TETAP dipertahankan untuk client components
  const messages = loadMessages(locale as Locale);

  return (
    <TranslationProvider messages={messages} locale={locale}>
      <div className="mb-15"></div>
      {children}
      <Footer />
      <BottomNav locale={locale as Locale} />
    </TranslationProvider>
  );
}
```

---

#### Step 3: Refactor Server Components — Hapus prop drilling

**BEFORE** (prop drilling):
```tsx
// page.tsx → LandingPage → BentoHeroSection → BentoLearningCard
// Setiap level harus terima & forward `t` props

// page.tsx
const { locale } = await params;
return <LandingPage locale={locale as Locale} />;

// LandingPage.tsx
export default function LandingPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  return <BentoHeroSection t={t} locale={locale} />;
}

// BentoHeroSection.tsx
export default function BentoHeroSection({ t, locale }: { t: ...; locale: ... }) {
  return <BentoLearningCard t={t} />;
}

// BentoLearningCard.tsx
export default function BentoLearningCard({ t }: { t: ... }) {
  return <h3>{t("bentoHero.learningTitle")}</h3>;
}
```

**AFTER** (zero-prop):
```tsx
// page.tsx — tidak perlu forward apapun
return <LandingPage />;

// LandingPage.tsx — tidak terima props
import { getT, getLocale } from "@/i18n/server";

export default function LandingPage() {
  return (
    <>
      <BentoHeroSection />
      <SectionTwo />
    </>
  );
}

// BentoHeroSection.tsx — tidak terima props
import { getT, getLocale } from "@/i18n/server";

export default function BentoHeroSection() {
  const t = getT();
  const locale = getLocale();
  return <BentoLearningCard />;
}

// BentoLearningCard.tsx — tidak terima props
import { getT } from "@/i18n/server";

export default function BentoLearningCard({ className }: { className?: string }) {
  const t = getT();
  return <h3>{t("bentoHero.learningTitle")}</h3>;
}
```

---

#### Step 4: Client Components — Tetap pakai `useTranslations()`

Client components (`"use client"`) **TIDAK BISA** menggunakan `React.cache()` karena:
- `React.cache()` hanya berjalan di server render pass
- Client components butuh reactive state

Jadi `TranslationProvider` + `useTranslations()` **TETAP dipertahankan** untuk:

| Component | Alasan harus client |
|-----------|-------------------|
| `NavBar` | `useState` (menu open/close), `usePathname()`, scroll listeners |
| `Footer` | `useTranslations()`, `Intl.DateTimeFormat` |
| `BottomNav` | `usePathname()` untuk active state |
| `IBuildStuff` | Client interactions |
| `SectionTwo` | `useState` (tab switching) |
| `TechStack` | Carousel embla (client) |
| `ContactForm` | `react-hook-form`, `useState` |
| `LanguageSwitcher` | `usePathname()` untuk URL manipulation |

---

#### Step 5: Fix `<html lang>` di Root Layout

**Option A (Recommended): Pindahkan `<html>` ke `[locale]/layout.tsx`**

```tsx
// src/app/layout.tsx — Hanya wrapper minimal tanpa <html>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children; // Langsung forward ke [locale]/layout.tsx
}

// src/app/[locale]/layout.tsx — Punya <html> dengan lang yang benar
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={cn(...)}>
      <body className={`${montserrat.className} bg-accent`}>
        <ThemeProvider>
          <TranslationProvider messages={messages} locale={locale}>
            <main id="main-content">
              {children}
            </main>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Option B: Tetap di root layout tapi gunakan `React.cache()`**
```tsx
// src/app/layout.tsx
import { getLocale } from "@/i18n/server";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale(); // Dari cache, set oleh [locale]/layout.tsx

  return (
    <html lang={locale} ...>
      <body>{children}</body>
    </html>
  );
}
```

> ⚠️ **Problem dengan Option B**: Root layout di-render SEBELUM `[locale]/layout.tsx`, jadi `setRequestLocale()` belum dipanggil saat root layout render. `getLocale()` akan return default "en".

> ✅ **Option A lebih aman**: `<html>` tag di-render di `[locale]/layout.tsx` yang sudah tahu locale dari URL params.

---

## File yang Perlu Diubah

### Server Components — Hapus prop `t` dan `locale`

| File | Perubahan |
|------|-----------|
| `src/i18n/server.ts` | **[NEW]** — `setRequestLocale()`, `getLocale()`, `getT()` |
| `src/app/[locale]/layout.tsx` | Tambah `setRequestLocale()`, pindahkan `<html>` ke sini |
| `src/app/layout.tsx` | Hapus `<html>`, return `children` saja |
| `src/app/[locale]/page.tsx` | Hapus forward `locale` ke `LandingPage` |
| `src/features/landing/LandingPage.tsx` | Hapus props `locale`, panggil `getT()` + `getLocale()` internal |
| `src/features/landing/components/bento/BentoHeroSection.tsx` | Hapus props `t` & `locale`, panggil `getT()` & `getLocale()` |
| `src/features/landing/components/bento/BentoLearningCard.tsx` | Hapus props `t`, panggil `getT()` |
| `src/features/landing/components/bento/BentoProjectCard.tsx` | Hapus props `t` & `locale`, panggil `getT()` & `getLocale()` |
| `src/features/landing/components/bento/BentoIntroCard.tsx` | Hapus props `t` (sudah optional, tinggal hapus) |
| `src/features/landing/components/bento/BentoProfileCard.tsx` | Hapus props `t` (sudah optional, tinggal hapus) |
| `src/features/landing/components/Hero.tsx` | Hapus props `t` & `locale`, panggil `getT()` & `getLocale()` |
| `src/features/landing/components/section-two/About.tsx` | Hapus props `t`, panggil `getT()` |
| `src/i18n/getTranslations.ts` | **[DELETE]** — Sudah digantikan oleh `server.ts` |

### Client Components — Tidak berubah

| File | Status |
|------|--------|
| `src/i18n/TranslationContext.tsx` | ✅ Tetap (dibutuhkan client components) |
| `src/i18n/loadMessages.ts` | ✅ Tetap (dibutuhkan TranslationProvider) |
| `src/components/NavBar.tsx` | ✅ Tetap pakai `useTranslations()` |
| `src/components/Footer.tsx` | ✅ Tetap pakai `useTranslations()` |
| `src/components/BottomNav.tsx` | ✅ Tetap pakai `useTranslations()` |
| `src/features/landing/components/IBuildStuff.tsx` | ✅ Tetap pakai `useTranslations()` |
| `src/features/landing/components/SectionTwo.tsx` | ✅ Tetap pakai `useTranslations()` |
| `src/components/contact/ContactForm.tsx` | ✅ Tetap pakai `useTranslations()` |

---

## Dampak Performa

| Metrik | Sebelum | Sesudah |
|--------|---------|---------|
| Props chain depth | 4 level (`page → Landing → BentoHero → Card`) | 0 level |
| JSON parse per request | 2× (server + client) | 1× server (di-cache) + 1× client (Context) |
| Client bundle size | Seluruh `en.json`/`id.json` | Tetap sama (client components masih butuh) |
| Developer experience | Harus ingat forward `t` & `locale` di setiap komponen baru | Cukup `import { getT } from "@/i18n/server"` |
| Type safety | `t: (key: string) => string` (lemah) | Bisa ditingkatkan ke typed keys nanti |

---

## Catatan Tambahan

### Mengapa tidak 100% server-only?

Beberapa komponen **harus** tetap client karena menggunakan:
- `useState` / `useEffect` — React hooks yang hanya jalan di client
- `usePathname()` — Next.js hook untuk membaca URL di client
- `IntersectionObserver` / scroll listeners — Browser APIs
- `react-hook-form` — Form library yang butuh client state

Jadi arsitektur **hybrid** (server `getT()` + client `useTranslations()`) adalah solusi paling pragmatis.

### Future Enhancement: Typed Translation Keys

Setelah migrasi ini selesai, bisa ditambahkan type safety:

```ts
// Otomatis generate type dari en.json structure
type TranslationKeys = "hero.title" | "hero.description" | "nav.home" | ...;

export function getT(): (key: TranslationKeys) => string;
```

Ini akan memberikan autocomplete dan compile-time error kalau typo translation key.
