# Issue #13: Refactor ProjectDetailDrawer Menjadi Single Drawer Terpusat Berbasis Local State

## 1. Ringkasan Masalah & Sasaran Tugas

Saat ini, implementasi `ProjectDetailDrawer` dibungkus langsung di dalam komponen `ProjectAdapter`. Akibatnya, ketika daftar proyek di-render menggunakan perulangan (*loop* array `projectsData`), aplikasi akan membuat banyak instans (*multiple instances*) komponen Drawer beserta overlay, portal, dan elemen kontennya di dalam memori DOM sebanyak jumlah proyek yang ada.

Pola ini menimbulkan beberapa masalah:
- **Penumpukan Elemen DOM (DOM Bloat)**: Setiap item proyek membawa komponen Drawer lengkapnya sendiri yang tidak efisien.
- **Keterikatan Komponen (Tight Coupling)**: Komponen `ProjectAdapter` yang seharusnya hanya bertugas menampilkan ringkasan kartu proyek menjadi terikat erat dengan logika modal Drawer.
- **Manajemen State Tersebar**: Sulit mengontrol status pembukaan drawer secara terpusat atau menambahkan animasi transisi yang mulus.

Tujuan dari tugas ini adalah:
1. Mengubah arsitektur Drawer menjadi **Single Drawer (Satu Drawer Tunggal)** yang diletakkan di luar perulangan daftar proyek.
2. Menggunakan **Local State** untuk menyimpan data proyek yang sedang dipilih atau aktif.
3. Menjadikan `ProjectAdapter` murni sebagai komponen kartu presentasi yang memicu pemilihan proyek saat diklik.
4. Memastikan pengalaman pengguna di mobile maupun desktop tetap mulus, cepat, dan hemat memori peramban.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui Drawer.
- **Pendekatan**: Mobile-First Thinking, Clean Architecture, Single Instance Modal Pattern.
- **Batasan Khusus**:
  - Tidak mengubah tampilan visual atau data detail proyek yang sudah ada.
  - Penjelasan instruksi bersifat deskriptif prosedural tanpa menyertakan blok kode mentah.
  - Satu instans Drawer terpusat melayani seluruh item proyek pada halaman atau section.

---

## 3. Analisis Kondisi Saat Ini

### A. Redundansi Instans Drawer di dalam Loop
Di dalam `ProjectAdapter.tsx`, elemen visual kartu dibungkus langsung oleh `ProjectDetailDrawer`. Ketika halaman memiliki 10 atau 20 proyek, sistem me-render 10 sampai 20 komponen Drawer yang tidak aktif secara bersamaan di dalam DOM.

### B. Kurangnya Pemisahan Tanggung Jawab (Separation of Concerns)
`ProjectAdapter` seharusnya hanya bertanggung jawab atas tata letak kartu (thumbnail, judul, daftar teknologi). Menanamkan seluruh modal Drawer di dalamnya membuat komponen ini terlalu berat dan sulit digunakan kembali di tempat lain yang mungkin tidak membutuhkan Drawer.

### C. Alur yang Lebih Ideal
Pola standar industri untuk modal/drawer detail adalah:
- Komponen daftar (*list container*) menyimpan state proyek terpilih (misalnya nilai awal kosong atau null).
- Ketika kartu proyek diklik, state proyek terpilih diperbarui dengan data proyek yang diklik.
- Satu Drawer tunggal di luar loop membaca state tersebut dan terbuka menampilkan detail proyek yang dipilih.
- Ketika Drawer ditutup, state dikembalikan menjadi kosong atau null.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 5 tahapan sistematis:

### Tahap 1: Refactor Komponen ProjectAdapter Menjadi Pure Presenter
1. Buka file `src/features/projects/components/ProjectAdapter.tsx`.
2. Hapus pembungkus `ProjectDetailDrawer` dari dalam komponen ini.
3. Tambahkan properti aksi klik (misalnya fungsi callback ketika kartu diklik) ke dalam interface properti `ProjectAdapter`.
4. Pasang fungsi callback tersebut pada pembungkus kartu utama agar saat pengguna mengetuk atau mengklik kartu, fungsi tersebut terpanggil dengan membawa data proyek yang bersangkutan.
5. Pastikan efek kursor pointer dan transisi hover visual tetap aktif dan nyaman di layar sentuh mobile.

### Tahap 2: Refactor Komponen ProjectDetailDrawer Menjadi Controlled Drawer
1. Buka file `src/features/projects/components/ProjectDetailDrawer.tsx`.
2. Hapus ketergantungan pada `DrawerTrigger` anak di dalam komponen ini.
3. Ubah komponen agar menerima properti kontrol dari induk:
   - Data proyek yang sedang aktif (dapat bernilai objek proyek atau null).
   - Status terbuka atau tertutup (boolean).
   - Fungsi callback penanganan ketika status drawer berubah atau ditutup.
