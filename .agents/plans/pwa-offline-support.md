# PWA & Offline Support Plan

> Progressive Web App, offline caching, installable experience  
> Last updated: 2026-06-03

---

## 1. Goals

| Feature | Priority | Benefit |
|---------|----------|---------|
| Installable (Add to Home Screen) | P1 | Return visits easier |
| Offline page access | P1 | Works without network |
| Service Worker caching | P1 | Instant repeat visits |
| Push notifications | P3 | Re-engagement |
| Background sync | P3 | Form submission offline |

---

## 2. Architecture

### 2.1 Next.js PWA with Serwist

**Why Serwist (not next-pwa):**
- Modern replacement for Workbox
- Next.js App Router support
- TypeScript native
- Smaller bundle
- Better tree-shaking

```
User visits site → Service Worker installs → 
Precache static assets (JS, CSS, HTML) → 
Subsequent visits served from cache → 
Background fetch update → Notify user of update
```

---

## 3. Implementation

### 3.1 Install Serwist

```bash
pnpm add @serwist/next
```

### 3.2 Create Service Worker Entry

```ts
// app/sw.ts
import { defaultCache } from "@serwist/next/worker";
import type { SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Add custom config if needed
  }
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      // Cache images with stale-while-revalidate
      matcher: ({ request }) => request.destination === "image",
      handler: new StaleWhileRevalidate({
        cacheName: "images",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          }),
        ],
      }),
    },
    {
      // Cache Google Fonts
      matcher: ({ url }) => url.origin === "https://fonts.googleapis.com",
      handler: new CacheFirst({
        cacheName: "google-fonts-stylesheets",
      }),
    },
    {
      // Cache font files
      matcher: ({ url }) => url.origin === "https://fonts.gstatic.com",
      handler: new CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 30,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          }),
        ],
      }),
    },
  ],
});

serwist.addEventListeners();
```

### 3.3 Next.js Config

```ts
// next.config.js
const withSerwist = require("@serwist/next").default({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development", // Disable in dev
});

const nextConfig = {
  // ... existing config
};

module.exports = withSerwist(nextConfig);
```

### 3.4 Web App Manifest

```json
// public/manifest.json
{
  "name": "Gilang — Software Engineer Portfolio",
  "short_name": "Gilang",
  "description": "Portfolio of Gilang, a Software Engineer based in Jakarta",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait",
  "scope": "/",
  "lang": "en",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["portfolio", "developer"],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

### 3.5 Link Manifest in Layout

```tsx
// app/layout.tsx
export const metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Gilang Portfolio",
  },
  icons: {
    apple: [{ url: "/icons/icon-192x192.png" }],
  },
};
```

---

## 4. Offline Experience

### 4.1 Offline Page

```tsx
// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <div className="text-6xl">📡</div>
      <h1 className="text-2xl font-bold">You are offline</h1>
      <p className="text-center text-gray-500">
        Some content is available offline. Check your connection to see everything.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-full bg-black px-6 py-2 text-white dark:bg-white dark:text-black"
      >
        Try Again
      </button>
    </div>
  );
}
```

### 4.2 Network Status Hook

```tsx
// hooks/useNetworkStatus.ts
import { useState, useEffect } from "react";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  
  return isOnline;
}

// Usage
function SomeComponent() {
  const isOnline = useNetworkStatus();
  
  return (
    <div>
      {!isOnline && (
        <div className="bg-yellow-50 p-2 text-center text-sm text-yellow-800">
          You are offline. Some features may not be available.
        </div>
      )}
    </div>
  );
}
```

---

## 5. Update Flow

### 5.1 Detect Service Worker Update

```tsx
// hooks/useServiceWorker.ts
import { useState, useEffect } from "react";

export function useServiceWorker() {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [updateServiceWorker, setUpdateServiceWorker] = useState<() => void>(() => {});
  
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          
          newWorker?.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              setNeedsUpdate(true);
              setUpdateServiceWorker(() => () => {
                newWorker.postMessage({ type: "SKIP_WAITING" });
                window.location.reload();
              });
            }
          });
        });
      });
    }
  }, []);
  
  return { needsUpdate, updateServiceWorker };
}
```

### 5.2 Update Notification UI

```tsx
// components/ui/UpdateNotification.tsx
"use client";

import { useServiceWorker } from "@/hooks/useServiceWorker";

export function UpdateNotification() {
  const { needsUpdate, updateServiceWorker } = useServiceWorker();
  
  if (!needsUpdate) return null;
  
  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full bg-black px-6 py-3 text-white shadow-lg dark:bg-white dark:text-black">
      <span className="text-sm">New version available</span>
      <button
        onClick={updateServiceWorker}
        className="rounded-full bg-white px-4 py-1 text-sm font-medium text-black dark:bg-black dark:text-white"
      >
        Update
      </button>
    </div>
  );
}
```

---

## 6. Icon Generation

### 6.1 Generate Icons dari SVG

```bash
# Install tool
npm install -g pwa-asset-generator

# Generate all sizes
pwa-asset-generator public/logo.svg public/icons \
  --padding "calc(50vh - 40%)" \
  --background "#ffffff" \
  --scrape false \
  --single-quotes \
  --xhtml

# Output:
# public/icons/icon-72x72.png
# public/icons/icon-96x96.png
# ... up to 512x512
```

### 6.2 Favicon Generator

```bash
# Using realfavicongenerator.net atau:
# npx pwa-favicon
```

---

## 7. Testing PWA

### 7.1 Chrome DevTools

1. Open DevTools → Lighthouse
2. Check "Progressive Web App"
3. Run audit → Target: 100

### 7.2 Manual Testing

```bash
# 1. Check manifest is valid
# DevTools → Application → Manifest

# 2. Check Service Worker is registered
# DevTools → Application → Service Workers

# 3. Test offline
# DevTools → Network → Throttle → Offline
# Reload page → Should show cached content

# 4. Test install prompt
# DevTools → Application → Manifest → "Add to homescreen" button

# 5. Check icons
# DevTools → Application → Manifest → Icons
```

### 7.3 Real Device Testing

- iOS Safari (Add to Home Screen)
- Android Chrome (Install prompt)
- Check splash screen
- Check standalone display

---

## 8. Action Items

- [ ] **Install Serwist**: `pnpm add @serwist/next`
- [ ] **Create service worker**: `app/sw.ts`
- [ ] **Update next.config.js**: Integrate `withSerwist`
- [ ] **Create manifest**: `public/manifest.json`
- [ ] **Generate icons**: 72x72 sampai 512x512, maskable
- [ ] **Add manifest link**: Di `app/layout.tsx` metadata
- [ ] **Create offline page**: `app/offline/page.tsx`
- [ ] **Create update notification**: `UpdateNotification.tsx`
- [ ] **Add network status hook**: `useNetworkStatus.ts`
- [ ] **Test in DevTools**: Lighthouse PWA audit
- [ ] **Test on real devices**: iOS Safari, Android Chrome
- [ ] **Verify caching**: Check cache storage in DevTools

---

## 9. Dependencies

```json
{
  "dependencies": {
    "@serwist/next": "^9.0.0"
  },
  "devDependencies": {
    "pwa-asset-generator": "^6.0.0"
  }
}
```

---

*Target: Lighthouse PWA 100, installable on all platforms, offline page access.*
