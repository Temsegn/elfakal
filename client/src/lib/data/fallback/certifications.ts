import type { Certification } from "@/lib/api/types";

const certifications: Certification[] = [
  {
    slug: "general-importer-license",
    title: "General Importer License",
    description:
      "Authorized to import a wide range of industrial goods, machinery, and materials into Ethiopia.",
    issuer: "Ministry of Trade and Regional Integration",
    category: "Trade License",
    issuedAt: "2010-01-01",
    featured: true,
  },
  {
    slug: "general-exporter-license",
    title: "General Exporter License",
    description:
      "Licensed for export of agricultural products, manufactured goods, and industrial materials.",
    issuer: "Ministry of Trade and Regional Integration",
    category: "Trade License",
    issuedAt: "2010-01-01",
    featured: true,
  },
  {
    slug: "pharmaceutical-importer",
    title: "Pharmaceutical Importer License",
    description:
      "Authorized import of pharmaceutical products and related medical supplies.",
    issuer: "Ethiopian Food and Drug Authority",
    category: "Specialized License",
    featured: true,
  },
  {
    slug: "machinery-importer",
    title: "Machinery Importer License",
    description:
      "Licensed for import of industrial machinery and processing equipment.",
    issuer: "Ministry of Trade and Regional Integration",
    category: "Specialized License",
    featured: true,
  },
  {
    slug: "customs-compliance",
    title: "Customs Compliance Registration",
    description:
      "Registered customs broker with full compliance for import and export clearance operations.",
    issuer: "Ethiopian Customs Commission",
    category: "Compliance",
    featured: true,
  },
  {
    slug: "quality-assurance",
    title: "Quality Assurance Standards",
    description:
      "Internal quality assurance protocols aligned with international trade and product safety standards.",
    issuer: "Elfakal PLC",
    category: "Quality Certificate",
    featured: false,
  },
  {
    slug: "furniture-importer",
    title: "Furniture Importer License",
    description:
      "Authorized import of library furniture, institutional seating, and office furniture.",
    issuer: "Ministry of Trade and Regional Integration",
    category: "Specialized License",
    featured: false,
  },
  {
    slug: "chemical-importer",
    title: "Chemical Importer License",
    description:
      "Licensed for import of fragrances, flavors, detergents, and industrial chemical products.",
    issuer: "Ministry of Trade and Regional Integration",
    category: "Specialized License",
    featured: false,
  },
];

export default certifications;
