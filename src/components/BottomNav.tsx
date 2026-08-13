"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderIcon, HouseIcon, DownloadIcon } from "lucide-react";
import { Locale } from "@/i18n/locales";
import { useTranslations } from "@/i18n/TranslationContext";

interface BottomNavProps {
  locale: Locale;
}

export default function BottomNav({ locale }: BottomNavProps) {
  const pathname = usePathname();
  const { t } = useTranslations();

  const isHome = pathname === `/${locale}` || pathname === "/";
  const isProjects = pathname.startsWith(`/${locale}/projects`);

  // Ganti URL ini dengan Direct Link Google Drive / File Resume kamu
  const resumeUrl = "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID";

  const items = [
    {
      href: `/${locale}`,
      icon: HouseIcon,
      active: isHome,
      label: t("nav.home"),
      isExternal: false,
    },
    {
      href: `/${locale}/projects`,
      icon: FolderIcon,
      active: isProjects,
      label: t("nav.projects"),
      isExternal: false,
    },
    {
      href: resumeUrl,
      icon: DownloadIcon,
      active: false, // Tidak pernah aktif sebagai tab rute
      label: "Resume",
      isExternal: true,
    },
  ];

  return (
    <nav className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 pb-4 md:bottom-6 md:pb-0">
      {/* iOS Crystal Glass Effect */}
      <div className="pointer-events-auto mx-auto flex w-fit items-center gap-1.5 rounded-xl border border-white/50 bg-white/40 p-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] saturate-180 backdrop-blur-2xl md:px-3 md:py-2.5 dark:border-white/10 dark:bg-zinc-950/40 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        {items.map((item) => {
          const className = `group relative flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-all duration-300 ease-in-out hover:scale-105 ${
            item.active
              ? "gap-2 bg-white/80 px-4 py-2 text-black shadow-sm dark:bg-zinc-800/80 dark:text-white"
              : "p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          }`;

          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                download
                className={`${className} hover:gap-2 hover:bg-white/60 hover:px-4 dark:hover:bg-zinc-800/60`}
              >
                <item.icon className="size-5 shrink-0 animate-in duration-200 zoom-in-95 fade-in" />
                <span className="max-w-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out group-hover:max-w-xs group-hover:opacity-100 text-xs font-semibold tracking-wide whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={className}>
              <item.icon className="size-5 shrink-0 animate-in duration-200 zoom-in-95 fade-in" />
              {item.active && (
                <span className="animate-in text-xs font-semibold tracking-wide duration-300 fade-in slide-in-from-left-2">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
