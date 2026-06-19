import {
  Globe,
  ShieldCheck,
  Award,
  HeartHandshake,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_CHOOSE } from "@/lib/constants";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Globe,
  ShieldCheck,
  Award,
  HeartHandshake,
};

export default function WhyChoose() {
  return (
    <section className="py-28 bg-gray-50 relative overflow-hidden">
      {/* Curved top */}
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-auto block rotate-180"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative pt-8">
        <SectionHeading
          label="Why Elfakal"
          title="Why Choose Elfakal"
          description="Decades of experience, global sourcing capabilities, and unwavering commitment to quality make us the preferred partner for institutional buyers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item, index) => {
            const Icon = iconMap[item.icon] || Globe;
            return (
              <div
                key={item.title}
                className="group relative bg-white rounded-xl p-8 border border-gray-100 card-hover text-center overflow-hidden"
              >
                {/* Decorative number */}
                <span className="absolute -top-4 -right-2 text-7xl font-bold text-gray-50 font-[family-name:var(--font-plus-jakarta)] select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue/10 to-blue/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue group-hover:to-blue-light group-hover:scale-110 transition-all duration-300">
                    <Icon
                      size={32}
                      className="text-blue group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-3 font-[family-name:var(--font-plus-jakarta)]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom curved accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
