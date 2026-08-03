# Phase 1: Discovery and Definition

Status: Approved on 3 August 2026  
Source: `AMPAR_Technova_Website_Development_Plan.docx`  
Target outcome: An approved, buildable MVP definition with no unresolved architectural or workflow ambiguity.

## 1. Product vision

Build a modern B2B website that establishes AMPAR Technova LLP as a credible manufacturer of corrosion-resistant engineering solutions and converts technical visitors into qualified sales enquiries.

The MVP will communicate AMPAR's capabilities in advanced thermoplastics, FRP composites, dual-laminate technology, process equipment, pollution-control equipment, piping systems, and custom fabrication. It must also give AMPAR staff a secure way to maintain content and manage enquiries.

## 2. MVP goals

- Present technically useful product, material, technology, industry, manufacturing, quality, and project information.
- Serve procurement managers, plant engineers, consultants, EPC companies, existing customers, and AMPAR staff.
- Generate general, product, technical-consultation, and quotation enquiries.
- Accept drawings and specification attachments safely.
- Support managed products, projects, industries, resources, articles, FAQs, homepage content, and SEO metadata.
- Provide role-based administration and an auditable enquiry workflow.
- Meet responsive, accessibility, SEO, security, and performance targets.
- Preserve a path to quotation automation, customer accounts, multilingual content, CRM/ERP integrations, and an approved-content AI assistant.

## 3. Scope boundary

### Included in the MVP

- Home and About pages.
- Five product categories and approximately 15-25 product detail pages.
- FRP Engineering, Thermoplastic Fabrication, and Dual Laminate Technology pages.
- Searchable/filterable material comparison.
- Eight to ten industry pages.
- Engineering & Manufacturing and Quality & Standards pages.
- At least five approved project case studies.
- Resource library with catalogue and document downloads.
- Contact and request-for-quote flows with attachments.
- Basic role-based administration.
- SEO, analytics, accessibility, security, and responsive behavior.

### Deferred beyond the MVP

- Automated product/material recommendation.
- Full quotation authoring, revisions, approvals, and PDF generation.
- Customer portal and project-status access.
- CRM and ERP integration beyond an agreed export/interface.
- Hindi and Gujarati localization.
- AI technical assistant.

Deferred capabilities must not shape the MVP user interface prematurely, but the data model and service boundaries should avoid blocking them.

## 4. Users and primary jobs

| User | Primary job |
| --- | --- |
| Procurement manager | Validate product range, standards, delivery capability, and supplier credibility; submit an RFQ. |
| Plant/project engineer | Evaluate materials, operating limits, applications, and technical documents; request consultation. |
| Consultant/EPC | Assess custom engineering, manufacturing, QA, and project experience. |
| Existing customer | Locate documents, support contacts, services, and project information. |
| Content administrator | Publish and maintain approved public content and metadata. |
| Sales user | Review, assign, qualify, update, and export enquiries. |
| Technical reviewer | Approve technical claims and data before publication. |
| Super administrator | Manage users, roles, configuration, and all content. |

## 5. Information architecture

```text
Home
├── About Us
├── Products
│   ├── Storage Equipment
│   ├── Process Equipment
│   ├── Pollution Control
│   ├── Piping Systems
│   └── Custom Fabrication
├── Technologies
│   ├── FRP Engineering
│   ├── Thermoplastic Fabrication
│   └── Dual Laminate Technology
├── Materials
├── Industries
├── Engineering & Manufacturing
├── Quality & Standards
├── Projects
├── Resources
│   ├── Downloads
│   ├── Blog
│   └── FAQs
├── Contact
└── Request a Quote
```

All repeatable detail pages will use stable slugs and breadcrumbs. Products, industries, projects, resources, and articles must support draft and published states.

## 6. Recommended architecture

The plan's scalable architecture is adopted for the MVP:

- Frontend: Next.js, React, TypeScript, Material UI, React Hook Form, and Zod.
- Backend: Java 21, Spring Boot, Spring Security, Bean Validation, REST, and OpenAPI.
- Database: PostgreSQL.
- Media: S3-compatible object storage behind a storage abstraction; the provider is selected during environment setup.
- Deployment target: Vercel for the frontend, Cloud Run for the backend, and a managed PostgreSQL service.
- Edge/security: Vercel Edge or Cloudflare, finalized before production setup.

### Repository direction

A monorepo is recommended so API contracts, documentation, infrastructure configuration, and coordinated releases remain discoverable:

```text
apps/
├── web/          # Next.js public site and admin UI
└── api/          # Spring Boot REST API
docs/             # Requirements, decisions, API and operating guides
infra/            # Deployment and environment configuration when introduced
```

Scaffolding is intentionally scheduled for Phase 4 after design and content requirements are approved. This avoids locking implementation details before discovery is signed off.

## 7. Content model

