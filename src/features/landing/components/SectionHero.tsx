import { Container } from "@/components/ui/Container";
import BentoIntroCard from "./section-bento/BentoIntroCard";
import BentoProfileCard from "./section-bento/BentoProfileCard";
import BentoLearningCard from "./section-bento/BentoLearningCard";
import BentoServicesCard from "./section-bento/BentoServicesCard";

export default function SectionHero() {
  return (
    <section id="hero" className="flex flex-col overflow-x-hidden pb-1">
      <HighlightTicker />
      <Container>
        {/* Harmonious Responsive Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 lg:gap-12">
          {/* Baris 1: Intro (8col md / 9col lg) + Profile (4col md / 3col lg) */}
          <BentoIntroCard className="md:col-span-8 lg:col-span-9" />
          <BentoProfileCard className="md:col-span-4 lg:col-span-3" />

          <BentoLearningCard className="md:col-span-4 lg:col-span-6" />
          <BentoServicesCard className="md:col-span-4 md:-mr-[calc((100vw-100%)/2)] lg:col-span-6" />
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
