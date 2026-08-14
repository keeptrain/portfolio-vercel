# Issue #12: Implementasi Drawer Detail Proyek dengan Bottom Sheet (shadcn Drawer)

## 1. Ringkasan Masalah & Sasaran Tugas

Saat ini ketika pengguna mengetuk/mengklik item proyek pada halaman daftar proyek (`ProjectsPage`), tidak terjadi aksi apa pun yang bermakna. Tidak ada tampilan detail proyek yang muncul. Pengguna tidak dapat melihat informasi lengkap seperti kategori, tahun, teknologi yang digunakan, klien, deskripsi, atau gambar logo proyek.

Tujuan dari tugas ini adalah:
1. **Menginstal komponen Drawer dari shadcn/ui** sebagai Bottom Sheet untuk menampilkan detail proyek.
2. **Membuat tampilan detail proyek** di dalam Drawer yang responsif, dengan layout yang terinspirasi dari desain referensi (lihat bagian Standar Data di bawah).
3. **Menstandarisasi struktur data detail proyek** agar mudah diisi dan dikembangkan di masa depan melalui file data di `src/features/projects/data/`.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Pendekatan**: Mobile-First Thinking.
- **Batasan Khusus**:
  - Menggunakan komponen **Drawer** dari shadcn/ui (diinstal via `pnpm dlx shadcn@latest add drawer`).
  - Posisi Drawer: **Bottom** (muncul dari bawah layar seperti Bottom Sheet pada aplikasi mobile native).
  - Drawer harus **responsif** — tampil rapi baik di layar ponsel maupun desktop.
  - Instruksi deskriptif prosedural tanpa menyertakan blok kode mentah.

---

## 3. Standar Data Detail Proyek (Berdasarkan Screenshot Referensi)

Berdasarkan screenshot yang diberikan, berikut adalah standar field data yang harus ditampilkan pada Drawer Detail Proyek:

| Field | Contoh Nilai | Keterangan |
|-------|-------------|------------|
| **Title** | `SIM — ORS` | Judul proyek, ditampilkan sebagai heading utama (H2) |
| **Category** | `Website Development` | Label kecil bertuliskan "CATEGORY" di atas nilai |
| **Year** | `2025 - 2026` | Label kecil bertuliskan "YEAR" di atas nilai |
| **Stack** | `React.js / Typescript / Laravel / MySQL / Zustand / Tailwind / Shadcn / Docker` | Label kecil bertuliskan "STACK" di atas nilai. Teknologi dipisahkan dengan tanda `/` |
| **Client** | `Swakarya Insan Mandiri` | Label kecil bertuliskan "CLIENT" di atas nilai |
| **NDA Notice** | `*) Access limited due to NDA` | Teks italic kecil di bawah nama klien jika proyek bersifat NDA |
| **Logo / Image** | Gambar logo perusahaan klien | Ditampilkan di sisi kanan pada desktop, di bawah metadata pada mobile |
| **Description** | `ORS (Outsourcing Recruitment System) is an outsourcing recruitment platform that simplifies the hiring process...` | Paragraf deskripsi panjang di bawah area logo |

### Layout Referensi (Mobile-First):
- **Mobile**: Layout satu kolom — heading di atas, metadata (category, year, stack, client) berurutan ke bawah, logo di bawah metadata, lalu deskripsi paling bawah.
- **Desktop**: Layout dua kolom — metadata di kolom kiri, logo/gambar di kolom kanan, deskripsi di bawah membentang penuh.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 6 tahapan sistematis:

### Tahap 1: Instal Komponen Drawer dari shadcn/ui
1. Buka terminal di root direktori proyek.
2. Jalankan perintah instalasi: `pnpm dlx shadcn@latest add drawer`.
3. Verifikasi bahwa file komponen Drawer telah dibuat di `src/components/ui/drawer.tsx`.
4. Pastikan dependensi `vaul` (library dasar Drawer shadcn) terpasang di `package.json`.

