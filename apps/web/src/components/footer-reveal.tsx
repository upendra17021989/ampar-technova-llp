"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export function FooterReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const region = ref.current;
    const footer = region?.querySelector("footer");
    if (!region || !footer || !window.matchMedia) return;
    const media = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const enabled = media.matches && !pathname?.startsWith("/admin");
      region.classList.toggle("footer-reveal-active", enabled);
      if (!enabled) {
        region.style.removeProperty("--footer-reveal-y");
        return;
      }
      const viewport = window.innerHeight;
      const header = document.querySelector("[data-site-header]")?.getBoundingClientRect().height ?? 0;
      // Short footers sit at the screen bottom. Tall footers release at the
      // header so the remaining content can scroll fully into view.
      const restingTop = Math.max(header, viewport - footer.offsetHeight);
      const lift = Math.max(0, Math.min(viewport - restingTop, region.getBoundingClientRect().top - restingTop));
      region.style.setProperty("--footer-reveal-y", `${-lift}px`);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : undefined;
    resize?.observe(footer);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
      resize?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      region.classList.remove("footer-reveal-active");
      region.style.removeProperty("--footer-reveal-y");
    };
  }, [pathname]);

  return <div ref={ref} className="footer-reveal">{children}</div>;
}
