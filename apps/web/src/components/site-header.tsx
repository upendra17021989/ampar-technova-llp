"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navigation = [
  ["Products", "/products"],
  ["Technologies", "/#technologies"],
  ["Materials", "/materials"],
  ["Industries", "/industries"],
  ["Capabilities", "/#capabilities"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="shell utility-inner">
          <a href="tel:+917600670953">+91 76006 70953</a>
          <a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a>
        </div>
      </div>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="AMPAR Technova home">
          <Image className="brand-logo" src="/brand/ampar-technova-mark.jpeg" alt="" width={48} height={48} priority />
          <span>AMPAR TECHNOVA</span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            href.includes("#") ? (
              <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
            ) : (
              <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>
            )
          ))}
          <Link className="button button-primary nav-cta" href="/request-a-quote" onClick={() => setOpen(false)}>
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
