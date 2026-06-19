"use client";

import { useMemo, useState } from "react";
import {
  Search,
  X,
  LayoutGrid,
  Layers,
  Wheat,
  FlaskConical,
  GraduationCap,
  Building2,
  Sparkles,
  Package,
  type LucideIcon,
} from "lucide-react";
import CatalogProductCard from "@/components/ui/CatalogProductCard";
import type { Product, ProductCategoryGroup } from "@/lib/api/types";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "agricultural-coffee": Wheat,
  "fragrances-flavors": FlaskConical,
  "detergents-soaps": Sparkles,
  "library-supplies": GraduationCap,
  "archival-exhibit": GraduationCap,
  "shade-nets": Building2,
};

function matchesSearch(product: Product, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return (
    product.name.toLowerCase().includes(q) ||
    product.description.toLowerCase().includes(q) ||
    product.categoryName.toLowerCase().includes(q) ||
    product.originCountry.toLowerCase().includes(q)
  );
}

type ViewMode = "grouped" | "grid";

export default function ProductCatalog({
  categories,
}: {
  categories: ProductCategoryGroup[];
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grouped");

  const allProducts = useMemo(
    () => categories.flatMap((c) => c.products),
    [categories]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProducts.length };
    for (const cat of categories) {
      counts[cat.slug] = cat.products.length;
    }
    return counts;
  }, [categories, allProducts.length]);

  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        products: cat.products.filter((p) => matchesSearch(p, search)),
      }))
      .filter((cat) => cat.products.length > 0)
      .filter(
        (cat) => activeCategory === "all" || cat.slug === activeCategory
      );
  }, [categories, search, activeCategory]);

  const flatFiltered = useMemo(
    () => filteredCategories.flatMap((c) => c.products),
    [filteredCategories]
  );

  const showGrouped = viewMode === "grouped" && activeCategory === "all" && !search;

  return (
    <div className="space-y-8">
      {/* Search & controls */}
      <div className="sticky top-20 z-20 -mx-4 px-4 py-4 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, categories, origin country..."
              className="w-full pl-11 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue/25 focus:border-blue transition-all"
              aria-label="Search products"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-200 transition-colors"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode("grouped")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "grouped"
                    ? "bg-white text-blue shadow-sm"
                    : "text-gray-500 hover:text-navy"
                }`}
              >
                <Layers size={14} />
                By Category
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-blue shadow-sm"
                    : "text-gray-500 hover:text-navy"
                }`}
              >
                <LayoutGrid size={14} />
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-blue to-blue-light text-white shadow-lg shadow-blue/30 scale-[1.02]"
                : "bg-gray-100 text-gray-600 hover:bg-blue/10 hover:text-blue"
            }`}
          >
            <Package size={15} />
            All
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              {categoryCounts.all ?? 0}
            </span>
          </button>

          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] || Package;
            const isActive = activeCategory === cat.slug;
            const count = categoryCounts[cat.slug] ?? 0;
            if (count === 0) return null;

            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-navy to-blue text-white shadow-lg shadow-navy/25 scale-[1.02]"
                    : "bg-gray-100 text-gray-600 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                <Icon size={15} />
                <span className="max-w-[160px] truncate">{cat.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-gray-500">
          {flatFiltered.length} product{flatFiltered.length !== 1 ? "s" : ""}
          {search ? ` matching "${search}"` : ""}
          {activeCategory !== "all" && !search
            ? ` in ${categories.find((c) => c.slug === activeCategory)?.name}`
            : ""}
        </p>
      </div>

      {/* Results */}
      {flatFiltered.length === 0 ? (
        <div className="text-center py-20 px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-navy mb-2">No products found</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            Try a different search term or browse all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory("all");
            }}
            className="px-5 py-2.5 bg-blue text-white text-sm font-medium rounded-lg hover:bg-blue-light transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : showGrouped ? (
        <div className="space-y-16">
          {filteredCategories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] || Package;
            return (
              <section key={cat.slug} id={cat.slug}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue/15 to-navy/10 flex items-center justify-center">
                    <Icon size={24} className="text-blue" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
                      {cat.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {cat.products.length} product
                      {cat.products.length !== 1 ? "s" : ""} in this category
                    </p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-4 hidden sm:block" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
                  {cat.products.map((product) => (
                    <CatalogProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {flatFiltered.map((product) => (
            <CatalogProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
