import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/ui/ServiceCard";
import { PROCESS_STEPS } from "@/lib/constants";
import { getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Import, Export & Trade Services",
  description:
    "Elfakal PLC services — import, export, freight forwarding, customs clearance, product sourcing, and trade consultancy for institutional clients across Ethiopia.",
  path: "/services",
  keywords: [
    "Elfakal services",
    "Elfakal import services",
    "Elfakal freight forwarding",
    "Elfakal customs clearance",
    "import export Addis Ababa",
  ],
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHeader
        title="Trade Services"
        description="End-to-end import, export, logistics, and customs services for institutional and international clients."
        breadcrumb="Services"
        image="/images/about.png"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="How It Works"
            title="Our Service Process"
            description="A transparent, step-by-step process ensuring quality and reliability from start to finish."
          />
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {PROCESS_STEPS.map((step) => (
                <div key={step.step} className="text-center relative">
                  <div className="w-12 h-12 bg-blue text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 relative z-10">
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-navy text-sm mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-plus-jakarta)]">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Contact our team to discuss your import, export, or logistics requirements.
          </p>
          <Button href="/contact" variant="gold" size="lg">
            Start Business Inquiry
          </Button>
        </div>
      </section>
    </>
  );
}
