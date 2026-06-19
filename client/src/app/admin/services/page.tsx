"use client";

import CrudManager from "@/components/admin/CrudManager";
import type { CrudConfig } from "@/components/admin/crud-types";

const config: CrudConfig = {
  title: "Services",
  description: "Manage trade and logistics services",
  resource: "services",
  labelKey: "title",
  columns: [
    { key: "title", label: "Title" },
    { key: "icon", label: "Icon" },
    { key: "featured", label: "Featured", format: "yesno" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug (optional)", type: "text" },
    { name: "description", label: "Description", type: "textarea", required: true, rows: 4 },
    {
      name: "icon",
      label: "Icon",
      type: "select",
      required: true,
      options: [
        { value: "Ship", label: "Ship" },
        { value: "Globe", label: "Globe" },
        { value: "Truck", label: "Truck" },
        { value: "Search", label: "Search" },
        { value: "ClipboardList", label: "ClipboardList" },
        { value: "Lightbulb", label: "Lightbulb" },
      ],
    },
    { name: "image", label: "Image URL", type: "text", placeholder: "/images/service-import.png" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ],
};

export default function AdminServicesPage() {
  return <CrudManager config={config} />;
}
