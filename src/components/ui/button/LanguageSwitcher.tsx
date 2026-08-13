"use client";

import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IndonesiaFlag, USFlag } from "@/components/icons/FlagIcons";

const locales = ["en", "id"] as const;

export default function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Auto-detect locale from pathname if not provided
  const detectedLocale =
    currentLocale ||
    (pathname.split("/")[1] as (typeof locales)[number]) ||
    "en";

  const switchLocale = locales.find((l) => l !== detectedLocale);
  if (!switchLocale) return null;

  const newPathname = pathname.replace(
    `/${detectedLocale}`,
    `/${switchLocale}`,
  );
  const isEn = detectedLocale === "en";

  return (
    <Link
      href={newPathname}
      scroll={false}
      prefetch={false}
      onClick={() => {
        // Panggil refresh agar Server Component di-render ulang secara instan dengan locale baru
        setTimeout(() => router.refresh(), 0);
      }}
      className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white"
      aria-label={`Switch to ${switchLocale}`}
    >
      <ArrowRightLeft className="h-4 w-4" />
      {isEn ? <USFlag className="size-5" /> : <IndonesiaFlag className="size-5" />}
      <span>{detectedLocale.toUpperCase()}</span>
    </Link>
  );
}
