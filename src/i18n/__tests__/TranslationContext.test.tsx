import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TranslationProvider, useTranslations } from "../TranslationContext";

function TestComponent() {
  const { t, locale } = useTranslations();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="translation">{t("nav.home")}</span>
      <span data-testid="missing">{t("nonexistent.key")}</span>
    </div>
  );
}

describe("TranslationContext", () => {
  const messages = {
    nav: { home: "Home", about: "About" },
    hero: { headline: "Hello World" },
  };

  test("provides translations to children", () => {
    render(
      <TranslationProvider messages={messages} locale="en">
        <TestComponent />
      </TranslationProvider>
    );
    expect(screen.getByTestId("translation")).toHaveTextContent("Home");
  });

  test("provides locale to children", () => {
    render(
      <TranslationProvider messages={messages} locale="id">
        <TestComponent />
      </TranslationProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("id");
  });

  test("returns key for missing translation", () => {
    render(
      <TranslationProvider messages={messages} locale="en">
        <TestComponent />
      </TranslationProvider>
    );
    expect(screen.getByTestId("missing")).toHaveTextContent("nonexistent.key");
  });

  test("throws error when used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow();
    consoleSpy.mockRestore();
  });
});
