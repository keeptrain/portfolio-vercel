import { Container } from "@/components/ui";
import { getT } from "@/i18n/server";
import HowIWork from "./section-two/HowIWork";

export default function SectionTwo() {
  const t = getT();
  return (
    <section id="section-2" className="my-8 sm:my-20 md:py-6">
      <div className="mx-4 mb-15 flex flex-col gap-2 sm:items-baseline sm:gap-3 md:flex-row">
        <h2 className="text-4xl font-semibold">
          {t("sectionTwo.howIWork.title")}
        </h2>
        <p className="text-lg">{t("sectionTwo.howIWork.description")}</p>
      </div>
      <Container>
        <HowIWork />
      </Container>
    </section>
  );
}
