import { Container } from "@/components/ui/Container";
import BentoIntroCard from "./section-bento/BentoIntroCard";
import BentoProfileCard from "./section-bento/BentoProfileCard";
import BentoLearningCard from "./section-bento/BentoLearningCard";
import BentoAboutCarousel from "./section-bento/BentoAboutCarousel";

export default function SectionHero() {
  return (
    <section
      id="hero"
      className="flex flex-col gap-6 overflow-x-hidden sm:gap-10"
    >
      <HighlightTicker />
      <Container>
        {/* Harmonious Responsive Grid Layout */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-5 lg:gap-12">
          {/* Intro: 12col mobile / 8col md / 9col lg */}
          <BentoIntroCard className="col-span-12 md:col-span-8 lg:col-span-9" />

          {/* Profile (Foto) + Learning (Focus): Side by side on mobile (4col + 8col) */}
          <BentoProfileCard className="col-span-4 md:col-span-4 lg:col-span-3" />
          <BentoLearningCard className="col-span-8 md:col-span-4 lg:col-span-6" />

          {/* Carousel: 12col mobile / 4col md / 6col lg */}
          <BentoAboutCarousel className="col-span-12 md:col-span-4 md:-mr-[calc((100vw-100%)/2)] lg:col-span-6" />
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
      <div className="flex w-max space-x-14">
        {REPEATED_HIGHLIGHTS.map((item, idx) => {
          return (
            <span
              key={idx}
              className="text-xs tracking-widest text-black uppercase"
            >
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
