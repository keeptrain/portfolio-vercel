# Issue #11: Refactor ProjectsPage ke Server-Side Components & Pisahkan Data ke Modul Terpisah

## 1. Ringkasan Masalah & Sasaran Tugas

Saat ini file `src/features/projects/ProjectsPage.tsx` ditandai sebagai `"use client"` secara keseluruhan, padahal sebagian besar kontennya (daftar proyek, rendering kartu, heading) bersifat statis dan tidak membutuhkan interaktivitas client-side. Selain itu, data proyek (array `projectData`) ditulis langsung di dalam komponen (*hardcoded inline*), sehingga sulit dikelola ketika jumlah proyek bertambah.

Tujuan dari tugas ini adalah:
1. **Memisahkan data proyek** ke dalam file modul terpisah di `src/features/projects/data/` agar data mudah dikelola, ditambah, dan diubah tanpa menyentuh logika komponen.
2. **Menjadikan `ProjectsPage` sebagai Server Component** sebisa mungkin, dan hanya mengisolasi bagian interaktif (tombol filter "Latest") ke dalam Client Component kecil yang terpisah.
3. **Mendefinisikan tipe data proyek** secara terpusat di satu tempat agar tipe tersebut bisa digunakan kembali di seluruh fitur proyek (halaman daftar, drawer detail, landing page).

---

## 2. Sasaran & Ruang Lingkup

- **Framework & Tooling**: Next.js (App Router), TypeScript, Tailwind CSS.
- **Pendekatan**: Mobile-First Thinking, Server-First Architecture.
- **Batasan Khusus**:
  - Tidak mengubah desain visual yang sudah ada.
  - Tidak menambahkan library pihak ketiga.
  - Instruksi deskriptif prosedural tanpa menyertakan blok kode mentah.

---

## 3. Analisis Kondisi Saat Ini

### A. Seluruh Halaman Berstatus Client Component
File `ProjectsPage.tsx` memiliki direktif `"use client"` di baris pertama. Hal ini menyebabkan seluruh pohon komponen di dalamnya (termasuk daftar proyek, heading, dan kartu) dijalankan di sisi peramban. Padahal, satu-satunya bagian yang membutuhkan interaktivitas client adalah tombol filter "Latest" yang menggunakan `useState`.

### B. Data Proyek Tertanam di Dalam Komponen
Array `projectData` ditulis langsung di dalam tubuh fungsi komponen `ProjectsPage`. Ketika jumlah proyek bertambah (misalnya menjadi 5–10 proyek), file komponen akan menjadi sangat panjang dan sulit dibaca. Data seharusnya dipisahkan agar komponen tetap ringkas dan fokus pada tata letak.

### C. Tipe Data Terduplikasi
Tipe `ProjectAdapterProps` didefinisikan baik di `ProjectsPage.tsx` maupun di `ProjectAdapter.tsx` secara terpisah. Jika ada perubahan struktur data (misalnya menambah field baru), kedua file harus diubah secara manual dan rentan terhadap inkonsistensi.

---

## 4. Rencana Langkah Pengerjaan Berurutan

Pengerjaan dibagi ke dalam 5 tahapan sistematis:

### Tahap 1: Buat Struktur Folder Data
1. Buat folder baru `src/features/projects/data/`.
2. Di dalam folder tersebut, buat file `projects.ts` yang akan menyimpan seluruh array data proyek.
3. Buat juga file `types.ts` di folder `src/features/projects/` (atau di dalam `data/`) untuk menyimpan definisi tipe data proyek secara terpusat.

### Tahap 2: Definisikan Tipe Data Proyek Terpusat
1. Buka file tipe data yang baru dibuat.
2. Definisikan tipe/interface `Project` yang mencakup seluruh properti yang dibutuhkan oleh proyek:
   - `slug` (identitas unik proyek, bertipe string)
   - `title` (judul proyek)
   - `imageSrc` (path gambar thumbnail)
   - `stack` (array string teknologi yang digunakan)
   - `category` (kategori proyek, misalnya "Website Development", "Mobile App")
   - `year` (tahun pengerjaan, misalnya "2025 - 2026")
   - `client` (nama klien, opsional)
   - `description` (deskripsi singkat proyek)
   - `isNda` (boolean, apakah proyek terbatas oleh NDA)
   - `logoSrc` (path logo klien/proyek, opsional)
