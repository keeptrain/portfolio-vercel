"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderIcon, BookOpenIcon, HouseIcon } from "lucide-react";
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
  const isBlog = pathname.startsWith(`/${locale}/blog`);

  const items = [
    {
      href: `/${locale}`,
      icon: HouseIcon,
      active: isHome,
      label: t("nav.home"),
    },
    {
      href: `/${locale}/projects`,
      icon: FolderIcon,
      active: isProjects,
      label: t("nav.projects"),
    },
    {
      href: `/${locale}/blog`,
      icon: BookOpenIcon,
      active: isBlog,
      label: t("nav.blogs"),
    },
  ];

  return (
    <nav className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 pb-4 md:bottom-6 md:pb-0">
      <div className="pointer-events-auto mx-auto flex w-fit items-center gap-1.5 rounded-xl border border-gray-200/60 bg-white/90 p-2 shadow-lg shadow-black/10 backdrop-blur-xl md:rounded-full md:px-3 md:py-2.5 dark:border-zinc-700/60 dark:bg-zinc-900/90 dark:shadow-black/30">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all duration-300 ease-in-out hover:scale-105 ${
              item.active
                ? "gap-2 bg-gray-100 px-4 py-2 text-black dark:bg-zinc-800/80 dark:text-white"
                : "p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            <item.icon className="size-5 animate-in duration-200 zoom-in-95 fade-in" />
            {item.active && (
              <span className="animate-in text-xs font-semibold tracking-wide duration-300 fade-in slide-in-from-left-2">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
