"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const navigation = [
  ["Materials", "/materials", "03"],
  ["Industries", "/industries", "04"],
  ["Capabilities", "/capabilities", "05"],
  ["Quality", "/quality", "06"],
  ["Locations", "/locations", "07"],
] as const;

const technologyNavigation = [
  ["FRP Engineering", "/technologies/frp-engineering"],
  ["Thermoplastic Fabrication", "/technologies/thermoplastic-fabrication"],
  ["Dual Laminate Technology", "/technologies/dual-laminate-technology"],
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
  const [technologiesOpen, setTechnologiesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const aboutRef = useRef<HTMLDivElement>(null);
  const technologiesRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    const desktop = window.matchMedia?.("(min-width: 80.001rem)");
    const closeOnDesktop = () => { if (desktop?.matches) setOpen(false); };
    desktop?.addEventListener?.("change", closeOnDesktop);
    return () => desktop?.removeEventListener?.("change", closeOnDesktop);
  }, []);

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
    function closeDropdowns(event: MouseEvent) {
      if (!aboutRef.current?.contains(event.target as Node)) setAboutOpen(false);
      if (!technologiesRef.current?.contains(event.target as Node)) setTechnologiesOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAboutOpen(false);
        setTechnologiesOpen(false);
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", closeDropdowns);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeDropdowns);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  function closeNavigation() {
    setOpen(false);
    setAboutOpen(false);
    setTechnologiesOpen(false);
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
          <svg className="brand-symbol" viewBox="0 0 64 72" aria-hidden="true">
            <path className="brand-symbol-top" d="M32 2 61 18 32 34 3 18 32 2Z" />
            <path className="brand-symbol-middle" d="M3 27 32 43 61 27v16L32 59 3 43V27Z" />
            <path className="brand-symbol-bottom" d="M3 46 32 62 61 46v10L32 72 3 56V46Z" />
          </svg>
          <span className="brand-wordmark"><strong>AMPAR</strong><span>Technova LLP</span><small>Engineering corrosion resistance</small></span>
        </Link>

        <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((current) => !current)}>
          <span className="menu-button-lines" aria-hidden="true"><i /><i /></span>
          <span>{open ? "Close" : "Menu"}</span>
        </button>

        <nav id="primary-navigation" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          <div className="mobile-menu-meta" aria-hidden="true"><span>AMPAR / NAVIGATION</span><span>ANKLESHWAR / DAHEJ</span></div>

          <Link style={{ "--nav-index": 0 } as CSSProperties} className={isActive("/products") ? "nav-link-active" : undefined} aria-current={isActive("/products") ? "page" : undefined} href="/products" onClick={closeNavigation}>
            <span className="mobile-nav-number" aria-hidden="true">01</span>Products
          </Link>

          <div className="nav-dropdown" ref={technologiesRef} style={{ "--nav-index": 1 } as CSSProperties}>
            <button className={pathname.startsWith("/technologies") ? "nav-dropdown-trigger nav-link-active" : "nav-dropdown-trigger"} type="button" aria-expanded={technologiesOpen} aria-controls="technologies-navigation" onClick={() => setTechnologiesOpen((current) => !current)}>
              <span><span className="mobile-nav-number" aria-hidden="true">02</span>Technologies</span><span className="nav-chevron" aria-hidden="true" />
            </button>
            <div id="technologies-navigation" className={technologiesOpen ? "nav-dropdown-menu is-open" : "nav-dropdown-menu"}>
              {technologyNavigation.map(([label, href]) => (
                <Link key={label} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}>{label}</Link>
              ))}
            </div>
          </div>

          {navigation.map(([label, href, number], index) => (
            <Link key={label} style={{ "--nav-index": index + 2 } as CSSProperties} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}>
              <span className="mobile-nav-number" aria-hidden="true">{number}</span>{label}
            </Link>
          ))}

          <div className="nav-dropdown" ref={aboutRef} style={{ "--nav-index": 7 } as CSSProperties}>
            <button className={pathname.startsWith("/about") ? "nav-dropdown-trigger nav-link-active" : "nav-dropdown-trigger"} type="button" aria-expanded={aboutOpen} aria-controls="about-navigation" onClick={() => setAboutOpen((current) => !current)}>
              <span><span className="mobile-nav-number" aria-hidden="true">08</span>About Us</span><span className="nav-chevron" aria-hidden="true" />
            </button>
            <div id="about-navigation" className={aboutOpen ? "nav-dropdown-menu is-open" : "nav-dropdown-menu"}>
              {aboutNavigation.map(([label, href]) => (
                <Link key={label} className={isActive(href) ? "nav-link-active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href} onClick={closeNavigation}>{label}</Link>
              ))}
            </div>
          </div>

          <Link style={{ "--nav-index": 8 } as CSSProperties} className={isActive("/contact") ? "nav-link-active" : undefined} aria-current={isActive("/contact") ? "page" : undefined} href="/contact" onClick={closeNavigation}>
            <span className="mobile-nav-number" aria-hidden="true">09</span>Contact Us
          </Link>
          <Link className={isActive("/request-a-quote") ? "button button-primary nav-cta nav-cta-active" : "button button-primary nav-cta"} aria-current={isActive("/request-a-quote") ? "page" : undefined} href="/request-a-quote" onClick={closeNavigation}>Request a Quote <span aria-hidden="true">→</span></Link>
          <div className="mobile-menu-contact">
            <a href="tel:+917600670953">+91 76006 70953</a>
            <a href="mailto:Sales@ampartechnova.com">Sales@ampartechnova.com</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
