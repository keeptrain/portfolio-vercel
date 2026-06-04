import { describe, test, expect } from "vitest";
import { getLocaleFromHeader } from "../locale-detection";

describe("getLocaleFromHeader", () => {
  test('returns "en" for null header', () => {
    expect(getLocaleFromHeader(null)).toBe("en");
  });

  test('returns "en" for empty string', () => {
    expect(getLocaleFromHeader("")).toBe("en");
  });

  test('parses simple "id" header', () => {
    expect(getLocaleFromHeader("id")).toBe("id");
  });

  test('parses simple "en" header', () => {
    expect(getLocaleFromHeader("en")).toBe("en");
  });

  test('handles "en-US" by matching "en"', () => {
    expect(getLocaleFromHeader("en-US")).toBe("en");
  });

  test('handles "id-ID" by matching "id"', () => {
    expect(getLocaleFromHeader("id-ID")).toBe("id");
  });

  test("returns default for unsupported language", () => {
    expect(getLocaleFromHeader("fr")).toBe("en");
    expect(getLocaleFromHeader("de")).toBe("en");
    expect(getLocaleFromHeader("ja")).toBe("en");
  });

  test("respects quality values and picks highest", () => {
    expect(getLocaleFromHeader("fr;q=0.5, id;q=1.0")).toBe("id");
  });

  test("picks first match when qualities are equal", () => {
    expect(getLocaleFromHeader("id, en")).toBe("id");
  });

  test("handles complex Accept-Language header", () => {
    expect(getLocaleFromHeader("en-US,en;q=0.9,id;q=0.8")).toBe("en");
  });
});
