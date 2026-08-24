import { Container } from "@/components/ui";
import LinkedinCard from "./section-social/LinkedinCard";
import GithubCard from "./section-social/GithubCard";
import EmailCard from "./section-social/EmailCard";

export default function SectionSocial() {
  return (
    <Container className="my-6 flex flex-col gap-6 lg:py-12 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col space-y-2 md:w-1/2">
        <h2 className="text-xl font-medium sm:text-2xl md:text-3xl font-serif">
          Let's Connect
        </h2>
        <p className="text-sm text-zinc-500 md:text-base dark:text-zinc-400">
          Got a question, collaboration idea, or just want to say hello?
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 md:w-1/2">
        <LinkedinCard />
        <GithubCard />
        <EmailCard />
      </div>
    </Container>
  );
}
