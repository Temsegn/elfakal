import type { Product } from "@/lib/api/types";

const products: Product[] = [
  {
    slug: "ecological-pulpers",
    name: "Ecological Pulpers",
    categorySlug: "agricultural-coffee",
    categoryName: "Agricultural & Coffee Equipment",
    description:
      "Water-efficient ecological pulpers for washed coffee processing, designed for Ethiopian coffee exporters and cooperatives.",
    originCountry: "Italy / India",
    moq: "1 unit",
    image: "/images/coffee-equipment.png",
    specifications: [
      { label: "Capacity", value: "1–5 tons/hour" },
      { label: "Water Usage", value: "Minimal ecological design" },
      { label: "Power", value: "Electric / Diesel options" },
    ],
    documents: [],
    featured: true,
  },
  {
    slug: "coffee-dryers",
    name: "Coffee Dryers",
    categorySlug: "agricultural-coffee",
    categoryName: "Agricultural & Coffee Equipment",
    description:
      "Industrial coffee drying systems for uniform moisture reduction and export-grade bean quality.",
    originCountry: "United States / China",
    moq: "1 unit",
    image: "/images/coffee-equipment.png",
    specifications: [
      { label: "Type", value: "Bed / Rotary dryers" },
      { label: "Capacity", value: "2–20 tons/batch" },
    ],
    documents: [],
    featured: true,
  },
  {
    slug: "shade-nets-agricultural",
    name: "Shade Nets",
    categorySlug: "agricultural-coffee",
    categoryName: "Agricultural & Coffee Equipment",
    description:
      "UV-stabilized shade nets for flower farms, nurseries, and agricultural structures.",
    originCountry: "India / China",
    moq: "500 sqm",
    image: "/images/furniture.png",
    specifications: [
      { label: "Shade Factor", value: "30%–90%" },
      { label: "UV Protection", value: "5+ year warranty" },
    ],
    documents: [],
    featured: true,
  },
  {
    slug: "personal-care-fragrances",
    name: "Personal Care Fragrances",
    categorySlug: "fragrances-flavors",
    categoryName: "Fragrances & Flavors",
    description:
      "Premium fragrance compounds for soaps, lotions, and personal care product manufacturers.",
    originCountry: "France / India",
    moq: "25 kg",
    image: "/images/chemicals.png",
    specifications: [
      { label: "Format", value: "Liquid / Powder" },
      { label: "Compliance", value: "IFRA standards" },
    ],
    documents: [],
    featured: true,
  },
  {
    slug: "gaylord-library-furniture",
    name: "Gaylord® Library Furniture",
    categorySlug: "library-supplies",
    categoryName: "Library Supplies & Furniture",
    description:
      "Complete library furniture systems including shelving, circulation desks, and study carrels.",
    originCountry: "United States",
    moq: "Project-based",
    image: "/images/library.png",
    specifications: [
      { label: "Brand", value: "Gaylord®" },
      { label: "Installation", value: "Full service available" },
    ],
    documents: [],
    featured: true,
  },
  {
    slug: "mobile-shelving-systems",
    name: "Mobile Shelving Systems",
    categorySlug: "library-supplies",
    categoryName: "Library Supplies & Furniture",
    description:
      "High-density mobile shelving for libraries, archives, and institutional storage.",
    originCountry: "United States / Europe",
    moq: "Project-based",
    image: "/images/library.png",
    specifications: [
      { label: "Capacity Increase", value: "Up to 40%" },
      { label: "Safety", value: "Anti-tip mechanisms" },
    ],
    documents: [],
    featured: true,
  },
  {
    slug: "archival-storage-boxes",
    name: "Archival Storage Boxes",
    categorySlug: "archival-exhibit",
    categoryName: "Archival & Exhibit Supplies",
    description:
      "Acid-free archival boxes for document, photo, and artifact preservation.",
    originCountry: "United States",
    moq: "100 units",
    image: "/images/dairy.png",
    specifications: [
      { label: "Material", value: "Acid-free buffered board" },
      { label: "Standards", value: "Conservation-grade" },
    ],
    documents: [],
    featured: false,
  },
  {
    slug: "industrial-shade-structures",
    name: "Industrial Shade Structures",
    categorySlug: "shade-nets",
    categoryName: "Shade Nets & Structures",
    description:
      "Complete shade net structures for buildings, garages, flower farms, and community spaces.",
    originCountry: "India / China",
    moq: "1,000 sqm",
    image: "/images/furniture.png",
    specifications: [
      { label: "Structure", value: "Steel frame + net covering" },
      { label: "Installation", value: "Turnkey available" },
    ],
    documents: [],
    featured: true,
  },
];

export default products;
