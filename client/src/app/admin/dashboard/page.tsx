"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Briefcase,
  Newspaper,
  MessageSquare,
  FolderKanban,
} from "lucide-react";
import { adminApi, type DashboardStats } from "@/lib/api/admin";

const cards = [
  { key: "products" as const, label: "Products", icon: Package, color: "bg-blue/10 text-blue" },
  { key: "services" as const, label: "Services", icon: Briefcase, color: "bg-purple-100 text-purple-700" },
  { key: "projects" as const, label: "Projects", icon: FolderKanban, color: "bg-green-100 text-green-700" },
  { key: "news" as const, label: "News Articles", icon: Newspaper, color: "bg-amber-100 text-amber-700" },
  { key: "inquiries" as const, label: "Total Inquiries", icon: MessageSquare, color: "bg-pink-100 text-pink-700" },
  { key: "newInquiries" as const, label: "New Inquiries", icon: MessageSquare, color: "bg-red-100 text-red-700" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    adminApi.getStats().then((res) => setStats(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your website content and business inquiries
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.key}
            className="bg-white border border-gray-200 rounded-2xl p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon size={22} />
              </div>
              <span className="text-3xl font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
                {stats ? stats[card.key] : "—"}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
