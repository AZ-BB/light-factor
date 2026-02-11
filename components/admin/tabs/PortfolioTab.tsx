"use client";

import { useState } from "react";
import type { ContentData, PortfolioProject } from "@/types/content";
import FormField from "../FormField";
import ArrayManager from "../ArrayManager";
import ImageUploader from "../ImageUploader";
import LanguageSelector from "../LanguageSelector";

interface PortfolioTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function PortfolioTab({ content, onUpdate }: PortfolioTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { portfolio } = langContent.sections;

  const updateField = (field: "label" | "title", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            portfolio: {
              ...prev.languages[currentLang].sections.portfolio,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const updateProjects = (projects: PortfolioProject[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            portfolio: {
              ...prev.languages[currentLang].sections.portfolio,
              projects,
            },
          },
        },
      },
    }));
  };

  const updateProject = (index: number, field: keyof PortfolioProject, value: string | string[]) => {
    const next = [...portfolio.projects];
    next[index] = { ...next[index], [field]: value };
    updateProjects(next);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h2>
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
            value={portfolio.label}
            onChange={(v) => updateField("label", v)}
          />
          <FormField
            label="Title"
            name="title"
            value={portfolio.title}
            onChange={(v) => updateField("title", v)}
          />
          <ArrayManager
            items={portfolio.projects}
            onChange={updateProjects}
            createEmpty={() => ({ title: "", category: "", images: [] })}
            addLabel="Add project"
            itemLabel="Project"
            renderItem={(project, index) => (
              <div className="space-y-4">
                <FormField
                  label="Title"
                  name={`proj-title-${index}`}
                  value={project.title}
                  onChange={(v) => updateProject(index, "title", v)}
                />
                <FormField
                  label="Category"
                  name={`proj-category-${index}`}
                  value={project.category}
                  onChange={(v) => updateProject(index, "category", v)}
                />
                <ArrayManager
                  items={project.images}
                  onChange={(imgs) => updateProject(index, "images", imgs)}
                  createEmpty={() => ""}
                  addLabel="Add image"
                  itemLabel="Image"
                  renderItem={(img, imgIndex) => (
                    <div className="flex gap-4">
                      <ImageUploader
                        label=""
                        value={img}
                        onChange={(v) => {
                          const next = [...project.images];
                          next[imgIndex] = v;
                          updateProject(index, "images", next);
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
