export const EXPERIENCES = [
  {
    role: "Full-stack Web Developer",
    company: "Kementerian Kelautan dan Perikanan",
    logo: "/images/logo/kkp.webp",
    period: "Nov 2025 – May 2026",
    type: "Internship",
    description:
      "Contributed to internal digitalization initiatives supporting the 4 Priority Programs.",
    highlights: [
      "Gave progress visibility to stakeholders by developing the 4 Priority Programs Monitoring Application.",
      "Sped up internal request processing duration and increased transparency through UPT Service Digitalization.",
    ],
    skills: ["Next.js", "Laravel", "Supabase"],
  },
  {
    role: "Full-stack Web Developer",
    company: "UPT Dinas Kesehatan",
    logo: "/images/logo/pusdatin.png",
    period: "May 2025 – Jul 2025",
    type: "Internship",
    description:
      "Built an internal service request management system to streamline health service operations.",
    highlights: [
      "Optimized internal workflow through the development of a service request management system equipped with end-to-end status tracking features and a discussion forum, speeding up communication between applicants and technical units and increasing service process accountability overall.",
    ],
    skills: ["Laravel", "Livewire"],
  },
  {
    role: "Full-stack Web Developer",
    company: "RPTRA Cibubur Berseri",
    logo: "/images/logo/rptra.png",
    period: "Sep 2024 – Jan 2025",
    type: "Internship",
    description:
      "Developed a program planning and management platform for community facility operations.",
    highlights: [
      "Developed a program planning management system with a reporting dashboard as the main feature to give data-driven results for RPTRA managers in optimizing operational activity effectiveness.",
    ],
    skills: ["Next.js", "Supabase"],
  },
  {
    role: "Android Developer",
    company: "Bangkit Academy — Jakarta, Indonesia",
    logo: "/images/logo/bangkit.svg",
    period: "Aug 2023 – Jan 2024",
    type: "Cohort Program",
    description:
      "Google-led cohort program in collaboration with Tokopedia, Gojek, and Traveloka, focused on Android development.",
    highlights: [
      "Developed an Android application for a capstone project with the theme Tourism, implementing clean architecture with Kotlin.",
      "Collaborated in a cross-functional team to deliver a production-ready mobile product and completed intensive cloud and soft-skill training.",
    ],
    skills: ["Android", "Kotlin"],
  },
] as const;

export const TECH_STACK = [
  {
    title: "Languages",
    items: ["TypeScript", "PHP", "Kotlin"],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "Laravel",
      "Livewire",
      "Jetpack Compose",
      "Android Views / XML",
      "TailwindCSS",
      "shadcn/ui",
    ],
  },
  {
    title: "Database & BaaS",
    items: ["PostgreSQL", "MySQL", "SQLite", "Redis", "Supabase", "Firebase"],
  },
  {
    title: "Cloud, DevOps & Infrastructure",
    items: [
      "Vercel",
      "AWS",
      "Google Cloud",
      "Docker",
      "Podman",
      "Git",
      "GitHub",
    ],
  },
  {
    title: "API & Architecture",
    items: ["REST APIs", "CI/CD", "Modular Monolith"],
  },
] as const;

export const SERVICES = [
  {
    title: "Full-stack Web Development",
    desc: "End-to-end web applications focused on performance, scalability, and maintainable architecture.",
  },
  {
    title: "Android Applications",
    desc: "Reliable mobile applications built with attention to performance and clean, maintainable code.",
  },
  {
    title: "UI/UX Attention",
    desc: "While not primarily a UI/UX designer, I always prioritize user experience and clean, intuitive interfaces in every project to ensure accessibility, usability, and a delightful experience for users.",
  },
] as const;

export interface TocItem {
  id: string;
  title: string;
  level?: number; // 1 = top, 2 = indent, 3 = deeper
}

export const TOC: TocItem[] = [
  { id: "what-is-scope", title: "What is Scope in JavaScript?" },
  { id: "office-analogy", title: "The Office Building Analogy" },
  { id: "why-scope", title: "Why Does Scope Exist?", level: 2 },
  { id: "three-types", title: "The Three Types of Scope" },
  { id: "global-scope", title: "1. Global Scope", level: 2 },
  { id: "global-object", title: "The Global Object", level: 3 },
  { id: "function-scope", title: "2. Function Scope", level: 2 },
  { id: "hoisting", title: "var Hoisting", level: 3 },
  { id: "block-scope", title: "3. Block Scope", level: 2 },
  { id: "tdz", title: "The Temporal Dead Zone (TDZ)", level: 3 },
  { id: "var-let-const", title: "var vs let vs const" },
  { id: "for-loop", title: "The Classic for-loop Problem", level: 2 },
  { id: "lexical-scope", title: "Lexical Scope" },
  { id: "scope-chain", title: "The Scope Chain", level: 2 },
  { id: "shadowing", title: "Variable Shadowing", level: 2 },
  { id: "what-is-closure", title: "What is a Closure in JavaScript?" },
  { id: "every-closure", title: "Every Function Creates a Closure", level: 2 },
  { id: "how-closures", title: "How Closures Work: Step by Step", level: 2 },
  { id: "closures-wild", title: "Closures in the Wild" },
  { id: "data-privacy", title: "1. Data Privacy & Encapsulation", level: 2 },
  { id: "factories", title: "2. Function Factories", level: 2 },
] as const;
