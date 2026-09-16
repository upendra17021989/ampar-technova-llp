import Image from "next/image";
import Link from "next/link";

const productLinks = [
  ["Products", "/products"],
  ["Materials", "/materials"],
  ["Industries", "/industries"],
  ["FRP Engineering", "/technologies/frp-engineering"],
  ["Dual Laminate", "/technologies/dual-laminate-technology"],
] as const;

const companyLinks = [
  ["About AMPAR", "/about"],
  ["Locations", "/locations"],
  ["Capabilities", "/capabilities"],
  ["Quality & Standards", "/quality"],
  ["Contact", "/contact"],
  ["Request a Quote", "/request-a-quote"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-lead">
        <p className="eyebrow">Start a project</p>
        <div className="footer-lead-grid">
          <h2>Build corrosion resistance into your process.</h2>
          <div>
            <p>Share your chemical, temperature, pressure, capacity and schedule. Our engineering team will review the application.</p>
            <Link className="button button-primary" href="/request-a-quote">Discuss your requirement <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>
      </div>

      <div className="shell footer-grid">
        <div className="footer-identity">
          <Link className="footer-brand" href="/" aria-label="AMPAR Technova LLP home">
            <Image src="/brand/ampar-technova-full-logo.png" alt="AMPAR Technova LLP" width={1494} height={578} />
          </Link>
          <p>Corrosion-resistant FRP, thermoplastic, dual-laminate and process equipment solutions.</p>
          <span className="footer-index">IND / 24.5788 N / 73.6893 E</span>
        </div>

        <nav aria-label="Solutions">
          <h3>Solutions</h3>
          {productLinks.map(([label, href]) => <Link key={label} href={href}>{label}<span aria-hidden="true">&nearr;</span></Link>)}
        </nav>

        <nav aria-label="Company">
          <h3>Company</h3>
          {companyLinks.map(([label, href]) => <Link key={label} href={href}>{label}<span aria-hidden="true">&nearr;</span></Link>)}
        </nav>


        <address>
          <h3>Get in touch</h3>
          <a href="tel:+917600670953">+91 76006 70953</a>
          <a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a>
          <span>Ankleshwar and Dahej<br />Gujarat, India</span>
        </address>
      </div>

      <div className="shell footer-bottom">
        <span>&copy; {new Date().getFullYear()} AMPAR Technova LLP</span>
        <span>ENGINEERED FOR DEMANDING PROCESS CONDITIONS</span>
        <a href="#main-content">Back to top &uarr;</a>
      </div>
    </footer>
  );
}