# Phase 4: Project Setup

Status: Approved on 3 August 2026; Supabase connectivity verification carried forward
Started: 3 August 2026  
Prerequisites: Phases 1-3 approved

## 1. Objective

Establish a reproducible monorepo with runnable frontend and backend applications, environment-based PostgreSQL connectivity, automated quality checks, and a CI foundation.

## 2. Implemented foundation

- npm workspace containing the Next.js public/admin web application.
- Next.js 16 App Router with React, TypeScript, Material UI dependencies, React Hook Form, and Zod.
- Initial accessible AMPAR shell and hero using the Phase 3 design tokens.
- Vitest, Testing Library, ESLint, strict TypeScript, and production-build scripts.
- Spring Boot REST application with validation, security, JPA, Flyway, Actuator, and PostgreSQL support.
- Initial security allowlist, environment-based CORS, safe error defaults, and health endpoints.
- Environment-based PostgreSQL configuration and a baseline Flyway migration.
- H2-backed backend context test.
- GitHub Actions jobs for frontend and backend verification.
- Environment template, ignore rules, editor settings, and workspace commands.

## 3. Runtime decisions

- Node.js 22 is the frontend baseline.
- Next.js 16.2.12 is pinned to the current Active LTS security patch.
- Spring Boot 4.1.0 is used and supports Java 17 or newer.
- The local workstation currently provides Java 17. CI also uses Java 17 for reproducibility.
- Java 21 remains the preferred production target from the architecture plan; upgrading requires changing the Maven property and CI runtime after a Java 21 JDK is available.
- PostgreSQL is provided by Supabase and accessed from Spring Boot through JDBC. Docker and a local database are not part of the project.
- The configured development endpoint is `db.zborevxprhonbyrfjvxk.supabase.co:5432/postgres` with username `postgres`, TLS required, and the password supplied only at runtime.

## 4. Repository structure

```text
apps/
├── web/                 Next.js public website and future admin UI
└── api/                 Spring Boot content and enquiry API
.github/workflows/       CI checks
docs/                    Product, design, and engineering documentation
.env.example             Non-secret environment contract
package.json             Workspace scripts
```

## 5. Environment setup

1. Copy `.env.example` to `.env`.
2. Replace the example PostgreSQL password for local use.
3. Create the Supabase project and follow `docs/supabase-setup.md`.
4. Set `DATABASE_URL`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` in the local environment.
5. Install frontend dependencies with `npm.cmd install` on Windows PowerShell.
6. Start the web application with `npm.cmd run dev:web`.
7. Start the API from `apps/api` with `mvn spring-boot:run`; Flyway applies versioned migrations automatically.

Do not commit `.env` files, credentials, service keys, or production URLs.

## 6. Quality gates

### Frontend

- ESLint passes.
- Unit/component tests pass.
- TypeScript production build passes.
- No known high-severity dependency vulnerabilities are accepted without a documented exception.

### Backend

- Maven verify passes.
- Spring application context loads in the test profile.
- Flyway owns schema changes; Hibernate validates rather than mutates production schemas.
- Actuator exposes only health and info publicly.

### Repository

- CI runs on pull requests and main-branch pushes.
- Secrets are absent from tracked files.
- Developer setup is documented and reproducible.

## 7. Remaining Phase 4 backlog

- [x] Create monorepo and workspace scripts.
- [x] Scaffold the Next.js application and initial theme tokens.
- [x] Configure frontend lint, test, and build tooling.
- [x] Scaffold the Spring Boot application and baseline security.
- [x] Configure environment-based PostgreSQL connectivity and the first Flyway migration.
- [x] Add environment and Git ignore conventions.
- [x] Add frontend and backend CI jobs.
- [x] Install and lock frontend dependencies.
- [x] Verify frontend lint, tests, and production build.
- [x] Resolve backend dependencies and run Maven verification.
- [ ] Supply the Supabase development connection and verify the API health endpoint with migrations.
- [ ] Confirm Java 17 for MVP or upgrade local/CI/production targets to Java 21.
- [ ] Add deployment environment ownership and secret-management decisions.

## 8. Temporary dependency security exception

On 3 August 2026, `npm audit` reported three high-severity findings through the latest stable Next.js 16.2.12 dependency tree: PostCSS source-map/style serialization advisories and Sharp/libvips image-processing advisories. npm's automated recommendation is an invalid major downgrade to Next.js 9.3.3, so it has not been applied.

Temporary controls:

- Do not compile or transform user-supplied CSS.
- Do not pass untrusted uploaded images through Next.js image optimization.
- Keep enquiry attachments private and process them only through the future validated backend upload pipeline.
- Monitor the Next.js stable channel and upgrade as soon as a release resolves the dependency tree.
- Keep the audit visible in CI once the upstream stable fix exists; production release requires explicit security review if these findings remain.

This is a documented setup exception, not acceptance for production deployment.

## 9. Database verification status

Docker is intentionally not used. The backend context test and packaged Maven build pass using the isolated H2 test configuration. Database migration and health-endpoint verification will run after the Supabase development credentials are supplied locally.

## 10. Acceptance criteria

Phase 4 is complete when a clean checkout can install dependencies, connect to Supabase, run both applications, execute all checks, and reproduce CI without undocumented local configuration.

## 11. Approval record

Phase 4 was approved to proceed on 3 August 2026. The repository, frontend and backend builds, automated tests, CI configuration, Flyway baseline, and Supabase connection contract are established. Live Supabase migration verification remains pending until local credentials are configured.

## 12. Next phase

Phase 5 will implement the public website shell, navigation, homepage, product discovery, reusable content components, forms, responsive behavior, and SEO foundations against API contracts.
