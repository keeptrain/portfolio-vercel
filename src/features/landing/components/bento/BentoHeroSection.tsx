import { Container } from "@/components/ui/Container";
import BentoIntroCard from "./BentoIntroCard";
import BentoProfileCard from "./BentoProfileCard";
import BentoProjectCard from "./BentoProjectCard";
import BentoLearningCard from "./BentoLearningCard";
import BentoClientCard from "./BentoClientCard";

export default function BentoHeroSection() {
  return (
    <section id="hero">
      <Container>
        {/* Responsive Grid Layout Container */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Baris 1: Intro (9col) + Profile (3col) */}
          <BentoIntroCard className="sm:col-span-2 lg:col-span-9" />
          <BentoProfileCard className="sm:col-span-1 lg:col-span-3" />

          {/* Baris 2: Client Card (5col) + Learning (3col) + Project (4col) */}
          <BentoClientCard className="sm:col-span-1 lg:col-span-5" />
          <BentoLearningCard className="sm:col-span-2 lg:col-span-3" />
          <BentoProjectCard className="sm:col-span-2 lg:col-span-4" />
        </div>
      </Container>
    </section>
  );
}
