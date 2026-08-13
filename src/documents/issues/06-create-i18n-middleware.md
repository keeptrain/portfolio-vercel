# Issue #06: Buat Middleware i18n — Auto-Redirect ke Locale yang Tepat

## 1. Ringkasan Tugas

Membuat file `src/middleware.ts` yang secara otomatis mendeteksi dan me-redirect pengunjung ke URL yang memiliki prefix locale (`/en` atau `/id`). Middleware ini mengikuti **pola resmi Next.js** untuk internationalized routing tanpa library tambahan.

Saat ini project sudah memiliki file `src/proxy.ts` dan `src/i18n/locale-detection.ts` yang berisi logic deteksi locale, tetapi **belum ada file `middleware.ts`** sehingga logic tersebut tidak pernah dieksekusi oleh Next.js.

---

## 2. Sasaran & Ruang Lingkup

- **Tujuan**: Memastikan setiap pengunjung yang membuka URL tanpa locale (misal `/`, `/projects`, `/contact`) otomatis di-redirect ke URL dengan locale (misal `/en`, `/en/projects`, `/en/contact`).
- **Framework & Tooling**: Next.js (App Router), TypeScript.
- **File yang Dibuat**: `src/middleware.ts` (file baru).
- **File yang Diubah**: Tidak ada file yang diubah — logic di `proxy.ts` dan `locale-detection.ts` akan dipakai ulang.
- **Locale yang Didukung**: Hanya `en` dan `id`.
- **Preferred Locale Default**: `en` (jika browser pengunjung tidak menyertakan header `Accept-Language` yang cocok).
- **Tanpa library tambahan**: Tidak menggunakan `next-intl`, `i18next`, atau library i18n lainnya. Hanya menggunakan `NextRequest`, `NextResponse`, dan logic parsing sederhana.

---

## 3. Bagaimana Next.js Middleware Bekerja

### Aturan Dasar
- Next.js **hanya** mengenali file bernama `middleware.ts` (atau `middleware.js`) yang berada di:
  - Root project (`/middleware.ts`), ATAU
  - Di dalam folder `src/` (`src/middleware.ts`).
- File dengan nama lain (seperti `proxy.ts`) **TIDAK akan pernah dieksekusi** oleh Next.js secara otomatis.
- Middleware berjalan **sebelum** routing — artinya sebelum Next.js menentukan halaman mana yang harus di-render, middleware sudah dieksekusi terlebih dahulu.
- Middleware **hanya berjalan di server** (Edge Runtime atau Node.js Runtime).

### Alur Eksekusi

```
Pengunjung buka: http://localhost:3000/projects
        │
        ▼
┌─────────────────────┐
│   middleware.ts      │  ← Cek: apakah "/projects" sudah punya prefix locale?
│                      │  ← TIDAK → Deteksi locale dari Accept-Language header
│                      │  ← Redirect ke /en/projects (302)
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│   middleware.ts      │  ← Cek: apakah "/en/projects" sudah punya prefix locale?
│                      │  ← YA → Lanjutkan (NextResponse.next())
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│ [locale]/layout.tsx  │  ← Render halaman dengan locale "en"
└─────────────────────┘
```

---

## 4. Spesifikasi Middleware

### A. Fungsi `middleware(request: NextRequest)`

Fungsi utama yang di-export sebagai `default` atau named export `middleware`. Alur logikanya:

1. **Ambil pathname** dari `request.nextUrl.pathname`.
2. **Cek apakah pathname sudah mengandung locale** — Gunakan fungsi `pathnameHasLocale()` yang memeriksa apakah pathname dimulai dengan salah satu locale yang didukung (`/en` atau `/id`).
3. **Jika sudah ada locale**: Lanjutkan tanpa melakukan apa-apa (`return NextResponse.next()`).
4. **Jika belum ada locale**: Deteksi locale dari header `Accept-Language` browser menggunakan fungsi `getLocale(request)`, lalu redirect ke URL baru dengan prefix locale.

### B. Fungsi `getLocale(request: NextRequest): string`

Fungsi internal yang menentukan locale pilihan pengunjung:

1. Baca header `Accept-Language` dari request.
2. Parse header tersebut untuk mendapatkan daftar bahasa pilihan pengunjung beserta quality value-nya.
3. Cocokkan dengan locale yang didukung (`en`, `id`).
4. Jika ada yang cocok, return locale tersebut.
5. Jika tidak ada yang cocok, return default locale `"en"`.

**Catatan**: Logic ini sudah ada di `src/i18n/locale-detection.ts` (`getLocaleFromHeader`). Boleh langsung import dan gunakan fungsi tersebut, atau salin logicnya ke dalam middleware jika ingin menghindari import cross-boundary.

### C. `config.matcher`

Konfigurasi yang menentukan URL mana saja yang harus melewati middleware:

- **Skip** semua path internal Next.js (`_next/static`, `_next/image`).
- **Skip** semua file statis (gambar, font, favicon, manifest, dll) — yaitu path yang mengandung ekstensi file (`.jpg`, `.png`, `.svg`, `.ico`, `.json`, dsb).
- **Skip** route API (`/api/...`).
- **Proses** semua path lainnya (halaman dinamis).

