import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomepageEffects } from "@/components/homepage-effects";
import { products, technologies } from "@/content/catalogue";

type Props = { params: Promise<{ slug: string }> };

const technologyContent = {
  "frp-engineering": {
    title: "FRP engineering for corrosive environments",
    description: "High-performance composite equipment combining corrosion resistance, mechanical strength and low lifecycle maintenance.",
    construction: "FRP uses a resin-rich corrosion barrier with engineered glass reinforcement to create equipment suited to reviewed chemical, temperature and mechanical conditions.",
    applications: ["Storage tanks and vessels", "Reactors and columns", "Scrubbers and blowers", "Ducting and chimneys", "Pipelines", "Cable trays and gratings"],
  },
  "thermoplastic-fabrication": {
    title: "Precision thermoplastic fabrication",
    description: "Process equipment fabricated from engineering polymers selected around chemical compatibility, temperature and purity requirements.",
    construction: "Sheet, pipe and fabricated components are cut, formed and welded using controlled methods appropriate to the selected polymer and service duty.",
    applications: ["Chemical storage tanks", "Process and dosing tanks", "Acid storage systems", "Tank covers", "Fabricated components", "Process piping"],
  },
  "dual-laminate-technology": {
    title: "The best of two technologies",
    description: "A corrosion-resistant thermoplastic liner supported by an FRP structural shell for demanding process equipment.",
    construction: "The process-contact liner provides chemical resistance while the external composite laminate supplies structural strength. Liner, resin and reinforcement are selected together.",
    applications: ["Chemical reactors", "Absorbers and columns", "Scrubbers", "Storage tanks", "Pressure equipment", "Aggressive-chemical piping"],
  },
} as const;

export function generateStaticParams() { return technologies.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const technology = technologies.find((item) => item.slug === slug);
  return technology ? { title: technology.name, description: technology.summary, alternates: { canonical: `/technologies/${slug}` } } : {};
}

