import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BottomNav from "../BottomNav";
import { TranslationProvider } from "@/i18n/TranslationContext";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from "next/navigation";

const messages = {
  nav: { home: "Home", projects: "Projects", blogs: "Blog" },
};

function renderNav(locale: string, pathname: string) {
  vi.mocked(usePathname).mockReturnValue(pathname);
  return render(
    <TranslationProvider messages={messages} locale={locale}>
      <p></p>
    </TranslationProvider>,
  );
}

describe("BottomNav", () => {
  test("renders 3 nav items", () => {
    renderNav("en", "/en");
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(3);
  });

  test("shows label text for active item", () => {
    renderNav("en", "/en");
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink.className).toContain("gap-2 px-4 py-2");
  });

  test("inactive items have p-2 class", () => {
    renderNav("en", "/en");
    const links = screen.getAllByRole("link");
    // Second link (projects) should be inactive
    const projectsLink = links[1];
    expect(projectsLink.className).toContain("p-2");
    expect(projectsLink.className).not.toContain("gap-2 px-4");
  });

  test("generates correct href with locale", () => {
    renderNav("id", "/id");
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/id");
    expect(hrefs).toContain("/id/projects");
    expect(hrefs).toContain("/id/blog");
  });
});
