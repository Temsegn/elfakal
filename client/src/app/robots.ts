import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elfakal.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Explicitly allow major crawlers
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Slurp", allow: "/" },       // Yahoo
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "LinkedInBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
