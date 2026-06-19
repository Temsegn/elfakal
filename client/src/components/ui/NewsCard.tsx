import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import {
  formatNewsDate,
  NEWS_CATEGORY_COLORS,
} from "@/lib/data";
import type { NewsItem } from "@/lib/api/types";

interface NewsCardProps {
  article: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className={`group block bg-white border border-gray-200 rounded-2xl overflow-hidden card-hover ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-72" : "h-56"}`}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover image-hover"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
              NEWS_CATEGORY_COLORS[article.category] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {article.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <h3
            className={`font-bold text-white font-[family-name:var(--font-plus-jakarta)] group-hover:text-gold transition-colors ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {article.title}
          </h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <Calendar size={14} />
          <time dateTime={article.publishedAt}>
            {formatNewsDate(article.publishedAt)}
          </time>
        </div>
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
        <span className="inline-flex items-center gap-1.5 mt-4 text-blue font-medium text-sm group-hover:gap-2.5 transition-all">
          Read More
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
