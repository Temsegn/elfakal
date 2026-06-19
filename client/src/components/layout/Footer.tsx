import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import CatalogSeoLinks from "@/components/seo/CatalogSeoLinks";
import { COMPANY, NAV_LINKS, INDUSTRIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 bg-white rounded-lg p-1">
                <Image
                  src="/images/logo-mark.png"
                  alt="Elfakal PLC logo"
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="font-bold text-lg font-[family-name:var(--font-plus-jakarta)]">
                  ELFAKAL
                </span>
                <span className="block text-xs text-gray-400 -mt-0.5">
                  Pvt. Ltd. Co.
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {COMPANY.name} — Ethiopia&apos;s trusted industrial supply and
              import partner. Coffee equipment, fragrances, library systems,
              shade nets, and trade logistics from Addis Ababa.
            </p>
            <div className="flex gap-3">
              {[Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-[family-name:var(--font-plus-jakarta)]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-[family-name:var(--font-plus-jakarta)]">
              Industries
            </h3>
            <ul className="space-y-3">
              {INDUSTRIES.map((ind) => (
                <li key={ind.id}>
                  <Link
                    href={`/industries#${ind.id}`}
                    className="text-gray-400 text-sm hover:text-gold transition-colors"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6 font-[family-name:var(--font-plus-jakarta)]">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  {COMPANY.address.building}, {COMPANY.address.street}
                  <br />
                  {COMPANY.address.floor}
                  <br />
                  {COMPANY.address.city}, {COMPANY.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold shrink-0" />
                <a
                  href={`tel:${COMPANY.phone.main}`}
                  className="text-gray-400 text-sm hover:text-gold transition-colors"
                >
                  {COMPANY.phone.main}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-gray-400 text-sm hover:text-gold transition-colors"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={18} className="text-gold shrink-0" />
                <span className="text-gray-400 text-sm">{COMPANY.website}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <CatalogSeoLinks />

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
            reserved.
          </p>
          <p className="text-gray-500 text-sm">
            {COMPANY.legalName} | {COMPANY.address.poBox}
          </p>
        </div>
      </div>
    </footer>
  );
}
