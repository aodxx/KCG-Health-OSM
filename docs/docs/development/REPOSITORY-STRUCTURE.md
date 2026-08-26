# Repository Structure

สถานะ: Target structure for Phase 0

```text
KCG-Health-OSM/
├─ README.md
├─ PRD.md
├─ AGENTS.md
├─ .env.example
├─ docs/
│  ├─ discovery/
│  ├─ blueprint/
│  ├─ architecture/
│  ├─ development/
│  ├─ prototype/
│  └─ decisions/
├─ src/
│  ├─ app/
│  ├─ routes/
│  ├─ components/
│  ├─ features/
│  │  ├─ volunteer/
│  │  ├─ household/
│  │  ├─ visits/
│  │  ├─ screening/
│  │  ├─ cases/
│  │  ├─ referrals/
│  │  ├─ follow-up/
│  │  ├─ staff/
│  │  └─ citizen/
│  ├─ domain/
│  │  ├─ entities/
│  │  ├─ workflows/
│  │  ├─ permissions/
│  │  └─ status/
│  ├─ data/
│  │  ├─ repositories/
│  │  ├─ mock/
│  │  └─ supabase/          # add only when Phase 3 begins
│  ├─ offline/
│  ├─ lib/
│  └─ styles/
├─ tests/
│  ├─ unit/
│  ├─ integration/
│  └─ e2e/
├─ public/
└─ supabase/                # create only when Phase 3 begins
   ├─ migrations/
   ├─ seed.sql
   └─ tests/
```

## Structure Rules

### `docs/`
Contains architecture, discovery, decisions and project-management documentation only. Never place citizen exports or source health records here.

### `src/domain/`
Framework-independent concepts and rules. UI must not redefine task/risk/case semantics independently.

### `src/data/repositories/`
Interfaces between UI/domain and data source. Phase 1 uses mock adapters. Supabase adapter is introduced later without rewriting the UI workflow.

### `src/offline/`
Local draft queue, idempotency, retry/conflict handling and sync state.

### `src/features/`
Feature-oriented UI and application logic. Keep shared domain types outside feature folders.

### `tests/`
Must contain negative authorization/offline cases when backend work begins, not only happy-path UI tests.

### `supabase/`
Do not create or populate this directory until Phase 3 is approved. When introduced, every schema change must be migration-backed.

## Files forbidden from Git
- `.env` containing secrets
- service-role keys or private keys
- real health datasets
- citizen exports
- screenshots containing real patient information
- local database dumps containing personal data
- temporary build/cache folders

## Naming
- Markdown docs: uppercase descriptive names for project-level documents
- TypeScript: project-standard casing from selected framework
- Domain names use English identifiers in code; Thai copy belongs in UI/i18n resources

## Decision Records
Architecture changes that materially affect scope, security, data model or workflow should be recorded under `docs/decisions/` before implementation diverges from the approved blueprint.
