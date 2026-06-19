import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Package, Route } from "lucide-react";
import type { Project } from "@/lib/api/types";

const industryColors: Record<string, string> = {
  "Agro Industry": "bg-green-500/90 text-white",
  "Library & Archives": "bg-amber-500/90 text-white",
  "Cosmetics & Soaps": "bg-pink-500/90 text-white",
  "Shade Nets": "bg-cyan-500/90 text-white",
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden card-hover shadow-sm"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover image-hover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-white text-sm font-medium">{project.year}</span>
        </div>
        <div className="absolute bottom-4 left-5">
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded-full ${
              industryColors[project.industry] || "bg-gray-500/90 text-white"
            }`}
          >
            {project.industry}
          </span>
        </div>
      </div>
      <div className="p-7">
        <h3 className="text-xl font-bold text-navy mb-3 font-[family-name:var(--font-plus-jakarta)] group-hover:text-blue transition-colors">
          {project.title}
        </h3>
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-blue shrink-0" />
            {project.country}
          </div>
          {project.volume && (
            <div className="flex items-center gap-2">
              <Package size={14} className="text-blue shrink-0" />
              {project.volume}
            </div>
          )}
          {project.logisticsRoute && (
            <div className="flex items-center gap-2">
              <Route size={14} className="text-blue shrink-0" />
              <span className="line-clamp-1">{project.logisticsRoute}</span>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <span className="inline-flex items-center gap-1.5 mt-4 text-blue font-medium text-sm group-hover:gap-2.5 transition-all">
          View Case Study <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
