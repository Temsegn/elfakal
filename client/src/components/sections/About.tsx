import Image from "next/image";
import { CheckCircle, Award, Users, Building } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CurvedLine from "@/components/ui/CurvedLine";

const highlights = [
  "Agricultural & coffee equipment supplier",
  "Direct imports from US, India & China",
  "Serving government, universities & enterprises",
  "Nationwide delivery across Ethiopia",
  "Multiple trade licenses across sectors",
  "Quality-assured international sourcing",
];

const stats = [
  { icon: Award, value: "15+", label: "Sectors Served" },
  { icon: Users, value: "100+", label: "Clients Served" },
  { icon: Building, value: "27+", label: "Import Shipments" },
];

export default function About() {
  return (
    <section className="py-28 relative section-pattern overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with decorative frame */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-navy/10">
              <Image
                src="/images/about.png"
                alt="Elfakal PLC corporate office"
                fill
                className="object-cover image-hover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 glass-card-light rounded-2xl p-5 shadow-xl z-10">
              <div className="flex gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon size={20} className="text-blue mx-auto mb-1" />
                    <div className="text-xl font-bold text-navy font-[family-name:var(--font-plus-jakarta)]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative curved border */}
            <div className="absolute -top-5 -left-5 w-full h-full border-2 border-gold/20 rounded-3xl -z-10" />
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-blue/20 rounded-full -z-10" />
          </div>

          {/* Right - Content */}
          <div>
            <SectionHeading
              label="About Us"
              title="Building Ethiopia's Industrial Future"
              centered={false}
            />
            <CurvedLine className="mb-6 -mt-2" />

            <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">
              Elfakal PLC is a diversified Ethiopian trading and import company
              headquartered in Addis Ababa. With operations spanning
              agricultural and coffee equipment, fragrances, flavors and
              cosmetics, library and archival supplies, furniture, and shade
              nets, we serve as a critical link between international suppliers
              and Ethiopian institutions.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              Our commitment to quality, reliability, and customer-centric
              service has made us a preferred partner for government agencies,
              universities, coffee exporters, libraries, and manufacturing
              companies across Ethiopia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm"
                >
                  <CheckCircle
                    size={18}
                    className="text-blue mt-0.5 shrink-0"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
