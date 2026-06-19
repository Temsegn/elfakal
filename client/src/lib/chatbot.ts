import { COMPANY } from "@/lib/constants";

export interface QuickReply {
  id: string;
  label: string;
}

export interface BotResponse {
  text: string;
  quickReplies?: QuickReply[];
}

const MAIN_MENU: QuickReply[] = [
  { id: "about", label: "About Elfakal" },
  { id: "products", label: "Our Products" },
  { id: "industries", label: "Industries" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact & Location" },
  { id: "quote", label: "Request a Quote" },
];

const BACK_MENU: QuickReply[] = [
  { id: "menu", label: "Main Menu" },
  { id: "contact", label: "Contact Us" },
];

export const WELCOME: BotResponse = {
  text: `Hi! 👋 I'm Elfa, the Elfakal PLC virtual assistant. I can tell you about our company, products, and services. How can I help you today?`,
  quickReplies: MAIN_MENU,
};

const RESPONSES: Record<string, BotResponse> = {
  menu: {
    text: "Sure! What would you like to know more about?",
    quickReplies: MAIN_MENU,
  },
  about: {
    text: `Elfakal PLC (${COMPANY.legalName}) is a diversified Ethiopian trading and import company based in ${COMPANY.address.city}. We supply agricultural and coffee equipment, fragrances, flavors and cosmetics, library and archival supplies, furniture, and shade nets — sourcing directly from the United States, India, and China. We're a trusted partner for government agencies, universities, and enterprises nationwide.`,
    quickReplies: [
      { id: "industries", label: "Industries We Serve" },
      { id: "products", label: "Our Products" },
      { id: "contact", label: "Contact Us" },
    ],
  },
  products: {
    text: `We offer products across 6 main categories:\n\n☕ Agricultural & Coffee Equipment\n🌸 Fragrances & Flavors\n🧴 Detergents & Soaps\n📚 Library Supplies & Furniture\n📦 Archival & Exhibit Supplies\n🏗️ Shade Nets & Structures\n\nWhich category interests you?`,
    quickReplies: [
      { id: "coffee", label: "Coffee Equipment" },
      { id: "fragrances", label: "Fragrances & Flavors" },
      { id: "library", label: "Library & Archives" },
      { id: "quote", label: "Request a Quote" },
    ],
  },
  coffee: {
    text: `Our agricultural & coffee line includes ecological pulpers, coffee dryers, and shade nets — complete solutions for Ethiopian coffee exporters and flower farms.`,
    quickReplies: [
      { id: "quote", label: "Get a Quote" },
      { id: "products", label: "Other Products" },
    ],
  },
  fragrances: {
    text: `We supply fragrances and flavors for personal care, cosmetics, hair & bath products, home care, air care, detergents, toilet/laundry soaps, and dishwashing products.`,
    quickReplies: [
      { id: "quote", label: "Get a Quote" },
      { id: "products", label: "Other Products" },
    ],
  },
  library: {
    text: `Our library & archival range includes cataloging, shelving, security, labels, Gaylord® library furniture, mobile shelving, book trucks, library chairs, archival boxes, exhibit cases, and conservation supplies.`,
    quickReplies: [
      { id: "quote", label: "Get a Quote" },
      { id: "products", label: "Other Products" },
    ],
  },
  chemicals: {
    text: `We supply fragrances and flavors for personal care, cosmetics, detergents, and home care — high-quality inputs for soap, cosmetic, and detergent manufacturers.`,
    quickReplies: [
      { id: "quote", label: "Get a Quote" },
      { id: "products", label: "Other Products" },
    ],
  },
  pharma: {
    text: `We supply cosmetics, hair products, bath products, detergents, toilet and laundry soaps — quality personal care and home care products for manufacturers across Ethiopia.`,
    quickReplies: [
      { id: "quote", label: "Get a Quote" },
      { id: "products", label: "Other Products" },
    ],
  },
  industries: {
    text: `We serve 6 key industries:\n\n🌾 Agriculture & Coffee\n🌸 Fragrances & Flavors\n🧴 Cosmetics & Soaps\n📚 Library & Archives\n🪑 Furniture & Seating\n🏗️ Shade Nets & Structures\n\nWe're trusted by government bodies, universities, coffee exporters, and manufacturers.`,
    quickReplies: BACK_MENU,
  },
  services: {
    text: `Our core services include:\n\n🚢 Import Services\n🔍 Product Sourcing\n📋 Procurement\n🚚 Wholesale Distribution\n💡 Technical Consultation\n\nWe handle everything from supplier selection to nationwide delivery.`,
    quickReplies: [
      { id: "quote", label: "Request a Quote" },
      { id: "menu", label: "Main Menu" },
    ],
  },
  contact: {
    text: `📍 ${COMPANY.address.building}, ${COMPANY.address.street}, ${COMPANY.address.floor}, ${COMPANY.address.city}, ${COMPANY.address.country}\n\n📞 Phone: ${COMPANY.phone.main}\n📱 Mobile: ${COMPANY.phone.mobile}\n✉️ Email: ${COMPANY.email}\n🌐 Website: ${COMPANY.website}`,
    quickReplies: [
      { id: "whatsapp", label: "Chat on WhatsApp" },
      { id: "quote", label: "Request a Quote" },
    ],
  },
  quote: {
    text: `Great! To request a quotation, please share your requirements with our team. You can use our contact form or reach us directly. Would you like me to take you there?`,
    quickReplies: [
      { id: "goto-contact", label: "Open Contact Form" },
      { id: "whatsapp", label: "Chat on WhatsApp" },
    ],
  },
  whatsapp: {
    text: `You can reach us instantly on WhatsApp at ${COMPANY.phone.mobile}. Tap the button below to start a chat!`,
    quickReplies: [{ id: "menu", label: "Main Menu" }],
  },
  hours: {
    text: `Our business hours are:\n🕘 Monday – Friday: 8:30 AM – 5:30 PM\n🕘 Saturday: 8:30 AM – 12:30 PM`,
    quickReplies: BACK_MENU,
  },
  greeting: {
    text: `Hello! 😊 How can I help you learn about Elfakal PLC today?`,
    quickReplies: MAIN_MENU,
  },
  thanks: {
    text: `You're welcome! 🙏 Is there anything else I can help you with?`,
    quickReplies: MAIN_MENU,
  },
  fallback: {
    text: `I'm not sure I caught that, but I'd be happy to help! Here's what I can tell you about. You can also type your question.`,
    quickReplies: MAIN_MENU,
  },
};

export function getResponse(id: string): BotResponse {
  return RESPONSES[id] || RESPONSES.fallback;
}

const KEYWORDS: { match: string[]; id: string }[] = [
  { match: ["hi", "hello", "hey", "selam", "halo"], id: "greeting" },
  { match: ["thank", "thanks", "amaseginalew"], id: "thanks" },
  { match: ["about", "who are you", "company", "elfakal"], id: "about" },
  { match: ["product", "sell", "catalog", "items"], id: "products" },
  { match: ["coffee", "pulper", "dryer", "agricultural", "shade net"], id: "coffee" },
  { match: ["fragrance", "flavor", "cosmetic", "soap", "detergent", "hair", "bath"], id: "fragrances" },
  { match: ["library", "archiv", "shelv", "catalog", "book", "museum", "exhibit"], id: "library" },
  { match: ["chemical", "glycerin", "paraffin", "wax"], id: "chemicals" },
  { match: ["pharma", "medicine", "medical", "drug", "health", "toilet"], id: "pharma" },
  { match: ["industr", "sector"], id: "industries" },
  { match: ["service", "import", "sourcing", "procurement", "distribut"], id: "services" },
  { match: ["contact", "address", "location", "phone", "email", "call", "where"], id: "contact" },
  { match: ["quote", "quotation", "price", "pricing", "cost", "buy", "order"], id: "quote" },
  { match: ["whatsapp", "wa"], id: "whatsapp" },
  { match: ["hour", "open", "time", "schedule"], id: "hours" },
];

export function matchFreeText(text: string): BotResponse {
  const lower = text.toLowerCase();
  for (const entry of KEYWORDS) {
    if (entry.match.some((kw) => lower.includes(kw))) {
      return getResponse(entry.id);
    }
  }
  return getResponse("fallback");
}
