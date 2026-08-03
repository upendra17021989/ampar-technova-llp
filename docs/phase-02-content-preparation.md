# Phase 2: Content Preparation

Status: Approved on 3 August 2026; unresolved content dependencies carried forward  
Started: 3 August 2026  
Prerequisite: Phase 1 approved

## 1. Objective

Convert AMPAR's approved business and technical material into structured, reviewable, web-ready content. This phase produces the content package needed for UX design and implementation without publishing unverified technical or certification claims.

## 2. Deliverables

- Structured collection templates for company, products, materials, technologies, industries, projects, resources, and FAQs.
- Asset inventory and photography/diagram requirements.
- Page-level content and initial SEO matrix.
- Technical and editorial approval workflow.
- Initial launch-content backlog with owners and priorities.

## 3. Source inventory

| Source | Available | Intended use | Action |
| --- | --- | --- | --- |
| Website development plan | Yes | Scope, structure, preliminary claims, product categories, material guidance | Use as planning input; do not treat technical values as approved publication data. |
| AMPAR product catalogue | Available: `Ampar_Technova_Catalogue.docx` | Company, products, materials, capabilities, standards, and contact details | Extracted into `catalogue-content-inventory.md`; confirm document revision and technical approval status. |
| Logo and brand guidelines | Partial: raster logo embedded in catalogue | Visual identity and UI design | Obtain the original SVG and approved color/type guidance. |
| Certificates and standards evidence | Not present | Quality and standards content | Obtain valid documents; publish no certification claim without evidence. |
| Product datasheets | Not present | Product specifications and downloads | Collect per launch product. |
| Project records | Not present | Five or more launch case studies | Collect with client-publication permission. |
| Company/factory photography | Two industrial composites embedded in catalogue; provenance unconfirmed | About, manufacturing, quality, project, and homepage visuals | Confirm source, usage rights, authenticity, and whether either image represents an AMPAR facility; otherwise replace with commissioned photography. |
| Legal policies | Not present | Privacy, terms, cookies, disclaimer | Draft and obtain appropriate business/legal review. |

## 4. Content collection templates

Complete the templates in [content-templates.md](content-templates.md). Use one copy per record. Unknown values should be marked `TBD`; do not infer technical specifications.

Required collections:

- One company profile.
- Five product categories.
- Approximately 15-25 launch products.
- Three technology pages.
- Material records for PP, PPH, HDPE, PVC, CPVC, PVDF, ECTFE, FEP, PFA, and FRP.
- Eight to ten industry pages.
- At least five project case studies.
- Initial catalogues, brochures, datasheets, guides, quality documents, videos, blogs, and FAQs.

## 5. Asset inventory

### Brand assets

- [ ] Primary logo in SVG.
- [ ] Reversed/light logo variant.
- [ ] Monochrome logo variant.
- [ ] Favicon/app-icon source.
- [ ] Approved color values and typography guidance.
- [ ] Brand usage restrictions.

### Photography shot list

- [ ] Factory exterior and signage.
- [ ] Office and engineering/design team.
- [ ] Founder and leadership portraits.
- [ ] Thermoplastic sheet preparation and welding.
- [ ] FRP hand lay-up and filament winding.
- [ ] Dual-laminate fabrication stages.
- [ ] Dimensional, hydrostatic, spark, leak, and visual inspection.
- [ ] Finished tanks, process equipment, scrubbers, piping, and custom fabrication.
- [ ] Loading, dispatch, installation, and commissioned equipment.
- [ ] At least five project-specific image sets.

For every image, collect the original file, photographer/source, usage permission, subject, location, date, caption, and proposed alt text. Avoid embedded text in images where equivalent HTML content is possible.

### Technical visuals

- [ ] Product dimension drawings.
- [ ] Dual-laminate construction diagram.
- [ ] FRP laminate/build-up diagram where approved.
- [ ] Material-selection disclaimer graphic only if it improves comprehension.
- [ ] Manufacturing/process flow illustrations.
- [ ] Quality/testing icons or diagrams consistent with the design system.

## 6. Page and SEO content matrix

The complete working matrix is in [page-content-matrix.md](page-content-matrix.md). Every launch page needs:

- A unique purpose and primary audience.
- One primary user action.
- Approved heading and body copy.
- Required structured data fields.
- Media with captions and alt text.
- A unique title, meta description, canonical path, and social-sharing image.
- Internal links to relevant products, industries, projects, technologies, and resources.

