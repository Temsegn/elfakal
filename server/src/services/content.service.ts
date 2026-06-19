import {
  CERTIFICATIONS,
  NEWS,
  PRODUCTS,
  PROJECTS,
  SERVICES,
  CATEGORIES,
  type Certification,
  type InquiryPayload,
  type NewsItem,
  type Product,
  type Project,
  type Service,
} from "../data/seed.js";
import { isDatabaseReady, query } from "../db/pool.js";

export function mapProduct(row: Record<string, unknown>): Product {
  return {
    slug: row.slug as string,
    name: row.name as string,
    categorySlug: row.category_slug as string,
    categoryName: row.category_name as string,
    description: row.description as string,
    originCountry: row.origin_country as string,
    moq: row.moq as string,
    image: (row.image as string) || "",
    specifications: (row.specifications as Product["specifications"]) || [],
    documents: (row.documents as Product["documents"]) || [],
    featured: Boolean(row.featured),
  };
}

export function mapService(row: Record<string, unknown>): Service {
  return {
    slug: row.slug as string,
    title: row.title as string,
    description: row.description as string,
    icon: row.icon as string,
    image: (row.image as string) || "",
    processSteps: (row.process_steps as Service["processSteps"]) || [],
    industriesServed: (row.industries_served as string[]) || [],
    featured: Boolean(row.featured),
  };
}

export function mapProject(row: Record<string, unknown>): Project {
  return {
    slug: row.slug as string,
    title: row.title as string,
    industry: row.industry as string,
    description: row.description as string,
    country: row.country as string,
    volume: (row.volume as string) || "",
    logisticsRoute: (row.logistics_route as string) || "",
    outcome: (row.outcome as string) || "",
    year: row.year as string,
    image: (row.image as string) || "",
    content: (row.content as string[]) || [],
    featured: Boolean(row.featured),
  };
}

export function mapNews(row: Record<string, unknown>): NewsItem {
  return {
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    content: (row.content as string[]) || [],
    publishedAt: String(row.published_at).slice(0, 10),
    category: row.category as string,
    image: (row.image as string) || "",
    author: row.author as string,
    featured: Boolean(row.featured),
  };
}

function mapCertification(row: Record<string, unknown>): Certification {
  return {
    slug: row.slug as string,
    title: row.title as string,
    description: row.description as string,
    issuer: row.issuer as string,
    category: row.category as string,
    documentUrl: (row.document_url as string) || undefined,
    issuedAt: row.issued_at
      ? String(row.issued_at).slice(0, 10)
      : undefined,
    featured: Boolean(row.featured),
  };
}

export type ProductCategoryGroup = {
  slug: string;
  name: string;
  products: Product[];
};