---

## 5. File yang Sudah Ada dan Bisa Dimanfaatkan

| File | Fungsi | Bisa Dipakai? |
|------|--------|---------------|
| `src/proxy.ts` | Berisi logic middleware yang lengkap tapi di file yang salah (bukan `middleware.ts`) | YA — logic bisa dipindahkan/dipakai ulang |
| `src/i18n/locale-detection.ts` | Berisi `getLocaleFromHeader()` yang parse `Accept-Language` header | YA — import langsung dari middleware |
| `src/i18n/locales.ts` | Berisi array `locales` (`["en", "id"]`) dan `defaultLocale` (`"en"`) | YA — import untuk referensi |

---

## 6. Rencana Langkah Pengerjaan Berurutan

### Tahap 1: Buat File `src/middleware.ts`

1. Buat file baru di `src/middleware.ts`.
2. Import `NextRequest` dan `NextResponse` dari `next/server`.
3. Import `locales` dari `@/i18n/locales`.
4. Import `getLocaleFromHeader` dari `@/i18n/locale-detection`.
5. Buat fungsi `getLocale(request: NextRequest)` yang memanggil `getLocaleFromHeader(request.headers.get("accept-language"))`.
6. Buat fungsi `middleware(request: NextRequest)` dengan logic:
   - Baca `pathname` dari `request.nextUrl`.
   - Cek apakah pathname sudah dimulai dengan salah satu locale yang didukung (loop `locales.some(...)`).
   - Jika ya: `return NextResponse.next()`.
   - Jika tidak: panggil `getLocale(request)` untuk mendapat locale, buat URL baru dengan prefix locale, lalu `return NextResponse.redirect(newUrl)`.
7. Export `config` object dengan `matcher` yang mengecualikan path internal dan file statis.

### Tahap 2: Tentukan Nasib `src/proxy.ts`

Setelah `middleware.ts` dibuat:
- Jika logic di `proxy.ts` sudah sepenuhnya tercakup oleh `middleware.ts`, file `proxy.ts` bisa **dihapus** untuk menghindari kebingungan.
- Jika `proxy.ts` masih di-import di tempat lain, periksa dan sesuaikan.

### Tahap 3: Verifikasi

1. Jalankan `npm run dev`.
2. Buka `http://localhost:3000/` (tanpa locale) → harus otomatis redirect ke `http://localhost:3000/en` (atau `/id` jika browser di-set bahasa Indonesia).
3. Buka `http://localhost:3000/projects` → harus redirect ke `http://localhost:3000/en/projects`.
4. Buka `http://localhost:3000/en` → halaman tampil langsung tanpa redirect.
5. Buka `http://localhost:3000/id` → halaman tampil langsung tanpa redirect.
6. Buka `http://localhost:3000/_next/static/...` → tidak terkena middleware (file statis ter-load normal).
7. Buka `http://localhost:3000/images/photos.png` → tidak terkena middleware (aset statis ter-load normal).
8. Pastikan tidak ada infinite redirect loop.

---

## 7. Hal yang Harus Diperhatikan

- **Nama file HARUS `middleware.ts`** — bukan `proxy.ts`, bukan `middlewares.ts`, bukan `Middleware.ts`. Next.js hanya mengenali nama file yang tepat ini.
- **Lokasi file**: Jika menggunakan folder `src/`, file harus di `src/middleware.ts`. Jika tidak ada folder `src/`, file harus di root project langsung.
- **Hindari infinite redirect**: Pastikan matcher mengecualikan path yang sudah memiliki locale. Jika middleware me-redirect ke `/en/page`, request kedua harus di-pass tanpa redirect lagi.
- **File statis dan API route**: Matcher harus mengecualikan path `_next`, `api`, dan file dengan ekstensi (`.ico`, `.jpg`, `.svg`, `.json`, dll). Jika tidak, request ke gambar atau manifest juga akan di-redirect dan menyebabkan error 404.
- **Preserve search params**: Saat membuat URL redirect baru, pastikan query string dari URL asli ikut terbawa (misal `/?ref=github` → `/en/?ref=github`).

---

## 8. Kriteria Penerimaan (Definition of Done)

- [ ] File `src/middleware.ts` sudah dibuat dan berfungsi.
- [ ] Pengunjung yang membuka `/` otomatis di-redirect ke `/en` (atau `/id` sesuai browser language).
- [ ] Pengunjung yang membuka `/projects` otomatis di-redirect ke `/en/projects`.
- [ ] Pengunjung yang membuka `/en` atau `/id` langsung melihat halaman tanpa redirect.
- [ ] File statis (gambar, font, favicon) tetap ter-load tanpa terkena middleware.
- [ ] Route API (`/api/...`) tidak terkena middleware.
- [ ] Tidak ada infinite redirect loop.
- [ ] Search params URL terpreserve saat redirect.
- [ ] File `src/proxy.ts` dihapus jika logicnya sudah sepenuhnya tercakup oleh middleware baru.
- [ ] TypeScript build lolos tanpa error.
- [ ] Aplikasi berjalan normal di `npm run dev`.
