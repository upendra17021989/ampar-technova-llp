"use client";

import { useEffect } from "react";

const revealSelector = [
  ".home-hero-content", ".hero-capabilities", ".positioning-grid", ".home-section-heading",
  ".product-story-card", ".technology-grid > article", ".process-intro", ".process-steps > li",
  ".quality-collage", ".quality-copy", ".industries-title", ".reach-grid > div", ".final-cta .shell",
].join(",");

export function HomepageEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    if (reduceMotion?.matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-revealed"));
      return;
    }

    const root = document.documentElement;
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.1 });
    targets.forEach((target) => observer.observe(target));

    const progressTargets = Array.from(document.querySelectorAll<HTMLElement>(".product-story-card, .process-steps > li, .final-cta"));
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const viewport = window.innerHeight;
      progressTargets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
        target.style.setProperty("--scroll-progress", progress.toFixed(3));
      });
    };
    const requestUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateProgress); };
    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
