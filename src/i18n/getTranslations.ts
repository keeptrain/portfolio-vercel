import type { Locale } from "./locales";

export async function getTranslations(locale: Locale) {
  const messages: Record<string, unknown> = await import(`./messages/${locale}.json`);

  return function t(key: string): string {
    const parts = key.split(".");
    let current: unknown = messages.default || messages;

    for (const part of parts) {
      if (typeof current === "object" && current !== null) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }

    return typeof current === "string" ? current : key;
  };
}