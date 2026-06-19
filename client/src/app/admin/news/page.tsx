"use client";

import CrudManager from "@/components/admin/CrudManager";
import type { CrudConfig } from "@/components/admin/crud-types";

const config: CrudConfig = {
  title: "News",
  description: "Manage news articles and market insights",
  resource: "news",
  labelKey: "title",
  columns: [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "publishedAt", label: "Published" },
    { key: "author", label: "Author" },
    { key: "featured", label: "Featured", format: "yesno" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug (optional)", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
    { name: "content", label: "Content (one paragraph per line)", type: "lines", required: true, rows: 6 },
    { name: "publishedAt", label: "Published Date", type: "date", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        { value: "Company News", label: "Company News" },
        { value: "Industry Update", label: "Industry Update" },
        { value: "Partnership", label: "Partnership" },
        { value: "Product Launch", label: "Product Launch" },
      ],
    },
    { name: "image", label: "Image URL", type: "text" },
    { name: "author", label: "Author", type: "text" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ],
};

export default function AdminNewsPage() {
  return <CrudManager config={config} />;
}
