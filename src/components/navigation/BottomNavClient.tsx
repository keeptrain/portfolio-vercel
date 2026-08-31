"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HouseIcon, FolderOpenIcon } from "lucide-react";
import { Locale } from "@/i18n/locales";
import { Button } from "@/components/ui/button";
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
    <nav className="pointer-events-none fixed bottom-4 left-1/2 z-20 -translate-x-1/2 pb-4 md:bottom-6 md:pb-0">
      {/* iOS Crystal Glass - stronger contrast for readability */}
      <div className="pointer-events-auto mx-auto flex w-fit items-center gap-1.5 rounded-2xl border border-white/60 bg-white/85 p-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.16)] saturate-150 backdrop-blur-xl md:px-2 md:py-1 dark:border-zinc-700/50 dark:bg-zinc-900/85 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
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
            <Button
              key={item.id}
              asChild
              variant={isActive ? "outline" : "ghost"}
              size={isActive ? "default" : "icon"}
            >
              <Link href={item.href} className="gap-2">
                <IconComponent className="size-5 shrink-0" />
                {isActive && (
                  <span className="text-xs font-semibold tracking-wide">
                    {item.label}
                  </span>
                )}
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
