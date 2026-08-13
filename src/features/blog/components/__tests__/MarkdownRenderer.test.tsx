import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MarkdownRenderer from "../MarkdownRenderer";

describe("MarkdownRenderer", () => {
  test("renders plain text", () => {
    render(<MarkdownRenderer content="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  test("renders bold text", () => {
    render(<MarkdownRenderer content="**bold text**" />);
    const el = screen.getByText("bold text");
    expect(el.tagName).toBe("STRONG");
  });

  test("renders italic text", () => {
    render(<MarkdownRenderer content="*italic text*" />);
    const el = screen.getByText("italic text");
    expect(el.tagName).toBe("EM");
  });

  test("renders links with target blank", () => {
    render(<MarkdownRenderer content="[link](https://example.com)" />);
    const link = screen.getByText("link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("renders inline code", () => {
    render(<MarkdownRenderer content="`code`" />);
    const el = screen.getByText("code");
    expect(el.tagName).toBe("CODE");
  });

  test("escapes HTML tags", () => {
    render(<MarkdownRenderer content="<script>alert('xss')</script>" />);
    expect(screen.queryByText("alert('xss')")).not.toBeInTheDocument();
  });

  test("renders headers", () => {
    const { container } = render(<MarkdownRenderer content="# Title" />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent("Title");
  });

  test("renders multiple paragraphs", () => {
    const { container } = render(<MarkdownRenderer content="First\n\nSecond" />);
    expect(container.innerHTML).toContain("First");
    expect(container.innerHTML).toContain("Second");
  });
});
