# Website-1 Change Implementation Plan

## Objective

Implement the changes described in `Changes in Website-1.docx` in the existing Next.js website while preserving the current responsive design, accessibility, SEO metadata, and enquiry flows.

## Scope interpreted from the brief

1. Add a prominent **Locations** entry near the top of the website, using the referenced Polyplast locations page as an interaction/content reference.
2. Replace the compact mark and shortened brand text with the supplied full **AMPAR TECHNOVA LLP** logo/name treatment.
3. Replace the homepage hero treatment with the industrial FRP plant image supplied in the brief, retaining readable foreground content and calls to action.
4. Turn **About** into an accessible dropdown/pop-up menu and expand the About page with:
   - Who We Are
   - Our Group
   - Our Vision
   - Our Mission
   - Why AMPAR Technova LLP
5. Ensure **Contact Us** is visible in primary navigation and leads to the existing contact page.
6. Replace the placeholder Materials page with substantive sections for:
   - Thermoset Plastics
   - Thermoplastics
   - Applications
   - Dual Laminate Technology

## Current-state findings

- The site is a Next.js 16 application under `apps/web` with shared header/footer components and global responsive CSS.
- The header already contains phone/email utility links, but has no Locations or Contact link and no desktop dropdown navigation.
- The header currently renders the small mark plus the shortened text `AMPAR TECHNOVA`.
- The homepage hero currently uses a gradient and a white logo panel rather than an industrial background image.
- `/about` contains only two short summary blocks.
- `/contact` already contains sales details and two locations: Ankleshwar and Dahej.
- `/materials` currently contains material abbreviation cards with placeholder copy.
- Existing header, homepage, and quote-form tests provide a base that should be extended rather than replaced.

## Implementation phases

### Phase 1: Prepare approved assets and structured content

- Extract the supplied full logo and industrial FRP plant image from the brief into `apps/web/public/brand` and `apps/web/public/images` using descriptive, web-safe filenames.
- Optimize large raster assets and define correct intrinsic dimensions to avoid layout shift and excessive page weight.
- Move the new About and Materials copy into typed content structures where repeated rendering or navigation anchors are needed; keep page-specific prose local when it is not reused.
- Copy-edit obvious grammar, capitalization, and terminology issues without changing technical meaning.
- Retain the existing engineering-review disclaimer on material selection and operating limits.

**Acceptance:** assets render sharply at desktop/mobile sizes, have appropriate alternative text (or empty alt text when decorative), and do not materially regress load size.

### Phase 2: Update global header, branding, and navigation

Files primarily affected:

- `apps/web/src/components/site-header.tsx`
- `apps/web/src/components/site-header.test.tsx`
- `apps/web/src/app/globals.css`
- `apps/web/src/app/layout.tsx`

Work:

- Replace the mark-plus-short-name header treatment with the supplied full-name logo treatment, sized separately for desktop and mobile.
- Add `Locations` and `Contact Us` navigation entries. Recommended behavior for Locations is to link to a locations section on `/contact` rather than introduce a duplicate page.
- Replace the simple About link with a desktop hover/focus dropdown and mobile disclosure containing anchored links to all five About sections.
- Implement keyboard navigation, focus management, `aria-expanded`/`aria-controls`, escape/outside-click closing where applicable, and adequate touch targets.
- Verify that the expanded navigation still fits common laptop widths; adjust gaps/type sizing or introduce an earlier mobile breakpoint if necessary.
- Keep phone and email in the utility bar and make Locations available there as well if “Add in top Locations” refers specifically to the utility row.

**Acceptance:** every item is reachable by keyboard and touch; dropdown content remains open while focus is inside it; mobile menu and About submenu operate independently; header does not wrap or overflow at supported widths.

### Phase 3: Rebuild the homepage hero

Files primarily affected:

- `apps/web/src/app/page.tsx`
- `apps/web/src/app/globals.css`
- new optimized hero image in `apps/web/public/images`

Work:

- Use the supplied FRP plant image as the hero visual/background with responsive cropping.
- Add a controlled navy/teal overlay or split treatment so the existing headline, description, and CTAs meet contrast requirements.
- Remove or reposition the current white logo panel and capability tiles so they do not compete with the new full-brand header and image.
- Preserve the current homepage message and CTA routes unless revised copy is approved.
- Add responsive focal-point rules so tanks/equipment remain visible without obscuring text.

**Acceptance:** heading and CTA contrast meets WCAG AA; the important image subject survives desktop/tablet/mobile crops; there is no cumulative layout shift; both CTA links remain functional.

### Phase 4: Expand About content and anchor navigation

Files primarily affected:

- `apps/web/src/app/about/page.tsx`
- `apps/web/src/app/globals.css`
- optional `apps/web/src/content/about.ts`

Work:

