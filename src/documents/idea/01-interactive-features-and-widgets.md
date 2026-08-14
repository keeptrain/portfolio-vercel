# Ide 01: Fitur Interaktif & Widgets Portofolio

## 1. Command Palette / Spotlight Search (`Cmd + K` / `Ctrl + K`)
- **Konsep**: Memberikan pengalaman navigasi ala aplikasi desktop (seperti Linear/Raycast).
- **Fitur**:
  - Navigasi cepat antar halaman (`Home`, `Projects`, `Blog`).
  - Pencarian instan judul proyek atau artikel blog.
  - Aksi cepat: Ganti Tema (`Light/Dark`), Ganti Bahasa (`ID/EN`), Salin Email ke Clipboard, Unduh CV.
- **Implementasi**: Menggunakan `cmdk` (basis bawaan shadcn command) yang di-load secara dinamis (*lazy loaded*) hanya saat shortcut ditekan agar tidak membebani initial bundle.

---

## 2. Live Activity Status Card pada Bento Grid
- **Konsep**: Menjadikan kartu status di Bento Hero selalu hidup dan mencerminkan aktivitas asli engineer.
- **Pilihan Integrasi**:
  1. **Spotify Current Playing / Top Track**: Menampilkan lagu yang sedang didengarkan dengan visualizer bar audio mini.
  2. **GitHub Realtime Contribution Heatmap**: Menampilkan matriks kontribusi komit GitHub tahun ini secara live melalui GitHub GraphQL API (di-cache dengan Next.js ISR).
  3. **Coding Time / Wakatime Widget**: Menampilkan jam coding mingguan dan bahasa pemrograman yang paling sering digunakan.

---

## 3. UI Micro-Interactions & Haptic / Sound Effects Ringan
- **Konsep**: Sentuhan audio mikro opsional (dapat di-mute) saat mengklik dock navigasi atau toggle theme untuk memberikan nuansa premium (*game/craft feel*).
- **Detail**:
  - Menggunakan library Web Audio API ultra-ringan (`use-sound` atau kustom native Web Audio synthesize).
  - Sakelar audio on/off di `MoreDrawer`.

---

## 4. Interactive "Engineering Lab / Playground" Section
- **Konsep**: Satu halaman / section khusus untuk memamerkan eksperimen UI mini atau komponen open-source yang dibuat sendiri.
- **Contoh Eksperimen**:
  - CSS Glassmorphism shader generator.
  - Animated particle canvas.
  - Interactive SVG hand-drawn frame tester.
  - Micro physics engine demo.

---

## 5. Lightweight Guestbook / Sticker Reactions
- **Konsep**: Mengizinkan pengunjung atau recruiter meninggalkan pesan singkat atau stiker reaksi (misal: "🔥 Keren!", "🚀 Let's Connect!").
- **Arsitektur**: Menggunakan Server Actions + database serverless gratis (seperti Upstash Redis / Supabase) dengan perlindungan rate-limiting ringan.
