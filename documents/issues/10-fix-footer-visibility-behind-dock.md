# Issue #10: Perbaikan Footer agar Terlihat saat Scroll Mencapai Bagian Bawah Konten

## 1. Ringkasan Masalah & Sasaran Tugas

Saat ini komponen `Footer` tidak terlihat atau tertutupi ketika pengguna menggulir halaman hingga ke bagian paling bawah konten. Kemungkinan penyebab utamanya adalah floating dock (`BottomNav`) yang menempati posisi `fixed` di bagian bawah layar menutupi sebagian atau seluruh area footer, atau konten halaman tidak memiliki ruang tambahan (padding bawah) yang cukup untuk mengakomodasi keberadaan dock.

Tujuan dari tugas ini adalah:
1. Memastikan footer sepenuhnya terlihat dan dapat dibaca saat pengguna menggulir halaman hingga ke bagian paling bawah.
2. Menambahkan ruang kosong (spacing) yang cukup di bagian bawah konten utama agar footer tidak tertutup oleh floating dock.
3. Mempertahankan pengalaman visual yang mulus di mana footer tampil di bawah konten dan dock melayang di atasnya tanpa menutupi informasi penting.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Pendekatan**: Mobile-First Thinking.
- **Batasan Khusus**:
  - Tidak mengubah posisi atau perilaku dasar floating dock.
  - Tidak mengubah desain visual footer secara signifikan.
  - Instruksi deskriptif prosedural tanpa menyertakan blok kode mentah.

---

## 3. Analisis Penyebab Masalah

### A. Footer Tertutup oleh Floating Dock
Floating dock menggunakan posisi `fixed` di bagian bawah layar. Karena elemen `fixed` dikeluarkan dari alur normal dokumen, dock tidak mendorong konten di bawahnya. Akibatnya, baris terakhir footer (yang berisi informasi copyright, tombol pengalih bahasa, dan pengalih tema) tertutup oleh dock saat pengguna menggulir ke paling bawah.

### B. Tidak Ada Padding Bawah pada Konten Utama atau Footer
Elemen `<main>` atau elemen `<footer>` tidak memiliki margin atau padding bawah yang cukup untuk memperhitungkan tinggi dock. Sehingga konten footer berakhir tepat di tepi bawah layar, yang kemudian tertutup oleh dock yang menempel di posisi yang sama.

### C. Tinggi Dock Bervariasi per Breakpoint
Tinggi visual dock mungkin berbeda antara mobile dan desktop (karena ukuran ikon, padding, dan jarak bawah yang berbeda). Padding bawah pada footer perlu menyesuaikan dengan tinggi dock di setiap breakpoint.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 4 tahapan sistematis:

### Tahap 1: Ukur Tinggi Efektif Floating Dock
1. Buka aplikasi di browser pada tampilan mobile.
2. Gunakan Developer Tools untuk mengukur tinggi total elemen dock termasuk padding bawah (safe area).
3. Catat tinggi total dock pada mobile (misalnya sekitar 80-100 piksel termasuk padding).
4. Ulangi pengukuran pada tampilan desktop. Catat tinggi total dock pada desktop (biasanya sedikit lebih kecil karena padding bawah yang berbeda).

### Tahap 2: Tambahkan Padding Bawah pada Footer
1. Buka file `src/components/Footer.tsx`.
2. Pada elemen pembungkus terluar `<footer>`, tambahkan padding bawah yang cukup agar konten footer tidak tertutup dock:
   - Pada mobile: tambahkan padding bawah yang setara atau sedikit lebih besar dari tinggi total dock mobile (misalnya `pb-28` atau `pb-32`).
   - Pada desktop: sesuaikan padding bawah dengan tinggi dock desktop yang mungkin berbeda (misalnya `md:pb-24`).
3. Pastikan padding bawah ini diterapkan di **dalam** elemen footer, bukan di luar, agar background footer tetap membentang hingga ke area padding.

### Tahap 3: Alternatif — Tambahkan Spacer pada Layout
1. Jika menambahkan padding langsung di footer tidak memberikan hasil yang diinginkan, buka file `src/app/[locale]/layout.tsx`.
2. Tambahkan elemen spacer (elemen kosong dengan tinggi tertentu) di antara komponen `Footer` dan komponen `BottomNav` pada layout.
3. Elemen spacer ini berfungsi sebagai ruang kosong transparan yang mendorong footer ke atas agar kontennya tidak tertutup dock.
4. Sesuaikan tinggi spacer per breakpoint: tinggi yang lebih besar untuk mobile, sedikit lebih kecil untuk desktop.

### Tahap 4: Pengujian Visual di Berbagai Ukuran Layar
1. Buka aplikasi di browser dan navigasikan ke halaman utama.
2. Gulir hingga ke bagian paling bawah halaman.
3. Periksa apakah seluruh konten footer (copyright, lokasi, waktu Jakarta, tombol "Back to Top", pengalih bahasa, pengalih tema, logo tanda tangan) terlihat sepenuhnya di atas dock.
4. Ulangi pengujian pada viewport mobile (360px, 390px, 414px).
5. Ulangi pengujian pada viewport tablet (768px).
6. Ulangi pengujian pada viewport desktop (1024px, 1440px).
7. Pastikan pada semua ukuran layar, baris terakhir footer tidak terpotong atau tertutup oleh dock.

---

## 5. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/components/Footer.tsx` | MODIFY | Tambahkan padding bawah responsif agar konten tidak tertutup dock |
| `src/app/[locale]/layout.tsx` | MODIFY (opsional) | Tambahkan elemen spacer di antara Footer dan BottomNav jika diperlukan |

---

## 6. Kriteria Penerimaan (Definition of Done)

- [ ] Seluruh konten footer (copyright, lokasi, waktu, tombol, pengalih bahasa dan tema, logo tanda tangan) terlihat sepenuhnya saat halaman digulir ke paling bawah.
- [ ] Footer tidak tertutup oleh floating dock pada viewport mobile (360px–414px).
- [ ] Footer tidak tertutup oleh floating dock pada viewport tablet (768px).
- [ ] Footer tidak tertutup oleh floating dock pada viewport desktop (1024px–1440px).
- [ ] Tidak ada ruang kosong berlebihan yang mengganggu estetika halaman.
- [ ] Padding bawah menyesuaikan secara responsif dengan tinggi dock per breakpoint.
- [ ] Tidak ada error tipe pada kompilasi TypeScript.
- [ ] Tidak ada regresi pada tampilan footer atau dock yang sudah ada.
