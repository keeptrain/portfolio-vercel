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
        <div className="col-span-1 flex items-center mt-12">
          <SectionContainer width="7xl">
            <div
              className="flex flex-col md:items-center justify-center hover:scale-105
              transition-transform duration-300 space-y-4 md:space-y-8">
              <h1
                className="text-md md:text-3xl font-bold text-black dark:text-chartreuse uppercase">
                Experience
              </h1>
              <div className="max-w-prose">
                <p className="flex md:text-center text-sm md:text-lg font-light text-black dark:text-white">
                  I have been in these fields for 8 months of professional experience in a fast-paced.
                  My focus has been on rapidly acquiring foundational skills, contributing to meaningful projects,
                  and upholding a philosophy of continuous learning.
                </p>
              </div>
              <TechStack/>
            </div>
          </SectionContainer>
        </div>
        <div className="col-span-1 items-center justify-center">
          <SectionContainer>
            <h1
              className="text-md md:text-3xl font-bold uppercase text-black dark:text-chartreuse">
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