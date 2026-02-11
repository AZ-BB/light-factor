import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Get credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if credentials are configured
    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials not configured" },
        { status: 500 }
      );
    }

    // Validate credentials
    if (username === adminUsername && password === adminPassword) {
      // Set authentication cookie (expires in 24 hours)
      const cookieStore = await cookies();
      cookieStore.set("admin-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
