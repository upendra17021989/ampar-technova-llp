export type Product = {
  name: string;
  slug: string;
  category: string;
  summary: string;
  materials: string[];
  applications: string[];
  benefits: string[];
  capabilities?: string[];
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
    benefits: ["Excellent corrosion resistance", "High strength-to-weight ratio", "Low maintenance", "Long service life"],
    capabilities: ["Custom capacities and orientations", "Filament-wound or contact-moulded construction", "Nozzles, manways and accessories to requirement"],
  },
  {
    name: "PP and PPH Storage Tanks",
    slug: "pp-pph-storage-tanks",
    category: "Storage Equipment",
    summary: "Fabricated polypropylene storage equipment for approved chemical duties.",
    materials: ["PP", "PPH"],
    applications: ["Chemical storage", "Dosing systems", "Process tanks"],
    benefits: ["Broad chemical resistance", "Lightweight construction", "Welded, leak-tight fabrication", "Low maintenance"],
  },
  {
    name: "HDPE Storage Tanks",
    slug: "hdpe-storage-tanks",
    category: "Storage Equipment",
    summary: "Lightweight fabricated tanks for suitable storage and water applications.",
    materials: ["HDPE"],
    applications: ["Water storage", "Chemical storage"],
    benefits: ["Lightweight construction", "Impact resistance", "Corrosion resistance", "Easy handling"],
  },
  {
    name: "PVDF Storage Tanks",
    slug: "pvdf-storage-tanks",
    category: "Storage Equipment",
    summary: "High-purity thermoplastic storage equipment for reviewed process conditions.",
    materials: ["PVDF"],
    applications: ["High-purity processes", "Aggressive chemical service"],
    benefits: ["High-purity service", "Resistance to aggressive chemicals", "Smooth process-contact surface", "Long service life"],
  },
  {
    name: "Reactors and Process Vessels",
    slug: "reactors-process-vessels",
    category: "Process Equipment",
    summary: "Application-specific reactors and vessels in FRP, thermoplastics and dual laminate.",
    materials: ["FRP", "PPH", "PVDF", "Dual Laminate"],
    applications: ["Chemical processing", "Reaction systems", "Process containment"],
    benefits: ["Application-specific design", "Multiple construction options", "Corrosion-resistant process contact", "Custom internals and connections"],
    capabilities: ["Reactors", "Pressure vessels", "Mixing vessels", "Columns and absorbers"],
  },
  {
    name: "Wet and Packed-Bed Scrubbers",
    slug: "wet-packed-bed-scrubbers",
    category: "Pollution Control",
    summary: "Corrosion-resistant scrubbing systems configured for reviewed gas streams.",
    materials: ["FRP", "PPH", "Dual Laminate"],
    applications: ["Fume extraction", "Air pollution control", "Process exhaust"],
    benefits: ["Efficient gas-liquid contact", "Corrosion-resistant construction", "Configurable packing and recirculation", "Integrated exhaust capability"],
  },
  {
    name: "FRP Blowers",
    slug: "frp-blowers",
    category: "Pollution Control",
    summary: "Corrosion-resistant blowers for compatible industrial exhaust duties.",
    materials: ["FRP"],
    applications: ["Fume extraction", "Scrubber systems", "Ventilation"],
    benefits: ["Corrosion-resistant air handling", "Lightweight construction", "Compatible with scrubber systems", "Application-specific selection"],
  },
  {
    name: "Thermoplastic Piping Systems",
    slug: "thermoplastic-piping-systems",
    category: "Piping Systems",
    summary: "Fabricated piping systems in approved thermoplastic materials.",
    materials: ["PPH", "HDPE", "PVC", "CPVC", "PVDF"],
    applications: ["Chemical transfer", "Water treatment", "Process utilities"],
    benefits: ["Broad material selection", "Corrosion resistance", "Low system weight", "Fabricated fittings and spools"],
  },
  {
    name: "Dual-Laminate Piping",
    slug: "dual-laminate-piping",
    category: "Piping Systems",
    summary: "Thermoplastic-lined piping with FRP structural reinforcement.",
    materials: ["Dual Laminate", "PVDF", "ECTFE", "FRP"],
    applications: ["Aggressive chemicals", "High-purity transfer", "Process piping"],
    benefits: ["Thermoplastic corrosion barrier", "FRP structural reinforcement", "High mechanical integrity", "Long equipment life"],
  },
  {
    name: "Pickling and Electroplating Tanks",
    slug: "pickling-electroplating-tanks",
    category: "Custom Fabrication",
    summary: "Custom-fabricated tanks for reviewed surface-treatment processes.",
    materials: ["PP", "PPH", "PVDF", "FRP"],
    applications: ["Pickling lines", "Electroplating", "Surface treatment"],
    benefits: ["Built around line geometry", "Corrosion-resistant materials", "Custom covers and extraction interfaces", "Suitable for reviewed surface-treatment duties"],
  },
  {
    name: "FRP Process Equipment",
    slug: "frp-process-equipment",
    category: "Process Equipment",
    summary: "Corrosion-resistant FRP reactors, vessels, columns and custom process equipment.",
    materials: ["FRP", "Vinyl Ester Resin", "Polyester Resin", "Epoxy Resin"],
    applications: ["Chemical processing", "Absorption and separation", "Corrosive process duties"],
    benefits: ["High mechanical strength", "Lightweight construction", "UV resistance", "Cost-effective lifecycle"],
    capabilities: ["Reactors", "Pressure vessels", "Columns", "Custom fabricated equipment"],
  },
  {
    name: "FRP Ducting and Chimneys",
    slug: "frp-ducting-chimneys",
    category: "Pollution Control",
    summary: "FRP ducting, stacks and chimneys for compatible corrosive exhaust streams.",
    materials: ["FRP", "Vinyl Ester Resin"],
    applications: ["Fume extraction", "Scrubber exhaust", "Corrosive ventilation"],
    benefits: ["Corrosion resistance", "Low weight", "Large-diameter capability", "Low maintenance"],
  },
  {
    name: "Chemical and Dosing Tanks",
    slug: "chemical-dosing-tanks",
    category: "Custom Fabrication",
    summary: "Application-specific chemical storage, dosing and process tanks in engineered plastics and composites.",
    materials: ["PP", "PPH", "HDPE", "PVC", "CPVC", "PVDF", "FRP"],
    applications: ["Chemical dosing", "Acid and alkali handling", "Water and effluent treatment"],
    benefits: ["Custom geometry", "Broad material choice", "Integrated fittings and covers", "Fabricated to process requirements"],
  },
  {
    name: "Cable Trays and Gratings",
    slug: "frp-cable-trays-gratings",
    category: "Custom Fabrication",
    summary: "Lightweight FRP cable-management and access components for corrosive industrial environments.",
    materials: ["FRP"],
    applications: ["Chemical plants", "Utilities", "Industrial infrastructure"],
    benefits: ["Corrosion resistance", "Electrical insulation", "Low maintenance", "Lightweight installation"],
  },
];

