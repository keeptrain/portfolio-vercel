# Issue #04: Migrasi Server Components — Hapus Prop Drilling `t` dan `locale`

## 1. Ringkasan Tugas

Mengubah seluruh **server component** yang saat ini menerima `t: (key: string) => string` dan/atau `locale: Locale` sebagai props agar menggunakan `getT()` dan `getLocale()` dari `src/i18n/server.ts` secara langsung. Setelah issue ini selesai, **tidak ada lagi server component yang membutuhkan props `t` atau `locale`** — setiap komponen cukup import dan panggil fungsi cached sendiri.

Issue ini **wajib dikerjakan setelah Issue #02 dan #03 selesai** karena bergantung pada `setRequestLocale()` yang dipanggil di locale layout.

---

## 2. Sasaran & Ruang Lingkup

- **Tujuan**: Menghilangkan semua prop drilling `t` dan `locale` di server component tree.
- **Framework & Tooling**: Next.js (App Router), TypeScript.
- **Jumlah File yang Diubah**: 8 file.
- **Prasyarat**: Issue #02 (file `server.ts` ada) dan Issue #03 (`setRequestLocale()` dipanggil di layout).
- **Prinsip Utama**: Setiap server component yang butuh terjemahan cukup `import { getT } from "@/i18n/server"` lalu panggil `const t = getT()` di dalam body fungsinya.
- **PENTING**: Issue ini **TIDAK mengubah client component** (`"use client"`) sama sekali. Client component tetap pakai `useTranslations()` dari `TranslationContext`.

---

## 3. Daftar File yang Harus Diubah

Ubah file-file berikut **secara berurutan dari atas ke bawah** (parent dulu, baru children):

### A. `src/app/[locale]/page.tsx`
- **Kondisi saat ini**: Membaca `params.locale` lalu forward ke `<LandingPage locale={...} />`.
- **Perubahan**: Hapus forward prop `locale` ke LandingPage. Cukup render `<LandingPage />` tanpa props.
- **Alasan**: LandingPage akan mengambil locale sendiri via `getLocale()`.

### B. `src/features/landing/LandingPage.tsx`
- **Kondisi saat ini**: Menerima props `{ locale: Locale }`, memanggil `getTranslations(locale)` untuk mendapatkan `t`, lalu forward `t` dan `locale` ke `<BentoHeroSection t={t} locale={locale} />`.
- **Perubahan**:
  - Hapus interface `LandingPageProps` dan prop `locale`.
  - Hapus import `getTranslations` dan `Locale`.
  - Render `<BentoHeroSection />` tanpa props `t` atau `locale`.
  - Jika komponen ini perlu locale untuk keperluan lain, import `getLocale` dari `@/i18n/server`.
- **Alasan**: BentoHeroSection akan mengambil `t` dan `locale` sendiri.

### C. `src/features/landing/components/bento/BentoHeroSection.tsx`
- **Kondisi saat ini**: Menerima props `{ t, locale }`, forward ke child card components.
- **Perubahan**:
  - Hapus interface `BentoHeroSectionProps` (atau hapus field `t` dan `locale` darinya).
  - Import `getT` dan `getLocale` dari `@/i18n/server`.
  - Panggil `const t = getT()` dan `const locale = getLocale()` di body fungsi.
  - Hapus forward props `t` dan `locale` ke child components (`BentoIntroCard`, `BentoProfileCard`, `BentoProjectCard`, `BentoLearningCard`).
  - Setiap child component dirender tanpa props `t` atau `locale` (hanya props layout seperti `className` yang dipertahankan).
- **Alasan**: Setiap child card akan mengambil `t` sendiri.

### D. `src/features/landing/components/bento/BentoIntroCard.tsx`
- **Kondisi saat ini**: Menerima optional prop `t?: (key: string) => string` (sudah tidak digunakan di body komponen).
- **Perubahan**:
  - Hapus field `t` dari interface `BentoIntroCardProps`.
  - Jika di masa depan teks di komponen ini perlu diterjemahkan, tambahkan import `getT` dari `@/i18n/server` dan panggil `const t = getT()`.
