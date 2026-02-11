export const DEFAULT_LANGUAGE = "en";

export const LANG_COOKIE_NAME = "lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Valid locale code: 2-5 lowercase letters (e.g. en, ru, pt-BR base) */
const LOCALE_REGEX = /^[a-z]{2,5}$/;

/**
 * Check if a string is a valid locale code
 */
export function isValidLocaleCode(lang: string): boolean {
  return LOCALE_REGEX.test(lang.toLowerCase());
}

/**
 * Parse Accept-Language header and return first valid locale
 */
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

export const LANG_HEADER_NAME = "x-lang";

/**
 * Get language from request headers (set by middleware)
 * Returns raw header value; validate against content.languages on the page
 */
export function getLanguageFromHeaders(headers: Headers): string {
  const lang = headers.get(LANG_HEADER_NAME);
  return lang && isValidLocaleCode(lang) ? lang : DEFAULT_LANGUAGE;
}

/**
 * Resolve the active language from header value and available languages from content
 */
export function resolveLanguage(
  headerLang: string,
  availableLanguages: string[]
): string {
  if (availableLanguages.includes(headerLang)) return headerLang;
  return availableLanguages[0] ?? DEFAULT_LANGUAGE;
}
