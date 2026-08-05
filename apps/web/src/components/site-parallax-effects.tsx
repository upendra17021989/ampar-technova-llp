"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PARALLAX_TARGETS = [
  ".page-hero > .shell",
  ".vision-panel",
  ".dual-laminate-panel",
  ".navy-section .split",
].join(",");

export function SiteParallaxEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia?.("(max-width: 52rem)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(PARALLAX_TARGETS));

    if (!targets.length || reduceMotion?.matches || smallScreen?.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;

        const targetCenter = rect.top + rect.height / 2;
        const distance = (viewportCenter - targetCenter) / window.innerHeight;
        const strength = target.closest(".page-hero") ? 28 : 18;
        const offset = Math.max(-strength, Math.min(strength, distance * strength));
        target.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
        target.closest<HTMLElement>(".page-hero")?.style.setProperty(
          "--parallax-bg-y",
          `${(-offset * 0.55).toFixed(2)}px`,
        );
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    targets.forEach((target) => target.classList.add("parallax-layer"));
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      targets.forEach((target) => {
        target.classList.remove("parallax-layer");
        target.style.removeProperty("--parallax-y");
        target.closest<HTMLElement>(".page-hero")?.style.removeProperty("--parallax-bg-y");
      });
    };
  }, [pathname]);

  return null;
}
