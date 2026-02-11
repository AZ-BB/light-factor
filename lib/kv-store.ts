"use server";

/**
 * Key-Value Store API Client
 * 
 * A reusable utility for interacting with a Key-Value store API.
 * Includes both direct utility functions and Next.js Server Actions.
 * 
 * Environment variables required:
 * - KV_URL: Base URL of the KV store API
 * - KV_API_KEY: API key for authentication
 * - KV_NAMESPACE: Namespace identifier for the KV store
 * 
 * @example
 * ```ts
 * import { getKVValue, saveKVValue } from '@/lib/kv-store';
 * const data = await getKVValue();
 * await saveKVValue({ name: 'John', age: 30 });
 * ```
 */

interface KVResponse {
  key: string;
  value: Record<string, unknown>;
}

interface KVError {
  error: string;
  message?: string;
}

/**
 * Get configuration from environment variables
 */
function getKVConfig() {
  const url = process.env.KV_URL;
  const apiKey = process.env.KV_API_KEY;
  const namespace = process.env.KV_NAMESPACE;

  if (!url || !apiKey || !namespace) {
    throw new Error(
      "KV store configuration missing. Please set KV_URL, KV_API_KEY, and KV_NAMESPACE in your environment variables."
    );
  }

  return { url, apiKey, namespace };
}

/**
 * Get the value from the KV store for the namespace.
 * API returns { key, value } - we use value directly.
 *
 * @returns The value object, or null if not found
 */
export async function getKVValue<T = Record<string, unknown>>(): Promise<T | null> {
  try {
    const { url, apiKey, namespace } = getKVConfig();
    const endpoint = `${url}/${namespace}`;
    console.log("[KV] Fetching:", endpoint);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("[KV] Response status:", response.status, response.statusText);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn("[KV] 404 – not found");
        return null;
      }

      const responseText = await response.text();
      let errorMessage = `Failed to get KV value: ${response.statusText}`;
      try {
        const errorData: KVError = JSON.parse(responseText);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        if (responseText) errorMessage += ` | Body: ${responseText.slice(0, 200)}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      console.warn("[KV] Empty or invalid response body");
      return null;
    }

    // API returns { key, value } - use value directly
    const value = data.value;
    if (value == null) {
      console.warn("[KV] No value in response");
      return null;
    }

    // If value is nested { key, value }, unwrap to get actual content
    let current: unknown = value;
    if (typeof current === "object" && current !== null && "value" in (current as object)) {
      const inner = (current as Record<string, unknown>).value;
      if (inner != null && typeof inner === "object" && "languages" in (inner as object)) {
        current = inner;
      }
    }

    if (typeof current === "object" && current !== null && "languages" in (current as object)) {
      return current as T;
    }

    if (typeof current === "object" && current !== null) {
      return current as T;
    }

    console.warn("[KV] Unexpected value format");
    return null;
  } catch (error) {
    console.error("[KV] Error fetching:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while getting KV value");
  }
}

/**
 * Save a value to the KV store.
 * POST body is the value directly (no key wrapper).
 *
 * @param value - The value object to save
 * @returns The saved value object
 */
export async function saveKVValue<T = Record<string, unknown>>(value: T): Promise<T> {
  try {
    const { url, apiKey, namespace } = getKVConfig();
    const endpoint = `${url}/${namespace}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
      cache: "no-store",
    });

    if (!response.ok) {
      let errorMessage = `Failed to save KV value: ${response.statusText}`;
      try {
        const errorData: KVError = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // ignored
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    // API may return { key, value } - return value if present
    if (data && typeof data === "object" && "value" in data) {
      return data.value as T;
    }

    return value;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while saving KV value");
  }
}

/**
 * Server Action: Get value from the KV store
 */
export async function getKVData<T = Record<string, unknown>>() {
  try {
    return await getKVValue<T>();
  } catch (error) {
    console.error("[KV] Error getting data:", error);
    throw error;
  }
}

/**
 * Server Action: Save value to the KV store
 */
export async function saveKVData<T = Record<string, unknown>>(value: T) {
  try {
    return await saveKVValue<T>(value);
  } catch (error) {
    console.error("[KV] Error saving data:", error);
    throw error;
  }
}