All managed records include an ID, timestamps, publication status where relevant, and audit information.

### Core content

- `product_categories`: name, slug, summary, description, image, display order, active state, SEO.
- `products`: category, name, slug, overview, features, applications, specifications, operating limits, standards, customization, gallery, datasheet, related products, publication state, SEO.
- `materials`: name, slug, temperature guidance, properties, applications, advantages, limitations, disclaimer, publication state, SEO.
- `product_materials`: product-to-material relationship plus applicability notes.
- `technologies`: name, slug, overview, process, methods, advantages, limitations, testing, standards, publication state, SEO.
- `industries`: name, slug, overview, challenges, solutions, suggested materials/products, related projects, publication state, SEO.
- `projects`: title, slug, client-display policy, industry, challenge, solution, material, product, capacity, standards, tests, duration, installation scope, gallery, outcome, publication state, SEO.
- `downloads`: title, type, file, related entities, public/gated access, revision, publication state.
- `blogs`: title, slug, excerpt, body, author, cover image, publication date, publication state, SEO.
- `faqs`: question, answer, category, display order, publication state.
- `pages` and `site_settings`: managed page sections, company details, locations, contact channels, navigation, footer, social links, and defaults.
- `media`: object key, original filename, content type, size, dimensions, alt text, ownership, and scan status.

### Identity and operations

- `users`: identity, role, status, last login, password/security metadata.
- `enquiries`: reference number, type, contact/company data, technical requirements, consent, source, status, priority, owner, timestamps.
- `enquiry_attachments`: enquiry, object key, safe filename, media type, size, scan status.
- `enquiry_notes`: enquiry, author, note, visibility, timestamp.
- `enquiry_events`: enquiry, event type, actor, previous/new value, timestamp.
- `audit_logs`: actor, action, entity, entity ID, timestamp, request metadata.

Technical values and certification claims require a review flag and reviewer approval before publication.

## 8. Enquiry workflow

```text
Visitor submits form
        ↓
Validate fields, consent, CAPTCHA, rate limit, and attachments
        ↓
Store enquiry and generate unique reference
        ↓
Queue customer confirmation and internal sales notification
        ↓
New → Assigned → Contacted → Qualified → Quoted → Won/Lost/Closed
        ↓
Record assignments, status transitions, notes, and exports in audit history
```

### Enquiry types

- General enquiry.
- Product enquiry.
- Technical consultation.
- Request for quote.
- Service/maintenance enquiry.
- Vendor/career enquiry.

### RFQ minimum data

- Name, company, email, phone, and country.
- Industry, product category, equipment type, and quantity.
- Capacity, temperature, pressure, chemical, and concentration.
- Material preference, required date, and project location.
- Message, drawing, and specification attachments.

Conditional fields may be optional initially, but the form must distinguish contact data from technical requirement data. Confirmation emails must contain the reference number and safe summary; attachments must not be exposed through public links.

## 9. API boundary

### Public read APIs

- `GET /api/products` and `GET /api/products/{slug}`
- `GET /api/product-categories`
- `GET /api/materials`
- `GET /api/technologies`
- `GET /api/industries`
- `GET /api/projects` and `GET /api/projects/{slug}`
- `GET /api/blogs` and `GET /api/blogs/{slug}`
- `GET /api/downloads`

### Public write APIs

- `POST /api/enquiries`
- `POST /api/quote-requests`
- `POST /api/contact`

### Administration APIs

Administration requires authentication and role authorization. CRUD endpoints will cover managed content; dedicated operations will handle publishing, technical approval, enquiry assignment/status, uploads, dashboard summaries, and user administration.

OpenAPI is the contract source of truth. Collection endpoints must use pagination, filtering, sorting, and a consistent error envelope. Breaking API changes require versioning or a coordinated release.

## 10. Non-functional requirements

### Performance

- Lighthouse performance target above 85 on representative production pages.
- Accessibility and SEO scores above 90.
- LCP below 2.5 seconds and CLS below 0.1 at the 75th percentile where field data is available.
- Responsive AVIF/WebP images and lazy loading for non-critical media.
- Cache public content safely and invalidate it after publication changes.

### Accessibility

- Apply WCAG 2.2 AA principles.
- Full keyboard operation, visible focus, semantic landmarks, correct labels/errors, sufficient contrast, and accessible navigation/dialogs/tables.
- Meaningful alt text must be part of the media publishing workflow.

### Security and privacy

- HTTPS, secure headers, CSP, validation, output encoding, rate limiting, and bot protection.
- Allowlisted attachment types, extension/content-signature validation, size limits, generated storage names, private storage, and malware-scan state.
- Role-based authorization, strong password policy, session expiry, lockout controls, and auditable privileged actions.
- No certification claim may be published without evidence.
- Privacy, cookie, terms, and technical-information disclaimers require business/legal approval.

### SEO and analytics

