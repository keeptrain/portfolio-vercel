import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../components/About";

vi.mock("../components/HowIWork", () => ({
  default: () => <div data-testid="how-i-work" />,
}));

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    "about.title": "Experience",
    "about.description":
      "I've spent the last {duration} actively contributing as a Junior Developer.",
    "about.howIWork": "How I Work",
  };
  return translations[key] || key;
};

describe("About", () => {
  test("renders title", () => {
    render(<About t={mockT} />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  test("renders description with duration", () => {
    render(<About t={mockT} />);
    expect(screen.getByText(/1 Year 5 months/)).toBeInTheDocument();
  });

  test("renders How I Work title", () => {
    render(<About t={mockT} />);
    expect(screen.getByText("How I Work")).toBeInTheDocument();
  });

  test("renders company logos", () => {
    render(<About t={mockT} />);
    expect(screen.getByAltText("Bangkit")).toBeInTheDocument();
    expect(screen.getByAltText("Rptra")).toBeInTheDocument();
  });
});
