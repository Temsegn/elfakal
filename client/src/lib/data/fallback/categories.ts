import type { Product } from "@/lib/api/types";
import fallbackProducts from "./products";

export type ProductCategoryGroup = {
  slug: string;
  name: string;
  products: Product[];
};

const CATEGORIES: { slug: string; name: string }[] = [
  { slug: "agricultural-coffee", name: "Agricultural & Coffee Equipment" },
  { slug: "fragrances-flavors", name: "Fragrances & Flavors" },
  { slug: "detergents-soaps", name: "Detergents & Soaps" },
  { slug: "library-supplies", name: "Library Supplies & Furniture" },
  { slug: "archival-exhibit", name: "Archival & Exhibit Supplies" },
  { slug: "shade-nets", name: "Shade Nets & Structures" },
];

function buildGroups(): ProductCategoryGroup[] {
  const map = new Map<string, ProductCategoryGroup>();
  for (const cat of CATEGORIES) {
    map.set(cat.slug, { ...cat, products: [] });
  }
  for (const product of fallbackProducts) {
    const group = map.get(product.categorySlug);
    if (group) {
      group.products.push(product);
    } else {
      map.set(product.categorySlug, {
        slug: product.categorySlug,
        name: product.categoryName,
        products: [product],
      });
    }
  }
  return Array.from(map.values())
    .filter((g) => g.products.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default buildGroups();
