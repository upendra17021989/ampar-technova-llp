"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname?.startsWith("/admin") || !window.matchMedia || !("ResizeObserver" in window)) return;
    let disposed = false;
    let cleanup = () => {};
    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const lenis = new Lenis({
          autoRaf: false,
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -110 },
        });
        const tick = (time: number) => lenis.raf(time * 1000);
        const syncLock = () => {
          if (document.body.matches(".intro-active, .menu-open")) lenis.stop();
          else lenis.start();
        };
        const observer = new MutationObserver(syncLock);
        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
        syncLock();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.lagSmoothing(0);
        gsap.ticker.add(tick);
        return () => { observer.disconnect(); gsap.ticker.remove(tick); lenis.destroy(); };
      });
      cleanup = () => media.revert();
    }).catch(() => { /* Native scrolling remains available. */ });
    return () => { disposed = true; cleanup(); };
  }, [pathname]);
  return null;
}
