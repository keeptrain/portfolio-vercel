# Issue #05: Cleanup — Hapus File Deprecated & Dead Code

## 1. Ringkasan Tugas

Menghapus file-file dan komponen yang sudah tidak dibutuhkan setelah migrasi i18n selesai (Issue #02, #03, #04). Issue ini bersifat **pembersihan akhir** — menghapus kode mati agar codebase tetap bersih dan tidak membingungkan developer di masa depan.

---

## 2. Sasaran & Ruang Lingkup

- **Tujuan**: Menghapus file dan import yang sudah digantikan oleh arsitektur baru.
- **Framework & Tooling**: Next.js (App Router), TypeScript.
- **Prasyarat**: Issue #02, #03, dan #04 sudah **selesai dan terverifikasi berfungsi**.
- **Prinsip Utama**: Pastikan tidak ada file lain yang masih meng-import file yang akan dihapus sebelum menghapusnya.

---

## 3. Daftar File yang Harus Dihapus

### A. `src/i18n/getTranslations.ts` — [DELETE]

- **Alasan**: Seluruh fungsinya (`getTranslations(locale)`) sudah digantikan oleh `getT()` dari `src/i18n/server.ts`.
- **Sebelum menghapus**: Pastikan **tidak ada file lain** yang masih meng-import dari `@/i18n/getTranslations`. Cara cek: search seluruh project untuk string `getTranslations`.
- **Yang diharapkan**: Satu-satunya file yang masih meng-import adalah `src/app/[locale]/layout.tsx` (untuk `generateMetadata`). Jika ya, ubah import di layout tersebut menjadi `getT` dari `@/i18n/server` sebelum menghapus file ini.

### B. `src/components/LocaleHtmlLang.tsx` — [DELETE]

- **Alasan**: Komponen ini mengubah atribut `<html lang="...">` dari client side menggunakan `useEffect`. Setelah Issue #03, atribut `lang` sudah di-set langsung di server (`<html lang={locale}>` di locale layout), sehingga komponen client ini tidak diperlukan lagi.
- **Sebelum menghapus**: Pastikan tidak ada file yang masih meng-import `LocaleHtmlLang`. Search seluruh project untuk string `LocaleHtmlLang`.

---

## 4. Import yang Harus Dibersihkan

Setelah menghapus file di atas, pastikan tidak ada import yang mengarah ke file yang sudah dihapus. Periksa file-file berikut:

### A. `src/app/[locale]/layout.tsx`

- **Periksa**: Apakah masih ada import `getTranslations` dari `@/i18n/getTranslations`?
  - Jika **ya**: Ganti menjadi `import { getT } from "@/i18n/server"` dan ubah pemanggilan `getTranslations(locale as Locale)` menjadi `getT()` di dalam `generateMetadata`.
  - Catatan: `generateMetadata` adalah fungsi async server-side, jadi `getT()` bisa digunakan di sini. Namun pastikan `setRequestLocale()` dipanggil sebelum `getT()` di dalam `generateMetadata`, atau panggil `getT()` setelah set locale.
  - **Alternatif lebih aman untuk `generateMetadata`**: Karena `generateMetadata` dijalankan secara terpisah dari render tree (bisa berjalan sebelum layout render), lebih aman jika di dalam `generateMetadata` tetap membangun `t` secara lokal tanpa bergantung pada `setRequestLocale`. Caranya: import `loadMessages` dan buat `t` langsung dari locale param. Ini menghindari race condition.

- **Periksa**: Apakah masih ada import `LocaleHtmlLang`?
  - Jika **ya**: Hapus baris import tersebut.

---

## 5. Rencana Langkah Pengerjaan Berurutan

### Tahap 1: Verifikasi Tidak Ada Konsumen Tersisa

1. Search seluruh project (semua file `.ts` dan `.tsx`) untuk string `getTranslations`.
2. Catat semua file yang masih meng-import dari `@/i18n/getTranslations`.
3. Search seluruh project untuk string `LocaleHtmlLang`.
4. Catat semua file yang masih meng-import `LocaleHtmlLang`.

### Tahap 2: Ubah Konsumen Tersisa (Jika Ada)

5. Jika `generateMetadata` di `[locale]/layout.tsx` masih menggunakan `getTranslations`:
   - Ubah agar menggunakan cara lokal: import messages JSON langsung, buat fungsi `t` lokal di dalam `generateMetadata` tanpa bergantung pada `setRequestLocale`.
   - Atau, jika `setRequestLocale` sudah pasti dipanggil sebelum `generateMetadata`, gunakan `getT()`.
6. Hapus semua import `LocaleHtmlLang` yang tersisa.
7. Hapus semua import `getTranslations` yang tersisa.

### Tahap 3: Hapus File

8. Hapus file `src/i18n/getTranslations.ts`.
9. Hapus file `src/components/LocaleHtmlLang.tsx`.

### Tahap 4: Verifikasi

10. Jalankan `npx tsc --noEmit` — pastikan tidak ada error TypeScript (terutama "module not found" error akibat import ke file yang sudah dihapus).
11. Jalankan `npm run build` — pastikan build produksi berhasil tanpa error.
12. Jalankan `npm run dev` dan periksa:
    - Halaman `/en` dan `/id` masih berfungsi normal.
    - Metadata halaman (title, description, OpenGraph) masih terisi dengan terjemahan yang benar.
    - Atribut `<html lang="...">` masih berubah sesuai locale.
    - Tidak ada console error di browser.

---

## 6. Hal yang Harus Diperhatikan

- **Jangan hapus file sebelum memastikan tidak ada konsumen** — search terlebih dahulu. Menghapus file yang masih di-import akan menyebabkan build error.
- **`generateMetadata` memerlukan perhatian khusus** — fungsi ini berjalan secara independen dari render tree. `React.cache()` yang digunakan `getT()` di-scope per render pass, dan `generateMetadata` mungkin berjalan di pass terpisah. Untuk keamanan, lebih baik buat `t` secara lokal di dalam `generateMetadata` menggunakan import langsung dari messages JSON.
- **Test file** — Jika ada unit test yang meng-import `getTranslations` (cek folder `__tests__`), update test tersebut juga.

---

## 7. Kriteria Penerimaan (Definition of Done)

- [ ] File `src/i18n/getTranslations.ts` sudah dihapus.
- [ ] File `src/components/LocaleHtmlLang.tsx` sudah dihapus.
- [ ] Tidak ada file di seluruh project yang meng-import `getTranslations` atau `LocaleHtmlLang`.
- [ ] `generateMetadata` di locale layout tetap menghasilkan metadata yang benar untuk kedua locale.
- [ ] TypeScript build (`npx tsc --noEmit`) lolos tanpa error.
- [ ] Production build (`npm run build`) berhasil tanpa error.
- [ ] Aplikasi tetap berfungsi normal di `npm run dev` untuk `/en` dan `/id`.
