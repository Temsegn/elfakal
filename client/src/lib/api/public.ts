import { apiFetch, apiPost } from "./client";
import type {
  ApiResponse,
  Certification,
  InquiryPayload,
  Metric,
  NewsItem,
  Product,
  ProductCategoryGroup,
  Project,
  Service,
} from "./types";

export const publicApi = {
  getMetrics: () => apiFetch<ApiResponse<Metric[]>>("/metrics"),
  getProducts: () => apiFetch<ApiResponse<Product[]>>("/products"),
  getCategories: () =>
    apiFetch<ApiResponse<ProductCategoryGroup[]>>("/categories"),
  getProduct: (slug: string) =>
    apiFetch<ApiResponse<Product>>(`/products/${slug}`),
  getServices: () => apiFetch<ApiResponse<Service[]>>("/services"),
  getService: (slug: string) =>
    apiFetch<ApiResponse<Service>>(`/services/${slug}`),
  getProjects: () => apiFetch<ApiResponse<Project[]>>("/projects"),
  getProject: (slug: string) =>
    apiFetch<ApiResponse<Project>>(`/projects/${slug}`),
  getNews: () => apiFetch<ApiResponse<NewsItem[]>>("/news"),
  getNewsArticle: (slug: string) =>
    apiFetch<ApiResponse<NewsItem>>(`/news/${slug}`),
  getCertifications: () =>
    apiFetch<ApiResponse<Certification[]>>("/certifications"),
  submitInquiry: (payload: InquiryPayload) =>
    apiPost<ApiResponse<{ id: number; message: string }>>(
      "/inquiries",
      payload
    ),
};
