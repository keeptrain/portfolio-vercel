import { describe, test, expect } from "vitest";
import { getTranslations } from "../getTranslations";

describe("getTranslations", () => {
  test("returns translation function for English", () => {
    const t = getTranslations("en");
    expect(typeof t).toBe("function");
  });

  test("resolves simple key", () => {
    const t = getTranslations("en");
    const result = t("hero.headline");
    expect(result).not.toBe("hero.headline");
    expect(typeof result).toBe("string");
  });

  test("resolves nested dot-notation key", () => {
    const t = getTranslations("en");
    expect(t("nav.home")).toBeDefined();
    expect(t("nav.about")).toBeDefined();
  });

  test("returns key string for missing translation", () => {
    const t = getTranslations("en");
    expect(t("nonexistent.key")).toBe("nonexistent.key");
  });

  test("works for Indonesian locale", () => {
    const t = getTranslations("id");
    expect(t("nav.home")).toBeDefined();
    expect(t("nav.home")).not.toBe("nav.home");
  });

  test("falls back to English for unknown locale", () => {
    const t = getTranslations("fr" as any);
    expect(t("nav.home")).toBeDefined();
  });
});
