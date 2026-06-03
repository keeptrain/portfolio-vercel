import { Container } from "@/components/ui/Container";
import Image from "next/image";
import HowIWork from "./HowIWork";

interface AboutProps {
  t: (key: string) => string;
}

const About = ({ t }: AboutProps) => {
  const duration = "1 Year 5 months";

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-12 sm:gap-16 md:gap-20">
          <div className="flex items-center">
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:items-center md:space-y-8">
              <h1 className="text-xl font-medium text-black sm:text-2xl md:text-3xl dark:text-white">
                {t("about.title")}
              </h1>
              <div className="max-w-prose">
                <p className="text-sm font-light text-black/80 sm:text-base md:text-center md:text-lg dark:text-white/80">
                  {t("about.description").replace("{duration}", duration)}
                </p>
              </div>
              <TechStack />
            </div>
          </div>
          <div className="items-center justify-center">
            <h1 className="text-xl font-medium text-black sm:text-2xl md:text-3xl dark:text-white">
              {t("about.howIWork")}
            </h1>
            <HowIWork />
          </div>
        </div>
      </Container>
    </section>
  );
};

const COMPANY_LOGOS: Array<{ src: string; alt: string }> = [
  { src: "/images/logo/bangkit.svg", alt: "Bangkit" },
  { src: "/images/logo/rptra.png", alt: "Rptra" },
  { src: "/images/logo/pusdatin.png", alt: "Pusdatin" },
  { src: "/images/logo/kkp.webp", alt: "Kkp" },
];

function TechStack() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:flex-nowrap md:gap-24">
      {COMPANY_LOGOS.map((logo) => (
        <div key={logo.alt} className="relative aspect-square size-20 md:size-28">
          <Image
            alt={logo.alt}
            src={logo.src}
            fill
            sizes="(max-width: 768px) 80px, 112px"
            className="object-contain grayscale dark:invert"
          />
        </div>
      ))}
    </div>
  );
}

export default About;
