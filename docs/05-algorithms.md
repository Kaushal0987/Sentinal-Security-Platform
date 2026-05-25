# Known Algorithms and Why They Are Used

## 1) User Password Hashing
- Algorithm: Argon2id
- Why: memory-hard and industry standard for password hashing
- Use for: user account password storage only

## 2) Vault Secret Encryption
- Algorithm: AES-256-GCM (authenticated encryption)
- Why: confidentiality + integrity in one primitive
- Use for: vault passwords, notes, recovery codes
- Rule: never invent custom crypto

## 3) Password Generation
- Algorithm set:
  - Cryptographically secure random bytes (CSPRNG)
  - Character pool selection constraints
  - Fisher-Yates shuffle for unbiased arrangement
- Why: avoids predictable or biased output

## 4) Password Strength
- Algorithm set:
  - zxcvbn scoring for pattern-based weakness detection
  - Entropy estimate for complexity baseline
- Why: practical, user-facing strength signal

## 5) Search Vault Entries
- Initial algorithm: indexed substring search (`ILIKE` + btree/trigram)
- Scaled algorithm: PostgreSQL full-text search (`tsvector`, `tsquery`)
- Why: starts simple, scales predictably

## 6) Failed Login Detection
- Algorithm: Sliding time window counters
- Why: straightforward and reliable brute-force detection

## 7) API Rate Limiting
- Algorithm: Token bucket
- Why: smooth handling of bursts while preventing abuse

## 8) Suspicious Login Location
- Algorithm set:
  - Geo-IP lookup
  - Haversine distance between successive logins
  - Geovelocity threshold (impossible travel)
- Why: known approach for anomaly signals

## 9) Device Security Score
- Algorithm: weighted scoring model
- Example weights: update status 35%, encryption 30%, AV 20%, trust level 15%
- Why: transparent and tunable scoring

## 10) Audit Integrity (optional hardening)
- Algorithm: hash-chain of audit entries using SHA-256
- Why: tamper-evidence for critical logs
