# Issue #08: Konversi BottomNav Menjadi Floating Dock Responsif untuk Mobile dan Desktop

## 1. Ringkasan Masalah & Sasaran Tugas

Saat ini komponen `BottomNav.tsx` hanya ditampilkan pada tampilan mobile (menggunakan kelas `md:hidden`), sehingga pada tampilan desktop (viewport lebar 768px ke atas) komponen ini sepenuhnya tersembunyi. Pengguna desktop tidak memiliki akses navigasi cepat yang setara dengan pengalaman pengguna mobile.

Tujuan dari tugas ini adalah:
1. Mengubah `BottomNav` dari navigasi mobile-only menjadi **Floating Dock** yang tampil di semua ukuran layar.
2. Pada mobile, dock menempel di bagian bawah layar dengan lebar yang ringkas dan padding bawah yang cukup untuk area aman (safe area).
3. Pada desktop, dock melayang di bagian bawah tengah layar dengan bentuk pill yang lebih kompak, efek kaca (glassmorphism), dan bayangan halus.
4. Memastikan satu komponen tunggal yang sama digunakan di mobile maupun desktop tanpa duplikasi.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Pendekatan**: Mobile-First Thinking.
- **Batasan Khusus**:
  - Tidak membuat komponen navigasi terpisah untuk desktop dan mobile.
  - Tidak menggunakan library animasi pihak ketiga (cukup Tailwind CSS transitions).
  - Instruksi deskriptif prosedural tanpa menyertakan blok kode mentah.

---

## 3. Analisis Kondisi Saat Ini

### A. Kelas Penyembunyi Desktop
Elemen `<nav>` pembungkus pada `BottomNav` saat ini memiliki kelas utilitas yang menyembunyikan komponen pada breakpoint `md` ke atas. Kelas ini perlu dihapus agar dock tampil di semua ukuran layar.

### B. Lebar dan Posisi Statis
Dock saat ini menggunakan posisi `fixed` yang menempel penuh di bagian kiri-kanan bawah layar (`right-0 left-0 bottom-0`). Untuk desktop, posisi ini perlu diubah menjadi terpusat secara horizontal menggunakan teknik `left-1/2` dengan `translate` negatif setengah, agar dock melayang di tengah.

### C. Bentuk dan Estetika
Saat ini dock memiliki sudut lengkung standar (`rounded-xl`). Pada desktop, bentuknya perlu diubah menjadi pill shape (`rounded-full`) agar terlihat lebih modern dan melayang secara estetik.

### D. Z-Index
Nilai z-index saat ini (`z-10`) mungkin bertabrakan dengan elemen lain seperti navbar utama. Perlu dinaikkan agar dock selalu berada di lapisan paling atas.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 4 tahapan sistematis:

### Tahap 1: Hapus Pembatas Visibilitas Desktop
1. Buka file `src/components/BottomNav.tsx`.
2. Temukan elemen `<nav>` pembungkus terluar.
3. Hapus kelas utilitas yang menyembunyikan komponen pada breakpoint medium ke atas (kelas `md:hidden`).
4. Pastikan elemen `<nav>` tetap menggunakan posisi `fixed` dan berada di bagian bawah layar.

### Tahap 2: Ubah Posisi Menjadi Terpusat di Semua Layar
1. Pada elemen `<nav>` pembungkus, hapus kelas `right-0 left-0` yang membuat dock membentang penuh secara horizontal.
2. Ganti dengan teknik pemusatan horizontal menggunakan kelas `left-1/2` dan transformasi `-translate-x-1/2` agar dock berada tepat di tengah layar.
3. Sesuaikan jarak bawah (bottom spacing):
   - Pada mobile: gunakan jarak bawah yang cukup untuk area aman perangkat (misalnya `bottom-4` atau `pb-8`).
   - Pada desktop: gunakan jarak bawah yang sedikit lebih besar agar terlihat melayang (misalnya `md:bottom-6`).

### Tahap 3: Sesuaikan Bentuk dan Efek Visual per Breakpoint
1. Pada elemen `<div>` pembungkus dalam (container pill), sesuaikan bentuk sudut:
   - Mobile: pertahankan `rounded-xl` agar nyaman di jempol.
   - Desktop: ubah menjadi `md:rounded-full` untuk tampilan pill shape yang lebih kompak.
2. Pastikan efek kaca (backdrop-blur) dan bayangan (shadow) tetap aktif di kedua ukuran layar.
3. Pertimbangkan untuk menambahkan padding horizontal yang sedikit lebih besar pada desktop (`md:px-4`) agar item navigasi tidak terlalu rapat.

### Tahap 4: Naikkan Z-Index dan Tambahkan Interaksi Desktop
1. Naikkan nilai z-index pada elemen `<nav>` dari `z-10` menjadi `z-50` agar dock selalu berada di atas semua konten termasuk modal dan overlay lainnya.
2. Pada setiap item navigasi, tambahkan efek hover yang lebih jelas untuk desktop:
   - Skala halus saat kursor melayang (`hover:scale-105`).
   - Transisi warna yang mulus dari warna redup ke warna terang.
3. Pastikan area klik setiap item navigasi cukup besar (minimal 44 piksel) untuk kenyamanan interaksi di desktop maupun mobile.

---

## 5. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/components/BottomNav.tsx` | MODIFY | Hapus `md:hidden`, ubah posisi menjadi terpusat, sesuaikan bentuk per breakpoint, naikkan z-index |
| `src/app/[locale]/layout.tsx` | VERIFY | Pastikan `BottomNav` tetap di-render di layout tanpa perubahan tambahan |

---

## 6. Kriteria Penerimaan (Definition of Done)

- [ ] Floating dock tampil di semua ukuran layar (mobile, tablet, desktop).
- [ ] Pada mobile, dock menempel di bawah dengan bentuk rounded-xl dan padding bawah area aman.
- [ ] Pada desktop, dock melayang di tengah bawah layar dengan bentuk pill (rounded-full).
- [ ] Efek kaca (glassmorphism) dan bayangan halus tampil di kedua ukuran layar.
- [ ] Z-index cukup tinggi sehingga dock tidak tertutup oleh elemen lain.
- [ ] Setiap item navigasi memiliki efek hover yang responsif pada desktop.
- [ ] Item navigasi aktif menampilkan label teks dengan animasi masuk yang mulus.
- [ ] Tidak ada error tipe pada kompilasi TypeScript.
- [ ] Tidak ada regresi pada fungsionalitas navigasi yang sudah ada.
