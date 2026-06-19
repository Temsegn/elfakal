"use client";

import { useState } from "react";
import ProductCard from "@/components/ui/ProductCard";

interface Product {
  category: string;
  description: string;
  items: string[];
  image: string;
}

export default function ProductsFilter({ products }: { products: Product[] }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter pills — two per row on mobile */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-12">
        <button
          onClick={() => setActive("all")}
          className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-center transition-colors ${
            active === "all"
              ? "bg-blue text-white shadow-md shadow-blue/30"
              : "bg-gray-100 text-gray-600 hover:bg-blue/10 hover:text-blue"
          }`}
        >
          All Products
        </button>
        {products.map((p) => (
          <button
            key={p.category}
            onClick={() => setActive(p.category)}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-center transition-colors ${
              active === p.category
                ? "bg-blue text-white shadow-md shadow-blue/30"
                : "bg-gray-100 text-gray-600 hover:bg-blue/10 hover:text-blue"
            }`}
          >
            {p.category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {filtered.map((product) => (
          <ProductCard key={product.category} product={product} variant="image" />
        ))}
      </div>
    </>
  );
}
