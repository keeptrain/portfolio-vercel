import { Container } from "@/components/ui/Container";
import BentoIntroCard from "./BentoIntroCard";
import BentoProfileCard from "./BentoProfileCard";
import BentoProjectCard from "./BentoProjectCard";
import BentoLearningCard from "./BentoLearningCard";
import BentoSocialCard from "../section-social/BentoSocialCard";
import CompanysCarousel from "./CompanysCarousel";
import HandDrawnWrappingText from "@/components/shared/HandDrawnWrappingText";

export default function BentoHeroSection() {
  return (
    <section id="hero" className="mt-10 md:mt-16">
      <Container>
        {/* Responsive Grid Layout Container */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Baris 1: Intro (9col) + Profile (3col) */}
          <BentoIntroCard className="sm:col-span-2 lg:col-span-9" />
          <BentoProfileCard className="sm:col-span-1 lg:col-span-3" />

          {/* Baris 2: Left Group (8col) & Right Group (4col) */}
          <div className="flex flex-col justify-between lg:col-span-8">
            {/* Top Part: Company Experience */}
            <div>
              <HandDrawnWrappingText className="mx-6">
                Company Experience
              </HandDrawnWrappingText>
              <CompanysCarousel />
            </div>

            {/* Bottom Part: Social Card & Learning Card */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {/* Social Card (hidden on mobile to keep DOM light) */}
              <div className="hidden sm:col-span-1 sm:block">
                <BentoSocialCard />
              </div>

              {/* Learning Card (full-width on mobile col-span-3, 2-col on sm) */}
              <div className="col-span-3 sm:col-span-2">
                <BentoLearningCard />
              </div>
            </div>
          </div>

          {/* Latest Work Project Card (4col - drives row height) */}
          <BentoProjectCard className="h-full sm:col-span-2 lg:col-span-4" />
        </div>
      </Container>
    </section>
  );
}
