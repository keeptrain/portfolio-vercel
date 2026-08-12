import { Container } from "@/components/ui";
import BentoSocialCard from "./section-social/BentoSocialCard";

export default function SectionSocial() {
  return (
    <Container className="my-6 flex lg:py-12">
      <div className="flex w-1/2 flex-col">
        <h2 className="text-lg font-medium sm:text-xl md:text-2xl">
          Let's Connect
        </h2>
        <p className="text-lg">Got a question, or just want to say hello?</p>
      </div>
      <BentoSocialCard />
    </Container>
  );
}
