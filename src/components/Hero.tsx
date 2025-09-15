'use client'

import {useLanguage} from '@/contexts/LanguageContext'
import ProfileImage from "@/components/_/ProfileImage";
import SectionContainer from "@/components/_/SectionContainer";
import {AlpineJs, Android, Javascript, Kotlin, Laravel, Php} from "@/components/icons/devicons";
import OpenToWorkBadge from "@/components/_/OpenToWorkBadge";

const Hero = () => {
  const {t} = useLanguage()

  return (
    <section id="hero" className="min-h-screen bg-zinc-50 dark:bg-[#080808]">
      <SectionContainer>
        <div className="h-screen grid grid-rows-[1fr,auto] gap-4 pt-16">
          {/* Baris Pertama: Hero Role dan Profile Image */}
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Role and Description */}
            <div
              className="col-span-1 flex flex-col items-start justify-center space-y-4 order-2 md:order-1 md:ml-16">
              <h1
                className=" text-start text-3xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Junior Developer
              </h1>
              <h2 className="text-xl text-zinc-500 dark:text-gray-100 mb-6">
                {t('hero.description')}
              </h2>
              <OpenToWorkBadge/>
            </div>

            {/* Profile Image */}
            <div
              className="col-span-1 flex flex-col items-center justify-center relative order-1 md:order-2">
              <div
                className="w-72 h-72 md:w-100 md:h-[450px] border p-2">
                <ProfileImage/>
              </div>
            </div>
          </div>

          {/* Baris Kedua: TechStack */}
          <div
            className="flex items-center justify-center overflow-x-hidden ">
            <TechStack/>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

const TechStack = () => {
  const color = "text-black/20 dark:text-white/20"
  return (
    <div className="flex items-center gap-12 md:gap-24 justify-center z-10">
      <Php color={color}/>
      <Kotlin color={color}/>
      <Javascript color={color}/>
      <Laravel color={color}/>
      <AlpineJs color={color}/>
      <Android color={color}/>
    </div>
  )
}

export default Hero