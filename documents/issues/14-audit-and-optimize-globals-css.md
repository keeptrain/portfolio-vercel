# Issue #14: Audit dan Optimasi CSS Global (globals.css)

## 1. Ringkasan Masalah & Sasaran Tugas

File konfigurasi stylesheet utama `src/app/globals.css` saat ini menampung berbagai aturan CSS peninggalan (*legacy rules*), duplikasi deklarasi tema variabel, serta keyframe animasi dan kelas utilitas yang sudah tidak pernah digunakan lagi di dalam basis kode aplikasi.

Masalah-masalah yang teridentifikasi meliputi:
- **Duplikasi Definisi Tema**: Terdapat blok konfigurasi `@theme` ganda yang mendefinisikan variabel warna yang sama beberapa kali.
- **Variabel Desain Berlebih (Dead Tokens)**: Variabel bawaan template seperti token sidebar dan chart dideklarasikan di mode terang dan gelap padahal aplikasi portofolio ini tidak memiliki komponen sidebar maupun dashboard grafik.
- **Keyframe & Utilitas Tidak Terpakai**: Terdapat keyframe animasi typewriter, transisi peeking header, dan kelas-kelas utilitas yang tidak direferensikan oleh komponen mana pun.
- **Efisiensi Ukuran & Parsing CSS**: CSS yang bersih dan ringkas mempercepat proses kompilasi Tailwind v4 serta meminimalkan beban parsing CSS pada perangkat peramban mobile.

Tujuan dari tugas ini adalah:
1. Melakukan pembersihan menyeluruh terhadap token tema, kelas utilitas, dan keyframe yang tidak terpakai di `globals.css`.
2. Menghilangkan duplikasi blok tema `@theme` agar struktur styling terpusat, konsisten, dan mudah dipelihara.
3. Mempertahankan semua variabel warna inti, kelas komponen blog, utilitas aktif, serta sistem transisi yang benar-benar digunakan oleh UI.
4. Memastikan pengalaman visual di mobile dan desktop tetap 100% identik tanpa regresi tampilan.

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Tailwind CSS v4, `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"`.
- **Pendekatan**: Mobile-First Thinking, Clean Stylesheet Architecture, Dead Code Elimination.
- **Batasan Khusus**:
  - Instruksi ditulis secara deskriptif prosedural tanpa menyertakan contoh blok kode.
  - Jangan menghapus variabel inti yang digunakan oleh shadcn/ui (seperti background, foreground, primary, secondary, muted, accent, destructive, card, popover, border, input, ring, dan radius).
  - Jangan menghapus kelas utilitas atau komponen yang sedang aktif digunakan (seperti font-medium-ex, header-transition, animate-fade-in, container-max, section-padding, dan btn-primary).

---

## 3. Analisis Audit Elemen CSS

### A. Elemen yang Tidak Diperlukan (Harus Dihapus)
1. **Token Sidebar**: Seluruh deklarasi variabel sidebar di blok tema, root terang, dan dark mode karena portofolio tidak menggunakan komponen navigasi sidebar.
2. **Token Chart**: Variabel chart-1 hingga chart-5 karena aplikasi tidak menampilkan visualisasi chart.
3. **Keyframe & Utilitas Typewriter**: Kelas typewriter dan keyframe typing/blink karena efek teks mesin ketik sudah tidak diterapkan.
4. **Keyframe Header Peek**: Animasi headerHideFromPeek dan headerShow yang sudah digantikan oleh transisi standar pada komponen navigasi.
5. **Utilitas Animasi Tanpa Konsumen**: Kelas fade-up, fade-scale, slide-up, dan content-visibility-auto yang tidak memiliki komponen pemanggil.
6. **Utilitas Scrollbar Hide**: Kelas penyembunyi scrollbar manual yang tidak digunakan di halaman aktif.
7. **Komentar Source Path Usang**: Baris komentar directive source di bagian atas file yang tidak memiliki fungsi fungsional.

### B. Elemen yang Wajib Dipertahankan & Divalidasi
1. **Import Inti**: Import tailwindcss, tw-animate-css, dan shadcn/tailwind.css.
2. **Custom Variant Dark Mode**: Pengaturan variant selektor dark mode.
3. **Layer Base Dasar**: Pengaturan smooth scroll pada HTML dan flex layout dasar pada body.
4. **Desain Token Esensial**: Variabel warna tema, border, radius, dan tipografi dasar yang menyokong tema terang dan gelap.
5. **Kelas Aktif**:
   - Utilitas font-medium-ex untuk ketebalan teks khusus.
   - Utilitas header-transition untuk navbar responsif.
   - Keyframe dan kelas animate-fade-in untuk transisi masuk section.
   - Kelas komponen container-max, section-padding, dan btn-primary untuk konsistensi layout halaman.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 5 tahapan sistematis:

