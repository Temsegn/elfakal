import { COMPANY } from "@/lib/constants";
import { absoluteUrl, BRAND_ALIASES, SITE_URL } from "@/lib/seo";
import JsonLdScript from "./JsonLdScript";

export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "TradingBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        alternateName: BRAND_ALIASES,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/logo.png"),
          width: 200,
          height: 60,
        },
        image: absoluteUrl("/images/hero-bg.png"),
        description: COMPANY.description,
        foundingDate: "2008",
        foundingLocation: {
          "@type": "Place",
          name: "Addis Ababa, Ethiopia",
        },
        areaServed: {
          "@type": "Country",
          name: "Ethiopia",
          sameAs: "https://www.wikidata.org/wiki/Q115",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Elfakal PLC Products & Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Ecological Pulpers" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Coffee Dryers" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Shade Nets" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gaylord Library Furniture" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Fragrances and Flavors" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Import Services Ethiopia" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Freight Forwarding Ethiopia" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Customs Clearance Ethiopia" } },
          ],
        },
        knowsAbout: [
          "Coffee equipment import Ethiopia",
          "Ecological pulpers Ethiopia",
          "Freight forwarding Ethiopia",
          "Customs clearance Addis Ababa",
          "Library furniture Ethiopia",
          "Shade nets Ethiopia",
          "Fragrances and flavors import",
          "Industrial supply Ethiopia",
          "B2B import export Ethiopia",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: `${COMPANY.address.building}, ${COMPANY.address.street}, ${COMPANY.address.floor}`,
          addressLocality: COMPANY.address.city,
          addressRegion: "Addis Ababa",
          addressCountry: "ET",
          postalCode: COMPANY.address.poBox,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 9.0267,
          longitude: 38.7489,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:30",
            closes: "17:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "08:30",
            closes: "12:30",
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: COMPANY.phone.main,
            contactType: "sales",
            areaServed: "ET",
            availableLanguage: ["English", "Amharic"],
          },
          {
            "@type": "ContactPoint",
            telephone: COMPANY.phone.mobile,
            contactType: "customer service",
            areaServed: "ET",
          },
          {
            "@type": "ContactPoint",
            email: COMPANY.email,
            contactType: "customer support",
          },
        ],
        sameAs: [
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.maps.query)}`,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        alternateName: BRAND_ALIASES,
        description: COMPANY.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return <JsonLdScript data={schema} />;
}
