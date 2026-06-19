import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import { getProjects } from "@/lib/data";

export default async function Projects() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-28 relative section-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Case Studies"
          title="Featured Projects"
          description="Real trade outcomes — logistics routes, volumes handled, and measurable results across industries."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button href="/projects" variant="secondary" size="lg">
            View All Case Studies
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
