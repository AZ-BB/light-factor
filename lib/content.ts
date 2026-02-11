"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { getKVValue, saveKVValue } from "./kv-store";
import type { ContentData, LanguageContent } from "@/types/content";
import { CONTENT_KEY } from "./constants";

const CACHE_REVALIDATE = 3600; // 1 hour

/**
 * Load fallback content from the static JSON file
 */
async function loadFallbackContent(): Promise<ContentData> {
  const { default: content } = await import("@/content.json");
  return content as ContentData;
}

/**
 * Internal fetch logic (uncached)
 */
async function fetchContent(): Promise<ContentData> {
  console.log("[KV] fetchContent called (check terminal, not browser console)");
  try {
    const kvContent = await getKVValue<ContentData>(CONTENT_KEY);
    if (kvContent && kvContent.languages) {
      return kvContent;
    }
    if (kvContent === null) {
      console.warn("[KV] No content found (404 or empty). Using JSON fallback.");
    } else {
      console.warn("[KV] Invalid content shape (missing languages). Using JSON fallback. Received:", JSON.stringify(kvContent)?.slice(0, 200));
    }
  } catch (error) {
    console.error("[KV] Fetch failed, using JSON fallback:", error);
  }
  return loadFallbackContent();
}

/**
 * Fetch content from KV store, falling back to content.json if unavailable.
 * Cached for 1 hour.
 */
export async function getContent(): Promise<ContentData> {
  return unstable_cache(fetchContent, ["site-content"], {
    revalidate: CACHE_REVALIDATE,
    tags: ["site-content"],
  })();
}

/**
 * Get content for a specific language
 */
export async function getContentByLanguage(
  lang: string,
  content?: ContentData
): Promise<LanguageContent> {
  const data = content ?? (await getContent());
  const langContent = data.languages[lang];
  if (langContent) {
    return langContent;
  }
  // Fallback to first available language (usually "en")
  const fallbackLang = Object.keys(data.languages)[0] ?? "en";
  return data.languages[fallbackLang];
}

/**
 * Reset KV store content to the JSON fallback
 */
export async function resetContentToFallback(): Promise<ContentData> {
  const content = await loadFallbackContent();
  await saveKVValue(CONTENT_KEY, content);
  revalidateTag("site-content");
  return content;
}

/**
 * Save content to KV store
 */
export async function saveContent(content: ContentData): Promise<ContentData> {
  await saveKVValue(CONTENT_KEY, content);
  revalidateTag("site-content");
  return content;
}
