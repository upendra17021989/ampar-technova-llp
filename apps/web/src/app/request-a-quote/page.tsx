import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "./quote-form";

export const metadata: Metadata = { title: "Request a Quote", description: "Share your equipment and process requirements with AMPAR Technova.", alternates: { canonical: "/request-a-quote" } };

export default function QuotePage() {
  return <main id="main-content"><section className="page-hero compact"><div className="shell narrow"><p className="eyebrow">Technical enquiry</p><h1>Request a Quote</h1><p className="lead">Tell us about the equipment and process conditions. AMPAR&apos;s engineering team will review the application before recommending a material or solution.</p></div></section><section className="section"><div className="shell form-layout"><Suspense fallback={<p>Loading quote form…</p>}><QuoteForm /></Suspense><aside className="contact-aside"><h2>Prefer to speak with us?</h2><a href="tel:+917600670953">+91 76006 70953</a><a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a><p>Monday-Friday business hours to be confirmed.</p></aside></div></section></main>;
}
