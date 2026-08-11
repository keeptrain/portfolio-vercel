# Issue #01: Implementasi Abstract Bento Grid Hero Section

## 1. Ringkasan Tugas
Membangun section pertama (Hero Section) pada halaman utama (Landing Page) dengan mengadopsi konsep **Abstract Bento Grid Layout**. Layout ini harus menggabungkan profil visual, perkenalan diri, showcase proyek terbaru, dan status pembelajaran teknologi saat ini ke dalam susunan kartu modular yang modern, dinamis, dan interaktif.

Implementasi **wajib mengutamakan pendekatan Mobile-First**, di mana tata letak dirancang rapi secara vertikal untuk layar ponsel sebelum diperluas menjadi grid asimetris multi-kolom pada tablet dan desktop.

---

## 2. Sasaran & Ruang Lingkup
- **Pendekatan Desain**: Mobile-First Responsive Design (Ponsel -> Tablet -> Desktop).
- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Lokasi Fitur**: Fitur landing page (`src/features/landing/`).
- **Aturan Implementasi**:
  - Mengikuti struktur komponen modular (pecah setiap kartu menjadi komponen mandiri).
  - Wajib mendukung Internationalization (i18n) untuk teks multi-bahasa.
  - Menggunakan utility class Tailwind CSS yang konsisten dengan tema desain portofolio.
  - Memperhatikan aspek aksesibilitas (semantic HTML, contrast, screen-reader friendly).

---

## 3. Spesifikasi Modul / Kartu Bento

Hero section ini terdiri dari 4 kartu utama dan 1 kartu pendukung visual pelengkap:

### A. Kartu 1: Intro & Value Proposition (Hero Intro Card)
- **Fungsi**: Titik fokus teks pertama saat pengunjung membuka halaman.
- **Konten & Informasi**:
  - Status ketersediaan (badge kecil beranimasi dot hijau, misal: *Available for freelance / full-time*).
  - Judul sapaan dan nama lengkap / nama panggilan.
  - Headline profesi dan spesialisasi utama (misal: *Full Stack Developer & UI/UX Enthusiast*).
  - Ringkasan tentang diri (1-2 kalimat pengantar singkat yang menarik).
  - Tombol aksi utama (CTA): Tombol kontak / resume dan tautan media sosial.
- **Karakter Visual**: Tipografi tegas, padding lapang, kontras teks tinggi.

### B. Kartu 2: Profile Image & Visual Avatar (Personal Visual Card)
- **Fungsi**: Menampilkan identitas visual kreator secara estetik dan tidak membosankan.
- **Konten & Informasi**:
  - Foto profil berkualitas tinggi atau ilustrasi avatar digital.
  - Efek visual latar belakang abstrak (gradien halus, pola grid geometris, atau glassmorphism).
  - Tag mini mengambang (floating chips) di sekitar foto, seperti lokasi saat ini atau bendera negara.
- **Karakter Visual**: Sudut membulat besar (*rounded-3xl*), overflow hidden, rasio visual yang seimbang.

### C. Kartu 3: Latest Project Showcase (Featured Work Card)
- **Fungsi**: Memperlihatkan hasil karya terbaik terkini secara langsung tanpa harus scroll ke bawah.
- **Konten & Informasi**:
  - Label penanda (badge: *Featured Project* atau *Latest Work*).
  - Nama proyek dan deskripsi singkat 1 kalimat.
  - Mockup visual atau thumbnail interaktif dari aplikasi/website proyek.
  - Kumpulan tag teknologi (Tech stack badges) yang digunakan pada proyek tersebut.
  - Tautan interaktif (External link icon) menuju live demo atau repository.
- **Karakter Visual**: Efek hover interaktif (kartu terangkat lembut, zoom gambar halus), tautan yang jelas.

