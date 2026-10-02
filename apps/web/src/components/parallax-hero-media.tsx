"use client";

import Image from "next/image";

export function ParallaxHeroMedia() {
  return <>
    <div className="hero-blueprint" aria-hidden="true">
      <svg width="0" height="0" className="hero-blueprint-filter">
        <defs>
          <filter id="hero-blueprint-orange" colorInterpolationFilters="sRGB">
            {/* Map the original navy-to-white sketch to navy-to-brand-orange. */}
            <feColorMatrix type="matrix" values="0.1619467 0.54464 0.0549992 0 0.027451 0.0641961 0.2159576 0.0218016 0 0.1019608 0.0016675 0.0056094 0.0005663 0 0.1764706 0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
      <div className="hero-blueprint-art">
        <Image src="/images/frp-industrial-plant-blueprint.png" alt="" fill priority sizes="110vw" />
      </div>
      <div className="shell hero-drawing-caption"><span>Material intelligence. Engineered in.</span><span>From process conditions to fabrication.</span></div>
    </div>
    <div className="home-hero-media" aria-hidden="true"><Image src="/images/frp-industrial-plant.png" alt="" fill priority sizes="110vw" /></div>
  </>;
}
