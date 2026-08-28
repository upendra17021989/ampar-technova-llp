import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return <main id="main-content">
    <section className="page-hero"><div className="shell narrow"><p className="eyebrow">Technology expertise</p><h1>{content.title}</h1><p className="lead">{content.description}</p><div className="action-row"><Link className="button button-primary" href={`/request-a-quote?technology=${slug}`}>Discuss Your Application</Link></div></div></section>
    <section className="section"><div className="shell technical-layout"><div><p className="eyebrow dark">How it works</p><h2>Construction designed around the process</h2><p className="section-lead">{content.construction}</p><div className="technical-note prominent"><strong>Engineering review required.</strong> Final construction depends on chemical composition and concentration, temperatures, pressure, loads, dimensions and expected service conditions.</div></div><aside className="spec-panel"><h2>Material options</h2><div className="tag-list">{technology.materials.map((material) => <span key={material}>{material}</span>)}</div></aside></div></section>
    <section className="section section-muted"><div className="shell"><p className="eyebrow dark">Performance</p><h2>Key benefits</h2><div className="four-grid">{technology.benefits.map((benefit) => <article className="card" key={benefit}><h3>{benefit}</h3></article>)}</div></div></section>
    <section className="section navy-section"><div className="shell split"><div><p className="eyebrow">Applications</p><h2>Where this technology fits</h2></div><ul className="feature-list light-list">{content.applications.map((application) => <li key={application}>{application}</li>)}</ul></div></section>
    <section className="section"><div className="shell"><p className="eyebrow dark">Related equipment</p><h2>Explore suitable product families</h2><div className="three-grid">{related.map((product) => <article className="card" key={product.slug}><p className="card-kicker">{product.category}</p><h3>{product.name}</h3><p>{product.summary}</p><Link className="text-link" href={`/products/${product.slug}`}>View product →</Link></article>)}</div></div></section>
  </main>;
}
