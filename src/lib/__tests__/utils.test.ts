import { describe, test, expect } from "vitest";
import { cn } from "../utils";

describe("cn()", () => {
  test("merges classes correctly", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  test("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "inactive")).toBe("base active");
  });

  test("handles tailwind-merge conflicts", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  test("handles undefined and null", () => {
    expect(cn("base", undefined, null)).toBe("base");
  });
});
