# Issue #15: Peningkatan Performa, Struktur Kode, Aksesibilitas, dan Layouting pada Fitur Projects

## 1. Ringkasan Masalah & Sasaran Tugas

Modul fitur proyek (`src/features/projects/`) merupakan salah satu bagian inti dari portofolio yang menampilkan daftar karya dan rincian pekerjaan. Meskipun komponen dasar dan single drawer telah terintegrasi, masih terdapat beberapa area perbaikan kritis terkait performa rendering gambar, struktur semantik HTML, aksesibilitas navigasi keyboard, sinkronisasi filter, serta kenyamanan tata letak (*layouting*) di layar sentuh mobile.

Masalah-masalah yang ditemukan meliputi:
- **Performa & Optimalisasi Gambar (Next/Image)**: Thumbnail kartu proyek belum diatur secara optimal untuk mencegah Cumulative Layout Shift (CLS). Gambar item teratas (di atas lipatan layar / *above-the-fold*) belum memiliki prioritas preloading, sementara atribut ukuran responsif (*sizes*) masih dapat disempurnakan.
- **Aksesibilitas & Semantik Web (A11y)**: Kartu proyek pada `ProjectAdapter` masih menggunakan elemen generik non-interaktif tanpa atribut aksesibilitas, label peran tombol dialog, ataupun penanganan navigasi keyboard (tombol Enter / Spasi) untuk pengguna pembaca layar (*screen reader*).
- **Struktur Kode & Filter Terputus**: Komponen `ProjectFilterBar` memiliki state lokal mandiri yang belum terhubung dengan daftar data di `ProjectList`, sehingga tombol penyortiran atau penyaringan belum memberikan dampak nyata pada data yang tampil.
- **Tata Letak Mobile-First & Hierarki Tipografi**: Pada layar smartphone berukuran kecil (lebar di bawah 380px), proporsi antara thumbnail, deretan lencana teknologi, dan judul proyek memerlukan penataan padding dan ukuran teks yang lebih proporsional agar tidak terjadi pemotongan teks atau desakan elemen.

Tujuan dari tugas ini adalah:
1. Meningkatkan skor performa Core Web Vitals (terutama LCP dan CLS) melalui konfigurasi kontainer aspek rasio dan prioritas pemuatan gambar.
2. Mengubah struktur markup kartu proyek menjadi semantik berbasis daftar interaktif yang ramah aksesibilitas dan navigasi keyboard.
3. Menyambungkan fungsionalitas penyaringan/pengurutan antara bar filter dan daftar proyek agar interaktif secara reaktif.
4. Menyempurnakan tata letak kartu dan drawer detail agar terasa nyaman, proporsional, dan estetik di seluruh ukuran layar mulai dari ponsel kecil hingga monitor desktop lebar.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router, Next/Image), TypeScript, Tailwind CSS, shadcn/ui Drawer, Lucide Icons.
- **Pendekatan**: Mobile-First Thinking, Accessibility-First (WCAG AA), Clean Component Architecture.
- **Batasan Khusus**:
  - Instruksi ditulis secara deskriptif prosedural tanpa menyertakan contoh blok kode.
  - Mempertahankan integritas data proyek yang tersimpan di dalam modul data proyek.
  - Memastikan transisi animasi drawer tetap mulus dan tidak terganggu oleh perubahan layout.

---

## 3. Analisis Kebutuhan Peningkatan

### A. Performa & Optimasi Gambar
1. **Aspek Rasio Stabil**: Bungkus thumbnail gambar dalam kontainer dengan aspek rasio tetap (seperti rasio 16:10 atau 4:3) untuk mengeliminasi lonjakan layout saat gambar selesai dimuat.
2. **Prioritas Item Pertama**: Proyek urutan pertama yang langsung terlihat saat halaman dibuka harus diberi prioritas pemuatan tinggi (priority), sedangkan item di bawahnya menggunakan pemuatan bertahap (lazy loading).
3. **Penyempurnaan Atribut Sizes**: Sesuaikan string deskripsi ukuran gambar pada Next/Image agar peramban mengunduh resolusi file terkecil yang paling cocok untuk layar ponsel pengguna.

