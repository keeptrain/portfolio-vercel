import { describe, test, expect } from "vitest";
import { proxy } from "../proxy";

function createRequest(pathname: string, acceptLanguage?: string) {
  const url = new URL(`http://localhost:3000${pathname}`);
  const headers = new Headers();
  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage);
  }
  return {
    nextUrl: url,
    url: url.toString(),
    headers,
  } as any;
}

describe("proxy()", () => {
  test("passes through when locale already in pathname", () => {
    const req = createRequest("/en/projects");
    const res = proxy(req);
    expect(res.status).toBe(200);
  });

  test("passes through for Indonesian locale path", () => {
    const req = createRequest("/id/projects");
    const res = proxy(req);
    expect(res.status).toBe(200);
  });

  test("redirects to /en when no locale and English accept-language", () => {
    const req = createRequest("/projects", "en-US,en;q=0.9");
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/en/projects");
  });

  test("redirects to /id when Indonesian accept-language", () => {
    const req = createRequest("/projects", "id-ID,id;q=0.9");
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/id/projects");
  });

  test("preserves search params during redirect", () => {
    const req = createRequest("/projects?sort=latest", "en-US");
    const res = proxy(req);
    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).toContain("/en/projects");
    expect(location).toContain("sort=latest");
  });

  test("defaults to English when no accept-language header", () => {
    const req = createRequest("/about");
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/en/about");
  });

  test("handles root path", () => {
    const req = createRequest("/", "en-US");
    const res = proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/en");
  });
});
