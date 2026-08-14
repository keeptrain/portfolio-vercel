"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons/HandyArrows";
import { MailIcon } from "lucide-react";

interface SocialItem {
  id: "linkedin" | "email" | "github";
  name: string;
  url: string;
  bgColor: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com",
    bgColor: "bg-[#89D3F3]",
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:yourname@email.com",
    bgColor: "bg-sky-800 dark:bg-zinc-800",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com",
    bgColor: "bg-zinc-900",
  },
];

export default function BentoSocialCard() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="relative w-full overflow-hidden rounded-xl"
    >
      <CarouselContent>
        {SOCIAL_ITEMS.map((item) => (
          <CarouselItem key={item.id}>
            <Link href={item.url} target="_blank" rel="noopener noreferrer">
              {/* Card Container with Social Background */}
              <div
                className={`relative flex aspect-4/3 w-full items-center justify-center rounded-xl ${item.bgColor} transition-colors`}
              >
                {/* Center Social Icon / Brand */}
                {item.id === "linkedin" ? (
                  <span className="font-sans text-4xl font-extrabold tracking-tighter text-white sm:text-5xl">
                    in
                  </span>
                ) : item.id === "email" ? (
                  <div className="flex flex-col items-center gap-1 text-white">
                    <p className="text-base font-medium tracking-tight sm:text-lg">
                      email me
                    </p>
                    <MailIcon className="size-4 sm:size-5" />
                  </div>
                ) : (
                  <GithubIcon />
                )}
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Clear & Visible Pagination Dots at Bottom-Left */}
      <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1">
        {SOCIAL_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              current === index
                ? "w-4 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute right-3 bottom-2.5 z-5 hidden lg:block">
        <ArrowUpRight color={"text-white"} />
      </div>
    </Carousel>
  );
}

function GithubIcon() {
  return (
    <svg className="size-10 fill-white sm:size-14" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
