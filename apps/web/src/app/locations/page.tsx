import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find AMPAR Technova LLP offices and manufacturing units in Ankleshwar and Dahej, Gujarat.",
};

const locations = [
  {
    label: "Registered Office & Unit 1",
    city: "Ankleshwar",
    address: "Plot No. 15, Madhav Industrial Park, Garden City Road, opposite FDDI, GIDC, Ankleshwar, Bharuch 393002, Gujarat, India.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Plot+No.+15+Madhav+Industrial+Park+Garden+City+Road+GIDC+Ankleshwar+Gujarat+393002",
    embedUrl: "https://www.google.com/maps?q=Plot+No.+15+Madhav+Industrial+Park+Garden+City+Road+GIDC+Ankleshwar+Gujarat+393002&output=embed",
  },
  {
    label: "Manufacturing Unit 2",
    city: "Dahej",
    address: "D3-E-40/4, Village Dahej, Taluka Vagra, District Bharuch 392130, Gujarat, India.",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=D3-E-40%2F4+Village+Dahej+Taluka+Vagra+Bharuch+Gujarat+392130",
    embedUrl: "https://www.google.com/maps?q=D3-E-40%2F4+Village+Dahej+Taluka+Vagra+Bharuch+Gujarat+392130&output=embed",
  },
] as const;

export default function LocationsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Our Locations"
        title="Engineering and manufacturing in Gujarat"
        description="Connect with AMPAR Technova LLP at our Ankleshwar registered office and manufacturing unit or our Dahej manufacturing unit."
        action={{ label: "Contact Our Team", href: "/contact" }}
      />
      <section className="section">
        <div className="shell locations-grid">
          {locations.map((location, index) => (
            <article className="location-card" key={location.city}>
              <div className="location-number" aria-hidden="true">0{index + 1}</div>
              <div>
                <p className="card-kicker">{location.city}</p>
                <h2>{location.label}</h2>
                <address>{location.address}</address>
                <div className="location-contact">
                  <a href="tel:+917600670953">+91 76006 70953</a>
                  <a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a>
                </div>
                <a className="button button-primary" href={location.mapUrl} target="_blank" rel="noreferrer">View on Google Maps</a>
              </div>
              <div className="location-map">
                <iframe
                  src={location.embedUrl}
                  title={`${location.label}, ${location.city} map`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section cta-section">
        <div className="shell cta-inner"><div><p className="eyebrow dark">Plan a discussion</p><h2>Talk with our engineering team</h2><p>Share your application, process conditions and project location so we can route your enquiry appropriately.</p></div><Link className="button button-primary" href="/request-a-quote">Request a Quote</Link></div>
      </section>
    </main>
  );
}
