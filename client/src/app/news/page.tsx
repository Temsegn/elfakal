import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import NewsCard from "@/components/ui/NewsCard";
import { getNews } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "News & Insights",
  description:
    "Elfakal PLC news — coffee equipment shipments, library installations, trade partnerships, and import/export updates from Addis Ababa, Ethiopia.",
  path: "/news",
  keywords: ["Elfakal news", "Elfakal updates", "Elfakal trade news"],
});

export default async function NewsPage() {
  const news = await getNews();
  const featured = news.find((n) => n.featured) || news[0];
  const rest = news.filter((n) => n.slug !== featured?.slug);

  return (
    <>
      <PageHeader
        title="News & Insights"
        description="Market updates, trade trends, and company announcements from Ethiopia's trusted import partner."
        breadcrumb="News"
        image="/images/service-import.png"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          {featured && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <NewsCard article={featured} featured />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeading
            title="Want to Learn More?"
            description="Get in touch with our team for product inquiries, project consultations, or partnership opportunities."
          />
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue text-white font-medium rounded-lg hover:bg-blue-light transition-colors shadow-lg shadow-blue/25"
          >
            Start Business Inquiry
          </a>
        </div>
      </section>
    </>
  );
}
