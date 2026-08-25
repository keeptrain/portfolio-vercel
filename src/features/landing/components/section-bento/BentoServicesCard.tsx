"use client";

import Link from "next/link";
import { Briefcase, Layers, Sparkles, ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BentoServicesCardProps {
  className?: string;
}

const CAROUSEL_ITEMS = [
  {
    title: "Experience",
    subtitle: "1.5+ Years",
    description:
      "Building scalable digital products across web and mobile platforms.",
    icon: Briefcase,
    query: "experiences",
  },
  {
    title: "Tech Stack",
    subtitle: "Core Suite",
    description:
      "Next.js, TypeScript, Android (Kotlin), Node.js, and Tailwind CSS.",
    icon: Layers,
    query: "techstack",
  },
  {
    title: "Services",
    subtitle: "What I Do",
    description:
      "Full-stack web apps, native Android applications, and UI/UX crafting.",
    icon: Sparkles,
    query: "services",
  },
];

const REPEATED_ITEMS = [...CAROUSEL_ITEMS, ...CAROUSEL_ITEMS];

export default function BentoServicesCard({
  className = "",
}: BentoServicesCardProps) {
  return (
    <div className={`relative h-full ${className}`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="flex h-full w-full flex-col justify-between"
      >
        <div className="flex items-center justify-end pb-2 md:hidden">
          <div className="flex items-center gap-1.5">
            <CarouselPrevious className="static size-7 translate-y-0 border-zinc-200/80 dark:border-zinc-800" />
            <CarouselNext className="static size-7 translate-y-0 border-zinc-200/80 dark:border-zinc-800" />
          </div>
        </div>

        <CarouselContent>
          {REPEATED_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <CarouselItem
                key={`${item.title}-${index}`}
                className="flex h-full basis-[85%] flex-col pl-3 sm:basis-[48%] sm:pl-4 md:basis-1/2"
              >
                <Link
                  href={{
                    pathname: "/about",
                    query: { tab: item.query },
                  }}
                  transitionTypes={["slide-in"]}
                  className="group relative flex min-h-50 flex-1 flex-col justify-end overflow-hidden rounded-xl border border-foreground/10 bg-white p-5 shadow-2xs transition-all duration-300 hover:border-foreground/30 active:scale-98 dark:bg-zinc-900"
                >
                  <Icon className="pointer-events-none absolute -top-2 right-0 size-30 text-black/10 select-none dark:text-white/15" />

                  {/* Top-right Hover Arrow Indicator */}
                  <div className="absolute top-4 right-4 z-10 flex size-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all duration-300 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <div className="relative z-10 mt-auto space-y-1.5">
                    <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                      {item.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
