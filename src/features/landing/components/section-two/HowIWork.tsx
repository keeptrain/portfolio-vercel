"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "@/i18n/TranslationContext";
import Link from "next/link";

type DataItem = {
  id: string;
  title: string;
  desc: string;
};

const data: DataItem[] = [
  {
    id: "brainstorming",
    title: "Brainstorming",
    desc: "Before writing any code, I take the time to fully understand the problem or feature requirements.",
  },
  {
    id: "develop",
    title: "Develop",
    desc: "I focus on writing clean, readable code and practice an iterative approach.",
  },
  {
    id: "validate",
    title: "Validate",
    desc: "Once my code is written, I perform thorough self-testing to verify that it functions as expected and meets all requirements.",
  },
  {
    id: "collaborate",
    title: "Collaborate",
    desc: "I believe in the power of teamwork. I submit my work for code review, viewing feedback as an invaluable opportunity for growth.",
  },
];

export default function HowIWork() {
  const { t, locale } = useTranslations();
  return (
    <div className="flex flex-col space-y-10">
      <div>
        <p className="w-full text-sm leading-relaxed font-light text-gray-700 sm:text-base md:w-2/3 md:text-lg dark:text-gray-300">
          {t("sectionTwo.howIWorkIntro")}
        </p>
      </div>
      <Carousel orientation="vertical" className="w-full">
        <CarouselContent className="h-100">
          {data.map((item, index) => (
            <CarouselItem key={index} className="basis-[25%]">
              <Link href={`/${locale}/workflow#${item.id}`}>
                <div className="p-1">
                  <Card className="transition-all duration-300 hover:ring-foreground/30">
                    <CardHeader className="relative">
                      <CardTitle>{item.title}</CardTitle>
                      <span className="absolute right-10 bottom-0.5 text-4xl text-black/10 md:text-6xl dark:text-white/15">
                        0{index + 1}
                      </span>
                    </CardHeader>
                    <CardContent>
                      <p>{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute right-0 bottom-0 z-10 flex flex-row gap-2 md:flex-col">
          <CarouselPrevious className="relative inset-auto translate-x-0 translate-y-0" />
          <CarouselNext className="relative inset-auto translate-x-0 translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