### D. Kartu 4: "Currently Learning & Exploring" (Now / Tech Lab Card)
- **Fungsi**: Menunjukkan rasa ingin tahu, pertumbuhan skill teknis, dan eksplorasi teknologi terkini.
- **Konten & Informasi**:
  - Label kategori (misal: *Now Learning*, *In The Lab*, atau *Current Focus*).
  - Nama teknologi, bahasa, atau konsep yang sedang dipelajari secara aktif (misal: *AI Agents, Rust, WebGPU, Micro-frontends*).
  - Ikon atau logo teknologi yang sedang dieksplorasi.
  - Catatan singkat atau progress meter/status (misal: *Eksplorasi pembuatan tools berbasis LLM*).
  - Indikator denyut (pulsing beacon) untuk memberikan kesan aktif real-time.
- **Karakter Visual**: Aksen warna khusus yang menarik perhatian, border dengan highlight subtle.

### E. Kartu 5: Quick Tech Stack & Experience Stats (Supporting Card)
- **Fungsi**: Pelengkap estetika bento agar tata letak desktop seimbang dan asimetris proporsional.
- **Konten & Informasi**:
  - Statistik ringkas (misal: Jumlah tahun pengalaman, jumlah proyek selesai, atau deretan ikon stack utama).
  - Tombol cepat untuk eksplorasi lebih lanjut.
- **Karakter Visual**: Kompak, bersih, dan informatif.

---

## 4. Perilaku Responsivitas (Responsive Layout Blueprint)

### Tingkat 1: Mobile Viewport (< 640px)
- **Tata Letak**: Single column vertikal (1 Kolom penuh `grid-cols-1` atau flex vertikal).
- **Urutan Tampilan Konten (Visual Hierarchy)**:
  1. Kartu 1 (Intro & Headline) - Memberikan konteks siapa Anda secara instan.
  2. Kartu 2 (Profile Avatar) - Memperkuat persona visual setelah membaca perkenalan.
  3. Kartu 3 (Latest Project) - Menarik perhatian dengan bukti karya nyata.
  4. Kartu 4 (Currently Learning) - Menambah nilai unik dan keaktifan eksplorasi.
  5. Kartu 5 (Quick Stats / Tech Stack) - Penutup hero section.
- **Margin & Spacing**: Jarak antar kartu rapat dan nyaman di genggaman ponsel (`gap-4`), padding section proporsional (`p-4` atau `p-6`).

### Tingkat 2: Tablet Viewport (640px - 1024px)
- **Tata Letak**: 2 Kolom (`grid-cols-2`).
- **Distribusi Kartu**:
  - Kartu 1 (Intro) menempati 2 kolom penuh pada baris teratas sebagai header visual.
  - Kartu 2 (Avatar) dan Kartu 4 (Currently Learning) berada bersebelahan di baris kedua.
  - Kartu 3 (Latest Project) menempati 2 kolom penuh atau 1 kolom besar pada baris berikutnya.
  - Kartu 5 (Stats/Stack) melengkapi area sisa kolom.
- **Margin & Spacing**: `gap-5` atau `gap-6` dengan padding kontainer sedang.

### Tingkat 3: Desktop Viewport (> 1024px & 1280px+)
- **Tata Letak**: Multi-kolom Asimetris Bento Grid (3 Kolom atau 4 Kolom Matrix).
- **Distribusi Kartu Asimetris**:
  - **Baris 1**:
    - Kolom Kiri (2 Span): Kartu 1 (Intro & CTA Utama) dengan teks lapang dan tombol aksi.
    - Kolom Kanan (1 Span): Kartu 2 (Profile Image & Floating Tags) dengan tinggi menjangkau hingga baris bawah.
  - **Baris 2**:
    - Kolom Kiri (1 Span): Kartu 4 (Currently Learning Card) dengan kartu beraksen glow.
    - Kolom Tengah (1 Span): Kartu 5 (Quick Stats & Tech Icons).
    - Kolom Kanan (1 Span): Lanjutan/bagian Kartu 2 atau penyeimbang visual.
  - **Baris 3**:
    - Kolom Penuh (3 Span) atau Kolom Lebar (2 Span): Kartu 3 (Latest Project Showcase) dengan banner preview lebar horizontal.
