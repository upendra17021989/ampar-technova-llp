"use client";

import Image from "next/image";

export function ParallaxHeroMedia() {
  return <>
    <div className="hero-blueprint" aria-hidden="true">
      <div className="hero-blueprint-art">
        <Image src="/images/frp-industrial-plant-blueprint.png" alt="" fill priority sizes="110vw" />
      </div>
      <div className="shell hero-drawing-caption"><span>Material intelligence. Engineered in.</span><span>From process conditions to fabrication.</span></div>
    </div>
    <div className="home-hero-media" aria-hidden="true"><Image src="/images/frp-industrial-plant.png" alt="" fill priority sizes="110vw" /></div>
  </>;
}
