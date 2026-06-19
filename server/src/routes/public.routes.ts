import { Router } from "express";
import { z } from "zod";
import {
  getCertifications,
  getNews,
  getNewsBySlug,
  getProductBySlug,
  getProducts,
  getCategoriesWithProducts,
  getProjectBySlug,
  getProjects,
  getServiceBySlug,
  getServices,
  createInquiry,
} from "../services/content.service.js";
import { METRICS } from "../data/seed.js";

export const publicRouter = Router();

publicRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

publicRouter.get("/metrics", (_req, res) => {
  res.json({ data: METRICS });
});

publicRouter.get("/products", async (_req, res, next) => {
  try {
    res.json({ data: await getProducts() });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/categories", async (_req, res, next) => {
  try {
    res.json({ data: await getCategoriesWithProducts() });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/products/:slug", async (req, res, next) => {
  try {
    const product = await getProductBySlug(req.params.slug);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/services", async (_req, res, next) => {
  try {
    res.json({ data: await getServices() });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/services/:slug", async (req, res, next) => {
  try {
    const service = await getServiceBySlug(req.params.slug);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json({ data: service });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/projects", async (_req, res, next) => {
  try {
    res.json({ data: await getProjects() });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/projects/:slug", async (req, res, next) => {
  try {
    const project = await getProjectBySlug(req.params.slug);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ data: project });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/news", async (_req, res, next) => {
  try {
    res.json({ data: await getNews() });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/news/:slug", async (req, res, next) => {
  try {
    const article = await getNewsBySlug(req.params.slug);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json({ data: article });
  } catch (err) {
    next(err);
  }
});

publicRouter.get("/certifications", async (_req, res, next) => {
  try {
    res.json({ data: await getCertifications() });
  } catch (err) {
    next(err);
  }
});

const inquirySchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10),
});

publicRouter.post("/inquiries", async (req, res, next) => {
  try {
    const parsed = inquirySchema.parse(req.body);
    const result = await createInquiry(parsed);
    res.status(201).json({
      data: { id: result.id, message: "Inquiry submitted successfully" },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation failed", details: err.errors });
    }
    next(err);
  }
});