3. Ekspor tipe tersebut agar bisa diimpor dari mana saja.

### Tahap 3: Pindahkan Data Proyek ke File Terpisah
1. Buka file `src/features/projects/data/projects.ts`.
2. Pindahkan array `projectData` dari `ProjectsPage.tsx` ke file ini.
3. Sesuaikan setiap objek proyek agar menggunakan tipe `Project` yang baru, termasuk menambahkan field-field baru yang belum ada (isi dengan placeholder kosong atau nilai default terlebih dahulu).
4. Ekspor array data proyek sebagai konstanta.

### Tahap 4: Refactor ProjectsPage Menjadi Server Component
1. Buka file `src/features/projects/ProjectsPage.tsx`.
2. Hapus direktif `"use client"` dari baris pertama.
3. Hapus deklarasi tipe `ProjectAdapterProps` dan array `projectData` yang sudah dipindahkan.
4. Impor array data proyek dari `src/features/projects/data/projects.ts`.
5. Impor tipe `Project` dari file tipe data terpusat.
6. Pisahkan logika filter "Latest" (yang menggunakan `useState`) ke dalam komponen Client Component baru bernama `ProjectFilterBar` di folder `src/features/projects/components/`.
7. Render `ProjectFilterBar` di dalam `ProjectsPage` sebagai komponen anak. `ProjectsPage` sendiri tetap menjadi Server Component yang meneruskan data proyek sebagai properti ke komponen-komponen anaknya.

### Tahap 5: Perbarui ProjectAdapter
1. Buka file `src/features/projects/components/ProjectAdapter.tsx`.
2. Hapus definisi tipe `ProjectAdapterProps` lokal.
3. Impor tipe `Project` dari file tipe data terpusat.
4. Sesuaikan properti komponen agar menggunakan tipe `Project` (atau subset yang relevan).
5. Pastikan komponen tetap berfungsi sebagai Server Component (tidak ada direktif `"use client"` atau hook React).

---

## 5. Struktur Folder Setelah Refactor

```
src/features/projects/
├── ProjectsPage.tsx              ← Server Component (tanpa "use client")
├── data/
│   ├── projects.ts               ← [NEW] Array data proyek
│   └── types.ts                  ← [NEW] Definisi tipe Project
├── components/
│   ├── ProjectAdapter.tsx        ← Server Component (impor tipe dari types.ts)
│   ├── ProjectFilterBar.tsx      ← [NEW] Client Component (tombol filter "Latest")
│   └── SectionContainer.tsx      ← (bisa dihapus jika tidak digunakan lagi)
```

---

## 6. File yang Terlibat

| File | Aksi | Deskripsi |
|------|------|-----------|
| `src/features/projects/data/types.ts` | NEW | Definisi tipe `Project` terpusat |
| `src/features/projects/data/projects.ts` | NEW | Array data proyek |
| `src/features/projects/ProjectsPage.tsx` | MODIFY | Hapus `"use client"`, impor data dari modul terpisah, jadikan Server Component |
| `src/features/projects/components/ProjectFilterBar.tsx` | NEW | Client Component untuk tombol filter "Latest" |
| `src/features/projects/components/ProjectAdapter.tsx` | MODIFY | Impor tipe dari file terpusat, hapus duplikasi tipe lokal |
| `src/features/projects/components/SectionContainer.tsx` | VERIFY | Periksa apakah masih diperlukan |

---

## 7. Kriteria Penerimaan (Definition of Done)

- [ ] Data proyek tersimpan di file terpisah `src/features/projects/data/projects.ts`.
- [ ] Tipe `Project` didefinisikan terpusat di `src/features/projects/data/types.ts` dan digunakan di seluruh fitur proyek.
- [ ] `ProjectsPage.tsx` tidak lagi memiliki direktif `"use client"` dan berfungsi sebagai Server Component.
- [ ] Tombol filter "Latest" terisolasi di dalam Client Component `ProjectFilterBar.tsx`.
- [ ] `ProjectAdapter.tsx` mengimpor tipe dari file terpusat, bukan mendefinisikan sendiri.
- [ ] Tampilan visual halaman proyek tetap identik seperti sebelumnya (tidak ada regresi UI).
- [ ] Tidak ada error tipe pada kompilasi TypeScript.
- [ ] Halaman proyek tetap berfungsi dengan baik pada viewport mobile dan desktop.
