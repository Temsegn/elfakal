import { COMPANY } from "@/lib/constants";
import { absoluteUrl, BRAND_ALIASES, SITE_URL } from "@/lib/seo";
import JsonLdScript from "./JsonLdScript";

export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        alternateName: BRAND_ALIASES,
        url: SITE_URL,
        logo: absoluteUrl("/images/logo.png"),
        image: absoluteUrl("/images/hero-bg.png"),
        description: COMPANY.description,
        foundingLocation: {
          "@type": "Place",
          name: "Addis Ababa, Ethiopia",
        },
        areaServed: {
          "@type": "Country",
          name: "Ethiopia",
        },
        knowsAbout: [
          "Coffee equipment import",
          "Ecological pulpers",
          "Freight forwarding",
          "Customs clearance",
          "Library furniture",
          "Shade nets",
          "Fragrances and flavors",
          "Industrial supply",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: `${COMPANY.address.building}, ${COMPANY.address.street}`,
          addressLocality: COMPANY.address.city,
          addressCountry: COMPANY.address.country,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: COMPANY.phone.main,
            email: COMPANY.email,
            contactType: "sales",
            areaServed: "ET",
            availableLanguage: ["English", "Amharic"],
          },
        ],
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        alternateName: BRAND_ALIASES,
        description: COMPANY.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };

  return <JsonLdScript data={schema} />;
}
