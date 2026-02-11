"use client";

import { useState } from "react";
import type { ContentData, Branch, BranchItem } from "@/types/content";
import FormField from "../FormField";
import ArrayManager from "../ArrayManager";
import LanguageSelector from "../LanguageSelector";

interface FooterTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function FooterTab({ content, onUpdate }: FooterTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { footer } = langContent;

  const updateField = (field: "title" | "closing", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          footer: {
            ...prev.languages[currentLang].footer,
            [field]: value,
          },
        },
      },
    }));
  };

  const updateBranches = (branches: Branch[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          footer: {
            ...prev.languages[currentLang].footer,
            branches,
          },
        },
      },
    }));
  };

  const updateBranch = (branchIndex: number, field: "name" | "items", value: string | BranchItem[]) => {
    const next = [...footer.branches];
    next[branchIndex] = { ...next[branchIndex], [field]: value };
    updateBranches(next);
  };

  const updateEmails = (emails: string[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          footer: {
            ...prev.languages[currentLang].footer,
            emails,
          },
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Footer</h2>
        <LanguageSelector
          availableLanguages={Object.keys(content.languages)}
          currentLang={currentLang}
          onChange={setCurrentLang}
          className="mb-6"
        />
        <div className="space-y-4 max-w-xl">
          <FormField
            label="Title"
            name="title"
            value={footer.title}
            onChange={(v) => updateField("title", v)}
          />
          <FormField
            label="Closing"
            name="closing"
            value={footer.closing}
            onChange={(v) => updateField("closing", v)}
          />
          <ArrayManager
            items={footer.branches}
            onChange={updateBranches}
            createEmpty={() => ({ name: "", items: [] })}
            addLabel="Add branch"
            itemLabel="Branch"
            renderItem={(branch, index) => (
              <div className="space-y-4">
                <FormField
                  label="Branch name"
                  name={`branch-name-${index}`}
                  value={branch.name}
                  onChange={(v) => updateBranch(index, "name", v)}
                />
                <ArrayManager
                  items={branch.items}
                  onChange={(items) => updateBranch(index, "items", items)}
                  createEmpty={() => ({ icon: "", text: "" })}
                  addLabel="Add item"
                  itemLabel="Item"
                  renderItem={(item, itemIndex) => (
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        label="Icon"
                        name={`bi-icon-${index}-${itemIndex}`}
                        value={item.icon}
                        onChange={(v) => {
                          const next = [...branch.items];
                          next[itemIndex] = { ...next[itemIndex], icon: v };
                          updateBranch(index, "items", next);
                        }}
                      />
                      <FormField
                        label="Text"
                        name={`bi-text-${index}-${itemIndex}`}
                        value={item.text}
                        onChange={(v) => {
                          const next = [...branch.items];
                          next[itemIndex] = { ...next[itemIndex], text: v };
                          updateBranch(index, "items", next);
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            )}
          />
          <ArrayManager
            items={footer.emails}
            onChange={updateEmails}
            createEmpty={() => ""}
            addLabel="Add email"
            itemLabel="Email"
            renderItem={(email, index) => (
              <FormField
                label=""
                name={`email-${index}`}
                value={email}
                onChange={(v) => {
                  const next = [...footer.emails];
                  next[index] = v;
                  updateEmails(next);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}