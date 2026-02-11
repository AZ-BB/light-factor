import { NextRequest, NextResponse } from "next/server";
import {
  LANG_COOKIE_NAME,
  LANG_COOKIE_MAX_AGE,
  isValidLocaleCode,
  DEFAULT_LANGUAGE,
} from "@/lib/i18n";

function parseAcceptLanguage(acceptLanguage: string | null): string | null {
  if (!acceptLanguage) return null;
  const parts = acceptLanguage.split(",").map((p) => {
    const [code, q = "1"] = p.trim().split(";q=");
    return { code: code.split("-")[0].toLowerCase(), q: parseFloat(q) };
  });
  parts.sort((a, b) => b.q - a.q);
  for (const { code } of parts) {
    if (isValidLocaleCode(code)) return code;
  }
  return null;
}

export function middleware(request: NextRequest) {
  // 1. URL param
  const langParam = request.nextUrl.searchParams.get("lang");
  // 2. Cookie
  const cookieLang = request.cookies.get(LANG_COOKIE_NAME)?.value;
  // 3. Accept-Language header
  const headerLang = parseAcceptLanguage(
    request.headers.get("accept-language")
  );

  const lang =
    (langParam && isValidLocaleCode(langParam) ? langParam : null) ??
    (cookieLang && isValidLocaleCode(cookieLang) ? cookieLang : null) ??
    (headerLang && isValidLocaleCode(headerLang) ? headerLang : null) ??
    DEFAULT_LANGUAGE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-lang", lang);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (langParam && isValidLocaleCode(langParam)) {
    response.cookies.set(LANG_COOKIE_NAME, langParam, {
      path: "/",
      maxAge: LANG_COOKIE_MAX_AGE,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
