import { Container } from "@/components/ui/Container";
import BentoIntroCard from "./section-bento/BentoIntroCard";
import BentoProfileCard from "./section-bento/BentoProfileCard";
import BentoLearningCard from "./section-bento/BentoLearningCard";
import CompanysCarousel from "./section-bento/CompanysCarousel";
import BentoSocialCard from "./section-social/BentoSocialCard";

export default function SectionHero() {
  return (
    <section id="hero" className="mt-2 flex flex-col gap-12 sm:mt-4 md:mt-6">
      <HighlightTicker />
      <Container>
        {/* Harmonious Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 lg:gap-12">
          {/* Baris 1: Intro (8col md / 9col lg) + Profile (4col md / 3col lg) */}
          <BentoIntroCard className="md:col-span-8 lg:col-span-9" />
          <BentoProfileCard className="md:col-span-4 lg:col-span-3" />

          <div className="md:col-span-4 lg:col-span-3">
            <BentoSocialCard />
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <BentoSocialCard />
          </div>

          <BentoLearningCard className="md:col-span-4 lg:col-span-6" />
        </div>
      </Container>
      <div>
        <CompanysCarousel />
      </div>
    </section>
  );
}

const highlights = [
  { text: "AVAILABLE FOR" },
  { text: "FULLTIME" },
  { text: "FREELANCE" },
];

const REPEATED_HIGHLIGHTS = [
  ...highlights,
  ...highlights,
  ...highlights,
  ...highlights,
  ...highlights,
];

function HighlightTicker() {
  return (
    <div className="my-6 w-full overflow-hidden border-y border-emerald-300/80 bg-[#A7F3D0] py-3">
      <div className="flex w-max space-x-16">
        {REPEATED_HIGHLIGHTS.map((item, idx) => {
          return (
            <span key={idx} className="text-xs tracking-widest uppercase">
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
