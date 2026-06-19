import { apiPost, apiFetch } from "./client";
import type { ApiResponse } from "./types";
import type { AdminUser } from "@/lib/auth/session";
import { getTokenFromCookie } from "@/lib/auth/session";

export type LoginPayload = { email: string; password: string };

export type AuthSession = {
  user: AdminUser;
  token: string;
};

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const res = await apiPost<ApiResponse<AuthSession>>("/auth/login", payload);
  return res.data;
}

export async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getTokenFromCookie();
  return apiFetch<T>(path, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });
}

export type DashboardStats = {
  products: number;
  services: number;
  projects: number;
  news: number;
  inquiries: number;
  newInquiries: number;
};

export type Inquiry = {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  industry: string | null;
  productInterest: string | null;
  quantity: string | null;
  message: string;
  status: string;
  createdAt: string;
};

export const adminApi = {
  getStats: () =>
    adminFetch<ApiResponse<DashboardStats>>("/admin/stats"),
  getInquiries: () =>
    adminFetch<ApiResponse<Inquiry[]>>("/admin/inquiries"),
  updateInquiryStatus: (id: number, status: string) =>
    adminFetch<ApiResponse<{ id: number; status: string }>>(
      `/admin/inquiries/${id}/status`,
      { method: "PATCH", body: JSON.stringify({ status }) }
    ),
  getMe: () => adminFetch<ApiResponse<AdminUser>>("/admin/me"),
};
