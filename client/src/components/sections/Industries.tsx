import Image from "next/image";
import {
  Wheat,
  FlaskConical,
  Sparkles,
  GraduationCap,
  Armchair,
  Building2,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/constants";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Wheat,
  FlaskConical,
  Sparkles,
  GraduationCap,
  Armchair,
  Building2,
};

const industryImages: Record<string, string> = {
  agro: "/images/coffee-equipment.png",
  fragrances: "/images/chemicals.png",
  cosmetics: "/images/pharma.png",
  library: "/images/library.png",
  furniture: "/images/furniture.png",
  shadenets: "/images/dairy.png",
};

export default function Industries() {
  return (
    <section className="py-28 bg-gray-50 relative overflow-hidden">
      {/* Curved top decoration */}
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
          label="Industries"
          title="Industries We Serve"
          description="Diversified expertise across multiple sectors, delivering specialized products and solutions to institutional clients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((industry) => {
            const Icon = iconMap[industry.icon] || Building2;
            return (
              <div
                key={industry.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 card-hover shadow-sm"
              >
                {/* Image header — hidden on mobile */}
                <div className="relative h-44 overflow-hidden hidden md:block">
                  <Image
                    src={industryImages[industry.id] || "/images/about.png"}
                    alt={industry.title}
                    fill
                    className="object-cover image-hover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${industry.color} opacity-60 mix-blend-multiply`}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-xl font-bold text-navy mb-3 font-[family-name:var(--font-plus-jakarta)] group-hover:text-blue transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>
                  <a
                    href={`/industries#${industry.id}`}
                    className="inline-flex items-center gap-2 text-blue text-sm font-medium group-hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
