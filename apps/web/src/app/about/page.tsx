import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about AMPAR Technova LLP, the Amar Group of Companies, and our engineering mission.",
  alternates: { canonical: "/about" },
};

const mission = [
  "Deliver world-class industrial solutions",
  "Provide superior quality products",
  "Build long-term customer relationships",
  "Promote innovation and engineering excellence",
  "Ensure safety, reliability, and environmental responsibility",
];

const whyAmpar = {
  offers: [
    "Customized Engineering Solutions",
    "Corrosion-Resistant Equipment",
    "International Design Standards",
    "Precision Manufacturing",
    "High-Performance Materials",
    "Cost-Effective Solutions",
    "Technical Support",
    "Timely Delivery",
  ],
  strengths: [
    "Engineering Expertise",
    "Advanced Polymer Technology",
    "Process Equipment Manufacturing",
    "Customer-Centric Approach",
    "Quality Assurance",
    "Continuous Innovation",
  ],
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="About AMPAR"
        title="Engineering-led corrosion-resistant solutions"
        description="AMPAR Technova LLP combines thermoplastic, FRP and dual-laminate expertise to solve demanding industrial process challenges."
        action={{ label: "Contact AMPAR", href: "/contact" }}
      />
      <nav className="section-jump-nav" aria-label="About page sections">
        <div className="shell">
          <a href="#who-we-are">Who We Are</a>
          <a href="#our-group">Our Group</a>
          <a href="#our-vision">Our Vision</a>
          <a href="#our-mission">Our Mission</a>
          <a href="#why-ampar">Why AMPAR</a>
        </div>
      </nav>
      <section className="section" id="who-we-are">
        <div className="shell readable about-intro">
          <p className="eyebrow dark">Who We Are</p>
          <h2>Corrosion-resistant engineering, designed around the process</h2>
          <p>AMPAR Technova LLP is an engineering-driven company specializing in the design, manufacturing and supply of high-performance corrosion-resistant equipment and thermoplastic process solutions. We provide innovative products for industries where reliability, chemical resistance and long service life are essential.</p>
          <p>With expertise in thermoplastics, FRP composites and dual-laminate technologies, we deliver customized solutions that meet international engineering standards and the demanding requirements of chemical-processing industries.</p>
        </div>
      </section>
      <section className="section section-muted" id="our-group">
        <div className="shell">
          <p className="eyebrow dark">Our Group</p>
          <h2>Complete engineering and manufacturing capability under one roof</h2>
          <p className="section-lead">AMPAR Technova LLP was established in 2026 by Mr. Amarsingh Rajpurohit and Mr. Parshuram Singh. As part of the Amar Group of Companies, we work closely with our sister concerns to deliver integrated solutions.</p>
          <div className="group-grid">
            <article className="card group-card">
              <span>Established 2007</span>
              <h3>Amar Fibro Tech Industries</h3>
              <p>A service provider for corrosion-resistant FRP, PP-FRP and composite process equipment, including storage tanks, process vessels, pipelines, ducting, cable trays, gratings and industrial piping, together with installation, maintenance and shutdown services.</p>
            </article>
            <article className="card group-card">
              <span>Established 2020</span>
              <h3>Econfra Projects Private Limited</h3>
              <p>An industrial construction company providing plant construction, equipment erection, process and utility piping, structural fabrication, storage-tank construction, mechanical installation, shutdowns, testing, commissioning and project management.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section" id="our-vision">
        <div className="shell vision-panel">
          <div><p className="eyebrow">Our Vision</p><h2>Trusted engineering for a more resilient industry</h2></div>
          <p>To become one of India&apos;s most trusted manufacturers of advanced corrosion-resistant engineering solutions by delivering innovation, quality and sustainable technologies.</p>
        </div>
      </section>
      <section className="section section-muted" id="our-mission">
        <div className="shell mission-layout">
          <div><p className="eyebrow dark">Our Mission</p><h2>Five commitments guide our work</h2></div>
          <ul className="mission-list">{mission.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      <section className="section" id="why-ampar">
        <div className="shell why-panel">
          <p className="eyebrow dark">Why AMPAR Technova LLP</p>
          <h2>Engineering Excellence Built on Innovation</h2>
          <p>We bring together material knowledge, application-focused design and group-wide manufacturing and project capability to develop solutions around each customer&apos;s process conditions.</p>
          <div className="why-grid">
            <article>
              <h3>We Offer</h3>
              <ul>{whyAmpar.offers.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <h3>Core Strengths</h3>
              <ul>{whyAmpar.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
