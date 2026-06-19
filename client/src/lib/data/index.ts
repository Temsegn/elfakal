import { publicApi } from "@/lib/api/public";
import type {
  Certification,
  NewsItem,
  Product,
  ProductCategoryGroup,
  Project,
  Service,
} from "@/lib/api/types";
import { NEWS as FALLBACK_NEWS } from "@/lib/news";
import fallbackProducts from "@/lib/data/fallback/products";
import fallbackCategories from "@/lib/data/fallback/categories";
import fallbackServices from "@/lib/data/fallback/services";
import fallbackProjects from "@/lib/data/fallback/projects";
import fallbackCertifications from "@/lib/data/fallback/certifications";

async function withFallback<T>(
  fetcher: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}

const fallbackNews: NewsItem[] = FALLBACK_NEWS.map((n, i) => ({
  ...n,
  featured: i === 0,
}));

export async function getProducts(): Promise<Product[]> {
  return withFallback(
    async () => (await publicApi.getProducts()).data,
    fallbackProducts
  );
}

export async function getCategoriesWithProducts(): Promise<ProductCategoryGroup[]> {
  return withFallback(
    async () => (await publicApi.getCategories()).data,
    fallbackCategories
  );
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  return withFallback(
    async () => (await publicApi.getProduct(slug)).data,
    fallbackProducts.find((p) => p.slug === slug)
  );
}

export async function getServices(): Promise<Service[]> {
  return withFallback(
    async () => (await publicApi.getServices()).data,
    fallbackServices
  );
}

export async function getServiceBySlug(
  slug: string
): Promise<Service | undefined> {
  return withFallback(
    async () => (await publicApi.getService(slug)).data,
    fallbackServices.find((s) => s.slug === slug)
  );
}

export async function getProjects(): Promise<Project[]> {
  return withFallback(
    async () => (await publicApi.getProjects()).data,
    fallbackProjects
  );
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  return withFallback(
    async () => (await publicApi.getProject(slug)).data,
    fallbackProjects.find((p) => p.slug === slug)
  );
}

export async function getNews(): Promise<NewsItem[]> {
  return withFallback(
    async () => (await publicApi.getNews()).data,
    fallbackNews
  );
}

export async function getNewsBySlug(
  slug: string
): Promise<NewsItem | undefined> {
  return withFallback(
    async () => (await publicApi.getNewsArticle(slug)).data,
    fallbackNews.find((n) => n.slug === slug)
  );
}

export async function getCertifications(): Promise<Certification[]> {
  return withFallback(
    async () => (await publicApi.getCertifications()).data,
    fallbackCertifications
  );
}

export async function getRelatedNews(
  currentSlug: string,
  limit = 3
): Promise<NewsItem[]> {
  const all = await getNews();
  return all.filter((n) => n.slug !== currentSlug).slice(0, limit);
}

export function formatNewsDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export const NEWS_CATEGORY_COLORS: Record<string, string> = {
  "Company News": "bg-blue-100 text-blue-700",
  "Industry Update": "bg-green-100 text-green-700",
  Partnership: "bg-amber-100 text-amber-700",
  "Product Launch": "bg-purple-100 text-purple-700",
};
