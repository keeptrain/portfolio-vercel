import { Container } from "@/components/ui";
import BentoSocialCard from "./section-social/BentoSocialCard";

export default function SectionSocial() {
  return (
    <Container className="my-6 lg:py-12">
      <h2 className="text-xl font-medium text-black sm:text-2xl md:text-3xl dark:text-white">
        Let's Connect
      </h2>
      <BentoSocialCard />
    </Container>
  );
}
