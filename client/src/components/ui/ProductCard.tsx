"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";

interface Product {
  category: string;
  description: string;
  items: string[];
  image: string;
}

interface ProductCardProps {
  product: Product;
  variant?: "image" | "gradient";
  gradient?: string;
}

export default function ProductCard({
  product,
  variant = "image",
  gradient = "from-navy to-navy-light",
}: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-100 card-hover shadow-sm">
      {/* Header — image or gradient */}
      {variant === "image" ? (
        <div className="relative h-40 overflow-hidden shrink-0 group">
          <Image
            src={product.image}
            alt={product.category}
            fill
            className="object-cover image-hover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <h3 className="text-white text-lg font-bold font-[family-name:var(--font-plus-jakarta)]">
              {product.category}
            </h3>
          </div>
        </div>
      ) : (
        <div
          className={`h-32 shrink-0 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}
        >
          <h3 className="text-white text-xl font-bold text-center px-6 font-[family-name:var(--font-plus-jakarta)]">
            {product.category}
          </h3>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <p
          className={`text-gray-600 text-sm leading-relaxed transition-all ${
            expanded ? "" : "line-clamp-2"
          }`}
        >
          {product.description}
        </p>

        {/* Expandable content */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            expanded
              ? "grid-rows-[1fr] opacity-100 mt-4"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {product.items.map((item) => (
                <span
                  key={item}
                  className="text-xs bg-blue/5 text-blue px-3 py-1.5 rounded-full border border-blue/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* View More toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 text-blue text-sm font-semibold hover:gap-2.5 transition-all self-start"
          aria-expanded={expanded}
        >
          {expanded ? "View Less" : "View More"}
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Quote link — always pinned at bottom */}
        <a
          href="/contact"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-gold text-gold text-sm font-semibold hover:bg-gold hover:text-navy transition-colors"
        >
          Request Quote <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
