import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack for production builds (webpack used in dev via `npm run dev`)
  turbopack: {},

  // Optimize images — all images are local so no remote domains needed
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Forward /api/v1/* to the backend in production via env var
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