- **Margin & Spacing**: `gap-6`, padding container desktop yang terpusat (`max-w-7xl mx-auto`).

---

## 5. Hirarki Struktur File & Komponen

Struktur modul yang direkomendasikan untuk implementasi bersih:

- Direktori Fitur: `src/features/landing/`
  - Sub-direktori Komponen Bento: `src/features/landing/components/bento/`
    - Komponen Induk: `BentoHeroSection` (Wadah container grid responsif dan penyedia layout).
    - Komponen Kartu 1: `BentoIntroCard` (Menangani teks sapaan, headline, status availability, dan tombol kontak).
    - Komponen Kartu 2: `BentoProfileCard` (Menangani foto profil, background visual abstrak, floating badges).
    - Komponen Kartu 3: `BentoProjectCard` (Menangani thumbnail proyek terbaru, stack tags, tautan luar).
    - Komponen Kartu 4: `BentoLearningCard` (Menangani status teknologi yang sedang dipelajari, status pulse, deskripsi ringkas).
    - Komponen Kartu 5: `BentoStatsCard` (Menangani statistik ringkas atau deretan ikon stack).
    - Komponen Wrapper / Shell: `BentoCardWrapper` (Komponen reusable untuk background card, rounded border, hover transition, dan styling bento dasar).
- Integrasi Halaman: `src/features/landing/LandingPage.tsx` (Memanggil `BentoHeroSection` sebagai komponen utama).

---

## 6. Spesifikasi Data & Kontrak Konten

Data konten kartu harus dapat dikelola dengan rapi, terpisah dari logika UI, dan terhubung ke sistem multi-bahasa (`i18n`):

### Skema Data yang Dibutuhkan:
1. **Data Profil & Intro**:
   - Status Ketersediaan (misal: "Available for Projects")
   - Nama, Gelar/Profesi, Bio Singkat
   - Tautan Sosial Media (URL, label, ikon)
2. **Data Visual Profil**:
   - Sumber Gambar (Path foto di direktori public)
   - Alt Text untuk aksesibilitas
   - Daftar Floating Tags (Teks label, posisi)
3. **Data Proyek Terkini**:
   - Judul Proyek, Ringkasan Singkat
   - Gambar Mockup/Thumbnail
   - Daftar Tech Stack (Nama teknologi, ikon/warna)
   - URL Live Demo & URL Repository
4. **Data "Currently Learning"**:
   - Topik / Teknologi Utama yang sedang dipelajari
   - Kategori / Sub-topik
   - Catatan Refleksi Singkat (Apa yang sedang dieksplorasi)
   - Indikator Status (Active / Experimenting)

---

## 7. Panduan Gaya Desain & Estetika Visual

Untuk memastikan tampilan bento terlihat premium dan tidak kaku:

1. **Card Container (Bento Style)**:
   - Menggunakan sudut membulat yang tegas (*large rounded borders*).
   - Latar belakang semi-transparan (*subtle surface color*) dengan efek kaca (*backdrop blur / glassmorphism*).
   - Border halus dengan kontras rendah agar batas kartu terlihat elegan baik di mode gelap (*dark mode*) maupun terang (*light mode*).
2. **Hover & Micro-interactions**:
   - Efek transisi halus saat kursor melayang di atas kartu (*subtle scale-up* atau pergeseran border glow).
   - Aksen bayangan halus (*soft elevation shadow*) saat interaksi.
3. **Tipografi & Hirarki**:
   - Judul utama menggunakan font tebal dan proporsi yang menarik perhatian.
   - Keterangan pendukung menggunakan teks dengan warna sekunder (*muted text*) untuk keterbacaan yang nyaman.
   - Badge menggunakan ukuran font ringkas (*caption / text-xs*) dengan padding pill.
4. **Aksesibilitas (A11y)**:
   - Semua elemen interaktif memiliki fokus visual (*focus-visible ring*).
   - Seluruh tautan dan tombol memiliki label yang jelas untuk screen reader.
   - Rasio kontras teks terhadap latar kartu memenuhi standar WCAG AA.

---

