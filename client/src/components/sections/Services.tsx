import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/ui/ServiceCard";
import { getServices } from "@/lib/data";

export default async function Services() {
  const services = await getServices();
  const featured = services.filter((s) => s.featured).slice(0, 4);

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Services"
          title="Trade & Logistics Services"
          description="Import, export, freight forwarding, customs clearance, and trade consultancy for institutional clients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button href="/services" variant="secondary" size="lg">
            View All Services
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
