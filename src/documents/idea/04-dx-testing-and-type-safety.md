# Ide 04: Developer Experience (DX), Type Safety & Automasi Pengujian

## 1. Strongly-Typed i18n Keys dengan TypeScript Autocomplete
- **Masalah**: Fungsi `t("bentoHero.aboutDesc")` menerima string sembarang, sehingga rentan typo tanpa peringatan TypeScript saat penulisan kode.
- **Penyelesaian**:
  - Buat generator tipe rekursif dari `en.json` menggunakan TypeScript Template Literal Types:
    - `type MessageKeys = Paths<typeof en>;`
  - Mengubah fungsi `getT()` dan `useTranslations()` untuk mewajibkan kunci bertipe:
    - `t: (key: MessageKeys) => string`
  - Hasil: Developer mendapatkan auto-complete instan saat mengetik `t("...")` dan compile error saat kunci tidak valid.

---

## 2. E2E Testing dengan Playwright (Automated Browser Testing)
- **Cakupan Pengujian Kritis**:
  1. **Floating Dock Navigation**: Memastikan klik tab Home, Projects, dan tombol More Drawer berjalan mulus di resolusi mobile (375px) dan desktop (1440px).
  2. **Theme Switching**: Memverifikasi pergantian tema (`Light` ↔ `Dark` ↔ `System`) mengubah atribut kelas HTML dan persistensi warna tanpa layout shift.
  3. **Multi-Language Switching**: Memverifikasi pergantian bahasa `/en` ↔ `/id` memperbarui teks dan mempertahankan URL rute yang sesuai.
  4. **Accessibility (A11y Audit)**: Mengintegrasikan `axe-core` dengan Playwright untuk memastikan tidak ada pelanggaran standar WCAG 2.1 AA di seluruh komponen UI.

---

## 3. View Transitions API untuk Transisi Tema & Halaman
- **Konsep**: Memanfaatkan native Web API `document.startViewTransition` untuk memberikan efek animasi lingkaran meluas (*circular ripple transition*) saat berganti tema Light/Dark.
- **Keunggulan**: Memberikan efek visual ultra-mewah standar 2026 tanpa library JavaScript pihak ketiga yang berat.

---

## 4. GitHub Actions CI Pipeline Ringan
- **Alur Otomasi Setiap Pull Request / Commit**:
  - `Lint & Format Check`: Memastikan kepatuhan aturan ESLint & Prettier Tailwind.
  - `Type Check`: Menjalankan `tsc --noEmit` untuk validasi tipe data global.
  - `Unit & E2E Tests`: Menjalankan Vitest dan Playwright secara otomatis sebelum deploy ke Vercel production.