### Tahap 1: Persiapan dan Verifikasi Referensi
1. Buka file `src/app/globals.css`.
2. Lakukan pencarian global pada seluruh folder `src` untuk memastikan kembali tidak ada file baru yang memanggil kelas typewriter, headerHide, chart, atau sidebar.
3. Catat seluruh kelas utilitas dan token yang terbukti tidak memiliki ketergantungan di level komponen.

### Tahap 2: Pembersihan Dead Code pada Keyframe dan Komponen
1. Hapus seluruh blok kelas typewriter beserta `@keyframes typing` dan `@keyframes blink` di dalam layer components dan utilities.
2. Hapus keyframe `headerHideFromPeek`, `headerShow`, dan `slideUp` yang tidak terpakai.
3. Hapus kelas utilitas `animate-fade-up`, `animate-fade-scale`, `animate-slide-up`, dan `content-visibility-auto` dari layer utilities.
4. Hapus kelas `scrollbar-hide` yang tidak digunakan.
5. Pertahankan `@keyframes fadeIn` dan kelas `animate-fade-in` karena masih digunakan pada komponen landing page.
6. Pertahankan kelas `header-transition` karena aktif digunakan oleh komponen navigasi utama.

### Tahap 3: Konsolidasi dan Perapihan Blok Tema (@theme)
1. Periksa bagian atas file yang memiliki deklarasi `@theme` terpisah untuk variabel primary, secondary, dan border.
2. Gabungkan deklarasi tersebut ke dalam satu blok `@theme inline` yang terpadu agar tidak ada duplikasi directive.
3. Hapus seluruh pemetaan variabel sidebar (sidebar, sidebar-foreground, sidebar-primary, dll.) dari dalam blok tema.
4. Hapus seluruh pemetaan variabel chart (chart-1 sampai chart-5) dari dalam blok tema.
5. Hapus komentar path source yang dinonaktifkan di baris atas file.

### Tahap 4: Pembersihan Variabel pada :root dan .dark
1. Masuk ke blok selektor `:root` (tema terang):
   - Hapus semua variabel CSS yang berawalan `--sidebar-`.
   - Hapus semua variabel CSS yang berawalan `--chart-`.
   - Pastikan variabel warna utama, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, dan radius tetap utuh dengan nilai warna oklch yang presisi.
2. Masuk ke blok selektor `.dark` (tema gelap):
   - Hapus semua variabel CSS yang berawalan `--sidebar-`.
   - Hapus semua variabel CSS yang berawalan `--chart-`.
   - Pastikan kontras warna latar, teks, dan kartu pada mode gelap tetap terjaga sesuai palet desain.

### Tahap 5: Validasi, Pengujian Responsif, dan Pemeriksaan Build
1. Jalankan server lokal dan buka website pada tampilan mobile (viewport layar kecil).
2. Periksa tampilan halaman utama, navbar, kartu proyek, drawer detail, dan halaman artikel blog:
   - Pastikan warna latar dan teks di mode terang tetap konsisten.
   - Alihkan ke mode gelap, pastikan seluruh permukaan elemen teradaptasi dengan sempurna.
   - Pastikan transisi navbar dan animasi fade-in tetap berjalan mulus tanpa gangguan visual.
3. Lakukan proses kompilasi build untuk memastikan tidak ada kesalahan sintaksis atau peringatan CSS pada Tailwind v4.

---

## 5. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/app/globals.css` | MODIFY | Hapus token sidebar/chart yang tidak terpakai, eliminasi keyframe mati, satukan blok tema, dan bersihkan komentar usang |

---

## 6. Kriteria Penerimaan (Definition of Done)

- [ ] File `src/app/globals.css` bersih dari deklarasi token sidebar dan chart di blok tema, `:root`, dan `.dark`.
- [ ] Seluruh keyframe dan kelas animasi yang tidak terpakai (typewriter, headerHide, slideUp, fade-up, fade-scale) telah dihapus secara tuntas.
- [ ] Tidak ada duplikasi blok `@theme` di dalam file stylesheet.
- [ ] Kelas utilitas aktif (`font-medium-ex`, `header-transition`, `animate-fade-in`, `container-max`, `section-padding`, `btn-primary`) tetap berfungsi normal.
- [ ] Tampilan antarmuka pada tema terang dan gelap di perangkat mobile maupun desktop tidak mengalami perubahan visual atau regresi layout.
- [ ] Build produksi Next.js berjalan sukses tanpa ada peringatan atau kesalahan parsing CSS.
