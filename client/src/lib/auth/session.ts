export type AdminUser = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export function getTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("admin_token="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}
