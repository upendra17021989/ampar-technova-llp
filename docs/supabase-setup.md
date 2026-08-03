# Supabase Database Setup

## 1. Create the project

Create a dedicated Supabase project for the development environment. Production should use a separate project or an explicitly isolated production environment. Select the closest appropriate region because the Spring Boot API will make persistent database connections.

Do not expose the database password, service-role key, or JDBC connection string in the Next.js public environment. Database credentials belong only to the Spring Boot API runtime.

## 2. Choose the connection

For local development and a persistent Spring Boot backend:

- Use the direct connection when the runtime has IPv6 connectivity or the Supabase IPv4 add-on.
- Otherwise use the Supavisor Session pooler on port 5432, which supports IPv4 and persistent backend sessions.
- Do not use transaction mode on port 6543 for the initial Spring Boot/Flyway configuration; transaction pooling has different prepared-statement and migration considerations.

The configured development project uses this IPv4-compatible Session pooler connection:

```text
Host: aws-0-ap-southeast-2.pooler.supabase.com
Port: 5432
Database: postgres
Username: postgres.zborevxprhonbyrfjvxk
JDBC URL: jdbc:postgresql://aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require
```

Session mode is appropriate for the persistent Spring Boot backend and avoids the IPv6 limitation of the project's direct endpoint.

## 3. Configure local environment

Copy `.env.example` to an untracked `.env` file at the repository root and replace only the password placeholder. The backend explicitly loads this root file when started from `apps/api`.

```text
DATABASE_HOST=aws-0-ap-southeast-2.pooler.supabase.com
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_JDBC_URL=jdbc:postgresql://aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require
DATABASE_USERNAME=postgres.zborevxprhonbyrfjvxk
DATABASE_PASSWORD=DATABASE_PASSWORD
DATABASE_POOL_SIZE=5
DATABASE_MIN_IDLE=1
```

Alternatively, set the same values as shell or deployment-environment variables. Operating-system environment variables take precedence over the `.env` file. Ensure an old `DATABASE_JDBC_URL`, `DATABASE_USERNAME`, or `DATABASE_PASSWORD` is not still defined in the terminal or IDE run configuration.

The small initial connection pool protects entry-level Supabase connection limits. Tune it only after reviewing the project tier, concurrent API instances, and observed utilization.

## 4. Apply migrations

Flyway runs automatically when the Spring Boot API starts. The first startup applies `V1__baseline.sql`. Hibernate uses `ddl-auto: validate`, so application startup fails if migrations and entity mappings diverge instead of silently modifying the schema.

From `apps/api`:

```powershell
$env:DATABASE_JDBC_URL='jdbc:postgresql://aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres?sslmode=require'
$env:DATABASE_USERNAME='postgres.zborevxprhonbyrfjvxk'
$env:DATABASE_PASSWORD='DATABASE_PASSWORD'
mvn spring-boot:run
```

Do not paste real credentials into documentation, source files, terminal recordings, issue trackers, or commits.

`DATABASE_JDBC_URL` is intentionally distinct from the generic `DATABASE_URL` commonly supplied by hosting platforms. Supabase may display a URI beginning with `postgresql://`; Spring JDBC requires the value used here to begin with `jdbc:postgresql://`.

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
