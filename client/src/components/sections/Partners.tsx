import { Globe } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { PARTNERS } from "@/lib/constants";

export default function Partners() {
  return (
    <section className="py-28 relative section-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Partners"
          title="Our International Partners"
          description="Collaborating with trusted suppliers from the United States, India, China, and beyond."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              className="group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center h-28 card-hover shadow-sm relative overflow-hidden"
            >
              <Globe
                size={20}
                className="text-blue/20 mb-2 group-hover:text-blue/40 transition-colors"
              />
              <span className="text-gray-600 text-xs font-semibold text-center leading-tight group-hover:text-navy transition-colors">
                {partner}
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Trust banner */}
        <div className="mt-14 bg-gradient-to-r from-navy via-navy-light to-navy rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          <div className="relative text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-plus-jakarta)]">
              Sourcing from 3 Continents
            </h3>
            <p className="text-gray-400 text-sm">
              United States &bull; India &bull; China
            </p>
          </div>
          <div className="relative flex gap-8">
            {[
              { flag: "🇺🇸", label: "USA" },
              { flag: "🇮🇳", label: "India" },
              { flag: "🇨🇳", label: "China" },
            ].map((country) => (
              <div key={country.label} className="text-center">
                <span className="text-3xl">{country.flag}</span>
                <p className="text-gray-400 text-xs mt-1">{country.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
