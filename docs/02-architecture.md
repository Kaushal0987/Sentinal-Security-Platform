# Architecture

## System Overview
- `ui` (Next.js): presentation, local state, client-side validation, API integration
- `api` (Laravel): auth, business logic, policy checks, encryption, audit logs, notifications
- `postgresql`: persistent storage
- `redis` (recommended): cache, queues, rate-limits

## Backend Layering (Laravel)
- Controllers: request mapping only
- Form Requests: validation
- Services: business logic orchestration
- Repositories: data access abstraction where complexity justifies it
- Policies: authorization
- Events/Listeners: notifications, audit side effects

## Frontend Layering (Next.js)
- App routes and feature modules
- API client layer (single source of endpoint contracts)
- Feature hooks for data fetching and mutations
- Dumb UI components separated from feature logic

## Proposed Feature Modules
Backend (`api/app/Modules`):
- Auth
- Vault
- Devices
- LoginMonitor
- Dashboard
- Notifications
- Audit

Frontend (`ui/src/features`):
- auth
- vault
- devices
- login-monitor
- dashboard
- notifications
- settings

## Data Flow
1. User action from UI
2. API call with authenticated session/token
3. Validation + authorization
4. Service layer operation
5. Encryption/decryption as needed
6. Persistence + audit entry
7. Notification/event dispatch
8. Response to UI

## Anti-Clutter Rules
- No business logic in React components
- No SQL in controllers
- No duplicated enum literals; centralize in constants
- Keep cross-module dependencies one-directional
- Use explicit interfaces for shared contracts
