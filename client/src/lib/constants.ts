export const COMPANY = {
  name: "Elfakal PLC",
  legalName: "Elfakal Pvt. Ltd. Co.",
  tagline: "Ethiopia's Trusted Industrial Supply & Import Partner",
  description:
    "Supplier of agricultural and coffee equipment, fragrances, flavors and cosmetics, library and archival supplies, furniture, and shade nets across Ethiopia — delivered through reliable global sourcing.",
  address: {
    building: "Garad Building",
    street: "Teklehaimanot Road (T/Haimanot Rd.)",
    floor: "10th Floor, Room #1294-10-4",
    kebele: "Kebele 12",
    city: "Addis Ababa",
    country: "Ethiopia",
    poBox: "P.O. Box 6907",
  },
  phone: {
    main: "+251 11 157 5555",
    alt: "+251 11 157 5656",
    mobile: "+251 91 120 1075",
    fax: "+251 11 157 5657",
  },
  email: "elfakal@gmail.com",
  website: "elfakal.com",
  whatsapp: "251911201075",
  maps: {
    query: "Garad Building, Teklehaimanot Road, Addis Ababa, Ethiopia",
    link: "https://www.google.com/maps/search/?api=1&query=Garad%20Building%2C%20Teklehaimanot%20Road%2C%20Addis%20Ababa%2C%20Ethiopia",
    embed:
      "https://www.google.com/maps?q=Garad%20Building%2C%20Teklehaimanot%20Road%2C%20Addis%20Ababa%2C%20Ethiopia&output=embed",
  },
};

export const METRICS = [
  { value: "15+", label: "Years of Experience" },
  { value: "3", label: "Continents Sourced" },
  { value: "27+", label: "Shipments Completed" },
  { value: "100%", label: "Quality Assured" },
];

export const INDUSTRIES = [
  {
    id: "agro",
    title: "Agriculture & Coffee",
    description:
      "Ecological pulpers, coffee dryers, shade nets, and agricultural solutions for Ethiopia's coffee exporters and farms.",
    icon: "Wheat",
    color: "from-green-500 to-green-700",
  },
  {
    id: "fragrances",
    title: "Fragrances & Flavors",
    description:
      "Fragrances and flavors for personal care, cosmetics, home care, air care, and dishwashing products.",
    icon: "FlaskConical",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: "cosmetics",
    title: "Cosmetics & Soaps",
    description:
      "Hair products, bath products, toilet and laundry soaps, detergents, and personal care cosmetics.",
    icon: "Sparkles",
    color: "from-pink-500 to-rose-700",
  },
  {
    id: "library",
    title: "Library & Archives",
    description:
      "Cataloging, mobile shelving, security, library furniture, and complete archival storage systems.",
    icon: "GraduationCap",
    color: "from-amber-500 to-amber-700",
  },
  {
    id: "furniture",
    title: "Furniture & Seating",
    description:
      "Gaylord® library furniture, book trucks, library chairs, community-space seating, and exhibit displays.",
    icon: "Armchair",
    color: "from-slate-500 to-slate-700",
  },
  {
    id: "shadenets",
    title: "Shade Nets & Structures",
    description:
      "Shade nets and structural coverings for buildings, garages, flower farms, and community spaces.",
    icon: "Building2",
    color: "from-cyan-500 to-cyan-700",
  },
];

export const PRODUCTS = [
  {
    category: "Agricultural & Coffee Equipment",
    items: [
      "Ecological Pulpers",
      "Coffee Dryers",
      "Shade Nets",
      "Flower Farm Solutions",
    ],
    image: "/images/coffee-equipment.png",
    description:
      "Ecological pulpers, dryers, and complete coffee processing equipment for Ethiopian coffee exporters and cooperatives.",
  },
  {
    category: "Fragrances & Flavors",
    items: [
      "Personal Care",
      "Cosmetics",
      "Hair & Bath Products",
      "Air Care",
    ],
    image: "/images/chemicals.png",
    description:
      "Fragrances and flavors for personal care, cosmetics, home care, and air care product manufacturers.",
  },
  {
    category: "Detergents & Soaps",
    items: [
      "Detergents",
      "Toilet Soaps",
      "Laundry Soaps",
      "Dishwashing",
    ],
    image: "/images/pharma.png",
    description:
      "Quality inputs and finished goods for detergents, toilet and laundry soaps, and dishwashing products.",
  },
  {
    category: "Library Supplies & Furniture",
    items: [
      "Gaylord® Furniture",
      "Mobile Shelving",
      "Book Trucks & Returns",
      "Library Chairs",
    ],
    image: "/images/library.png",
    description:
      "Cataloging, shelving, security, labels, book jacket covers, and complete library furniture solutions.",
  },
  {
    category: "Archival & Exhibit Supplies",
    items: [
      "Archival Boxes",
      "Exhibit Cases",
      "Conservation Supplies",
      "Photo & Artifact Storage",
    ],
    image: "/images/dairy.png",
    description:
      "Archival boxes, exhibit cases, conservation supplies, and photo & artifact storage for museums and archives.",
  },
  {
    category: "Shade Nets & Structures",
    items: [
      "Buildings",
      "Garages",
      "Flower Farms",
      "Community Spaces",
    ],
    image: "/images/furniture.png",
    description:
      "Shade nets and structural solutions for buildings, garages, flower farms, and community spaces.",
  },
];

