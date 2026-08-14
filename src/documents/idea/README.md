# Master Plan & Ide Peningkatan Portofolio (Entire Project Improvements)

Dokumen ini memetakan visi, arsitektur, dan peta jalan inovasi untuk meningkatkan website portofolio secara menyeluruh dari aspek **Performa**, **Estetika/UX**, **Fitur Interaktif**, **SEO/Aksesibilitas**, dan **Developer Experience (DX)**.

---

## 🗺️ Peta Kategori Ide

| No | Kategori | Dokumen Detail | Fokus Utama |
|---|---|---|---|
| **01** | **Fitur Interaktif & Widgets** | [`01-interactive-features-and-widgets.md`](./01-interactive-features-and-widgets.md) | Command Palette (`Cmd+K`), Live Activity Widget, Sound FX / Micro-interactions, Guestbook Ringan |
| **02** | **SEO, OpenGraph & Performa** | [`02-seo-performance-and-og-image.md`](./02-seo-performance-and-og-image.md) | Dynamic OG Image Generator (`@vercel/og`), JSON-LD Structured Data, Web Vitals, RSS Feed |
| **03** | **Case Study & Dynamic MDX Blog** | [`03-case-study-and-blog-mdx.md`](./03-case-study-and-blog-mdx.md) | Halaman Detail Case Study (`/projects/[slug]`), Sistem MDX dengan Syntax Highlighting & Table of Contents |
| **04** | **DX, Type Safety & Testing** | [`04-dx-testing-and-type-safety.md`](./04-dx-testing-and-type-safety.md) | Typed i18n Keys Autocomplete, E2E Testing (Playwright), View Transitions API, CI/CD Pipeline |

---

## 🎯 Ringkasan Eksekutif & Nilai Tambah

1. **Membuat Portofolio Lebih Hidup (Alive & Dynamic)**:
   Mengubah portofolio statis menjadi etalase *engineering craft* yang interaktif (misal: Live GitHub commit streak, Spotify current playing, atau Command Palette pintar).

2. **Skalabilitas Konten Panjang (Case Study & Tech Writing)**:
   Memungkinkan penulisan artikel mendalam dan studi kasus proyek teknis dengan arsitektur MDX yang ringan dan di-render di server.

3. **Standar Industri Web Modern (Vercel & Next.js Best Practices)**:
   Memaksimalkan Server Components, zero-layout shift, dynamic OG image yang meningkatkan klik saat dibagikan di LinkedIn/Twitter, dan skor 100/100 di Google Lighthouse.
