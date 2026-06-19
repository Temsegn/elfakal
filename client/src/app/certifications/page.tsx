import type { Metadata } from "next";
import { Award, Download } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { getCertifications } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Certifications & Licenses",
  description:
    "Elfakal PLC trade licenses, export permits, quality certificates, and customs compliance documentation for international buyers in Ethiopia.",
  path: "/certifications",
  keywords: ["Elfakal certifications", "Elfakal trade license", "Elfakal export permit"],
});

const categoryColors: Record<string, string> = {
  "Trade License": "bg-blue-100 text-blue-700",
  "Specialized License": "bg-purple-100 text-purple-700",
  Compliance: "bg-green-100 text-green-700",
  "Quality Certificate": "bg-amber-100 text-amber-700",
};

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <>
      <PageHeader
        title="Certifications & Licenses"
        description="Trade credentials and compliance documentation that international partners and buyers require."
        breadcrumb="Certifications"
        image="/images/service-import.png"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Compliance"
            title="Verified Trade Credentials"
            description="Elfakal holds multiple import, export, and specialized trade licenses enabling operations across diverse sectors."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.slug}
                className="bg-white border border-gray-200 rounded-2xl p-8 card-hover flex flex-col"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <Award size={28} className="text-gold" />
                </div>
                <span
                  className={`inline-block self-start text-xs font-medium px-3 py-1 rounded-full mb-4 ${
                    categoryColors[cert.category] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {cert.category}
                </span>
                <h3 className="text-lg font-bold text-navy mb-3 font-[family-name:var(--font-plus-jakarta)]">
                  {cert.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {cert.description}
                </p>
                <div className="text-xs text-gray-400 space-y-1 pt-4 border-t border-gray-100">
                  <p>Issued by: {cert.issuer}</p>
                  {cert.issuedAt && (
                    <p>
                      Issued:{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(new Date(cert.issuedAt))}
                    </p>
                  )}
                </div>
                {cert.documentUrl && (
                  <a
                    href={cert.documentUrl}
                    className="mt-4 inline-flex items-center gap-2 text-blue text-sm font-medium hover:underline"
                  >
                    <Download size={16} />
                    Download Document
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Need Verification Documents?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Contact us to request copies of trade licenses and compliance
            documentation for your procurement process.
          </p>
          <Button href="/contact" variant="gold" size="lg">
            Request Documentation
          </Button>
        </div>
      </section>
    </>
  );
}
