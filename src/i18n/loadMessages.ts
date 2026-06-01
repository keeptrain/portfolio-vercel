import type { Locale } from "./locales";
import en from "./messages/en.json";
import id from "./messages/id.json";

const messagesMap: Record<string, Record<string, unknown>> = { en, id };

export function loadMessages(locale: Locale) {
  return messagesMap[locale] || messagesMap.en;
}
