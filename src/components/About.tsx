'use client'

import {useLanguage} from '@/contexts/LanguageContext'
import ExperienceTimeline from "@/components/_/ExperienceTimeline";
import ExperienceDescription from "@/components/_/ExperienceDescription";
import HowIWork from "@/components/_/HowIWork";

const About = () => {
  const {t} = useLanguage()

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python',
    'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git'
  ]

  return (
    <section id="about" className="dark:bg-gray-900">
      <div className=" min-h-screen grid sm:grid-rows-2 gap-9">
        <div className="border bg-white">
          <div className="container-max section-padding grid grid-cols-1 lg:grid-cols-3 ">
            {/* Kolom kiri */}
            <div className="col-span-1 -ml-2">
              <ExperienceTimeline/>
            </div>
            {/* Kolom kanan */}
            <div className="col-span-2">
              <ExperienceDescription/>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-1 bg-white border-t border-l border-r  border-b border-full">
            <HowIWork/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About