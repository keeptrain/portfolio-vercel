import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../components/Hero";

const mockT = (key: string) => {
  const translations: Record<string, string> = {
    "hero.headline": "Hi I'm a Software Engineer who loves clean code.",
    "hero.reachOut": "Reach out",
    "hero.resume": "Resume",
    "hero.lessIsMore": "Less is More",
  };
  return translations[key] || key;
};

describe("Hero", () => {
  test("renders headline text", () => {
    render(<Hero t={mockT} locale="en" />);
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
  });

  test("renders Less is More tagline", () => {
    render(<Hero t={mockT} locale="en" />);
    expect(screen.getByText("Less is More")).toBeInTheDocument();
  });

  test("renders profile image", () => {
    render(<Hero t={mockT} locale="en" />);
    const image = screen.getByAltText("Profile");
    expect(image).toBeInTheDocument();
  });

  test("renders mobile buttons on small screens", () => {
    render(<Hero t={mockT} locale="en" />);
    expect(screen.getByText("Reach out")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
  });
});
