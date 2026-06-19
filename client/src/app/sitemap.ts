import type { MetadataRoute } from "next";
import {
  getProducts,
  getServices,
  getProjects,
  getNews,
} from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elfakal.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, services, projects, news] = await Promise.all([
    getProducts(),
    getServices(),
    getProjects(),
    getNews(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/products",
    "/industries",
    "/projects",
    "/news",
    "/certifications",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsRoutes = news.map((n) => ({
    url: `${SITE_URL}/news/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...newsRoutes,
  ];
}
