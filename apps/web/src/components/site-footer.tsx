import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand"><Image src="/brand/ampar-technova-mark.jpeg" alt="" width={48} height={48} /><span>AMPAR TECHNOVA LLP</span></div>
          <p>Corrosion-resistant FRP, thermoplastic, dual-laminate and process equipment solutions.</p>
        </div>
        <div>
          <h2>Solutions</h2>
          <Link href="/products">Products</Link>
          <Link href="/materials">Materials</Link>
          <Link href="/industries">Industries</Link>
        </div>
        <div>
          <h2>Company</h2>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/request-a-quote">Request a Quote</Link>
        </div>
        <address>
          <h2>Get in touch</h2>
          <a href="tel:+917600670953">+91 76006 70953</a>
          <a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a>
          <span>Ankleshwar and Dahej, Gujarat, India</span>
        </address>
      </div>
      <div className="shell footer-bottom">© {new Date().getFullYear()} AMPAR Technova LLP</div>
    </footer>
  );
}
