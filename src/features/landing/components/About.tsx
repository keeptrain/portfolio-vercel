import SectionContainer from "@/components/_/SectionContainer";
import Image from "next/image";
import HowIWork from "./HowIWork";

interface AboutProps {
  t: (key: string) => string;
}

const About = ({ t }: AboutProps) => {
  const duration = "1 Year 5 months";
  
  return (
    <section id="about" className="md:min-h-screen">
      <div className="grid grid-rows-1 gap-12 md:h-screen lg:grid-rows-2">
        <div className="col-span-1 mt-6 flex items-center md:mt-8">
          <SectionContainer>
            <div className="flex flex-col justify-center space-y-4 md:items-center md:space-y-8">
              <h1 className="text-xl font-medium text-black md:text-3xl dark:text-white">
                {t("about.title")}
              </h1>
              <div className="max-w-prose">
                <p className="text-sm font-light text-black/80 md:text-center md:text-lg dark:text-white/80">
                  {t("about.description").replace("{duration}", duration)}
                </p>
              </div>
              <TechStack />
            </div>
          </SectionContainer>
        </div>
        <div className="col-span-1 items-center justify-center">
          <SectionContainer>
            <h1 className="text-xl font-medium-ex text-black md:text-3xl dark:text-white">
              {t("about.howIWork")}
            </h1>
            <HowIWork />
          </SectionContainer>
        </div>
      </div>
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
        <div key={logo.alt} className="relative size-20 md:size-28">
          <Image
            alt={logo.alt}
            src={logo.src}
            fill
            className="object-contain grayscale dark:invert"
          />
        </div>
      ))}
    </div>
  );
}

export default About;