# Contact Form Architecture Plan

> Serverless form handling, validation, spam prevention  
> Last updated: 2026-06-03

---

## 1. Requirements

### 1.1 Functional

| Feature | Priority |
|---------|----------|
| Name, email, message fields | P0 |
| Client-side validation | P0 |
| Server-side validation | P0 |
| Success/error feedback | P0 |
| Rate limiting (spam prevention) | P1 |
| Email notification | P1 |
| Auto-reply to sender | P2 |

### 1.2 Non-Functional

- **No database**: Form submissions handled via serverless function + external service
- **No runtime cost**: Free tier atau near-zero cost
- **GDPR compliant**: No persistent storage of personal data
- **Accessible**: Full keyboard navigation, screen reader support

---

## 2. Architecture

### 2.1 Options Matrix

| Solution | Cost | Setup | Reliability | Best For |
|----------|------|-------|-------------|----------|
| **Vercel Edge + Resend** | Free (100 emails/day) | Low | High | ✅ Recommended |
| **Vercel Edge + SendGrid** | Free (100 emails/day) | Medium | High | Alternative |
| **Formspree** | Free (50 submissions/mo) | Very Low | High | Zero maintenance |
| **Getform** | Free (100 submissions/mo) | Very Low | Medium | Zero maintenance |
| **Airtable + API** | Free (1,000 records) | Low | High | If need CRM |

### 2.2 Recommended: Vercel Edge + Resend

```
User fills form → Client validation → Submit → 
Vercel Edge Function → Server validation → Rate limit check → 
Resend API → Email to you + Auto-reply to user → 
Success response → Toast notification
```

**Why Resend:**
- Free: 100 emails/day
- React Email support (type-safe templates)
- Edge-compatible (no Node.js runtime needed)
- Great deliverability
- Simple API

---

## 3. Implementation

### 3.1 Form Component (Client)

```tsx
// app/[locale]/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "@/i18n/TranslationContext";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { t } = useTranslations();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          {t("contact.name")}
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          {t("contact.email")}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          {t("contact.subject")}
        </label>
        <select
          id="subject"
          {...register("subject")}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">{t("contact.selectSubject")}</option>
          <option value="project">{t("contact.subjectProject")}</option>
          <option value="collaboration">{t("contact.subjectCollaboration")}</option>
          <option value="other">{t("contact.subjectOther")}</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          {t("contact.message")}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        {status === "submitting" ? t("contact.sending") : t("contact.send")}
      </button>

      {/* Status messages */}
      {status === "success" && (
        <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-200" role="status">
          {t("contact.success")}
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200" role="alert">
          {t("contact.error")}
        </div>
      )}
    </form>
  );
}
```

### 3.2 API Route (Edge)

