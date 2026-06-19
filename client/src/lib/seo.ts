import type { Metadata } from "next";
import { COMPANY } from "./constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://elfakal.com"
).replace(/\/$/, "");

/** Common misspellings and partial searches for the company name */
export const BRAND_ALIASES = [
  "Elfakal",
  "Elfakal PLC",
  "Elf Elakal",
  "Elakal",
  "Elfkal",
  "El Fakal",
  "Elfakal Ethiopia",
  "Elfakal Addis Ababa",
  "Elfakal import",
  "Elfakal export",
  "Elfakal trading",
];

export const DEFAULT_KEYWORDS = [
  ...BRAND_ALIASES,
  "import company Ethiopia",
  "import company Addis Ababa",
  "coffee equipment Ethiopia",
  "ecological pulpers Ethiopia",
  "coffee dryers Ethiopia",
  "freight forwarding Ethiopia",
  "customs clearance Ethiopia",
  "export services Ethiopia",
  "library furniture Ethiopia",
  "Gaylord library furniture",
  "shade nets Ethiopia",
  "fragrances flavors Ethiopia",
  "industrial supply Ethiopia",
  "B2B import Ethiopia",
];

export function absoluteUrl(path = ""): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function itemKeywords(
  name: string,
  extras: string[] = []
): string[] {
  return [
    ...extras,
    name,
    `${name} Ethiopia`,
    `${name} Elfakal`,
    `Elfakal ${name}`,
    ...BRAND_ALIASES.slice(0, 6),
  ];
}

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogImage = "/images/hero-bg.png",
  type = "website",
  noIndex = false,
  publishedTime,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const ogTitle = title.includes("Elfakal") ? title : `${title} | Elfakal PLC`;
  const mergedKeywords = [
    ...new Set([...keywords, ...DEFAULT_KEYWORDS.slice(0, 12)]),
  ];

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      type,
      siteName: COMPANY.name,
      locale: "en_US",
      images: [{ url: ogImage, alt: `${ogTitle} — Elfakal PLC` }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

export const HOME_METADATA = buildMetadata({
  title: "Elfakal PLC | Ethiopia Import, Export & Industrial Supply",
  description:
    "Elfakal PLC (Elakal, Elfakal) — Ethiopia's trusted import & export partner for coffee equipment, ecological pulpers, fragrances, library furniture, shade nets, freight forwarding, and customs clearance in Addis Ababa.",
  path: "/",
  keywords: [
    "Elfakal products",
    "Elfakal services",
    "Elfakal projects",
    "Elfakal coffee equipment",
    "Elfakal library furniture",
  ],
});

export const FAQ_ITEMS = [
  {
    question: "What is Elfakal PLC?",
    answer:
      "Elfakal PLC (also known as Elakal or Elfakal) is an Ethiopian import and export company based in Addis Ababa, supplying coffee equipment, fragrances, library systems, shade nets, and trade logistics services nationwide.",
  },
  {
    question: "What products does Elfakal supply?",
    answer:
      "Elfakal supplies ecological pulpers, coffee dryers, shade nets, personal care fragrances, Gaylord library furniture, archival supplies, and detergents — sourced from the USA, Europe, India, and China.",
  },
  {
    question: "What services does Elfakal offer?",
    answer:
      "Elfakal provides import services, export services, freight forwarding, customs clearance, product sourcing, and trade consultancy for institutional and industrial clients across Ethiopia.",
  },
  {
    question: "Where is Elfakal located?",
    answer:
      "Elfakal PLC is located at Garad Building, Teklehaimanot Road, 10th Floor, Addis Ababa, Ethiopia. Contact +251 11 157 5555 or elfakal@gmail.com.",
  },
  {
    question: "Does Elfakal handle coffee factory equipment projects?",
    answer:
      "Yes. Elfakal has completed coffee factory equipment supply projects including ecological pulpers and processing lines for exporters in Sidama and across Ethiopia.",
  },
];
