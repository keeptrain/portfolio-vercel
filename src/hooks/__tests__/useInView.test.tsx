import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useInView } from "../useInView";

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
let observerCallback: IntersectionObserverCallback;

beforeEach(() => {
  vi.clearAllMocks();
  class MockIntersectionObserver {
    constructor(callback: IntersectionObserverCallback) {
      observerCallback = callback;
    }
    observe = mockObserve;
    disconnect = mockDisconnect;
    unobserve = vi.fn();
    takeRecords = vi.fn(() => []);
    root = null;
    rootMargin = "";
    thresholds = [0];
  }
  global.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

function TestComponent({ once = true }: { once?: boolean }) {
  const { ref, isInView } = useInView({ once });
  return (
    <div ref={ref} data-testid="target">
      {isInView ? "visible" : "hidden"}
    </div>
  );
}

describe("useInView", () => {
  test("calls observe on the element", () => {
    render(<TestComponent />);
    expect(mockObserve).toHaveBeenCalled();
  });

  test("sets isInView to true when element enters viewport", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("target")).toHaveTextContent("hidden");

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(screen.getByTestId("target")).toHaveTextContent("visible");
  });

  test("disconnects observer after first intersection when once=true", () => {
    render(<TestComponent once={true} />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(mockDisconnect).toHaveBeenCalled();
  });

  test("does not disconnect when once=false", () => {
    render(<TestComponent once={false} />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(mockDisconnect).not.toHaveBeenCalled();
  });

  test("sets isInView back to false when element leaves viewport with once=false", () => {
    render(<TestComponent once={false} />);

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(screen.getByTestId("target")).toHaveTextContent("visible");

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(screen.getByTestId("target")).toHaveTextContent("hidden");
  });
});
