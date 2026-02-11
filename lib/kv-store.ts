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
 * import { getKVValue, saveKVValue, getKVData, saveKVData } from '@/lib/kv-store';
 * 
 * // Direct utility functions (use in Server Components, API routes)
 * const data = await getKVValue('my-key');
 * await saveKVValue('my-key', { name: 'John', age: 30 });
 * 
 * // Server Actions (use in Client Components, form actions)
 * const data = await getKVData('my-key');
 * await saveKVData('my-key', { name: 'John', age: 30 });
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
 * Get a value from the KV store by key
 * 
 * @param key - The key to retrieve from the KV store
 * @returns The value object associated with the key, or null if not found
 * @throws Error if the request fails or configuration is missing
 * 
 * @example
 * ```ts
 * const user = await getKVValue('user:123');
 * if (user) {
 *   console.log(user.name);
 * }
 * ```
 */
export async function getKVValue<T = Record<string, unknown>>(
  key: string
): Promise<T | null> {
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
      cache: "no-store", // Ensure fresh data on each request
    });

    console.log("[KV] Response status:", response.status, response.statusText);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn("[KV] 404 – key not found:", key);
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
      console.warn("[KV] Empty or invalid response body. Key:", key);
      return null;
    }

    // Unwrap until we get content with .languages (handles nested { key, value })
    let current: unknown = data;
    while (current != null && typeof current === "object") {
      const obj = current as Record<string, unknown>;
      if (obj.languages != null && typeof obj.languages === "object") {
        return current as T;
      }
      if (obj.value != null) {
        if (typeof obj.value === "string") {
          try {
            current = JSON.parse(obj.value);
          } catch {
            break;
          }
        } else {
          current = obj.value;
        }
        continue;
      }
      break;
    }

    console.warn("[KV] No content with languages found in response. Key:", key);
    return null;
  } catch (error) {
    console.error(`[KV] Error fetching key "${key}":`, error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while getting KV value");
  }
}

/**
 * Save a value to the KV store
 * 
 * @param key - The key to save the value under
 * @param value - The value object to save (will be JSON stringified)
 * @returns The saved value object
 * @throws Error if the request fails or configuration is missing
 * 
 * @example
 * ```ts
 * await saveKVValue('user:123', {
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   createdAt: new Date().toISOString()
 * });
 * ```
 */
export async function saveKVValue<T = Record<string, unknown>>(
  key: string,
  value: T
): Promise<T> {
  try {
    const { url, apiKey, namespace } = getKVConfig();
    const endpoint = `${url}/${namespace}`;

    const requestBody = {
      key,
      value,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      cache: "no-store",
    });

    if (!response.ok) {
      let errorMessage = `Failed to save KV value: ${response.statusText}`;
      try {
        const errorData: KVError = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If error response is not JSON, use default message
      }

      throw new Error(errorMessage);
    }

    const data: KVResponse = await response.json();

    return data.value as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while saving KV value");
  }
}

/**
 * Server Action: Get a value from the KV store
 * 
 * Use this in Client Components and form actions.
 * 
 * @param key - The key to retrieve from the KV store
 * @returns The value object associated with the key, or null if not found
 * @throws Error if the request fails or configuration is missing
 * 
 * @example
 * ```tsx
 * import { getKVData } from '@/lib/kv-store';
 * 
 * async function handleSubmit(formData: FormData) {
 *   const data = await getKVData('my-key');
 * }
 * ```
 */
export async function getKVData<T = Record<string, unknown>>(key: string) {
  try {
    return await getKVValue<T>(key);
  } catch (error) {
    console.error(`Error getting KV data for key "${key}":`, error);
    throw error;
  }
}

/**
 * Server Action: Save a value to the KV store
 * 
 * Use this in Client Components and form actions.
 * 
 * @param key - The key to save the value under
 * @param value - The value object to save (will be JSON stringified)
 * @returns The saved value object
 * @throws Error if the request fails or configuration is missing
 * 
 * @example
 * ```tsx
 * import { saveKVData } from '@/lib/kv-store';
 * 
 * async function handleSubmit(formData: FormData) {
 *   await saveKVData('my-key', { name: formData.get('name') });
 * }
 * ```
 */
export async function saveKVData<T = Record<string, unknown>>(
  key: string,
  value: T
) {
  try {
    return await saveKVValue<T>(key, value);
  } catch (error) {
    console.error(`Error saving KV data for key "${key}":`, error);
    throw error;
  }
}

