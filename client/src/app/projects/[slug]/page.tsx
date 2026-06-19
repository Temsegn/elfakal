import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Package, Route, CheckCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { absoluteUrl, buildMetadata, itemKeywords } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return buildMetadata({
    title: `${project.title} — Elfakal Case Study`,
    description: `${project.description} Completed by Elfakal PLC in ${project.country || "Ethiopia"}. Industry: ${project.industry}.`,
    path: `/projects/${slug}`,
    keywords: itemKeywords(project.title, [
      project.industry,
      "Elfakal projects",
      `${project.industry} Ethiopia`,
    ]),
    ogImage: project.image,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: project.title,
          description: project.description,
          image: absoluteUrl(project.image),
          author: { "@type": "Organization", name: "Elfakal PLC" },
          publisher: { "@type": "Organization", name: "Elfakal PLC" },
          about: project.industry,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${slug}` },
        ]}
      />
      <PageHeader
        title={project.title}
        description={project.description}
        breadcrumb="Projects"
        image={project.image}
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-blue font-medium text-sm mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: MapPin, label: "Country", value: project.country },
              { icon: Package, label: "Volume", value: project.volume },
              { icon: Route, label: "Logistics Route", value: project.logisticsRoute },
              { icon: CheckCircle, label: "Year", value: project.year },
            ]
              .filter((item) => item.value)
              .map((item) => (
                <div
                  key={item.label}
                  className="bg-white border border-gray-200 rounded-xl p-5"
                >
                  <item.icon size={18} className="text-blue mb-2" />
                  <p className="text-xs text-gray-400 uppercase mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-navy">{item.value}</p>
                </div>
              ))}
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none mb-10">
            {project.content.map((paragraph, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {project.outcome && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-10">
              <h2 className="text-lg font-bold text-navy mb-3 font-[family-name:var(--font-plus-jakarta)]">
                Outcome
              </h2>
              <p className="text-gray-600 leading-relaxed">{project.outcome}</p>
            </div>
          )}

          <div className="text-center">
            <Button href="/contact" variant="primary" size="lg">
              Discuss a Similar Project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
