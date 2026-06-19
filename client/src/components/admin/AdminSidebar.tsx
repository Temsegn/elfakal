"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Briefcase,
  Newspaper,
  MessageSquare,
  Award,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
];

function getUserEmail(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("admin_user="));
  if (!match) return "";
  try {
    const user = JSON.parse(decodeURIComponent(match.split("=")[1]));
    return user.email || "";
  } catch {
    return "";
  }
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const email = getUserEmail();

  return (
    <aside className="w-64 bg-navy text-white flex flex-col shrink-0 min-h-screen">
      <div className="p-6 border-b border-white/10">
        <p className="text-gold text-xs font-medium uppercase tracking-wider mb-1">
          Elfakal CMS
        </p>
        <h1 className="text-lg font-bold font-[family-name:var(--font-plus-jakarta)]">
          Admin Panel
        </h1>
        {email && (
          <p className="text-gray-400 text-xs mt-2 truncate">{email}</p>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          View Website
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
