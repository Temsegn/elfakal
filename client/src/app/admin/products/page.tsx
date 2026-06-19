"use client";

import CrudManager from "@/components/admin/CrudManager";
import type { CrudConfig } from "@/components/admin/crud-types";

const config: CrudConfig = {
  title: "Products",
  description: "Manage B2B product catalog — grouped by category",
  resource: "products",
  labelKey: "name",
  groupByField: "categoryName",
  loadCategories: true,
  columns: [
    { key: "name", label: "Name" },
    { key: "categoryName", label: "Category" },
    { key: "originCountry", label: "Origin" },
    { key: "moq", label: "MOQ" },
    { key: "featured", label: "Featured", format: "yesno" },
  ],
  fields: [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "slug", label: "Slug (optional)", type: "text", placeholder: "auto-generated if empty" },
    { name: "categorySlug", label: "Category", type: "select", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "originCountry", label: "Origin Country", type: "text", required: true },
    { name: "moq", label: "Minimum Order Quantity", type: "text", required: true },
    { name: "image", label: "Image URL", type: "text", placeholder: "/images/coffee-equipment.png" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ],
};

export default function AdminProductsPage() {
  return <CrudManager config={config} />;
}
