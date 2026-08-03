# Phase 3: UX/UI Design

Status: Approved on 3 August 2026; high-fidelity visual refinement continues during implementation  
Started: 3 August 2026  
Prerequisites: Phases 1 and 2 approved

## 1. Objective

Translate the approved information architecture and catalogue-derived content into an accessible, responsive design system and a complete set of page and interaction specifications. The output must be detailed enough for frontend development without requiring developers to invent layout, hierarchy, states, or behavior.

## 2. Design principles

- Technical credibility before decoration.
- Clear paths from capability discovery to consultation or quotation.
- Evidence-based claims with visible standards, testing, projects, and downloads.
- Progressive disclosure for dense specifications and RFQ fields.
- Authentic industrial imagery; never imply a composite or stock image is an AMPAR facility or project.
- Mobile usability for field, procurement, and plant users.
- WCAG 2.2 AA behavior built into components rather than added later.
- Consistent relationships between products, materials, technologies, industries, projects, and resources.

## 3. Visual direction

The catalogue logo supports a restrained industrial palette:

| Token | Proposed value | Use |
| --- | --- | --- |
| Navy 900 | `#102F53` | Primary brand, header, strong headings |
| Navy 700 | `#1B466F` | Interactive and supporting brand elements |
| Teal 700 | `#117984` | Technology/material accents and secondary actions |
| Teal 100 | `#DCEFF0` | Informational backgrounds |
| Orange 600 | `#C96E35` | Primary conversion accent and selected highlights |
| Orange 100 | `#F7E7DD` | Warm callouts |
| Graphite 900 | `#1D2935` | Body text |
| Steel 600 | `#667585` | Secondary text |
| Steel 200 | `#D9E0E6` | Borders and dividers |
| Steel 50 | `#F6F8FA` | Page and section backgrounds |
| White | `#FFFFFF` | Cards and inverse text |
| Success | `#18794E` | Confirmations and approved status |
| Warning | `#9A6700` | Technical cautions |
| Error | `#B42318` | Validation and failure states |

These values are design proposals derived from the raster logo and require brand approval. The original SVG remains required before final visual sign-off.

### Typography

- Heading family: `Manrope`, with `Arial` as system fallback.
- Body/UI family: `Inter`, with `Arial` as system fallback.
- Body base: 16px desktop and mobile; never below 14px for supporting UI.
- Comfortable body line height: 1.6.
- Technical tables: 14-16px depending on viewport; never shrink to force columns onto mobile.
- Use no more than four visible weights: 400, 500, 600, and 700.

The implementation should self-host approved font files or use system fonts if privacy/performance policy excludes third-party font delivery.

### Type scale

| Role | Desktop | Mobile | Weight |
| --- | ---: | ---: | ---: |
| Display | 56px/1.08 | 40px/1.12 | 700 |
| H1 | 48px/1.12 | 36px/1.15 | 700 |
| H2 | 36px/1.2 | 30px/1.2 | 700 |
| H3 | 28px/1.25 | 24px/1.25 | 600 |
| H4 | 22px/1.3 | 20px/1.3 | 600 |
| Body large | 18px/1.6 | 18px/1.55 | 400 |
| Body | 16px/1.6 | 16px/1.55 | 400 |
| Label/support | 14px/1.45 | 14px/1.45 | 500 |

### Layout

- Content maximum width: 1280px.
- Reading-width maximum: 760px.
- Grid: 12 columns desktop, 8 tablet, 4 mobile.
- Outer gutter: 64px desktop, 32px tablet, 20px mobile.
- Section spacing: 96px desktop, 72px tablet, 56px mobile.
- Spacing unit: 4px with primary steps at 8, 12, 16, 24, 32, 48, 64, and 96px.
- Minimum interactive target: 44 × 44px.
- Border radius: 6px controls, 10px cards, pill radius only for compact filters/statuses.
- Shadows: subtle elevation only for overlays and selected cards; use borders for most structure.

## 4. Global shell

### Utility bar

Desktop only. Shows sales phone, sales email, and optional “Download Catalogue.” Do not expose personal founder details here. Utility links must be keyboard accessible.

### Header

- Logo links to Home.
- Primary navigation: Products, Technologies, Materials, Industries, Capabilities, Projects, Resources, About.
- Secondary actions: Contact and Request a Quote.
- Products and Industries may use accessible mega menus on desktop.
- Header becomes compact after scrolling but must not obscure anchor targets.

### Mobile navigation

- Menu button with explicit accessible name and expanded state.
- Full-height drawer with nested disclosure controls.
- Persistent Request a Quote action.
- Optional call and WhatsApp actions only after destinations and policies are approved.
- Focus is trapped while open and returns to the menu trigger when closed.

### Footer

- Company summary and approved contact details.
- Product, technology, industry, company, and resource links.
- Registered locations.
- Legal links and copyright.
- No certification badges without supplied evidence.

## 5. Reusable components