### B. Semantik & Aksesibilitas (A11y)
1. **Elemen Semantik Daftar**: Ubah kontainer pembungkus daftar proyek menjadi elemen daftar tak berurut (`ul` dan `li`) dengan peran semantik yang tepat.
2. **Interaktivitas Keyboard**: Jadikan kartu proyek dapat difokuskan melalui tombol Tab, memiliki indikator fokus cincin (*focus ring*) yang jelas, dan merespons penekanan tombol Enter serta Spasi untuk membuka modal Drawer.
3. **Label Aksesibilitas**: Sematkan atribut informasi yang menerangkan bahwa kartu ini berfungsi sebagai pembuka jendela dialog detail proyek.

### C. Fungsionalitas Filter & Integrasi State
1. **Integrasi Baris Filter**: Hubungkan pilihan filter (misalnya pengurutan proyek terbaru/terlama atau penyaringan berdasarkan kategori) ke dalam state daftar proyek.
2. **Kategori yang Terstruktur**: Pastikan tipe kategori pada data proyek mendukung opsi penyaringan dinamis.
3. **Umpan Balik Visual Filter**: Berikan indikator visual aktif yang jelas dan kontras pada tombol filter yang sedang dipilih.

### D. Tata Letak Mobile-First & Drawer Detail
1. **Ergonomi Layar Sentuh Mobile**:
   - Berikan ruang sentuh (*touch target*) minimal yang cukup pada kartu dan tombol.
   - Tata tag/badge teknologi dengan pembungkus flex-wrap yang rapi agar tidak meluap ke luar kartu.
   - Sesuaikan ukuran judul agar mudah dibaca sekilas pada layar genggam.
2. **Tampilan Drawer yang Informatif**:
   - Di dalam Drawer, sediakan tombol tindakan langsung (misalnya tautan menuju proyek langsung atau live demo) jika data URL tersedia.
   - Sediakan penanganan cadangan visual (*fallback visual*) yang elegan apabila proyek belum memiliki logo khusus.
   - Pastikan area konten drawer memiliki scrollbar yang nyaman dan tidak terpotong oleh sudut membulat drawer.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 5 tahapan sistematis:

### Tahap 1: Penguatan Tipe Data dan Logika Penyortiran
1. Buka file `src/features/projects/data/projects.ts`.
2. Periksa definisi interface proyek dan pastikan seluruh properti opsional (seperti logo, tautan live, status NDA, dan tahun) memiliki tipe data yang ketat.
3. Tambahkan konstanta atau fungsi pembantu untuk memudahkan penyortiran data proyek berdasarkan tahun terbaru maupun berdasarkan kategori.

### Tahap 2: Integrasi Komponen Filter dengan Komponen List
1. Buka file `src/features/projects/components/ProjectFilterBar.tsx`.
2. Ubah properti komponen agar menerima status filter aktif saat ini dan fungsi callback perubahan filter dari induknya.
3. Berikan penanda visual tombol aktif dengan kontras tinggi dan efek transisi yang mulus saat diketuk.
4. Buka file `src/features/projects/components/ProjectList.tsx`.
5. Kelola state penyortiran/penyaringan di dalam `ProjectList` (atau letakkan di wadah induk bersama `ProjectFilterBar`).
6. Lakukan penyaringan atau pengurutan array data proyek sebelum data tersebut dipetakan ke dalam elemen kartu.

### Tahap 3: Refactor Semantik, Aksesibilitas, dan Gambar pada ProjectAdapter
1. Buka file `src/features/projects/components/ProjectAdapter.tsx`.
2. Ubah elemen pembungkus terluar menjadi elemen interaktif yang memiliki indeks tab, peran tombol interaktif, label aksesibilitas deskriptif, dan penanganan event keyboard (tombol Enter dan Spasi).
3. Tambahkan kelas efek fokus cincin (*focus-visible ring*) agar pengguna navigasi keyboard melihat posisi fokus secara tegas.
4. Sesuaikan kontainer gambar Next/Image:
   - Gunakan rasio ukuran yang proporsional dan responsif.
   - Berikan penanda prioritas jika kartu berada di posisi urutan pertama.
   - Atur string atribut ukuran responsif (*sizes*) agar hemat bandwidth di jaringan seluler.
