"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = "https://elfakal.onrender.com/api/v1";

export async function loginAction(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { error: body.error || "Invalid email or password" };
    }

    const { data } = await res.json();
    const cookieStore = await cookies();

    cookieStore.set("admin_token", data.token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // admin_user is non-sensitive display data (no token) — readable by client JS for sidebar UI
    cookieStore.set(
      "admin_user",
      JSON.stringify(data.user),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );
  } catch {
    return {
      error:
        "Cannot reach API server. Start the backend with: cd server && npm run dev",
    };
  }

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  cookieStore.delete("admin_user");
  redirect("/admin/login");
}
