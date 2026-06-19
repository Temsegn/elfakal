import type { Service } from "@/lib/api/types";

const services: Service[] = [
  {
    slug: "import-services",
    title: "Import Services",
    description:
      "End-to-end import management from international suppliers to your doorstep in Ethiopia — sourcing, shipping coordination, customs clearance, and delivery logistics.",
    icon: "Ship",
    image: "/images/service-import.png",
    processSteps: [
      { step: 1, title: "Requirement Analysis", description: "Understanding your product specifications and import requirements." },
      { step: 2, title: "Supplier Sourcing", description: "Identifying and vetting international suppliers." },
      { step: 3, title: "Shipping Coordination", description: "Managing freight, documentation, and logistics." },
      { step: 4, title: "Customs Clearance", description: "Handling import permits, duties, and regulatory compliance." },
      { step: 5, title: "Delivery", description: "Nationwide delivery to your facility or warehouse." },
    ],
    industriesServed: ["Agriculture", "Manufacturing", "Government", "Retail"],
    featured: true,
  },
  {
    slug: "export-services",
    title: "Export Services",
    description:
      "Product packaging, export documentation, international shipping coordination, and buyer liaison for Ethiopian exporters.",
    icon: "Globe",
    image: "/images/service-sourcing.png",
    processSteps: [
      { step: 1, title: "Product Assessment", description: "Evaluating export readiness and market requirements." },
      { step: 2, title: "Documentation", description: "Preparing export licenses, certificates, and shipping docs." },
      { step: 3, title: "Packaging & Labeling", description: "Ensuring compliance with destination market standards." },
      { step: 4, title: "International Shipping", description: "Coordinating freight and port logistics." },
      { step: 5, title: "Buyer Coordination", description: "Managing communication with international buyers." },
    ],
    industriesServed: ["Agriculture", "Coffee", "Manufacturing"],
    featured: true,
  },
  {
    slug: "freight-forwarding",
    title: "Freight Forwarding",
    description:
      "Freight forwarding and container management with end-to-end tracking for sea, air, and land shipments.",
    icon: "Truck",
    image: "/images/service-distribution.png",
    processSteps: [
      { step: 1, title: "Route Planning", description: "Selecting optimal shipping routes and carriers." },
      { step: 2, title: "Container Booking", description: "Securing container space and managing load plans." },
      { step: 3, title: "In-Transit Tracking", description: "Real-time shipment monitoring and updates." },
      { step: 4, title: "Port Handling", description: "Managing port operations and handoffs." },
      { step: 5, title: "Final Delivery", description: "Last-mile delivery to destination." },
    ],
    industriesServed: ["All Industries"],
    featured: true,
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance",
    description:
      "Expert customs brokerage ensuring smooth clearance, regulatory compliance, and minimal delays at Ethiopian ports and borders.",
    icon: "ClipboardList",
    image: "/images/service-procurement.png",
    processSteps: [
      { step: 1, title: "Document Preparation", description: "Preparing all required import/export documentation." },
      { step: 2, title: "Duty Calculation", description: "Accurate tariff classification and duty assessment." },
      { step: 3, title: "Customs Filing", description: "Submitting declarations and managing inspections." },
      { step: 4, title: "Release & Delivery", description: "Securing customs release and coordinating pickup." },
    ],
    industriesServed: ["All Industries"],
    featured: true,
  },
  {
    slug: "trade-consultancy",
    title: "Trade Consultancy",
    description:
      "Expert trade advisory on supplier selection, equipment specification, regulatory compliance, and market entry strategies.",
    icon: "Lightbulb",
    image: "/images/service-consultation.png",
    processSteps: [
      { step: 1, title: "Needs Assessment", description: "Analyzing your business requirements and objectives." },
      { step: 2, title: "Market Research", description: "Identifying suppliers, pricing, and market conditions." },
      { step: 3, title: "Recommendation", description: "Providing actionable trade and sourcing recommendations." },
      { step: 4, title: "Implementation Support", description: "Assisting with procurement and logistics execution." },
    ],
    industriesServed: ["Agriculture", "Manufacturing", "Government", "Retail"],
    featured: false,
  },
  {
    slug: "product-sourcing",
    title: "Product Sourcing",
    description:
      "Global product sourcing and supplier identification across multiple industries and categories worldwide.",
    icon: "Search",
    image: "/images/service-sourcing.png",
    processSteps: [
      { step: 1, title: "Specification Review", description: "Understanding your exact product requirements." },
      { step: 2, title: "Supplier Search", description: "Identifying qualified global suppliers." },
      { step: 3, title: "Quality Verification", description: "Evaluating samples and supplier credentials." },
      { step: 4, title: "Negotiation", description: "Securing competitive pricing and terms." },
    ],
    industriesServed: ["All Industries"],
    featured: false,
  },
];

export default services;
