# Phase 5: Frontend Development

Status: In progress  
Started: 3 August 2026  
Prerequisites: Phases 1-4 approved

## 1. Objective

Implement the accessible, responsive public website using approved catalogue-derived content and reusable Next.js components, while withholding unverified technical claims and preparing integration boundaries for the backend.

## 2. Implemented routes

- `/` — homepage with product categories, technologies, featured products, capabilities, industries, and conversion sections.
- `/products` — catalogue-backed product listing.
- `/products/[slug]` — ten statically generated product-detail routes.
- `/materials` — material overview with engineering-review safeguard.
- `/industries` — ten initial industry cards.
- `/about` — catalogue-derived company introduction.
- `/contact` — verified catalogue contact details and locations.
- `/request-a-quote` — accessible RFQ entry form and product preselection.
- `/sitemap.xml` and `/robots.txt` — initial search-engine discovery controls.

## 3. Implemented components

- Responsive utility bar, sticky header, mobile disclosure navigation, and footer.
- Brand treatment using approved-direction colors without claiming the raster mark is a final production logo.
- Page hero, product card, category grid, technology cards, industry list, evidence blocks, CTA sections, specification panel, technical disclaimer, contact cards, and form controls.
- Loading boundary around URL-dependent RFQ preselection.
- Responsive layouts for desktop, tablet, and 320px-class mobile widths.
- Visible focus, skip link, semantic regions, explicit labels, minimum interaction sizing, and reduced-motion handling.

## 4. Content safeguards

- Product copy is limited to catalogue-supported names, materials, and application themes.
- Catalogue temperature values are withheld until technical approval.
- Product-detail pages display an engineering-review disclaimer.
- No certifications, project counts, capacity metrics, client names, or delivery claims are invented.
- No catalogue composite image is presented as an AMPAR facility or completed project.
- The RFQ form currently provides interface-only confirmation and does not imply that an enquiry has been stored or sent.

## 5. Verification completed

- ESLint passes.
- Vitest component tests pass.
- TypeScript and Next.js production compilation pass.
- Twenty-one static routes are generated successfully.
- Product detail pages are generated from stable catalogue slugs.
- Sitemap and robots routes build successfully.

## 6. Remaining Phase 5 backlog

- [x] Build the responsive public shell.
- [x] Implement homepage sections.
- [x] Implement product listing and initial product-detail pages.
- [x] Implement materials, industries, About, Contact, and RFQ entry pages.
- [x] Add route metadata, sitemap, and robots controls.
- [x] Add initial component tests and production-build verification.
- [ ] Add complete accessible mega-menu behavior if usability testing supports it.
- [ ] Implement three technology-detail routes.
- [ ] Implement industry-detail routes.
- [ ] Implement Engineering & Manufacturing and Quality & Standards pages.
- [ ] Implement Projects, Resources, blog, FAQs, search, and legal pages when approved content is supplied.
- [ ] Replace the temporary text brand mark with the approved SVG lockup.
- [ ] Add authentic, optimized product/factory imagery with approved alt text.
- [ ] Connect public content to Phase 6 APIs with loading, empty, and error states.
- [ ] Connect the RFQ form only after the secure Phase 6 enquiry API exists.
- [ ] Perform in-app browser visual and responsive QA when a browser session is available.
- [ ] Add automated accessibility and end-to-end tests during Phase 9 hardening.

## 7. Acceptance criteria

Phase 5 is complete when all approved public templates are implemented, content relationships work, responsive and accessibility QA pass, visual assets are approved, forms integrate securely with the backend, and no public route depends on placeholder claims.

## 8. Next phase

Phase 6 will implement public content APIs, enquiry persistence, validation, reference generation, file metadata boundaries, email-event interfaces, consistent API errors, and OpenAPI documentation against Supabase PostgreSQL.
