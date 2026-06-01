"use client";

import React, { createContext, useContext, useMemo } from "react";

export type Messages = Record<string, unknown>;

interface TranslationContextType {
  messages: Messages;
  locale: string;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({
  messages,
  locale,
  children,
}: {
  messages: Messages;
  locale: string;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ messages, locale }), [messages, locale]);
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslations must be used within TranslationProvider");
  }

  const { messages, locale } = context;

  function t(key: string): string {
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
  }

  return { t, locale };
}