## 8. Rencana Langkah Pengerjaan Berurutan (Step-by-Step Execution Plan)

Berikut urutan pengerjaan yang sistematis untuk memastikan hasil akurat dan mudah dipahami oleh junior programmer / developer:

### Tahap 1: Persiapan Tipe Data & Kamus Bahasa (i18n)
1. Buka file dictionary multi-bahasa pada direktori i18n.
2. Tambahkan kunci-kunci terjemahan baru untuk section bento hero (sapaan, bio, status ketersediaan, label proyek terbaru, label status belajar).
3. Pastikan seluruh teks tersedia dalam bahasa yang didukung (misal: Bahasa Indonesia dan Bahasa Inggris).

### Tahap 2: Pembuatan Komponen Pembungkus Reusable (`BentoCardWrapper`)
1. Buat komponen wrapper kartu bento yang menerima `children`, `className`, dan opsi tata letak grid span.
2. Terapkan styling dasar: background card, border halus, rounded corner, padding standar, dan transisi hover lembut.

### Tahap 3: Pembuatan Komponen Kartu Individual
1. Buat komponen **BentoIntroCard**: Integrasikan teks sapaan, status badge ketersediaan, deskripsi singkat, dan tombol aksi.
2. Buat komponen **BentoProfileCard**: Integrasikan gambar profil/avatar dengan aspek rasio yang tepat, efek visual background, dan tag mengambang.
3. Buat komponen **BentoProjectCard**: Integrasikan informasi proyek terbaru, banner gambar/thumbnail, pill tech stack, dan tombol tautan.
4. Buat komponen **BentoLearningCard**: Integrasikan label eksplorasi, nama teknologi yang sedang dipelajari, catatan progres, dan status dot berkedip.
5. Buat komponen **BentoStatsCard**: Integrasikan data statistik atau ringkasan keahlian.

### Tahap 4: Penyusunan Layout Mobile-First (`BentoHeroSection`)
1. Gabungkan seluruh komponen kartu ke dalam komponen induk `BentoHeroSection`.
2. Atur susunan default untuk layar mobile (1 kolom vertikal dari atas ke bawah).
3. Pastikan tampilan di layar ponsel ramping, tombol mudah disentuh (*touch target minimal 44px*), dan tidak ada horizontal overflow.

### Tahap 5: Transformasi Responsif ke Tablet & Desktop
1. Terapkan breakpoint tablet (`sm:` dan `md:`) untuk menyusun kartu ke dalam 2 kolom.
2. Terapkan breakpoint desktop (`lg:` dan `xl:`) untuk menyusun kartu menjadi Abstract Bento Grid multi-kolom asimetris.
3. Sesuaikan tinggi (*height / row span*) masing-masing kartu agar komposisi grid tampak presisi dan harmonis.

### Tahap 6: Integrasi ke Halaman Utama & Poles Visual
1. Impor dan pasang komponen `BentoHeroSection` ke dalam `LandingPage.tsx`.
2. Lakukan pengujian visual pada berbagai ukuran layar (mobile kecil 360px, mobile standar 390px/412px, tablet 768px/820px, desktop 1024px/1440px+).
3. Pastikan transisi antar mode gelap dan terang berjalan sempurna tanpa teks yang tidak terbaca.

---

## 9. Kriteria Penerimaan (Definition of Done)
- [ ] Section bento hero muncul di urutan pertama pada landing page.
- [ ] Tersedia 4 kartu utama: Intro/About, Foto Profil, Latest Project, dan Currently Learning (+ 1 kartu pendukung).
- [ ] Tampilan pada layar smartphone tersusun rapi secara vertikal tanpa glitch tata letak.
- [ ] Tampilan pada layar desktop tersusun dalam formasi Bento Grid asimetris yang estetik.
- [ ] Seluruh teks terhubung dengan sistem i18n dan dapat berganti bahasa dengan benar.
- [ ] Efek hover dan micro-interaction berjalan mulus dan responsif.
- [ ] Tidak ada error TypeScript, linting, maupun layout breaking.
