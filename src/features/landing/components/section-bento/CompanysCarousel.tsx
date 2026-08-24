"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

const COMPANY_LOGOS: Array<{ src: string; alt: string }> = [
  { src: "/images/logo/bangkit.svg", alt: "Bangkit" },
  { src: "/images/logo/rptra.png", alt: "Rptra" },
  { src: "/images/logo/pusdatin.png", alt: "Pusdatin" },
  { src: "/images/logo/kkp.webp", alt: "Kkp" },
];

// Duplicate logos array so embla has enough items to continuously loop smoothly
const REPEATED_LOGOS = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

const OPTIONS: { loop: boolean; watchDrag: boolean } = {
  loop: true,
  watchDrag: false,
};

export default function CompanysCarousel() {
  const [emblaRef] = useEmblaCarousel(OPTIONS, [
    AutoScroll({
      speed: 1,
    }),
  ]);

  return (
    <div ref={emblaRef} className="overflow-hidden select-none">
      {/* container */}
      <div className="flex items-center">
        {REPEATED_LOGOS.map((logo, index) => (
          /* slide */
          <div
            key={`${logo.alt}-${index}`}
            className="min-w-0 shrink-0 grow-0 basis-1/2 transform-[translate3d(0,0,0)] pl-4 sm:basis-1/3 md:basis-1/4"
          >
            <div className="relative aspect-square size-30">
              <Image
                alt={logo.alt}
                src={logo.src}
                fill
                sizes="(max-width: 768px) 80px, 112px"
                className="pointer-events-none object-contain opacity-60 grayscale dark:invert"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
