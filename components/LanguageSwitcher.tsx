"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  currentLang: string;
  availableLanguages: string[];
  className?: string;
  /** Compact style for inline nav (smaller text) */
  variant?: "default" | "compact";
}

export default function LanguageSwitcher({
  currentLang,
  availableLanguages,
  className = "",
  variant = "default",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (lang: string) => {
    setOpen(false);
    const url = new URL(pathname, window.location.origin);
    url.searchParams.set("lang", lang);
    window.location.href = url.pathname + url.search;
  };

  if (availableLanguages.length <= 1) return null;

  const isCompact = variant === "compact";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 text-soft-white/70 hover:text-accent transition-colors tracking-wide ${
          isCompact ? "text-sm" : "text-base"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span>{currentLang.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 mt-2 py-2 min-w-[80px] bg-background border border-white/10 rounded-md shadow-lg z-50"
        >
          {availableLanguages.map((lang) => (
            <li key={lang} role="option">
              <button
                type="button"
                onClick={() => switchLanguage(lang)}
                className={`block w-full text-left px-4 py-2 text-soft-white hover:bg-white/5 hover:text-accent transition-colors ${
                  lang === currentLang ? "text-accent font-medium" : ""
                } ${isCompact ? "text-sm" : "text-base"}`}
              >
                {lang.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
