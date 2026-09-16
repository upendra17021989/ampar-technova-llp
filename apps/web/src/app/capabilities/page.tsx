import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Engineering & Manufacturing", description: "AMPAR Technova engineering, fabrication, testing and project-support capabilities.", alternates: { canonical: "/capabilities" } };

const stages = [
  { title: "Engineering", items: ["Process equipment design", "CAD modelling", "Structural analysis", "Material selection", "Reverse engineering"] },
  { title: "Manufacturing", items: ["Plastic welding", "FRP lamination", "Filament winding", "Precision fabrication", "Custom fabrication"] },
  { title: "Verification", items: ["Dimensional verification", "Hydrostatic testing", "Spark and leak testing", "Weld inspection", "Laminate thickness checks"] },
  { title: "Delivery support", items: ["Documentation", "Quality inspection", "Dispatch coordination", "On-site installation support", "Technical assistance"] },
];

export default function CapabilitiesPage() {
  return <main id="main-content"><PageHero eyebrow="From design to delivery" title="Engineering and manufacturing excellence" description="Technical expertise, controlled fabrication and rigorous inspection brought together around each customer’s process requirement." action={{ label: "Discuss a Project", href: "/request-a-quote" }} />
    <section className="section"><div className="shell"><p className="eyebrow dark">Integrated capability</p><h2>A practical path from process data to delivery</h2><p className="section-lead">We combine material knowledge, equipment design, advanced polymer fabrication and quality controls to deliver durable, cost-effective corrosion-resistant solutions.</p><div className="four-grid process-grid">{stages.map((stage, index) => <article className="card" key={stage.title}><span className="category-number">0{index + 1}</span><h3>{stage.title}</h3><ul className="feature-list">{stage.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
    <section className="section navy-section"><div className="shell split"><div><p className="eyebrow">Manufacturing disciplines</p><h2>Built for engineered polymers and composites</h2><p>Our capabilities cover thermoplastic fabrication, FRP composite construction and dual-laminate equipment, allowing construction to be selected around chemical and mechanical duty.</p></div><div className="evidence-list"><span>Controlled plastic welding</span><span>FRP lamination</span><span>Filament winding</span><span>Precision fabrication</span></div></div></section>
    <section className="section cta-section"><div className="shell cta-inner"><div><p className="eyebrow dark">Quality throughout</p><h2>See how equipment is inspected and tested.</h2></div><Link className="button button-primary" href="/quality">Explore Quality Assurance</Link></div></section>
  </main>;
}
