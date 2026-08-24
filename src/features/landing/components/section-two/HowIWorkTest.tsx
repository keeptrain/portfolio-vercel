import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLocale } from "@/i18n/server";
import { workflowSections } from "@/features/workflow/data";

export default function HowIWorkTest() {
  const locale = getLocale();
  const topSections = workflowSections.slice(0, 2);
  const bottomSections = workflowSections.slice(2);

  return (
    <div className="flex flex-col gap-3.5 sm:gap-12">
      {/* Row 1: 2 Cards (Centered on desktop) */}
      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-12">
        {topSections.map((section, index) => (
          <Link
            key={section.id}
            href={`/${locale}/workflow#${section.id}`}
            className="group relative flex h-36 flex-col justify-end overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-2xs transition-all duration-300 hover:border-zinc-400 sm:h-40 sm:p-6 md:h-44 dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <span className="pointer-events-none absolute -top-4 right-2 text-7xl tracking-tighter text-black/5 select-none sm:-top-6 sm:text-8xl md:-top-8 md:text-9xl dark:text-white/10">
              0{index + 1}
            </span>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-100">
                {section.title}
              </h3>
              <ArrowUpRight className="size-4 shrink-0 text-zinc-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-100" />
            </div>
          </Link>
        ))}
      </div>

      {/* Row 2: 3 Cards */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-12">
        {bottomSections.map((section, index) => (
          <Link
            key={section.id}
            href={`/${locale}/workflow#${section.id}`}
            className="group relative flex h-36 flex-col justify-end overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-2xs transition-all duration-300 hover:border-zinc-400 sm:h-40 sm:p-6 md:h-44 dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-zinc-600"
          >
            <span className="pointer-events-none absolute -top-4 right-2 text-7xl tracking-tighter text-black/5 select-none sm:-top-6 sm:text-8xl md:-top-8 md:text-9xl dark:text-white/10">
              0{index + 3}
            </span>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-zinc-900 sm:text-lg dark:text-zinc-100">
                {section.title}
              </h3>
              <ArrowUpRight className="size-4 shrink-0 text-zinc-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-100" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
