# Ide 02: Optimasi SEO, Dynamic OpenGraph & Performa Global

## 1. Dynamic OpenGraph Image Generation (`@vercel/og` / `ImageResponse`)
- **Konsep**: Membuat gambar banner preview sosial media (Twitter Card / LinkedIn preview) di-generate secara otomatis per halaman dan artikel blog di Edge Runtime.
- **Manfaat**:
  - Setiap artikel blog dan proyek mendapatkan preview kartu gambar unik dengan judul, tag stack, avatar, dan branding portofolio.
  - Meningkatkan CTR (Click-Through-Rate) saat tautan portofolio dibagikan di LinkedIn, Twitter, dan Discord.
- **Implementasi**: File `src/app/[locale]/opengraph-image.tsx` dan `src/app/[locale]/blog/[slug]/opengraph-image.tsx` menggunakan `ImageResponse` dari Next.js.

---

## 2. Structured Data JSON-LD (Schema.org)
- **Konsep**: Menanam metadata JSON-LD agar mesin pencari Google memahami profil author, keterampilan, dan daftar proyek secara semantik.
- **Skema yang Direkomendasikan**:
  1. `Person` Schema di halaman utama: Nama, job title (Software Engineer), URL sosial media, foto profil, dan deskripsi keahlian.
  2. `CreativeWork` / `SoftwareApplication` Schema di halaman Projects: Nama aplikasi, teknologi, dan URL live demo.
  3. `BlogPosting` Schema di artikel blog: Judul, tanggal publikasi, author, dan estimasi waktu baca.

---

## 3. RSS Feed & WebSub Auto-Generation
- **Konsep**: Menyediakan endpoint `/rss.xml` atau `/feed.json` untuk seluruh artikel blog portofolio.
- **Manfaat**: Pengguna dan tech crawler dapat berlangganan pembaruan artikel coding melalui RSS reader (Feedly, Inoreader, dll).

---

## 4. Zero Layout Shift (CLS) & Font Fallback Tuning
- **Konsep**: Optimasi metrik Core Web Vitals agar mencapai skor sempurna 100/100 di Lighthouse.
- **Langkah**:
  - Fine-tuning `next/font` dengan `adjustFontFallback: true` untuk meminimalisir FOUT (Flash of Unstyled Text).
  - Penambahan atribut `width` dan `height` eksplisit pada semua ikon SVG.
  - Memanfaatkan `content-visibility: auto` pada section bawah halaman agar waktu rendering DOM awal di ponsel semakin cepat.
