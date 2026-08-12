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
      <p className="w-full text-sm leading-relaxed font-light text-gray-700 sm:text-base md:w-1/2 md:text-lg dark:text-gray-300">
        As software development rapidly shifts into an automated and AI-driven
        era, I adopt a modern workflow that balances rapid velocity with
        engineering rigor. By leveraging automated systems and cutting-edge
        tools, I focus on clean architecture, continuous iteration, and thorough
        validation to deliver high-quality digital experiences.
      </p>
      <Carousel orientation="vertical" className="w-full md:w-1/2">
        <CarouselContent className="h-100">
          {data.map((item, index) => (
            <CarouselItem key={index} className="basis-[25%]">
              <div className="p-1">
                <Card>
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
