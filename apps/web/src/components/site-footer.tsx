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
            <Link className="button button-primary" href="/request-a-quote">Discuss your requirement <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>

      <div className="shell footer-grid">
        <div className="footer-identity">
          <Link className="footer-brand" href="/" aria-label="AMPAR Technova LLP home">
            <svg className="footer-brand-symbol" viewBox="0 0 64 72" aria-hidden="true">
              <path className="brand-symbol-top" d="M32 2 61 18 32 34 3 18 32 2Z" />
              <path className="brand-symbol-middle" d="M3 27 32 43 61 27v16L32 59 3 43V27Z" />
              <path className="brand-symbol-bottom" d="M3 46 32 62 61 46v10L32 72 3 56V46Z" />
            </svg>
            <span><strong>AMPAR</strong><b>Technova LLP</b><small>Engineering corrosion resistance</small></span>
          </Link>
          <p>Corrosion-resistant FRP, thermoplastic, dual-laminate and process equipment solutions.</p>
          <span className="footer-index">IND / 24.5788 N / 73.6893 E</span>
        </div>

        <nav aria-label="Solutions">
          <h3>Solutions</h3>
          {productLinks.map(([label, href]) => <Link key={label} href={href}>{label}<span aria-hidden="true">↗</span></Link>)}
        </nav>

        <nav aria-label="Company">
          <h3>Company</h3>
          {companyLinks.map(([label, href]) => <Link key={label} href={href}>{label}<span aria-hidden="true">↗</span></Link>)}
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
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
