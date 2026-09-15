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
  ["Locations", "/locations"],
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
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const aboutRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 28);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    function closeAbout(event: MouseEvent) {
      if (!aboutRef.current?.contains(event.target as Node)) setAboutOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAboutOpen(false);
        setOpen(false);
      }
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

  const headerClass = [
    "site-header",
    isHome ? "site-header-home" : "site-header-inner",
    scrolled ? "is-scrolled" : "",
    open ? "has-open-menu" : "",
  ].filter(Boolean).join(" ");

  return (
    <header className={headerClass} data-site-header>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="AMPAR Technova LLP home" onClick={closeNavigation}>
          <Image className="brand-logo-full" src="/brand/ampar-technova-full-logo.png" alt="AMPAR Technova LLP" width={1494} height={578} priority />
        </Link>

        <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((current) => !current)}>
          <span className="menu-button-lines" aria-hidden="true"><i /><i /></span>
          <span>{open ? "Close" : "Menu"}</span>
        </button>

        <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          <div className="mobile-menu-meta" aria-hidden="true"><span>AMPAR / NAVIGATION</span><span>ANKLESHWAR / DAHEJ</span></div>
          {navigation.map(([label, href], index) => (
            href.includes("#") ? (
              <a key={label} style={{ "--nav-index": index } as React.CSSProperties} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}><span className="mobile-nav-number" aria-hidden="true">0{index + 1}</span>{label}</a>
            ) : (
              <Link key={label} style={{ "--nav-index": index } as React.CSSProperties} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}><span className="mobile-nav-number" aria-hidden="true">0{index + 1}</span>{label}</Link>
            )
          ))}
          <div className="nav-dropdown" ref={aboutRef}>
            <button className={pathname.startsWith("/about") ? "nav-dropdown-trigger nav-link-active" : "nav-dropdown-trigger"} type="button" aria-expanded={aboutOpen} aria-controls="about-navigation" onClick={() => setAboutOpen((current) => !current)}>
              <span><span className="mobile-nav-number" aria-hidden="true">07</span>About Us</span><span className="nav-chevron" aria-hidden="true" />
            </button>
            <div id="about-navigation" className={aboutOpen ? "nav-dropdown-menu is-open" : "nav-dropdown-menu"}>
              {aboutNavigation.map(([label, href]) => (
                <Link key={label} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}>{label}</Link>
              ))}
            </div>
          </div>
          <Link style={{ "--nav-index": 7 } as React.CSSProperties} className={isActive("/contact") ? "nav-link-active" : undefined} aria-current={isActive("/contact") ? "page" : undefined} href="/contact" onClick={closeNavigation}><span className="mobile-nav-number" aria-hidden="true">08</span>Contact Us</Link>
          <Link className={isActive("/request-a-quote") ? "button button-primary nav-cta nav-cta-active" : "button button-primary nav-cta"} aria-current={isActive("/request-a-quote") ? "page" : undefined} href="/request-a-quote" onClick={closeNavigation}>Request a Quote <span aria-hidden="true">&rarr;</span></Link>
          <div className="mobile-menu-contact">
            <a href="tel:+917600670953">+91 76006 70953</a>
            <a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a>
          </div>
        </nav>
      </div>
    </header>
  );
}