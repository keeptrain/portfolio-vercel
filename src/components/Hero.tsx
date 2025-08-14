'use client'

import {useLanguage} from '@/contexts/LanguageContext'
import ProfileImage from "@/components/_/ProfileImage";
import OpenToWorkBadge from "@/components/_/OpenToWorkBadge";

const Hero = () => {
  const {t} = useLanguage()

  return (
    <div className="container-max section-padding">
      <div className="z-1 bg-white dark:bg-gray-950 border-l border-r pl-12 pr-12">
        <section className="min-h-screen flex items-center">
          <div className="">
            <ProfileImage/>
            <div className="animate-fade-in">
              <h1 className="sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t('hero.greeting')}{' '}
                <span
                  className="ml-2 text-primary-600 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent gap-2">
                  {t('hero.name')}
                  </span>
              </h1>

              <div className="flex">
                <h2 className="sm:text-5xl lg:text-1xl font-bold text-gray-200 dark:text-gray-100 mb-6">
                  {t('hero.role.greeting')} <span className='text-gray-900'>{t('hero.role')}.</span>
                </h2>

              </div>
              <OpenToWorkBadge/>

              <div className="flex flex-col sm:flex-row gap-4  items-center">

              </div>
            </div>

            <div
              className="pointer-events-note absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.12),transparent_1%)]"/>
            {/* Scroll indicator */}
            {/*<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">*/}
            {/*  <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">*/}
            {/*    <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-pulse"></div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Hero