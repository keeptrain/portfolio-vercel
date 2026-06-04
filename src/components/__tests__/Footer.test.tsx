import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { TranslationProvider } from "@/i18n/TranslationContext";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/en"),
}));

vi.mock("@/contexts/ThemeContext", () => ({
  useTheme: () => ({ theme: "light", toggleTheme: () => {} }),
}));

const messages = {
  footer: {
    contactCta: "Got a question?",
    sendMessage: "Send me a message!",
    backToTop: "Back to Top",
    basedIn: "Based in Jakarta, Indonesia",
  },
};

function renderFooter() {
  return render(
    <TranslationProvider messages={messages} locale="en">
      <Footer />
    </TranslationProvider>,
  );
}

describe("Footer", () => {
  test("renders contact CTA text", () => {
    renderFooter();
    expect(screen.getByText("Got a question?")).toBeInTheDocument();
  });

  test("renders social links", () => {
    renderFooter();
    const githubLink = screen.getByLabelText(/github/i);
    const linkedinLink = screen.getByLabelText(/linkedin/i);
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });

  test("renders copyright", () => {
    renderFooter();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  test("renders back to top link", () => {
    renderFooter();
    const backToTop = screen.getByText("Back to Top");
    expect(backToTop).toBeInTheDocument();
    expect(backToTop.closest("a")).toHaveAttribute("href", "#hero");
  });

  test("renders signature image", () => {
    renderFooter();
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });
});
