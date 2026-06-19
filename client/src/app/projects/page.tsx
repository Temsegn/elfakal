import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects & Case Studies",
  description:
    "Elfakal PLC projects — coffee factory equipment in Sidama, university library installations, fragrances supply, and shade net projects across Ethiopia.",
  path: "/projects",
  keywords: [
    "Elfakal projects",
    "Elfakal coffee factory project",
    "Elfakal library installation",
    "Elfakal shade net project",
    "coffee equipment Sidama",
  ],
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        title="Projects & Case Studies"
        description="Real trade outcomes across industries — showcasing logistics capability, volume handled, and project results."
        breadcrumb="Projects"
        image="/images/library.png"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeading
            title="Have a Project in Mind?"
            description="We partner with government agencies, universities, manufacturers, and enterprises on large-scale supply and installation projects."
          />
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue text-white font-medium rounded-lg hover:bg-blue-light transition-colors shadow-lg shadow-blue/25"
          >
            Discuss Your Project
          </a>
        </div>
      </section>
    </>
  );
}