- Breadcrumbs.
- Section eyebrow, heading, description, and optional action.
- Product/category/industry/project/resource cards.
- Specification definition list and comparison table.
- Filter bar, active-filter chips, result count, empty state, and pagination.
- Evidence strip for capabilities, tests, standards, and project proof.
- Technical caution/disclaimer callout.
- Related-content rail.
- Download item with file type, revision, size, access rule, and action.
- Responsive gallery with captions.
- Accordion for FAQs and dense supporting details.
- Contact channel card.
- Form field, help text, validation summary, upload field, success state, and reference-number panel.
- Toasts only for secondary feedback; critical outcomes remain visible in the page.
- Skeleton, error, empty, and unavailable states for data-driven regions.

Component states and detailed interaction requirements are defined in [interaction-specification.md](interaction-specification.md).

## 6. Page-template inventory

Wireframes are defined in [wireframes.md](wireframes.md).

1. Home.
2. About.
3. Listing page for products, industries, projects, resources, and articles.
4. Product category.
5. Product detail.
6. Technology detail.
7. Materials comparison and material detail.
8. Industry detail.
9. Engineering & Manufacturing.
10. Quality & Standards.
11. Project detail.
12. Resource/article detail.
13. Contact.
14. Request a Quote.
15. Legal content.
16. Search results, not found, error, loading, and empty states.

## 7. Responsive breakpoints

Use content-driven behavior around these implementation breakpoints:

- Small: 0-599px.
- Medium: 600-899px.
- Large: 900-1199px.
- Extra large: 1200px and above.

Cards move from one to two to three/four columns based on content width. Technical comparisons become horizontally scrollable with the first column visually persistent when feasible, plus a mobile card view for essential fields. Filters use an inline toolbar on large screens and an accessible modal/drawer on small screens.

## 8. Accessibility requirements

- One meaningful H1 per page and logical heading order.
- Skip link and landmark regions.
- Visible focus with at least a 2px indicator and sufficient contrast.
- Navigation, disclosures, accordions, dialogs, filters, galleries, and uploads support keyboard and screen-reader use.
- Text/background contrast at least 4.5:1 for normal text and 3:1 for large text and meaningful UI boundaries.
- Form errors connect to fields, appear in a summary, and never rely on color alone.
- Status messages use appropriate live regions without excessive announcements.
- Motion respects `prefers-reduced-motion`.
- Images require purposeful alt text; decorative images use empty alt text.
- Tables retain headers and relationships; mobile transformation must preserve meaning.
- CAPTCHA must have an accessible alternative.

## 9. Content and trust safeguards

- Display standards as applicable references, not certifications, until evidence supports stronger language.
- Place the material-selection disclaimer beside comparison and enquiry actions.
- Label gated downloads before the visitor starts the form.
- Show resource revision/date where known.
- Project anonymity rules must be reflected consistently in title, copy, media, and metadata.
- Do not use the catalogue's industrial composites as proof of AMPAR manufacturing or projects without provenance.
- Avoid unsubstantiated counters such as years of experience, projects delivered, countries served, or capacity.

## 10. Design deliverables and backlog

### P0 — required for Phase 3 approval

- [x] Establish proposed color, typography, spacing, grid, and component direction.
- [x] Define global desktop and mobile navigation behavior.
- [x] Define page-template wireframes.
- [x] Define common interaction, validation, and responsive states.
- [x] Define accessibility behavior and content trust safeguards.
- [ ] Approve logo lockup and proposed palette.
- [ ] Approve navigation labels and hierarchy.
- [ ] Approve Home, product detail, material comparison, project detail, and RFQ wireframes.
- [ ] Confirm public phone/email, WhatsApp behavior, and catalogue gating.

### P1 — required before frontend implementation

- [ ] Produce high-fidelity desktop and mobile mockups for representative templates.
- [ ] Create component variants and interactive prototype states.
- [ ] Confirm authentic image direction and aspect ratios.
- [ ] Validate representative designs for contrast and keyboard flow.
- [ ] Record all approved tokens in an implementation-ready theme contract.

### P2 — implementation handoff

- [ ] Annotate dimensions, responsive behavior, content limits, empty/error/loading states, and focus order.
- [ ] Map every design component to its content/API fields.
- [ ] Define visual-regression reference viewports.
- [ ] Product owner and technical reviewer approve representative content in designs.

## 11. Acceptance criteria

Phase 3 is complete when:

- The global visual direction and logo usage are approved.
- Every MVP page maps to an approved reusable template.
- Desktop and mobile navigation and RFQ journeys are approved.
- All components have documented responsive, interaction, error, loading, and empty states.
- Accessibility behavior is explicit and testable.
- Representative high-fidelity screens and prototype flows are approved.
- Frontend developers can implement the design system without inventing design decisions.

## 12. Approval record

Phase 3 was approved to proceed on 3 August 2026. The documented design system, structural wireframes, interaction rules, and accessibility requirements form the implementation contract. Final logo files, authentic imagery, and high-fidelity refinements remain dependencies but do not block project scaffolding.

## 13. Next phase

Phase 4 will scaffold the monorepo, Next.js frontend, Spring Boot API, PostgreSQL development environment, validation/testing foundations, CI checks, and environment documentation using the approved design contract.
