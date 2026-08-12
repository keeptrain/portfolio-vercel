# Planning: SectionTwo — How I Work & Tech Stack

## Stack

- TailwindCSS
- Next.js (App Router)
- TypeScript
- shadcn/ui (Card, Carousel)

## Rule

- Tanpa contoh code, hanya high-level planning
- Mobile first thinking
- Detail dan urut agar junior programmer / model murah bisa paham

---

## 1. Komponen Utama: SectionTwo

### Lokasi File
- `src/features/landing/components/SectionTwo.tsx`

### Deskripsi
Komponen container utama yang memuat navigasi tab dan konten dinamis. Menggunakan `"use client"` karena ada state management untuk switching tab.

### Struktur
- NavigationButton (tab switcher)
- Content Area (konten dinamis berdasarkan tab aktif)

---

## 2. NavigationButton (Tab Switcher)

### Lokasi
- Inline di dalam `SectionTwo.tsx`

### Deskripsi
Dua tombol navigasi horizontal yang berfungsi sebagai tab switcher.

### Perilaku
- Ada 2 tab: **"How I Work?"** dan **"Tech Stack"**
- Tab yang aktif: teks warna tebal hitam/putih, font-weight bold, ukuran lebih besar
- Tab yang TIDAK aktif: teks warna redup (gray-400 / gray-500), font-weight light, ukuran lebih kecil
- Transisi warna teks menggunakan Tailwind `transition-colors duration-300`
- State dikelola menggunakan `useState` dengan tipe `"howIWork" | "techStack"`
- Klik pada tab mengubah state, menyebabkan konten di bawahnya berubah
- Cursor pointer pada tab non-aktif

### Layout (Mobile First)
- Mobile: flex horizontal, justify-between, gap-4
- Desktop: sama, tapi teks lebih besar

---

## 3. Content Area (Wrapper Konten Dinamis)

### Lokasi
- Inline di dalam `SectionTwo.tsx`

### Deskripsi
Area konten yang berganti berdasarkan tab aktif. Memiliki tinggi tetap agar tidak terjadi layout shift saat switching.

### Perilaku
- **Fix height container**: gunakan `min-h-[320px] md:min-h-[360px]` agar konten konsisten
- Konten yang ditampilkan ditentukan oleh state tab aktif
- Animasi transisi saat switch: gunakan Tailwind `transition-opacity duration-300` atau `animate-` class
- Konten lama menghilang (opacity-0), konten baru muncul (opacity-100)
- Alternatif: pakai `transition-all` dengan translate-y kecil (fade-in dari bawah)
- Overflow hidden pada container agar tidak bocor

### Layout (Mobile First)
- Mobile: padding-top kecil, full width
- Desktop: padding-top sedang

---

## 4. HowIWork — Konten Tab Pertama

### Lokasi File
- `src/features/landing/components/section-two/HowIWork.tsx`

### Deskripsi LAMA
- Carousel horizontal dengan card-card step (Plan, Develop, Validate, Collaborate)
- Navigasi prev/next di bawah atau pojok kanan

### Deskripsi BARU (Redesign)
- **Layout diubah menjadi VERTICAL** — bukan carousel horizontal lagi
- Terdiri dari 2 kolom utama (di desktop):
  - **Kolom Kiri**: Teks pengantar / narasi
  - **Kolom Kanan**: Daftar step vertical (bukan carousel)

### Kolom Kiri — Narasi Pengantar
- Heading kecil bersifat editorial/naratif
- Isi teks membahas bagaimana era sekarang sudah berubah dengan adanya AI autonomous, dan bagaimana pendekatan kerja harus beradaptasi
- Contoh narasi: *"Di era AI autonomous, cara kita bekerja telah berevolusi. Saya mengadopsi pendekatan iteratif yang memanfaatkan teknologi modern sambil tetap menjaga prinsip engineering yang solid."*
- Font size kecil-sedang, warna muted (gray-600 / gray-300 dark)
- Sertakan juga badge/pill kecil seperti "AI-Assisted Workflow" atau "Modern Approach"

### Kolom Kanan — Vertical Step List
- Tampilkan data step secara vertikal (Plan → Develop → Validate → Collaborate)
- Setiap item berupa row/card mini dengan:
  - Nomor step (01, 02, 03, 04) dengan styling muted/ghost
  - Judul step (Plan, Develop, dll) — bold
  - Deskripsi step — font light, ukuran kecil
- Antar item diberi separator garis tipis atau connector visual vertikal (timeline line)
- Bisa pakai border-left atau pseudo-element sebagai timeline connector

### Layout (Mobile First)
- **Mobile**: Stack vertikal — narasi di atas, step list di bawah
- **Desktop**: Grid 2 kolom — narasi kiri (4-5 col), step list kanan (7-8 col)

### Data
- Data step tetap sama: Plan, Develop, Validate, Collaborate (sudah ada di file)
- Tambahkan data narasi teks untuk kolom kiri

---

## 5. TechStack — Konten Tab Kedua

### Lokasi File
- `src/features/landing/components/section-two/TechStack.tsx` (buat file baru)

### Deskripsi
- Desain bebas yang menampilkan teknologi/tools yang dikuasai
- Harus terasa modern, interaktif, dan relevan

### Ide Desain (Pilih Salah Satu atau Kombinasi)

#### Opsi A: Grid Kategori + Icon Badge
- Bagi tech stack ke dalam kategori: Frontend, Backend, Tools, Database
- Setiap kategori memiliki heading kecil
- Di bawah heading, tampilkan deretan badge/pill berisi nama teknologi + ikon
- Badge hover effect: scale-up atau glow
- Layout grid 2x2 di mobile, 4 kolom di desktop

#### Opsi B: Marquee / Infinite Scroll Horizontal
- Deretan logo teknologi bergerak otomatis secara horizontal (marquee effect)
- Dua baris marquee, arah berlawanan (baris 1 ke kanan, baris 2 ke kiri)
- Logo grayscale, hover menjadi berwarna
- Terasa hidup dan modern

#### Opsi C: Interactive Card Grid
- Card kecil untuk setiap teknologi
- Hover: card terangkat, tampilkan tooltip singkat pengalaman
- Grid responsif: 3 kolom mobile, 4-6 kolom desktop

### Layout (Mobile First)
- Mobile: 2-3 kolom grid atau single marquee row
- Desktop: 4-6 kolom grid atau dual marquee rows

---

## 6. Urutan Pengerjaan

1. **SectionTwo.tsx** — Setup state, NavigationButton tab switcher, content area wrapper dengan fix height
2. **HowIWork.tsx** — Redesign dari horizontal carousel menjadi 2-kolom vertical layout (narasi + step list)
3. **TechStack.tsx** — Buat komponen baru dengan desain yang dipilih
4. **Polish** — Animasi transisi tab, responsive testing, dark mode testing

---

## 7. Catatan Penting

- SectionTwo harus `"use client"` karena butuh useState untuk tab switching
- HowIWork sudah `"use client"` — pertahankan jika masih butuh interaksi
- Jika TechStack murni statis, tidak perlu `"use client"`
- Pastikan dark mode support di semua komponen
- Pastikan height konsisten antara kedua tab agar tidak ada layout jump