import { MapPin, ExternalLink } from "lucide-react";
import { COMPANY } from "@/lib/constants";

interface LocationMapProps {
  className?: string;
  heightClass?: string;
}

export default function LocationMap({
  className = "",
  heightClass = "h-64",
}: LocationMapProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-gray-200 group ${heightClass} ${className}`}
    >
      <iframe
        title="Elfakal PLC location map"
        src={COMPANY.maps.embed}
        className="w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      {/* Clickable overlay that opens Google Maps in a new tab */}
      <a
        href={COMPANY.maps.link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg hover:bg-white transition-colors"
        aria-label="Open Elfakal PLC location in Google Maps"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-blue/10 rounded-lg flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-blue" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy truncate">
              {COMPANY.address.building}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {COMPANY.address.street}, {COMPANY.address.city}
            </p>
          </div>
        </div>
        <ExternalLink size={16} className="text-blue shrink-0" />
      </a>
    </div>
  );
}
