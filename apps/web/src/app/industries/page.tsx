import type { Metadata } from "next";
import { HomepageEffects } from "@/components/homepage-effects";
import { PageHero } from "@/components/page-hero";
import { industries } from "@/content/catalogue";

export const metadata: Metadata = { title: "Industries", description: "Industrial sectors served by AMPAR Technova corrosion-resistant engineering solutions.", alternates: { canonical: "/industries" } };

export default function IndustriesPage() {
  return <main id="main-content"><HomepageEffects /><PageHero eyebrow="Industries served" title="Built around industrial corrosion and process challenges" description="AMPAR supports critical applications across process, infrastructure and high-purity industries." action={{ label: "Request Technical Consultation", href: "/request-a-quote" }} /><section className="section"><div className="shell industry-card-grid">{industries.map((industry, index) => <article className="industry-card" key={industry.slug}><span>0{index + 1}</span><h2>{industry.name}</h2><p>Explore suitable products and materials with final recommendations reviewed by AMPAR&apos;s engineering team.</p></article>)}</div></section></main>;
}