### Tahap 2: Perbarui Tipe Data Proyek
1. Buka file tipe data proyek di `src/features/projects/data/types.ts` (yang sudah dibuat pada Issue #11).
2. Pastikan tipe `Project` mencakup seluruh field yang dibutuhkan oleh Drawer Detail:
   - `slug` (string, identitas unik)
   - `title` (string)
   - `imageSrc` (string, path thumbnail)
   - `stack` (string array)
   - `category` (string, misalnya "Website Development")
   - `year` (string, misalnya "2025 - 2026")
   - `client` (string, opsional — nama klien)
   - `description` (string, deskripsi panjang)
   - `isNda` (boolean, opsional — apakah proyek terbatas NDA)
   - `logoSrc` (string, opsional — path gambar logo klien)
3. Jika ada field yang belum ada, tambahkan ke definisi tipe.

### Tahap 3: Lengkapi Data Proyek dengan Field Baru
1. Buka file data proyek di `src/features/projects/data/projects.ts`.
2. Untuk setiap objek proyek dalam array, tambahkan field-field baru yang belum ada:
   - `category`: isi dengan kategori yang sesuai.
   - `year`: isi dengan rentang tahun pengerjaan.
   - `client`: isi dengan nama klien (kosongkan jika tidak ada).
   - `description`: isi dengan deskripsi singkat proyek.
   - `isNda`: isi `true` jika proyek terbatas NDA, `false` jika tidak.
   - `logoSrc`: isi dengan path gambar logo (atau kosongkan).
3. Pastikan setiap objek proyek sesuai dengan tipe `Project`.

### Tahap 4: Buat Komponen ProjectDetailDrawer
1. Buat file baru `src/features/projects/components/ProjectDetailDrawer.tsx`.
2. Tandai file ini sebagai `"use client"` karena Drawer membutuhkan interaktivitas (buka/tutup).
3. Impor komponen Drawer dari shadcn/ui (`Drawer`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerTrigger`).
4. Komponen menerima properti:
   - `project`: objek bertipe `Project` yang berisi data proyek yang akan ditampilkan.
   - `children`: elemen React yang berfungsi sebagai trigger (area yang bisa diklik untuk membuka drawer).
5. **Susun tata letak konten di dalam DrawerContent:**

   **A. Header / Judul:**
   - Tampilkan `title` proyek sebagai heading besar (H2) dengan font serif.
   - Gunakan `DrawerHeader` dan `DrawerTitle` dari shadcn.

   **B. Area Metadata (Mobile: 1 kolom, Desktop: 2 kolom):**
   - Kolom kiri (metadata):
     - **CATEGORY**: Label kecil berwarna abu-abu bertuliskan "CATEGORY" di atas, nilai kategori di bawahnya dengan font tebal.
     - **YEAR**: Label kecil bertuliskan "YEAR" di atas, nilai tahun di bawahnya.
     - **STACK**: Label kecil bertuliskan "STACK" di atas, nilai teknologi di bawahnya (dipisahkan tanda `/`).
     - **CLIENT**: Label kecil bertuliskan "CLIENT" di atas, nama klien di bawahnya.
     - Jika `isNda` bernilai `true`, tampilkan teks italic kecil `"*) Access limited due to NDA"` di bawah nama klien.
     - Setiap kelompok metadata dipisahkan oleh garis horizontal tipis (`border-t`).
   - Kolom kanan (logo/gambar):
     - Tampilkan gambar `logoSrc` di dalam kotak abu-abu muda dengan sudut membulat.
     - Jika `logoSrc` kosong atau tidak ada, tampilkan thumbnail proyek `imageSrc` sebagai fallback.
     - Gunakan komponen `Image` dari Next.js.

   **C. Area Deskripsi:**
   - Tampilkan `description` sebagai paragraf teks di bawah area metadata + logo.
   - Gunakan `DrawerDescription` dari shadcn atau elemen paragraf biasa.

6. Pastikan seluruh tata letak menggunakan responsif Tailwind:
   - Mobile: Layout satu kolom vertikal.
   - Desktop (`md:` breakpoint): Layout dua kolom menggunakan grid atau flexbox.

### Tahap 5: Integrasikan Drawer ke Halaman Daftar Proyek
1. Buka file `src/features/projects/ProjectsPage.tsx`.
2. Impor komponen `ProjectDetailDrawer` yang baru dibuat.
3. Bungkus setiap item proyek (elemen `<div>` yang saat ini menampilkan `ProjectAdapter`) dengan komponen `ProjectDetailDrawer`:
   - Teruskan objek proyek sebagai properti `project`.
   - Jadikan area `ProjectAdapter` sebagai children trigger yang bisa diklik.
4. Hapus atribut `onClick={() => project.links}` yang lama (tidak berfungsi dan akan digantikan oleh trigger Drawer).
5. Pastikan kursor berubah menjadi pointer saat melayang di atas item proyek (`cursor-pointer`).

### Tahap 6: Pengujian & Validasi
1. Buka aplikasi di browser dan navigasikan ke halaman proyek.
2. **Uji pada mobile (360px–414px)**:
   - Ketuk item proyek — Drawer muncul dari bawah layar sebagai Bottom Sheet.
   - Semua metadata (Category, Year, Stack, Client) tersusun vertikal satu kolom.
   - Logo/gambar tampil di bawah metadata.
   - Deskripsi tampil di paling bawah.
   - Geser Drawer ke bawah (swipe down) untuk menutupnya.
3. **Uji pada desktop (≥ 768px)**:
   - Klik item proyek — Drawer muncul dari bawah.
   - Metadata berada di kolom kiri, logo/gambar di kolom kanan.
   - Deskripsi membentang di bawah.
   - Klik area di luar Drawer atau tombol tutup untuk menutupnya.
4. Jalankan pemeriksaan tipe TypeScript untuk memastikan tidak ada kesalahan.

---

## 5. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/components/ui/drawer.tsx` | NEW (auto-generated oleh shadcn CLI) | Komponen Drawer dari shadcn/ui |
| `src/features/projects/data/types.ts` | MODIFY | Tambahkan field baru (category, year, client, description, isNda, logoSrc) ke tipe `Project` |
| `src/features/projects/data/projects.ts` | MODIFY | Lengkapi setiap objek proyek dengan field baru |
| `src/features/projects/components/ProjectDetailDrawer.tsx` | NEW | Komponen Client yang membungkus Drawer dan menampilkan detail proyek |
| `src/features/projects/ProjectsPage.tsx` | MODIFY | Bungkus setiap item proyek dengan `ProjectDetailDrawer` |

---

## 6. Kriteria Penerimaan (Definition of Done)

- [ ] Komponen Drawer dari shadcn/ui terinstal dan tersedia di `src/components/ui/drawer.tsx`.
- [ ] Tipe `Project` di `types.ts` mencakup seluruh field yang dibutuhkan (slug, title, imageSrc, stack, category, year, client, description, isNda, logoSrc).
- [ ] Setiap objek proyek di `projects.ts` telah dilengkapi dengan seluruh field (boleh placeholder untuk proyek yang belum lengkap datanya).
- [ ] Drawer muncul dari bawah layar (Bottom Sheet) saat item proyek diklik/diketuk.
- [ ] Layout di dalam Drawer mengikuti standar referensi: heading, metadata berlabel, logo/gambar, dan deskripsi.
- [ ] Drawer responsif — satu kolom di mobile, dua kolom di desktop.
- [ ] Teks NDA notice tampil hanya pada proyek yang `isNda` bernilai `true`.
- [ ] Drawer dapat ditutup dengan swipe down (mobile) atau klik area luar/tombol tutup (desktop).
- [ ] Tidak ada error tipe pada kompilasi TypeScript.
- [ ] Tidak ada regresi pada tampilan daftar proyek.
