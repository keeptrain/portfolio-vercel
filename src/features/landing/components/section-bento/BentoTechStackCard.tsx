import React from "react";

interface BentoTechStackCardProps {
  className?: string;
}

const TECH_ITEMS = [
  {
    name: "TypeScript",
    style: "py-1.5 px-3.5 text-xs font-semibold hover:rotate-1",
  },
  {
    name: "Next.js",
    style:
      "py-1 px-3 text-xs font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:-rotate-1",
  },
  {
    name: "React",
    style: "py-1.5 px-3 text-xs font-semibold hover:translate-y-0.5",
  },
  {
    name: "Tailwind CSS",
    style: "py-1 px-3.5 text-xs font-medium hover:-translate-y-0.5",
  },
  {
    name: "Node.js",
    style: "py-1.5 px-3 text-[11px] font-medium hover:rotate-2",
  },
  {
    name: "PostgreSQL",
    style: "py-1 px-3 text-xs font-semibold hover:-rotate-1",
  },
  { name: "JavaScript", style: "py-1.5 px-3.5 text-xs font-medium" },
  {
    name: "Supabase",
    style: "py-1.5 px-3 text-xs font-semibold hover:-translate-y-0.5",
  },
  {
    name: "Prisma",
    style: "py-1 px-2.5 text-[11px] font-medium hover:rotate-1",
  },
  { name: "Redis", style: "py-1.5 px-3 text-xs font-medium hover:-rotate-2" },
  { name: "Express", style: "py-1 px-3 text-xs font-medium" },
  {
    name: "MongoDB",
    style: "py-1.5 px-3 text-xs font-semibold hover:translate-x-0.5",
  },
  { name: "HTML / CSS", style: "py-1 px-2.5 text-[11px] font-medium" },
  {
    name: "Vercel",
    style: "py-1.5 px-3 text-xs font-bold hover:-translate-y-0.5",
  },
  { name: "Firebase", style: "py-1 px-3 text-xs font-medium hover:rotate-1" },
  { name: "SQL", style: "py-1.5 px-2.5 text-[11px] font-medium" },
];

export default function BentoTechStackCard({
  className = "",
}: BentoTechStackCardProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {TECH_ITEMS.map((item) => (
        <div
          key={item.name}
          className={`group relative flex items-center justify-center rounded-lg border border-zinc-200/80 bg-white shadow-2xs transition-all duration-300 hover:border-zinc-400 hover:shadow-xs dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-zinc-600 ${item.style}`}
        >
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
