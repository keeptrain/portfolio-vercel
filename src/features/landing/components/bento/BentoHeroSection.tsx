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
    <section id="hero" className="mt-6 sm:mt-10 md:mt-16">
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
