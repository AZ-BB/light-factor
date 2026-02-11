"use client";

import { useState } from "react";
import type { ContentData } from "@/types/content";
import FormField from "../FormField";
import LanguageSelector from "../LanguageSelector";

interface MetadataTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function MetadataTab({ content, onUpdate }: MetadataTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { metadata } = langContent;

  const update = (field: "title" | "description", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          metadata: {
            ...prev.languages[currentLang].metadata,
            [field]: value,
          },
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
        <LanguageSelector
          availableLanguages={Object.keys(content.languages)}
          currentLang={currentLang}
          onChange={setCurrentLang}
          className="mb-6"
        />
        <div className="space-y-4 max-w-xl">
          <FormField
            label="Page title"
            name="title"
            value={metadata.title}
            onChange={(v) => update("title", v)}
          />
          <FormField
            label="Meta description"
            name="description"
            type="textarea"
            value={metadata.description}
            onChange={(v) => update("description", v)}
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