- Server-rendered semantic pages, canonical URLs, sitemap, robots rules, breadcrumbs, structured data, redirects, and editable metadata.
- Track form completion, phone clicks, WhatsApp clicks, and catalogue downloads subject to consent requirements.
- Keyword selection remains pending competitor and search-volume research.

## 11. Key decisions and open questions

### Decisions proposed for approval

| Decision | Recommendation |
| --- | --- |
| Application architecture | Next.js frontend plus Spring Boot API and PostgreSQL. |
| Repository | Monorepo with separate web and API applications. |
| Admin experience | Protected admin routes in the Next.js application for the MVP. |
| Content lifecycle | Draft → technical review where applicable → published → archived. |
| File storage | Private S3-compatible objects with signed access where required. |
| API contract | OpenAPI-first REST with a consistent error model. |
| Authentication | Secure cookie-based admin session; optional 2FA remains a production decision. |

### Blocking business inputs

- Approved logo and brand palette.
- Registered office, manufacturing locations, phone, email, maps, and business hours.
- Founder/company narrative, timeline, employee strength, production area/capacity, markets, and approved photographs.
- Product operating ranges, materials, testing, standards, warranty, and lead-time data.
- Certification evidence and rules for displaying standards/certifications.
- At least five publishable projects and client-anonymity decisions.
- Catalogue, brochures, datasheets, guides, and download-gating policy.
- Sales recipients, assignment rules, enquiry statuses, service-level expectations, and CRM/export needs.
- Attachment size/type limits and retention policy.
- Hosting provider, region, domain/DNS owner, analytics consent approach, and required legal policies.

## 12. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Unapproved technical claims | Require technical-review state and evidence before publishing. |
| Insufficient product data delays pages | Use a standard product-data template and prioritize launch products. |
| Sparse photography weakens credibility | Define a shot list early and use approved diagrams/placeholders only temporarily. |
| RFQ complexity reduces conversion | Use progressive disclosure and keep nonessential technical fields optional. |
| Unsafe uploads | Private storage, validation, limits, malware scanning, and signed access. |
| Scope expansion into automation | Enforce the MVP/deferred boundary and record change requests. |
| Performance degradation from media | Enforce optimization, dimensions, responsive delivery, and budgets. |
| Frontend/backend contract drift | Treat OpenAPI as authoritative and add contract validation in CI. |

## 13. Phase 1 backlog

### P0 — required to close discovery

- [x] Extract MVP objectives and scope from the source plan.
- [x] Define target users and primary jobs.
- [x] Establish the sitemap and content hierarchy.
- [x] Record the recommended system architecture.
- [x] Define the core content and operational model.
- [x] Define the end-to-end enquiry lifecycle.
- [x] Record non-functional requirements and principal risks.
- [x] AMPAR approves the MVP scope and deferred list.
- [ ] AMPAR supplies or assigns owners for all blocking business inputs.
- [ ] Confirm hosting, storage, email, CAPTCHA, maps, analytics, and consent providers.
- [ ] Confirm enquiry statuses, assignment rules, recipients, retention, and attachment policy.
- [ ] Approve the architectural decisions above.

### P1 — prepare Phase 2 and Phase 3

- [ ] Create structured product, project, industry, material, and company-content collection templates.
- [ ] Inventory current catalogue assets and identify gaps.
- [ ] Build the page-level content matrix and SEO seed list.
- [ ] Create wireframe requirements for all page templates and responsive states.
- [ ] Define the brand asset and photography shot list.

### P2 — prepare implementation

- [ ] Convert the content model into an ER diagram and migration outline.
- [ ] Draft the OpenAPI resource and error conventions.
- [ ] Draft environment, secret, CI/CD, test, and observability requirements.
- [ ] Define initial performance budgets and supported browser matrix.

## 14. Phase 1 acceptance criteria

Phase 1 is complete when:

- The product owner approves the MVP and explicitly records deferred capabilities.
- The sitemap and all reusable page templates are accepted.
- Architecture, repository structure, hosting direction, and integration providers are decided.
- Product, content, user, media, and enquiry models have enough detail for schema design.
- The RFQ fields, validation, statuses, recipients, ownership, retention, and attachment rules are approved.
- Content owners and technical approvers are named.
- Required assets and technical-data gaps have owners and target dates.
- Major risks and non-functional targets are accepted.
- Phase 2 content preparation and Phase 3 design can begin without unresolved structural questions.

## 15. Approval record

The Phase 1 scope, architecture direction, boundaries, and discovery outputs were approved by the product owner on 3 August 2026. Outstanding business inputs remain tracked as Phase 2 content dependencies and must be resolved before the affected content is published.

## 16. Next phase

Phase 2 will produce reusable content collection templates, an asset inventory, a content/SEO matrix, and an approval workflow. Development scaffolding begins in Phase 4 after the content structure and UX system are sufficiently stable.
