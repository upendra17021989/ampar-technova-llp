import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Materials",
  description: "Explore AMPAR Technova thermoset, thermoplastic and dual-laminate material expertise.",
};

const thermosetBenefits = ["Flexible product design and wall thickness", "High strength-to-weight ratio", "Heat and chemical resistance", "Electrical insulation", "Dimensional stability", "Low thermal conductivity", "Water and corrosion resistance", "Wide range of colours and finishes"];
const thermoplasticBenefits = ["Recyclable and reshapeable", "Chemical and detergent resistance", "Electrical insulation", "High impact resistance", "High-quality surface finish", "Resistance to chipping", "Good adherence to metals", "Corrosion resistance"];

export default function MaterialsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Material Expertise" title="Material guidance starts with the process" description="Thermosets, engineering thermoplastics and dual-laminate construction for demanding corrosion-resistant applications." action={{ label: "Request Material Review", href: "/request-a-quote" }} />
      <nav className="section-jump-nav" aria-label="Material sections"><div className="shell"><a href="#thermosets">Thermosets</a><a href="#thermoplastics">Thermoplastics</a><a href="#applications">Applications</a><a href="#dual-laminate">Dual Laminate</a></div></nav>
      <section className="section"><div className="shell"><div className="technical-note prominent"><strong>Engineering review required.</strong> Material suitability depends on chemical concentration, temperature, pressure, mechanical load and service conditions. General properties are not universal operating limits.</div></div></section>
      <section className="section section-muted material-section" id="thermosets">
        <div className="shell material-detail-grid">
          <div><p className="eyebrow dark">1. Thermoset Plastics</p><h2>Permanent cross-linked structures</h2><p>Thermoset plastics begin as resins and harden through heat or a chemical curing reaction. Curing creates permanent cross-links that hold the molecular structure in place, so the finished material cannot be melted and returned to its original liquid state.</p><p>Their structural integrity and resistance to heat and chemicals make thermosets valuable in composite process equipment, electrical housings and other demanding applications.</p><div className="material-tags"><span>FRP</span><span>GRP</span><span>FRVE</span><span>Epoxy</span><span>Phenolic</span><span>Polyimide</span></div></div>
          <div className="pros-cons"><article><h3>Benefits</h3><ul>{thermosetBenefits.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="limitations"><h3>Limitations</h3><ul><li>Cannot be reshaped or remoulded after curing</li><li>Generally cannot be recycled through remelting</li><li>Excessive heat may cause degradation rather than melting</li></ul></article></div>
        </div>
      </section>
      <section className="section material-section" id="thermoplastics">
        <div className="shell material-detail-grid">
          <div><p className="eyebrow dark">2. Thermoplastics</p><h2>Heat-formable engineering polymers</h2><p>Thermoplastics are solid at room temperature and soften when heated beyond their melting or glass-transition range. Because processing does not create permanent cross-links, they can be reheated, formed and, in many cases, recycled with limited impact on their material properties.</p><p>Extrusion, thermoforming and injection moulding produce components with useful elasticity, strength and chemical resistance. Their temperature sensitivity must be reviewed for every application.</p><div className="material-tags"><span>PE</span><span>PP</span><span>PPH</span><span>HDPE</span><span>PVC</span><span>CPVC</span><span>PVDF</span><span>ECTFE</span><span>FEP</span><span>PFA</span><span>PC</span><span>PET</span></div></div>
          <div className="pros-cons"><article><h3>Benefits</h3><ul>{thermoplasticBenefits.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="limitations"><h3>Limitations</h3><ul><li>May soften or deform at elevated temperatures</li><li>Not suited to every chemical or mechanical duty</li><li>Can cost more than some thermosetting polymers</li></ul></article></div>
        </div>
      </section>
      <section className="section navy-section" id="applications">
        <div className="shell"><p className="eyebrow">Applications</p><h2>Selected around service conditions</h2><div className="application-grid"><article><h3>Thermoset applications</h3><p>Thermoset composites support chemical processing, construction, electrical, energy, transportation and other duties requiring structural robustness and corrosion resistance.</p><ul><li>Chemical pipes, fittings and cell covers</li><li>Electrical and medical housings</li><li>Construction and transportation panels</li><li>Agricultural equipment</li><li>Vehicle and industrial components</li></ul></article><article><h3>Thermoplastic applications</h3><p>Thermoplastics are widely used in chemical, water, electronics, medical, food, automotive, construction and plumbing applications where their processability and corrosion resistance are valuable.</p><ul><li>Ropes and belts</li><li>Electrical cable insulation</li><li>Liquid storage</li><li>Protective equipment coverings</li><li>Process piping and fabricated equipment</li></ul></article></div></div>
      </section>
      <section className="section" id="dual-laminate">
        <div className="shell dual-laminate-section">
          <p className="eyebrow dark">3. Dual Laminate Technology</p>
          <h2>The Best of Two Technologies</h2>
          <p>Dual laminate combines a corrosion-resistant thermoplastic liner with an FRP structural shell, delivering superior chemical resistance and mechanical strength.</p>
          <div className="dual-laminate-grid">
            <article><h3>Inner Liner</h3><ul><li>PP</li><li>PPH</li><li>PVC</li><li>CPVC</li><li>PVDF</li><li>ECTFE</li><li>FEP</li><li>PFA</li></ul></article>
            <article><h3>Outer Structure</h3><ul><li>FRP</li><li>Vinyl Ester Resin</li><li>Polyester Resin</li><li>Epoxy Resin</li></ul></article>
            <article><h3>Applications</h3><ul><li>Chemical Reactors</li><li>Absorbers</li><li>Scrubbers</li><li>Columns</li><li>Storage Tanks</li><li>Pressure Equipment</li></ul></article>
          </div>
          <div className="technical-note"><strong>Engineering review required.</strong> Final liner, resin and reinforcement selection must be based on complete process conditions.</div>
          <Link className="button button-primary" href="/request-a-quote">Discuss Your Application</Link>
        </div>
      </section>
    </main>
  );
}
