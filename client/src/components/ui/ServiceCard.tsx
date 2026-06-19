"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Ship,
  Search,
  ClipboardList,
  Truck,
  Lightbulb,
  Globe,
} from "lucide-react";
import type { Service } from "@/lib/api/types";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Ship,
  Search,
  ClipboardList,
  Truck,
  Lightbulb,
  Globe,
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Ship;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden card-hover group hover:border-gold/40 shadow-sm"
    >
      <div className="relative h-44 overflow-hidden shrink-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover image-hover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold transition-colors">
            <Icon
              size={24}
              className="text-white group-hover:text-navy transition-colors"
            />
          </div>
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-white text-lg font-bold font-[family-name:var(--font-plus-jakarta)]">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
          {service.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-blue text-sm font-semibold group-hover:gap-2.5 transition-all">
          Learn More <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
