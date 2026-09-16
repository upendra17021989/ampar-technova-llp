import type { Metadata } from "next";
import { HomepageEffects } from "@/components/homepage-effects";
import { PageHero } from "@/components/page-hero";
import { industries } from "@/content/catalogue";

const applicationMap: Record<string, string[]> = {
  "chemical-processing": ["Chemical storage", "Reactors and vessels", "Fume scrubbing"],
  pharmaceuticals: ["High-purity equipment", "Process containment", "Corrosive exhaust"],
  steel: ["Pickling systems", "Fume extraction", "Scrubbers"],
  "water-wastewater": ["Storage tanks", "Dosing systems", "Process piping"],
  "battery-manufacturing": ["Acid handling", "Ventilation", "Wet scrubbing"],
  "semiconductor-electronics": ["High-purity transfer", "PVDF systems", "Corrosive exhaust"],
};

const industryIcons = ["◉", "♥", "☀", "✹", "⬢", "ϟ", "✹", "★", "◔", "◕", "⬟", "★", "◉", "◕", "✹"];

export const metadata: Metadata = { title: "Industries", description: "Industrial sectors served by AMPAR Technova corrosion-resistant engineering solutions.", alternates: { canonical: "/industries" } };

export default function IndustriesPage() {
  return <main id="main-content"><HomepageEffects /><PageHero eyebrow="Industries served" title="Built around industrial corrosion and process challenges" description="AMPAR supports critical applications across process, infrastructure and high-purity industries." action={{ label: "Request Technical Consultation", href: "/request-a-quote" }} /><section className="section"><div className="shell"><p className="eyebrow dark">Sector expertise</p><h2>Connect each process challenge to suitable equipment</h2><div className="industry-card-grid">{industries.map((industry, index) => { const applications = applicationMap[industry.slug] ?? ["Chemical and utility storage", "Corrosion-resistant piping", "Application-specific equipment"]; const isOilAndGas = industry.slug === "oil-gas"; return <article className="industry-card" key={industry.slug}><span className={isOilAndGas ? "industry-sector-icon is-oil-gas" : "industry-sector-icon"} aria-hidden="true">{isOilAndGas ? "" : industryIcons[index]}</span><h2>{industry.name}</h2><ul className="feature-list">{applications.map((application) => <li key={application}>{application}</li>)}</ul><a className="text-link" href={`/request-a-quote?industry=${industry.slug}`}>Discuss this industry →</a></article>; })}</div></div></section><section className="section navy-section"><div className="shell split"><div><p className="eyebrow">Common applications</p><h2>Engineered around corrosive duties</h2></div><div className="industry-list light-industry-list"><span>Chemical storage</span><span>Acid and alkali handling</span><span>Effluent treatment</span><span>Fume extraction</span><span>Wet scrubbing</span><span>Electroplating and pickling</span><span>Water treatment</span><span>High-purity processes</span></div></div></section></main>;
}
