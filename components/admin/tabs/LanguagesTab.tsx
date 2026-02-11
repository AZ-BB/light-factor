"use client";

import { useState } from "react";
import type { ContentData } from "@/types/content";
import { createEmptyLanguageContent } from "@/lib/content-templates";
import FormField from "../FormField";
import ConfirmDialog from "../ConfirmDialog";

interface LanguagesTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function LanguagesTab({ content, onUpdate }: LanguagesTabProps) {
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [newLangCode, setNewLangCode] = useState("");
  const [newLangAlignment, setNewLangAlignment] = useState<"ltr" | "rtl">("ltr");

  const languages = Object.keys(content.languages);

  const addLanguage = () => {
    const code = newLangCode.trim().toLowerCase();
    if (!code || content.languages[code]) return;
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [code]: createEmptyLanguageContent(code, newLangAlignment),
      },
    }));
    setNewLangCode("");
    setNewLangAlignment("ltr");
  };

  const removeLanguage = (code: string) => {
    onUpdate((prev) => {
      const next = { ...prev.languages };
      delete next[code];
      return { ...prev, languages: next };
    });
    setConfirmRemove(null);
  };

  const updateAlignment = (code: string, alignment: "ltr" | "rtl") => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [code]: { ...prev.languages[code], alignment },
      },
    }));
  };

  const cloneLanguage = (fromCode: string) => {
    const base = content.languages[fromCode];
    const newCode = prompt("New language code (e.g. fr, de):");
    if (!newCode?.trim() || content.languages[newCode.trim().toLowerCase()]) return;
    const code = newCode.trim().toLowerCase();
    const clone = JSON.parse(JSON.stringify(base)) as typeof base;
    onUpdate((prev) => ({
      ...prev,
      languages: { ...prev.languages, [code]: clone },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Languages</h2>
        <div className="flex gap-4 items-end mb-6">
          <FormField
            label="New language code"
            name="newLang"
            value={newLangCode}
            onChange={setNewLangCode}
            placeholder="e.g. fr, de, ar"
          />
          <FormField
            label="Alignment"
            name="alignment"
            type="select"
            value={newLangAlignment}
            onChange={(v) => setNewLangAlignment(v as "ltr" | "rtl")}
            options={[
              { value: "ltr", label: "LTR" },
              { value: "rtl", label: "RTL" },
            ]}
          />
          <button
            type="button"
            onClick={addLanguage}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Language
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {languages.map((code) => (
          <div
            key={code}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-md bg-gray-50"
          >
            <span className="font-medium text-gray-900">{code.toUpperCase()}</span>
            <FormField
              label="Align"
              name={`align-${code}`}
              type="select"
              value={content.languages[code]?.alignment ?? "ltr"}
              onChange={(v) => updateAlignment(code, v as "ltr" | "rtl")}
              options={[
                { value: "ltr", label: "LTR" },
                { value: "rtl", label: "RTL" },
              ]}
            />
            <button
              type="button"
              onClick={() => cloneLanguage(code)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Clone
            </button>
            <button
              type="button"
              onClick={() => setConfirmRemove(code)}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={!!confirmRemove}
        title="Remove language"
        message={`Remove language "${confirmRemove?.toUpperCase()}"? This cannot be undone.`}
        confirmLabel="Remove"
        danger
        onConfirm={() => confirmRemove && removeLanguage(confirmRemove)}
        onCancel={() => setConfirmRemove(null)}
      />
    </div>
  );
}
