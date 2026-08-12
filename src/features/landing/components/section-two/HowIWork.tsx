"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-col gap-6 md:flex-row">
      <p className="w-full md:w-1/2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
        explicabo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quas, explicabo. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quas, explicabo. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quas, explicabo.
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        orientation="vertical"
        className="w-full md:w-1/2"
      >
        <CarouselContent className="-ml-4 h-50 sm:h-100">
          {data.map((item, index) => (
            <CarouselItem key={index} className="basis-[45%] pl-4">
              <Card className="relative h-full min-h-50 rounded-2xl border border-gray-300 p-4 shadow-none ring-0 md:min-h-60 md:p-6 dark:border-white/30">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-black md:text-2xl dark:text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-light text-black md:text-lg dark:text-white/80">
                    {item.desc}
                  </p>
                  <span className="absolute -bottom-2 left-10 text-4xl text-black/10 md:-bottom-3 md:text-6xl dark:text-white/15">
                    0{index + 1}
                  </span>
                </CardContent>
              </Card>
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
