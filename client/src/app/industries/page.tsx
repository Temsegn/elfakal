import type { Metadata } from "next";
import {
  Wheat,
  FlaskConical,
  Sparkles,
  GraduationCap,
  Armchair,
  Building2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { INDUSTRIES } from "@/lib/constants";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries We Serve",
  description:
    "Industries served by Elfakal PLC — agriculture & coffee, fragrances & flavors, cosmetics & soaps, library & archives, furniture, and shade nets in Ethiopia.",
  path: "/industries",
  keywords: [
    "Elfakal industries",
    "Elfakal coffee industry",
    "Elfakal library industry",
    "Elfakal agriculture Ethiopia",
  ],
});

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wheat,
  FlaskConical,
  Sparkles,
  GraduationCap,
  Armchair,
  Building2,
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        title="Industries We Serve"
        description="Diversified expertise across multiple sectors, delivering specialized products to institutional clients."
        breadcrumb="Industries"
        image="/images/chemicals.png"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {INDUSTRIES.map((industry, index) => {
            const Icon = iconMap[industry.icon] || Building2;
            const isEven = index % 2 === 0;

            return (
              <div
                key={industry.id}
                id={industry.id}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 items-center`}
              >
                <div className="lg:w-1/2">
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${industry.color} rounded-2xl flex items-center justify-center relative overflow-hidden`}
                  >
                    <Icon size={80} className="text-white/30" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-6 left-6">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Icon size={28} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <span className="text-blue text-sm font-semibold tracking-wider uppercase mb-2 block">
                    Industry {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-3xl font-bold text-navy mb-4 font-[family-name:var(--font-plus-jakarta)]">
                    {industry.title}
                  </h2>
                  <div className="gold-line mb-6" />
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {industry.description}
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-blue font-medium hover:gap-3 transition-all"
                  >
                    View Products <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
