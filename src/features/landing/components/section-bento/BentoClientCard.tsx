import Image from "next/image";
import BentoCardWrapper from "./BentoCardWrapper";
import { ArrowUpRight } from "@/components/icons/HandyArrows";
import Link from "next/link";

const CLIENT_LOGOS: {
  name: string;
  src: string;
}[] = [
  { name: "Bangkit", src: "/images/logo/bangkit.svg" },
  { name: "RPTRA", src: "/images/logo/rptra.png" },
  { name: "Pusdatin", src: "/images/logo/pusdatin.png" },
  { name: "KKP", src: "/images/logo/kkp.webp" },
];

export default function BentoClientCard({
  className = "",
}: {
  className?: string;
}) {
  return (
    <BentoCardWrapper className={`relative ${className}`}>
      <div className="flex h-full w-full flex-col items-center justify-center">
        {/* Row 1: 2 Logos Overlapping Left */}
        <div className="flex -translate-x-8 items-center justify-center gap-6 sm:-translate-x-10 sm:gap-8">
          <div className="relative h-12 w-36 shrink-0 sm:h-8 sm:w-44">
            <Image
              src={CLIENT_LOGOS[0].src}
              alt={CLIENT_LOGOS[0].name}
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-contain opacity-50 grayscale dark:opacity-25 dark:brightness-200 dark:invert"
            />
          </div>
          <div className="relative h-16 w-36 shrink-0 sm:h-20 sm:w-44">
            <Image
              src={CLIENT_LOGOS[1].src}
              alt={CLIENT_LOGOS[1].name}
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-contain opacity-50 grayscale dark:opacity-25 dark:brightness-200 dark:invert"
            />
          </div>
        </div>

        {/* Row 2: 2 Logos Overlapping Right */}
        <div className="flex translate-x-8 items-center justify-center gap-6 sm:translate-x-10 sm:gap-8">
          <div className="relative h-16 w-36 shrink-0 sm:h-13 sm:w-44">
            <Image
              src={CLIENT_LOGOS[3].src}
              alt={CLIENT_LOGOS[3].name}
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-contain opacity-50 grayscale dark:opacity-25 dark:brightness-200 dark:invert"
            />
          </div>
          <div className="relative h-16 w-36 shrink-0 sm:h-25 sm:w-44">
            <Image
              src={CLIENT_LOGOS[2].src}
              alt={CLIENT_LOGOS[2].name}
              fill
              sizes="(max-width: 640px) 144px, 176px"
              className="object-contain opacity-50 grayscale dark:opacity-25 dark:brightness-200 dark:invert"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 text-xs font-semibold tracking-wide text-gray-900 dark:text-white">
        {/* Hand-drawn SVG frame wrapping the text */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-gray-900/90 dark:text-white/90"
          viewBox="0 0 120 40"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 12,20 C 10,7 28,4 60,5 C 92,4 110,7 108,20 C 110,33 92,36 60,35 C 28,36 10,33 12,20 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="relative z-10">My Experience</span>
      </div>
      <Link
        href={""}
        className="absolute right-6 bottom-2 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <ArrowUpRight color={"text-blue-old"} />
      </Link>
    </BentoCardWrapper>
  );
}
