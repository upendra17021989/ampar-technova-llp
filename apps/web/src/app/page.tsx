import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomepageEffects } from "@/components/homepage-effects";
import { LogoIntro } from "@/components/logo-intro";
import { ParallaxHeroMedia } from "@/components/parallax-hero-media";
import { TechnologyDrawing } from "@/components/technology-drawing";
import { industries, productCategories, technologies } from "@/content/catalogue";

export const metadata: Metadata = { title: "Corrosion-Resistant Process Engineering", description: "AMPAR designs and manufactures FRP, thermoplastic and dual-laminate process equipment for demanding industrial environments.", alternates: { canonical: "/" } };

const productImages = ["/products/who-we-are-tanks.png", "/images/thermoplastic-process-vessel.png", "/images/pollution-control-scrubber-system.png", "/images/frp-pipes-and-fittings.png", "/products/frp-piping-manifold.jpeg"] as const;
const technologyImages = ["/images/frp-stacked-pipes.png", "/images/composite-pipes-material-expertise.png", "/images/dual-laminate-storage-tank.png"] as const;
const processSteps = [
  ["01", "Define", "We map chemistry, concentration, temperature, pressure, capacity and site constraints."],
  ["02", "Engineer", "Material selection, equipment design and detailing turn process duty into a manufacturable solution."],
  ["03", "Fabricate", "Controlled thermoplastic welding, FRP lamination and filament winding build the specified construction."],
  ["04", "Verify", "Material, dimensional, weld, laminate and hydrostatic checks provide documented manufacturing evidence."],
  ["05", "Deliver", "Installation coordination and site support help the equipment perform as designed."],
] as const;
const qualityEvidence = ["Material verification", "Dimensional inspection", "Weld and laminate checks", "Hydrostatic testing"];

