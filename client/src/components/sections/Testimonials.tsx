import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="py-28 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-auto block rotate-180"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative pt-8">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          description="Trusted by government organizations, educational institutions, and private enterprises across Ethiopia."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-8 card-hover relative border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Top curved accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue via-gold to-blue opacity-60" />

              <Quote
                size={48}
                className="text-blue/8 absolute top-6 right-6"
              />

              {/* Star rating */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 relative z-10 text-[15px]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 border-t border-gray-100 pt-5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue to-navy flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.company}</p>
                </div>
              </div>

              <span className="inline-block mt-3 text-xs bg-blue/8 text-blue px-3 py-1 rounded-full font-medium">
                {testimonial.industry}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
