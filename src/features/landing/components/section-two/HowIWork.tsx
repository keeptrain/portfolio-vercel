import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLocale } from "@/i18n/server";
import { workflowSections } from "@/features/workflow/data";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function HowIWork() {
  const locale = getLocale();
  const topSections = workflowSections.slice(0, 2);
  const bottomSections = workflowSections.slice(2);

  return (
    <div className="flex flex-col gap-3.5 md:gap-12">
      {/* Row 1: 2 Cards (Centered on desktop) */}
      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-3.5 sm:grid-cols-2 md:gap-12">
        {topSections.map((section, index) => (
          <Link
            key={section.id}
            href={`/${locale}/workflow#${section.id}`}
            className="group block"
          >
            <Card className="relative flex h-36 flex-col justify-end overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:shadow-md active:scale-98 sm:h-40 md:h-40">
              <span className="pointer-events-none absolute -top-4 right-2 text-7xl tracking-tighter text-black/5 select-none sm:-top-6 sm:text-8xl md:-top-8 md:text-9xl dark:text-white/10">
                0{index + 1}
              </span>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{section.title}</CardTitle>
                  <ArrowUpRight className="size-4 shrink-0 text-zinc-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-100" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Row 2: 3 Cards */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 md:gap-12">
        {bottomSections.map((section, index) => (
          <Link
            key={section.id}
            href={`/${locale}/workflow#${section.id}`}
            className="group block"
          >
            <Card className="relative flex h-36 flex-col justify-end overflow-hidden transition-all duration-300 hover:border-foreground/30 hover:shadow-md active:scale-98 sm:h-40 md:h-40">
              <span className="pointer-events-none absolute -top-4 right-2 text-7xl tracking-tighter text-black/5 select-none sm:-top-6 sm:text-8xl md:-top-8 md:text-9xl dark:text-white/10">
                0{index + 3}
              </span>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{section.title}</CardTitle>
                  <ArrowUpRight className="size-4 shrink-0 text-zinc-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-100" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
