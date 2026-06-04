import { describe, test, expect } from "vitest";
import { loadMessages } from "../loadMessages";

describe("loadMessages", () => {
  test("returns messages for English", () => {
    const messages = loadMessages("en");
    expect(messages).toBeDefined();
    expect(typeof messages).toBe("object");
  });

  test("returns messages for Indonesian", () => {
    const messages = loadMessages("id");
    expect(messages).toBeDefined();
  });

  test("English messages have expected structure", () => {
    const messages = loadMessages("en") as Record<string, any>;
    expect(messages).toHaveProperty("nav");
    expect(messages).toHaveProperty("hero");
    expect(messages).toHaveProperty("about");
    expect(messages).toHaveProperty("projects");
    expect(messages).toHaveProperty("footer");
  });

  test("Indonesian messages have same structure as English", () => {
    const en = loadMessages("en") as Record<string, any>;
    const id = loadMessages("id") as Record<string, any>;
    expect(Object.keys(en)).toEqual(Object.keys(id));
  });

  test("falls back to English for unknown locale", () => {
    const messages = loadMessages("fr" as any);
    expect(messages).toBeDefined();
  });
});
