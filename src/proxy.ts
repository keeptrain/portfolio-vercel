import { NextRequest, NextResponse } from "next/server";
import { Locale, locales } from "@/i18n/locales";
import { getLocaleFromHeader } from "@/i18n/locale-detection";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Set header x-pathname agar Server Components dapat membaca pathname saat ini via headers()
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  // Check if pathname already has a supported locale
  const firstSegment = pathname.split("/")[1];
  if (locales.includes(firstSegment as Locale)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Detect locale from header (fallback to defaultLocale/en)
  const targetLocale = getLocaleFromHeader(
    request.headers.get("accept-language"),
  );

  // If the first segment is an unknown 2-character language code
  // (e.g. /fr, /de), remove it
  const isUnknownLocale = firstSegment && firstSegment.length === 2;
  const cleanPath = isUnknownLocale
    ? pathname.slice(firstSegment.length + 1)
    : pathname;

  request.nextUrl.pathname = `/${targetLocale}${cleanPath}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static, assets)
    "/((?!_next|api|static|.*\\..*).*)",
  ],
};
