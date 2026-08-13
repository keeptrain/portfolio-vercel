import { describe, test, expect } from "vitest";
import { setRequestLocale, getT, getLocale } from "../server";

describe("server i18n cache", () => {
  test("sets and gets locale", () => {
    setRequestLocale("id");
    expect(getLocale()).toBe("id");
    setRequestLocale("en");
    expect(getLocale()).toBe("en");
  });

  test("returns translation function for English", () => {
    setRequestLocale("en");
    const t = getT();
    expect(typeof t).toBe("function");
  });

  test("resolves simple key", () => {
    setRequestLocale("en");
    const t = getT();
    const result = t("hero.headline");
    expect(result).not.toBe("hero.headline");
    expect(typeof result).toBe("string");
  });

  test("resolves nested dot-notation key", () => {
    setRequestLocale("en");
    const t = getT();
    expect(t("nav.home")).toBeDefined();
    expect(t("nav.about")).toBeDefined();
  });

  test("returns key string for missing translation", () => {
    setRequestLocale("en");
    const t = getT();
    expect(t("nonexistent.key")).toBe("nonexistent.key");
  });

  test("works for Indonesian locale", () => {
    setRequestLocale("id");
    const t = getT();
    expect(t("nav.home")).toBeDefined();
    expect(t("nav.home")).not.toBe("nav.home");
  });
});
