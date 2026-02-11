"use client";

import { useState } from "react";
import type { ContentData, FormField as ContactFormField } from "@/types/content";
import FormField from "../FormField";
import ArrayManager from "../ArrayManager";
import LanguageSelector from "../LanguageSelector";

interface ContactTabProps {
  content: ContentData;
  onUpdate: (updater: (prev: ContentData) => ContentData) => void;
}

export default function ContactTab({ content, onUpdate }: ContactTabProps) {
  const [currentLang, setCurrentLang] = useState(
    () => Object.keys(content.languages)[0] ?? "en"
  );

  const langContent = content.languages[currentLang];
  if (!langContent) return null;

  const { contact } = langContent.sections;

  const updateField = (field: "label" | "title", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            contact: {
              ...prev.languages[currentLang].sections.contact,
              [field]: value,
            },
          },
        },
      },
    }));
  };

  const updateFormFields = (fields: ContactFormField[]) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            contact: {
              ...prev.languages[currentLang].sections.contact,
              form: {
                ...prev.languages[currentLang].sections.contact.form,
                fields,
              },
            },
          },
        },
      },
    }));
  };

  const updateSubmit = (field: "text" | "success", value: string) => {
    onUpdate((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [currentLang]: {
          ...prev.languages[currentLang],
          sections: {
            ...prev.languages[currentLang].sections,
            contact: {
              ...prev.languages[currentLang].sections.contact,
              form: {
                ...prev.languages[currentLang].sections.contact.form,
                submit: {
                  ...prev.languages[currentLang].sections.contact.form.submit,
                  [field]: value,
                },
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
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact</h2>
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
            value={contact.label}
            onChange={(v) => updateField("label", v)}
          />
          <FormField
            label="Title"
            name="title"
            value={contact.title}
            onChange={(v) => updateField("title", v)}
          />
          <ArrayManager
            items={contact.form.fields}
            onChange={updateFormFields}
            createEmpty={() => ({
              name: "",
              label: "",
              type: "text",
              placeholder: "",
            })}
            addLabel="Add field"
            itemLabel="Form field"
            renderItem={(field, index) => (
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Name"
                  name={`ff-name-${index}`}
                  value={field.name}
                  onChange={(v) => {
                    const next = [...contact.form.fields];
                    next[index] = { ...next[index], name: v };
                    updateFormFields(next);
                  }}
                />
                <FormField
                  label="Label"
                  name={`ff-label-${index}`}
                  value={field.label}
                  onChange={(v) => {
                    const next = [...contact.form.fields];
                    next[index] = { ...next[index], label: v };
                    updateFormFields(next);
                  }}
                />
                <FormField
                  label="Type"
                  name={`ff-type-${index}`}
                  value={field.type}
                  onChange={(v) => {
                    const next = [...contact.form.fields];
                    next[index] = { ...next[index], type: v };
                    updateFormFields(next);
                  }}
                />
                <FormField
                  label="Placeholder"
                  name={`ff-placeholder-${index}`}
                  value={field.placeholder}
                  onChange={(v) => {
                    const next = [...contact.form.fields];
                    next[index] = { ...next[index], placeholder: v };
                    updateFormFields(next);
                  }}
                />
              </div>
            )}
          />
          <FormField
            label="Submit button text"
            name="submitText"
            value={contact.form.submit.text}
            onChange={(v) => updateSubmit("text", v)}
          />
          <FormField
            label="Success message"
            name="successMsg"
            value={contact.form.submit.success}
            onChange={(v) => updateSubmit("success", v)}
          />
        </div>
      </div>
    </div>
  );
}
