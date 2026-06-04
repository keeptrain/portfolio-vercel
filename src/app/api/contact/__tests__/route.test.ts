import { describe, test, expect } from "vitest";
import { POST } from "../route";

function createRequest(body: any): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  test("returns 200 for valid input", async () => {
    const req = createRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "project",
      message: "Hello, I have a project inquiry for you.",
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });

  test("returns 400 for missing name", async () => {
    const req = createRequest({
      email: "john@example.com",
      subject: "project",
      message: "Hello, I have a project inquiry.",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns 400 for invalid email", async () => {
    const req = createRequest({
      name: "John",
      email: "not-an-email",
      subject: "project",
      message: "Hello, I have a project inquiry.",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns 400 for name shorter than 2 chars", async () => {
    const req = createRequest({
      name: "J",
      email: "john@example.com",
      subject: "project",
      message: "Hello, I have a project inquiry.",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns 400 for message shorter than 10 chars", async () => {
    const req = createRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "project",
      message: "Hi",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns 400 for empty subject", async () => {
    const req = createRequest({
      name: "John Doe",
      email: "john@example.com",
      subject: "",
      message: "Hello, I have a project inquiry.",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns 400 for completely empty body", async () => {
    const req = createRequest({});
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  test("returns 500 for invalid JSON", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const res = await POST(req);
    expect(res.status).toBe(500);
  });
});
