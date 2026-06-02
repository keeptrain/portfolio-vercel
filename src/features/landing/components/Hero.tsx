import ProfileImage from "@/components/_/ProfileImage";
import SectionContainer from "@/components/_/SectionContainer";
import OpenToWorkBadge from "@/components/_/OpenToWorkBadge";
import {
  DocumentText,
  MultiStarts,
  PaperAirplane,
} from "@/components/icons/HeroIcons";
import { Underline } from "@/components/icons/HandyArrows";
import Link from "next/link";
import { Locale } from "@/i18n/locales";

interface HeroProps {
  t: (key: string) => string;
  locale: Locale;
}

export default function Hero({ t, locale }: HeroProps) {
  return (
    <section
      id="hero"
      className="pt-5 md:min-h-screen md:pt-10 dark:bg-[#080808]"
    >
      <SectionContainer>
        <div className="grid grid-rows-[1fr,auto] md:h-screen">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:pt-16">
            {/* Role and Description */}
            <div className="order-2 col-span-1 flex flex-col items-start justify-center gap-6 pt-6 md:order-1 md:pt-4 md:pl-16">
              {/* Badge and Reach out in mobile mode */}
              <div className="flex flex-wrap items-center gap-2 md:hidden">
                <OpenToWorkBadge />
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-3xl border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-white/80"
                >
                  <PaperAirplane color={""} /> {t("hero.reachOut")}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-3xl border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-white/80"
                >
                  <DocumentText color={""} /> {t("hero.resume")}
                </Link>
              </div>

              <p className="w-full text-xl font-medium wrap-break-word text-gray-900 sm:text-3xl md:text-5xl dark:text-white/90">
                {t("hero.headline")}
              </p>
            </div>

            <div className="order-1 col-span-1 flex items-end justify-start md:order-2 md:flex-col md:items-center md:justify-center">
              {/* Container untuk gambar profil, badge, dan tombol */}
              <div className="flex flex-row items-end md:flex-col md:items-center">
                {/* Profile Image */}
                <div className="h-40 w-40 md:h-[360px] md:w-80">
                  <ProfileImage />
                </div>
              </div>
            </div>
          </div>

          {/* Second row */}
          <div className="flex flex-col justify-center pb-10 text-black md:items-center md:pb-6 dark:text-white">
            <div className="flex flex-row gap-1 md:gap-2">
              <h1 className="font-medium-ex text-lg md:text-2xl">
                {t("hero.lessIsMore")}
              </h1>
              <MultiStarts color={""} />
            </div>
            <Underline color={"text-black dark:text-zinc-700"} />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
