import type { Locale } from "./locales";
import en from "./messages/en.json";
import id from "./messages/id.json";

const messagesMap: Record<string, Record<string, unknown>> = { en, id };

export function getTranslations(locale: Locale) {
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
