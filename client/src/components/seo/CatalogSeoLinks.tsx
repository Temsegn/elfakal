import Link from "next/link";
import { getProducts, getServices, getProjects } from "@/lib/data";

export default async function CatalogSeoLinks() {
  const [products, services, projects] = await Promise.all([
    getProducts(),
    getServices(),
    getProjects(),
  ]);

  return (
    <section
      className="border-t border-white/10 py-10"
      aria-label="Elfakal products, services, and projects"
    >
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gold mb-4">
            Elfakal Products
          </h3>
          <ul className="space-y-2">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gold mb-4">
            Elfakal Services
          </h3>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wide text-gold mb-4">
            Elfakal Projects
          </h3>
          <ul className="space-y-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
