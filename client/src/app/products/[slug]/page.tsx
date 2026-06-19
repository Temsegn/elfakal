import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Package, FileText } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { getProductBySlug, getProducts } from "@/lib/data";
import { absoluteUrl, buildMetadata, itemKeywords } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return buildMetadata({
    title: `${product.name} — Elfakal PLC Ethiopia`,
    description: `${product.description} Available from Elfakal PLC in Ethiopia. Category: ${product.categoryName}. Origin: ${product.originCountry}. MOQ: ${product.moq}.`,
    path: `/products/${slug}`,
    keywords: itemKeywords(product.name, [
      product.categoryName,
      "Elfakal products",
      `${product.categoryName} Ethiopia`,
    ]),
    ogImage: product.image,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: absoluteUrl(product.image),
          category: product.categoryName,
          brand: { "@type": "Organization", name: "Elfakal PLC" },
          manufacturer: { "@type": "Organization", name: "Elfakal PLC" },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Elfakal PLC" },
            eligibleRegion: "ET",
          },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${slug}` },
        ]}
      />
      <PageHeader
        title={product.name}
        description={product.description}
        breadcrumb="Products"
        image={product.image}
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue font-medium text-sm mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            Back to Catalog
          </Link>

          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
            <div>
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-blue/10 text-blue mb-4">
                {product.categoryName}
              </span>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <Globe size={18} className="text-blue" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Origin Country</p>
                    <p className="font-medium text-navy">{product.originCountry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Package size={18} className="text-blue" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Minimum Order Quantity</p>
                    <p className="font-medium text-navy">{product.moq}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
              <Button
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                variant="primary"
                size="lg"
              >
                Send Product Inquiry
              </Button>
            </div>
          </div>

          {product.specifications.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-navy mb-6 font-[family-name:var(--font-plus-jakarta)]">
                Specifications
              </h2>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 font-medium text-navy w-1/3">
                          {spec.label}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {product.documents.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-navy mb-6 font-[family-name:var(--font-plus-jakarta)]">
                Documents
              </h2>
              <div className="space-y-3">
                {product.documents.map((doc) => (
                  <a
                    key={doc.title}
                    href={doc.url}
                    className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue transition-colors"
                  >
                    <FileText size={20} className="text-blue" />
                    <span className="font-medium text-navy">{doc.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
