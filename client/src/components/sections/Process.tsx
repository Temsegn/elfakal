import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/90" />

      {/* Decorative curved lines */}
      <svg
        className="absolute top-0 left-0 w-full h-20"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,0 L0,0 Z"
          fill="#f8fafc"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 pt-8">
        <SectionHeading
          label="Our Process"
          title="International Procurement Process"
          description="A streamlined, transparent process from requirement to delivery — ensuring quality at every step."
          light
        />

        {/* Timeline connector for desktop */}
        <div className="hidden lg:block absolute top-[280px] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-gold/20 via-gold/60 to-gold/20" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="group relative glass-card rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center text-navy font-bold text-xl shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-[family-name:var(--font-plus-jakarta)]">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,30 1440,40 L1440,80 L0,80 Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}
