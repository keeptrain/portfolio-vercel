# Issue #07: Perbaikan Sinkronisasi Bahasa pada Server Components saat Switch Language

## 1. Ringkasan Masalah & Sasaran Tugas

Saat pengguna mengganti bahasa melalui komponen pengalih bahasa (Language Switcher pada Footer atau Navigasi), teks pada **Client Components** (seperti navigasi dan form) berhasil berganti bahasa, namun teks pada **Server Components** (seperti Bento Intro Card, Bento Learning Card, dan Bento Project Card) **tidak ikut berubah** atau tetap menampilkan bahasa default (Inggris).

Tujuan dari tugas ini adalah:
1. Memperbaiki alur inisialisasi locale di tingkat Server Components agar selalu sinkron dengan parameter URL aktif tanpa race condition.
2. Memastikan setiap entry point halaman (seperti file halaman utama) secara eksplisit mendaftarkan locale aktif sebelum komponen anak di-render.
3. Mengoptimalkan mekanisme navigasi pergantian bahasa agar memicu re-render server secara penuh dan responsif, terutama pada interaksi mobile.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Pendekatan**: Mobile-First Thinking & Server-First Consistency.
- **Batasan Khusus**: 
  - Tidak menggunakan library pihak ketiga tambahan.
  - Mempertahankan arsitektur i18n yang sudah dibangun berbasis utilitas internal.
  - Penjelasan instruksi bersifat deskriptif prosedural tanpa menyertakan blok kode mentah.

---

## 3. Analisis Penyebab Utama (Root Cause)

Masalah ini terjadi karena beberapa faktor teknis di Next.js App Router:

### A. Eksekusi Asinkron & Paralel antara Layout dan Page
Pada Next.js App Router, komponen layout dan komponen halaman dieksekusi secara asinkron dan paralel di server. Ketika halaman utama langsung di-ekspor tanpa menangkap parameter bahasa dan tanpa memanggil fungsi penetapan locale aktif, komponen-komponen server di dalam halaman tersebut dieksekusi sebelum layout selesai membaca parameter URL. Akibatnya, fungsi penerjemah server membaca nilai default bahasa Inggris dari memori cache.

### B. Ketiadaan Parameter Handler di Halaman Utama
File halaman utama pada rute dinamis bahasa saat ini tidak menangani pembacaan parameter rute secara langsung. Tanpa adanya pembacaan parameter di tingkat halaman, halaman tidak dapat memastikan bahwa konteks bahasa untuk seluruh komponen server turunannya sudah terkonfigurasi dengan tepat.

### C. Mekanisme Router Cache pada Navigasi Client
Navigasi rute bawaan pada aplikasi web modern menyimpan cache halaman di sisi peramban (client router cache). Saat berpindah antar bahasa tanpa instruksi penyegaran rute yang tepat, peramban dapat menampilkan tampilan server yang tersimpan di cache lokal peramban alih-alih meminta tampilan baru dari server.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 4 tahapan sistematis agar dapat diimplementasikan dengan aman:

### Tahap 1: Pemulihan dan Penguatan Handler Parameter pada Halaman Utama
1. Buka file halaman utama pada rute dinamis bahasa di direktori rute aplikasi.
2. Ubah fungsi halaman utama agar bersifat asinkron dan menerima properti parameter rute dari Next.js.
3. Lakukan resolusi terhadap parameter rute untuk mendapatkan nilai bahasa yang sedang aktif pada URL (misalnya bahasa Indonesia atau Inggris).
4. Panggil fungsi penetapan locale aktif yang sudah tersedia pada modul server i18n sebelum merender komponen landing page.
5. Teruskan proses render komponen landing page dengan jaminan bahwa konteks bahasa server sudah terpasang.

### Tahap 2: Penguatan Komponen Induk Landing Page
1. Buka file komponen landing page di direktori fitur landing.
2. Pastikan komponen landing page dapat menerima nilai bahasa aktif sebagai properti opsional atau membaca langsung dari modul server.
3. Pastikan tidak ada dependensi tersembunyi yang mengunci bahasa pada nilai statis.
4. Periksa seluruh kartu server di dalam bento grid untuk memastikan semuanya memanggil fungsi penerjemah server di dalam tubuh fungsinya masing-masing.

### Tahap 3: Penyempurnaan Mekanisme Komponen Pengalih Bahasa (Language Switcher)
1. Buka file komponen pengalih bahasa pada folder tombol antarmuka pengguna.
2. Periksa logika pembentukan URL tujuan ketika pengguna menekan tombol ganti bahasa:
   - Pastikan URL baru mengganti segmen bahasa lama dengan segmen bahasa baru secara akurat.
   - Pastikan parameter pencarian (query parameters) dan hash posisi halaman tetap terjaga.
3. Pastikan interaksi tombol ramah perangkat sentuh (touch target nyaman minimal 44 piksel) dan memberikan umpan balik visual instan saat ditekan di layar ponsel.
4. Tambahkan penyegaran rute halus jika diperlukan agar peramban segera meminta payload tampilan server terbaru dari URL bahasa yang baru.

### Tahap 4: Pengujian & Validasi Menyeluruh
1. Buka peramban dan jalankan server pengembangan lokal.
2. Uji alur pergantian bahasa dari rute bahasa Inggris ke rute bahasa Indonesia melalui tombol di bagian footer:
   - Periksa apakah teks pada kartu intro dan kartu fokus pembelajaran di bento grid langsung berubah ke bahasa Indonesia.
   - Periksa apakah teks pada navigasi, tombol, dan formulir juga berubah secara serempak.
3. Uji kembali pergantian dari bahasa Indonesia ke bahasa Inggris.
4. Lakukan pengujian pada resolusi layar ponsel untuk memastikan transisi tata letak vertikal tetap rapi tanpa pergeseran elemen yang kasar.
5. Jalankan pemeriksaan tipe TypeScript untuk memastikan tidak ada kesalahan kontrak tipe data.

---

## 5. Kriteria Penerimaan (Definition of Done)

- [ ] Saat berganti bahasa melalui tombol switcher, seluruh teks pada Server Components (Bento Intro Card, Bento Learning Card, dsb.) langsung berganti bahasa sesuai URL aktif.
- [ ] Seluruh Client Components tetap berganti bahasa secara harmonis dan reaktif.
- [ ] File halaman utama pada rute dinamis secara eksplisit menangani parameter rute dan menetapkan locale server sebelum render.
- [ ] Navigasi pergantian bahasa tidak menyebabkan halaman ter-reset ke posisi yang salah atau kehilangan parameter URL.
- [ ] Tampilan dan interaksi tombol switcher berfungsi mulus pada viewport mobile maupun desktop.
- [ ] Tidak ada error tipe pada kompilasi TypeScript.
- [ ] Tidak ada regresi atau kerusakan pada fungsionalitas lain.