- **Alasan**: Prop `t` sudah optional dan unused — cukup bersihkan.

### E. `src/features/landing/components/bento/BentoProfileCard.tsx`
- **Kondisi saat ini**: Menerima optional prop `t?: (key: string) => string` (sudah tidak digunakan di body komponen).
- **Perubahan**: Sama dengan BentoIntroCard — hapus field `t` dari interface.
- **Alasan**: Prop `t` sudah optional dan unused — cukup bersihkan.

### F. `src/features/landing/components/bento/BentoLearningCard.tsx`
- **Kondisi saat ini**: Menerima prop `t: (key: string) => string`, menggunakannya untuk memanggil `t("bentoHero.learningTitle")` dan `t("bentoHero.learningDesc")`.
- **Perubahan**:
  - Hapus field `t` dari interface `BentoLearningCardProps`.
  - Tambahkan import `getT` dari `@/i18n/server`.
  - Di body fungsi, panggil `const t = getT()`.
  - Semua pemanggilan `t("...")` di JSX tetap sama — tidak ada perubahan pada template/render.
- **Alasan**: `t` sekarang diambil dari cache, bukan dari props.

### G. `src/features/landing/components/bento/BentoProjectCard.tsx`
- **Kondisi saat ini**: Menerima props `{ t, locale }`, menggunakan `t` untuk label badge dan `locale` untuk membuat URL link ke halaman proyek.
- **Perubahan**:
  - Hapus field `t` dan `locale` dari interface `BentoProjectCardProps`.
  - Tambahkan import `getT` dan `getLocale` dari `@/i18n/server`.
  - Di body fungsi, panggil `const t = getT()` dan `const locale = getLocale()`.
  - Semua pemanggilan `t("...")` dan `locale` di JSX tetap sama.
- **Alasan**: Kedua nilai sekarang diambil dari cache.

### H. `src/features/landing/components/Hero.tsx`
- **Kondisi saat ini**: Menerima props `{ t, locale }`, menggunakan keduanya untuk render teks dan URL.
- **Perubahan**:
  - Hapus interface `HeroProps` (atau hapus field `t` dan `locale`).
  - Tambahkan import `getT` dan `getLocale` dari `@/i18n/server`.
  - Di body fungsi, panggil `const t = getT()` dan `const locale = getLocale()`.
  - Semua pemanggilan di JSX tetap sama.
- **Alasan**: Komponen ini adalah server component, jadi bisa langsung akses cache.

---

## 4. File yang TIDAK Diubah di Issue Ini

Berikut komponen-komponen yang **TIDAK BOLEH diubah** karena mereka adalah client component (`"use client"`) dan tetap menggunakan `useTranslations()`:

| File | Alasan tetap |
|------|-------------|
| `src/components/NavBar.tsx` | Client component — menggunakan `useState`, `usePathname()`, scroll listeners |
| `src/components/Footer.tsx` | Client component — menggunakan `useTranslations()`, `Intl.DateTimeFormat` |
| `src/components/BottomNav.tsx` | Client component — menggunakan `usePathname()` |
| `src/features/landing/components/IBuildStuff.tsx` | Client component — menggunakan `useTranslations()` |
| `src/features/landing/components/SectionTwo.tsx` | Client component — menggunakan `useState` (tab switching) |
| `src/features/landing/components/section-two/TechStack.tsx` | Client component — Embla Carousel |
| `src/components/contact/ContactForm.tsx` | Client component — `react-hook-form`, `useState` |
| `src/components/ui/button/LanguageSwitcher.tsx` | Client component — `usePathname()` |

---

## 5. Rencana Langkah Pengerjaan Berurutan

### Tahap 1: Migrasi dari Entry Point (Atas ke Bawah)

