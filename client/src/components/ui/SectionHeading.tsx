import CurvedLine from "@/components/ui/CurvedLine";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  light = false,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      {label && (
        <span
          className={`inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase mb-4 ${
            light ? "text-gold" : "text-blue"
          }`}
        >
          <span
            className={`w-8 h-px ${light ? "bg-gold/50" : "bg-blue/30"}`}
          />
          {label}
          <span
            className={`w-8 h-px ${light ? "bg-gold/50" : "bg-blue/30"}`}
          />
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold font-[family-name:var(--font-plus-jakarta)] mb-4 leading-tight ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div className={`${centered ? "flex justify-center" : ""} mb-5`}>
        <CurvedLine />
      </div>
      {description && (
        <p
          className={`text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""} ${
            light ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
