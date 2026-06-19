"use client";

import { useCallback, useEffect, useMemo, useState, Fragment } from "react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { adminFetch } from "@/lib/api/admin";
import type { ApiResponse } from "@/lib/api/types";
import type { CrudConfig, FieldConfig } from "./crud-types";

type Row = Record<string, unknown> & { id: number };

function getNestedValue(obj: Record<string, unknown>, key: string): unknown {
  return obj[key];
}

function formatCellValue(value: unknown, format?: "yesno"): string {
  if (format === "yesno") return value ? "Yes" : "No";
  return String(value ?? "—");
}

function buildDefaults(fields: FieldConfig[]): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === "checkbox") defaults[f.name] = false;
    else if (f.type === "lines") defaults[f.name] = "";
    else defaults[f.name] = "";
  }
  return defaults;
}

function rowToForm(row: Row, fields: FieldConfig[]): Record<string, unknown> {
  const form: Record<string, unknown> = {};
  for (const f of fields) {
    const val = getNestedValue(row, f.name);
    if (f.type === "lines" && Array.isArray(val)) {
      form[f.name] = val.join("\n");
    } else if (f.type === "checkbox") {
      form[f.name] = Boolean(val);
    } else {
      form[f.name] = val ?? "";
    }
  }
  return form;
}

function formToPayload(
  form: Record<string, unknown>,
  fields: FieldConfig[]
): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const f of fields) {
    const val = form[f.name];
    if (f.type === "lines") {
      payload[f.name] = String(val || "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
    } else if (f.type === "checkbox") {
      payload[f.name] = Boolean(val);
    } else {
      payload[f.name] = val;
    }
  }
  return payload;
}

export default function CrudManager({ config }: { config: CrudConfig }) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [error, setError] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, { value: string; label: string }[]>
  >({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch<ApiResponse<Row[]>>(`/admin/${config.resource}`);
      setItems(res.data);
    } catch {
      setError("Failed to load data. Check API server and login.");
    } finally {
      setLoading(false);
    }
  }, [config.resource]);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const res = await adminFetch<ApiResponse<Row[]>>(
          `/admin/${config.resource}`
        );
        if (!cancelled) setItems(res.data);
      } catch {
        if (!cancelled) setError("Failed to load data. Check API server and login.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    if (config.loadCategories) {
      adminFetch<ApiResponse<{ slug: string; name: string }[]>>("/admin/categories")
        .then((res) => {
          if (!cancelled) {
            setDynamicOptions({
              categorySlug: res.data.map((c) => ({
                value: c.slug,
                label: c.name,
              })),
            });
          }
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [config.resource, config.loadCategories]);

  const openCreate = () => {
    setEditing(null);
    setForm(buildDefaults(config.fields));
    setError("");
    setModalOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    setForm(rowToForm(row, config.fields));
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (row: Row) => {
    const label = String(getNestedValue(row, config.labelKey) || `#${row.id}`);
    if (!confirm(`Delete "${label}"?`)) return;
    await adminFetch(`/admin/${config.resource}/${row.id}`, { method: "DELETE" });
    load();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = formToPayload(form, config.fields);
      if (editing) {
        await adminFetch(`/admin/${config.resource}/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch(`/admin/${config.resource}`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const setField = (name: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getOptions = (field: FieldConfig) =>
    dynamicOptions[field.name] || field.options || [];

  const groupedItems = useMemo(() => {
    if (!config.groupByField) return null;
    const groups = new Map<string, Row[]>();
    for (const row of items) {
      const key = String(getNestedValue(row, config.groupByField) || "Other");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(row);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items, config.groupByField]);

  const renderRow = (row: Row) => (
    <tr
      key={row.id}
      className="border-b border-gray-100 hover:bg-gray-50/50"
    >
      {config.columns.map((col) => (
        <td key={col.key} className="px-6 py-4 text-gray-600">
          {formatCellValue(getNestedValue(row, col.key), col.format)}
        </td>
      ))}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => openEdit(row)}
            className="p-2 text-blue hover:bg-blue/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
            {config.title}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{config.description}</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue-light transition-colors"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue" size={32} />
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {config.columns.map((col) => (
                    <th
                      key={col.key}
                      className="text-left px-6 py-4 font-semibold text-navy"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="text-right px-6 py-4 font-semibold text-navy w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={config.columns.length + 1}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No records yet. Click &quot;Add New&quot; to create one.
                    </td>
                  </tr>
                ) : groupedItems ? (
                  groupedItems.map(([groupName, rows]) => (
                    <Fragment key={groupName}>
                      <tr className="bg-blue/5">
                        <td
                          colSpan={config.columns.length + 1}
                          className="px-6 py-3 font-semibold text-navy text-sm"
                        >
                          {groupName}
                          <span className="ml-2 text-gray-400 font-normal">
                            ({rows.length})
                          </span>
                        </td>
                      </tr>
                      {rows.map((row) => renderRow(row))}
                    </Fragment>
                  ))
                ) : (
                  items.map((row) => renderRow(row))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-navy">
                {editing ? "Edit" : "Create"} {config.title.replace(/s$/, "")}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                  {error}
                </div>
              )}

              {config.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </label>

                  {field.type === "textarea" || field.type === "lines" ? (
                    <textarea
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setField(field.name, e.target.value)}
                      required={field.required}
                      rows={field.rows || (field.type === "lines" ? 5 : 3)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none resize-none text-sm"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setField(field.name, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none bg-white text-sm"
                    >
                      <option value="">Select...</option>
                      {getOptions(field).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(form[field.name])}
                        onChange={(e) => setField(field.name, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue"
                      />
                      <span className="text-sm text-gray-600">Featured</span>
                    </label>
                  ) : (
                    <input
                      type={field.type === "date" ? "date" : "text"}
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setField(field.name, e.target.value)}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue/20 focus:border-blue outline-none text-sm"
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue text-white font-medium rounded-lg hover:bg-blue-light disabled:opacity-60"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : null}
                  {editing ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-3 border border-gray-200 text-navy rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
