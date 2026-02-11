"use client";

import { useState } from "react";
import type { ContentData, ServiceItem } from "@/types/content";
import FormField from "../FormField";
import ArrayManager from "../ArrayManager";
import LanguageSelector from "../LanguageSelector";

interface ServicesTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function ServicesTab({ content, onUpdate }: ServicesTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { services } = langContent.sections;

  const updateField = (field: "label" | "title", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            services: {
              ...prev.languages[currentLang].sections.services,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const updateItems = (items: ServiceItem[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            services: {
              ...prev.languages[currentLang].sections.services,
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Services</h2>
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
            value={services.label}
            onChange={(v) => updateField("label", v)}
          />
          <FormField
            label="Title"
            name="title"
            value={services.title}
            onChange={(v) => updateField("title", v)}
          />
          <ArrayManager
            items={services.items}
            onChange={updateItems}
            createEmpty={() => ({ icon: "", title: "", description: "" })}
            addLabel="Add service"
            itemLabel="Service"
            renderItem={(item, index) => (
              <div className="space-y-3">
                <FormField
                  label="Icon"
                  name={`icon-${index}`}
                  value={item.icon}
                  onChange={(v) => {
                    const next = [...services.items];
                    next[index] = { ...next[index], icon: v };
                    updateItems(next);
                  }}
                  placeholder="◇"
                />
                <FormField
                  label="Title"
                  name={`title-${index}`}
                  value={item.title}
                  onChange={(v) => {
                    const next = [...services.items];
                    next[index] = { ...next[index], title: v };
                    updateItems(next);
                  }}
                />
                <FormField
                  label="Description"
                  name={`desc-${index}`}
                  type="textarea"
                  value={item.description}
                  onChange={(v) => {
                    const next = [...services.items];
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
