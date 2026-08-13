import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { getLocale } from "@/i18n/server";

/**
 * Mendapatkan pathname request saat ini secara Server-Side tanpa props.
 * Di-cache menggunakan React.cache() agar hanya dieksekusi 1 kali per HTTP request.
 */
export const getPathname = cache(async (): Promise<string> => {
  const headersList = await headers();
  const locale = getLocale();
  return headersList.get("x-pathname") || `/${locale}`;
});
