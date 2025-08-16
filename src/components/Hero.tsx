'use client'

import {useLanguage} from '@/contexts/LanguageContext'
import ProfileImage from "@/components/_/ProfileImage";
import OpenToWorkBadge from "@/components/_/OpenToWorkBadge";

const Hero = () => {
  const {t} = useLanguage()

  return (
    <section id="hero" className="container-max section-padding">
      <div className="min-h-screen flex items-center px-12 bg-white dark:bg-gray-950 border-l border-r">
        <div className="animate-slide-up">
          <ProfileImage/>
          <h1 className="text-xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t('hero.greeting')}{' '}
            <span
              className="ml-2 text-primary-600 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent gap-2">
                  {t('hero.name')}
                  </span>
          </h1>

          <div className="flex">
            <h2 className="sm:text-5xl lg:text-1xl font-bold text-gray-200 dark:text-gray-100 mb-6">
              {t('hero.role.greeting')} <span className='text-gray-900'>{t('hero.role')}___________________.</span>
            </h2>
          </div>
          <OpenToWorkBadge/>
        </div>
      </div>
    </section>
  )
}

export default Hero