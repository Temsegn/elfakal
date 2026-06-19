export type Specification = { label: string; value: string };
export type Document = { title: string; url: string };
export type ProcessStep = { step: number; title: string; description: string };

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  originCountry: string;
  moq: string;
  image: string;
  specifications: Specification[];
  documents: Document[];
  featured: boolean;
};

export type ProductCategoryGroup = {
  slug: string;
  name: string;
  products: Product[];
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  processSteps: ProcessStep[];
  industriesServed: string[];
  featured: boolean;
};

export type Project = {
  slug: string;
  title: string;
  industry: string;
  description: string;
  country: string;
  volume: string;
  logisticsRoute: string;
  outcome: string;
  year: string;
  image: string;
  content: string[];
  featured: boolean;
};

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  category: string;
  image: string;
  author: string;
  featured: boolean;
};

export type Certification = {
  slug: string;
  title: string;
  description: string;
  issuer: string;
  category: string;
  documentUrl?: string;
  issuedAt?: string;
  featured: boolean;
};

export type InquiryPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  industry?: string;
  productInterest?: string;
  quantity?: string;
  message: string;
};

export type Metric = { value: string; label: string };

export type ApiResponse<T> = { data: T };
