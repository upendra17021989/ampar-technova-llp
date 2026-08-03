# Phase 7: Admin Panel

Status: In progress

## Implemented foundation

- Environment-configured administrator credentials with encoded in-memory password storage.
- Role-protected `/api/admin/**` boundary using Spring Security.
- Paginated enquiry listing, optionally filtered by status.
- Enquiry detail retrieval containing the complete submitted request.
- Enquiry status updates across the approved sales workflow.
- Integration coverage for anonymous rejection, authenticated listing, and status changes.

## Admin endpoints

- `GET /api/admin/enquiries?status=NEW&page=0&size=20`
- `GET /api/admin/enquiries/{id}`
- `PATCH /api/admin/enquiries/{id}/status`

All endpoints require HTTP Basic authentication. Configure `ADMIN_USERNAME` and a long random
`ADMIN_PASSWORD`; credentials must only be transmitted over HTTPS.

## Remaining Phase 7 work

- Replace the single bootstrap administrator with persistent users and password-reset flows.
- Add account lockout, session expiry, optional MFA, and auditable login events.
- Build the Next.js administration screens for dashboard and enquiry management.
- Add enquiry ownership, assignment, internal notes, and audit history.
- Add role-specific access for Super Admin, Content Admin, Sales User, and Technical Reviewer.
- Add product, project, download, content, SEO, and user management modules.

## Acceptance boundary

This slice creates the protected enquiry-management API contract. HTTP Basic authentication is a
bootstrap mechanism suitable only behind HTTPS. Production administration requires persistent users,
short-lived sessions, lockout controls, audit history, and security testing.
