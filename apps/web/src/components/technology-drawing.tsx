export function TechnologyDrawing() {
  return <div className="technology-drawing" aria-hidden="true">
    <span className="technology-drawing-label">MATERIAL CONSTRUCTION / SECTION VIEW</span>
    <svg viewBox="0 0 600 520" fill="none">
      <defs><pattern id="laminate-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0v10" stroke="currentColor" strokeWidth="2" /></pattern></defs>
      <g className="technology-shell" stroke="currentColor" strokeWidth="2">
        <path d="M160 170 330 75c75-42 170 18 170 105v190L330 470V280c0-87-95-147-170-105Z" fill="url(#laminate-hatch)" fillOpacity=".2" />
        <ellipse cx="245" cy="325" rx="100" ry="150" transform="rotate(-20 245 325)" />
        <ellipse cx="245" cy="325" rx="86" ry="132" transform="rotate(-20 245 325)" />
        <path d="M150 270 325 165M330 365l170-100" opacity=".3" />
      </g>
      <g className="technology-liner" stroke="var(--orange-600)" strokeWidth="3">
        <ellipse cx="245" cy="325" rx="74" ry="116" transform="rotate(-20 245 325)" />
        <path d="m195 230 148-85c49-28 108 20 108 76v133l-143 83" />
      </g>
      <g className="technology-bond" stroke="var(--teal-700)" strokeWidth="2" strokeDasharray="4 5">
        <ellipse cx="245" cy="325" rx="80" ry="125" transform="rotate(-20 245 325)" />
        <path d="m180 218 162-92c62-35 126 20 126 94v140l-153 87" />
      </g>
      <g stroke="currentColor" opacity=".4"><path d="M110 460H55V165h85M45 165h20M45 460h20M160 490h195" /><path d="m100 350 390-220" strokeDasharray="8 8" /></g>
    </svg>
    <div className="technology-drawing-key"><span>01 / Structural laminate</span><span>02 / Corrosion barrier</span><span>03 / Bonded construction</span></div>
  </div>;
}
