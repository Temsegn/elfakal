export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox" | "date" | "lines";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
};

export type ColumnConfig = {
  key: string;
  label: string;
  format?: "yesno";
};

export type CrudConfig = {
  title: string;
  description: string;
  resource: string;
  labelKey: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  groupByField?: string;
  loadCategories?: boolean;
};
