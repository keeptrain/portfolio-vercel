import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  test("renders with default variant", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("bg-gray-100");
  });

  test("renders with primary variant", () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText("Primary");
    expect(badge.className).toContain("bg-black");
  });

  test("renders with outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge.className).toContain("border");
  });

  test("applies custom className", () => {
    render(<Badge className="extra">Test</Badge>);
    expect(screen.getByText("Test").className).toContain("extra");
  });

  test("passes through HTML attributes", () => {
    render(<Badge data-testid="badge">Test</Badge>);
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });
});
