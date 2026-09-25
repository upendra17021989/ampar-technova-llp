"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Props = { as: "h1" | "h2"; text: string; id: string };

export function TypewriterHeading({ as: Tag, text, id }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const typed = typedRef.current;
    if (!heading || !typed || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const letters = Array.from(text);
    const state = { count: 0 };
    typed.textContent = "";
    const tween = gsap.to(state, {
      count: letters.length,
      duration: Math.min(4, Math.max(2, letters.length * 0.055)),
      ease: "none",
      snap: { count: 1 },
      paused: true,
      onUpdate: () => { typed.textContent = letters.slice(0, state.count).join(""); },
      onComplete: () => { typed.textContent = text; heading.classList.remove("is-typing"); observer.disconnect(); },
    });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        heading.classList.add("is-typing");
        tween.play();
      } else {
        tween.pause();
      }
    }, { threshold: 0.05 });
    observer.observe(heading);
    return () => {
      observer.disconnect();
      tween.kill();
      typed.textContent = text;
      heading.classList.remove("is-typing");
    };
  }, [text]);

  return <Tag id={id} ref={headingRef} className="typewriter-heading" aria-label={text}>
    <span className="typewriter-measure" aria-hidden="true">{text}</span>
    <span className="typewriter-visible" aria-hidden="true"><span ref={typedRef}>{text}</span><span className="typewriter-caret" /></span>
  </Tag>;
}
