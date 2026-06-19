"use client";

import CrudManager from "@/components/admin/CrudManager";
import type { CrudConfig } from "@/components/admin/crud-types";

const config: CrudConfig = {
  title: "Projects",
  description: "Manage case studies and trade projects",
  resource: "projects",
  labelKey: "title",
  columns: [
    { key: "title", label: "Title" },
    { key: "industry", label: "Industry" },
    { key: "country", label: "Country" },
    { key: "year", label: "Year" },
    { key: "featured", label: "Featured", format: "yesno" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug (optional)", type: "text" },
    { name: "industry", label: "Industry", type: "text", required: true },
    { name: "description", label: "Short Description", type: "textarea", required: true },
    { name: "country", label: "Country", type: "text", required: true },
    { name: "volume", label: "Volume", type: "text" },
    { name: "logisticsRoute", label: "Logistics Route", type: "text" },
    { name: "outcome", label: "Outcome", type: "textarea" },
    { name: "year", label: "Year", type: "text", required: true, placeholder: "2024" },
    { name: "image", label: "Image URL", type: "text" },
    { name: "content", label: "Full Content (one paragraph per line)", type: "lines", rows: 6 },
    { name: "featured", label: "Featured", type: "checkbox" },
  ],
};

export default function AdminProjectsPage() {
  return <CrudManager config={config} />;
}
