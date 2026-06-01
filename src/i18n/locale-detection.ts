import { locales, defaultLocale } from "./locales";

export function getLocaleFromHeader(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";");
      const quality = q ? parseFloat(q.split("=")[1]) : 1;
      return { code: code.trim().toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of preferred) {
    const shortCode = code.split("-")[0];
    if (locales.includes(shortCode as (typeof locales)[number])) {
      return shortCode;
    }
  }

  return defaultLocale;
}