# Reference animation implementation

Analyzed the public HTML, CSS and JavaScript served by
https://spgcc-preview.vercel.app/en on 2026-09-21. Browser discovery returned no
available browsers, so this is source-based analysis, not a visual certification.

## Observed settings and AMPAR mapping

| Reference behavior | Implementation |
| --- | --- |
| Lenis, 1.1-second duration, GSAP ticker | Public routes use the same duration, with menu/intro scroll locks and native touch scrolling. |
| Reveals at `top 88%`, 28px travel, 0.9s, `expo.out` | Copy and content entrances. |
| Masked lines, 1.4s, 0.09s stagger, `expo.out` | Main and section headings, using SplitText with responsive re-splitting. |
| Two chevron curtains, 0.8s with 0.12s trailing layer | AMPAR's session intro; hero entrance begins when the curtains open. |
| Scroll-scrubbed photo wipe into a technical drawing | AMPAR hero image reveals a blueprint illustration generated from that same plant image, with matching image bounds and cropping. |
| Pinned three-chapter technical story | AMPAR's three material technologies use an original layered construction drawing and synchronized content. |
| Process active step at `top 55%`, rolling numeral, drawing progress line | AMPAR's five existing engineering stages. |
| Repeating 28s marquee, scroll-direction reversal, velocity acceleration and skew | Industry links, with a hidden duplicate for seamless looping. Pauses on hover/focus and outside the viewport. |

Reference source assets inspected: `3cqi61hqb4mj5.js` (intro and smooth scroll),
`3e5o2ujiqt3d8.js` (reveal, split lines and process steps),
`1j227qq6f-lhs.js` (hero, specialism and marquee),
`42_dxhvekry6k.js` (shared motion constants), and `3ycej_f6ismi3.css`,
under the reference site's `/_next/static/immutable/chunks/` path.

## Adaptation and verification limits

AMPAR keeps its branding, copy, product images, routes and calls to action.
The drawings are original conceptual illustrations, not fabrication drawings.
The reference's crane/transport scene and service-package ring are not copied;
the three material layers illustrate AMPAR's work instead. Existing product cards
retain their stacked composition, now with scroll-scrubbed scale and dimming.

Pinned scenes and the moving marquee run at 1024px and above. Smaller screens
show normal document flow. Reduced-motion preferences restore static content;
unavailable animation modules leave server-rendered content accessible.

The shared footer now reveals behind the page edge on desktop, including its
“Start a project” section. Its wrapper preserves the full document height and
clips a translated footer layer. Short footers align to the viewport bottom;
tall footers release below the header so every link remains reachable. Keyboard
focus, mobile layouts and reduced motion use normal footer flow. This applies
to public routes and does not affect admin pages.

Run `npm run check` for lint, component tests and a production build. Before
claiming an exact visual match, review the running homepage at desktop/mobile
sizes, scroll both directions through every section, test keyboard navigation,
toggle reduced motion, and navigate away and back. Browser QA could not be
performed in this session.
