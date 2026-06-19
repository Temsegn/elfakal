import { Shield, Award, FileCheck } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { PARTNERS } from "@/lib/constants";
import { getCertifications } from "@/lib/data";

export default async function Trust() {
  const certifications = await getCertifications();
  const featured = certifications.filter((c) => c.featured).slice(0, 4);

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Trust & Compliance"
          title="Built for International Trade"
          description="Licensed, certified, and partnered with global suppliers — the credentials international buyers expect."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: "Licensed Importer & Exporter",
              description:
                "Fully licensed for general and specialized import/export across multiple trade categories.",
            },
            {
              icon: FileCheck,
              title: "Customs Compliance",
              description:
                "Registered customs operations ensuring smooth clearance at Ethiopian ports and borders.",
            },
            {
              icon: Award,
              title: "Quality Assured",
              description:
                "Rigorous supplier verification and quality control at every stage of the trade process.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-gray-200 rounded-2xl p-8 text-center card-hover"
            >
              <div className="w-14 h-14 bg-blue/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <item.icon size={28} className="text-blue" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-3 font-[family-name:var(--font-plus-jakarta)]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {featured.map((cert) => (
            <div
              key={cert.slug}
              className="bg-white border border-gray-200 rounded-xl p-5 text-center card-hover"
            >
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award size={20} className="text-gold" />
              </div>
              <h4 className="text-sm font-semibold text-navy mb-1">
                {cert.title}
              </h4>
              <p className="text-xs text-gray-500">{cert.category}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-blue font-medium hover:underline"
          >
            View All Certifications & Licenses
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8">
            Global Trade Partners
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {PARTNERS.map((partner) => (
              <span
                key={partner}
                className="text-navy/60 font-medium text-sm hover:text-navy transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
