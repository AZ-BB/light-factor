"use client";

import { useState } from "react";
import type { ContentData, NavLink } from "@/types/content";
import FormField from "../FormField";
import ImageUploader from "../ImageUploader";
import ArrayManager from "../ArrayManager";
import LanguageSelector from "../LanguageSelector";

interface NavigationTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function NavigationTab({ content, onUpdate }: NavigationTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { navigation } = langContent;

  const updateLogo = (field: "image" | "alt", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          navigation: {
            ...prev.languages[currentLang].navigation,
            logo: {
              ...prev.languages[currentLang].navigation.logo,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const updateLinks = (links: NavLink[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          navigation: {
            ...prev.languages[currentLang].navigation,
            links,
          },
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
        <LanguageSelector
          availableLanguages={Object.keys(content.languages)}
          currentLang={currentLang}
          onChange={setCurrentLang}
          className="mb-6"
        />
        <div className="space-y-6">
          <ImageUploader
            label="Logo"
            value={navigation.logo.image}
            onChange={(v) => updateLogo("image", v)}
            alt={navigation.logo.alt}
          />
          <FormField
            label="Logo alt text"
            name="logoAlt"
            value={navigation.logo.alt}
            onChange={(v) => updateLogo("alt", v)}
          />
          <ArrayManager
            items={navigation.links}
            onChange={updateLinks}
            createEmpty={() => ({ href: "", label: "" })}
            addLabel="Add link"
            itemLabel="Link"
            renderItem={(item, index) => (
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Href"
                  name={`link-href-${index}`}
                  value={item.href}
                  onChange={(v) => {
                    const next = [...navigation.links];
                    next[index] = { ...next[index], href: v };
                    updateLinks(next);
                  }}
                  placeholder="#section"
                />
                <FormField
                  label="Label"
                  name={`link-label-${index}`}
                  value={item.label}
                  onChange={(v) => {
                    const next = [...navigation.links];
                    next[index] = { ...next[index], label: v };
                    updateLinks(next);
                  }}
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
