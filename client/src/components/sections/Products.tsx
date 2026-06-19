import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CatalogProductCard from "@/components/ui/CatalogProductCard";
import { getProducts } from "@/lib/data";

export default async function Products() {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-28 relative section-pattern overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <SectionHeading
          label="Products"
          title="Featured Products"
          description="B2B trade catalog — origin countries, MOQ, and inquiry-based pricing from trusted global suppliers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {featured.map((product) => (
            <CatalogProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button href="/products" variant="primary" size="lg">
            Explore Full Catalog
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
