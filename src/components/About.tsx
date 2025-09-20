"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import SectionContainer from "@/components/_/SectionContainer";
import HowIWork from "@/components/about/HowIWork";
import SkillCards from "@/components/ui/SkillCards";
import {
  DesktopComputer,
  DevicePhoneMobile,
  RectangleGroup,
} from "@/components/icons/HeroIcons";
import { TechStack } from "@/components/Hero";

const skillsData = [
  {
    icon: <RectangleGroup color={"text-white dark:text-chartreuse"} />,
    title: "Responsive Design",
    description:
      "Designing web pages that look good on and perform equally well on all devices screen sizes.",
  },
  {
    icon: <DesktopComputer color={"text-white dark:text-chartreuse"} />,
    title: "Web",
    description:
      "Designing web pages that look good on and perform equally well on all devices screen sizes.",
  },
  {
    icon: <DevicePhoneMobile color={"text-white dark:text-chartreuse"} />,
    title: "Mobile apps",
    description:
      "Designing web pages that look good on and perform equally well on all devices screen sizes.",
  },
  // {
  //   icon: <MultiStarts color={"text-chartreuse"}/>,
  //   title: "More skills",
  //   description: "Hungryyy!",
  // }
];

const About = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="bg-zinc-50 md:min-h-screen dark:bg-[#080808]"
    >
      <div className="grid grid-rows-1 gap-12 md:h-screen lg:grid-rows-2">
        <div className="col-span-1 mt-6 flex items-center md:mt-8">
          <SectionContainer>
            <div className="flex flex-col justify-center space-y-4 md:items-center md:space-y-8">
              <h1 className="text-md font-medium text-black md:text-3xl dark:text-white">
                Experience
              </h1>
              <div className="max-w-prose">
                <p className="text-sm font-light text-black/80 md:text-center md:text-lg dark:text-white/80">
                  I&#39;ve spent the last{" "}
                  <span className="font-medium text-black dark:text-white">
                    11 months
                  </span>{" "}
                  actively contributing as a Junior Developer in a fast-paced
                  setting. I have a proven ability to quickly learn and apply
                  new skills, and my work on various projects reflects my
                  dedication to continuous improvement and delivering value.
                </p>
              </div>
              <TechStack />
            </div>
          </SectionContainer>
        </div>
        <div className="col-span-1 items-center justify-center">
          <SectionContainer>
            <h1 className="text-md font-medium-ex text-black md:text-3xl dark:text-white">
              How I Work
            </h1>
            <HowIWork />
          </SectionContainer>
        </div>
      </div>
    </section>
  );
};

export default About;