```ts
// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10).max(5000),
});

// Rate limiter: 3 requests per 10 minutes per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Send email to you
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "your-email@example.com",
      subject: `[Portfolio] ${subject}: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    });

    // Send auto-reply to user (optional)
    await resend.emails.send({
      from: "Gilang <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for reaching out!",
      text: `Hi ${name},\n\nThanks for your message. I'll get back to you soon.\n\nBest,\nGilang`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### 3.3 Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxx
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

### 3.4 React Email Template (Optional but Nice)

```tsx
// emails/ContactEmail.tsx
import { Html, Button, Tailwind, Text } from "@react-email/components";

export function ContactEmail({ name, email, subject, message }: ContactEmailProps) {
  return (
    <Html>
      <Tailwind>
        <div className="mx-auto max-w-xl p-6">
          <Text className="text-xl font-bold">New Contact Form Submission</Text>
          <Text><strong>From:</strong> {name} ({email})</Text>
          <Text><strong>Subject:</strong> {subject}</Text>
          <Text className="mt-4 whitespace-pre-wrap">{message}</Text>
          <Button
            href={`mailto:${email}`}
            className="mt-6 rounded bg-black px-4 py-2 text-white"
          >
            Reply
          </Button>
        </div>
      </Tailwind>
    </Html>
  );
}
```

---

## 4. Alternative: Zero-Maintenance (Formspree)

```tsx
// components/contact/FormspreeForm.tsx
"use client";

import { useForm, ValidationError } from "@formspree/react";

export function FormspreeForm() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");
  
  if (state.succeeded) {
    return <p>Thanks for your message!</p>;
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input id="name" name="name" required />
      <ValidationError prefix="Name" field="name" errors={state.errors} />
      
      <input id="email" name="email" type="email" required />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      
      <textarea id="message" name="message" required />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      
      <button type="submit" disabled={state.submitting}>
        Send
      </button>
    </form>
  );
}
```

**Pros:** No backend, no serverless function, spam protection included  
**Cons:** Limited customization, branding, 50 submissions/month free tier

---

## 5. Validation Strategy

| Layer | Purpose | Implementation |
|-------|---------|----------------|
| HTML5 | Basic client validation | `required`, `type="email"`, `minLength` |
| React Hook Form | Controlled inputs, error states | `useForm()` with `zodResolver` |
| Zod | Schema validation | `contactSchema` object |
| API | Server-side validation | `contactSchema.safeParse()` |
| Rate Limit | Spam prevention | `@upstash/ratelimit` |
| Honeypot | Bot detection | Hidden field (optional) |

---

## 6. Accessibility

```tsx
// Key requirements:

// 1. Label association
<label htmlFor="email">Email</label>
<input id="email" {...register("email")} />

// 2. Error announcement
<input aria-invalid={errors.email ? "true" : "false"} />
{errors.email && <p role="alert">{errors.email.message}</p>}

// 3. Focus management
// After submit error, focus first invalid field
useEffect(() => {
  if (Object.keys(errors).length > 0) {
    const firstError = document.querySelector("[aria-invalid='true']") as HTMLElement;
    firstError?.focus();
  }
}, [errors]);

// 4. Loading state
<button aria-busy={status === "submitting"} disabled={status === "submitting"}>
  {status === "submitting" ? "Sending..." : "Send"}
</button>

// 5. Success announcement
<div role="status" aria-live="polite">
  {status === "success" && "Message sent successfully!"}
</div>
```

---

## 7. Security

### 7.1 CORS

```ts
// app/api/contact/route.ts
export async function POST(request: Request) {
  // Only accept from your domain
  const origin = request.headers.get("origin");
  if (origin && !origin.includes("yourdomain.com")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  // ...
}
```

### 7.2 Input Sanitization

```ts
// Use zod for type safety + validation
// No need for manual sanitization if using Resend (they handle it)
// But for extra safety:
import DOMPurify from "isomorphic-dompurify";

const sanitizedMessage = DOMPurify.sanitize(message);
```

### 7.3 Rate Limiting

Already implemented with Upstash Redis (see 3.2). 3 submissions per 10 minutes per IP.

---

## 8. Action Items

- [ ] **Choose solution**: Vercel Edge + Resend OR Formspree
- [ ] **Create form component**: `app/[locale]/contact/ContactForm.tsx`
- [ ] **Create API route**: `app/api/contact/route.ts`
- [ ] **Setup Resend**: Sign up, get API key, verify domain
- [ ] **Setup Upstash**: Redis for rate limiting (if using custom solution)
- [ ] **Add environment variables**: `.env.local`
- [ ] **Add translations**: `contact.*` keys di `en.json` dan `id.json`
- [ ] **Test validation**: Submit empty form, invalid email, etc.
- [ ] **Test rate limit**: Submit 4x dalam 1 menit
- [ ] **Test accessibility**: Tab navigation, screen reader, error states
- [ ] **Add loading skeleton**: Saat form sedang submit
- [ ] **Add success animation**: Checkmark atau confetti (subtle)

---

## 9. Dependencies

```json
{
  "dependencies": {
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "resend": "^3.0.0",
    "@upstash/ratelimit": "^1.0.0",
    "@upstash/redis": "^1.0.0"
  },
  "optionalDependencies": {
    "@react-email/components": "^0.0.15",
    "react-email": "^2.0.0"
  }
}
```

---

*Target: Submissions deliver reliably, no spam, accessible, <500ms response time.*
