'use client'

import {useLanguage} from '@/contexts/LanguageContext'
import SectionContainer from "@/components/_/SectionContainer";
import HowIWork from "@/components/about/HowIWork";
import SkillCards from "@/components/ui/SkillCards";
import {DesktopComputer, DevicePhoneMobile, RectangleGroup} from "@/components/icons/heroicons";

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
    <section id="about" className="min-h-screen bg-zinc-50 dark:bg-[#080808]">
      <div className="grid grid-rows-1 lg:grid-rows-2 md:h-screen gap-4">
        <div className="flex items-center mt-12">
          <SectionContainer width="7xl">
            <div
              className="flex flex-col items-center justify-center h-50 hover:scale-105 transition-transform duration-300">
              <h1
                className="text-xl font-bold font-mono uppercase text-gray-400 dark:text-white ">
                What can I do?
              </h1>
              <h1
                className="text-xl font-bold font-mono uppercase text-black dark:text-chartreuse ">
                What can I do?
              </h1>
            </div>
            <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData.map((item, index) => (
                <div
                  key={index}
                  className="col-span-1 backdrop-blur-md bg-black  dark:bg-[#ccf381]/10 border border-[#ccf381]/20 rounded-2xl p-6 shadow-sm
                  flex flex-col justify-center items-start px-6 pt-10 pb-6 h-50 space-y-2 ">
                  <SkillCards
                    icons={item.icon}
                    description={item.description} title={item.title}/>
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
        <div className="flex flex-col items-center justify-center overflow-x-scroll scrollbar-hide">
          <SectionContainer>
            <h1
              className="flex text-xl font-bold font-mono uppercase text-black dark:text-chartreuse">
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