"use client";

import { useState } from "react";
import type { ContentData, ValueItem } from "@/types/content";
import FormField from "../FormField";
import ArrayManager from "../ArrayManager";
import LanguageSelector from "../LanguageSelector";

interface ValuesTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function ValuesTab({ content, onUpdate }: ValuesTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { values } = langContent.sections;

  const updateField = (field: "label" | "title", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            values: {
              ...prev.languages[currentLang].sections.values,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const updateItems = (items: ValueItem[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            values: {
              ...prev.languages[currentLang].sections.values,
              items,
            },
          },
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Values</h2>
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
            value={values.label}
            onChange={(v) => updateField("label", v)}
          />
          <FormField
            label="Title"
            name="title"
            value={values.title}
            onChange={(v) => updateField("title", v)}
          />
          <ArrayManager
            items={values.items}
            onChange={updateItems}
            createEmpty={() => ({ title: "", description: "" })}
            addLabel="Add value"
            itemLabel="Value"
            renderItem={(item, index) => (
              <div className="space-y-3">
                <FormField
                  label="Title"
                  name={`val-title-${index}`}
                  value={item.title}
                  onChange={(v) => {
                    const next = [...values.items];
                    next[index] = { ...next[index], title: v };
                    updateItems(next);
                  }}
                />
                <FormField
                  label="Description"
                  name={`val-desc-${index}`}
                  type="textarea"
                  value={item.description}
                  onChange={(v) => {
                    const next = [...values.items];
                    next[index] = { ...next[index], description: v };
                    updateItems(next);
                  }}
                  rows={2}
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
