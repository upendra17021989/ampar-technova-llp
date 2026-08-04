import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact AMPAR Technova LLP in Ankleshwar and Dahej, Gujarat.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Contact Us" title="Talk with AMPAR Technova LLP" description="Contact our team for product enquiries, technical consultation and quotation requests." />
      <section className="section" id="locations">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow dark">Locations</p><h2>Engineering support in Ankleshwar and Dahej</h2></div></div>
          <div className="contact-grid contact-location-grid">
            <article className="card"><p className="card-kicker">Ankleshwar</p><h2>Registered Office & Unit 1</h2><address>Plot No. 15, Madhav Industrial Park, Garden City Road, opposite Footwear Design and Development Institute, GIDC, Ankleshwar, Bharuch 393002, Gujarat, India.</address></article>
            <article className="card"><p className="card-kicker">Dahej</p><h2>Unit 2</h2><address>D3-E-40/4, Village Dahej, Taluka Vagra, District Bharuch 392130, Gujarat, India.</address></article>
          </div>
          <div className="contact-details-panel">
            <section aria-labelledby="company-details-heading">
              <h2 id="company-details-heading">Get in Touch</h2>
              <dl className="contact-details-list">
                <div><dt>Email</dt><dd><a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a></dd></div>
                <div><dt>Phone</dt><dd><a href="tel:+917600670953">+91 76006 70953</a></dd></div>
                <div><dt>LLPIN</dt><dd>ACX-8187</dd></div>
                <div><dt>GSTIN</dt><dd>24ACOFA1924D1ZR</dd></div>
              </dl>
              <Link className="button button-primary contact-quote-button" href="/request-a-quote">Request a Quote</Link>
            </section>
            <section aria-labelledby="founders-heading">
              <h2 id="founders-heading">Founders</h2>
              <div className="founder-list">
                <article><h3>Parshuram Singh</h3><a href="mailto:parshuram.singh@ampartechnova.com">parshuram.singh@ampartechnova.com</a><a href="tel:+917600670953">+91 76006 70953</a></article>
                <article><h3>Amarsingh Rajpurohit</h3><a href="mailto:amar@ampartechnova.com">amar@ampartechnova.com</a><a href="tel:+919924195097">+91 99241 95097</a></article>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
