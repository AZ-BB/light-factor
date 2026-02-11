import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./components/LogoutButton";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin-auth");

  if (authCookie?.value !== "authenticated") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <LogoutButton />
        </div>
        <div className="bg-white rounded-lg shadow p-8">
          <Link
            href="/admin/content"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Content Management
          </Link>
        </div>
      </div>
    </div>
  );
}
