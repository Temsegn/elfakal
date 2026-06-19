import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import NewsCard from "@/components/ui/NewsCard";
import { getNews } from "@/lib/data";

export default async function News() {
  const news = await getNews();
  const latestNews = news.slice(0, 3);

  return (
    <section className="py-28 relative section-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Insights"
          title="News & Market Updates"
          description="Trade trends, logistics updates, and company announcements from Elfakal PLC."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button href="/news" variant="secondary" size="lg">
            View All Insights
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
