import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import NewsCard from "@/components/ui/NewsCard";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import JsonLdScript from "@/components/seo/JsonLdScript";
import {
  formatNewsDate,
  getNews,
  getNewsBySlug,
  getRelatedNews,
  NEWS_CATEGORY_COLORS,
} from "@/lib/data";
import { absoluteUrl, buildMetadata, itemKeywords } from "@/lib/seo";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return buildMetadata({
    title: article.title,
    description: `${article.excerpt} — News from Elfakal PLC, Ethiopia import and export company.`,
    path: `/news/${slug}`,
    keywords: itemKeywords(article.title, [
      article.category,
      "Elfakal news",
      "Elfakal updates",
    ]),
    ogImage: article.image,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedNews = await getRelatedNews(slug);

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.title,
          description: article.excerpt,
          image: absoluteUrl(article.image),
          datePublished: article.publishedAt,
          author: {
            "@type": "Person",
            name: article.author,
          },
          publisher: {
            "@type": "Organization",
            name: "Elfakal PLC",
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/images/logo.png"),
            },
          },
          articleSection: article.category,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: article.title, path: `/news/${slug}` },
        ]}
      />
      <PageHeader
        title={article.title}
        description={article.excerpt}
        breadcrumb="News"
        image={article.image}
      />

      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-blue font-medium text-sm mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            Back to News
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
                NEWS_CATEGORY_COLORS[article.category] ||
                "bg-gray-100 text-gray-700"
              }`}
            >
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={14} />
              <time dateTime={article.publishedAt}>
                {formatNewsDate(article.publishedAt)}
              </time>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <User size={14} />
              <span>{article.author}</span>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      {relatedNews.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-10 font-[family-name:var(--font-plus-jakarta)]">
              Related News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((item) => (
                <NewsCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
