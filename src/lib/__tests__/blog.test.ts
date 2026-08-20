import { describe, test, expect } from "vitest";
import {
  getAllPosts,
  getPostBySlug,
  getFeaturedPosts,
  getPostsByTag,
  getAllTags,
  formatDate,
  getRelatedPosts,
} from "../blog";
import { BlogPost } from "@/features/blog/data/blogPosts";

describe("getAllPosts()", () => {
  test("returns array of posts", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  test("posts have required fields", () => {
    const posts = getAllPosts();
    posts.forEach((post) => {
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("tags");
      expect(typeof post.id).toBe("string");
      expect(typeof post.title).toBe("string");
      expect(typeof post.date).toBe("string");
      expect(Array.isArray(post.tags)).toBe(true);
    });
  });

  test("posts are sorted by date descending", () => {
    const posts = getAllPosts();
    for (let i = 0; i < posts.length - 1; i++) {
      const currentDate = new Date(posts[i].date).getTime();
      const nextDate = new Date(posts[i + 1].date).getTime();
      expect(currentDate).toBeGreaterThanOrEqual(nextDate);
    }
  });

  test("returns English posts by default", () => {
    const posts = getAllPosts();
    expect(posts[0].title).toBe("My Coding Journey in 2024");
  });

  test("returns English posts when locale is 'en'", () => {
    const posts = getAllPosts("en");
    expect(posts[0].title).toBe("My Coding Journey in 2024");
  });

  test("returns Indonesian posts when locale is 'id'", () => {
    const posts = getAllPosts("id");
    expect(posts[0].title).toBe("Perjalanan Coding Saya di 2024");
  });
});

describe("getPostBySlug()", () => {
  test("returns correct post for valid slug", () => {
    const post = getPostBySlug("my-coding-journey-2024");
    expect(post).not.toBeNull();
    expect(post?.id).toBe("my-coding-journey-2024");
    expect(post?.title).toBe("My Coding Journey in 2024");
  });

  test("returns null for non-existent slug", () => {
    const post = getPostBySlug("non-existent-slug");
    expect(post).toBeNull();
  });

  test("returns correct English version", () => {
    const post = getPostBySlug("building-this-portfolio", "en");
    expect(post?.title).toBe("Building This Portfolio Website");
  });

  test("returns correct Indonesian version", () => {
    const post = getPostBySlug("building-this-portfolio", "id");
    expect(post?.title).toBe("Membangun Website Portfolio Ini");
  });

  test("returns null for empty string", () => {
    const post = getPostBySlug("");
    expect(post).toBeNull();
  });
});

describe("getFeaturedPosts()", () => {
  test("returns only posts with featured: true", () => {
    const featured = getFeaturedPosts();
    expect(Array.isArray(featured)).toBe(true);
    featured.forEach((post) => {
      expect(post.featured).toBe(true);
    });
  });

  test("returns featured posts in English", () => {
    const featured = getFeaturedPosts("en");
    expect(featured.length).toBe(1);
    expect(featured[0].id).toBe("my-coding-journey-2024");
    expect(featured[0].title).toBe("My Coding Journey in 2024");
  });

  test("returns featured posts in Indonesian", () => {
    const featured = getFeaturedPosts("id");
    expect(featured.length).toBe(1);
    expect(featured[0].id).toBe("my-coding-journey-2024");
    expect(featured[0].title).toBe("Perjalanan Coding Saya di 2024");
  });

  test("featured posts are sorted by date descending", () => {
    const featured = getFeaturedPosts();
    for (let i = 0; i < featured.length - 1; i++) {
      const currentDate = new Date(featured[i].date).getTime();
      const nextDate = new Date(featured[i + 1].date).getTime();
      expect(currentDate).toBeGreaterThanOrEqual(nextDate);
    }
  });
});

describe("getPostsByTag()", () => {
  test("returns posts matching tag", () => {
    const posts = getPostsByTag("nextjs");
    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((post) => {
      expect(post.tags.some((tag) => tag.toLowerCase() === "nextjs")).toBe(true);
    });
  });

  test("returns empty array for non-existent tag", () => {
    const posts = getPostsByTag("nonexistenttag");
    expect(posts).toEqual([]);
  });

  test("case-insensitive matching", () => {
    const lower = getPostsByTag("nextjs");
    const upper = getPostsByTag("NEXTJS");
    const mixed = getPostsByTag("NextJs");
    expect(lower.length).toBe(upper.length);
    expect(lower.length).toBe(mixed.length);
  });

  test("returns correct posts for English tag", () => {
    const posts = getPostsByTag("reflection", "en");
    expect(posts.length).toBe(1);
    expect(posts[0].id).toBe("my-coding-journey-2024");
  });

  test("returns correct posts for Indonesian tag", () => {
    const posts = getPostsByTag("refleksi", "id");
    expect(posts.length).toBe(1);
    expect(posts[0].id).toBe("my-coding-journey-2024");
  });

  test("returns posts with multi-word tag", () => {
    const posts = getPostsByTag("web development", "en");
    expect(posts.length).toBe(1);
    expect(posts[0].id).toBe("building-this-portfolio");
  });
});

describe("getAllTags()", () => {
  test("returns deduplicated tags", () => {
    const tags = getAllTags();
    const uniqueTags = [...new Set(tags)];
    expect(tags.length).toBe(uniqueTags.length);
  });

  test("tags are sorted alphabetically", () => {
    const tags = getAllTags();
    const sorted = [...tags].sort();
    expect(tags).toEqual(sorted);
  });

  test("returns English tags", () => {
    const tags = getAllTags("en");
    expect(tags).toContain("coding");
    expect(tags).toContain("nextjs");
    expect(tags).toContain("reflection");
    expect(tags).toContain("portfolio");
  });

  test("returns Indonesian tags", () => {
    const tags = getAllTags("id");
    expect(tags).toContain("coding");
    expect(tags).toContain("nextjs");
    expect(tags).toContain("refleksi");
    expect(tags).toContain("produktivitas");
  });

  test("returns array of strings", () => {
    const tags = getAllTags();
    tags.forEach((tag) => {
      expect(typeof tag).toBe("string");
    });
  });
});

describe("formatDate()", () => {
  test("formats correctly in English", () => {
    const formatted = formatDate("2024-12-20", "en");
    expect(formatted).toContain("December");
    expect(formatted).toContain("20");
    expect(formatted).toContain("2024");
  });

  test("formats correctly in Indonesian", () => {
    const formatted = formatDate("2024-12-20", "id");
    expect(formatted).toContain("Desember");
    expect(formatted).toContain("20");
    expect(formatted).toContain("2024");
  });

  test("defaults to English", () => {
    const formatted = formatDate("2024-12-20");
    expect(formatted).toContain("December");
  });

  test("formats different dates correctly", () => {
    const formatted = formatDate("2024-01-15", "en");
    expect(formatted).toContain("January");
    expect(formatted).toContain("15");
    expect(formatted).toContain("2024");
  });
});

describe("getRelatedPosts()", () => {
  const currentPost: BlogPost = {
    id: "my-coding-journey-2024",
    title: "My Coding Journey in 2024",
    excerpt: "test",
    content: "test",
    date: "2024-12-20",
    tags: ["coding", "reflection", "typescript", "nextjs"],
    readTime: 3,
    featured: true,
  };

  test("excludes current post", () => {
    const related = getRelatedPosts(currentPost);
    related.forEach((post) => {
      expect(post.id).not.toBe(currentPost.id);
    });
  });

  test("respects limit parameter", () => {
    const related = getRelatedPosts(currentPost, "en", 1);
    expect(related.length).toBe(1);
  });

  test("returns default limit of 3 posts", () => {
    const related = getRelatedPosts(currentPost);
    expect(related.length).toBeLessThanOrEqual(3);
  });

  test("returns posts sorted by relevance (shared tags)", () => {
    const related = getRelatedPosts(currentPost, "en");
    if (related.length > 1) {
      const firstPostSharedTags = related[0].tags.filter((tag) =>
        currentPost.tags.includes(tag),
      ).length;
      const secondPostSharedTags = related[1].tags.filter((tag) =>
        currentPost.tags.includes(tag),
      ).length;
      expect(firstPostSharedTags).toBeGreaterThanOrEqual(secondPostSharedTags);
    }
  });

  test("works with Indonesian locale", () => {
    const idPost: BlogPost = {
      id: "my-coding-journey-2024",
      title: "Perjalanan Coding Saya di 2024",
      excerpt: "test",
      content: "test",
      date: "2024-12-20",
      tags: ["coding", "refleksi", "typescript", "nextjs"],
      readTime: 3,
      featured: true,
    };
    const related = getRelatedPosts(idPost, "id");
    related.forEach((post) => {
      expect(post.id).not.toBe(idPost.id);
    });
    expect(related.length).toBeGreaterThan(0);
  });

  test("returns empty array when no other posts exist", () => {
    const singlePost: BlogPost = {
      id: "only-post",
      title: "Only Post",
      excerpt: "test",
      content: "test",
      date: "2024-01-01",
      tags: ["unique-tag-no-match"],
      readTime: 1,
    };
    const related = getRelatedPosts(singlePost);
    expect(related.length).toBeLessThanOrEqual(3);
  });
});
