"use client";

import { useState } from "react";
import type { ContentData } from "@/types/content";
import LanguagesTab from "@/components/admin/tabs/LanguagesTab";
import MetadataTab from "@/components/admin/tabs/MetadataTab";
import NavigationTab from "@/components/admin/tabs/NavigationTab";
import HeroTab from "@/components/admin/tabs/HeroTab";
import AboutTab from "@/components/admin/tabs/AboutTab";
import ServicesTab from "@/components/admin/tabs/ServicesTab";
import PortfolioTab from "@/components/admin/tabs/PortfolioTab";
import ProcessTab from "@/components/admin/tabs/ProcessTab";
import ValuesTab from "@/components/admin/tabs/ValuesTab";
import ContactTab from "@/components/admin/tabs/ContactTab";
import FooterTab from "@/components/admin/tabs/FooterTab";

const TABS = [
  { id: "languages", label: "Languages" },
  { id: "metadata", label: "Metadata" },
  { id: "navigation", label: "Navigation" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "values", label: "Values" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface CMSEditorProps {
  initialContent: ContentData;
  resetAction: () => Promise<ContentData>;
  saveAction: (content: ContentData) => Promise<ContentData>;
}

export default function CMSEditor({
  initialContent,
  resetAction,
  saveAction,
}: CMSEditorProps) {
  const [content, setContent] = useState<ContentData>(initialContent);
  const [activeTab, setActiveTab] = useState<TabId>("languages");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const updateContent = (updater: (prev: ContentData) => ContentData) => {
    setContent((prev) => updater(prev));
  };

  const availableLanguages = Object.keys(content.languages);

  const handleReset = async () => {
    setStatus("loading");
    setMessage("");
    try {
      const resetContent = await resetAction();
      setContent(resetContent);
      setStatus("success");
      setMessage("Content reset to JSON fallback successfully.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Reset failed.");
    }
  };

  const handleSave = async () => {
    setStatus("loading");
    setMessage("");
    try {
      await saveAction(content);
      setStatus("success");
      setMessage("Content saved to KV store successfully.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Save failed.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleReset}
            disabled={status === "loading"}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset to JSON Fallback
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={status === "loading"}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Saving..." : "Save to KV Store"}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-md ${
            status === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : status === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : ""
          }`}
        >
          {message}
        </div>
      )}

      <div className="border-b border-gray-200">
        <nav className="flex gap-4 overflow-x-auto pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-medium rounded-t whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600 -mb-0.5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === "languages" && (
          <LanguagesTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "metadata" && (
          <MetadataTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "navigation" && (
          <NavigationTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "hero" && (
          <HeroTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "about" && (
          <AboutTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "services" && (
          <ServicesTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "portfolio" && (
          <PortfolioTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "process" && (
          <ProcessTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "values" && (
          <ValuesTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "contact" && (
          <ContactTab content={content} onUpdate={updateContent} />
        )}
        {activeTab === "footer" && (
          <FooterTab content={content} onUpdate={updateContent} />
        )}
      </div>
    </div>
  );
}
