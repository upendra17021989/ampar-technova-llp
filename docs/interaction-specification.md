# Interaction Specification

## 1. Navigation

- Keyboard order follows visual order.
- Mega-menu triggers use buttons, not placeholder links.
- Escape closes menus/drawers; focus returns to the trigger.
- Current page is identified visually and with `aria-current="page"`.
- Submenus do not open on hover alone.
- Anchor navigation offsets account for the sticky header.

## 2. Links and buttons

- Links navigate; buttons perform actions.
- Primary button: orange fill, high-contrast text, visible hover/focus/disabled/busy states.
- Secondary button: navy outline or neutral treatment with equivalent focus visibility.
- External links are identified when the context does not make this clear.
- Downloads include file type and size when available.
- Busy actions prevent duplicate submission and retain an accessible label.

## 3. Cards

- Card title is the primary link; avoid nested interactive controls inside a fully clickable card.
- Equal-height rows are allowed on desktop but content is never clipped.
- Images use declared aspect ratios to prevent layout shift.
- Missing images use a neutral category treatment, not unrelated stock imagery.

## 4. Filters and search

- Changing filters updates the URL query so results can be shared and restored.
- Desktop filters apply immediately when predictable; mobile drawers use Apply and Clear.
- Announce result-count changes politely to assistive technology.
- Preserve filters when returning from a detail page.
- Empty states explain how to broaden the search and provide Clear Filters.

## 5. Accordions and tabs

- Use accordions for optional supporting information, not essential primary content.
- Accordion headers are buttons with expanded state and controlled-region references.
- Tabs use correct tab semantics, arrow-key navigation, and a usable stacked fallback where content is long.
- URL fragments may expose a specific technical section.

## 6. Forms

- Labels remain visible; placeholders are examples only.
- Required fields are identified in text and programmatically.
- Validate on blur when helpful and on submit; do not interrupt while a user is typing.
- Error messages state the problem and correction.
- On failed submission, focus the error summary and link each error to its field.
- Preserve all safe form values after validation or recoverable network errors.
- Prevent accidental duplicate submissions while retaining retry behavior.
- Consent is explicit and not preselected.
- Success includes the unique enquiry reference and next step.

## 7. RFQ stepper

- Users can move backward without losing data.
- Each step validates only fields needed to proceed.
- Progress is expressed as both step number and meaningful step name.
- Browser refresh recovery may use session-scoped local state, excluding attachments and sensitive values where policy prohibits storage.
- The review step displays a semantic summary grouped by step with Edit actions.
- Product-entry CTAs preselect the relevant product while allowing change.

## 8. File upload

- Provide Choose Files and drag/drop as an enhancement; keyboard selection always works.
- State accepted file types, maximum size, maximum count, and security processing before selection.
- Show filename, size, progress, success/failure, and Remove action.
- Client-side checks improve feedback but never replace server validation.
- Uploaded objects remain private and are referenced by opaque identifiers.
- Malware scan pending/failure states must not imply successful delivery.

Final limits and allowed types require business/security approval. Initial design assumption: PDF, common image formats, DWG/DXF, and office documents up to a conservative per-file limit, subject to backend feasibility and risk review.

## 9. Downloads and gated resources

- Public resources download directly or open a controlled preview.
- Gated resources clearly state that contact information is required.
- Successful gated submission reveals/sends only the requested resource.
- Tracking must respect consent and must not block the download when analytics fails.
- Expired or missing files display a helpful fallback and contact path.

## 10. Galleries and media

- Thumbnails and controls are keyboard operable.
- Dialog/lightbox focus is trapped and restored on close.
- Captions identify product/process/project only when provenance permits.
- Video includes captions/transcript and does not autoplay with sound.
- Motion and parallax are disabled or simplified for reduced-motion preferences.

## 11. Feedback states

Every data-driven component defines:

- Loading: stable skeleton matching final geometry.
- Empty: reason, recovery action, and relevant navigation.
- Error: concise message, retry when safe, and alternate contact if critical.
- Success: persistent confirmation for consequential actions.
- Partial data: omit unavailable optional fields; label genuinely pending information where useful.

## 12. Responsive behavior

- No horizontal page scrolling at 320 CSS pixels.
- Tables may scroll inside a labeled region; essential comparisons also receive a stacked presentation.
- Two-column content becomes a logical single-column reading order.
- Sticky mobile actions must not cover content, consent controls, or browser UI.
- Hover affordances have touch and keyboard equivalents.
- Dialogs become near-full-screen sheets when needed while retaining clear close and back behavior.

## 13. Analytics events

Subject to consent, define stable events for:

- `quote_started`, `quote_step_completed`, `quote_submitted`.
- `contact_submitted` and `technical_consultation_submitted`.
- `phone_clicked`, `email_clicked`, `whatsapp_clicked`.
- `catalogue_downloaded`, `resource_downloaded`, `gated_resource_requested`.
- `product_viewed`, `project_viewed`, and material filters used.

Never place technical requirements, chemicals, attachments, personal data, or free-text form content in analytics payloads.

## 14. Acceptance tests for design handoff

- Complete primary navigation using only a keyboard.
- Open/close every overlay and return focus correctly.
- Submit valid and invalid contact/RFQ examples.
- Recover from simulated network failure without losing safe inputs.
- Use product, project, material, and resource filters at all breakpoints.
- Read comparison/specification content with a screen reader.
- Verify focus and contrast in default, hover, focus, disabled, error, and success states.
- Verify 320px mobile layout and 200% browser zoom without loss of content or operation.
