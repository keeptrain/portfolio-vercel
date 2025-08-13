export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  readTime: number
  featured?: boolean
}

export interface BlogPostTranslations {
  en: BlogPost
  id: BlogPost
}

export const blogPosts: BlogPostTranslations[] = [
  {
    en: {
      id: "my-coding-journey-2024",
      title: "My Coding Journey in 2024",
      excerpt: "Reflecting on the challenges, learnings, and growth I've experienced as a developer this year.",
      content: `# My Coding Journey in 2024

This year has been incredible for my development as a software engineer. I've learned so much and faced challenges that have shaped me into a better developer.

## Key Learnings

### 1. TypeScript Mastery
I finally feel confident with TypeScript. The type safety it provides has made my code so much more reliable and maintainable.

### 2. Next.js 14 and App Router
The new App Router in Next.js has been a game-changer. Server components and the new routing system have improved both performance and developer experience.

### 3. State Management Evolution
Moving from Redux to Zustand for smaller projects has been refreshing. Sometimes simpler is better.

## Challenges Faced

- **Performance Optimization**: Learning to optimize React applications for better Core Web Vitals
- **Database Design**: Understanding when to use SQL vs NoSQL databases
- **DevOps**: Setting up CI/CD pipelines and understanding containerization

## What's Next?

Looking forward to 2025, I want to:
- Dive deeper into system design
- Learn more about AI/ML integration
- Contribute more to open source projects

The journey continues! 🚀`,
      date: "2024-12-20",
      tags: ["coding", "reflection", "typescript", "nextjs"],
      readTime: 3,
      featured: true
    },
    id: {
      id: "my-coding-journey-2024",
      title: "Perjalanan Coding Saya di 2024",
      excerpt: "Merefleksikan tantangan, pembelajaran, dan pertumbuhan yang saya alami sebagai developer tahun ini.",
      content: `# Perjalanan Coding Saya di 2024

Tahun ini luar biasa untuk perkembangan saya sebagai software engineer. Saya belajar banyak hal dan menghadapi tantangan yang membentuk saya menjadi developer yang lebih baik.

## Pembelajaran Utama

### 1. Menguasai TypeScript
Akhirnya saya merasa percaya diri dengan TypeScript. Type safety yang diberikannya membuat kode saya jauh lebih reliable dan maintainable.

### 2. Next.js 14 dan App Router
App Router baru di Next.js benar-benar mengubah segalanya. Server components dan sistem routing baru telah meningkatkan performa dan developer experience.

### 3. Evolusi State Management
Beralih dari Redux ke Zustand untuk proyek-proyek kecil sangat menyegarkan. Terkadang yang sederhana itu lebih baik.

## Tantangan yang Dihadapi

- **Optimasi Performa**: Belajar mengoptimalkan aplikasi React untuk Core Web Vitals yang lebih baik
- **Desain Database**: Memahami kapan menggunakan SQL vs NoSQL database
- **DevOps**: Menyiapkan CI/CD pipeline dan memahami containerization

## Apa Selanjutnya?

Menuju 2025, saya ingin:
- Mendalami system design
- Belajar lebih banyak tentang integrasi AI/ML
- Berkontribusi lebih banyak ke proyek open source

Perjalanan berlanjut! 🚀`,
      date: "2024-12-20",
      tags: ["coding", "refleksi", "typescript", "nextjs"],
      readTime: 3,
      featured: true
    }
  },
  {
    en: {
      id: "building-this-portfolio",
      title: "Building This Portfolio Website",
      excerpt: "The story behind creating this minimalist portfolio with Next.js, TypeScript, and Tailwind CSS.",
      content: `# Building This Portfolio Website

Today I want to share the process of building this portfolio website and the decisions I made along the way.

## Tech Stack Choice

I chose **Next.js 14** with the App Router for several reasons:
- Excellent performance with server-side rendering
- Great developer experience
- Built-in optimization features
- Easy deployment on Vercel

For styling, I went with **Tailwind CSS** because:
- Utility-first approach speeds up development
- Consistent design system
- Easy to maintain and customize
- Great dark mode support

## Design Philosophy

I wanted to create something that was:
- **Minimalist**: Clean and focused on content
- **Fast**: Optimized for performance
- **Accessible**: Works for everyone
- **Responsive**: Looks great on all devices

## Key Features

### Dark Mode
Implemented with CSS custom properties and Tailwind's dark mode classes. The theme preference is saved in localStorage.

### Internationalization
Added support for English and Indonesian languages with a custom context provider.

### Performance Optimizations
- Image optimization with Next.js Image component
- Font optimization with next/font
- Code splitting and lazy loading
- Minimal bundle size

## Challenges

The biggest challenge was implementing the language switcher and dark mode while maintaining SSR compatibility. I solved this by using a mounted state check to prevent hydration mismatches.

## What I Learned

- How to structure a modern Next.js application
- Advanced TypeScript patterns
- Performance optimization techniques
- The importance of user experience

Building this portfolio was a great learning experience and I'm happy with how it turned out!`,
      date: "2024-12-18",
      tags: ["portfolio", "nextjs", "tailwind", "web development"],
      readTime: 4
    },
    id: {
      id: "building-this-portfolio",
      title: "Membangun Website Portfolio Ini",
      excerpt: "Cerita di balik pembuatan portfolio minimalis ini dengan Next.js, TypeScript, dan Tailwind CSS.",
      content: `# Membangun Website Portfolio Ini

Hari ini saya ingin berbagi proses membangun website portfolio ini dan keputusan-keputusan yang saya buat di sepanjang jalan.

## Pilihan Tech Stack

Saya memilih **Next.js 14** dengan App Router karena beberapa alasan:
- Performa yang excellent dengan server-side rendering
- Developer experience yang luar biasa
- Fitur optimasi built-in
- Deployment mudah di Vercel

Untuk styling, saya menggunakan **Tailwind CSS** karena:
- Pendekatan utility-first mempercepat development
- Design system yang konsisten
- Mudah di-maintain dan customize
- Dukungan dark mode yang bagus

## Filosofi Desain

Saya ingin membuat sesuatu yang:
- **Minimalis**: Bersih dan fokus pada konten
- **Cepat**: Dioptimalkan untuk performa
- **Accessible**: Berfungsi untuk semua orang
- **Responsive**: Terlihat bagus di semua device

## Fitur Utama

### Dark Mode
Diimplementasikan dengan CSS custom properties dan dark mode classes Tailwind. Preferensi tema disimpan di localStorage.

### Internasionalisasi
Menambahkan dukungan untuk bahasa Inggris dan Indonesia dengan custom context provider.

### Optimasi Performa
- Optimasi gambar dengan Next.js Image component
- Optimasi font dengan next/font
- Code splitting dan lazy loading
- Bundle size minimal

## Tantangan

Tantangan terbesar adalah mengimplementasikan language switcher dan dark mode sambil mempertahankan kompatibilitas SSR. Saya menyelesaikannya dengan menggunakan mounted state check untuk mencegah hydration mismatches.

## Apa yang Saya Pelajari

- Cara menyusun aplikasi Next.js modern
- Pattern TypeScript lanjutan
- Teknik optimasi performa
- Pentingnya user experience

Membangun portfolio ini adalah pengalaman belajar yang luar biasa dan saya senang dengan hasilnya!`,
      date: "2024-12-18",
      tags: ["portfolio", "nextjs", "tailwind", "web development"],
      readTime: 4
    }
  },
  {
    en: {
      id: "daily-productivity-tips",
      title: "Daily Productivity Tips for Developers",
      excerpt: "Simple habits and tools that have helped me become more productive as a developer.",
      content: `# Daily Productivity Tips for Developers

As developers, we're always looking for ways to be more productive. Here are some simple habits and tools that have made a big difference in my daily workflow.

## Morning Routine

### 1. Plan Your Day
I start each day by reviewing my tasks and prioritizing them. I use a simple system:
- **Must do**: Critical tasks that can't wait
- **Should do**: Important but not urgent
- **Could do**: Nice to have if time permits

### 2. Time Blocking
I block specific times for different types of work:
- 9-11 AM: Deep focus work (coding)
- 11-12 PM: Meetings and communication
- 2-4 PM: Code reviews and debugging
- 4-5 PM: Learning and documentation

## Tools That Help

### Development Environment
- **VS Code** with essential extensions
- **Terminal** with custom aliases
- **Git** with meaningful commit messages
- **Docker** for consistent environments

### Productivity Apps
- **Notion** for documentation and notes
- **Todoist** for task management
- **RescueTime** for time tracking
- **Focus** app for blocking distractions

## Coding Habits

### 1. Write Tests First
TDD has improved both my code quality and confidence. Writing tests first forces me to think about the API design.

### 2. Regular Breaks
I use the Pomodoro Technique: 25 minutes of focused work, then a 5-minute break. It helps maintain concentration throughout the day.

### 3. Code Reviews
I always request code reviews, even for small changes. Fresh eyes catch things I miss.

## Learning Continuously

- **15 minutes daily**: Reading tech articles or documentation
- **Weekly**: Trying a new tool or technique
- **Monthly**: Deep dive into a new technology

## What Works for You?

Productivity is personal. What works for me might not work for you. The key is to experiment and find your own rhythm.

What productivity tips have worked for you? I'd love to hear about them!`,
      date: "2024-12-15",
      tags: ["productivity", "tips", "workflow", "habits"],
      readTime: 5
    },
    id: {
      id: "daily-productivity-tips",
      title: "Tips Produktivitas Harian untuk Developer",
      excerpt: "Kebiasaan sederhana dan tools yang membantu saya menjadi lebih produktif sebagai developer.",
      content: `# Tips Produktivitas Harian untuk Developer

Sebagai developer, kita selalu mencari cara untuk lebih produktif. Berikut adalah beberapa kebiasaan sederhana dan tools yang membuat perbedaan besar dalam workflow harian saya.

## Rutinitas Pagi

### 1. Rencanakan Hari Anda
Saya memulai setiap hari dengan mereview tugas-tugas dan memprioritaskannya. Saya menggunakan sistem sederhana:
- **Harus dilakukan**: Tugas kritis yang tidak bisa ditunda
- **Sebaiknya dilakukan**: Penting tapi tidak urgent
- **Bisa dilakukan**: Nice to have jika ada waktu

### 2. Time Blocking
Saya memblokir waktu spesifik untuk berbagai jenis pekerjaan:
- 9-11 AM: Deep focus work (coding)
- 11-12 PM: Meeting dan komunikasi
- 2-4 PM: Code review dan debugging
- 4-5 PM: Learning dan dokumentasi

## Tools yang Membantu

### Development Environment
- **VS Code** dengan ekstensi penting
- **Terminal** dengan custom aliases
- **Git** dengan commit message yang bermakna
- **Docker** untuk environment yang konsisten

### Aplikasi Produktivitas
- **Notion** untuk dokumentasi dan catatan
- **Todoist** untuk task management
- **RescueTime** untuk time tracking
- **Focus** app untuk memblokir distraksi

## Kebiasaan Coding

### 1. Tulis Test Dulu
TDD telah meningkatkan kualitas kode dan kepercayaan diri saya. Menulis test dulu memaksa saya berpikir tentang desain API.

### 2. Break Reguler
Saya menggunakan Teknik Pomodoro: 25 menit kerja fokus, lalu break 5 menit. Ini membantu menjaga konsentrasi sepanjang hari.

### 3. Code Review
Saya selalu meminta code review, bahkan untuk perubahan kecil. Mata segar menangkap hal-hal yang saya lewatkan.

## Belajar Terus Menerus

- **15 menit harian**: Membaca artikel tech atau dokumentasi
- **Mingguan**: Mencoba tool atau teknik baru
- **Bulanan**: Deep dive ke teknologi baru

## Apa yang Cocok untuk Anda?

Produktivitas itu personal. Yang cocok untuk saya mungkin tidak cocok untuk Anda. Kuncinya adalah bereksperimen dan menemukan ritme Anda sendiri.

Tips produktivitas apa yang berhasil untuk Anda? Saya ingin mendengarnya!`,
      date: "2024-12-15",
      tags: ["produktivitas", "tips", "workflow", "kebiasaan"],
      readTime: 5
    }
  }
]