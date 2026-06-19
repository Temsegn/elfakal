import { z } from "zod";
import { query } from "../db/pool.js";
import {
  mapProduct,
  mapService,
  mapProject,
  mapNews,
} from "./content.service.js";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── Products ───────────────────────────────────────────────

export async function adminListProducts() {
  const rows = await query(
    `SELECT p.*, c.name AS category_name FROM products p
     JOIN categories c ON c.slug = p.category_slug ORDER BY p.id DESC`
  );
  return rows.map((r) => ({ id: r.id as number, ...mapProduct(r) }));
}

const productSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1),
  categorySlug: z.string().min(1),
  description: z.string().min(1),
  originCountry: z.string().default("Various"),
  moq: z.string().default("Contact for MOQ"),
  image: z.string().optional(),
  featured: z.boolean().default(false),
});

export async function adminCreateProduct(body: unknown) {
  const data = productSchema.parse(body);
  const slug = data.slug || slugify(data.name);
  const rows = await query(
    `INSERT INTO products (slug, name, category_slug, description, origin_country, moq, image, featured)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    [slug, data.name, data.categorySlug, data.description, data.originCountry, data.moq, data.image || "", data.featured]
  );
  return rows[0].id;
}

export async function adminUpdateProduct(id: number, body: unknown) {
  const data = productSchema.parse(body);
  const slug = data.slug || slugify(data.name);
  await query(
    `UPDATE products SET slug=$1, name=$2, category_slug=$3, description=$4,
     origin_country=$5, moq=$6, image=$7, featured=$8, updated_at=NOW() WHERE id=$9`,
    [slug, data.name, data.categorySlug, data.description, data.originCountry, data.moq, data.image || "", data.featured, id]
  );
}

export async function adminDeleteProduct(id: number) {
  await query(`DELETE FROM products WHERE id=$1`, [id]);
}

// ─── Services ───────────────────────────────────────────────

export async function adminListServices() {
  const rows = await query(`SELECT * FROM services ORDER BY id DESC`);
  return rows.map((r) => ({ id: r.id as number, ...mapService(r) }));
}

const serviceSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().default("Ship"),
  image: z.string().optional(),
  featured: z.boolean().default(false),
});

export async function adminCreateService(body: unknown) {
  const data = serviceSchema.parse(body);
  const slug = data.slug || slugify(data.title);
  const rows = await query(
    `INSERT INTO services (slug, title, description, icon, image, featured)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
    [slug, data.title, data.description, data.icon, data.image || "", data.featured]
  );
  return rows[0].id;
}

export async function adminUpdateService(id: number, body: unknown) {
  const data = serviceSchema.parse(body);
  const slug = data.slug || slugify(data.title);
  await query(
    `UPDATE services SET slug=$1, title=$2, description=$3, icon=$4, image=$5, featured=$6, updated_at=NOW() WHERE id=$7`,
    [slug, data.title, data.description, data.icon, data.image || "", data.featured, id]
  );
}

export async function adminDeleteService(id: number) {
  await query(`DELETE FROM services WHERE id=$1`, [id]);
}

// ─── Projects ───────────────────────────────────────────────

export async function adminListProjects() {
  const rows = await query(`SELECT * FROM projects ORDER BY id DESC`);
  return rows.map((r) => ({ id: r.id as number, ...mapProject(r) }));
}

const projectSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  industry: z.string().min(1),
  description: z.string().min(1),
  country: z.string().default("Ethiopia"),
  volume: z.string().optional(),
  logisticsRoute: z.string().optional(),
  outcome: z.string().optional(),
  year: z.string().min(4),
  image: z.string().optional(),
  content: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export async function adminCreateProject(body: unknown) {
  const data = projectSchema.parse(body);
  const slug = data.slug || slugify(data.title);
  const rows = await query(
    `INSERT INTO projects (slug, title, industry, description, country, volume, logistics_route, outcome, year, image, content, featured)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id`,
    [slug, data.title, data.industry, data.description, data.country, data.volume || "", data.logisticsRoute || "", data.outcome || "", data.year, data.image || "", JSON.stringify(data.content), data.featured]
  );
  return rows[0].id;
}