5. Rapikan tata letak informasi teks di samping thumbnail:
   - Tampilkan badge teknologi dengan ukuran teks mikro yang mudah dibaca dan tidak bertumpuk.
   - Terapkan pemenggalan teks yang aman agar judul panjang tidak merusak tata letak kartu.

### Tahap 4: Penyempurnaan Tata Letak dan Aksi di ProjectDetailDrawer
1. Buka file `src/features/projects/components/ProjectDetailDrawer.tsx`.
2. Periksa pembagian grid dua kolom pada desktop dan satu kolom tumpuk pada mobile.
3. Tambahkan bagian tautan aksi di bagian bawah drawer (misalnya tombol navigasi eksternal untuk mengunjungi demo atau studi kasus) dengan ikon indikator tautan eksternal.
4. Pastikan teks status NDA ditampilkan dengan lencana visual khusus yang informatif.
5. Pastikan area scroll konten memiliki padding bawah yang cukup agar konten terbawah tidak tertutup oleh area gesture navigation pada ponsel pintar.

### Tahap 5: Pengujian Responsif, Aksesibilitas, dan Performa
1. Buka aplikasi di peramban dan lakukan pengujian pada mode mobile (lebar 360px hingga 420px):
   - Ketuk tombol filter dan pastikan urutan kartu proyek berubah secara instan.
   - Navigasi menggunakan keyboard (tombol Tab + Enter) untuk memastikan drawer dapat dibuka dan ditutup tanpa menggunakan mouse/layar sentuh.
   - Periksa bahwa tidak ada pergeseran tata letak (CLS) saat gambar selesai diunduh.
2. Uji pada layar tablet dan desktop:
   - Pastikan kartu proyek memiliki hover state yang halus.
   - Pastikan Drawer tetap terbuka dengan lebar terkendali (*contained fit*) di bagian tengah layar desktop.
3. Jalankan pengecekan tipe TypeScript dan proses linter untuk memastikan tidak ada kesalahan kode atau impor yang tertinggal.

---

## 5. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/features/projects/data/projects.ts` | MODIFY | Perketat tipe data proyek dan sediakan fungsi bantuan sorting/filtering |
| `src/features/projects/components/ProjectFilterBar.tsx` | MODIFY | Terima props filter aktif dan callback pemicu perubahan filter |
| `src/features/projects/components/ProjectList.tsx` | MODIFY | Integrasikan state filter, semantik tag daftar `ul`/`li`, dan teruskan properti prioritas gambar |
| `src/features/projects/components/ProjectAdapter.tsx` | MODIFY | Tingkatkan aksesibilitas keyboard, perbaiki atribut Next/Image, dan optimasi tata letak teks responsif |
| `src/features/projects/components/ProjectDetailDrawer.tsx` | MODIFY | Tambahkan tombol aksi tautan proyek, lencana NDA, dan optimasi padding scroll mobile |

---

## 6. Kriteria Penerimaan (Definition of Done)

- [ ] Daftar kartu proyek menggunakan markup semantik daftar (`ul`/`li`) dan dapat diakses penuh melalui navigasi keyboard (Tab, Enter, Spasi).
- [ ] Gambar thumbnail memiliki kontainer aspek rasio stabil tanpa lonjakan layout (CLS) dan item pertama memiliki prioritas pemuatan (*priority*).
- [ ] Tombol penyaring/pengurut pada `ProjectFilterBar` terhubung secara reaktif dan berfungsi mengubah data yang ditampilkan pada `ProjectList`.
- [ ] Tampilan kartu di layar ponsel kecil (360px) tetap rapi, proporsional, dan tidak mengalami luapan teks (*overflow*).
- [ ] Drawer detail menyediakan informasi lengkap termasuk tautan eksternal (jika ada) serta status penanda NDA yang jelas.
- [ ] Tidak ada impor yang tidak terpakai atau dependensi redundan di seluruh file fitur proyek.
- [ ] Seluruh pengujian kompilasi TypeScript dan linting lulus tanpa pesan kesalahan.
