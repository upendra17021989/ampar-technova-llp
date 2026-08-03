# AMPAR Technova LLP Website

Corporate website and lead-generation platform for AMPAR Technova LLP.

## Project status

Phases 1-3 are approved. Phase 4 (Project Setup) is in progress.

- [Phase 1: Discovery and Definition](docs/phase-01-discovery.md)
- [Phase 2: Content Preparation](docs/phase-02-content-preparation.md)
- [Phase 3: UX/UI Design](docs/phase-03-ux-ui-design.md)
- [Phase 4: Project Setup](docs/phase-04-project-setup.md)

## Workspace commands

```bash
npm.cmd install
npm.cmd run dev:web
npm.cmd run build:web
npm.cmd run test:web

cd apps/api
mvn spring-boot:run
mvn verify
```

The backend uses Supabase PostgreSQL. Follow [docs/supabase-setup.md](docs/supabase-setup.md) and configure the variables in `.env.example`. Backend tests use an isolated in-memory H2 database and do not require Supabase.

## Delivery phases

1. Discovery and definition
2. Content preparation
3. UX/UI design
4. Project setup
5. Frontend development
6. Backend development
7. Admin panel
8. Third-party integrations
9. Testing and UAT
10. Production launch and handover

The source plan is maintained in `AMPAR_Technova_Website_Development_Plan.docx`.
