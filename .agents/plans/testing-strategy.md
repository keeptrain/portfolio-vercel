# Testing Strategy Plan

> Unit, integration, and E2E testing untuk static site  
> Last updated: 2026-06-03

---

## 1. Philosophy

Static site ≠ tidak perlu testing. Bahkan lebih penting karena:
- Build-time errors tidak terlihat saat dev
- SEO breakage = traffic loss
- Accessibility issues = legal risk

**Rule:** Test business logic dan user flows, bukan implementation details.

---

## 2. Testing Pyramid

```
     /\
    /  \   E2E (Playwright)        — 10%  — Critical paths
   /    \  
  /------\  Integration (RTL+Jest)  — 30%  — Components + Data
 /        \ 
/----------\ Unit (Jest + Vitest)   — 60%  — Utilities, helpers
```

---

## 3. Unit Tests — Utilities & Helpers

### 3.1 Data Layer Tests

```ts
// data/__tests__/projects.test.ts
import { getAllProjects, getProjectBySlug, getFeaturedProjects } from "../projects";

describe("Project data layer", () => {
  test("getAllProjects returns sorted array", () => {
    const projects = getAllProjects();
    expect(projects).toBeInstanceOf(Array);
    expect(projects.length).toBeGreaterThan(0);
    
    // Sorted by date descending
    const dates = projects.map(p => new Date(p.date).getTime());
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  test("getProjectBySlug returns correct project", () => {
    const project = getProjectBySlug("jakreq");
    expect(project).toBeDefined();
    expect(project?.title).toBe("JakReq");
    expect(project?.stack).toContain("Laravel");
  });

  test("getProjectBySlug returns null for invalid slug", () => {
    const project = getProjectBySlug("nonexistent");
    expect(project).toBeNull();
  });

  test("getFeaturedProjects only returns featured", () => {
    const featured = getFeaturedProjects();
    expect(featured.every(p => p.featured)).toBe(true);
  });
});
```

### 3.2 Filter Logic Tests

```ts
// data/__tests__/filters.test.ts
import { filterProjects } from "../filters";

describe("filterProjects", () => {
  const mockProjects = [
    { id: "1", stack: ["React", "Next.js"], category: "Web", featured: true, date: "2024-01-01" },
    { id: "2", stack: ["Laravel"], category: "Web", featured: false, date: "2024-02-01" },
  ];

  test("filters by stack", () => {
    const result = filterProjects(mockProjects, { stack: "React" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  test("filters by featured", () => {
    const result = filterProjects(mockProjects, { featured: true });
    expect(result).toHaveLength(1);
    expect(result[0].featured).toBe(true);
  });

  test("sorts by date", () => {
    const result = filterProjects(mockProjects, { sort: "date" });
    expect(result[0].id).toBe("2"); // Latest first
  });
});
```

### 3.3 Utility Function Tests

```ts
// lib/__tests__/utils.test.ts
import { cn } from "../utils";
import { formatDate } from "../date";

describe("cn()", () => {
  test("merges classes correctly", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  test("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "inactive")).toBe("base active");
  });

  test("handles tailwind-merge conflicts", () => {
    expect(cn("p-4", "p-2")).toBe("p-2"); // Last wins
  });
});

describe("formatDate", () => {
  test("formats Indonesian date", () => {
    expect(formatDate("2024-03-15", "id")).toBe("15 Maret 2024");
  });

  test("formats English date", () => {
    expect(formatDate("2024-03-15", "en")).toBe("March 15, 2024");
  });
});
```

---

## 4. Integration Tests — Components

### 4.1 React Testing Library Setup

```ts
// jest.setup.ts atau vitest.setup.ts
import "@testing-library/jest-dom";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));
```

### 4.2 Component Tests

```tsx
// components/projects/__tests__/FilterBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../FilterBar";

describe("FilterBar", () => {
  const stacks = ["React", "Laravel", "Next.js"];

  test("renders all stack options", () => {
    render(<FilterBar stacks={stacks} />);
    
    stacks.forEach(stack => {
      expect(screen.getByRole("button", { name: stack })).toBeInTheDocument();
    });
  });

  test("active stack has correct styling", () => {
    render(<FilterBar stacks={stacks} />);
    
    const reactButton = screen.getByRole("button", { name: "React" });
    fireEvent.click(reactButton);
    
    expect(reactButton).toHaveClass("bg-black", "text-white");
  });

  test("clicking active stack deactivates it", () => {
    render(<FilterBar stacks={stacks} />);
    
    const reactButton = screen.getByRole("button", { name: "React" });
    fireEvent.click(reactButton); // Activate
    fireEvent.click(reactButton); // Deactivate
    
    expect(reactButton).not.toHaveClass("bg-black");
  });
});
```