1. **Ubah `page.tsx`**: Hapus forward `locale` ke `LandingPage`.
2. **Ubah `LandingPage.tsx`**: Hapus props, hapus import `getTranslations`. Render children tanpa forward props.
3. **Ubah `BentoHeroSection.tsx`**: Import `getT`/`getLocale`, hapus props, render children tanpa forward.

### Tahap 2: Migrasi Child Components

4. **Ubah `BentoIntroCard.tsx`**: Hapus prop `t` dari interface.
5. **Ubah `BentoProfileCard.tsx`**: Hapus prop `t` dari interface.
6. **Ubah `BentoLearningCard.tsx`**: Import `getT`, panggil `const t = getT()`, hapus prop `t`.
7. **Ubah `BentoProjectCard.tsx`**: Import `getT`/`getLocale`, panggil keduanya, hapus props `t`/`locale`.
8. **Ubah `Hero.tsx`**: Import `getT`/`getLocale`, panggil keduanya, hapus props.

### Tahap 3: Verifikasi

9. Jalankan `npx tsc --noEmit` — pastikan tidak ada error TypeScript (terutama error tipe props yang tidak cocok).
10. Jalankan `npm run dev` dan buka halaman `/en` dan `/id`.
11. Periksa bahwa semua teks terjemahan masih muncul dengan benar:
    - Teks "Automated Coding Workflow" di BentoLearningCard.
    - Label badge "Featured Project" di BentoProjectCard.
    - Headline dan deskripsi di Hero.
12. Periksa bahwa link internal menggunakan locale yang benar (misal `/en/projects/jakreq` dan `/id/projects/jakreq`).

---

## 6. Hal yang Harus Diperhatikan

- **Urutan pengerjaan penting**: Ubah parent component dulu (`page.tsx` → `LandingPage` → `BentoHeroSection`) sebelum children. Jika children diubah duluan tapi parent masih forward props, akan muncul TypeScript error karena child sudah tidak menerima props tersebut.
- **Jangan ubah client components**: Jika sebuah file memiliki `"use client"` di baris pertama, **JANGAN** import `getT` dari `@/i18n/server` ke file tersebut — akan menyebabkan build error karena `server-only` guard.
- **`About.tsx`**: File `src/features/landing/components/section-two/About.tsx` juga menerima props `t`, tapi file ini saat ini tidak dirender di mana pun (tidak di-import oleh komponen aktif). Jika ditemukan bahwa file ini masih digunakan, ubah dengan pola yang sama. Jika tidak digunakan, biarkan atau bersihkan di issue cleanup.

---

## 7. Kriteria Penerimaan (Definition of Done)

- [ ] `page.tsx` merender `<LandingPage />` tanpa props `locale`.
- [ ] `LandingPage.tsx` tidak menerima props `locale` dan tidak meng-import `getTranslations`.
- [ ] `BentoHeroSection.tsx` menggunakan `getT()` dan `getLocale()` dari `@/i18n/server`, tidak menerima props `t`/`locale`.
- [ ] `BentoIntroCard.tsx` dan `BentoProfileCard.tsx` tidak lagi memiliki prop `t` di interface.
- [ ] `BentoLearningCard.tsx` menggunakan `getT()` dari `@/i18n/server`, tidak menerima props `t`.
- [ ] `BentoProjectCard.tsx` menggunakan `getT()` dan `getLocale()`, tidak menerima props `t`/`locale`.
- [ ] `Hero.tsx` menggunakan `getT()` dan `getLocale()`, tidak menerima props `t`/`locale`.
- [ ] Semua teks terjemahan tampil benar di `/en` dan `/id`.
- [ ] Semua link internal menggunakan locale yang tepat.
- [ ] Client components (`NavBar`, `Footer`, `BottomNav`, dll) tidak terpengaruh dan tetap bekerja.
- [ ] TypeScript build lolos tanpa error.