export async function adminUpdateProject(id: number, body: unknown) {
  const data = projectSchema.parse(body);
  const slug = data.slug || slugify(data.title);
  await query(
    `UPDATE projects SET slug=$1, title=$2, industry=$3, description=$4, country=$5,
     volume=$6, logistics_route=$7, outcome=$8, year=$9, image=$10, content=$11, featured=$12, updated_at=NOW() WHERE id=$13`,
    [slug, data.title, data.industry, data.description, data.country, data.volume || "", data.logisticsRoute || "", data.outcome || "", data.year, data.image || "", JSON.stringify(data.content), data.featured, id]
  );
}

export async function adminDeleteProject(id: number) {
  await query(`DELETE FROM projects WHERE id=$1`, [id]);
}

// ─── News ───────────────────────────────────────────────────

export async function adminListNews() {
  const rows = await query(`SELECT * FROM news ORDER BY published_at DESC`);
  return rows.map((r) => ({ id: r.id as number, ...mapNews(r) }));
}

const newsSchema = z.object({
  slug: z.string().min(1).optional(),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.array(z.string()).min(1),
  publishedAt: z.string().min(1),
  category: z.string().min(1),
  image: z.string().optional(),
  author: z.string().default("Elfakal Communications"),
  featured: z.boolean().default(false),
});

export async function adminCreateNews(body: unknown) {
  const data = newsSchema.parse(body);
  const slug = data.slug || slugify(data.title);
  const rows = await query(
    `INSERT INTO news (slug, title, excerpt, content, published_at, category, image, author, featured)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
    [slug, data.title, data.excerpt, JSON.stringify(data.content), data.publishedAt, data.category, data.image || "", data.author, data.featured]
  );
  return rows[0].id;
}

export async function adminUpdateNews(id: number, body: unknown) {
  const data = newsSchema.parse(body);
  const slug = data.slug || slugify(data.title);
  await query(
    `UPDATE news SET slug=$1, title=$2, excerpt=$3, content=$4, published_at=$5,
     category=$6, image=$7, author=$8, featured=$9, updated_at=NOW() WHERE id=$10`,
    [slug, data.title, data.excerpt, JSON.stringify(data.content), data.publishedAt, data.category, data.image || "", data.author, data.featured, id]
  );
}

export async function adminDeleteNews(id: number) {
  await query(`DELETE FROM news WHERE id=$1`, [id]);
}

// ─── Categories ─────────────────────────────────────────────

export async function adminListCategories() {
  const rows = await query(
    `SELECT c.id, c.slug, c.name,
       (SELECT COUNT(*)::int FROM products p WHERE p.category_slug = c.slug) AS product_count
     FROM categories c ORDER BY c.name`
  );
  return rows.map((r) => ({
    id: r.id as number,
    slug: r.slug as string,
    name: r.name as string,
    productCount: r.product_count as number,
  }));
}

const categorySchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1),
});

export async function adminCreateCategory(body: unknown) {
  const data = categorySchema.parse(body);
  const slug = data.slug || slugify(data.name);
  const rows = await query(
    `INSERT INTO categories (slug, name) VALUES ($1, $2) RETURNING id`,
    [slug, data.name]
  );
  return rows[0].id;
}

export async function adminUpdateCategory(id: number, body: unknown) {
  const data = categorySchema.parse(body);
  const slug = data.slug || slugify(data.name);
  const existing = await query(`SELECT slug FROM categories WHERE id = $1`, [id]);
  if (!existing[0]) throw new Error("Category not found");
  const oldSlug = existing[0].slug as string;
  await query(`UPDATE categories SET slug = $1, name = $2 WHERE id = $3`, [
    slug,
    data.name,
    id,
  ]);
  if (oldSlug !== slug) {
    await query(`UPDATE products SET category_slug = $1 WHERE category_slug = $2`, [
      slug,
      oldSlug,
    ]);
  }
}

export async function adminDeleteCategory(id: number) {
  const rows = await query(
    `SELECT c.slug,
       (SELECT COUNT(*)::int FROM products p WHERE p.category_slug = c.slug) AS product_count
     FROM categories c WHERE c.id = $1`,
    [id]
  );
  if (!rows[0]) throw new Error("Category not found");
  if ((rows[0].product_count as number) > 0) {
    throw new Error("Cannot delete category with products. Move or delete products first.");
  }
  await query(`DELETE FROM categories WHERE id = $1`, [id]);
}
