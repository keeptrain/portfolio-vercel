import { Building2, Calendar } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Independent / Client Projects",
    period: "2023 - Present",
    type: "Full-time & Freelance",
    description:
      "Architecting and developing modern web and Android applications focused on performance, accessibility, and clean scalable codebases.",
    highlights: [
      "Built responsive Next.js web applications with server-side rendering and sub-second load times.",
      "Developed native Android applications using Kotlin, Jetpack Compose, and clean UI architecture.",
      "Crafted custom design systems, fluid micro-interactions, and accessible UI component libraries.",
    ],
    skills: [
      "Next.js",
      "TypeScript",
      "React",
      "Kotlin",
      "Tailwind CSS",
      "Node.js",
    ],
  },
  {
    role: "Mobile Developer & Cloud Fellow",
    company: "Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)",
    period: "2023",
    type: "Cohort Program",
    description:
      "Intensive software engineering program specializing in Android mobile architecture and cloud infrastructure.",
    highlights: [
      "Engineered mobile application architecture using Kotlin, Android Jetpack, and RESTful APIs.",
      "Collaborated in cross-functional teams to deliver production-ready capstone software products.",
    ],
    skills: [
      "Android",
      "Kotlin",
      "Jetpack Compose",
      "REST APIs",
      "Cloud Infrastructure",
    ],
  },
];

export default function ExperiencesSection() {
  return (
    <section className="animate-in space-y-6 duration-200 fade-in-50">
      {/* Section Header */}
      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
        Experiences
      </h2>

      {/* Experience List */}
      <div className="space-y-6">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="space-y-4 rounded-2xl border border-zinc-200/80 p-6 transition-all dark:border-zinc-800/80"
          >
            {/* Header: Role, Company & Period */}
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-base font-bold text-zinc-900 sm:text-lg dark:text-zinc-100">
                  {exp.role}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 md:text-sm dark:text-zinc-400">
                  <Building2 className="size-3.5 shrink-0" />
                  <span>{exp.company}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-zinc-400">
                  <Calendar className="size-3 shrink-0" />
                  {exp.period}
                </span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {exp.type}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed text-zinc-600 md:text-sm dark:text-zinc-400">
              {exp.description}
            </p>

            {/* Key Highlights */}
            <ul className="list-disc space-y-1.5 pl-5 text-xs text-zinc-500 md:text-sm dark:text-zinc-400">
              {exp.highlights.map((item, itemIdx) => (
                <li key={itemIdx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
