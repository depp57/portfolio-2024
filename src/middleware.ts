import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/dictionary-i18n";

function isSupportedLocale(str: string): str is (typeof i18n.locales)[number] {
  return i18n.locales.includes(str as (typeof i18n.locales)[number]);
}

function toTwoLettersLocale(locale: string) {
  if (locale.charAt(2) === "-") {
    return locale.substring(0, 2);
  }

  return locale;
}

function getLocale(request: NextRequest) {
  let requestedLocale = request.headers.get("accept-language");

  if (requestedLocale) {
    requestedLocale = toTwoLettersLocale(requestedLocale);

    if (isSupportedLocale(requestedLocale)) {
      return requestedLocale;
    }
  }

  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  // e.g. incoming request is /products. The new URL is now /en/products
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/ (internal files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next|favicon.ico).*)",
  ],
};