Keyword themes in the source plan are hypotheses. Final targeting requires competitor and search-volume research before metadata is approved.

## 7. Approval workflow

```text
Draft → Editorial review → Technical review (when applicable)
      → Compliance/evidence check → Product-owner approval → Ready for publishing
```

### Roles

- Content writer: prepares structured copy and records sources.
- Technical reviewer: validates materials, ranges, applications, processes, testing, standards, and engineering language.
- Compliance approver: verifies certificates, customer permissions, trademarks, and sensitive claims.
- Product owner: approves messaging, scope, and publication priority.
- Content administrator: enters only approved content and preserves review metadata.

### Required status values

- `not_started`
- `draft`
- `editorial_review`
- `technical_review`
- `changes_requested`
- `approved`
- `published`
- `archived`

### Approval rules

- Technical facts require a named source and technical reviewer.
- Temperature, pressure, capacity, chemical compatibility, warranty, and delivery-time values cannot be published from assumptions.
- Standards may be described as applicable design references only when accurate; certifications require documentary evidence.
- Project/client names, logos, and photographs require recorded permission.
- Material-selection content must state that suitability depends on chemical, concentration, temperature, pressure, and process conditions and requires engineering review.
- AI-generated or rewritten copy must receive the same editorial and technical review as manually drafted copy.

## 8. Content quality standards

- Use direct, technically precise language for engineering and procurement audiences.
- Lead with applications, capabilities, constraints, evidence, and the next useful action.
- Avoid unsupported superlatives such as “best,” “leading,” or “world-class.”
- Separate material guidance from final engineering recommendations.
- Use SI units consistently and show alternative units only when required by the audience.
- Define abbreviations on first use.
- Use descriptive link labels and meaningful alternative text.
- Keep page titles, headings, slugs, product names, and taxonomy labels consistent.
- Record source revision and review date for time-sensitive technical content.

## 9. Initial content backlog

### P0 — required before UX copy/design approval

- [x] Obtain the current product catalogue.
- [ ] Confirm the catalogue revision, approval status, and technical reviewer.
- [ ] Obtain approved brand assets and contact/location details.
- [ ] Name the product owner, technical reviewer, compliance approver, and sales workflow owner.
- [ ] Confirm the five product categories and select 15-25 launch products.
- [ ] Complete the company-profile template.
- [ ] Complete technical templates for launch products and materials.
- [ ] Select at least five launch projects and obtain publication decisions.
- [ ] Decide which downloads are public and which require lead capture.
- [ ] Approve the material-selection and technical-information disclaimers.

### P1 — required before implementation content entry

- [ ] Complete three technology records.
- [ ] Complete eight to ten industry records.
- [ ] Inventory and name all launch downloads.
- [ ] Draft homepage, About, Engineering & Manufacturing, and Quality & Standards copy.
- [ ] Prepare contact, general enquiry, consultation, and RFQ confirmation text.
- [ ] Draft initial FAQs and three launch articles.
- [ ] Complete the image inventory and photography session.
- [ ] Perform keyword and competitor research.

### P2 — required before launch

- [ ] Approve metadata and social-sharing content for every indexable page.
- [ ] Approve image captions, alternative text, and usage permissions.
- [ ] Approve privacy, terms, cookie, and technical-information policies.
- [ ] Run a broken-link, spelling, unit-consistency, claim-evidence, and content-freshness audit.
- [ ] Record final technical and product-owner sign-off.

## 10. Phase acceptance criteria

Phase 2 is complete when:

- All MVP pages have approved or explicitly scheduled content.
- All launch products, materials, technologies, industries, and projects have complete structured records.
- Every technical claim has a traceable source and reviewer decision.
- Required media exist with permission, captions, and alt text.
- Download access rules and lead-capture behavior are approved.
- Page titles, metadata, canonical paths, internal links, and primary actions are defined.
- Legal and technical disclaimers have owners and approval status.
- The UX team can design every page template without inventing content or data.

## 11. Approval record

Phase 2 was approved to proceed on 3 August 2026. Catalogue-derived content is sufficient for UX structure and representative design copy. Missing specifications, evidence, permissions, authentic media, project records, and legal content remain release dependencies and must not be replaced with invented claims.

## 12. Next phase

Phase 3 will translate the approved content structure into wireframes, a responsive design system, page templates, interaction specifications, and an accessible prototype.