export const technologies = [
  { name: "FRP Engineering", slug: "frp-engineering", summary: "Composite structures engineered for strength and corrosion resistance.", materials: ["FRP", "Vinyl Ester", "Polyester", "Epoxy"], benefits: ["Excellent corrosion resistance", "Lightweight construction", "High mechanical strength", "Low maintenance", "Long service life", "UV resistance"] },
  { name: "Thermoplastic Fabrication", slug: "thermoplastic-fabrication", summary: "Precision fabrication across a broad range of engineering polymers.", materials: ["PP", "PPH", "HDPE", "PVC", "CPVC", "PVDF", "ECTFE", "FEP", "PFA"], benefits: ["Chemical resistance", "Low weight", "High-purity options", "Flexible fabrication", "Long service life", "Low maintenance"] },
  { name: "Dual Laminate Technology", slug: "dual-laminate-technology", summary: "Thermoplastic corrosion barriers reinforced by structural FRP shells.", materials: ["PP", "PPH", "PVC", "CPVC", "PVDF", "ECTFE", "FEP", "PFA", "FRP"], benefits: ["Maximum corrosion protection", "High structural integrity", "Long equipment life", "Lower maintenance requirements"] },
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
  "Food and Beverage",
  "Pulp and Paper",
  "Textile Processing",
  "Mining and Metals",
  "Infrastructure Projects",
].map((name) => ({
  name,
  slug: name.toLowerCase().replaceAll(" and ", "-").replaceAll(" ", "-"),
}));
