import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomepageEffects } from "@/components/homepage-effects";

export const metadata: Metadata = {
  title: "Pollution Control Systems",
  description: "Explore AMPAR Technova wet scrubbers, packed-bed scrubbers, corrosion-resistant blowers and industrial exhaust systems.",
  alternates: { canonical: "/products/pollution-control" },
};

const systems = [
  { name: "Wet Scrubbers", description: "High-efficiency gas absorption and fume neutralization", icon: "✹" },
  { name: "Packed Bed Scrubbers", description: "Enhanced gas-liquid contact for demanding emission control", icon: "●" },
  { name: "Blowers", description: "FRP and thermoplastic blowers built for corrosive exhaust streams", icon: "✦" },
  { name: "Exhaust Systems", description: "Complete ducting and stack systems for fume extraction", icon: "▽" },
] as const;

export default function PollutionControlPage() {
  return <main id="main-content">
    <HomepageEffects />
    <section className="section pollution-control" aria-labelledby="pollution-control-heading">
      <div className="shell">
        <p className="eyebrow dark">Pollution Control</p>
        <h1 id="pollution-control-heading">Engineered Emission &amp; Fume Control Systems</h1>
        <div className="pollution-control-layout">
          <figure className="pollution-control-photo"><Image src="/images/pollution-control-scrubber-system.png" alt="Wet scrubber, centrifugal blower, connecting duct and exhaust stack system" width={1120} height={1400} priority /></figure>
          <div className="pollution-system-range"><h2>System Range</h2><div className="pollution-system-list">{systems.map((system) => <article key={system.name}><span className="pollution-system-icon" aria-hidden="true">{system.icon}</span><div><h3>{system.name}</h3><p>{system.description}</p></div></article>)}</div></div>
        </div>
      </div>
    </section>
    <section className="section navy-section"><div className="shell split"><div><p className="eyebrow">Application engineering</p><h2>Configured around the gas stream</h2><p>Scrubber selection depends on contaminants, concentration, temperature, flow rate, pressure drop, removal efficiency and discharge requirements.</p></div><div><div className="technical-note"><strong>Engineering review required.</strong> Final materials, packing, recirculation, blower duty, ducting and stack configuration require complete process data.</div><Link className="button button-inverse" href="/request-a-quote?category=pollution-control">Discuss Your Emission-Control Requirement</Link></div></div></section>
  </main>;
}
