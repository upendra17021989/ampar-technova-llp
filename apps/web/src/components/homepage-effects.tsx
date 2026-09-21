"use client";

import { useEffect } from "react";

export function HomepageEffects() {
  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (preference?.matches || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".home-hero-content").forEach((node) => node.classList.add("is-revealed"));
      return;
    }
    const root = document.querySelector<HTMLElement>(".editorial-home, .interior-page");
    if (!root) return;
    let disposed = false;
    let started = false;
    let cleanup = () => {};
    let start = () => {};
    let timer = 0;
    import("./reference-motion").then(({ mountReferenceMotion }) => {
      if (disposed) return;
      start = () => {
        if (disposed || started) return;
        started = true;
        window.clearTimeout(timer);
        cleanup = mountReferenceMotion(root);
      };
      if (document.body.classList.contains("intro-active")) {
        window.addEventListener("ampar:intro-reveal", start, { once: true });
        timer = window.setTimeout(start, 2500);
      } else start();
    }).catch(() => { /* Keep server-rendered content visible if motion cannot load. */ });
    return () => {
      disposed = true;
      window.clearTimeout(timer);
      window.removeEventListener("ampar:intro-reveal", start);
      cleanup();
    };
  }, []);
  return null;
}