- Build five semantically headed sections with stable IDs matching the dropdown links.
- Present the Amar Group companies as distinct, scannable company profiles while preserving establishment years, services, and founders supplied in the brief.
- Render the mission statements as a real list and give Vision a concise highlighted treatment.
- Develop the currently underspecified “Why AMPAR Technova LLP” section around the supplied line “Engineering Excellence Built on Innovation”; do not invent detailed proof claims without approval.
- Apply sticky-header scroll offsets and update page metadata/description if needed.

**Acceptance:** dropdown links land on the correct headings; headings follow a logical hierarchy; all supplied About copy is present; no unapproved capability/certification claims are introduced.

### Phase 5: Clarify Locations and Contact presentation

Files primarily affected:

- `apps/web/src/app/contact/page.tsx`
- `apps/web/src/components/site-footer.tsx`
- `apps/web/src/app/sitemap.ts` only if a new route is chosen

Work:

- Add a stable `locations` anchor and clear location cards for Registered Office & Unit 1 (Ankleshwar) and Unit 2 (Dahej).
- Keep phone/email and Request a Quote prominent.
- Optionally add map/directions links after exact approved map URLs are supplied; do not embed a third-party map by assumption.
- Align header, footer, and contact-page naming (`Contact Us`, `Locations`, and full company name).

**Acceptance:** Locations navigation resolves directly to the two approved addresses; phone/email links work; there is one canonical contact route and no duplicated/conflicting address content.

### Phase 6: Replace Materials placeholders with technical content

Files primarily affected:

- `apps/web/src/app/materials/page.tsx`
- `apps/web/src/app/globals.css`
- optional `apps/web/src/content/materials.ts`

Work:

- Introduce an in-page section navigator for Thermosets, Thermoplastics, Applications, and Dual Laminate.
- Structure each material family with definition, representative materials, benefits, limitations, and applications rather than long uninterrupted paragraphs.
- Separate thermoset and thermoplastic applications so the source text is not visually or semantically conflated.
- Preserve technical names and abbreviations, while correcting spelling such as polyvinyl chloride and polyethylene terephthalate.
- Add a compact comparison component only where it helps readers compare repeated properties; avoid presenting generalized statements as universal engineering limits.
- Retain the technical-review notice near the top and add a quote/material-review CTA at the end.

**Acceptance:** all supplied sections and lists are represented; content is usable on narrow screens; disclaimers remain visible; no material temperature/compatibility limit is asserted without an approved source.

### Phase 7: Verification and regression coverage

- Extend `site-header.test.tsx` for Locations, Contact Us, About submenu toggling, keyboard use, anchor targets, and mobile interaction.
- Extend `page.test.tsx` for hero content/image and CTA preservation.
- Add focused tests for About section IDs and Materials section structure/content.
- Run web lint, unit tests, and production build.
- Perform visual checks at mobile, tablet, laptop, and wide-desktop widths, including sticky-header behavior and anchor offsets.
- Check keyboard-only navigation, focus visibility, reduced-motion behavior, image alternative text, heading order, color contrast, and overflow.
- Validate all internal links and confirm sitemap behavior after the final route decision.

## Recommended implementation order

1. Confirm open content decisions below.
2. Prepare/optimize assets and structured content.
3. Implement header branding and navigation first, because it defines About/Locations anchors.
4. Implement About and Contact targets.
5. Rebuild the homepage hero.
6. Implement the full Materials page.
7. Add tests, run automated checks, and complete responsive/accessibility QA.

## Decisions required before implementation

1. **Locations placement:** Should Locations appear in the dark utility bar, the main navigation, or both? Recommended: main navigation plus a direct `/contact#locations` link; utility-bar inclusion only if space remains.
2. **Locations route:** Recommended: reuse `/contact#locations`. Create a dedicated `/locations` page only if maps, operating hours, contacts per unit, or facility-specific content will be added.
3. **Why AMPAR content:** The brief supplies only a heading/tagline. Additional approved differentiators or evidence are needed before expanding this into detailed claims.
4. **Hero copy:** Confirm whether the current homepage headline/CTAs remain or whether the reference screenshot’s “Built around industrial corrosion…” messaging should replace them.
5. **Asset rights/quality:** Confirm the supplied industrial composite image is approved for public commercial use and whether a higher-resolution/original brand asset (preferably SVG or transparent PNG) exists.
6. **Technical review:** Materials copy should receive engineering approval before publication because several statements are broad and application-dependent.

## Definition of done

- Every requested change is traceable to a page/component and has a passing acceptance check.
- Full company branding is consistent in header, footer, metadata, and visible page copy.
- Locations, Contact Us, and the complete About submenu are usable across keyboard, mouse, and touch.
- Homepage hero uses the approved industrial image without compromising performance or readability.
- About and Materials pages contain the supplied content in a responsive, accessible hierarchy.
- Lint, unit tests, and production build pass, followed by responsive visual QA and stakeholder content approval.
