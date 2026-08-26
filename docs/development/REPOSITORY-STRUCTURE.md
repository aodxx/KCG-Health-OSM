# Repository Structure

สถานะ: Active target structure for Product Definition v0.2
วันที่เริ่มใช้: 2026-08-27

เอกสารนี้แทนโครงสร้างเดิมที่อิง home-visit/NCD workflow และต้องสอดคล้องกับ `MASTER-ROADMAP.md`

## Current / Target Shape

```text
KCG-Health-OSM/
├─ README.md
├─ PRD.md
├─ MASTER-ROADMAP.md
├─ AGENTS.md
├─ PROGRESS.md                 # active implementation branch status
├─ .env.example                # placeholders/comments only, no secrets
├─ package.json
├─ pnpm-lock.yaml
├─ vite.config.*               # must support GitHub Pages base path
├─ .github/
│  └─ workflows/
│     ├─ ci.yml
│     └─ deploy-pages.yml      # build + deploy GitHub Pages
├─ docs/
│  ├─ product/
│  ├─ discovery/
│  ├─ blueprint/
│  ├─ architecture/
│  ├─ development/
│  ├─ prototype/
│  └─ decisions/
├─ client/
│  ├─ public/
│  │  ├─ manifest.webmanifest
│  │  └─ sw.js
│  └─ src/
│     ├─ app/
│     ├─ routes/
│     │  ├─ staff/
│     │  ├─ volunteer/
│     │  ├─ citizen/
│     │  └─ shared/
│     ├─ components/
│     │  ├─ ui/
│     │  ├─ forms/
│     │  ├─ household/
│     │  ├─ campaign/
│     │  ├─ submission/
│     │  ├─ dashboard/
│     │  └─ status/
│     ├─ domain/
│     │  ├─ geography/
│     │  ├─ people/
│     │  ├─ households/
│     │  ├─ volunteers/
│     │  ├─ forms/
│     │  ├─ campaigns/
│     │  ├─ submissions/
│     │  ├─ followups/
│     │  └─ sync/
│     ├─ repositories/
│     │  ├─ interfaces/
│     │  └─ mock/
│     ├─ services/
│     │  ├─ audience/
│     │  ├─ forms/
│     │  ├─ submissions/
│     │  └─ sync/
│     ├─ mock/
│     ├─ hooks/
│     ├─ lib/
│     ├─ styles/
│     └─ utils/
├─ server/                      # backend runtime boundary only when later phase requires it
├─ shared/
└─ tests/
   ├─ unit/
   ├─ integration/
   └─ smoke/
```

Actual implementation may keep a flatter directory where the framework/tooling requires it, but architectural separation and deployment rules below are mandatory.

## Frontend Hosting Boundary

Frontend hosting is fixed to **GitHub Pages**.

Repository/public target:
`https://aodxx.github.io/KCG-Health-OSM/`

Required implementation consequences:
- Vite/build base path must work under `/KCG-Health-OSM/`
- public assets must use Pages-safe paths
- manifest start_url/scope and service worker registration/scope must work under repository path
- router/deep-link strategy must not depend on a server rewrite that GitHub Pages does not provide
- deployment workflow must use GitHub Pages Actions or an equivalent GitHub-native Pages publication path
- built frontend must remain static-host compatible

Backend/Auth/database services introduced later must not be hosted inside GitHub Pages. They are external secure services accessed from the static frontend through HTTPS APIs/SDKs.

## Mandatory Separation

### UI
Rendering, navigation, input, accessibility and interaction only. UI must not own persistence rules or hard-code medical/business workflow.

### Domain
Framework-independent concepts and invariants: forms, versions, campaigns, recipients, households, responsibility assignments, submissions, provenance and sync states.

### Repository Interfaces
Boundary between application/domain and data source. Active UI must not import synthetic arrays directly as its persistence architecture.

### Mock Adapters
Synthetic-only implementations used before backend phase. Must be replaceable without rewriting core UI/domain behavior.

### Services / Use Cases
Audience resolution, campaign materialization, form version operations, submission operations and sync orchestration.

## Product-oriented Domains

Active architecture should center on:
- geography/service units
- people and households
- volunteer responsibility assignments
- forms and immutable form versions
- campaigns and audience rules
- campaign recipients
- submissions and provenance
- review/follow-up/referral placeholders according to current phase
- offline/sync foundation

Do not center the repository around old `visits`, `NCD`, `risk`, or `cases` modules. Those may exist only as historical/parked prototype material until a later approved phase requires a generic equivalent.

## Backend Boundary

No production backend directory, Supabase migrations, production auth or real-data adapter should be introduced before the backend phase defined by `MASTER-ROADMAP.md` (currently Phase 6).

When introduced:
- schema changes are migration-backed
- exposed data is protected by server-enforced authorization/RLS or equivalent
- service secrets never enter frontend code
- positive and negative scope tests are required
- frontend continues to deploy via GitHub Pages unless owner approves a hosting change

## Offline Boundary

Offline architecture must use:
- client-generated UUID
- idempotency key
- pending / syncing / synced / failed states
- explicit retry/conflict behavior

Do not use timestamp-only IDs as the primary idempotency strategy.

## Documentation Rules

- `PRODUCT-DEFINITION-v0.2.md` defines product direction
- `PRD.md` defines requirements
- `MASTER-ROADMAP.md` defines phase sequence/gates
- `AGENTS.md` defines AI execution rules
- `PROGRESS.md` records current implementation state
- `D7-DEVELOPMENT-PLAN-v0.2.md` is the active implementation plan
- `DATABASE-DESIGN-v0.2.md` is the canonical data design
- GitHub Pages is the fixed frontend hosting decision
- v0.1/older blueprint docs that conflict are historical references

## Files Forbidden from Git

- real `.env` secrets
- service-role/private keys
- real health datasets
- CID/HN/phone/patient identifiers
- citizen exports
- screenshots containing real patient data
- local database dumps with personal data
- node_modules / dist / caches
- agent/workspace debug collectors or vendor-specific runtime residue unless explicitly justified as product dependency

## Repository Hygiene

Before phase PASS:
1. inspect full tree
2. remove unnecessary workspace/debug residue
3. verify one package manager and lockfile
4. verify `.env.example` has no secrets
5. run check/lint/test/build
6. verify routes/runtime under `/KCG-Health-OSM/`
7. verify CI
8. verify GitHub Pages deployment/public readback when frontend changed
9. update `PROGRESS.md`
