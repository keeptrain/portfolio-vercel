'use client'

import Image from "next/image";
import {useLanguage} from '@/contexts/LanguageContext'
import ProfileImage from "@/components/_/ProfileImage";
import SectionContainer from "@/components/_/SectionContainer";
import OpenToWorkBadge from "@/components/_/OpenToWorkBadge";
import {MultiStarts} from "@/components/icons/HeroIcons";

const Hero = () => {
  const {t} = useLanguage()

  return (
    <section id="hero" className="md:min-h-screen  bg-zinc-50 dark:bg-[#080808]">
      <SectionContainer>
        <div className="md:h-screen grid grid-rows-[1fr,auto] gap-4 pt-16 md:pt-16">
          {/* Baris Pertama: Hero Role dan Profile Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:pt-16">
            {/* Role and Description */}
            <div
              className="col-span-1 flex flex-col items-start justify-center space-y-4 order-2 md:order-1 md:ml-16">
              <h1
                className="flex flex-col text-start text-md sm:text-3xl md:text-4xl font-bold t
                ext-gray-900 dark:text-gray-100 w-80 md:w-full tracking-widest  uppercase">
                <div
                  className="md:hidden size-30 mb-4">
                  <ProfileImage/>
                </div>
                <span className="text-zinc-800">Hi , I am </span>
                Junior Developer who like minimalistm design.
              </h1>
              <OpenToWorkBadge/>
            </div>

            {/* Profile Image */}
            <div
              className="col-span-1 md:flex flex-col items-center justify-center relative hidden md:order-2">
              <div
                className="w-full h-85 md:w-80 md:h-[360px]">
                <ProfileImage/>
              </div>
            </div>
          </div>

          {/* Baris Kedua */}
          <div
            className="flex flex-row justify-center items-end my-8 md:mb-16 border-b gap-2 md:gap-4 text-black dark:text-white">
            <h1 className="font-serif text-lg md:text-2xl">Less is More</h1>
            <MultiStarts color={""}/>
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