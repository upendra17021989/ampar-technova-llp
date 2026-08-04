# Cloud Run Console Deployment

This guide deploys the Spring Boot API as a Docker container using the Google Cloud browser console.

## Container configuration included in the repository

- Build context: `apps/api`
- Dockerfile: `apps/api/Dockerfile`
- Container port: `8080`
- Runtime user: non-root UID/GID `10001`
- Java runtime: Eclipse Temurin 17 JRE
- Application port: reads Cloud Run's injected `PORT`, with local fallback to `API_PORT` and then `8080`
- Secrets and Maven output are excluded by `apps/api/.dockerignore`

## Build the image in Google Cloud

The Cloud Run console can deploy from a connected source repository. Select the repository and configure:

- Branch: the branch containing this Dockerfile
- Build type: Dockerfile
- Source directory/build context: `/apps/api`
- Dockerfile path: `/apps/api/Dockerfile`
- Container port: `8080`

If using Cloud Build manually in the browser, create an Artifact Registry Docker repository, then build from `apps/api` and select the resulting image when creating the Cloud Run service.

## Cloud Run service settings

- Service name: `ampar-api`
- Region: choose a region close to the Supabase database and frontend
- Authentication: Allow public access (Spring Security protects admin routes)
- CPU: 1
- Memory: 1 GiB
- Minimum instances: 0
- Maximum instances: 5
- Request concurrency: 40
- Container port: 8080
- Startup CPU boost: enabled

## Non-secret environment variables

Configure these under **Containers > Variables & Secrets**:

| Variable | Value |
|---|---|
| `DATABASE_JDBC_URL` | Supabase session-pooler JDBC URL ending in `?sslmode=require` |
| `DATABASE_USERNAME` | Supabase pooler database username |
| `DATABASE_POOL_SIZE` | `5` |
| `DATABASE_MIN_IDLE` | `1` |
| `WEB_ORIGIN` | Exact deployed frontend origin, without a trailing slash |
| `ADMIN_USERNAME` | Initial administrator username, normally `admin` |
| `ADMIN_SESSION_HOURS` | `8` |

Do not add `PORT`; Cloud Run provides it automatically.

## Secret Manager variables

Create these values in Secret Manager and expose them as environment variables:

| Environment variable | Recommended secret name |
|---|---|
| `DATABASE_PASSWORD` | `ampar-database-password` |
| `ADMIN_PASSWORD` | `ampar-admin-password` |

Grant the Cloud Run runtime service account **Secret Manager Secret Accessor** access to both secrets.

The admin password is used only when the `admin_users` table is empty. Updating the secret does not change an already-created administrator password.

## Health and startup verification

After deployment, verify:

- `GET /actuator/health` returns `{"status":"UP"}`
- `GET /api/products` returns the published catalogue
- `POST /api/enquiries` accepts a test quote request
- `/api/admin/enquiries` returns `401` without a valid session

Flyway migrations run during startup. If the revision is not ready, inspect Cloud Run logs for database connectivity, migration, or missing-secret errors.

## Frontend configuration

Set this variable in the frontend deployment and rebuild it:

```text
NEXT_PUBLIC_API_URL=https://YOUR-CLOUD-RUN-SERVICE-URL
```

The API's `WEB_ORIGIN` value must exactly match the frontend origin for browser CORS requests.
