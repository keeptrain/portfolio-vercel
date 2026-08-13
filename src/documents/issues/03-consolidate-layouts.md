# Issue #03: Konsolidasi Layout — Pindahkan `<html>` & `<body>` ke `[locale]/layout.tsx`

## 1. Ringkasan Tugas

Menyatukan semua elemen HTML root (`<html>`, `<body>`, font, ThemeProvider) yang saat ini tersebar di **dua file layout** menjadi **satu file layout utama** di `src/app/[locale]/layout.tsx`. Root layout (`src/app/layout.tsx`) disederhanakan menjadi pass-through wrapper yang hanya return `children`.

Issue ini juga mengintegrasikan `setRequestLocale()` dari `src/i18n/server.ts` (dibuat di Issue #02) ke dalam locale layout, sehingga semua server component di bawahnya bisa mengakses locale tanpa props.

---

## 2. Sasaran & Ruang Lingkup

- **Tujuan**: Menghilangkan duplikasi layout dan memastikan `<html lang={locale}>` selalu terisi tepat dari server.
- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS.
- **File yang Diubah**: 2 file (`src/app/layout.tsx` dan `src/app/[locale]/layout.tsx`).
- **Prasyarat**: Issue #02 harus sudah selesai (file `src/i18n/server.ts` sudah ada).
- **Dampak**: Tidak ada breaking change pada tampilan atau fungsi — perubahan ini bersifat **refactor internal** saja.

---

## 3. Kondisi Saat Ini (Before)

### `src/app/layout.tsx` (Root Layout)
- Berisi tag `<html>` dan `<body>`.
- Mengatur font Google (Montserrat, Inter) dan className.
- Membungkus children dengan `ThemeProvider`.
- Menerima `params` dan mencoba await `locale`, tapi **Root Layout tidak berada di dalam folder `[locale]`**, sehingga `params.locale` sebenarnya `undefined` saat rute tidak memiliki locale di path.

### `src/app/[locale]/layout.tsx` (Locale Layout)
- Membungkus children dengan `TranslationProvider`.
- Menampilkan `Footer` dan `BottomNav`.
- TIDAK memiliki tag `<html>` atau `<body>`.

### Masalah:
- Tag `<html lang="...">` di root layout tidak punya akses yang valid ke locale param.
- Dua file layout membuat developer bingung mana yang bertanggung jawab atas apa.
- Font setup dan ThemeProvider terisolasi di root layout, terpisah dari i18n.

---

## 4. Kondisi yang Dituju (After)

### `src/app/layout.tsx` — Wrapper minimal
- Hanya berisi `export default function RootLayout` yang return `children` tanpa pembungkus `<html>` atau `<body>`.
- Tetap mempertahankan `export const metadata` yang bersifat global (favicon, manifest, PWA config, robots).
- Import font dihapus dari sini (dipindahkan ke locale layout).

### `src/app/[locale]/layout.tsx` — Layout utama satu-satunya
- Memiliki tag `<html lang={locale}>` dengan className font dan scroll behavior.
- Memiliki tag `<body>` dengan className styling.
- Memanggil `setRequestLocale(locale as Locale)` sebelum render.
- Membungkus children dengan `ThemeProvider` → `TranslationProvider`.
- Menampilkan `Footer` dan `BottomNav` di dalam structure.
- Import dan setup font Google (Montserrat, Inter) dipindahkan ke sini.

---

## 5. Rencana Langkah Pengerjaan Berurutan

### Tahap 1: Pindahkan semua elemen dari Root Layout ke Locale Layout

1. Buka file `src/app/[locale]/layout.tsx`.
2. Tambahkan import font Google (`Montserrat`, `Inter`) dari `next/font/google` — copy dari root layout.
3. Tambahkan import `ThemeProvider` dari `@/contexts/ThemeContext`.
4. Tambahkan import `cn` dari `@/lib/utils`.
5. Tambahkan import `setRequestLocale` dari `@/i18n/server`.
6. Di dalam fungsi `LocaleLayout`, setelah baris `const { locale } = await params;` dan validasi locale, tambahkan pemanggilan `setRequestLocale(locale as Locale)`.
7. Ubah return JSX menjadi:
   - Bungkus seluruh output dengan `<html lang={locale} data-scroll-behavior="smooth" className={cn(montserrat.className, "font-sans", inter.variable)}>`.
   - Di dalam `<html>`, tambahkan `<body className={...bg-accent...}>`.
   - Di dalam `<body>`, bungkus dengan `<ThemeProvider>`.
   - Di dalam `<ThemeProvider>`, bungkus dengan `<TranslationProvider>`.
   - Di dalam `<TranslationProvider>`, letakkan `<main id="main-content">`, children, `<Footer />`, dan `<BottomNav />`.

### Tahap 2: Sederhanakan Root Layout

1. Buka file `src/app/layout.tsx`.
2. Hapus semua import font, ThemeProvider, dan cn.
3. Hapus inisialisasi font (`const inter = ...`, `const montserrat = ...`).
4. Pertahankan `export const metadata` yang bersifat global (robots, manifest, appleWebApp) — tapi hapus duplikat jika sudah ada di locale layout `generateMetadata`.
5. Pertahankan import `@/app/globals.css` — ini harus tetap di root layout agar CSS global ter-load di semua rute.
6. Ubah fungsi `RootLayout` menjadi sederhana: terima hanya `children`, return `children` langsung tanpa wrapper `<html>` atau `<body>`.

### Tahap 3: Verifikasi

1. Jalankan `npm run dev` dan buka `http://localhost:3000/en` dan `http://localhost:3000/id`.
2. Inspect elemen `<html>` di browser DevTools:
   - Saat di `/en`, atribut `lang` harus bernilai `"en"`.
   - Saat di `/id`, atribut `lang` harus bernilai `"id"`.
3. Pastikan font tetap ter-load (Montserrat dan Inter).
4. Pastikan ThemeProvider (dark mode / light mode toggle) tetap berfungsi.
5. Pastikan Footer dan BottomNav tetap muncul.
6. Pastikan tidak ada error TypeScript (`npx tsc --noEmit`).

---

## 6. File Referensi yang Perlu Dipahami

| File | Peran |
|------|-------|
| `src/app/layout.tsx` | Root layout yang akan disederhanakan |
| `src/app/[locale]/layout.tsx` | Locale layout yang akan menerima semua elemen HTML |
| `src/i18n/server.ts` | File baru dari Issue #02 — menyediakan `setRequestLocale()` |
| `src/contexts/ThemeContext.tsx` | Provider tema (dark/light) — akan dipindahkan importnya ke locale layout |
| `src/app/globals.css` | CSS global — import ini HARUS tetap di root layout |

---

## 7. Hal yang Harus Diperhatikan

- **JANGAN hapus import `globals.css` dari root layout** — jika dipindahkan ke locale layout, CSS tetap berfungsi, tapi secara konvensi Next.js lebih baik di root.
- **Metadata di root layout vs locale layout**: Metadata `generateMetadata` yang sudah ada di locale layout (title, description per-locale) akan otomatis **merge** dengan static `metadata` di root layout. Next.js menangani penggabungan ini secara otomatis. Jadi duplikat field (misal `title`) akan di-override oleh locale layout.
- **`<head>` manual**: Jika root layout memiliki tag `<head>` manual (misal viewport meta), pindahkan ke locale layout juga karena `<head>` harus berada di dalam `<html>`.

---

## 8. Kriteria Penerimaan (Definition of Done)

- [ ] `src/app/layout.tsx` hanya berisi metadata global dan return `children` langsung (tanpa `<html>` atau `<body>`).
- [ ] `src/app/[locale]/layout.tsx` memiliki tag `<html lang={locale}>` dan `<body>` lengkap.
- [ ] `setRequestLocale()` dipanggil di locale layout sebelum render.
- [ ] Font Google (Montserrat, Inter) ter-load dengan benar.
- [ ] ThemeProvider berfungsi (toggle dark/light mode bekerja).
- [ ] TranslationProvider berfungsi (teks terjemahan tampil sesuai locale).
- [ ] Footer dan BottomNav tetap muncul di semua halaman.
- [ ] Inspect `<html lang="...">` menunjukkan locale yang tepat sesuai URL.
- [ ] TypeScript build lolos tanpa error.
- [ ] Aplikasi tetap berjalan normal di `npm run dev`.
