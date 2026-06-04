import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "../Container";

describe("Container", () => {
  test("renders children", () => {
    render(<Container>Hello</Container>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<Container className="custom">Test</Container>);
    const el = screen.getByText("Test");
    expect(el.className).toContain("custom");
  });

  test("has max-width class", () => {
    render(<Container>Test</Container>);
    const el = screen.getByText("Test");
    expect(el.className).toContain("max-w-7xl");
  });

  test("renders as div by default", () => {
    render(<Container>Test</Container>);
    const el = screen.getByText("Test");
    expect(el.tagName).toBe("DIV");
  });

  test("renders as custom element", () => {
    render(<Container as="main">Test</Container>);
    const el = screen.getByText("Test");
    expect(el.tagName).toBe("MAIN");
  });
});
