import type { Metadata } from "next";
import { headers } from "next/headers";
import { Syne, Outfit, Cairo } from "next/font/google";
import "./globals.css";
import { getLanguageFromHeaders, resolveLanguage } from "@/lib/i18n";
import { getContent } from "@/lib/content";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Light Faktor | Architectural Lighting",
    template: "%s | Light Faktor",
  },
  description:
    "Inspired by History. Powered by Light. Architectural lighting for Egypt's future.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const headerLang = getLanguageFromHeaders(headersList);
  const content = await getContent();
  const availableLanguages = Object.keys(content.languages);
  const lang = resolveLanguage(headerLang, availableLanguages);
  const langContent = content.languages[lang];
  const dir = langContent?.alignment ?? "ltr";

  const isArabic = lang === "ar";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${syne.variable} ${outfit.variable} ${cairo.variable} scroll-smooth`}
      data-lang={lang}
    >
      <body className={`${isArabic ? "font-arabic" : "font-sans"} antialiased`}>{children}</body>
    </html>
  );
}
