# Supabase Database Setup

## 1. Create the project

Create a dedicated Supabase project for the development environment. Production should use a separate project or an explicitly isolated production environment. Select the closest appropriate region because the Spring Boot API will make persistent database connections.

Do not expose the database password, service-role key, or JDBC connection string in the Next.js public environment. Database credentials belong only to the Spring Boot API runtime.

## 2. Choose the connection

For local development and a persistent Spring Boot backend:

- Use the direct connection when the runtime has IPv6 connectivity or the Supabase IPv4 add-on.
- Otherwise use the Supavisor Session pooler on port 5432, which supports IPv4 and persistent backend sessions.
- Do not use transaction mode on port 6543 for the initial Spring Boot/Flyway configuration; transaction pooling has different prepared-statement and migration considerations.

The configured development project uses this direct connection:

```text
Host: db.zborevxprhonbyrfjvxk.supabase.co
Port: 5432
Database: postgres
Username: postgres
JDBC URL: jdbc:postgresql://db.zborevxprhonbyrfjvxk.supabase.co:5432/postgres?sslmode=require
```

This is Supabase's direct endpoint. It requires IPv6 connectivity unless the project has the Supabase IPv4 add-on. If the deployment network is IPv4-only, replace the host and username with the Session pooler values supplied by Supabase Dashboard → Connect; the JDBC structure and port 5432 remain the same.

## 3. Configure local environment

Set these variables in the shell or an untracked local environment file:

```text
DATABASE_HOST=db.zborevxprhonbyrfjvxk.supabase.co
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_URL=jdbc:postgresql://db.zborevxprhonbyrfjvxk.supabase.co:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=DATABASE_PASSWORD
DATABASE_POOL_SIZE=5
DATABASE_MIN_IDLE=1
```

The small initial connection pool protects entry-level Supabase connection limits. Tune it only after reviewing the project tier, concurrent API instances, and observed utilization.

## 4. Apply migrations

Flyway runs automatically when the Spring Boot API starts. The first startup applies `V1__baseline.sql`. Hibernate uses `ddl-auto: validate`, so application startup fails if migrations and entity mappings diverge instead of silently modifying the schema.

From `apps/api`:

```powershell
$env:DATABASE_URL='jdbc:postgresql://db.zborevxprhonbyrfjvxk.supabase.co:5432/postgres?sslmode=require'
$env:DATABASE_USERNAME='postgres'
$env:DATABASE_PASSWORD='DATABASE_PASSWORD'
mvn spring-boot:run
```

Do not paste real credentials into documentation, source files, terminal recordings, issue trackers, or commits.

## 5. Verify

After startup:

1. Confirm Flyway reports migration version 1 as successful.
2. Open `http://localhost:8080/actuator/health` and confirm `UP`.
3. Confirm the `app_metadata` table exists in the Supabase Table Editor.
4. Confirm no application table is exposed to anonymous browser clients unless a deliberate Row Level Security and Data API design is approved.

## 6. Production requirements

- Use a separate production database password and secret store.
- Restrict database networks where the hosting topology permits.
- Rotate credentials after accidental disclosure.
- Set connection-pool size across all API instances within Supabase limits.
- Review backup, point-in-time recovery, retention, and restoration procedures.
- Run Flyway migrations as a controlled deployment step before scaling new application instances.
- Keep Supabase service-role and anonymous API keys out of the current architecture unless a separately reviewed feature requires them.