4. Hubungkan status buka/tutup dan event penutupan tersebut ke properti kontrol komponen `Drawer` dari shadcn/ui.
5. Berikan pengecekan proteksi: jika data proyek yang aktif bernilai null atau belum terpilih, komponen tidak merender isi konten agar tidak terjadi error pembacaan data.

### Tahap 3: Buat Komponen Pembungkus Daftar Proyek Interaktif (ProjectList / ProjectsSection)
1. Buat komponen Client Component baru (misalnya `ProjectList.tsx`) di dalam direktori `src/features/projects/components/`.
2. Di dalam komponen ini, sediakan local state menggunakan React state untuk menampung data proyek yang sedang dipilih pengguna (dengan nilai awal null).
3. Buat fungsi bantuan untuk membuka detail (mengisi state dengan proyek yang diklik) dan menutup detail (mengosongkan state proyek).
4. Render perulangan daftar kartu menggunakan `ProjectAdapter`, di mana setiap kartu meneruskan fungsi pemilihan proyek saat diklik.
5. Letakkan **satu instans tunggal** `ProjectDetailDrawer` tepat di bawah daftar perulangan kartu, dihubungkan dengan local state proyek terpilih.

### Tahap 4: Integrasikan ke ProjectsPage dan Landing Page
1. Buka file `src/features/projects/ProjectsPage.tsx`.
2. Ganti perulangan langsung di halaman dengan memanggil komponen `ProjectList` yang baru dibuat, dengan meneruskan data proyek dari modul data.
3. Buka file `src/features/landing/components/IBuildStuff.tsx`.
4. Lakukan penyesuaian serupa agar bagian proyek di landing page juga menggunakan mekanisme satu drawer terpusat.

### Tahap 5: Pengujian & Validasi Menyeluruh
1. Buka aplikasi di peramban pada mode mobile (viewport 360px–414px).
2. Ketuk proyek pertama (misalnya SIM — ORS):
   - Pastikan drawer muncul dengan animasi mulus dari bawah.
   - Pastikan data yang tampil sesuai dengan proyek pertama.
   - Tutup drawer dengan swipe down atau tap overlay.
3. Ketuk proyek kedua (misalnya JakReq):
   - Pastikan drawer terbuka kembali dengan data proyek kedua yang akurat tanpa menampilkan data lama.
4. Buka DevTools Elements: periksa bahwa hanya ada 1 instans overlay/portal drawer di dalam DOM tree.
5. Uji pada layar desktop untuk memastikan responsivitas layout dua kolom di dalam drawer tetap bekerja sempurna.
6. Jalankan pemeriksaan tipe TypeScript untuk memastikan tidak ada kesalahan kontrak tipe data.

---

## 5. Struktur Komponen Setelah Refactor

```
src/features/projects/
├── ProjectsPage.tsx                 ← Server Component (induk halaman)
├── data/
│   └── projects.ts                  ← Sumber data dan tipe Project
├── components/
│   ├── ProjectAdapter.tsx           ← Pure UI Presenter (menerima data + onSelect)
│   ├── ProjectDetailDrawer.tsx      ← Controlled Single Drawer (menerima selectedProject + onClose)
│   ├── ProjectList.tsx              ← [NEW] Client Component (mengelola local state selectedProject)
│   └── ProjectFilterBar.tsx         ← Client Component filter
```

---

## 6. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/features/projects/components/ProjectAdapter.tsx` | MODIFY | Hapus pembungkus drawer, jadikan pure presenter dengan callback klik |
| `src/features/projects/components/ProjectDetailDrawer.tsx` | MODIFY | Ubah menjadi controlled drawer berbasis properti selectedProject dan onClose |
| `src/features/projects/components/ProjectList.tsx` | NEW | Komponen client pengelola local state yang me-render loop adapter dan 1 single drawer |
| `src/features/projects/ProjectsPage.tsx` | MODIFY | Gunakan komponen `ProjectList` terpusat |
| `src/features/landing/components/IBuildStuff.tsx` | MODIFY | Sesuaikan pemanggilan list proyek agar menggunakan single drawer |

---

## 7. Kriteria Penerimaan (Definition of Done)

- [ ] Komponen `ProjectDetailDrawer` hanya di-render satu kali sebagai Single Drawer di luar perulangan daftar proyek.
- [ ] Komponen `ProjectAdapter` murni bertindak sebagai presenter visual tanpa membungkus drawer di dalamnya.
- [ ] State proyek yang sedang aktif dikelola melalui local state pada komponen induk pembungkus list.
- [ ] Saat salah satu kartu proyek diklik, Drawer terbuka menampilkan data proyek yang tepat secara reaktif.
- [ ] Saat Drawer ditutup, state dibersihkan tanpa meninggalkan jejak atau lag pada DOM.
- [ ] Hanya ada satu instans Drawer/Portal yang aktif di DOM pada satu waktu.
- [ ] Tampilan responsif pada mobile (1 kolom) dan desktop (2 kolom) tetap berfungsi normal dan estetik.
- [ ] Tidak ada error tipe pada kompilasi TypeScript.
- [ ] Tidak ada regresi fungsionalitas di halaman `/projects` maupun landing page.
