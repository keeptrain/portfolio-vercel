"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero Section
    "hero.greeting": "Hi, I'm",
    "hero.name": "Chef Gilang",
    "hero.role.greeting": "I'am a",
    "hero.role": "Junior Developer",
    "hero.description":
      "Iam a passionate Junior Developer creating beautiful, functional, and user-centered digital experiences.",
    "hero.viewWork": "View My Work",
    "hero.getInTouch": "Get In Touch",

    // About Section
    "about.title": "About Me",
    "about.description1":
      "I&apos;m a passionate full-stack developer with over 3 years of experience creating digital solutions that combine beautiful design with robust functionality. I love turning complex problems into simple, elegant designs.",
    "about.description2":
      "When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",

    // Projects Section
    "projects.title": "Featured Projects",
    "projects.ecommerce.title": "E-Commerce Platform",
    "projects.ecommerce.description":
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
    "projects.taskmanager.title": "Task Management App",
    "projects.taskmanager.description":
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    "projects.weather.title": "Weather Dashboard",
    "projects.weather.description":
      "A responsive weather dashboard that provides detailed forecasts, interactive maps, and location-based weather alerts.",
    "projects.code": "Code",
    "projects.demo": "Demo",

    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Email me and lets work together",
    "contact.description":
      "I&apos;m always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.namePlaceholder": "Gilang",
    "contact.form.emailPlaceholder": "your.email@example.com",
    "contact.form.messagePlaceholder": "Tell me about your project...",
    "contact.form.send": "Send Message",

    // Footer
    "footer.tagline": "Building the future, one line of code at a time.",
    "footer.copyright": "All rights reserved.",

    // Blog
    "blog.title": "Blog & Daily Diary",
    "blog.subtitle":
      "Sharing my thoughts, experiences, and learnings as a developer.",
    "blog.searchPlaceholder": "Search posts...",
    "blog.clearFilters": "Clear Filters",
    "blog.noPostsFound": "No posts found",
    "blog.noPostsDescription": "Try adjusting your search or filter criteria.",
    "blog.backToPortfolio": "Back to Portfolio",
    "blog.readMore": "Read more",
    "blog.minRead": "min read",
    "blog.featured": "Featured",
    "blog.relatedPosts": "Related Posts",
    "blog.sharePost": "Share this post:",
    "blog.backToBlog": "Back to Blog",
  },
  id: {
    // Navigation
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.contact": "Kontak",

    // Hero Section
    "hero.greeting": "Halo, saya",
    "hero.name": "Nama Anda",
    "hero.role.greeting": "Saya seorang",
    "hero.role": "Junior Developer",
    "hero.description":
      "Seorang Full Stack Developer yang bersemangat menciptakan pengalaman digital yang indah, fungsional, dan berpusat pada pengguna.",
    "hero.viewWork": "Lihat Karya Saya",
    "hero.getInTouch": "Hubungi Saya",

    // About Section
    "about.title": "Tentang Saya",
    "about.description1":
      "Saya adalah seorang full-stack developer yang bersemangat dengan pengalaman lebih dari 3 tahun dalam menciptakan solusi digital yang menggabungkan desain indah dengan fungsionalitas yang kuat. Saya suka mengubah masalah kompleks menjadi desain yang sederhana dan elegan.",
    "about.description2":
      "Ketika tidak sedang coding, Anda dapat menemukan saya menjelajahi teknologi baru, berkontribusi pada proyek open-source, atau berbagi pengetahuan dengan komunitas developer.",

    // Projects Section
    "projects.title": "Proyek Unggulan",
    "projects.ecommerce.title": "Platform E-Commerce",
    "projects.ecommerce.description":
      "Solusi e-commerce full-stack yang dibangun dengan Next.js, menampilkan autentikasi pengguna, pemrosesan pembayaran, dan dashboard admin.",
    "projects.taskmanager.title": "Aplikasi Manajemen Tugas",
    "projects.taskmanager.description":
      "Aplikasi manajemen tugas kolaboratif dengan pembaruan real-time, fungsionalitas drag-and-drop, dan fitur kolaborasi tim.",
    "projects.weather.title": "Dashboard Cuaca",
    "projects.weather.description":
      "Dashboard cuaca responsif yang menyediakan prakiraan detail, peta interaktif, dan peringatan cuaca berbasis lokasi.",
    "projects.code": "Kode",
    "projects.demo": "Demo",

    // Contact Section
    "contact.title": "Hubungi Saya",
    "contact.subtitle": "Mari bekerja sama",
    "contact.description":
      "Saya selalu tertarik dengan peluang baru dan proyek yang menarik. Baik Anda memiliki pertanyaan atau hanya ingin menyapa, jangan ragu untuk menghubungi!",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.form.name": "Nama",
    "contact.form.email": "Email",
    "contact.form.message": "Pesan",
    "contact.form.namePlaceholder": "Nama Anda",
    "contact.form.emailPlaceholder": "email.anda@example.com",
    "contact.form.messagePlaceholder": "Ceritakan tentang proyek Anda...",
    "contact.form.send": "Kirim Pesan",

    // Footer
    "footer.tagline": "Membangun masa depan, satu baris kode pada satu waktu.",
    "footer.copyright": "Hak cipta dilindungi.",

    // Blog
    "blog.title": "Blog & Diary Harian",
    "blog.subtitle":
      "Berbagi pemikiran, pengalaman, dan pembelajaran saya sebagai developer.",
    "blog.searchPlaceholder": "Cari postingan...",
    "blog.clearFilters": "Hapus Filter",
    "blog.noPostsFound": "Tidak ada postingan ditemukan",
    "blog.noPostsDescription":
      "Coba sesuaikan kriteria pencarian atau filter Anda.",
    "blog.backToPortfolio": "Kembali ke Portfolio",
    "blog.readMore": "Baca selengkapnya",
    "blog.minRead": "menit baca",
    "blog.featured": "Unggulan",
    "blog.relatedPosts": "Postingan Terkait",
    "blog.sharePost": "Bagikan postingan ini:",
    "blog.backToBlog": "Kembali ke Blog",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language);
    }
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "id" : "en"));
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
