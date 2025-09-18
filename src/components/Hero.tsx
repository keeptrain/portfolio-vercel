'use client'

import Image from "next/image";
import {useLanguage} from '@/contexts/LanguageContext'
import ProfileImage from "@/components/_/ProfileImage";
import SectionContainer from "@/components/_/SectionContainer";
import OpenToWorkBadge from "@/components/_/OpenToWorkBadge";
import {DocumentText, MultiStarts, PaperAirplane} from "@/components/icons/HeroIcons";
import {Underline} from "@/components/icons/HandyArrows";
import Link from "next/link";


const Hero = () => {
  const {t} = useLanguage()

  return (
    <section id="hero" className="md:min-h-screen dark:bg-[#080808] pt-20 md:pt-16">
      <SectionContainer>
        <div className="md:h-screen grid grid-rows-[1fr,auto]">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:pt-16">
            {/* Role and Description */}
            <div
              className="col-span-1 flex flex-col items-start justify-center
              order-2 md:order-1 pt-6 md:pt-4 md:pl-16 gap-6">
              {/* Badge and Reach out in mobile mode */}
              <div className="flex md:hidden flex-wrap items-center gap-2">
                <OpenToWorkBadge/>
                <Link href={"/contact"}
                      className="inline-flex items-center text-xs md:text-md font-medium border
                        border-gray-300 dark:border-zinc-800 text-black dark:text-white/80 px-4 py-2 rounded-3xl
                        gap-2 bg-white dark:bg-zinc-900">
                  <PaperAirplane color={""}/> Reach out
                </Link>
                <Link href={"/contact"}
                      className="inline-flex items-center text-xs md:text-md font-medium border
                        border-gray-300 dark:border-zinc-800 text-black dark:text-white/80 px-4 py-2 rounded-3xl
                        gap-2 bg-white dark:bg-zinc-900">
                  <DocumentText color={""}/> Resume
                </Link>
              </div>

              <p
                className="text-md sm:text-3xl md:text-5xl font-medium
                text-gray-900 dark:text-white/90 w-60 md:w-full">
                Hi i&#39;m junior developer
                who like minimalist design
              </p>
            </div>

            <div
              className="col-span-1 flex md:flex-col items-end
               md:items-center justify-start md:justify-center order-1 md:order-2">
              {/* Container untuk gambar profil, badge, dan tombol */}
              <div className="flex flex-row items-end md:flex-col md:items-center">
                {/* Profile Image */}
                <div className="w-40 h-40 md:w-80 md:h-[360px]">
                  <ProfileImage/>
                </div>
              </div>
            </div>
          </div>

          {/* Second row */}
          <div
            className="flex flex-col md:items-center justify-center text-black dark:text-white pb-10 md:pb-6">
            <div className="flex flex-row gap-1 md:gap-2">
              <h1 className="font-medium-ex text-md md:text-2xl">Less is More</h1>
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