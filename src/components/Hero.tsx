'use client'

import Image from "next/image";
import {useLanguage} from '@/contexts/LanguageContext'
import ProfileImage from "@/components/_/ProfileImage";
import SectionContainer from "@/components/_/SectionContainer";
import OpenToWorkBadge from "@/components/_/OpenToWorkBadge";
import {MultiStarts} from "@/components/icons/HeroIcons";
import {Underline} from "@/components/icons/HandyArrows";

const Hero = () => {
  const {t} = useLanguage()

  return (
    <section id="hero" className="md:min-h-screen bg-zinc-50 dark:bg-[#080808]">
      <SectionContainer>
        <div className="md:h-screen grid grid-rows-[1fr,auto] gap-4 pt-20 md:pt-16">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:pt-16">
            {/* Role and Description */}
            <div
              className="col-span-1 flex flex-col items-start justify-center space-y-4 order-2 md:order-1 md:ml-16">
              <h1
                className="flex flex-col text-start text-sm sm:text-3xl md:text-4xl font-semibold
                text-gray-900 dark:text-gray-100 w-80 md:w-full tracking-widest uppercase">
                <div
                  className="flex flex-row md:hidden  mb-4">
                </div>
                <span className="text-zinc-800">Hi , I am </span>
                Junior Developer who like minimalist design.
              </h1>
              <div className="hidden md:block">
                <OpenToWorkBadge/>
              </div>
            </div>

            {/* Profile Image */}
            <div
              className="col-span-1 relative flex flex-row md:flex-col
              items-end md:items-center justify-start md:justify-center order-1 md:order-2">
              <div
                className="w-40 h-40 md:w-80 md:h-[360px]">
                <ProfileImage/>
              </div>
              <div className="md:hidden">
                <OpenToWorkBadge/>
              </div>
            </div>
          </div>

          {/* Second row */}
          <div
            className="flex flex-col items-start md:items-center justify-center text-black dark:text-white">
            <div className="flex flex-row gap-2">
              <h1 className="font-semibold text-md md:text-2xl">Less is More</h1>
              <MultiStarts color={""}/>
            </div>
            <Underline color={""}/>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

export const TechStack = () => {
  const color = "text-black/20 dark:text-white/20"
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-8 md:gap-24 items-center justify-center">
      <div className="relative w-20 h-20 md:w-30 md:h-30">
        <Image alt="logo" src="/images/logo/bangkit.svg" fill
               className="object-contain grayscale dark:invert"/>
      </div>
      <div className="relative w-20 h-20 md:w-30 md:h-30">
        <Image alt="logo" src="/images/logo/rptra.png" fill
               className="object-contain grayscale dark:invert"/>
      </div>
      <div className="relative w-20 h-20 md:w-30 md:h-30">
        <Image alt="logo" src="/images/logo/pusdatin.png" fill
               className="object-contain grayscale dark:invert"/>
      </div>
    </div>
  )
}

export default Hero