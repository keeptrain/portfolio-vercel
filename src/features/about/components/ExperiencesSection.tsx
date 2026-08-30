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
    role: "Full-stack Web Developer",
    company: "Kementerian Kelautan dan Perikanan",
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
