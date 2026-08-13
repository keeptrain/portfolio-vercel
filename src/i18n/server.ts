import "server-only";

import { cache } from "react";
import type { Locale } from "./locales";
import en from "./messages/en.json";
import id from "./messages/id.json";

const messagesMap: Record<string, Record<string, unknown>> = { en, id };

// React.cache() menjamin objek per-request ini ter-isolate
const requestLocale = cache(() => {
  return { current: "en" as Locale };
});

/**
 * Dipanggil di [locale]/layout.tsx untuk menyimpan locale aktif ke request context
 */
export function setRequestLocale(locale: Locale) {
  requestLocale().current = locale;
}

/**
 * Mendapatkan locale aktif saat ini di Server Component manapun tanpa props
 */
export function getLocale(): Locale {
  return requestLocale().current;
}

/**
 * Mendapatkan fungsi translator t() untuk locale saat ini di Server Component manapun tanpa props
 */
export function getT() {
  const locale = getLocale();
  const messages = messagesMap[locale] || messagesMap.en;

  return function t(key: string): string {
    const parts = key.split(".");
    let current: unknown = messages;

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
