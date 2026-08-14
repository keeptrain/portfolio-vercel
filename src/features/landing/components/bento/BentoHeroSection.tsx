import { Container } from "@/components/ui/Container";
import BentoIntroCard from "./BentoIntroCard";
import BentoProfileCard from "./BentoProfileCard";
import BentoProjectCard from "./BentoProjectCard";
import BentoLearningCard from "./BentoLearningCard";
import Image from "next/image";
import BentoSocialCard from "../section-social/BentoSocialCard";

export default function BentoHeroSection() {
  return (
    <section id="hero" className="mt-10 md:mt-16">
      <Container>
        {/* Responsive Grid Layout Container */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Baris 1: Intro (9col) + Profile (3col) */}
          <BentoIntroCard className="sm:col-span-2 lg:col-span-9" />
          <BentoProfileCard className="sm:col-span-1 lg:col-span-3" />

          {/* Baris 2: Client Card (5col) + Learning (3col) + Project (4col) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3">
                <div className="relative inline-flex items-center justify-center py-1.5 text-xs font-semibold tracking-wide mx-6">
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
                  <span className="relative z-5">Company Experience</span>
                </div>
                <TechStack />
              </div>
              <div className="col-span-1">
                <BentoSocialCard />
              </div>
              <div className="col-span-2">
                <BentoLearningCard />
              </div>
            </div>
          </div>

          <BentoProjectCard className="sm:col-span-2 lg:col-span-4" />
        </div>
      </Container>
    </section>
  );
}

const COMPANY_LOGOS: Array<{ src: string; alt: string }> = [
  { src: "/images/logo/bangkit.svg", alt: "Bangkit" },
  { src: "/images/logo/rptra.png", alt: "Rptra" },
  { src: "/images/logo/pusdatin.png", alt: "Pusdatin" },
  { src: "/images/logo/kkp.webp", alt: "Kkp" },
];

function TechStack() {
  return (
    <div className="flex flex-wrap justify-center gap-8 md:flex-nowrap md:gap-24">
      {COMPANY_LOGOS.map((logo) => (
        <div
          key={logo.alt}
          className="relative aspect-square size-20 md:size-28"
        >
          <Image
            alt={logo.alt}
            src={logo.src}
            fill
            sizes="(max-width: 768px) 80px, 112px"
            className="object-contain grayscale dark:invert"
          />
        </div>
      ))}
    </div>
  );
}
