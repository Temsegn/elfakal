import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Ship,
  Search,
  ClipboardList,
  Truck,
  Lightbulb,
  Globe,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { getServiceBySlug, getServices } from "@/lib/data";
import { absoluteUrl, buildMetadata, itemKeywords } from "@/lib/seo";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Ship, Search, ClipboardList, Truck, Lightbulb, Globe,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return buildMetadata({
    title: `${service.title} — Elfakal PLC`,
    description: `${service.description} Professional ${service.title.toLowerCase()} by Elfakal PLC for institutional and industrial clients in Ethiopia.`,
    path: `/services/${slug}`,
    keywords: itemKeywords(service.title, [
      "Elfakal services",
      `${service.title} Ethiopia`,
      ...service.industriesServed,
    ]),
    ogImage: service.image,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] || Ship;

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          image: absoluteUrl(service.image),
          provider: { "@type": "Organization", name: "Elfakal PLC" },
          areaServed: { "@type": "Country", name: "Ethiopia" },
          serviceType: service.title,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]}
      />
      <PageHeader
        title={service.title}
        description={service.description}
        breadcrumb="Services"
        image={service.image}
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-blue font-medium text-sm mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>

          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 bg-blue/10 rounded-2xl flex items-center justify-center">
              <Icon size={32} className="text-blue" />
            </div>
            <p className="text-gray-600 leading-relaxed flex-1">
              {service.description}
            </p>
          </div>

          {service.processSteps.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-8 font-[family-name:var(--font-plus-jakarta)]">
                Our Process
              </h2>
              <div className="space-y-6">
                {service.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex gap-6 bg-white border border-gray-200 rounded-2xl p-6 card-hover"
                  >
                    <div className="w-12 h-12 bg-blue text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.industriesServed.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-navy mb-6 font-[family-name:var(--font-plus-jakarta)]">
                Industries Served
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.industriesServed.map((ind) => (
                  <span
                    key={ind}
                    className="px-4 py-2 bg-gray-100 text-navy rounded-full text-sm font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-navy rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-plus-jakarta)]">
              Ready to Get Started?
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Contact our team to discuss your {service.title.toLowerCase()} requirements.
            </p>
            <Button href="/contact" variant="gold" size="lg">
              Start Business Inquiry
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
