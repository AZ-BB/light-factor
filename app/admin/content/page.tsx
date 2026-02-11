import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getContent, resetContentToFallback, saveContent } from "@/lib/content";
import { getKVValue } from "@/lib/kv-store";
import { CONTENT_KEY } from "@/lib/constants";
import CMSEditor from "./CMSEditor";
import LogoutButton from "../components/LogoutButton";

export default async function AdminContentPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin-auth");

  if (authCookie?.value !== "authenticated") {
    redirect("/admin/login");
  }

  let contentSource: "kv" | "fallback" = "fallback";
  let content = await getContent();

  try {
    const kvContent = await getKVValue(CONTENT_KEY);
    if (kvContent && typeof kvContent === "object" && "languages" in kvContent) {
      contentSource = "kv";
    }
  } catch (error) {
    console.error("[KV] Error in admin content page:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          </div>
          <LogoutButton />
        </div>

        <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 mb-6">
          <p className="text-sm text-amber-800">
            Current source: <strong>{contentSource === "kv" ? "KV Store" : "JSON Fallback"}</strong>
          </p>
        </div>

        <CMSEditor
          initialContent={content}
          resetAction={resetContentToFallback}
          saveAction={saveContent}
        />
      </div>
    </div>
  );
}