```tsx
// components/layout/__tests__/NavBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";

describe("NavBar", () => {
  test("renders desktop navigation on large screens", () => {
    render(<NavBar locale="en" />);
    
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("My Projects")).toBeInTheDocument();
  });

  test("mobile menu toggles on button click", () => {
    render(<NavBar locale="en" />);
    
    const menuButton = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(menuButton);
    
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
```

---

## 5. E2E Tests — Critical User Paths

### 5.1 Playwright Setup

```ts
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "Desktop Chrome", use: { browserName: "chromium", viewport: { width: 1280, height: 720 } } },
    { name: "Mobile Safari", use: { browserName: "webkit", viewport: { width: 375, height: 667 } } },
  ],
});
```

### 5.2 Test Scenarios

```ts
// e2e/navigation.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads with correct title", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveTitle(/Gilang|KeepTrain/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("language switcher changes URL", async ({ page }) => {
    await page.goto("/en");
    await page.click("[aria-label*='Switch to Indonesian']");
    await expect(page).toHaveURL(/\/id/);
    await expect(page.locator("html")).toHaveAttribute("lang", "id");
  });

  test("mobile bottom navigation works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/en");
    
    await page.click("nav[aria-label='Bottom navigation'] a[href='/en/projects']");
    await expect(page).toHaveURL(/\/projects/);
  });

  test("keyboard navigation through mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/en");
    
    await page.keyboard.press("Tab"); // Focus hamburger
    await page.keyboard.press("Enter"); // Open menu
    await expect(page.locator("[role='dialog']")).toBeVisible();
    
    await page.keyboard.press("Escape"); // Close menu
    await expect(page.locator("[role='dialog']")).toBeHidden();
  });
});
```

```ts
// e2e/projects.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Projects", () => {
  test("project list page shows projects", async ({ page }) => {
    await page.goto("/en/projects");
    
    const projectCards = page.locator("[data-testid='project-card']");
    await expect(projectCards).toHaveCount.greaterThan(0);
  });

  test("filter by stack shows correct projects", async ({ page }) => {
    await page.goto("/en/projects");
    
    await page.click("button:has-text('Laravel')");
    const projectCards = page.locator("[data-testid='project-card']");
    
    for (const card of await projectCards.all()) {
      await expect(card).toContainText("Laravel");
    }
  });

  test("project detail page shows correct info", async ({ page }) => {
    await page.goto("/en/projects");
    await page.click("text=JakReq");
    
    await expect(page.locator("h1")).toContainText("JakReq");
    await expect(page.locator("[data-testid='project-stack']")).toContainText("Laravel");
  });
});
```

---

## 6. Accessibility Tests

```ts
// e2e/accessibility.spec.ts
import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test.describe("Accessibility", () => {
  test("home page passes axe check", async ({ page }) => {
    await page.goto("/en");
    await injectAxe(page);
    
    const results = await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });
    
    expect(results.violations).toHaveLength(0);
  });

  test("projects page passes axe check", async ({ page }) => {
    await page.goto("/en/projects");
    await injectAxe(page);
    await checkA11y(page);
  });
});
```

---

## 7. CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test:unit
      - run: pnpm test:integration

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test:e2e
```

---

## 8. Test Commands

```json
{
  "scripts": {
    "test:unit": "vitest run --config vitest.config.ts",
    "test:unit:watch": "vitest --config vitest.config.ts",
    "test:integration": "jest --config jest.config.js",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:a11y": "jest --config jest.a11y.config.js",
    "test": "pnpm test:unit && pnpm test:integration && pnpm test:e2e"
  }
}
```

---

## 9. Action Items

- [ ] **Install testing dependencies**: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `playwright`, `jest-axe`
- [ ] **Setup Vitest config**: `vitest.config.ts` dengan `jsdom` environment
- [ ] **Setup Jest config**: Untuk integration tests yang butuh DOM
- [ ] **Setup Playwright**: `playwright.config.ts` dengan 2 projects (desktop + mobile)
- [ ] **Mock modules**: `next/image`, `next/navigation`, `next/router`
- [ ] **Write data layer tests**: `data/__tests__/*.test.ts`
- [ ] **Write utility tests**: `lib/__tests__/*.test.ts`
- [ ] **Write component tests**: `components/**/__tests__/*.test.tsx`
- [ ] **Write E2E tests**: `e2e/*.spec.ts`
- [ ] **Add GitHub Actions**: `.github/workflows/test.yml`
- [ ] **Coverage target**: 80% functions, 70% lines
- [ ] **Badge**: Add coverage badge ke README

---

## 10. Dependencies

```json
{
  "devDependencies": {
    "vitest": "^2.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "jsdom": "^24.0.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "@playwright/test": "^1.40.0",
    "axe-playwright": "^2.0.0",
    "jest-axe": "^9.0.0"
  }
}
```

---

*Target: Coverage 80%, a11y violations 0, E2E pass rate 100%.*
