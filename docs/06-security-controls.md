# Security Controls

## Authentication and Sessions
- Use Argon2id for user credentials
- Enforce strong password policy for account creation
- Protect auth endpoints with rate limiting and lockouts
- Use secure, HttpOnly, SameSite cookies for session auth

## Data Protection
- Encrypt vault secrets with AES-256-GCM
- Keep encryption keys in environment/secret manager
- Support key rotation with versioned key metadata
- Never log secrets or decrypted vault values

## Authorization
- Enforce per-user data access via policies
- Deny-by-default for all resource access
- Verify ownership checks in service layer and tests

## Monitoring and Detection
- Record all login attempts with IP, device, and outcome
- Trigger notifications on suspicious patterns
- Keep audit logs for all create/update/delete actions

## Platform Hardening
- TLS everywhere
- Security headers (CSP, HSTS, X-Content-Type-Options, etc.)
- Input validation in Form Requests and UI
- Centralized error handling without sensitive detail leaks

## Backup and Recovery
- Encrypted database backups
- Periodic restore drills in non-production environment
- Versioned export files with integrity checks
