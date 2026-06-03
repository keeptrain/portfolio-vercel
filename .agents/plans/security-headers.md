# Security & Headers Plan

> Hardening Next.js app dengan security headers, CSP, dan best practices  
> Last updated: 2026-06-03

---

## 1. Current State

### 1.1 Missing Security Headers

```bash
# Cek current headers
curl -I https://yourdomain.com

# Expected missing:
# - Content-Security-Policy
# - X-Frame-Options
# - X-Content-Type-Options
# - Referrer-Policy
# - Permissions-Policy
```

### 1.2 Potential Vulnerabilities

| Risk | Current State |
|------|---------------|
| XSS via inline scripts | No CSP |
| Clickjacking | No X-Frame-Options |
| MIME sniffing | No X-Content-Type-Options |
| Data leakage via referrer | No Referrer-Policy |
| Feature abuse | No Permissions-Policy |
| Open redirects | Not validated |
| Sensitive data exposure | .env not audited |

---

## 2. Security Headers (Next.js Config)

```ts
// next.config.js
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 3. Content Security Policy (CSP)

### 3.1 Strict CSP dengan Nonce

```ts
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:;
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://vitals.vercel-insights.com https://api.resend.com;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  
  response.headers.set("Content-Security-Policy", cspHeader);
  
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
```

### 3.2 Report-Only Mode (Untuk Development)

```ts
// Gunakan header ini untuk test tanpa block:
// Content-Security-Policy-Report-Only: ...; report-uri /api/csp-report;

// API route untuk collect violations:
// app/api/csp-report/route.ts
export async function POST(request: Request) {
  const report = await request.json();
  console.error("CSP Violation:", report);
  // Send to monitoring service (Sentry, etc.)
  return new Response("OK");
}
```

---

## 4. Input Validation & Sanitization

### 4.1 All User Inputs

```ts
// lib/validation.ts
import { z } from "zod";

export const emailSchema = z.string().email().max(254);
export const nameSchema = z.string().min(1).max(100).regex(/^[\p{L}\s'-]+$/u);
export const messageSchema = z.string().min(1).max(5000);

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.enum(["project", "collaboration", "other"]),
  message: messageSchema,
});

// Sanitization helpers
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Basic XSS prevention
    .slice(0, 5000); // Length limit
}
```

### 4.2 URL Validation

```ts
// lib/validation.ts
export function isValidInternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url, "http://localhost");
    // Only allow relative URLs or same-origin
    return parsed.hostname === "localhost" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
```

---

## 5. Dependency Security

### 5.1 Audit Dependencies

```bash
# Audit known vulnerabilities
pnpm audit

# Check for unused dependencies (reduces attack surface)
pnpm dlx depcheck

# Check for outdated dependencies
pnpm outdated

# Specific security checks
pnpm dlx better-npm-audit audit
```

### 5.2 Lock File Integrity

```bash
# Ensure lock file is committed
# .gitignore should NOT include pnpm-lock.yaml

# Verify lock file on CI
cat pnpm-lock.yaml | grep -c "integrity"  # Should be > 0
```

---

## 6. Environment Variables

### 6.1 Required Pattern

```bash
# .env.local (NEVER commit this)
RESEND_API_KEY=...
UPSTASH_REDIS_REST_TOKEN=...

# .env.example (COMMIT this — template without values)
RESEND_API_KEY=
UPSTASH_REDIS_REST_TOKEN=
```

### 6.2 Validation at Runtime

```ts
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);
```

---

## 7. Action Items

- [ ] **Add security headers**: Update `next.config.js` dengan headers array
- [ ] **Implement CSP**: Create `middleware.ts` dengan nonce generation
- [ ] **Test CSP**: Use report-only mode first, check console for violations
- [ ] **Add nonce to scripts**: Update `<Script>` components atau inline scripts
- [ ] **Input validation**: Zod schema untuk semua form inputs
- [ ] **Dependency audit**: `pnpm audit`, fix critical vulnerabilities
- [ ] **Remove unused deps**: `depcheck` → hapus yang tidak dipakai
- [ ] **Environment validation**: `lib/env.ts` dengan zod schema
- [ ] **Add .env.example**: Template tanpa nilai sensitif
- [ ] **Rate limiting**: Implementasi untuk API routes (sudah ada di contact plan)
- [ ] **Security.txt**: `/public/.well-known/security.txt`

---

## 8. Security.txt

```
# public/.well-known/security.txt
Contact: mailto:security@yourdomain.com
Expires: 2027-06-01T00:00:00.000Z
Preferred-Languages: en, id
Policy: https://yourdomain.com/security-policy
```

---

## 9. Dependencies

```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

---

*Target: Security headers A+ rating, zero CSP violations, no audit vulnerabilities.*
