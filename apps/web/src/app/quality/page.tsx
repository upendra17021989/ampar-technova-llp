import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "Quality Assurance & Standards", description: "Quality controls, inspection, testing and engineering standards used for AMPAR Technova equipment.", alternates: { canonical: "/quality" } };

const controls = [
  { title: "Material inspection", items: ["Raw-material verification", "Resin and polymer certification review", "Traceability records"] },
  { title: "Manufacturing control", items: ["Process monitoring", "Dimensional verification", "Weld-quality inspection", "FRP laminate thickness checks"] },
  { title: "Testing and inspection", items: ["Hydrostatic testing", "Spark testing for linings", "Visual and dimensional inspection", "Leak testing"] },
];
const standards = ["BS 4994", "EN 13121", "BS 7159", "BS 5480", "ASME RTP-1", "ASME Section X", "ASTM standards", "AWWA standards", "DIN 16965 series", "DVS 2207"];

export default function QualityPage() {
  return <main id="main-content"><PageHero eyebrow="Quality assurance" title="Quality built into every solution" description="Material verification, controlled manufacturing and appropriate testing support equipment reliability, safety and traceability." action={{ label: "Request Technical Consultation", href: "/request-a-quote" }} />
    <section className="section"><div className="shell"><p className="eyebrow dark">Quality controls</p><h2>Inspection from incoming material to final equipment</h2><div className="three-grid">{controls.map((control) => <article className="card" key={control.title}><h3>{control.title}</h3><ul className="feature-list">{control.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></div></section>
    <section className="section section-muted"><div className="shell technical-layout"><div><p className="eyebrow dark">Engineering standards</p><h2>Designed with recognized standards in view</h2><p className="section-lead">Applicable standards are selected according to equipment type, construction, duty and agreed project requirements.</p><div className="standards-grid">{standards.map((standard) => <span key={standard}>{standard}</span>)}</div></div><aside className="technical-note prominent"><strong>Scope-specific compliance.</strong> A listed standard is not a universal certification claim. The applicable design code, edition, inspection plan and documentation must be confirmed for each order.</aside></div></section>
    <section className="section cta-section"><div className="shell cta-inner"><div><p className="eyebrow dark">Document your requirement</p><h2>Tell us the applicable code and inspection needs.</h2></div><Link className="button button-primary" href="/request-a-quote">Start a Technical Enquiry</Link></div></section>
  </main>;
}
