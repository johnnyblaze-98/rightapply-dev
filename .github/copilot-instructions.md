Project: Rightapply (vite + React front-end + AWS SAM Lambdas)

Quick orientation
- Frontend: Vite + React + TypeScript located in `src/` (entry: `main.tsx`, pages/components under `src/components`).
- Server: Two AWS Lambda handlers in `lambda/` — `save.js` (POST /registrations) and `query.js` (GET /registrations and GET /registrations/{id}).
- Infra: `template.yaml` (AWS SAM) declares DynamoDB table, S3 bucket, Secrets Manager usage and an HttpApi. Environment variables (TABLE_NAME, RAW_BUCKET, SECRET_PREFIX, CORS_ORIGIN) are injected by SAM.

Primary goals for edits
- Keep front-end and lambda contracts stable: API base URL is provided to the client via `import.meta.env.VITE_API_BASE` (set after deployment). Frontend expects `POST /registrations` to return { id, createdAt } on success.
- Sensitive data handling: passwords are stored in AWS Secrets Manager in `save.js`. Never leak `resumeEmailPassword` in logs or responses — note that lambdas already remove the password from S3/Dynamo responses.

Developer workflows & commands
- Start dev server (frontend): `npm run dev` from repository root.
- Build frontend: `npm run build` (Vite).
- Lambda (local preparation): `npm run aws:build` installs lambda deps under `lambda/`.
- Deploy (SAM guided): `npm run aws:deploy` (runs `sam build && sam deploy --guided`). For production: `npm run aws:deploy-prod`.
- Important files to read when making infra changes: `template.yaml`, `lambda/save.js`, `lambda/query.js`, `lambda/package.json`.

Patterns & conventions to follow
- API and CORS: SAM injects `CORS_ORIGIN` (see `template.yaml`) and lambdas add `Access-Control-Allow-*` headers. Keep preflight handling (`OPTIONS`) in handlers when adding new endpoints.
- DynamoDB use: lambdas use AWS SDK v3 (`@aws-sdk/client-dynamodb`) and `util-dynamodb` marshall/unmarshall helpers. Follow this pattern for new DB operations.
- Secrets: Passwords are stored by creating a secret per registration (`${SECRET_PREFIX}/${id}/resumeEmailPassword`). When adding any other secret material, use `SecretsManagerClient` as existing code does.
- S3 raw storage: Raw JSON payload (with password removed) is stored under `registrations/YYYY-MM-DD/{id}.json` — maintain this key pattern if adding new uploads.

Files & examples to reference
- Frontend form and API usage: `src/components/RegistrationPage.tsx` — uses `VITE_API_BASE` and posts to `${API_BASE}/registrations` with `Idempotency-Key` header.
- Lambda save flow: `lambda/save.js` — validation, secret creation, DynamoDB PutItem (marshall), S3 PutObject, and error handling. Preserve the validation order and required fields list when modifying shape.
- Lambda query flow: `lambda/query.js` — supports single GET by id (GetItem) and list via Scan with optional filters (`visa`, `sector`, date range post-filtering). It can return CSV when `format=csv`.

Decision notes (why things are structured this way)
- Secrets per-registration: avoids storing passwords in DynamoDB and leverages Secrets Manager for rotation / auditing.
- Serverless with SAM: simpler local dev + guided deployment to AWS; `template.yaml` centralizes infra details (table names, bucket, policy attachments).
- Frontend environment: `VITE_API_BASE` is intentionally left to be set after deployment so local dev can still run without an API backing.

Strict do / don't list for AI edits
- Do: Update `template.yaml` when new AWS resources or env vars are needed; keep `Permissions`/`Policies` minimal and explicit.
- Do: Keep the same marshall/unmarshall pattern (`@aws-sdk/util-dynamodb`) when interacting with DynamoDB.
- Don't: Log secrets or return them in the HTTP response. (`save.js` already strips password from S3/Dynamo payloads; follow that.)
- Don't: Change the API contract (paths, required fields) without updating `src/components/RegistrationPage.tsx` and `template.yaml` simultaneously.

If you need to run tests or checks
- Lint: `npm run lint` (root). There are no unit tests in this repo by default.
- Quick smoke: run `npm run aws:build` then `npm run dev` and open `http://localhost:5173` (Vite default) to exercise the form (set `VITE_API_BASE` to a deployed endpoint to submit real requests).

Questions for the maintainer when unsure
- Preferred DynamoDB key/index strategy for queries (currently only primary key `id` is defined; `USE_GSI_BY_DATE` env var exists in `template.yaml` but not implemented in code). If adding date-range efficient queries, confirm if a GSI should be created.
- Secrets lifecycle policy: should secrets be tagged with TTL or rotation? Current code creates secrets without automatic rotation.

End of instructions — ask for clarification if any infra or API change is needed before implementing.
