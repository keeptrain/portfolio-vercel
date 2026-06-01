import { NextRequest, NextResponse } from "next/server";
import { locales } from "@/i18n/locales";
import { getLocaleFromHeader } from "@/i18n/locale-detection";

const localeRegex = new RegExp(`^/(${locales.join("|")})(/|$)`);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if locale is already in pathname
  const match = pathname.match(localeRegex);
  if (match) {
    return NextResponse.next();
  }

  // Detect locale and redirect
  const locale = getLocaleFromHeader(request.headers.get("accept-language"));
  const newUrl = new URL(`/${locale}${pathname}`, request.url);

  // Preserve search params
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static, assets)
    "/((?!_next|api|static|.*\\..*).*)",
  ],
};
