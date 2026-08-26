"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon, FolderOpenIcon } from "lucide-react";
import { Locale } from "@/i18n/locales";
import MoreDrawer from "./MoreDrawer";

export interface NavItemConfig {
  id: "home" | "projects" | "more";
  href: string;
  label: string;
}

interface BottomNavClientProps {
  locale: Locale;
  navItems: NavItemConfig[];
}

export default function BottomNavClient({
  locale,
  navItems,
}: BottomNavClientProps) {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 pb-4 md:bottom-6 md:pb-0">
      {/* iOS Crystal Glass Effect */}
      <div className="pointer-events-auto mx-auto flex w-fit items-center gap-1.5 rounded-xl border border-white/50 bg-white/40 p-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] saturate-180 backdrop-blur-2xl md:px-3 md:py-2.5 dark:border-white/10 dark:bg-zinc-950/40 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          if (item.id === "more") {
            return (
              <MoreDrawer key={item.id} locale={locale} label={item.label} />
            );
          }

          const isActive =
            item.id === "home"
              ? pathname === `/${locale}` || pathname === "/"
              : pathname.startsWith(`/${locale}/projects`);

          const IconComponent = item.id === "home" ? HouseIcon : FolderOpenIcon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-all duration-300 ease-in-out hover:scale-105 ${
                isActive
                  ? "gap-2 px-2 dark:text-white"
                  : "p-2.5 text-zinc-400 hover:text-zinc-800 dark:text-zinc-700 dark:hover:text-zinc-100"
              }`}
            >
              <IconComponent className="size-5 shrink-0 animate-in duration-200 zoom-in-95 fade-in" />
              {isActive && (
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
