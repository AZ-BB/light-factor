"use client";

import { useState } from "react";
import type { ContentData } from "@/types/content";
import FormField from "../FormField";
import ImageUploader from "../ImageUploader";
import ArrayManager from "../ArrayManager";
import LanguageSelector from "../LanguageSelector";

interface AboutTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function AboutTab({ content, onUpdate }: AboutTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { about } = langContent.sections;

  const updateField = (field: keyof typeof about, value: string | string[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            about: {
              ...prev.languages[currentLang].sections.about,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const updateParagraphs = (paragraphs: string[]) => {
    updateField("paragraphs", paragraphs);
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
            about: {
              ...prev.languages[currentLang].sections.about,
              image: {
                ...prev.languages[currentLang].sections.about.image,
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
        <LanguageSelector
          availableLanguages={Object.keys(content.languages)}
          currentLang={currentLang}
          onChange={setCurrentLang}
          className="mb-6"
        />
        <div className="space-y-4 max-w-xl">
          <FormField
            label="Label"
            name="label"
            value={about.label}
            onChange={(v) => updateField("label", v)}
          />
          <FormField
            label="Title"
            name="title"
            value={about.title}
            onChange={(v) => updateField("title", v)}
          />
          <ArrayManager
            items={about.paragraphs}
            onChange={updateParagraphs}
            createEmpty={() => ""}
            addLabel="Add paragraph"
            itemLabel="Paragraph"
            renderItem={(para, index) => (
              <FormField
                label=""
                name={`para-${index}`}
                type="textarea"
                value={para}
                onChange={(v) => {
                  const next = [...about.paragraphs];
                  next[index] = v;
                  updateParagraphs(next);
                }}
                rows={3}
              />
            )}
          />
          <ImageUploader
            label="About image"
            value={about.image.url}
            onChange={(v) => updateImage("url", v)}
            alt={about.image.alt}
          />
          <FormField
            label="Image alt"
            name="imageAlt"
            value={about.image.alt}
            onChange={(v) => updateImage("alt", v)}
          />
        </div>
      </div>
    </div>
  );
}
