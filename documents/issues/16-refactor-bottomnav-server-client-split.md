
# Issue #16: Refactor BottomNav Menjadi Arsitektur Server-First dan Client Component Terisolasi (BottomNavClient)

## 1. Ringkasan Masalah & Sasaran Tugas

Saat ini, seluruh komponen navigasi bawah mengambang `src/components/BottomNav.tsx` diberi tanda sebagai Client Component melalui directive `"use client"`. Komponen ini menyatukan banyak tanggung jawab sekaligus:
- Pengambilan data translasi klien (`useTranslations`).
- Pendeteksian URL aktif peramban (`usePathname`).
- Pengelolaan state modal lembar laci tema & bahasa (`isThemeOpen`).
- Rendering seluruh kontainer antarmuka dock mengambang (*crystal glass*).
- Rendering modal lembar Drawer dan komponen `ThemeSwitcher`.

Pola komponen monolitik berbasis klien ini memiliki beberapa kelemahan:
- **Beban Ukuran Bundle Klien (Client Bundle Size)**: Seluruh markup, impor ikon, dan konfigurasi navigasi diikutsertakan ke dalam bundel JavaScript sisi klien.
- **Pencampuran Tanggung Jawab (Mixed Concerns)**: Navigasi rute statis, aksi unduh resume, dan lembar kustomisasi tema tercampur dalam satu file besar.
- **Kurang Memaksimalkan Server-First Architecture**: Padahal Next.js App Router mengutamakan pola di mana data konfigurasi dan i18n dipersiapkan di server, sedangkan interaktivitas (active state URL dan state modal Drawer) diisolasi ke komponen klien sekecil mungkin (*leaf client component*).

Tujuan dari tugas ini adalah:
1. Memecah `BottomNav.tsx` menjadi Server Component induk dan Client Component interaktif (`BottomNavClient.tsx`).
2. Mengidentifikasi bagian-bagian yang dapat diolah di sisi server (seperti penyiapan data menu, tautan unduh resume, dan teks terjemahan i18n server).
3. Mengisolasi bagian-bagian interaktif yang membutuhkan akses browser ke dalam `BottomNavClient.tsx` (seperti pendeteksi tab aktif via pathname, pembuka Drawer, dan pemilih tema/bahasa).
4. Memastikan desain mobile-first, efek crystal glass, dan animasi drawer tetap bekerja mulus tanpa penurunan performa.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui Drawer, Lucide Icons.
- **Pendekatan**: Server-First Architecture, Separation of Concerns, Mobile-First Thinking, Minimal Client JS Footprint.
- **Batasan Khusus**:
  - Penjelasan instruksi bersifat deskriptif prosedural tanpa menyertakan blok kode mentah.
  - Tampilan visual, animasi zoom ikon, efek glassmorphism, dan fungsionalitas tombol tidak boleh berubah atau mengalami regresi.
  - Komponen induk `BottomNav.tsx` harus menjadi Server Component murni (tanpa directive use client).

---

## 3. Analisis Pembagian Tanggung Jawab: Server vs Client

### A. Bagian yang Dikerjakan di Sisi Server (`BottomNav.tsx`)
1. **Server-Side i18n Data Fetching**: Mengambil fungsi translasi `getT()` dan data bahasa `getLocale()` langsung dari utilitas server tanpa hooks klien.
2. **Penyiapan Konfigurasi Menu Navigasi**: Menyusun daftar item menu navigasi (Home, Projects, Resume, dan Theme Customizer) beserta label teks terjemahan dan target URL dasarnya.
3. **Pengaturan URL Eksternal**: Menyiapkan URL unduhan dokumen resume secara aman di level server.
4. **Penerusan Data Bersih ke Klien**: Meneruskan konfigurasi menu dan data bahasa ke komponen klien melalui properti yang telah ter-tipe rapi.

### B. Bagian yang Dikerjakan di Sisi Klien (`BottomNavClient.tsx` / `AppearanceDrawer.tsx`)
1. **Pendeteksian Rute Aktif**: Menggunakan hook `usePathname` dari Next.js untuk mencocokkan rute yang sedang aktif di peramban dan memberikan highlight visual aktif pada tombol navigasi yang sesuai.
2. **Manajemen State Modal Laci**: Mengelola state boolean pembukaan dan penutupan Drawer untuk menu kustomisasi tema dan bahasa.
3. **Penyedia Interaktivitas Tema & Bahasa**: Membungkus komponen `ThemeSwitcher` (yang memerlukan context theme klien) dan tombol pengalih bahasa dengan navigasi klien tanpa refresh penuh.
4. **Interaktivitas Dock Mengambang**: Menangani event hover, klik unduh resume, dan klik tombol buka drawer tema.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 5 tahapan sistematis:

### Tahap 1: Ekstraksi Tipe Data dan Kontrak Interface Navigasi
1. Buat tipe data TypeScript khusus untuk item navigasi dock yang mencakup identitas tombol, target tautan rute, ikon, label teks, status tautan eksternal, dan penanda tombol aksi khusus.
2. Pastikan interface properti untuk komponen klien mencakup daftar item navigasi yang telah disiapkan oleh server, bahasa aktif saat ini, dan target bahasa pengganti.

