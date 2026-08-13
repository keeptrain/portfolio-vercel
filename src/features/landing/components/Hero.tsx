import { Container } from "@/components/ui/Container";
import {
  DocumentText,
  MultiStarts,
  PaperAirplane,
} from "@/components/icons/HeroIcons";
import { Underline } from "@/components/icons/HandyArrows";
import Link from "next/link";
import Image from "next/image";
import { getT, getLocale } from "@/i18n/server";

export default function Hero() {
  const t = getT();
  const locale = getLocale();

  return (
    <section id="hero" className="pt-20 sm:pt-24 md:pt-32 lg:pt-40">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Role and Description */}
          <div className="order-2 flex flex-col items-start justify-center gap-6 md:order-1">
            {/* Badge and Reach out in mobile mode */}
            <div className="flex flex-wrap items-center gap-2 md:hidden">
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

            <p className="w-full text-2xl font-medium wrap-break-word text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white/90">
              {t("hero.headline")}
            </p>
          </div>

          {/* Profile Image */}
          <div className="order-1 flex items-end justify-start md:order-2 md:flex-col md:items-end md:justify-center">
            <div className="flex flex-row items-end md:flex-col md:items-center">
              <div className="aspect-square w-40 sm:w-48 md:w-72 lg:w-80">
                <div className="relative h-full w-full">
                  <Image
                    loading="eager"
                    src="/images/photos.png"
                    alt="Profile"
                    fill
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 288px, 320px"
                    className="rounded-3xl bg-white object-cover object-top p-1 shadow-md md:p-2 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Less is More tagline */}
        <div className="flex flex-col justify-center py-10 text-black md:items-center md:py-16 dark:text-white">
          <div className="flex flex-row gap-1 md:gap-2">
            <h1 className="font-medium-ex text-lg md:text-2xl">
              {t("hero.lessIsMore")}
            </h1>
            <MultiStarts color={""} />
          </div>
          <Underline color={"text-black dark:text-zinc-700"} />
        </div>
      </Container>
    </section>
  );
}
