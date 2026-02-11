"use client";

interface LanguageSelectorProps {
  availableLanguages: string[];
  currentLang: string;
  onChange: (lang: string) => void;
  className?: string;
}

export default function LanguageSelector({
  availableLanguages,
  currentLang,
  onChange,
  className = "",
}: LanguageSelectorProps) {
  if (availableLanguages.length === 0) return null;

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Language
      </label>
      <select
        value={currentLang}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