### Tahap 2: Buat Komponen Klien BottomNavClient
1. Buat file baru bernama `src/components/BottomNavClient.tsx` dengan menyematkan directive `"use client"` di baris paling atas.
2. Pindahkan penggunaan hook `usePathname` dan local state pembukaan modal ke dalam file ini.
3. Rancang struktur antarmuka dock mengambang (*crystal glass bar*) di dalam komponen klien ini agar merender daftar tombol berdasarkan data properti yang diterima dari server.
4. Terapkan logika pencocokan URL aktif menggunakan `usePathname`: jika rute cocok dengan item menu, aktifkan styling tombol aktif (latar putih/gelap dan teks label yang muncul).
5. Pasang penanganan klik pada tombol kustomisasi tema agar memicu pembukaan Drawer.
6. Letakkan komponen `Drawer` kustomisasi tema dan bahasa (lengkap dengan `ThemeSwitcher` dan tombol ganti bahasa) di dalam komponen klien ini.

### Tahap 3: Refactor BottomNav.tsx Menjadi Server Component Murni
1. Buka file `src/components/BottomNav.tsx`.
2. Hapus directive `"use client"` dari bagian atas file.
3. Hapus impor hooks klien seperti `usePathname`, `useTranslations`, dan `React.useState`.
4. Gunakan utilitas server `getT()` dan `getLocale()` dari modul i18n server untuk membaca terjemahan label navigasi.
5. Bentuk array data konfigurasi menu navigasi dengan label yang sudah diterjemahkan di level server.
6. Render komponen `BottomNavClient` dengan meneruskan data konfigurasi menu dan informasi locale yang sudah diproses di server.

### Tahap 4: Verifikasi Integrasi pada Layout Utama
1. Buka file `src/app/[locale]/layout.tsx`.
2. Periksa pemanggilan komponen `BottomNav` di dalam layout.
3. Pastikan `BottomNav` dipanggil sebagai Server Component tanpa perlu meneruskan data tambahan yang membebani layout.
4. Pastikan tidak ada duplikasi provider atau konflik context antara tema dan bahasa.

### Tahap 5: Pengujian Responsif dan Aksesibilitas di Berbagai Perangkat
1. Buka aplikasi di peramban pada mode layar smartphone (mobile-first testing):
   - Uji navigasi tab Home: pastikan tab Home aktif secara otomatis dengan highlight yang tepat.
   - Uji navigasi tab Projects: pastikan highlight berpindah ke tab Projects saat halaman proyek terbuka.
   - Uji tombol unduh Resume: pastikan tautan eksternal terbuka atau memicu unduhan di tab baru.
   - Uji tombol kustomisasi (ikon Computer): pastikan Drawer muncul meluncur dari bawah dengan animasi yang mulus.
   - Uji penggantian tema di dalam Drawer: pastikan tema beralih secara instan antara System, Light, dan Dark.
   - Uji tombol pengalih bahasa di dalam Drawer: pastikan bahasa berpindah dan Drawer tertutup dengan benar.
2. Uji pada layar desktop:
   - Pastikan dock mengambang tetap berada di tengah bawah layar (*centered bottom dock*).
   - Pastikan efek crystal glassmorphism dan hover label tetap responsif dan halus.
3. Jalankan pengujian tipe TypeScript dan linter untuk memastikan tidak ada pelanggaran aturan Server Component atau tipe data yang hilang.

---

## 5. Struktur Komponen Setelah Refactor

```
src/components/
├── BottomNav.tsx                 ← [SERVER COMPONENT] Mengambil i18n server & menyiapkan konfigurasi menu
├── BottomNavClient.tsx           ← [CLIENT COMPONENT] Mengelola pathname aktif, dock click, & Theme Drawer
├── ThemeSwitcher.tsx             ← [CLIENT COMPONENT] Pengalih tema radio
└── ui/
    └── drawer.tsx                ← [CLIENT COMPONENT] Primitif Drawer berbasis Vaul
```

---

## 6. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/components/BottomNav.tsx` | MODIFY | Hapus "use client", jadikan Server Component murni yang menyiapkan data navigasi |
| `src/components/BottomNavClient.tsx` | NEW | Client Component yang mengelola usePathname, state Drawer, ThemeSwitcher, dan link dock |
| `src/app/[locale]/layout.tsx` | VERIFY | Pastikan rendering Server Component BottomNav tetap terintegrasi sempurna |

---

## 7. Kriteria Penerimaan (Definition of Done)

- [ ] File `src/components/BottomNav.tsx` adalah Server Component murni tanpa directive `"use client"` dan tanpa hooks klien.
- [ ] Komponen `src/components/BottomNavClient.tsx` terisolasi sebagai Client Component yang hanya menangani interaktivitas UI peramban (`usePathname`, pembukaan Drawer, dan `ThemeSwitcher`).
- [ ] Indikator tab aktif pada dock mengambang bekerja secara akurat sesuai rute URL saat ini di peramban.
- [ ] Tombol kustomisasi tema membuka modal Drawer dengan animasi mulus dari bawah.
- [ ] Penggantian tema (Light / Dark / System) dan pengalihan bahasa di dalam Drawer bekerja secara responsif dan tanpa error.
- [ ] Tautan Resume eksternal tetap berfungsi normal.
- [ ] Tata letak dock mengambang di mobile dan desktop tetap memiliki efek crystal glass yang estetik dan ergonomis.
- [ ] Kompilasi build Next.js dan pemeriksaan tipe TypeScript lulus 100% tanpa error.
