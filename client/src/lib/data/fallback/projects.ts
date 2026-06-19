import type { Project } from "@/lib/api/types";

const projects: Project[] = [
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
      "Elfakal maintains ongoing supply relationships with multiple soap and detergent manufacturers in Addis Ababa.",
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
    ],
    featured: true,
  },
];

export default projects;
