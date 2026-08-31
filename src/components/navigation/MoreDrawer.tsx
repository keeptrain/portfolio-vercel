"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EllipsisIcon, ArrowLeftRightIcon, DownloadIcon } from "lucide-react";
import { Locale } from "@/i18n/locales";
import ThemeSwitcher from "../ThemeSwitcher";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IndonesiaFlag, USFlag } from "../icons/FlagIcons";
import { Button } from "../ui/button";

const resumeUrl =
  "https://drive.google.com/uc?export=download&id=1k8stK1faQBL-zetngLBsN_XKCttD9Sxr";

interface MoreDrawerProps {
  locale: Locale;
  label?: string;
}

export default function MoreDrawer({
  locale,
  label = "More Options",
}: MoreDrawerProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isEn = locale === "en";
  const targetLocale = isEn ? "id" : "en";
  const targetPathname = pathname.replace(`/${locale}`, `/${targetLocale}`);

  const handleOpenChange = (open: boolean) => {
    if (open) (document.activeElement as HTMLElement)?.blur();
    setIsOpen(open);
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="group relative flex min-h-11 min-w-11 text-zinc-600 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100"
          aria-label={label}
        >
          <EllipsisIcon className="size-5 shrink-0 animate-in duration-200 zoom-in-95 fade-in" />
        </Button>
      </DrawerTrigger>
        <DrawerContent className="sm:mx-auto sm:max-w-md">
          {/* Header */}
          <DrawerHeader>
            <DrawerTitle>More Menu</DrawerTitle>
          </DrawerHeader>

          <div className="w-full p-6">
            <div className="space-y-5">
              {/* Option 1: Download Resume Button */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Resume
                </span>
                <Button asChild size="icon" variant="outline">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    onClick={() => setIsOpen(false)}
                    aria-label="Download Resume"
                  >
                    <DownloadIcon className="size-4" />
                  </a>
                </Button>
              </div>

              {/* Option 2: Theme Preference */}
              <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Theme Preference
                </span>
                <ThemeSwitcher />
              </div>

              {/* Option 3: Language Preference */}
              <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                  Language
                </span>
                <div className="flex items-center gap-2">
                  <ArrowLeftRightIcon className="size-4 text-zinc-500 dark:text-zinc-400" />
                  <Link
                    href={targetPathname}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 transition-all hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
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
  );
}
