# Sentinal Security Platform

Security-first personal security app built with:
- Frontend: Next.js (TypeScript)
- Backend: Laravel API
- Database: PostgreSQL

## Goals
- Implement all requested features with clear module boundaries
- Keep codebase low-clutter and low-redundancy
- Maintain regular, lightweight documentation
- Prefer proven algorithms and standards over custom cryptography

## Repository Layout
- `ui/` - Next.js frontend
- `api/` - Laravel backend
- `docs/` - product, architecture, API, and process documentation

## Documentation Index
- `docs/01-product-requirements.md`
- `docs/02-architecture.md`
- `docs/03-data-model.md`
- `docs/04-api-contract.md`
- `docs/05-algorithms.md`
- `docs/06-security-controls.md`
- `docs/07-development-standards.md`
- `docs/08-delivery-plan.md`
- `docs/templates/adr-template.md`
- `docs/templates/weekly-status-template.md`
- `docs/templates/release-notes-template.md`

## Design Rules (Keep It Clean)
- Single responsibility per module
- No duplicate business logic across frontend and backend
- Service-layer orchestration in backend (controllers stay thin)
- Shared DTO and validation patterns
- One source of truth for enums/status values
- Feature flags for optional features

## Quick Start (Recommended)
1. Scaffold backend in `api/`:
   - `composer create-project laravel/laravel .`
2. Scaffold frontend in `ui/`:
   - `npx create-next-app@latest . --typescript --eslint --tailwind --app`
3. Configure PostgreSQL and environment files
4. Implement MVP in phases defined in `docs/08-delivery-plan.md`

## Known Algorithms and Standards Used
- Argon2id for user password hashing
- AES-256-GCM for vault secret encryption
- TOTP (RFC 6238) for in-app MFA (optional feature)
- Token bucket for API rate limiting
- Sliding window for failed login detection
- Fisher-Yates for secure shuffle in password generation
- Entropy-based scoring plus zxcvbn for password strength
- Haversine/geovelocity checks for suspicious location detection

## Documentation Cadence
- Update architecture/data model/API docs when behavior changes
- Add ADR for each major technical decision
- Publish weekly status and release notes from templates