export default async function TechnologyPage({ params }: Props) {
  const { slug } = await params;
  const technology = technologies.find((item) => item.slug === slug);
  const content = technologyContent[slug as keyof typeof technologyContent];
  if (!technology || !content) notFound();
  const related = products.filter((product) => product.materials.some((material) => technology.materials.some((item) => material.includes(item) || item.includes(material)))).slice(0, 6);

  if (slug === "frp-engineering") {
    const productRange = ["FRP Storage Tanks", "FRP Pressure Vessels", "FRP Reactors", "FRP Scrubbers", "FRP Blowers", "FRP Ducting", "FRP Chimneys", "FRP Pipelines", "FRP Cable Trays", "Custom Fabricated Equipment"];
    const benefits = ["Excellent Corrosion Resistance", "Lightweight Construction", "High Mechanical Strength", "Low Maintenance", "Long Service Life", "UV Resistant", "Cost Effective"];

    return <main id="main-content">
      <HomepageEffects />
      <section className="section frp-solutions" aria-labelledby="frp-solutions-heading">
        <div className="shell">
          <p className="eyebrow dark">FRP Engineering Solutions</p>
          <h1 id="frp-solutions-heading">Glass Reinforced Plastic (FRP) Solutions</h1>
          <p className="frp-intro">High-performance composite equipment for corrosive environments. AMPAR Technova LLP designs and manufactures corrosion-resistant FRP equipment for demanding industrial applications, offering exceptional mechanical strength, lightweight construction, and long service life.</p>
          <div className="frp-product-layout">
            <div className="frp-image-stack">
              <figure><Image src="/images/frp-pipes-and-fittings.png" alt="Green FRP pipes and fittings prepared for industrial installation" width={1536} height={1024} priority /></figure>
              <figure><Image src="/images/frp-stacked-pipes.png" alt="Stacks of glass reinforced plastic pipes in multiple diameters" width={1536} height={1024} /></figure>
            </div>
            <div className="frp-range-column">
              <section className="frp-product-range" aria-labelledby="frp-range-heading"><h2 id="frp-range-heading">Product Range</h2><ul>{productRange.map((item) => <li key={item}>{item}</li>)}</ul></section>
              <section className="frp-benefits-panel" aria-labelledby="frp-benefits-heading"><h2 id="frp-benefits-heading">Key Benefits</h2><ul>{benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></section>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-muted"><div className="shell"><div className="section-heading"><div><p className="eyebrow dark">Related equipment</p><h2>Explore FRP product families</h2></div><Link className="button button-primary" href="/request-a-quote?technology=frp-engineering">Discuss Your Application</Link></div><div className="three-grid">{related.map((product) => <article className="card" key={product.slug}><p className="card-kicker">{product.category}</p><h3>{product.name}</h3><p>{product.summary}</p><Link className="text-link" href={`/products/${product.slug}`}>View product →</Link></article>)}</div></div></section>
    </main>;
  }

  if (slug === "thermoplastic-fabrication") {
    const columns = [
      { title: "Materials", items: ["PP", "PPH", "HDPE", "PVC", "CPVC", "PVDF", "ECTFE", "FEP", "PFA"] },
      { title: "Products", items: ["Chemical Storage Tanks", "Process Tanks", "Acid Storage Systems", "Dosing Tanks", "Tank Covers", "Fabricated Components"] },
      { title: "Advantages", items: ["Chemical Resistance", "Low Weight", "High Purity", "Easy Fabrication", "Long Service Life", "Low Maintenance"] },
    ];

    return <main id="main-content">
      <HomepageEffects />
      <section className="section thermoplastic-solutions" aria-labelledby="thermoplastic-heading">
        <div className="shell">
          <p className="eyebrow dark">Thermoplastic Fabrication</p>
          <h1 id="thermoplastic-heading">Precision-Engineered Plastic Process Equipment</h1>
          <p className="thermoplastic-intro">We manufacture high-quality thermoplastic process equipment using internationally accepted fabrication methods and premium engineering plastics.</p>
          <div className="thermoplastic-layout">
            <figure className="thermoplastic-photo"><Image src="/images/thermoplastic-process-vessel.png" alt="Large corrosion-resistant process vessel inside AMPAR's fabrication workshop" width={1120} height={1400} priority /></figure>
            <div className="thermoplastic-columns">
              {columns.map((column) => <section className="thermoplastic-column" key={column.title}><h2>{column.title}</h2><ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section section-muted"><div className="shell"><div className="section-heading"><div><p className="eyebrow dark">Related equipment</p><h2>Explore thermoplastic product families</h2></div><Link className="button button-primary" href="/request-a-quote?technology=thermoplastic-fabrication">Discuss Your Application</Link></div><div className="three-grid">{related.map((product) => <article className="card" key={product.slug}><p className="card-kicker">{product.category}</p><h3>{product.name}</h3><p>{product.summary}</p><Link className="text-link" href={`/products/${product.slug}`}>View product →</Link></article>)}</div></div></section>
    </main>;
  }

  if (slug === "dual-laminate-technology") {
    const benefits = ["Maximum Corrosion Protection", "High Structural Integrity", "Long Equipment Life", "Lower Maintenance Costs"];
    const columns = [
      { title: "Inner Liner", items: ["PP", "PPH", "PVC", "CPVC", "PVDF", "ECTFE", "FEP", "PFA"] },
      { title: "Outer Structure", items: ["FRP", "Vinyl Ester Resin", "Polyester Resin", "Epoxy Resin"] },
      { title: "Applications", items: ["Chemical Reactors", "Absorbers", "Scrubbers", "Columns", "Storage Tanks", "Pressure Equipment"] },
    ];

    return <main id="main-content">
      <HomepageEffects />
      <section className="section dual-technology" aria-labelledby="dual-technology-heading">
        <div className="shell dual-technology-layout">
          <div className="dual-technology-content">
            <p className="eyebrow">Dual Laminate Technology</p>
            <h1 id="dual-technology-heading">The Best of Two Technologies</h1>
            <p className="dual-technology-intro">Dual Laminate combines a corrosion-resistant thermoplastic liner with an FRP structural shell, delivering superior chemical resistance and mechanical strength.</p>
            <section className="dual-technology-benefits" aria-labelledby="why-dual-heading"><h2 id="why-dual-heading">Why Dual Laminate?</h2><ul>{benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></section>
            <div className="dual-technology-columns">{columns.map((column) => <section key={column.title}><h2>{column.title}</h2><ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
          </div>
          <figure className="dual-technology-photo"><Image src="/images/dual-laminate-storage-tank.png" alt="Dual-laminate storage tank with a thermoplastic liner and FRP structural reinforcement" width={1120} height={1400} priority /></figure>
        </div>
      </section>
      <section className="section"><div className="shell"><div className="section-heading"><div><p className="eyebrow dark">Related equipment</p><h2>Explore dual-laminate product families</h2></div><Link className="button button-primary" href="/request-a-quote?technology=dual-laminate-technology">Discuss Your Application</Link></div><div className="three-grid">{related.map((product) => <article className="card" key={product.slug}><p className="card-kicker">{product.category}</p><h3>{product.name}</h3><p>{product.summary}</p><Link className="text-link" href={`/products/${product.slug}`}>View product →</Link></article>)}</div></div></section>
    </main>;
  }

  return <main id="main-content">
    <HomepageEffects />
    <section className="page-hero"><div className="shell narrow"><p className="eyebrow">Technology expertise</p><h1>{content.title}</h1><p className="lead">{content.description}</p><div className="action-row"><Link className="button button-primary" href={`/request-a-quote?technology=${slug}`}>Discuss Your Application</Link></div></div></section>
    <section className="section"><div className="shell technical-layout"><div><p className="eyebrow dark">How it works</p><h2>Construction designed around the process</h2><p className="section-lead">{content.construction}</p><div className="technical-note prominent"><strong>Engineering review required.</strong> Final construction depends on chemical composition and concentration, temperatures, pressure, loads, dimensions and expected service conditions.</div></div><aside className="spec-panel"><h2>Material options</h2><div className="tag-list">{technology.materials.map((material) => <span key={material}>{material}</span>)}</div></aside></div></section>
    <section className="section section-muted"><div className="shell"><p className="eyebrow dark">Performance</p><h2>Key benefits</h2><div className="four-grid">{technology.benefits.map((benefit) => <article className="card" key={benefit}><h3>{benefit}</h3></article>)}</div></div></section>
    <section className="section navy-section"><div className="shell split"><div><p className="eyebrow">Applications</p><h2>Where this technology fits</h2></div><ul className="feature-list light-list">{content.applications.map((application) => <li key={application}>{application}</li>)}</ul></div></section>
    <section className="section"><div className="shell"><p className="eyebrow dark">Related equipment</p><h2>Explore suitable product families</h2><div className="three-grid">{related.map((product) => <article className="card" key={product.slug}><p className="card-kicker">{product.category}</p><h3>{product.name}</h3><p>{product.summary}</p><Link className="text-link" href={`/products/${product.slug}`}>View product →</Link></article>)}</div></div></section>
  </main>;
}
