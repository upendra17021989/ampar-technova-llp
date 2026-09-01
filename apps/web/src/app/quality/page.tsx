import type { Metadata } from "next";
import Link from "next/link";
import { HomepageEffects } from "@/components/homepage-effects";

export const metadata: Metadata = { title: "Quality Assurance & Standards", description: "Quality controls, inspection, testing and engineering standards used for AMPAR Technova equipment.", alternates: { canonical: "/quality" } };

const controls = [
  { title: "Material Inspection", icon: "◉", items: ["Verification of raw materials", "Resin and polymer certification", "Traceability records"] },
  { title: "Manufacturing Control", icon: "✹", items: ["Process monitoring", "Dimensional verification", "Weld quality inspection", "FRP laminate thickness checks"] },
  { title: "Testing", icon: "◕", items: ["Hydrostatic Testing", "Spark Testing (Lining)", "Visual Inspection", "Dimensional Inspection", "Leak Testing"] },
] as const;

const standardGroups = [
  { title: "British / European", icon: "⬟", items: ["BS 4994", "EN 13121", "BS 7159", "BS 5480"] },
  { title: "American", icon: "★", items: ["ASME RTP-1", "ASME Section X", "ASTM Standards", "AWWA Standards"] },
  { title: "German", icon: "✹", items: ["DIN 16965 Series", "DVS 2207"] },
] as const;

export default function QualityPage() {
  return <main id="main-content">
    <HomepageEffects />
    <section className="section quality-assurance" aria-labelledby="quality-heading"><div className="shell"><p className="eyebrow dark">Quality Assurance</p><h1 id="quality-heading">Quality Is Built Into Every Solution</h1><p className="quality-intro">At AMPAR Technova LLP, quality is embedded throughout the engineering and manufacturing process, with strict process control, thorough inspections, and compliance with recognized engineering standards.</p><div className="quality-control-grid">{controls.map((control) => <article key={control.title}><span className="quality-icon" aria-hidden="true">{control.icon}</span><h2>{control.title}</h2><ul>{control.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
    <section className="section quality-standards" aria-labelledby="standards-heading"><div className="shell quality-standards-inner"><p className="eyebrow">Engineering Standards &amp; Compliance</p><h2 id="standards-heading">Engineered to Globally Recognized Standards</h2><p className="quality-standards-intro">Our products are engineered in accordance with globally recognized standards to ensure safety, performance, and reliability—supporting our design methodology for corrosion-resistant tanks, vessels, piping systems, and fabricated equipment.</p><div className="quality-standard-grid">{standardGroups.map((group) => <article key={group.title}><span className="quality-icon" aria-hidden="true">{group.icon}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div><div className="quality-scope-note"><strong>Scope-specific compliance.</strong> The applicable code, edition, inspection plan and documentation are confirmed for each order.</div></div></section>
    <section className="section cta-section"><div className="shell cta-inner"><div><p className="eyebrow dark">Document your requirement</p><h2>Tell us the applicable code and inspection needs.</h2></div><Link className="button button-primary" href="/request-a-quote">Start a Technical Enquiry</Link></div></section>
  </main>;
}
