import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import { HOME_METADATA, SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elfakal PLC | Ethiopia Import, Export & Industrial Supply",
    template: "%s | Elfakal PLC",
  },
  description: HOME_METADATA.description,
  keywords: HOME_METADATA.keywords,
  alternates: HOME_METADATA.alternates,
  robots: HOME_METADATA.robots,
  openGraph: HOME_METADATA.openGraph,
  twitter: HOME_METADATA.twitter,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <OrganizationJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
