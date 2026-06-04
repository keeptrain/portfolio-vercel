import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { FadeInView } from "../FadeInView";

let observerCallback: IntersectionObserverCallback;

beforeEach(() => {
  vi.clearAllMocks();
  (global as any).IntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      observerCallback = callback;
    }
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
  };
});

describe("FadeInView", () => {
  test("renders children", () => {
    render(<FadeInView>Hello World</FadeInView>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("starts with opacity 0", () => {
    render(<FadeInView>Content</FadeInView>);
    const el = screen.getByText("Content");
    expect(el.style.opacity).toBe("0");
  });

  test("becomes visible when in view", () => {
    render(<FadeInView>Content</FadeInView>);
    const el = screen.getByText("Content");

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(el.style.opacity).toBe("1");
  });

  test("applies delay via transitionDelay", () => {
    render(<FadeInView delay={200}>Content</FadeInView>);
    const el = screen.getByText("Content");
    expect(el.style.transitionDelay).toBe("200ms");
  });
});
