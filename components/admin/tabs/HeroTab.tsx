"use client";

import { useState } from "react";
import type { ContentData } from "@/types/content";
import FormField from "../FormField";
import ImageUploader from "../ImageUploader";
import LanguageSelector from "../LanguageSelector";

interface HeroTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function HeroTab({ content, onUpdate }: HeroTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { hero } = langContent.sections;

  const updateField = (field: keyof typeof hero, value: string) => {
    if (field === "cta") return;
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            hero: {
              ...prev.languages[currentLang].sections.hero,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const updateCta = (field: "text" | "href", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            hero: {
              ...prev.languages[currentLang].sections.hero,
              cta: {
                ...prev.languages[currentLang].sections.hero.cta,
                [field]: value,
              },
            },
          },
        },
      },
    }));
  };

  const updateImage = (field: "url" | "alt", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            hero: {
              ...prev.languages[currentLang].sections.hero,
              image: {
                ...prev.languages[currentLang].sections.hero.image,
                [field]: value,
              },
            },
          },
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero</h2>
        <LanguageSelector
          availableLanguages={Object.keys(content.languages)}
          currentLang={currentLang}
          onChange={setCurrentLang}
          className="mb-6"
        />
        <div className="space-y-4 max-w-xl">
          <FormField
            label="Brand"
            name="brand"
            value={hero.brand}
            onChange={(v) => updateField("brand", v)}
          />
          <FormField
            label="Title"
            name="title"
            value={hero.title}
            onChange={(v) => updateField("title", v)}
          />
          <FormField
            label="Title highlight"
            name="titleHighlight"
            value={hero.titleHighlight ?? ""}
            onChange={(v) => updateField("titleHighlight", v)}
          />
          <FormField
            label="Subtitle"
            name="subtitle"
            type="textarea"
            value={hero.subtitle}
            onChange={(v) => updateField("subtitle", v)}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="CTA text"
              name="ctaText"
              value={hero.cta.text}
              onChange={(v) => updateCta("text", v)}
            />
            <FormField
              label="CTA href"
              name="ctaHref"
              value={hero.cta.href}
              onChange={(v) => updateCta("href", v)}
            />
          </div>
          <ImageUploader
            label="Hero image"
            value={hero.image.url}
            onChange={(v) => updateImage("url", v)}
            alt={hero.image.alt}
          />
          <FormField
            label="Image alt"
            name="imageAlt"
            value={hero.image.alt}
            onChange={(v) => updateImage("alt", v)}
          />
        </div>
      </div>
    </div>
  );
}
