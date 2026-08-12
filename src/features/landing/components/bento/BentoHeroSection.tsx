import { Container } from "@/components/ui/Container";
import { Locale } from "@/i18n/locales";
import BentoIntroCard from "./BentoIntroCard";
import BentoProfileCard from "./BentoProfileCard";
import BentoProjectCard from "./BentoProjectCard";
import BentoLearningCard from "./BentoLearningCard";
import BentoColorPaletteCard from "./BentoColorPaletteCard";

interface BentoHeroSectionProps {
  t: (key: string) => string;
  locale: Locale;
}

export default function BentoHeroSection({ t, locale }: BentoHeroSectionProps) {
  return (
    <section id="hero">
      <Container>
        {/* Responsive Grid Layout Container */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Baris 1: Intro (6col) + Profile (3col) + Theme Palette Switcher (3col) */}
          <BentoIntroCard t={t} className="sm:col-span-2 lg:col-span-9" />

          <BentoProfileCard t={t} className="sm:col-span-1 lg:col-span-3" />

          {/* Baris 2: Project (5col) + Learning (4col) + Social Carousel (3col) */}
          <BentoColorPaletteCard className="sm:col-span-1 lg:col-span-3" />

          <BentoLearningCard t={t} className="sm:col-span-2 lg:col-span-4" />
          <BentoProjectCard
            t={t}
            locale={locale}
            className="sm:col-span-2 lg:col-span-5"
          />
        </div>
      </Container>
    </section>
  );
}
