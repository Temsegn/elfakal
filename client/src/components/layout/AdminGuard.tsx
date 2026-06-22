"use client";

import { usePathname } from "next/navigation";

// Minimal client component — only handles the admin/public layout split
export default function AdminGuard({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const pathname = usePathname();
  return <>{pathname.startsWith("/admin") ? children : fallback}</>;
}
