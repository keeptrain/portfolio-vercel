"use client";

import React from "react";
import { Code2, Zap, Layout, Smartphone } from "lucide-react";
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

const SERVICES = [
  {
    icon: Code2,
    title: "Full-stack Development",
    description:
      "Building scalable, modern end-to-end web applications with clean architecture.",
  },
  {
    icon: Smartphone,
    title: "Android Application",
    description:
      "Developing native & cross-platform mobile apps with smooth performance and clean UX.",
  },
  {
    icon: Zap,
    title: "High Performance Web",
    description:
      "Sub-second render speeds, SEO excellence, and bundle optimization.",
  },
  {
    icon: Layout,
    title: "UI/UX Crafting",
    description:
      "Pixel-perfect responsive interfaces with fluid micro-interactions.",
  },
];

const REPEATED_SERVICES = [...SERVICES, ...SERVICES];

export default function BentoServicesCard({
  className = "",
}: BentoServicesCardProps) {
  return (
    <div className={`relative ${className}`}>
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

        <CarouselContent className="-ml-3 h-full sm:-ml-4">
          {REPEATED_SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <CarouselItem
                key={`${service.title}-${index}`}
                className="flex h-full basis-[85%] flex-col pl-3 sm:basis-[48%] sm:pl-4 md:basis-1/2"
              >
                <div className="group relative flex min-h-48 flex-1 flex-col justify-end overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-2xs transition-all duration-300 hover:border-zinc-400 dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:border-zinc-600">
                  <Icon className="pointer-events-none absolute -top-2 right-0 size-20 text-black/10 select-none dark:text-white/15" />
                  <div className="relative z-10 mt-auto space-y-2">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {service.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
