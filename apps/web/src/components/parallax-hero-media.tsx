"use client";

import { useEffect, useRef } from "react";

export function ParallaxHeroMedia() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media || reduceMotion?.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = Math.min(window.scrollY * 0.18, 90);
      media.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
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

  return <div ref={mediaRef} className="home-hero-media" aria-hidden="true" />;
}
