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
    (index: number) => () => {
      setSelectedTimeline(index);
    };

  return (
    <section id="about" className="min-h-screen grid grid-cols-1 lg:grid-rows-[50vh_50vh]">
      {/*Top grid*/}
      <div className="bg-white border-b min-h-[50vh] lg:h-[50vh] lg:max-h-[50vh]">
        {/*My experience overline border*/}
        <div className="overline-border">
          <div className="container-max section-padding">
              <span
                className="heading-mono text-sky-500 lg:px-12">
                My Experience
              </span>
          </div>
        </div>

        {/*3 grid at top grid*/}
        <div className="container-max section-padding grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0">
          {/* Left column */}
          <div className="col-span-1 order-1 lg:order-none">
            <ExperienceTimeline
              onItemClick={handleSelectedTimeline}
            />
          </div>
          {/* Right column */}
          <div className="col-span-1 lg:col-span-2 flex items-center py-4 lg:py-8 order-2 lg:order-none">
            <ExperienceDescription
              index={selectedTimeline}
              onClear={() => setSelectedTimeline(null)}
            />
          </div>
        </div>
      </div>

      {/*Bottom grid*/}
      <div className="relative min-h-[50vh] lg:h-[50vh] lg:max-h-[50vh]">
        {/* Label selalu di atas */}
        <div className="overline-border lg:top-[67px]">
          <div className="container-max section-padding">
            <span className="heading-mono text-fuchsia-500 lg:px-12">
              How I Work
            </span>
          </div>
        </div>

        {/* Konten yang selalu center secara vertical */}
        <div className="container-max section-padding flex items-center min-h-[calc(44vh)] py-4 lg:py-0">
          <HowIWork/>
        </div>
      </div>

    </section>
  )
}

export default About