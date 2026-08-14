"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderIcon,
  HouseIcon,
  DownloadIcon,
  ArrowLeftRightIcon,
  ComputerIcon,
  RulerDimensionLineIcon,
  EllipseIcon,
  EllipsisIcon,
  BriefcaseBusinessIcon,
} from "lucide-react";
import { Locale } from "@/i18n/locales";
import { useTranslations } from "@/i18n/TranslationContext";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { IndonesiaFlag, USFlag } from "./icons/FlagIcons";

interface BottomNavProps {
  locale: Locale;
}

export default function BottomNav({ locale }: BottomNavProps) {
  const pathname = usePathname();
  const { t } = useTranslations();
  const [isThemeOpen, setIsThemeOpen] = React.useState(false);

  const isHome = pathname === `/${locale}` || pathname === "/";
  const isProjects = pathname.startsWith(`/${locale}/projects`);

  const resumeUrl =
    "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID";

  const isEn = locale === "en";
  const targetLocale = isEn ? "id" : "en";
  const targetPathname = pathname.replace(`/${locale}`, `/${targetLocale}`);

  return (
    <>
      <nav className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 pb-4 md:bottom-6 md:pb-0">
        {/* iOS Crystal Glass Effect */}
        <div className="pointer-events-auto mx-auto flex w-fit items-center gap-1.5 rounded-xl border border-white/50 bg-white/40 p-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] saturate-180 backdrop-blur-2xl md:px-3 md:py-2.5 dark:border-white/10 dark:bg-zinc-950/40 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          {/* Home */}
          <Link
            href={`/${locale}`}
            className={`group relative flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-all duration-300 ease-in-out hover:scale-105 ${
              isHome
                ? "gap-2 bg-white/80 px-4 py-2 text-black shadow-sm dark:bg-zinc-800/80 dark:text-white"
                : "p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            <HouseIcon className="size-5 shrink-0 animate-in duration-200 zoom-in-95 fade-in" />
            {isHome && (
              <span className="animate-in text-xs font-semibold tracking-wide duration-300 fade-in slide-in-from-left-2">
                {t("nav.home")}
              </span>
            )}
          </Link>

          {/* Projects */}
          <Link
            href={`/${locale}/projects`}
            className={`group relative flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-all duration-300 ease-in-out hover:scale-105 ${
              isProjects
                ? "gap-2 bg-white/80 px-4 py-2 text-black shadow-sm dark:bg-zinc-800/80 dark:text-white"
                : "p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            <BriefcaseBusinessIcon className="size-5 shrink-0 animate-in duration-200 zoom-in-95 fade-in" />
            {isProjects && (
              <span className="animate-in text-xs font-semibold tracking-wide duration-300 fade-in slide-in-from-left-2">
                {t("nav.projects")}
              </span>
            )}
          </Link>

          {/* Theme & Customization Drawer Trigger Button */}
          <button
            onClick={() => setIsThemeOpen(true)}
            className="group relative flex min-h-11 min-w-11 items-center justify-center rounded-xl p-2.5 text-gray-500 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/60 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-800/60 dark:hover:text-gray-100"
            aria-label="Customize theme and language"
          >
            <EllipsisIcon className="size-5 shrink-0 animate-in duration-200 zoom-in-95 fade-in" />
          </button>
        </div>
      </nav>

      {/* Theme & Language Drawer Sheet */}
      <Drawer open={isThemeOpen} onOpenChange={setIsThemeOpen}>
        <DrawerContent className="sm:mx-auto sm:max-w-md">
          <div className="w-full p-6">
            <DrawerHeader className="px-0 pt-0 text-left">
              <DrawerTitle className="text-xl font-bold">
                Appearance & Language
              </DrawerTitle>
              <DrawerDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                Customize site theme preferences and switch language.
              </DrawerDescription>
            </DrawerHeader>

            <div className="mt-6 space-y-6">
              {/* Theme Preference */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Theme Preference
                </span>
                <ThemeSwitcher />
              </div>

              {/* Language Preference */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Language
                </span>
                <div className="flex items-center gap-2">
                  <ArrowLeftRightIcon className="size-4" />
                  <Link
                    href={targetPathname}
                    onClick={() => setIsThemeOpen(false)}
                    className="inline-flex items-center gap-2.5 bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                  >
                    {isEn ? (
                      <>
                        <IndonesiaFlag className="size-4" />
                        <span>Bahasa Indonesia</span>
                      </>
                    ) : (
                      <>
                        <USFlag className="size-4" />
                        <span>English</span>
                      </>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
