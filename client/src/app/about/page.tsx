import type { Metadata } from "next";
import { Target, Eye, Users, Award } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import { COMPANY } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Elfakal PLC",
  description:
    "About Elfakal PLC (Elakal, Elfakal) — Ethiopia's diversified import and export company in Addis Ababa, serving coffee equipment, fragrances, library systems, and shade nets.",
  path: "/about",
  keywords: [
    "About Elfakal",
    "Elfakal company",
    "Elakal Ethiopia",
    "Elfakal Addis Ababa",
    "Elfakal history",
  ],
});

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To bridge global suppliers with Ethiopian institutions by delivering high-quality products, reliable import services, and exceptional customer support across multiple industries.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be Ethiopia's most trusted and diversified industrial supply partner, recognized for quality, integrity, and innovation in serving institutional clients nationwide.",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A dedicated team of procurement specialists, logistics coordinators, and industry experts working together to deliver seamless import and distribution services.",
  },
  {
    icon: Award,
    title: "Our Values",
    description:
      "Integrity, quality assurance, customer focus, and long-term partnerships guide every import, export, and supply project we undertake.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Elfakal PLC"
        description="Ethiopia's trusted import, export, and industrial supply partner."
        breadcrumb="About"
        image="/images/about.png"
      />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            label="Company Overview"
            title="Who We Are"
            centered={false}
          />
          <p className="text-gray-600 leading-relaxed mb-6">
            <strong>{COMPANY.name}</strong> — often searched as{" "}
            <em>Elakal</em>, <em>Elfakal</em>, or <em>Elf Elakal</em> — is an
            Ethiopian private limited company headquartered in Addis Ababa. We
            import and distribute coffee processing equipment, fragrances and
            flavors, library and archival supplies, furniture, and shade nets for
            farms, manufacturers, universities, and institutions across Ethiopia.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {COMPANY.description} Our trade services include import management,
            export coordination, freight forwarding, customs clearance, and
            technical consultation — connecting clients with suppliers in the
            United States, Europe, India, and China.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From ecological pulpers and coffee dryers to Gaylord® library
            furniture and shade net installations, Elfakal PLC delivers
            end-to-end sourcing, logistics, and after-sales support for every
            project we undertake.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="What Drives Us"
            title="Mission, Vision & Values"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 card-hover"
              >
                <div className="w-14 h-14 bg-blue/10 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon size={28} className="text-blue" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 font-[family-name:var(--font-plus-jakarta)]">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
