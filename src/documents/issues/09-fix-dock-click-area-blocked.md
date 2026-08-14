# Issue #09: Perbaikan Area Klik pada Floating Dock (BottomNav) yang Terhalang Elemen Lain

## 1. Ringkasan Masalah & Sasaran Tugas

Saat ini, area klik pada komponen `BottomNav` (Floating Dock) tidak berfungsi dengan baik di beberapa bagian. Pengguna tidak dapat menekan tombol navigasi tertentu karena area kliknya terhalang oleh elemen lain yang memiliki z-index lebih tinggi atau area yang lebih luas, kemungkinan besar berasal dari komponen `NavBar.tsx` (top navigation bar).

Tujuan dari tugas ini adalah:
1. Mengidentifikasi elemen mana yang menghalangi area klik pada floating dock.
2. Memperbaiki tumpukan z-index dan area interaksi agar floating dock selalu dapat diklik di semua sisi dan posisi.
3. Memastikan tidak ada elemen transparan atau tak terlihat yang menutupi area interaksi dock.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Pendekatan**: Mobile-First Thinking.
- **Batasan Khusus**:
  - Tidak mengubah struktur navigasi utama secara drastis.
  - Hanya memperbaiki tumpang tindih z-index dan area pointer events.
  - Instruksi deskriptif prosedural tanpa menyertakan blok kode mentah.

---

## 3. Analisis Penyebab Masalah

### A. Konflik Z-Index antara NavBar dan BottomNav
Komponen `NavBar.tsx` (navigasi atas) kemungkinan menggunakan posisi `fixed` atau `sticky` dengan z-index yang sama atau lebih tinggi dari `BottomNav`. Jika area elemen navbar membentang hingga ke bagian bawah layar (misalnya karena padding, margin, atau ukuran elemen yang tidak dibatasi), maka elemen navbar yang transparan dapat menutupi area klik dock.

### B. Elemen Tak Terlihat yang Menutupi Dock
Beberapa pola umum yang menyebabkan masalah ini:
- Elemen pembungkus navbar memiliki tinggi penuh layar (`h-screen` atau `h-full`) yang membentang dari atas sampai bawah.
- Elemen overlay atau backdrop dari menu mobile yang tersembunyi (`hidden` secara visual) tetapi masih aktif menerima pointer events.
- Elemen dengan `pointer-events-auto` yang tidak sengaja menutupi area dock.

### C. Area Klik Dock Terlalu Kecil
Item navigasi pada dock mungkin memiliki padding atau ukuran sentuh yang terlalu kecil, terutama pada area di sekitar tepi pill/badge aktif.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 4 tahapan sistematis:

### Tahap 1: Identifikasi Elemen Penghalang Menggunakan Browser DevTools
1. Buka aplikasi di browser dan navigasikan ke halaman utama.
2. Buka Developer Tools (klik kanan, pilih Inspect).
3. Gunakan fitur "Select an element" (ikon panah kursor di pojok kiri atas DevTools).
4. Arahkan kursor ke area dock yang tidak bisa diklik.
5. Perhatikan elemen apa yang ter-highlight — jika yang ter-highlight bukan dock melainkan elemen navbar atau elemen lain, maka itulah elemen penghalangnya.
6. Catat nama kelas, z-index, dan dimensi elemen penghalang tersebut.

### Tahap 2: Perbaiki Tumpukan Z-Index
1. Buka file `src/components/NavBar.tsx`.
2. Periksa elemen pembungkus terluar yang menggunakan posisi `fixed` atau `sticky`.
3. Pastikan z-index navbar **lebih rendah** dari z-index floating dock. Jika dock menggunakan `z-50`, maka navbar sebaiknya menggunakan `z-40` atau lebih rendah.
4. Buka file `src/components/BottomNav.tsx`.
5. Pastikan elemen `<nav>` pembungkus menggunakan z-index yang cukup tinggi (minimal `z-50`).

### Tahap 3: Batasi Area Interaksi Elemen Penghalang
1. Jika elemen navbar memiliki tinggi yang membentang penuh layar (misalnya untuk mendukung menu overlay mobile), tambahkan kelas `pointer-events-none` pada elemen pembungkus navbar yang tidak sedang aktif.
2. Pastikan hanya elemen-elemen interaktif di dalam navbar (tombol, tautan) yang memiliki `pointer-events-auto`.
3. Periksa apakah ada elemen overlay atau backdrop tersembunyi yang masih menerima pointer events meskipun tidak terlihat. Jika ada, tambahkan `pointer-events-none` saat elemen tersebut dalam keadaan tersembunyi.
4. Pastikan elemen pembungkus navbar memiliki tinggi yang sesuai dengan kontennya (jangan menggunakan `h-screen` jika tidak diperlukan).

### Tahap 4: Perbesar Area Sentuh pada Item Dock
1. Buka file `src/components/BottomNav.tsx`.
2. Pada setiap elemen `Link` item navigasi, pastikan memiliki area sentuh minimal 44 piksel x 44 piksel sesuai pedoman aksesibilitas.
3. Gunakan padding yang memadai (misalnya `p-3` untuk item non-aktif) agar area sentuh cukup luas.
4. Pastikan tidak ada elemen anak di dalam item navigasi yang memiliki `pointer-events-none` yang mengurangi area klik efektif.

---

## 5. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/components/BottomNav.tsx` | MODIFY | Naikkan z-index, perbesar area sentuh item navigasi |
| `src/components/NavBar.tsx` | MODIFY | Turunkan z-index, batasi tinggi elemen, tambahkan pointer-events-none pada area non-interaktif |

---

## 6. Kriteria Penerimaan (Definition of Done)

- [ ] Semua item navigasi pada floating dock dapat diklik di semua sisi dan posisi layar.
- [ ] Tidak ada elemen tak terlihat yang menghalangi area klik dock (terverifikasi via DevTools).
- [ ] Z-index dock lebih tinggi dari elemen navbar dan elemen tetap lainnya.
- [ ] Area sentuh setiap item navigasi minimal 44x44 piksel.
- [ ] Menu overlay atau backdrop navbar tidak mengganggu interaksi dock saat dalam keadaan tersembunyi.
- [ ] Interaksi klik/tap berfungsi mulus di perangkat mobile (sentuh) maupun desktop (kursor).
- [ ] Tidak ada error tipe pada kompilasi TypeScript.
- [ ] Tidak ada regresi pada fungsionalitas navbar dan navigasi yang sudah ada.
