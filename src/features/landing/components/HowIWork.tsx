"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type DataItem = {
  title: string;
  desc: string;
};

const data: DataItem[] = [
  {
    title: "Plan",
    desc: "Before writing any code, I take the time to fully understand the problem or feature requirements.",
  },
  {
    title: "Develop",
    desc: "I focus on writing clean, readable code and practice an iterative approach.",
  },
  {
    title: "Validate",
    desc: "Once my code is written, I perform thorough self-testing to verify that it functions as expected and meets all requirements.",
  },
  {
    title: "Collaborate",
    desc: "I believe in the power of teamwork. I submit my work for code review, viewing feedback as an invaluable opportunity for growth.",
  },
];

export default function HowIWork() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="mt-6 w-full"
    >
      <CarouselContent className="-ml-4">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="pl-4 basis-full md:basis-1/2 lg:basis-[45%]"
          >
            <Card className="relative h-full min-h-[200px] rounded-2xl border border-gray-300 p-4 shadow-none ring-0 dark:border-white/30 md:min-h-[240px] md:p-6">
              <CardHeader className="p-0">
                <CardTitle className="text-md mb-2 font-medium text-black md:text-2xl dark:text-white">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="mb-8 text-xs font-light text-black md:text-lg dark:text-white/80">
                  {item.desc}
                </p>
                <span className="absolute -bottom-2 left-4 text-4xl text-black/10 md:-bottom-2 md:left-6 md:text-6xl dark:text-white/15">
                  0{index + 1}
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex justify-center gap-2 md:absolute md:top-0 md:right-0 md:-translate-y-full md:translate-x-0 md:pb-2">
        <CarouselPrevious className="relative inset-auto translate-x-0 translate-y-0" />
        <CarouselNext className="relative inset-auto translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
}
