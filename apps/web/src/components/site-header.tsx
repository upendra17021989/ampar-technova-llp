"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  ["Products", "/products"],
  ["Technologies", "/#technologies"],
  ["Materials", "/materials"],
  ["Industries", "/industries"],
  ["Capabilities", "/#capabilities"],
] as const;

const aboutNavigation = [
  ["Who We Are", "/about#who-we-are"],
  ["Our Group", "/about#our-group"],
  ["Our Vision", "/about#our-vision"],
  ["Our Mission", "/about#our-mission"],
  ["Why AMPAR", "/about#why-ampar"],
] as const;

export function SiteHeader() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    function closeAbout(event: MouseEvent) {
      if (!aboutRef.current?.contains(event.target as Node)) setAboutOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setAboutOpen(false);
    }

    document.addEventListener("mousedown", closeAbout);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeAbout);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeNavigation() {
    setOpen(false);
    setAboutOpen(false);
  }

  function isActive(href: string) {
    const [route, hash] = href.split("#");
    const normalizedRoute = route.replace(/\/$/, "") || "/";
    if (hash) return pathname === normalizedRoute && currentHash === `#${hash}`;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="shell utility-inner">
          <Link href="/locations">Locations</Link>
          <a href="tel:+917600670953">+91 76006 70953</a>
          <a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a>
        </div>
      </div>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="AMPAR Technova LLP home">
          <Image
            className="brand-logo-full"
            src="/brand/ampar-technova-full-logo.png"
            alt="AMPAR Technova LLP"
            width={1494}
            height={578}
            priority
          />
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
              <a key={label} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}>{label}</a>
            ) : (
              <Link key={label} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}>{label}</Link>
            )
          ))}
          <div className="nav-dropdown" ref={aboutRef}>
            <button
              className={pathname.startsWith("/about") ? "nav-dropdown-trigger nav-link-active" : "nav-dropdown-trigger"}
              type="button"
              aria-expanded={aboutOpen}
              aria-controls="about-navigation"
              onClick={() => setAboutOpen((current) => !current)}
            >
              <span>About Us</span><span className="nav-chevron" aria-hidden="true" />
            </button>
            <div id="about-navigation" className={aboutOpen ? "nav-dropdown-menu is-open" : "nav-dropdown-menu"}>
              {aboutNavigation.map(([label, href]) => (
                <Link key={label} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}>{label}</Link>
              ))}
            </div>
          </div>
          <Link className={isActive("/contact") ? "nav-link-active" : undefined} aria-current={isActive("/contact") ? "page" : undefined} href="/contact" onClick={closeNavigation}>Contact Us</Link>
          <Link className={isActive("/request-a-quote") ? "button button-primary nav-cta nav-cta-active" : "button button-primary nav-cta"} aria-current={isActive("/request-a-quote") ? "page" : undefined} href="/request-a-quote" onClick={closeNavigation}>
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
