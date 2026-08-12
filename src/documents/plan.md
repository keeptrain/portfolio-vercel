# Planning: Ganti BentoColorPaletteCard → BentoClientCard

## Tujuan

Mengganti konten dari BentoColorPaletteCard (monochrome color blocks) menjadi card "My Clients / Satisfied Partners" yang menampilkan 4 logo klien dalam pill/badge, terinspirasi dari referensi gambar.

> **PENTING**: File `BentoColorPaletteCard.tsx` TIDAK dihapus. Komponen baru dibuat terpisah sebagai `BentoClientCard.tsx`, lalu digantikan penggunaannya di `BentoHeroSection.tsx`.

---

## Referensi Desain

Mengacu pada gambar referensi: dark card dengan layout:
- Bagian atas: emoji/ikon kecil + label "My Clients"
- Di bawahnya: teks besar "Satisfied Partners"
- Bagian bawah: deretan logo klien dalam pill/badge rounded berlatar gelap

---

## Logo yang Tersedia (4 buah)

| No | Nama | Path | Format |
|----|------|------|--------|
| 1 | Bangkit | `/images/logo/bangkit.svg` | SVG |
| 2 | RPTRA | `/images/logo/rptra.png` | PNG |
| 3 | Pusdatin | `/images/logo/pusdatin.png` | PNG |
| 4 | KKP | `/images/logo/kkp.webp` | WebP |

---

## File yang Terlibat

### 1. [NEW] `BentoClientCard.tsx`

**Lokasi**: `src/features/landing/components/bento/BentoClientCard.tsx`

**Deskripsi**: Komponen baru yang menampilkan card "My Clients" dengan logo-logo klien.

**Struktur Layout (dari atas ke bawah)**:

#### Bagian Atas — Header
- Satu baris ikon kecil (emoji 🤝 atau ikon handshake) + teks label kecil "My Clients" 
- Warna teks muted/redup (gray-500 / gray-400 dark)
- Font size kecil (text-xs atau text-sm)

#### Bagian Tengah — Judul
- Teks "Satisfied Partners" 
- Font size medium-besar (text-lg atau text-xl)
- Font weight medium
- Warna terang (gray-900 / white dark)

#### Bagian Bawah — Logo Grid
- Layout: grid 2x2 untuk 4 logo
- Setiap logo ditempatkan dalam pill/badge:
  - Background: bg-gray-100 dark:bg-zinc-800
  - Rounded: rounded-full atau rounded-xl
  - Padding kecil (px-3 py-1.5)
  - Logo di dalamnya menggunakan `next/image` dengan `object-contain`
  - Ukuran logo kecil (h-5 sampai h-7, width auto)
  - Filter: grayscale, dark:invert (agar menyesuaikan theme)
- Grid gap kecil (gap-2)
- Semua logo rata tengah di dalam pill

**Props**: Sama seperti BentoColorPaletteCard → `className?: string`

**Menggunakan**: `BentoCardWrapper` sebagai wrapper luar (sama seperti card bento lainnya)

---

### 2. [MODIFY] `BentoHeroSection.tsx`

**Lokasi**: `src/features/landing/components/bento/BentoHeroSection.tsx`

**Perubahan**:
- Ganti import dari `BentoColorPaletteCard` menjadi `BentoClientCard`
- Ganti penggunaan `<BentoColorPaletteCard>` menjadi `<BentoClientCard>`
- Kolom span tetap sama: `sm:col-span-1 lg:col-span-3`
- Posisi di grid tetap sama (baris 2, kolom pertama)

---

### 3. [KEEP] `BentoColorPaletteCard.tsx`

**Tidak dihapus**, hanya tidak lagi digunakan di BentoHeroSection. File tetap ada untuk referensi atau penggunaan di tempat lain.

---

## Urutan Pengerjaan

1. **Buat `BentoClientCard.tsx`**
   - Import `BentoCardWrapper`, `Image` dari next/image
   - Definisikan array data logo (nama + path)
   - Render header (ikon + "My Clients")
   - Render judul ("Satisfied Partners")
   - Render grid 2x2 berisi pill/badge dengan logo
   - Pastikan responsive: di mobile ukuran pill menyesuaikan
   - Pastikan dark mode support

2. **Update `BentoHeroSection.tsx`**
   - Ganti import dan penggunaan komponen
   - Tidak ada perubahan layout grid

3. **Verifikasi**
   - Pastikan card muncul di posisi yang benar (baris 2, kolom 1, span 3)
   - Pastikan logo tampil rapi di dalam pill badge
   - Pastikan dark mode tampil baik
   - Pastikan tidak ada error build

---

## Catatan Tambahan

- Karena hanya ada 4 logo, grid 2x2 adalah layout paling sesuai untuk card berukuran `lg:col-span-3` (kecil)
- Pill/badge logo harus compact agar muat di card kecil
- Jika di mobile (col-span-1), logo pills bisa stack 2x2 atau flexbox wrap
- Tidak perlu `"use client"` jika tidak ada interaksi (pure server component)