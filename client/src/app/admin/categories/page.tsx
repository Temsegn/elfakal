"use client";

import CrudManager from "@/components/admin/CrudManager";
import type { CrudConfig } from "@/components/admin/crud-types";

const config: CrudConfig = {
  title: "Categories",
  description: "Manage product categories — add categories before assigning products",
  resource: "categories",
  labelKey: "name",
  columns: [
    { key: "name", label: "Category Name" },
    { key: "slug", label: "Slug" },
    { key: "productCount", label: "Products" },
  ],
  fields: [
    { name: "name", label: "Category Name", type: "text", required: true },
    {
      name: "slug",
      label: "Slug (optional)",
      type: "text",
      placeholder: "auto-generated from name if empty",
    },
  ],
};

export default function AdminCategoriesPage() {
  return <CrudManager config={config} />;
}
