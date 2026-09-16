import type { Metadata } from "next";
import Link from "next/link";
import { HomepageEffects } from "@/components/homepage-effects";

export const metadata: Metadata = { title: "Contact", description: "Contact AMPAR Technova LLP in Ankleshwar and Dahej, Gujarat.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <main id="main-content" className="interior-page contact-page">
    <HomepageEffects />
    <section className="contact-presentation" aria-labelledby="contact-heading">
      <aside className="contact-presentation-aside">
        <div className="contact-brand"><svg viewBox="0 0 64 72" aria-hidden="true"><path className="brand-symbol-top" d="M32 2 61 18 32 34 3 18 32 2Z"/><path className="brand-symbol-middle" d="M3 27 32 43 61 27v16L32 59 3 43V27Z"/><path className="brand-symbol-bottom" d="M3 46 32 62 61 46v10L32 72 3 56V46Z"/></svg><span>AMPAR <b>TECHNOVA LLP</b></span></div>
        <div><p className="eyebrow">Contact Us</p><h1 id="contact-heading">Get in Touch</h1><p>Connect with our team for product enquiries, technical consultation and quotation requests.</p></div>
        <div className="contact-aside-actions"><a href="https://www.ampartechnova.com">www.ampartechnova.com</a><Link className="button button-inverse" href="/request-a-quote">Request a Quote</Link></div>
      </aside>
      <div className="contact-presentation-details">
        <section className="contact-people" aria-label="Direct contacts">
          <article><h2>Parshuram Singh</h2><div><a href="mailto:parshuram.singh@ampartechnova.com">parshuram.singh@ampartechnova.com</a><a href="tel:+917600670953">+91 76006 70953</a></div></article>
          <article><h2>Amarsingh Rajpurohit</h2><div><a href="mailto:amar@ampartechnova.com">amar@ampartechnova.com</a><a href="tel:+919924195097">+91 99241 95097</a></div></article>
        </section>
        <section className="contact-unit-grid" id="locations" aria-label="AMPAR locations">
          <article><p className="card-kicker">Ankleshwar</p><h2>Registered Office &amp; Unit 1</h2><address>Plot No. 15, Madhav Industrial Park, Garden City Road, opposite Footwear Design and Development Institute, GIDC, Ankleshwar, Bharuch 393002, Gujarat, India.</address><Link className="text-link" href="/locations">View location →</Link></article>
          <article><p className="card-kicker">Dahej</p><h2>Unit 2</h2><address>D3-E-40/4, Village Dahej, Taluka Vagra, District Bharuch 392130, Gujarat, India.</address><Link className="text-link" href="/locations">View location →</Link></article>
        </section>
        <section className="contact-company-record" aria-labelledby="company-record-heading"><h2 id="company-record-heading">Company Details</h2><dl><div><dt>Email</dt><dd><a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a></dd></div><div><dt>Phone</dt><dd><a href="tel:+917600670953">+91 76006 70953</a></dd></div><div><dt>LLPIN</dt><dd>ACX-8187</dd></div><div><dt>GSTIN</dt><dd>24ACOFA1924D1ZR</dd></div></dl></section>
        <p className="contact-signature">Innovation <span>•</span> Quality <span>•</span> Reliability</p>
      </div>
    </section>
  </main>;
}
