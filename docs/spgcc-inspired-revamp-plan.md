# AMPAR Technova Website Revamp Plan

## Objective

Revamp AMPAR's website to achieve the cinematic, editorial and motion-rich quality of the [Strong Point reference](https://spgcc-preview.vercel.app/en) while retaining AMPAR's original branding, content, products and engineering identity. The reference is a quality benchmark, not a design or asset source to copy.

## Current state

The Next.js application already has complete public routes, reusable navigation and footer components, a product catalogue, responsive behavior, basic viewport reveals, parallax effects, accessibility foundations, analytics and quote handling.

The main gaps are visual hierarchy, typography, image coverage, editorial layouts, animation orchestration and consistency between pages.

## Visual direction

- Deep navy and graphite surfaces
- AMPAR orange for primary interaction and motion
- Teal for technical and material information
- Condensed display typography for large statements
- Neutral sans-serif body typography
- Monospaced labels for numbers, specifications and captions
- Large industrial imagery with deliberate crops
- Fine rules, brackets, grids and drawing-inspired annotations
- Spacious asymmetric compositions with strong section contrast

## Homepage structure

1. Branded SVG loading introduction
2. Full-viewport cinematic hero
3. Editorial company positioning statement
4. Sticky product-capability sequence
5. Interactive three-technologies section
6. Scroll-controlled engineering process
7. Quality and manufacturing evidence
8. Industries marquee and visual index
9. Gujarat locations and operational reach
10. Converging final call to action
11. Expanded editorial footer

## Motion specification

- Hover feedback: 180-300 ms
- Small viewport reveals: 500-700 ms
- Headline mask reveals: 700-1000 ms
- Large transitions: 900-1400 ms
- Intro sequence: maximum 2.2 seconds
- Scroll-linked effects use requestAnimationFrame or GSAP ScrollTrigger
- Content remains visible without JavaScript
- Every effect supports `prefers-reduced-motion`
- Pinned desktop sequences use normal document flow on small screens

Planned primitives: `LogoIntro`, `RevealText`, `RevealGroup`, `ParallaxMedia`, `ImageReveal`, `StackedProductSequence`, `ProcessTimeline`, `ConvergingHeadline` and `MotionProvider`.

## Asset requirements

- One hero photograph or muted video
- Five product-category images
- Three technology images or diagrams
- Three to five fabrication and inspection photographs
- Six industry visuals
- Two facility/location photographs
- Animation-ready vector AMPAR logo
- Optional Gujarat facilities map
- Verified statistics, certificates and quality claims

All imagery must be AMPAR-owned, commissioned or appropriately licensed.

## Phase 1: Design foundation

- [x] Record the implementation plan
- [x] Add semantic color, typography, spacing, border and motion tokens
- [x] Establish display, body and technical-label font roles
- [x] Add shared selection and rendering behavior
- [ ] Prepare an animation-ready vector logo
- [ ] Complete the production image inventory
- [ ] Approve the final homepage copy hierarchy

Deliverable: a stable foundation inherited by the existing pages before their layouts are rebuilt.

## Phase 2: Global shell

- [x] Rebuild the desktop header as a transparent fixed overlay
- [x] Add a solid header state after the hero
- [x] Replace the mobile dropdown with a full-screen menu
- [x] Rebuild buttons, links, labels and focus states
- [x] Rebuild the footer as an editorial conclusion
- [x] Repair existing character-encoding artifacts

Deliverable: a responsive global shell shared by every public page.

## Phase 3: Homepage storytelling

- [x] Build the full-height media hero
- [x] Add the company positioning statement
- [x] Implement the product-capability sequence
- [x] Implement the technologies section
- [x] Implement the engineering process
- [x] Implement quality, industries, locations and final CTA sections

Deliverable: the complete responsive homepage in its final static visual state.

## Phase 4: Motion integration

- [x] Add the one-session logo intro
- [x] Add masked headings and staggered reveals
- [x] Add product stacking and scroll progress
- [x] Add technology and process timelines
- [x] Add image reveals, marquees and CTA convergence
- [x] Add mobile and reduced-motion alternatives

Deliverable: production motion without making content access depend on animation.

## Phase 5: Interior pages

- [x] Products and product details
- [x] Materials
- [x] Industries
- [x] About
- [x] Locations
- [x] Contact
- [x] Request a quote

Deliverable: one consistent system across all public routes without excessive motion.

## Phase 6: Quality and launch readiness

- [ ] Test from 360 px through large desktop
- [ ] Test keyboard navigation and screen-reader landmarks
- [x] Test reduced-motion behavior
- [x] Optimize image loading and animation work
- [ ] Validate Core Web Vitals
- [ ] Run cross-browser checks
- [ ] Add visual regression coverage

Deliverable: an accessible, performant and release-ready website.

## Technical approach

Retain Next.js 16 and React 19. Use CSS for ordinary transitions and viewport reveals. Introduce GSAP with ScrollTrigger only for pinned, scrubbed or coordinated timelines. Consolidate the current independent scroll listeners behind shared motion utilities.

## Acceptance criteria

- Purpose-built industrial engineering presentation
- Strong hierarchy at every viewport
- Clear navigation and conversion paths
- Purposeful, smooth motion
- Complete static experience without animation
- No image layout shifts
- Existing routes, forms, analytics and SEO continue to work
- Acceptable Lighthouse and real-device performance

## Indicative schedule

- Phase 1: 1-2 working days, excluding asset production
- Phase 2: 2-3 working days
- Phase 3: 4-6 working days
- Phase 4: 3-5 working days
- Phase 5: 5-8 working days
- Phase 6: 2-4 working days

The primary schedule risk is the availability of high-quality industrial photography and an animation-ready vector logo.