export const WHY_CHOOSE = [
  {
    title: "Global Sourcing",
    description:
      "Direct imports from the United States, India, and China with established international supplier relationships.",
    icon: "Globe",
  },
  {
    title: "Quality Assurance",
    description:
      "Strict quality control at every stage — from supplier selection to final delivery.",
    icon: "ShieldCheck",
  },
  {
    title: "Industry Experience",
    description:
      "Serving multiple sectors including agriculture, fragrances, library systems, and shade nets.",
    icon: "Award",
  },
  {
    title: "Customer-Centric Service",
    description:
      "Fast response times, dedicated account management, and nationwide delivery support.",
    icon: "HeartHandshake",
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Requirement Collection",
    description: "Understanding your specific needs and specifications.",
  },
  {
    step: 2,
    title: "Supplier Selection",
    description: "Identifying the best international suppliers for your products.",
  },
  {
    step: 3,
    title: "Quality Verification",
    description: "Rigorous quality checks before shipment approval.",
  },
  {
    step: 4,
    title: "Import & Logistics",
    description: "Managing customs, freight, and import documentation.",
  },
  {
    step: 5,
    title: "Delivery",
    description: "Nationwide delivery to your facility or warehouse.",
  },
  {
    step: 6,
    title: "Customer Support",
    description: "Ongoing support, warranty, and after-sales service.",
  },
];

export const PROJECTS = [
  {
    title: "Coffee Factory Equipment Supply",
    industry: "Agro Industry",
    description:
      "Supplied complete coffee washing and pulping machinery to a major coffee exporter in Sidama.",
    year: "2024",
  },
  {
    title: "University Library Installation",
    industry: "Library & Archives",
    description:
      "Designed and installed mobile shelving systems, Gaylord® library furniture, and archival supplies for a leading Ethiopian university.",
    year: "2023",
  },
  {
    title: "Fragrances & Flavors Supply",
    industry: "Cosmetics & Soaps",
    description:
      "Ongoing supply of fragrances, flavors, and cosmetic inputs to soap and detergent manufacturers across Addis Ababa.",
    year: "2024",
  },
  {
    title: "Shade Net Installation",
    industry: "Shade Nets",
    description:
      "Supplied and installed shade nets for flower farms and agricultural structures in the Oromia region.",
    year: "2023",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Elfakal has been our trusted supplier for coffee processing equipment. Their quality and reliability are unmatched.",
    author: "Operations Manager",
    company: "Major Coffee Exporter",
    industry: "Agro Industry",
  },
  {
    quote:
      "The library furniture and archival installation was professional and completed on schedule. Highly recommended for institutional projects.",
    author: "Library Director",
    company: "Ethiopian University",
    industry: "Library & Archives",
  },
  {
    quote:
      "Reliable supply of fragrances and flavors for our soap and detergent production. Elfakal understands our manufacturing needs.",
    author: "Procurement Head",
    company: "Cosmetics Manufacturer",
    industry: "Cosmetics & Soaps",
  },
];

export const PARTNERS = [
  "CTM Technical Textiles",
  "International Pharma Co.",
  "AgriTech Global",
  "Library Systems Intl.",
  "ChemSource Ltd.",
  "BuildPro Industries",
];

export const SERVICES = [
  {
    title: "Import Services",
    description:
      "End-to-end import management from international suppliers to your doorstep in Ethiopia.",
    icon: "Ship",
    image: "/images/service-import.png",
  },
  {
    title: "Product Sourcing",
    description:
      "Global product sourcing and supplier identification across multiple industries and categories.",
    icon: "Search",
    image: "/images/service-sourcing.png",
  },
  {
    title: "Procurement",
    description:
      "Institutional procurement services for government agencies, universities, and large organizations.",
    icon: "ClipboardList",
    image: "/images/service-procurement.png",
  },
  {
    title: "Wholesale Distribution",
    description:
      "Nationwide wholesale distribution network serving manufacturers, retailers, and institutions.",
    icon: "Truck",
    image: "/images/service-distribution.png",
  },
  {
    title: "Technical Consultation",
    description:
      "Expert technical advice on equipment selection, installation, and operational best practices.",
    icon: "Lightbulb",
    image: "/images/service-consultation.png",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/projects", label: "Projects" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];
