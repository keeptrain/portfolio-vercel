# Ide 03: Arsitektur MDX Blog & Halaman Deep-Dive Case Study

## 1. Upgrade Blog ke Server-Side MDX Engine (`next-mdx-remote` / `fumadocs` / `@next/mdx`)
- **Masalah Saat Ini**: Konten blog masih disimpan sebagai array string statis di `src/data/blogPosts.ts`, menyulitkan formatting kode, diagram, atau komponen interaktif.
- **Penyelesaian**:
  - Mengubah artikel blog menjadi file markdown murni `.mdx` di direktori `content/blog/en/` dan `content/blog/id/`.
  - Di-compile 100% di Server Component pada saat build / request time.
  - Memungkinkan embedding komponen interaktif React langsung di dalam tulisan teknis.

---

## 2. Syntax Highlighting Mewah & Copy Code Button
- **Fitur**:
  - Syntax highlighter modern menggunakan `shiki` (engine VSCode) dengan tema dual (misal: *GitHub Dark Default* dan *GitHub Light*).
  - Penanda baris kode aktif (*line highlighting* dan *diff additions/deletions*).
  - Tombol **"Copy to Clipboard"** dengan feedback animasi centang visual di setiap blok kode.

---

## 3. Fitur Reading Experience di Halaman Artikel
- **Tingkat Aksesibilitas & Kenyamanan Pembaca**:
  1. **Reading Progress Bar**: Garis indikator tipis di bagian atas layar yang menunjukkan progress scroll artikel.
  2. **Estimated Reading Time**: Kalkulasi otomatis waktu membaca (misal: "5 min read") berdasarkan jumlah kata.
  3. **Auto-Generated Table of Contents (TOC)**: Daftar isi artikel interaktif di sisi samping layar (desktop) atau collapsible di mobile yang menyorot heading yang sedang aktif di-scroll.

---

## 4. Halaman Deep-Dive Case Study untuk Flagship Projects (`/projects/[slug]`)
- **Konsep**: Selain modal Drawer ringkas, sediakan opsi halaman penuh (*dedicated case study page*) untuk 2-3 proyek unggulan.
- **Struktur Case Study Standar Industri**:
  - **Problem Context**: Masalah nyata yang dihadapi user/klien.
  - **System Architecture Diagram**: Diagram alur teknis (Mermaid / SVG).
  - **Key Technical Challenges & Solutions**: Keputusan arsitektur (kenapa memilih Redis, optimasi SQL queries, concurrency handling, dll).
  - **Measurable Results / Metrics**: Peningkatan performa, efisiensi waktu, atau metrik penggunaan.
  - **Interactive Live Embed / Video Walkthrough**: Demo fungsionalitas langsung.
