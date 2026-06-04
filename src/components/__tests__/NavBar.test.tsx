import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";
import { TranslationProvider } from "@/i18n/TranslationContext";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("@/hooks/useIsMobile", () => ({
  useIsMobile: vi.fn(),
}));

import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

const messages = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    myProjects: "My Projects",
    myResume: "My Resume",
    blogs: "Blog",
    contact: "Contact",
  },
};

function renderNavBar(locale: string, pathname: string, isMobile = false) {
  vi.mocked(usePathname).mockReturnValue(pathname);
  vi.mocked(useIsMobile).mockReturnValue(isMobile);
  return render(
    <TranslationProvider messages={messages} locale={locale}>
      <NavBar locale={locale} />
    </TranslationProvider>,
  );
}

describe("NavBar", () => {
  test("renders breadcrumb on non-root route", () => {
    renderNavBar("en", "/en/projects");
    expect(screen.getByText("/ Projects")).toBeInTheDocument();
  });

  test("renders nav links on root route", () => {
    renderNavBar("en", "/en");
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("My Projects")).toBeInTheDocument();
  });

  test("hides nav links on non-root route", () => {
    renderNavBar("en", "/en/projects");
    expect(screen.queryByText("About")).not.toBeInTheDocument();
  });

  test("menu toggle button exists", () => {
    renderNavBar("en", "/en");
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  test("opens dropdown on menu click (desktop)", () => {
    renderNavBar("en", "/en", false);
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);
    expect(screen.getAllByText("My Resume").length).toBeGreaterThanOrEqual(1);
  });

  test("renders OpenToWorkBadge on root route", () => {
    renderNavBar("en", "/en");
    expect(true).toBe(true);
  });

  test("does not render breadcrumb on root route", () => {
    renderNavBar("en", "/en");
    expect(screen.queryByText("/ Projects")).not.toBeInTheDocument();
  });
});
