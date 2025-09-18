'use client'

import {useLanguage} from '@/contexts/LanguageContext'
import SectionContainer from "@/components/_/SectionContainer";
import HowIWork from "@/components/about/HowIWork";
import SkillCards from "@/components/ui/SkillCards";
import {DesktopComputer, DevicePhoneMobile, RectangleGroup} from "@/components/icons/HeroIcons";
import {TechStack} from "@/components/Hero";

const skillsData = [
  {
    icon: <RectangleGroup color={"text-white dark:text-chartreuse"}/>,
    title: "Responsive Design",
    description: "Designing web pages that look good on and perform equally well on all devices screen sizes.",
  },
  {
    icon: <DesktopComputer color={"text-white dark:text-chartreuse"}/>,
    title: "Web",
    description: "Designing web pages that look good on and perform equally well on all devices screen sizes.",
  },
  {
    icon: <DevicePhoneMobile color={"text-white dark:text-chartreuse"}/>,
    title: "Mobile apps",
    description: "Designing web pages that look good on and perform equally well on all devices screen sizes.",
  },
  // {
  //   icon: <MultiStarts color={"text-chartreuse"}/>,
  //   title: "More skills",
  //   description: "Hungryyy!",
  // }
]

const About = () => {
  const {t} = useLanguage()

  return (
    <section id="about" className="md:min-h-screen bg-zinc-50 dark:bg-[#080808]">
      <div className="grid grid-rows-1 lg:grid-rows-2 md:h-screen gap-12">
        <div className="col-span-1 flex items-center mt-6 md:mt-8">
          <SectionContainer>
            <div
              className="flex flex-col md:items-center justify-center space-y-4 md:space-y-8">
              <h1
                className="text-md md:text-3xl font-medium text-black dark:text-white">
                Experience
              </h1>
              <div className="max-w-prose">
                <p className="md:text-center text-sm md:text-lg font-light text-black/80 dark:text-white/80">
                  I&#39;ve spent the last <span className="text-black dark:text-white font-medium">11 months</span> actively contributing as a Junior Developer in a fast-paced setting.
                  I have a proven ability to quickly learn and apply new skills,
                  and my work on various projects reflects my dedication to continuous improvement and
                  delivering value.
                </p>
              </div>
              <TechStack/>
            </div>
          </SectionContainer>
        </div>
        <div className="col-span-1 items-center justify-center">
          <SectionContainer>
            <h1
              className="text-md md:text-3xl font-medium-ex text-black dark:text-white">
              How I Work
            </h1>
            <HowIWork/>
          </SectionContainer>
        </div>
      </div>
    </section>
  )
}

export default About