# Issue #02: Buat File `src/i18n/server.ts` — Server-Only Translation dengan React.cache()

## 1. Ringkasan Tugas

Membuat **satu file baru** `src/i18n/server.ts` yang menyediakan fungsi-fungsi i18n khusus server component menggunakan `React.cache()`. File ini menjadi **fondasi** untuk menghilangkan prop drilling `t` dan `locale` di seluruh server component.

Issue ini **murni penambahan file baru** — tidak ada file existing yang diubah atau dihapus. Semua kode lama tetap berjalan normal setelah issue ini selesai.

---

## 2. Sasaran & Ruang Lingkup

- **Tujuan**: Menyediakan 3 fungsi server-only: `setRequestLocale()`, `getLocale()`, dan `getT()`.
- **Framework & Tooling**: Next.js (App Router), TypeScript, `react` (cache API).
- **Lokasi File Baru**: `src/i18n/server.ts`
- **Prinsip Utama**: File ini HANYA boleh di-import oleh server component. Import dari client component (`"use client"`) harus menghasilkan error build.
- **Dependensi Baru**: Package `server-only` dari npm (harus di-install terlebih dahulu).

---

## 3. Spesifikasi Fungsi yang Harus Dibuat

### A. `setRequestLocale(locale: Locale)`

- **Peran**: Menyimpan locale aktif ke dalam React request cache.
- **Kapan dipanggil**: Satu kali saja, di `[locale]/layout.tsx`, setelah membaca `params.locale` dari URL.
- **Mekanisme**: Menggunakan `React.cache()` untuk membuat objek mutable `{ current: "en" }` yang di-share satu request. Fungsi ini mengubah `current` menjadi locale yang diminta (misal `"id"`).
- **Catatan**: Fungsi ini TIDAK me-return apapun (`void`).

### B. `getLocale(): Locale`

- **Peran**: Mengembalikan locale aktif dari React request cache.
- **Kapan dipanggil**: Di server component manapun yang membutuhkan informasi locale (misal untuk membuat URL link, format tanggal, dsb).
- **Return value**: String locale saat ini (`"en"` atau `"id"`).
- **Default**: Jika `setRequestLocale()` belum dipanggil, return `"en"` sebagai fallback aman.

### C. `getT(): (key: string) => string`

- **Peran**: Mengembalikan fungsi translator `t()` yang sudah ter-scope ke locale aktif.
- **Kapan dipanggil**: Di server component manapun yang perlu menampilkan teks terjemahan.
- **Mekanisme**: Menggunakan `React.cache()` agar JSON messages hanya di-load dan di-parse **satu kali per HTTP request**, walaupun `getT()` dipanggil di 10 komponen berbeda dalam satu render tree.
- **Logic key lookup**: Identik dengan logic yang sudah ada di `getTranslations.ts` — nested dot notation traversal (misal `"bentoHero.learningTitle"` → cari `messages.bentoHero.learningTitle`).
- **Fallback**: Jika key tidak ditemukan, kembalikan string key itu sendiri (bukan error).

---

## 4. Dependensi & Langkah Persiapan

### Install package `server-only`

- Package `server-only` adalah package resmi dari React team yang berisi **zero runtime code**.
- Satu-satunya fungsinya: jika file yang meng-import `server-only` di-bundle ke client, build akan **gagal dengan error yang jelas**. Ini mencegah developer secara tidak sengaja meng-import `server.ts` dari client component.
- Install via: `npm install server-only`

---

## 5. Referensi File Existing yang Relevan

File-file ini **TIDAK diubah** di issue ini, tapi harus dipahami karena `server.ts` menggunakan data/tipe yang sama:

| File | Peran |
|------|-------|
| `src/i18n/locales.ts` | Mendefinisikan tipe `Locale` dan array `locales` — di-import oleh `server.ts` untuk typing |
| `src/i18n/messages/en.json` | Kamus terjemahan bahasa Inggris — di-import oleh `server.ts` |
| `src/i18n/messages/id.json` | Kamus terjemahan bahasa Indonesia — di-import oleh `server.ts` |
| `src/i18n/getTranslations.ts` | File lama yang melakukan hal serupa tanpa cache — `server.ts` akan **menggantikan** file ini di issue mendatang (bukan di issue ini) |

---

## 6. Rencana Langkah Pengerjaan Berurutan

### Tahap 1: Install Dependensi

1. Jalankan perintah untuk menginstall package `server-only`.
2. Pastikan package sudah muncul di `package.json` dependencies.

### Tahap 2: Buat File `src/i18n/server.ts`

1. Buat file baru di `src/i18n/server.ts`.
2. Baris pertama file: import `"server-only"` — ini adalah guard yang mencegah import dari client component.
3. Import `cache` dari `"react"`.
4. Import tipe `Locale` dari `"./locales"`.
5. Import JSON messages (`en.json` dan `id.json`) dari `"./messages/"`.
6. Buat object `messagesMap` yang memetakan string locale ke JSON messages (sama persis dengan yang sudah ada di `getTranslations.ts`).
7. Implementasikan `requestLocale` menggunakan `cache(() => ({ current: "en" as Locale }))`.
8. Implementasikan fungsi `setRequestLocale(locale: Locale)` yang mengubah `requestLocale().current`.
9. Implementasikan fungsi `getLocale(): Locale` yang mengembalikan `requestLocale().current`.
10. Implementasikan fungsi `getT` menggunakan `cache(() => { ... })` yang membangun dan mengembalikan fungsi `t(key: string): string` dengan logic dot-notation traversal.

### Tahap 3: Verifikasi

1. Pastikan tidak ada error TypeScript (`npx tsc --noEmit`).
2. Pastikan build sukses (`npm run build`) — file baru belum digunakan siapapun, jadi tidak boleh ada dampak ke aplikasi yang berjalan.
3. Pastikan file TIDAK ter-import dari client component manapun (belum ada yang meng-import, jadi ini otomatis terpenuhi).

---

## 7. Kriteria Penerimaan (Definition of Done)

- [ ] Package `server-only` ter-install di `package.json`.
- [ ] File `src/i18n/server.ts` sudah dibuat dan bisa di-import dari server component.
- [ ] File mengexport 3 fungsi: `setRequestLocale`, `getLocale`, `getT`.
- [ ] Tidak ada perubahan pada file-file lain yang sudah ada — kode existing tetap 100% berfungsi.
- [ ] TypeScript build (`npx tsc --noEmit`) lolos tanpa error.
- [ ] Aplikasi tetap berjalan normal di `npm run dev`.
