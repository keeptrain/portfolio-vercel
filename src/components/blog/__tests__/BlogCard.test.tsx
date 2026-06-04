import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogCard from "../BlogCard";

vi.mock("next/link", () => {
  return {
    default: ({ href, children, ...props }: any) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  };
});

const mockPost = {
  id: "test-post",
  title: "Test Blog Post",
  excerpt: "This is a test excerpt for the blog post.",
  content: "Full content here",
  date: "2024-03-15",
  readTime: 5,
  tags: ["react", "nextjs"],
  featured: false,
};

const mockFeaturedPost = {
  ...mockPost,
  featured: true,
};

function renderCard(post: any, locale = "en") {
  return render(<BlogCard post={post} locale={locale} />);
}

describe("BlogCard", () => {
  test("renders post title", () => {
    renderCard(mockPost);
    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
  });

  test("renders excerpt", () => {
    renderCard(mockPost);
    expect(screen.getByText(/test excerpt/)).toBeInTheDocument();
  });

  test("renders date", () => {
    renderCard(mockPost);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  test("renders featured badge when featured", () => {
    renderCard(mockFeaturedPost);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  test("does not render featured badge when not featured", () => {
    renderCard(mockPost);
    const featured = screen.queryByText("Featured");
    expect(featured).toBeNull();
  });

  test("links to correct blog post URL", () => {
    renderCard(mockPost);
    const link = screen.getByRole("link", { name: /test blog post/i });
    expect(link.getAttribute("href")).toBe("/en/blog/test-post");
  });

  test("renders read more link", () => {
    renderCard(mockPost);
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  test("renders tags", () => {
    renderCard(mockPost);
    expect(screen.getByText("#react")).toBeInTheDocument();
    expect(screen.getByText("#nextjs")).toBeInTheDocument();
  });

  test("renders Indonesian text when locale is id", () => {
    renderCard(mockPost, "id");
    expect(screen.getByText("Baca selengkapnya")).toBeInTheDocument();
    expect(screen.getByText(/menit baca/)).toBeInTheDocument();
  });

  test("renders featured badge for featured post in Indonesian", () => {
    renderCard(mockFeaturedPost, "id");
    expect(screen.getByText("Unggulan")).toBeInTheDocument();
  });
});
