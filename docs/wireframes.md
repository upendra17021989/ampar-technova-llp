# Responsive Wireframes

These structural wireframes define hierarchy and behavior, not final artwork. Sections marked optional appear only when approved content exists.

## 1. Home

```text
UTILITY: phone | email | catalogue
HEADER: logo | primary navigation | Contact | [Request a Quote]
----------------------------------------------------------------
HERO
Eyebrow: Corrosion-resistant engineering solutions
H1: Engineering Tomorrow's Corrosion-Resistant Solutions
Supporting copy
[Request a Quote] [Explore Products] [Download Catalogue]
Approved industrial/product visual
----------------------------------------------------------------
CREDIBILITY STRIP: materials | engineering | manufacturing | support
----------------------------------------------------------------
PRODUCT CATEGORIES: five cards
----------------------------------------------------------------
TECHNOLOGIES: FRP | Thermoplastic | Dual Laminate
----------------------------------------------------------------
INDUSTRIES: selected grid + view all
----------------------------------------------------------------
ENGINEERING & MANUFACTURING: narrative + evidence + authentic visual
----------------------------------------------------------------
QUALITY & STANDARDS: processes and applicable references
----------------------------------------------------------------
FEATURED PROJECTS (only when approved)
----------------------------------------------------------------
RESOURCES: catalogue + featured technical resources
----------------------------------------------------------------
FINAL CTA: requirement summary + quote/consultation actions
FOOTER
```

Mobile order remains the same. The hero actions stack, category/technology cards become a single-column list or swipe-free grid, and no essential content depends on hover.

## 2. Product listing

```text
BREADCRUMBS
H1 Products + concise introduction
CATEGORY NAVIGATION/FILTER
Result count                                 Sort
------------------------------------------------
PRODUCT CARD GRID
Image | category | name | summary | materials | View details
------------------------------------------------
Pagination or explicit Load More
Consultation CTA
```

On mobile, filters open in a modal drawer with Apply and Clear actions. Current filters remain visible as removable chips.

## 3. Product detail

```text
BREADCRUMBS
PRODUCT HERO
Category + H1 + overview
[Request a Quote] [Download Datasheet]
Gallery / approved product visual
------------------------------------------------
ON-PAGE NAV: Overview | Features | Specifications | Applications | Downloads
------------------------------------------------
FEATURES + APPLICATIONS
------------------------------------------------
SPECIFICATION DEFINITION LIST/TABLE
Operating/design values explicitly labeled
Technical disclaimer adjacent to values
------------------------------------------------
MATERIALS + INDUSTRIES
------------------------------------------------
STANDARDS + TESTING (applicable and evidenced wording)
------------------------------------------------
GALLERY + DOWNLOADS
------------------------------------------------
RELATED PRODUCTS / PROJECTS
------------------------------------------------
PRE-FILLED RFQ CTA
```

On mobile, the on-page navigation becomes a horizontal, scrollable tab list or disclosure index. Specification labels and values stack without shrinking text.

## 4. Technology detail

```text
BREADCRUMBS
HERO: H1, overview, consultation CTA, process visual/diagram
HOW IT WORKS / CONSTRUCTION
MATERIALS OR METHODS
ADVANTAGES AND LIMITATIONS
APPLICATIONS
QUALITY, INSPECTION, AND STANDARDS
RELATED PRODUCTS AND PROJECTS
TECHNICAL CONSULTATION CTA
```

## 5. Materials comparison

```text
BREADCRUMBS
H1 Material Comparison
Prominent engineering-review disclaimer
SEARCH + filters: temperature guidance | application | material
------------------------------------------------
COMPARISON TABLE
Material | temperature guidance | suitable uses | limitations | details
------------------------------------------------
Selection factors: chemical | concentration | temperature | pressure | process
Consultation CTA
```

On small screens, provide essential material cards and an optional full comparison table in an accessible horizontal region. Never present temperature alone as a selection decision.

## 6. Industry detail

```text
BREADCRUMBS
HERO: industry H1 + overview + consultation CTA
COMMON CORROSION/PROCESS CHALLENGES
AMPAR SOLUTION AREAS
RELEVANT PRODUCTS
MATERIAL CONSIDERATIONS + disclaimer
TYPICAL APPLICATIONS
RELATED PROJECTS (if approved)
RELATED RESOURCES
CONSULTATION CTA
```

## 7. Engineering & Manufacturing

```text
HERO with authentic facility/process image
ENGINEERING SERVICES
DESIGN-TO-DELIVERY PROCESS
MANUFACTURING CAPABILITIES
FABRICATION METHODS
INSPECTION AND TESTING
FACILITY/PROCESS GALLERY
RELATED PROJECTS
DISCUSS YOUR REQUIREMENT CTA
```

Unverified facility metrics and equipment counts are omitted, not replaced with generic counters.

## 8. Quality & Standards

```text
HERO: quality approach
QUALITY WORKFLOW: materials → process → inspection → testing → records
TEST METHODS
TRACEABILITY AND DOCUMENTATION
APPLICABLE STANDARDS grouped by region/type
CERTIFICATES/DOCUMENTS (only when evidence is supplied)
REQUEST QUALITY DOCUMENTS CTA
```

## 9. Projects listing and detail

Listing filters: industry, product, material, location, and year.

```text
DETAIL HERO: approved title/client-display policy + result image
AT-A-GLANCE: industry | product | material | location/year when permitted
REQUIREMENT AND CHALLENGE
SOLUTION
DELIVERED SCOPE AND TECHNICAL DATA
TESTING / STANDARDS
GALLERY
OUTCOME
RELATED SOLUTIONS
DISCUSS A SIMILAR PROJECT CTA
```

## 10. Resources

```text
H1 Resources
Type filters + search
RESOURCE LIST
Title | type | summary | revision/date | file type/size | access label | action
Lead-capture modal/page only for gated resources
```

Download actions must disclose when contact details are required. File actions must work by keyboard and state file type/size when known.

## 11. Contact

```text
H1 Contact AMPAR
GENERAL CONTACT FORM       CONTACT CHANNELS
Enquiry type               Sales phone/email
Name/company               Registered office and units
Email/phone                Maps and hours when confirmed
Message
Consent
[Send Enquiry]
```

On mobile, the form precedes or follows channels according to usability testing; click-to-call is available but not visually obstructive.

## 12. Request a Quote

Use a short, multi-step flow with a persistent progress indicator:

1. Contact: name, company, email, phone, country.
2. Requirement: industry, category, equipment, quantity, capacity.
3. Process conditions: chemical, concentration, temperature, pressure, material preference.
4. Project: required date, location, message, drawings/specifications.
5. Review: editable summary, consent, submission.

After submission, replace the form with a durable success panel containing the enquiry reference, summary, next step, and AMPAR contact details. Preserve entered data after recoverable validation/network errors.

## 13. About

```text
HERO: company positioning + authentic company visual
WHO WE ARE
VISION / MISSION / VALUES
GROUP COMPANIES
TIMELINE (only with verified milestones)
FOUNDERS (only with approved biographies/portraits)
LOCATIONS
ENGINEERING AND MANUFACTURING STRENGTHS
WHY AMPAR
CONTACT CTA
```

## 14. System pages

- Search results: query, count, type filters, highlighted matching context, empty state.
- 404: clear message, search, Products, Contact, and Home actions.
- Error: retry and contact path; never expose stack traces or internal identifiers.
- Maintenance/unavailable: concise status and alternate contact.
- Form failure: keep values, identify recoverable action, and provide reference if the enquiry was stored.
