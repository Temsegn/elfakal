import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Package } from "lucide-react";
import type { Product } from "@/lib/api/types";

interface CatalogProductCardProps {
  product: Product;
}

export default function CatalogProductCard({ product }: CatalogProductCardProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden border border-gray-100 card-hover shadow-sm">
      <Link href={`/products/${product.slug}`} className="relative h-44 overflow-hidden shrink-0 group block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover image-hover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-navy">
            {product.categoryName}
          </span>
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-white text-lg font-bold font-[family-name:var(--font-plus-jakarta)] group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="space-y-2 mb-5 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <Globe size={14} className="text-blue shrink-0" />
            <span>Origin: {product.originCountry}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Package size={14} className="text-blue shrink-0" />
            <span>MOQ: {product.moq}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-navy text-sm font-semibold hover:border-blue hover:text-blue transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-gold hover:text-navy transition-colors"
          >
            Inquire <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