export async function getCategoriesWithProducts(): Promise<ProductCategoryGroup[]> {
  if (await isDatabaseReady()) {
    const cats = await query<{ slug: string; name: string }>(
      `SELECT slug, name FROM categories ORDER BY name`
    );
    const products = await getProducts();
    return cats.map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      products: products.filter((p) => p.categorySlug === cat.slug),
    }));
  }

  const map = new Map<string, ProductCategoryGroup>();
  for (const cat of CATEGORIES) {
    map.set(cat.slug, { slug: cat.slug, name: cat.name, products: [] });
  }
  for (const product of PRODUCTS) {
    const group = map.get(product.categorySlug);
    if (group) group.products.push(product);
    else {
      map.set(product.categorySlug, {
        slug: product.categorySlug,
        name: product.categoryName,
        products: [product],
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getProducts(): Promise<Product[]> {
  if (await isDatabaseReady()) {
    const rows = await query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       JOIN categories c ON c.slug = p.category_slug
       ORDER BY p.featured DESC, p.name`
    );
    return rows.map(mapProduct);
  }
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (await isDatabaseReady()) {
    const rows = await query(
      `SELECT p.*, c.name AS category_name
       FROM products p
       JOIN categories c ON c.slug = p.category_slug
       WHERE p.slug = $1`,
      [slug]
    );
    return rows[0] ? mapProduct(rows[0]) : null;
  }
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export async function getServices(): Promise<Service[]> {
  if (await isDatabaseReady()) {
    const rows = await query(`SELECT * FROM services ORDER BY featured DESC, title`);
    return rows.map(mapService);
  }
  return SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (await isDatabaseReady()) {
    const rows = await query(`SELECT * FROM services WHERE slug = $1`, [slug]);
    return rows[0] ? mapService(rows[0]) : null;
  }
  return SERVICES.find((s) => s.slug === slug) || null;
}

export async function getProjects(): Promise<Project[]> {
  if (await isDatabaseReady()) {
    const rows = await query(`SELECT * FROM projects ORDER BY featured DESC, year DESC`);
    return rows.map(mapProject);
  }
  return PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (await isDatabaseReady()) {
    const rows = await query(`SELECT * FROM projects WHERE slug = $1`, [slug]);
    return rows[0] ? mapProject(rows[0]) : null;
  }
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export async function getNews(): Promise<NewsItem[]> {
  if (await isDatabaseReady()) {
    const rows = await query(`SELECT * FROM news ORDER BY published_at DESC`);
    return rows.map(mapNews);
  }
  return NEWS;
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  if (await isDatabaseReady()) {
    const rows = await query(`SELECT * FROM news WHERE slug = $1`, [slug]);
    return rows[0] ? mapNews(rows[0]) : null;
  }
  return NEWS.find((n) => n.slug === slug) || null;
}

export async function getCertifications(): Promise<Certification[]> {
  if (await isDatabaseReady()) {
    const rows = await query(
      `SELECT * FROM certifications ORDER BY featured DESC, title`
    );
    return rows.map(mapCertification);
  }
  return CERTIFICATIONS;
}

export async function createInquiry(data: InquiryPayload): Promise<{ id: number }> {
  if (await isDatabaseReady()) {
    const rows = await query<{ id: number }>(
      `INSERT INTO inquiries (name, company, email, phone, country, industry, product_interest, quantity, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        data.name,
        data.company || null,
        data.email,
        data.phone || null,
        data.country || null,
        data.industry || null,
        data.productInterest || null,
        data.quantity || null,
        data.message,
      ]
    );
    return { id: rows[0].id };
  }

  console.log("[Inquiry received - no DB]", data);
  return { id: Date.now() };
}

export async function seedDatabase(): Promise<void> {
  if (!(await isDatabaseReady())) return;

  for (const cat of CATEGORIES) {
    await query(
      `INSERT INTO categories (slug, name) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
      [cat.slug, cat.name]
    );
  }

  for (const p of PRODUCTS) {
    await query(
      `INSERT INTO products (slug, name, category_slug, description, origin_country, moq, image, specifications, documents, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT DO NOTHING`,
      [
        p.slug, p.name, p.categorySlug, p.description, p.originCountry,
        p.moq, p.image, JSON.stringify(p.specifications),
        JSON.stringify(p.documents), p.featured,
      ]
    );
  }

  for (const s of SERVICES) {
    await query(
      `INSERT INTO services (slug, title, description, icon, image, process_steps, industries_served, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`,
      [
        s.slug, s.title, s.description, s.icon, s.image,
        JSON.stringify(s.processSteps), JSON.stringify(s.industriesServed), s.featured,
      ]
    );
  }

  for (const p of PROJECTS) {
    await query(
      `INSERT INTO projects (slug, title, industry, description, country, volume, logistics_route, outcome, year, image, content, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) ON CONFLICT DO NOTHING`,
      [
        p.slug, p.title, p.industry, p.description, p.country,
        p.volume, p.logisticsRoute, p.outcome, p.year, p.image,
        JSON.stringify(p.content), p.featured,
      ]
    );
  }

  for (const n of NEWS) {
    await query(
      `INSERT INTO news (slug, title, excerpt, content, published_at, category, image, author, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT DO NOTHING`,
      [
        n.slug, n.title, n.excerpt, JSON.stringify(n.content),
        n.publishedAt, n.category, n.image, n.author, n.featured,
      ]
    );
  }

  for (const c of CERTIFICATIONS) {
    await query(
      `INSERT INTO certifications (slug, title, description, issuer, category, document_url, issued_at, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING`,
      [
        c.slug, c.title, c.description, c.issuer, c.category,
        c.documentUrl || null, c.issuedAt || null, c.featured,
      ]
    );
  }

  console.log("Content data seeded");
}
