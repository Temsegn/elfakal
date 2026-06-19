"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, COMPANY } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // When the mobile menu is open we always want a solid background
  const solid = scrolled || isOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      {/* Top bar — only visible at the very top */}
      <div
        className={`hidden md:block text-sm transition-all duration-300 overflow-hidden ${
          scrolled
            ? "max-h-0 opacity-0"
            : "max-h-12 opacity-100 bg-navy/40 backdrop-blur-sm text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY.phone.main}`}
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone size={14} />
              {COMPANY.phone.main}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Mail size={14} />
              {COMPANY.email}
            </a>
          </div>
          <span className="text-gray-200">
            {COMPANY.address.city}, {COMPANY.address.country}
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`transition-all duration-300 ${
          solid
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className={`relative w-11 h-11 transition-transform group-hover:scale-105 ${
                  solid ? "" : "drop-shadow-lg"
                }`}
              >
                <Image
                  src="/images/logo-mark.png"
                  alt="Elfakal PLC logo"
                  fill
                  className="object-contain"
                  sizes="44px"
                  priority
                />
              </div>
              <div className="leading-tight">
                <span
                  className={`block font-bold text-lg font-[family-name:var(--font-plus-jakarta)] transition-colors ${
                    solid ? "text-navy" : "text-white"
                  }`}
                >
                  ELFAKAL
                </span>
                <span
                  className={`block text-[10px] tracking-wide -mt-0.5 transition-colors ${
                    solid ? "text-gray-500" : "text-gray-200"
                  }`}
                >
                  Pvt. Ltd. Co.
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    solid
                      ? "text-gray-600 hover:text-blue hover:bg-blue/5"
                      : "text-gray-100 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  solid
                    ? "bg-navy text-white hover:bg-navy-light"
                    : "bg-gold text-navy hover:bg-gold-light"
                }`}
              >
                Request Quote
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden shrink-0 p-2 rounded-lg transition-colors ${
                solid
                  ? "text-navy hover:bg-navy/5"
                  : "text-white bg-white/10 backdrop-blur-sm"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — slides in from right (kept outside the blurred nav so
          backdrop-filter does not trap the fixed positioning) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-[110] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              aria-hidden
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[min(100%,20rem)] bg-white shadow-2xl z-[120] lg:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
                <span className="font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
                  Menu
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-navy hover:bg-navy/5 rounded-lg"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3.5 text-gray-700 hover:text-blue hover:bg-blue/5 rounded-xl font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.05 + NAV_LINKS.length * 0.05,
                    duration: 0.35,
                  }}
                  className="pt-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3.5 bg-navy text-white text-center rounded-xl font-semibold hover:bg-navy-light transition-colors"
                  >
                    Request Quote
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
