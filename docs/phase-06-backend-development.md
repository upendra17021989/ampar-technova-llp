# Phase 6: Backend Development

Status: In progress

## Implemented foundation

- Versioned PostgreSQL migration for products and enquiries.
- Ten catalogue-backed product seed records without unapproved technical limits.
- Published-product listing and slug-detail APIs.
- Validated enquiry API with consent enforcement and published-product validation.
- Unique `AMP-YYYYMMDD-XXXXXXXX` enquiry references.
- Consistent validation, invalid-request, and not-found error payloads.
- Explicit Spring Security allowlists for public APIs, health, and OpenAPI.
- Springdoc OpenAPI and Swagger UI integration for Spring Boot 4.

## Public endpoints

- `GET /api/products`
- `GET /api/products/{slug}`
- `POST /api/enquiries`
- `GET /v3/api-docs`
- `GET /swagger-ui.html`
- `GET /actuator/health`

## Enquiry submission example

```json
{
  "enquiryType": "QUOTE",
  "name": "Example User",
  "company": "Example Industries",
  "email": "user@example.com",
  "phone": "+91 99999 99999",
  "country": "India",
  "productSlug": "frp-storage-tanks",
  "industry": "Chemical Processing",
  "message": "Please review an FRP storage tank requirement for our process.",
  "consentGiven": true
}
```

## Remaining Phase 6 work

- Add normalized categories, materials, industries, technologies, projects, resources, articles, and media schemas/APIs.
- Expand product technical fields after approval.
- Add structured pagination, filtering, and sorting.
- Add enquiry technical-condition fields and attachment metadata.
- Add file validation/storage integration and malware-scanning workflow.
- Add rate limiting, bot protection, notification events, and transactional email integration.
- Add audit events and administration-only enquiry operations.
- Connect the Next.js content and RFQ flows.
- Run migrations and integration checks against the configured Supabase project.

## Acceptance boundary

This slice establishes the public API contract and persistence pattern. It is not production-ready until rate limiting, bot protection, attachment controls, notifications, audit history, Supabase migration verification, and security testing are complete.
