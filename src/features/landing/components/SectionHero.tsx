import { Container } from "@/components/ui/Container";
import BentoIntroCard from "./section-bento/BentoIntroCard";
import BentoProfileCard from "./section-bento/BentoProfileCard";
import BentoProjectCard from "./section-bento/BentoProjectCard";
import BentoLearningCard from "./section-bento/BentoLearningCard";
import CompanysCarousel from "./section-bento/CompanysCarousel";
import BentoSocialCard from "./section-social/BentoSocialCard";
import HandDrawnWrappingText from "@/components/shared/HandDrawnWrappingText";

export default function SectionHero() {
  return (
    <section id="hero" className="mt-2 sm:mt-4 md:mt-6">
      <HighlightTicker />
      <Container>
        {/* Harmonious Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 lg:gap-6">
          {/* Baris 1: Intro (8col md / 9col lg) + Profile (4col md / 3col lg) */}
          <BentoIntroCard className="md:col-span-8 lg:col-span-9" />
          <BentoProfileCard className="md:col-span-4 lg:col-span-3" />

          {/* Baris 2: Left Group (7col md / 8col lg) & Right Project Card (5col md / 4col lg) */}
          <div className="flex flex-col justify-between gap-4 md:col-span-7 lg:col-span-8">
            {/* Top Part: Company Experience */}
            <div>
              <HandDrawnWrappingText className="mx-6">
                Company Experience
              </HandDrawnWrappingText>
              <CompanysCarousel />
            </div>

            {/* Bottom Part: Social Card & Learning Card */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {/* Social Card (hidden on mobile, visible on sm+) */}
              <div className="hidden sm:col-span-1 sm:block">
                <BentoSocialCard />
              </div>

              {/* Learning Card */}
              <div className="col-span-1 sm:col-span-2">
                <BentoLearningCard />
              </div>
            </div>
          </div>

          {/* Latest Work Project Card */}
          <BentoProjectCard className="h-full md:col-span-5 lg:col-span-4" />
        </div>
      </Container>
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
      <div className="flex w-max space-x-16 whitespace-nowrap">
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
