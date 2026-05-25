# API Contract (v1)

Base path: `/api/v1`

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

## Vault
- `GET /vault-entries?q=&favorite=&page=`
- `POST /vault-entries`
- `GET /vault-entries/{id}`
- `PUT /vault-entries/{id}`
- `DELETE /vault-entries/{id}`
- `PATCH /vault-entries/{id}/favorite`
- `POST /vault-entries/generate-password`
- `POST /vault-entries/strength-check`
- `POST /vault-entries/{id}/copy-token` (optional helper for secure copy flow)

## Devices
- `GET /devices`
- `POST /devices`
- `GET /devices/{id}`
- `PUT /devices/{id}`
- `DELETE /devices/{id}`
- `PATCH /devices/{id}/trust-level`
- `PATCH /devices/{id}/update-status`

## Login Monitor
- `GET /login-events?status=&range=&device_id=`
- `GET /login-events/recent`
- `GET /login-events/failed`

## Dashboard and Notifications
- `GET /dashboard/summary`
- `GET /notifications`
- `PATCH /notifications/{id}/read`
- `PATCH /notifications/read-all`

## Audit and Activity
- `GET /audit-logs`
- `GET /activity-feed`

## Import/Export
- `POST /export`
- `POST /import`

## Conventions
- Pagination: cursor or page-based, but consistent across all list endpoints
- Errors: JSON object `{ code, message, details }`
- Dates: ISO-8601 UTC
- Authorization: session cookie (Sanctum) or Bearer token
- Idempotency: support idempotency keys for critical write operations
