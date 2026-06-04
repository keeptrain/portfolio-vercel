import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  test("renders with animate-pulse", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("animate-pulse");
  });

  test("applies custom className", () => {
    const { container } = render(<Skeleton className="w-20 h-4" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("w-20");
    expect(el.className).toContain("h-4");
  });
});
