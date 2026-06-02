"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderOpen,
  BookOpen,
  HomeIcon,
  FoldersIcon,
  FolderIcon,
  BookIcon,
  BookOpenIcon,
  HouseIcon,
} from "lucide-react";
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
    <nav className="fixed right-0 bottom-0 left-0 z-10 pb-8 md:hidden">
      <div className="mx-auto flex w-fit items-center gap-1.5 rounded-xl border border-gray-200/60 bg-white/90 p-2 shadow-md shadow-black/10 backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-900/90 dark:shadow-black/30">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${
              item.active
                ? "gap-2 px-4 py-2"
                : "p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
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
