import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCatalog from "@/components/ui/ProductCatalog";
import { getCategoriesWithProducts } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products — Coffee Equipment, Library Furniture & More",
  description:
    "Elfakal PLC product catalog — ecological pulpers, coffee dryers, shade nets, fragrances, Gaylord library furniture, and archival supplies in Ethiopia. B2B trade with MOQ and origin country.",
  path: "/products",
  keywords: [
    "Elfakal products",
    "Elfakal coffee equipment",
    "Elfakal library furniture",
    "Elfakal shade nets",
    "ecological pulpers Ethiopia",
    "Gaylord library furniture Ethiopia",
  ],
});

export default async function ProductsPage() {
  const categories = await getCategoriesWithProducts();

  return (
    <>
      <PageHeader
        title="Product Catalog"
        description="Browse by category — coffee equipment, fragrances, library furniture, shade nets, and more. Search or filter to find what you need."
        breadcrumb="Products"
        image="/images/coffee-equipment.png"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <ProductCatalog categories={categories} />
        </div>
      </section>

      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeading
            title="Need a Custom Product?"
            description="Can't find what you're looking for? We source products globally. Send us your requirements and we'll find the right supplier."
            light
          />
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors"
          >
            Request Custom Sourcing
            <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </>
  );
}
