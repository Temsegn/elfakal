import Image from "next/image";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: string;
  image?: string;
}

export default function PageHeader({
  title,
  description,
  breadcrumb,
  image,
}: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background image — same as home hero */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />

      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — text, vertically centered, left aligned */}
          <div className="text-center lg:text-left">
            {breadcrumb && (
              <span className="inline-flex items-center gap-2 text-gold text-sm font-medium tracking-wider uppercase mb-4">
                <span className="w-8 h-px bg-gold/50" />
                {breadcrumb}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-plus-jakarta)] leading-tight">
              {title}
            </h1>
            <div className="gold-line mb-6 mx-auto lg:mx-0" />
            {description && (
              <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Right — feature image */}
          {image && (
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
              </div>
              {/* Decorative accents */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-3xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-28 h-28 border-2 border-blue/30 rounded-full -z-10" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
