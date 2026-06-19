import Image from "next/image";
import { ArrowRight, ChevronDown, Globe, Shield, Truck } from "lucide-react";
import Button from "@/components/ui/Button";
import CurvedLine from "@/components/ui/CurvedLine";
import { COMPANY, METRICS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.png"
        alt="Industrial supply and import operations"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />

      {/* Decorative curved lines */}
      <svg
        className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        viewBox="0 0 400 800"
        fill="none"
      >
        <path
          d="M400 0 Q200 200, 400 400 T400 800"
          stroke="#D4A017"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M350 0 Q150 250, 350 500 T350 800"
          stroke="#2563EB"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className="decorative-circle w-64 h-64 -top-20 -right-20" />
      <div className="decorative-circle w-40 h-40 bottom-40 left-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-24 sm:pt-32 lg:pt-32 lg:pb-24 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gray-200 text-xs sm:text-sm font-medium">
                Elfakal PLC — Addis Ababa, Ethiopia
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug sm:leading-[1.1] mb-5 sm:mb-6 font-[family-name:var(--font-plus-jakarta)] text-balance">
              Elfakal PLC — Global Import & Export{" "}
              <span className="gradient-text">Solutions</span>
              <span className="hidden sm:inline">
                <br />
              </span>{" "}
              from Ethiopia
            </h1>

            <div className="flex justify-center lg:justify-start">
              <CurvedLine className="mb-5 sm:mb-6" />
            </div>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0">
              {COMPANY.description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Button href="/products" variant="primary" size="lg">
                Explore Products
                <ArrowRight size={20} />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Send Inquiry
              </Button>
            </div>

            {/* Quick trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
              {[
                { icon: Globe, text: "Global Sourcing" },
                { icon: Shield, text: "Quality Assured" },
                { icon: Truck, text: "Nationwide Delivery" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2">
                  <badge.icon size={16} className="text-gold" />
                  <span className="text-gray-400 text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Metrics cards (desktop layout) */}
          <div className="hidden lg:grid grid-cols-2 gap-5">
            {METRICS.map((metric, i) => (
              <div
                key={metric.label}
                className={`glass-card rounded-2xl p-6 text-center ${
                  i === 0 ? "col-span-2 pulse-glow" : ""
                }`}
              >
                <div className="text-3xl md:text-4xl font-bold text-gold mb-2 font-[family-name:var(--font-plus-jakarta)]">
                  {metric.value}
                </div>
                <div className="text-gray-300 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics row (mobile & tablet) — horizontal */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10 lg:hidden">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="glass-card rounded-xl px-2 py-4 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gold mb-1 font-[family-name:var(--font-plus-jakarta)]">
                {metric.value}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:block absolute bottom-16 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="text-navy/30" size={28} />
      </div>
    </section>
  );
}
