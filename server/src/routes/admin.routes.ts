import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { query, isDatabaseReady } from "../db/pool.js";
import {
  adminListProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminListServices,
  adminCreateService,
  adminUpdateService,
  adminDeleteService,
  adminListProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  adminListNews,
  adminCreateNews,
  adminUpdateNews,
  adminDeleteNews,
  adminListCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} from "../services/admin-crud.service.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

function crudError(res: import("express").Response, err: unknown, next: import("express").NextFunction) {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: "Validation failed", details: err.errors });
  }
  next(err);
}

// Stats & inquiries
adminRouter.get("/stats", async (_req, res, next) => {
  try {
    if (!(await isDatabaseReady())) {
      return res.json({ data: { products: 0, services: 0, projects: 0, news: 0, inquiries: 0, newInquiries: 0 } });
    }
    const [products, services, projects, news, inquiries, newInquiries] = await Promise.all([
      query<{ c: number }>(`SELECT COUNT(*)::int AS c FROM products`),
      query<{ c: number }>(`SELECT COUNT(*)::int AS c FROM services`),
      query<{ c: number }>(`SELECT COUNT(*)::int AS c FROM projects`),
      query<{ c: number }>(`SELECT COUNT(*)::int AS c FROM news`),
      query<{ c: number }>(`SELECT COUNT(*)::int AS c FROM inquiries`),
      query<{ c: number }>(`SELECT COUNT(*)::int AS c FROM inquiries WHERE status = 'new'`),
    ]);
    res.json({
      data: {
        products: products[0].c,
        services: services[0].c,
        projects: projects[0].c,
        news: news[0].c,
        inquiries: inquiries[0].c,
        newInquiries: newInquiries[0].c,
      },
    });
  } catch (err) { next(err); }
});

adminRouter.get("/inquiries", async (_req, res, next) => {
  try {
    if (!(await isDatabaseReady())) return res.json({ data: [] });
    const rows = await query(
      `SELECT id, name, company, email, phone, country, industry, product_interest, quantity, message, status, created_at
       FROM inquiries ORDER BY created_at DESC LIMIT 100`
    );
    res.json({
      data: rows.map((row) => ({
        id: row.id as number,
        name: row.name as string,
        company: (row.company as string) || null,
        email: row.email as string,
        phone: (row.phone as string) || null,
        country: (row.country as string) || null,
        industry: (row.industry as string) || null,
        productInterest: (row.product_interest as string) || null,
        quantity: (row.quantity as string) || null,
        message: row.message as string,
        status: row.status as string,
        createdAt: String(row.created_at),
      })),
    });
  } catch (err) { next(err); }
});

adminRouter.patch("/inquiries/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body as { status?: string };
    const allowed = ["new", "contacted", "closed"];
    if (!status || !allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });
    const rows = await query(`UPDATE inquiries SET status = $1 WHERE id = $2 RETURNING id, status`, [status, req.params.id]);
    if (!rows[0]) return res.status(404).json({ error: "Inquiry not found" });
    res.json({ data: rows[0] });
  } catch (err) { next(err); }
});

adminRouter.get("/me", (req, res) => res.json({ data: req.user }));

adminRouter.get("/categories", async (_req, res, next) => {
  try {
    res.json({ data: await adminListCategories() });
  } catch (err) { next(err); }
});
adminRouter.post("/categories", async (req, res, next) => {
  try {
    const id = await adminCreateCategory(req.body);
    res.status(201).json({ data: { id } });
  } catch (err) {
    if (err instanceof Error && err.message.includes("duplicate")) {
      return res.status(400).json({ error: "Category slug already exists" });
    }
    crudError(res, err, next);
  }
});
adminRouter.put("/categories/:id", async (req, res, next) => {
  try {
    await adminUpdateCategory(Number(req.params.id), req.body);
    res.json({ data: { id: Number(req.params.id) } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.delete("/categories/:id", async (req, res, next) => {
  try {
    await adminDeleteCategory(Number(req.params.id));
    res.json({ data: { deleted: true } });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

// Products CRUD
adminRouter.get("/products", async (_req, res, next) => {
  try { res.json({ data: await adminListProducts() }); } catch (err) { next(err); }
});
adminRouter.post("/products", async (req, res, next) => {
  try {
    const id = await adminCreateProduct(req.body);
    res.status(201).json({ data: { id } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.put("/products/:id", async (req, res, next) => {
  try {
    await adminUpdateProduct(Number(req.params.id), req.body);
    res.json({ data: { id: Number(req.params.id) } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.delete("/products/:id", async (req, res, next) => {
  try {
    await adminDeleteProduct(Number(req.params.id));
    res.json({ data: { deleted: true } });
  } catch (err) { next(err); }
});

// Services CRUD
adminRouter.get("/services", async (_req, res, next) => {
  try { res.json({ data: await adminListServices() }); } catch (err) { next(err); }
});
adminRouter.post("/services", async (req, res, next) => {
  try {
    const id = await adminCreateService(req.body);
    res.status(201).json({ data: { id } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.put("/services/:id", async (req, res, next) => {
  try {
    await adminUpdateService(Number(req.params.id), req.body);
    res.json({ data: { id: Number(req.params.id) } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.delete("/services/:id", async (req, res, next) => {
  try {
    await adminDeleteService(Number(req.params.id));
    res.json({ data: { deleted: true } });
  } catch (err) { next(err); }
});

// Projects CRUD
adminRouter.get("/projects", async (_req, res, next) => {
  try { res.json({ data: await adminListProjects() }); } catch (err) { next(err); }
});
adminRouter.post("/projects", async (req, res, next) => {
  try {
    const id = await adminCreateProject(req.body);
    res.status(201).json({ data: { id } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.put("/projects/:id", async (req, res, next) => {
  try {
    await adminUpdateProject(Number(req.params.id), req.body);
    res.json({ data: { id: Number(req.params.id) } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.delete("/projects/:id", async (req, res, next) => {
  try {
    await adminDeleteProject(Number(req.params.id));
    res.json({ data: { deleted: true } });
  } catch (err) { next(err); }
});

// News CRUD
adminRouter.get("/news", async (_req, res, next) => {
  try { res.json({ data: await adminListNews() }); } catch (err) { next(err); }
});
adminRouter.post("/news", async (req, res, next) => {
  try {
    const id = await adminCreateNews(req.body);
    res.status(201).json({ data: { id } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.put("/news/:id", async (req, res, next) => {
  try {
    await adminUpdateNews(Number(req.params.id), req.body);
    res.json({ data: { id: Number(req.params.id) } });
  } catch (err) { crudError(res, err, next); }
});
adminRouter.delete("/news/:id", async (req, res, next) => {
  try {
    await adminDeleteNews(Number(req.params.id));
    res.json({ data: { deleted: true } });
  } catch (err) { next(err); }
});
