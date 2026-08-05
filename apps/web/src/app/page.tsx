import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveProductExplorer } from "@/components/interactive-product-explorer";
import { ParallaxHeroMedia } from "@/components/parallax-hero-media";
import { HomepageEffects } from "@/components/homepage-effects";
import { industries, productCategories, products, technologies } from "@/content/catalogue";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <main id="main-content">
      <HomepageEffects />
      <section className="home-hero" aria-labelledby="home-heading">
        <ParallaxHeroMedia />
        <div className="shell hero-grid">
          <div className="home-hero-content">
            <p className="eyebrow">Corrosion-resistant engineering solutions</p>
            <h1 id="home-heading">Engineering Tomorrow&apos;s Corrosion-Resistant Solutions</h1>
            <p className="lead">Advanced thermoplastics, FRP, dual-laminate technology and process equipment for demanding industrial applications.</p>
            <div className="action-row">
              <Link className="button button-primary" href="/request-a-quote">Request a Quote</Link>
              <Link className="button button-inverse" href="/products">Explore Products</Link>
            </div>
          </div>
          <div className="hero-capabilities" aria-label="Core capabilities"><span>FRP Engineering</span><span>Thermoplastic Fabrication</span><span>Dual Laminate</span><span>Process Equipment</span></div>
        </div>
      </section>

      <section className="section" aria-labelledby="categories-heading">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow dark">Product portfolio</p><h2 id="categories-heading">Engineered for demanding process conditions</h2></div><Link className="text-link" href="/products">View all products →</Link></div>
          <div className="category-grid">
            {productCategories.map((category, index) => <article className="category-card" key={category.slug}><span className="category-number">0{index + 1}</span><h3>{category.name}</h3><p>{category.summary}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section section-muted" id="technologies" aria-labelledby="technologies-heading">
        <div className="shell">
          <p className="eyebrow dark">Material and construction expertise</p>
          <h2 id="technologies-heading">Three complementary technologies</h2>
          <div className="three-grid">{technologies.map((technology) => <article className="card" key={technology.slug}><h3>{technology.name}</h3><p>{technology.summary}</p><Link className="text-link" href={`/technologies/${technology.slug}`}>Explore technology →</Link></article>)}</div>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-heading">
        <div className="shell"><p className="eyebrow dark">Selected solutions</p><h2 id="featured-heading">Find the right solution for your application</h2><p className="section-intro">Choose a product family to quickly compare relevant equipment and material options.</p><InteractiveProductExplorer products={products} /></div>
      </section>

      <section className="section navy-section" id="capabilities" aria-labelledby="capabilities-heading">
        <div className="shell split"><div><p className="eyebrow">From design to delivery</p><h2 id="capabilities-heading">Engineering and manufacturing capability</h2><p>Process-equipment design, CAD modelling, material selection, plastic welding, FRP lamination, filament winding, inspection and on-site support.</p></div><div className="evidence-list"><span>Material verification</span><span>Dimensional inspection</span><span>Hydrostatic testing</span><span>Weld and laminate checks</span></div></div>
      </section>

      <section className="section" aria-labelledby="industries-heading"><div className="shell"><div className="section-heading"><div><p className="eyebrow dark">Industries served</p><h2 id="industries-heading">Solutions connected to process challenges</h2></div><Link className="text-link" href="/industries">View industries →</Link></div><div className="industry-list">{industries.slice(0, 8).map((industry) => <span key={industry.slug}>{industry.name}</span>)}</div></div></section>

      <section className="section cta-section"><div className="shell cta-inner"><div><p className="eyebrow dark">Discuss your requirement</p><h2>Bring us your process conditions.</h2><p>Share the chemical, concentration, temperature, pressure, capacity and project schedule. AMPAR&apos;s engineering team will review the application.</p></div><Link className="button button-primary" href="/request-a-quote">Start a Quote Request</Link></div></section>
    </main>
  );
}
