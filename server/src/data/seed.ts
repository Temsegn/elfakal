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

export type Category = {
  slug: string;
  name: string;
};

export const CATEGORIES: Category[] = [
  { slug: "agricultural-coffee", name: "Agricultural & Coffee Equipment" },
  { slug: "fragrances-flavors", name: "Fragrances & Flavors" },
  { slug: "detergents-soaps", name: "Detergents & Soaps" },
  { slug: "library-supplies", name: "Library Supplies & Furniture" },
  { slug: "archival-exhibit", name: "Archival & Exhibit Supplies" },
  { slug: "shade-nets", name: "Shade Nets & Structures" },
];

export const PRODUCTS: Product[] = [
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

export const SERVICES: Service[] = [
  {
    slug: "import-services",
    title: "Import Services",
    description:
      "End-to-end import management from international suppliers to your doorstep in Ethiopia — sourcing, shipping coordination, customs clearance, and delivery logistics.",
    icon: "Ship",
    image: "/images/service-import.png",
    processSteps: [
      { step: 1, title: "Requirement Analysis", description: "Understanding your product specifications and import requirements." },
      { step: 2, title: "Supplier Sourcing", description: "Identifying and vetting international suppliers." },
      { step: 3, title: "Shipping Coordination", description: "Managing freight, documentation, and logistics." },
      { step: 4, title: "Customs Clearance", description: "Handling import permits, duties, and regulatory compliance." },
      { step: 5, title: "Delivery", description: "Nationwide delivery to your facility or warehouse." },
    ],
    industriesServed: ["Agriculture", "Manufacturing", "Government", "Retail"],
    featured: true,
  },
  {
    slug: "export-services",
    title: "Export Services",
    description:
      "Product packaging, export documentation, international shipping coordination, and buyer liaison for Ethiopian exporters.",
    icon: "Globe",
    image: "/images/service-sourcing.png",
    processSteps: [
      { step: 1, title: "Product Assessment", description: "Evaluating export readiness and market requirements." },
      { step: 2, title: "Documentation", description: "Preparing export licenses, certificates, and shipping docs." },
      { step: 3, title: "Packaging & Labeling", description: "Ensuring compliance with destination market standards." },
      { step: 4, title: "International Shipping", description: "Coordinating freight and port logistics." },
      { step: 5, title: "Buyer Coordination", description: "Managing communication with international buyers." },
    ],
    industriesServed: ["Agriculture", "Coffee", "Manufacturing"],
    featured: true,
  },
  {
    slug: "freight-forwarding",
    title: "Freight Forwarding",
    description:
      "Freight forwarding and container management with end-to-end tracking for sea, air, and land shipments.",
    icon: "Truck",
    image: "/images/service-distribution.png",
    processSteps: [
      { step: 1, title: "Route Planning", description: "Selecting optimal shipping routes and carriers." },
      { step: 2, title: "Container Booking", description: "Securing container space and managing load plans." },
      { step: 3, title: "In-Transit Tracking", description: "Real-time shipment monitoring and updates." },
      { step: 4, title: "Port Handling", description: "Managing port operations and handoffs." },
      { step: 5, title: "Final Delivery", description: "Last-mile delivery to destination." },
    ],
    industriesServed: ["All Industries"],
    featured: true,
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance",
    description:
      "Expert customs brokerage ensuring smooth clearance, regulatory compliance, and minimal delays at Ethiopian ports and borders.",
    icon: "ClipboardList",
    image: "/images/service-procurement.png",
    processSteps: [
      { step: 1, title: "Document Preparation", description: "Preparing all required import/export documentation." },
      { step: 2, title: "Duty Calculation", description: "Accurate tariff classification and duty assessment." },
      { step: 3, title: "Customs Filing", description: "Submitting declarations and managing inspections." },
      { step: 4, title: "Release & Delivery", description: "Securing customs release and coordinating pickup." },
    ],
    industriesServed: ["All Industries"],
    featured: true,
  },
  {
    slug: "trade-consultancy",
    title: "Trade Consultancy",
    description:
      "Expert trade advisory on supplier selection, equipment specification, regulatory compliance, and market entry strategies.",
    icon: "Lightbulb",
    image: "/images/service-consultation.png",
    processSteps: [
      { step: 1, title: "Needs Assessment", description: "Analyzing your business requirements and objectives." },
      { step: 2, title: "Market Research", description: "Identifying suppliers, pricing, and market conditions." },
      { step: 3, title: "Recommendation", description: "Providing actionable trade and sourcing recommendations." },
      { step: 4, title: "Implementation Support", description: "Assisting with procurement and logistics execution." },
    ],
    industriesServed: ["Agriculture", "Manufacturing", "Government", "Retail"],
    featured: false,
  },
  {
    slug: "product-sourcing",
    title: "Product Sourcing",
    description:
      "Global product sourcing and supplier identification across multiple industries and categories worldwide.",
    icon: "Search",
    image: "/images/service-sourcing.png",
    processSteps: [
      { step: 1, title: "Specification Review", description: "Understanding your exact product requirements." },
      { step: 2, title: "Supplier Search", description: "Identifying qualified global suppliers." },
      { step: 3, title: "Quality Verification", description: "Evaluating samples and supplier credentials." },
      { step: 4, title: "Negotiation", description: "Securing competitive pricing and terms." },
    ],
    industriesServed: ["All Industries"],
    featured: false,
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "coffee-factory-equipment-sidama",
    title: "Coffee Factory Equipment Supply",
    industry: "Agro Industry",
    description:
      "Supplied complete coffee washing and pulping machinery to a major coffee exporter in Sidama.",
    country: "Ethiopia (Sidama)",
    volume: "Full processing line",
    logisticsRoute: "Italy → Djibouti Port → Addis Ababa → Sidama",
    outcome:
      "Client increased processing capacity by 60% with reduced water consumption through ecological pulper technology.",
    year: "2024",
    image: "/images/coffee-equipment.png",
    content: [
      "Elfakal PLC delivered a complete coffee processing line including ecological pulpers, washing channels, and drying beds to one of Sidama's largest coffee exporters.",
      "The project involved end-to-end import management from Italian manufacturers, customs clearance at Djibouti, and overland transport to the client's facility.",
      "Our technical team provided installation guidance and operator training, ensuring the client was production-ready before the harvest season.",
    ],
    featured: true,
  },
  {
    slug: "university-library-installation",
    title: "University Library Installation",
    industry: "Library & Archives",
    description:
      "Designed and installed mobile shelving systems, Gaylord® library furniture, and archival supplies for a leading Ethiopian university.",
    country: "Ethiopia (Addis Ababa)",
    volume: "40% storage increase",
    logisticsRoute: "USA → Djibouti Port → Addis Ababa",
    outcome:
      "Library storage capacity increased by 40% with modern furniture and archival systems installed on schedule.",
    year: "2023",
    image: "/images/library.png",
    content: [
      "This institutional project encompassed the full design, supply, and installation of library infrastructure for a premier Ethiopian university.",
      "Mobile shelving systems, Gaylord® circulation furniture, study carrels, and archival storage were delivered in phased installations to minimize operational disruption.",
    ],
    featured: true,
  },
  {
    slug: "fragrances-supply-addis-ababa",
    title: "Fragrances & Flavors Supply",
    industry: "Cosmetics & Soaps",
    description:
      "Ongoing supply of fragrances, flavors, and cosmetic inputs to soap and detergent manufacturers across Addis Ababa.",
    country: "Ethiopia",
    volume: "Multi-client supply chain",
    logisticsRoute: "France / India → Djibouti Port → Addis Ababa",
    outcome:
      "Reliable recurring supply enabling manufacturers to maintain consistent product quality and production schedules.",
    year: "2024",
    image: "/images/chemicals.png",
    content: [
      "Elfakal maintains ongoing supply relationships with multiple soap and detergent manufacturers in Addis Ababa, providing fragrances and flavor compounds sourced from Europe and India.",
    ],
    featured: true,
  },
  {
    slug: "shade-net-flower-farms-oromia",
    title: "Shade Net Installation",
    industry: "Shade Nets",
    description:
      "Supplied and installed shade nets for flower farms and agricultural structures in the Oromia region.",
    country: "Ethiopia (Oromia)",
    volume: "15,000+ sqm",
    logisticsRoute: "India → Djibouti Port → Oromia",
    outcome:
      "Protected high-value flower crops from hail and excessive UV, improving export quality and yield consistency.",
    year: "2023",
    image: "/images/furniture.png",
    content: [
      "Over 15,000 square meters of premium shade nets were installed across multiple flower farm facilities in the Oromia region.",
      "Each installation was customized to crop requirements and structural configurations, with professional installation teams coordinating across multiple sites.",
    ],
    featured: true,
  },
];

export const NEWS: NewsItem[] = [
  {
    slug: "coffee-equipment-shipment-sidama-2024",
    title: "Major Coffee Processing Equipment Shipment Delivered to Sidama Region",
    excerpt:
      "Elfakal PLC has successfully delivered a complete set of ecological pulpers and coffee dryers to a leading coffee exporter in the Sidama region.",
    content: [
      "Elfakal PLC is pleased to announce the successful delivery of a major coffee processing equipment shipment to one of Ethiopia's leading coffee exporters operating in the Sidama region.",
      "This project represents our continued commitment to supporting Ethiopia's coffee industry with world-class equipment that meets international quality standards.",
    ],
    publishedAt: "2024-11-15",
    category: "Company News",
    image: "/images/coffee-equipment.png",
    author: "Elfakal Communications",
    featured: true,
  },
  {
    slug: "university-library-installation-complete",
    title: "University Library Installation Project Successfully Completed",
    excerpt:
      "A comprehensive library modernization project featuring Gaylord® furniture, mobile shelving, and archival storage systems has been completed.",
    content: [
      "Elfakal PLC has successfully completed a large-scale library installation project at one of Ethiopia's premier universities.",
    ],
    publishedAt: "2024-09-22",
    category: "Company News",
    image: "/images/library.png",
    author: "Elfakal Communications",
    featured: false,
  },
  {
    slug: "ctm-technical-textiles-partnership",
    title: "Elfakal Expands Partnership with CTM Technical Textiles",
    excerpt:
      "Strengthening our shade net supply chain through an expanded partnership with CTM Technical Textiles.",
    content: [
      "Elfakal PLC is proud to announce an expanded strategic partnership with CTM Technical Textiles.",
    ],
    publishedAt: "2024-08-10",
    category: "Partnership",
    image: "/images/furniture.png",
    author: "Elfakal Communications",
    featured: false,
  },
  {
    slug: "fragrances-flavors-supply-expansion",
    title: "Fragrances & Flavors Supply Network Expanded Across Addis Ababa",
    excerpt:
      "Elfakal continues to grow its fragrances and flavors distribution across the capital.",
    content: [
      "Elfakal PLC has expanded its fragrances and flavors supply network to serve additional cosmetics and soap manufacturers.",
    ],
    publishedAt: "2024-07-05",
    category: "Industry Update",
    image: "/images/chemicals.png",
    author: "Elfakal Communications",
    featured: false,
  },
  {
    slug: "shade-net-flower-farm-oromia",
    title: "Shade Net Installation Completed for Flower Farms in Oromia",
    excerpt:
      "Over 15,000 square meters of premium shade nets installed across multiple flower farm facilities.",
    content: [
      "Elfakal PLC has completed a significant shade net installation project covering more than 15,000 square meters.",
    ],
    publishedAt: "2024-05-18",
    category: "Company News",
    image: "/images/furniture.png",
    author: "Elfakal Communications",
    featured: false,
  },
  {
    slug: "27-import-shipments-milestone",
    title: "Elfakal Reaches 27+ Import Shipments Milestone",
    excerpt:
      "Celebrating a significant milestone in import operations across three continents.",
    content: [
      "Elfakal PLC is proud to announce that we have successfully completed over 27 import shipments.",
    ],
    publishedAt: "2024-03-12",
    category: "Company News",
    image: "/images/service-import.png",
    author: "Elfakal Communications",
    featured: false,
  },
];

export const CERTIFICATIONS: Certification[] = [
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

export const METRICS = [
  { value: "15+", label: "Years of Experience" },
  { value: "3", label: "Continents Sourced" },
  { value: "27+", label: "Shipments Completed" },
  { value: "100%", label: "Quality Assured" },
];
