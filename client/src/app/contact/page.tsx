import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import InquiryForm from "@/components/sections/InquiryForm";
import LocationMap from "@/components/ui/LocationMap";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import { COMPANY } from "@/lib/constants";
import { buildMetadata, FAQ_ITEMS } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Elfakal PLC",
  description:
    "Contact Elfakal PLC (Elakal, Elfakal) in Addis Ababa — request quotations for coffee equipment, library furniture, shade nets, import services, and trade inquiries.",
  path: "/contact",
  keywords: [
    "Contact Elfakal",
    "Elfakal phone number",
    "Elfakal email",
    "Elfakal Addis Ababa address",
    "Elfakal inquiry",
  ],
});

interface ContactPageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { product } = await searchParams;

  return (
    <>
      <FaqJsonLd />
      <PageHeader
        title="Contact & Inquiry"
        description="Start a business inquiry — our trade team responds within 24 hours."
        breadcrumb="Contact"
        image="/images/dairy.png"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin size={24} className="text-blue" />
                </div>
                <h3 className="font-bold text-navy mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {COMPANY.address.building}
                  <br />
                  {COMPANY.address.street}
                  <br />
                  {COMPANY.address.floor}
                  <br />
                  {COMPANY.address.city}, {COMPANY.address.country}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone size={24} className="text-blue" />
                </div>
                <h3 className="font-bold text-navy mb-2">Call Us</h3>
                <div className="space-y-1">
                  <a href={`tel:${COMPANY.phone.main}`} className="block text-gray-600 text-sm hover:text-blue transition-colors">
                    {COMPANY.phone.main}
                  </a>
                  <a href={`tel:${COMPANY.phone.mobile}`} className="block text-gray-600 text-sm hover:text-blue transition-colors">
                    Mobile: {COMPANY.phone.mobile}
                  </a>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} className="text-blue" />
                </div>
                <h3 className="font-bold text-navy mb-2">Email Us</h3>
                <a href={`mailto:${COMPANY.email}`} className="text-gray-600 text-sm hover:text-blue transition-colors">
                  {COMPANY.email}
                </a>
              </div>

              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-6 card-hover hover:bg-green-100 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-navy">WhatsApp</h3>
                  <p className="text-gray-600 text-sm">Chat with our trade team</p>
                </div>
              </a>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 card-hover">
                <div className="w-12 h-12 bg-blue/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock size={24} className="text-blue" />
                </div>
                <h3 className="font-bold text-navy mb-2">Business Hours</h3>
                <p className="text-gray-600 text-sm">
                  Monday – Friday: 8:30 AM – 5:30 PM
                  <br />
                  Saturday: 8:30 AM – 12:30 PM
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <InquiryForm defaultProduct={product || ""} />
            </div>
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-navy mb-8 font-[family-name:var(--font-plus-jakarta)]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.question}
                  className="bg-white border border-gray-200 rounded-2xl p-6"
                >
                  <h3 className="font-semibold text-navy mb-2">{item.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <LocationMap heightClass="h-[400px]" />
          </div>
        </div>
      </section>
    </>
  );
}
