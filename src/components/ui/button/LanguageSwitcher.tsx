"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const locales = ["en", "id"];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();

  const switchLocale = locales.find((l) => l !== currentLocale);
  if (!switchLocale) return null;

  const newPathname = pathname.replace(`/${currentLocale}`, `/${switchLocale}`);

  return (
    <Link
      href={newPathname}
      className="min-w-[40px] rounded-full p-2 text-sm font-medium text-gray-600 shadow-sm transition-colors duration-200 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-primary-400"
      aria-label={`Switch to ${switchLocale}`}
    >
      {switchLocale.toUpperCase()}
    </Link>
  );
}