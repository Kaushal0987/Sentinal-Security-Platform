# Data Model (PostgreSQL)

## Core Tables

### users
- id (uuid or bigint)
- email (unique)
- password_hash
- name
- created_at, updated_at

### vault_entries
- id
- user_id (fk users.id)
- site_name
- account_username
- encrypted_password
- encrypted_notes
- is_favorite (bool)
- password_strength_score (int)
- two_fa_enabled (bool)
- encrypted_recovery_codes
- created_at, updated_at

### devices
- id
- user_id (fk users.id)
- name
- type
- os_name
- notes
- update_status (up_to_date|outdated|unknown)
- trust_level (trusted|risky|unknown)
- encryption_enabled (bool)
- antivirus_enabled (bool)
- security_score (int)
- last_seen_at
- created_at, updated_at

### login_events
- id
- user_id (fk users.id)
- occurred_at
- ip_address
- user_agent
- device_id (nullable fk devices.id)
- status (success|failed)
- location_country
- location_city
- risk_level (low|medium|high)

### notifications
- id
- user_id (fk users.id)
- category
- title
- body
- severity (info|warning|critical)
- is_read (bool)
- related_entity_type
- related_entity_id
- created_at

### audit_logs
- id
- user_id (fk users.id)
- action
- entity_type
- entity_id
- old_values (jsonb)
- new_values (jsonb)
- ip_address
- created_at

## Indexing Plan
- `vault_entries (user_id)`
- `vault_entries (user_id, is_favorite)`
- `devices (user_id, trust_level)`
- `devices (user_id, update_status)`
- `login_events (user_id, occurred_at desc)`
- `login_events (status, occurred_at desc)`
- `notifications (user_id, is_read, created_at desc)`
- `audit_logs (user_id, created_at desc)`

## Search Strategy
- Start: `ILIKE` with normalized text fields and proper indexes
- Upgrade: PostgreSQL full-text search using `tsvector` for larger datasets
