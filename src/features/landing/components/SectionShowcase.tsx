import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLocale, getT } from "@/i18n/server";

export default function SectionShowcase() {
  const t = getT();
  const locale = getLocale();

  return (
    <section id="showcase" className="my-15 md:my-25">
      <h2 className="mb-10 hidden text-center text-4xl font-semibold md:block">
        {t("sectionShowcase.title")}
      </h2>
      {/* Showcase Wall - flex 2 columns like mobile screenshot */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4 sm:gap-8">
          {/* Left vertical group: RPTRA 1 + 2 - hover popup to website */}
          <Link
            href="https://rptra-cibubur.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-1/2 gap-8 overflow-hidden"
          >
            <div className="relative aspect-4/5 w-1/2 overflow-hidden shadow-xs">
              <Image
                src="/images/projects/landing-rptra-ribubur-1.png"
                alt="RPTRA Cibubur landing 1"
                fill
                sizes="(max-width: 768px) 25vw, 20vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative aspect-4/5 w-1/2 overflow-hidden shadow-xs">
              <Image
                src="/images/projects/landing-rptra-cibubur-2.png"
                alt="RPTRA Cibubur landing 2"
                fill
                sizes="(max-width: 768px) 25vw, 20vw"
                className="object-cover object-top"
              />
            </div>

            {/* Hover popup link - centered over group like DICE */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
              <span className="relative inline-flex items-center gap-0 overflow-hidden rounded-full bg-zinc-900 text-sm font-medium text-white shadow-lg">
                <span className="px-4 py-2">RPTRA Cibubur</span>
                <span className="flex size-8 items-center justify-center border-l border-white/20 bg-white/10">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </div>
          </Link>

          {/* Right: separate groups - Culinarix top, Portfolio bottom */}
          <div className="flex w-1/2 flex-col gap-4">
            <Link
              href="https://github.com/keeptrain/Culinarix-App.git"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video w-full overflow-hidden shadow-xs"
            >
              <Image
                src="/images/projects/cullinarix-mockups.jpeg"
                alt="Cullinarix mockups"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                <span className="relative inline-flex items-center gap-0 overflow-hidden rounded-full bg-zinc-900 text-xs font-medium text-white shadow-lg sm:text-sm">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2">Culinarix</span>
                  <span className="flex size-7 items-center justify-center border-l border-white/20 bg-white/10 sm:size-8">
                    <ArrowUpRight className="size-3 sm:size-4" />
                  </span>
                </span>
              </div>
            </Link>
            <Link
              href="/"
              className="group relative aspect-video w-full overflow-hidden shadow-xs"
            >
              <Image
                src="/images/projects/landing-portfolio-page.png"
                alt="Portfolio landing"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                <span className="relative inline-flex items-center gap-0 overflow-hidden rounded-full bg-zinc-900 text-xs font-medium text-white shadow-lg sm:text-sm">
                  <span className="px-3 py-1.5 sm:px-4 sm:py-2">Portfolio</span>
                  <span className="flex size-7 items-center justify-center border-l border-white/20 bg-white/10 sm:size-8">
                    <ArrowUpRight className="size-3 sm:size-4" />
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Gradient Blur Overlay on the bottom of the grid */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-35 bg-linear-to-t from-background via-background/80 to-transparent md:h-45" />
      </div>

      {/* Content & Action Button below the showcase wall */}
      <div className="relative z-10 mx-auto -mt-10 max-w-xl space-y-4 text-center">
        <p className="text-sm font-medium sm:text-base md:text-lg">
          {t("sectionShowcase.highlight.prefix")}{" "}
          <span className="font-semibold">
            {t("sectionShowcase.highlight.performance")}
          </span>
          ,{" "}
          <span className="font-semibold">
            {t("sectionShowcase.highlight.efficiency")}
          </span>{" "}
          {t("sectionShowcase.highlight.and")}{" "}
          <span className="font-semibold">
            {t("sectionShowcase.highlight.userExperience")}
          </span>
          .
        </p>
        <div>
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 shadow-2xs transition-all hover:bg-zinc-50 hover:shadow-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            {t("sectionShowcase.explore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