export default function HomePage() {
  return (
    <main id="main-content" className="editorial-home">
      <LogoIntro />
      <HomepageEffects />
      <div className="home-hero-scroll"><section className="home-hero" aria-labelledby="home-heading">
        <ParallaxHeroMedia />
        <div className="shell hero-grid"><div className="home-hero-content"><p className="eyebrow">Corrosion-resistant engineering / Gujarat, India</p><h1 id="home-heading">Engineering Tomorrow&apos;s Corrosion-Resistant Solutions</h1><p className="lead">Advanced thermoplastics, FRP, dual-laminate technology and process equipment for demanding industrial applications.</p><div className="action-row"><Link className="button button-primary" href="/request-a-quote">Request a Quote</Link><Link className="button button-inverse" href="/products">Explore Products</Link></div></div><div className="hero-capabilities" aria-label="Core capabilities"><span>FRP Engineering</span><span>Thermoplastic Fabrication</span><span>Dual Laminate</span><span>Process Equipment</span></div></div>
        <div className="shell hero-footnote"><span>Design</span><span>Manufacture</span><span>Installation support</span></div>
      </section></div>

      <section className="section home-positioning" aria-labelledby="positioning-heading"><div className="shell positioning-grid"><p className="eyebrow dark">Built around the process</p><div><h2 id="positioning-heading">We engineer the barrier between aggressive chemistry and critical operations.</h2><div className="positioning-copy"><p>AMPAR combines material knowledge with practical fabrication to create equipment that fits the process—not the other way around.</p><Link className="text-link" href="/about">Meet AMPAR <span aria-hidden="true">→</span></Link></div></div></div></section>

      <section className="section product-story" aria-labelledby="categories-heading"><div className="shell section-heading home-section-heading"><div><p className="eyebrow">Product capability</p><h2 id="categories-heading">Five families. One engineered system.</h2></div><Link className="text-link light-link" href="/products">View all products <span aria-hidden="true">→</span></Link></div><div className="shell product-story-list">{productCategories.map((category, index) => <article className="product-story-card" key={category.slug}><div className="product-story-media"><Image src={productImages[index]} alt="" fill sizes="(max-width: 832px) 100vw, 42vw" /></div><div className="product-story-copy"><span className="category-number">0{index + 1} / 05</span><h3>{category.name}</h3><p>{category.summary}</p><Link href="/products">Explore family <span aria-hidden="true">↗</span></Link></div></article>)}</div></section>

      <section className="section technology-story" id="technologies" aria-labelledby="technologies-heading"><div className="shell"><div className="section-heading home-section-heading"><div><p className="eyebrow dark">Material intelligence</p><h2 id="technologies-heading">Three technologies.<br />Selected for the duty.</h2></div><p className="section-intro">Each construction method solves a different balance of corrosion resistance, purity, strength and lifecycle value.</p></div><div className="technology-stage"><TechnologyDrawing /><div className="technology-grid">{technologies.map((technology, index) => <article key={technology.slug}><div className="technology-media"><Image src={technologyImages[index]} alt="" fill sizes="(max-width: 832px) 100vw, 33vw" /></div><span>0{index + 1}</span><h3>{technology.name}</h3><p>{technology.summary}</p><ul>{technology.materials.slice(0, 4).map((material) => <li key={material}>{material}</li>)}</ul><Link className="text-link" href={`/technologies/${technology.slug}`}>Explore technology <span aria-hidden="true">→</span></Link></article>)}</div></div></div></section>

      <section className="section process-story" id="process" aria-labelledby="process-heading"><div className="shell process-layout"><div className="process-intro"><p className="eyebrow">From design to delivery</p><h2 id="process-heading">A controlled path from process data to site.</h2><p>Every project moves through visible engineering and quality gates.</p><Link className="button button-inverse" href="/capabilities">Explore capabilities</Link><div className="process-counter" aria-hidden="true"><span className="process-counter-window"><span className="process-counter-track">{processSteps.map(([number]) => <span key={number}>{number}</span>)}</span></span><span className="process-counter-total">/ 05</span></div></div><div className="process-track"><i className="process-progress" aria-hidden="true" /><ol className="process-steps">{processSteps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></div></div></section>

      <section className="section quality-story" aria-labelledby="quality-heading"><div className="shell quality-layout"><div className="quality-collage"><figure className="quality-image quality-image-main"><Image src="/products/frp-piping-installation.jpeg" alt="Corrosion-resistant piping installation" fill sizes="(max-width: 832px) 100vw, 48vw" /></figure><figure className="quality-image quality-image-detail"><Image src="/products/frp-packed-bed-scrubber.jpeg" alt="Fabricated packed-bed scrubber" fill sizes="(max-width: 832px) 48vw, 22vw" /></figure><span className="quality-tag">Built. Checked. Documented.</span></div><div className="quality-copy"><p className="eyebrow dark">Manufacturing evidence</p><h2 id="quality-heading">Quality is built into every stage—not inspected in at the end.</h2><p>Checks follow the material and fabrication route selected for each application. The result is traceable, reviewable evidence aligned with the approved project requirements.</p><div className="quality-evidence">{qualityEvidence.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div><Link className="text-link" href="/quality">See our quality approach <span aria-hidden="true">→</span></Link></div></div></section>

      <section className="industries-story" aria-labelledby="industries-heading"><div className="shell industries-title"><p className="eyebrow">Industries served</p><h2 id="industries-heading">Where corrosion cannot be an afterthought.</h2></div><div className="industry-marquee" aria-label="Industries served"><div className="industry-marquee-track">{[0, 1].map((copy) => <div className="industry-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{industries.slice(0, 8).map((industry, index) => <Link href="/industries" key={industry.slug} tabIndex={copy === 1 ? -1 : undefined}><span>0{index + 1}</span>{industry.name}</Link>)}</div>)}</div></div></section>

      <section className="section reach-story" aria-labelledby="reach-heading"><div className="shell reach-grid"><div><p className="eyebrow dark">Operational reach</p><h2 id="reach-heading">Made in Gujarat.<br />Engineered for industry.</h2><p>Our Ankleshwar and Dahej locations place engineering and manufacturing close to one of India&apos;s most important industrial corridors.</p><Link className="button button-primary" href="/locations">View our locations</Link></div><div className="reach-locations"><article><span>01 / Registered office + Unit 1</span><h3>Ankleshwar</h3><p>Bharuch, Gujarat</p></article><article><span>02 / Manufacturing Unit 2</span><h3>Dahej</h3><p>Bharuch, Gujarat</p></article></div></div></section>

      <section className="section final-cta" aria-labelledby="final-cta-heading"><div className="shell"><p className="eyebrow">Your process conditions are the starting point</p><h2 id="final-cta-heading">Bring us the challenge.<br /><span>We&apos;ll engineer the solution.</span></h2><p>Share the chemical, concentration, temperature, pressure, capacity and project schedule.</p><Link className="button button-primary" href="/request-a-quote">Start a Quote Request <span aria-hidden="true">→</span></Link></div></section>
    </main>
  );
}
