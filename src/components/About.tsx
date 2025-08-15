'use client'

import {useState} from "react";
import {useLanguage} from '@/contexts/LanguageContext'
import ExperienceTimeline from "@/components/_/ExperienceTimeline";
import ExperienceDescription from "@/components/_/ExperienceDescription";
import HowIWork from "@/components/_/HowIWork";

const About = () => {
  const {t} = useLanguage()
  const [selectedTimeline, setSelectedTimeline] = useState<number | null>(null)

  const handleSelectedTimeline =
    (index: number) => {
      setSelectedTimeline(index);
    };

  return (
    <section id="about" className="dark:bg-gray-900">
      <div className="min-h-screen grid sm:grid-rows-2 gap-10">
        {/*Top grid*/}
        <div className="border-b bg-white">

          {/*My experience overline border*/}
          <div className="overline-border">
            <div className="container-max section-padding pl-20">
              <span
                className="text-sm font-mono uppercase text-sky-500  dark:text-gray-100">
                My Experience
              </span>
            </div>
          </div>

          {/*3 grid at top grid*/}
          <div className="container-max section-padding grid grid-cols-1 lg:grid-cols-3">
            {/* Left column */}
            <div className="col-span-1 -ml-2">
              <ExperienceTimeline onItemClick={handleSelectedTimeline}/>
            </div>
            {/* Right column */}
            <div className="col-span-2 flex items-center">
              <div className="space-y-4">
                <ExperienceDescription
                  index={selectedTimeline}
                  onClear={() => setSelectedTimeline(null)}
                />
              </div>
            </div>
          </div>
        </div>

        {/*Bottom grid*/}
        <div className="relative">
          {/* Label */}
          <div className="overline-border top-14">
            <div className="container-max section-padding">
          <span
            className="text-sm font-mono uppercase text-fuchsia-500 dark:text-gray-100">
            How I work
          </span>
            </div>
          </div>

          <div className="bg-zinc-50 container-max w-full  ">
            <HowIWork/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About