export type Product = {
  name: string;
  slug: string;
  category: string;
  summary: string;
  materials: string[];
  applications: string[];
};

export const productCategories = [
  {
    name: "Storage Equipment",
    slug: "storage-equipment",
    summary: "Corrosion-resistant storage solutions in FRP and engineered thermoplastics.",
  },
  {
    name: "Process Equipment",
    slug: "process-equipment",
    summary: "Reactors, vessels, mixers and columns designed around process requirements.",
  },
  {
    name: "Pollution Control",
    slug: "pollution-control",
    summary: "Scrubbing, extraction and air-handling equipment for corrosive duties.",
  },
  {
    name: "Piping Systems",
    slug: "piping-systems",
    summary: "FRP, thermoplastic and dual-laminate piping for industrial services.",
  },
  {
    name: "Custom Fabrication",
    slug: "custom-fabrication",
    summary: "Application-specific tanks, systems and fabricated components.",
  },
] as const;

export const products: Product[] = [
  {
    name: "FRP Storage Tanks",
    slug: "frp-storage-tanks",
    category: "Storage Equipment",
    summary: "Custom-engineered FRP storage tanks for corrosive industrial services.",
    materials: ["FRP"],
    applications: ["Chemical storage", "Water and wastewater", "Process utilities"],
  },
  {
    name: "PP and PPH Storage Tanks",
    slug: "pp-pph-storage-tanks",
    category: "Storage Equipment",
    summary: "Fabricated polypropylene storage equipment for approved chemical duties.",
    materials: ["PP", "PPH"],
    applications: ["Chemical storage", "Dosing systems", "Process tanks"],
  },
  {
    name: "HDPE Storage Tanks",
    slug: "hdpe-storage-tanks",
    category: "Storage Equipment",
    summary: "Lightweight fabricated tanks for suitable storage and water applications.",
    materials: ["HDPE"],
    applications: ["Water storage", "Chemical storage"],
  },
  {
    name: "PVDF Storage Tanks",
    slug: "pvdf-storage-tanks",
    category: "Storage Equipment",
    summary: "High-purity thermoplastic storage equipment for reviewed process conditions.",
    materials: ["PVDF"],
    applications: ["High-purity processes", "Aggressive chemical service"],
  },
  {
    name: "Reactors and Process Vessels",
    slug: "reactors-process-vessels",
    category: "Process Equipment",
    summary: "Application-specific reactors and vessels in FRP, thermoplastics and dual laminate.",
    materials: ["FRP", "PPH", "PVDF", "Dual Laminate"],
    applications: ["Chemical processing", "Reaction systems", "Process containment"],
  },
  {
    name: "Wet and Packed-Bed Scrubbers",
    slug: "wet-packed-bed-scrubbers",
    category: "Pollution Control",
    summary: "Corrosion-resistant scrubbing systems configured for reviewed gas streams.",
    materials: ["FRP", "PPH", "Dual Laminate"],
    applications: ["Fume extraction", "Air pollution control", "Process exhaust"],
  },
  {
    name: "FRP Blowers",
    slug: "frp-blowers",
    category: "Pollution Control",
    summary: "Corrosion-resistant blowers for compatible industrial exhaust duties.",
    materials: ["FRP"],
    applications: ["Fume extraction", "Scrubber systems", "Ventilation"],
  },
  {
    name: "Thermoplastic Piping Systems",
    slug: "thermoplastic-piping-systems",
    category: "Piping Systems",
    summary: "Fabricated piping systems in approved thermoplastic materials.",
    materials: ["PPH", "HDPE", "PVC", "CPVC", "PVDF"],
    applications: ["Chemical transfer", "Water treatment", "Process utilities"],
  },
  {
    name: "Dual-Laminate Piping",
    slug: "dual-laminate-piping",
    category: "Piping Systems",
    summary: "Thermoplastic-lined piping with FRP structural reinforcement.",
    materials: ["Dual Laminate", "PVDF", "ECTFE", "FRP"],
    applications: ["Aggressive chemicals", "High-purity transfer", "Process piping"],
  },
  {
    name: "Pickling and Electroplating Tanks",
    slug: "pickling-electroplating-tanks",
    category: "Custom Fabrication",
    summary: "Custom-fabricated tanks for reviewed surface-treatment processes.",
    materials: ["PP", "PPH", "PVDF", "FRP"],
    applications: ["Pickling lines", "Electroplating", "Surface treatment"],
  },
];

export const technologies = [
  { name: "FRP Engineering", slug: "frp-engineering", summary: "Composite structures engineered for strength and corrosion resistance." },
  { name: "Thermoplastic Fabrication", slug: "thermoplastic-fabrication", summary: "Precision fabrication across a broad range of engineering polymers." },
  { name: "Dual Laminate Technology", slug: "dual-laminate-technology", summary: "Thermoplastic corrosion barriers reinforced by structural FRP shells." },
] as const;

export const industries = [
  "Chemical Processing",
  "Pharmaceuticals",
  "Fertilizers",
  "Petrochemicals",
  "Steel",
  "Power Plants",
  "Water and Wastewater",
  "Battery Manufacturing",
  "Oil and Gas",
  "Semiconductor and Electronics",
].map((name) => ({
  name,
  slug: name.toLowerCase().replaceAll(" and ", "-").replaceAll(" ", "-"),
}));
