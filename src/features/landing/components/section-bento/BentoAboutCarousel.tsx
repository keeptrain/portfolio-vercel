"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusinessIcon,
  LayersIcon,
  HandPlatterIcon,
  ListTodoIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "@/i18n/TranslationContext";

interface BentoAboutCarouselProps {
  className?: string;
}

function getCarouselItems(t: (key: string) => string, locale: string) {
  return [
    {
      title: t("sectionHero.about.howIWork.title"),
      description: t("sectionHero.about.howIWork.description"),
      icon: ListTodoIcon,
      href: `/${locale}/workflow`,
    },
    {
      title: t("sectionHero.about.experience.title"),
      description: t("sectionHero.about.experience.description"),
      icon: BriefcaseBusinessIcon,
      href: `/${locale}/about/experiences`,
    },
    {
      title: t("sectionHero.about.techStack.title"),
      description: t("sectionHero.about.techStack.description"),
      icon: LayersIcon,
      href: `/${locale}/about/techstack`,
    },
    {
      title: t("sectionHero.about.services.title"),
      description: t("sectionHero.about.services.description"),
      icon: HandPlatterIcon,
      href: `/${locale}/about/services`,
    },
  ];
}

export default function BentoAboutCarousel({
  className = "",
}: BentoAboutCarouselProps) {
  const { t, locale } = useTranslations();
  const carouselItems = getCarouselItems(t, locale);

  return (
    <div className={`relative ${className}`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="flex h-full w-full flex-col justify-between **:data-[slot=carousel-content]:h-full"
      >
        <CarouselContent className="h-full">
          {carouselItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <CarouselItem
                key={`${item.title}-${index}`}
                className="flex h-full w-full basis-[85%] sm:basis-[48%]"
              >
                <div className="p-1">
                  <Link href={item.href} className="group block h-full">
                    <Card className="flex h-full flex-col justify-between transition-all duration-300 hover:border-foreground/30 hover:shadow-md active:scale-98">
                      <CardHeader>
                        <CardTitle className="relative flex items-center justify-between pr-25">
                          <Icon className="pointer-events-none absolute -top-10 -right-10 size-30 text-black/10 select-none dark:text-white/15" />
                          <span>{item.title}</span>
                          {/* Top-right Hover Arrow Indicator */}
                          <div className="z-10 flex size-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all duration-300 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-white dark:group-hover:text-zinc-900">
                            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{item.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="flex items-center justify-end pt-2 md:hidden">
          <div className="flex items-center gap-3">
            <CarouselPrevious className="static size-7 translate-y-0 border-zinc-200/80 dark:border-zinc-800" />
            <CarouselNext className="static size-7 translate-y-0 border-zinc-200/80 dark:border-zinc-800" />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
