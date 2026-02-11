"use client";

import { useState } from "react";
import type { ContentData, ProcessStep } from "@/types/content";
import FormField from "../FormField";
import ArrayManager from "../ArrayManager";
import LanguageSelector from "../LanguageSelector";

interface ProcessTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function ProcessTab({ content, onUpdate }: ProcessTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { process } = langContent.sections;

  const updateField = (field: "label" | "title", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            process: {
              ...prev.languages[currentLang].sections.process,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const updateSteps = (steps: ProcessStep[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            process: {
              ...prev.languages[currentLang].sections.process,
              steps,
            },
          },
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Process</h2>
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
            value={process.label}
            onChange={(v) => updateField("label", v)}
          />
          <FormField
            label="Title"
            name="title"
            value={process.title}
            onChange={(v) => updateField("title", v)}
          />
          <ArrayManager
            items={process.steps}
            onChange={updateSteps}
            createEmpty={() => ({ number: "", title: "", description: "" })}
            addLabel="Add step"
            itemLabel="Step"
            renderItem={(step, index) => (
              <div className="space-y-3">
                <FormField
                  label="Number"
                  name={`step-num-${index}`}
                  value={step.number}
                  onChange={(v) => {
                    const next = [...process.steps];
                    next[index] = { ...next[index], number: v };
                    updateSteps(next);
                  }}
                  placeholder="01"
                />
                <FormField
                  label="Title"
                  name={`step-title-${index}`}
                  value={step.title}
                  onChange={(v) => {
                    const next = [...process.steps];
                    next[index] = { ...next[index], title: v };
                    updateSteps(next);
                  }}
                />
                <FormField
                  label="Description"
                  name={`step-desc-${index}`}
                  type="textarea"
                  value={step.description}
                  onChange={(v) => {
                    const next = [...process.steps];
                    next[index] = { ...next[index], description: v };
                    updateSteps(next);
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
