# Phase 7: Admin Panel

Status: In progress

## Implemented foundation

- Persistent database-backed administrator accounts with encoded password storage.
- One-time first-administrator bootstrap from environment configuration when the user table is empty.
- Case-insensitive account lookup, enabled/disabled account enforcement, and database-loaded roles.
- Short-lived opaque administrator sessions with SHA-256 token hashing, configurable expiry, bearer authentication, and explicit logout revocation.
- Role-protected `/api/admin/**` boundary using Spring Security.
- Paginated enquiry listing, optionally filtered by status.
- Enquiry detail retrieval containing the complete submitted request.
- Enquiry status updates across the approved sales workflow.
- Integration coverage for anonymous rejection, authenticated listing, and status changes.
- Responsive Next.js administrator sign-in and enquiry-management workspace.
- Status filtering, enquiry detail review, and inline workflow status controls.
- Session-only browser credential storage with explicit sign-out.

## Admin endpoints

- `GET /api/admin/enquiries?status=NEW&page=0&size=20`
- `GET /api/admin/enquiries/{id}`
- `PATCH /api/admin/enquiries/{id}/status`

All endpoints require HTTP Basic authentication. Configure `ADMIN_USERNAME` and a long random
`ADMIN_PASSWORD`; credentials must only be transmitted over HTTPS.

## Remaining Phase 7 work

- Add administrator account creation/management and password-reset flows.
- Add account lockout, session expiry, optional MFA, and auditable login events.
- Add dashboard metrics and pagination controls to the administration screens.
- Add enquiry ownership, assignment, internal notes, and audit history.
- Add role-specific access for Super Admin, Content Admin, Sales User, and Technical Reviewer.
- Add product, project, download, content, SEO, and user management modules.

## Acceptance boundary

This slice creates the protected enquiry-management API contract and persists administrator identities.
HTTP Basic authentication remains a transitional transport suitable only behind HTTPS. Production
administration still requires short-lived sessions, account-management and password-reset workflows,
lockout controls, audit history, and security testing.
