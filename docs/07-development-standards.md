# Development Standards

## Clean Code Rules
- Keep controllers thin; business logic goes in services
- Keep components presentational when possible
- No duplicate validation rules; centralize schemas
- No duplicate status literals; centralize enums/constants
- Prefer composition over inheritance

## Naming and Structure
- Use feature-first folders
- Name files by responsibility (e.g., `VaultService`, `DeviceRiskScorer`)
- Keep functions focused and short

## Documentation Rules
- Update docs with every behavior change
- Add ADR for architectural decisions
- Maintain weekly status and release notes
- Keep docs concise and versioned in Git

## Testing Rules
- Backend: feature tests for endpoint behavior and authorization
- Backend: unit tests for risk scoring and algorithm services
- Frontend: integration tests for key user journeys
- Add regression tests for fixed bugs

## Performance Rules
- Add indexes before scale pain appears
- Paginate all list endpoints
- Cache expensive dashboard aggregations
- Offload heavy jobs to queues

## Definition of Done
- Code implemented with tests
- Security checks passed
- Docs updated
- No duplicated logic introduced
- API contract and data model still aligned
