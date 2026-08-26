# AI Agent Instructions — KCG-Health-OSM

## Mission
Build KCG-Health-OSM as a mobile-first community screening workflow platform connecting:

`แพทย์/เจ้าหน้าที่ รพ.สต. ↔ อสม. ↔ ครัวเรือน/ประชาชน`

Product core:
`Create Form → Define Audience → Publish → Complete → Review → Follow-up/Referral → Export-ready`

It is not a replacement for Smart อสม., HDC, HIS, or a full clinical record system.

## Read Before Editing
Read in this order:
1. `docs/product/PRODUCT-DEFINITION-v0.2.md`
2. `PRD.md`
3. `MASTER-ROADMAP.md`
4. `AGENTS.md`
5. `docs/development/AUTONOMOUS-AGENT-RULES.md`
6. `docs/development/PHASE-0-CHECKLIST.md`
7. `docs/development/D7-DEVELOPMENT-PLAN-v0.2.md`
8. `docs/development/REPOSITORY-STRUCTURE.md`
9. architecture/data-model documents as supporting references

`D7-DEVELOPMENT-PLAN-v0.1.md` and older blueprint/workflow documents are historical references only when they conflict with Product Definition v0.2, PRD, or Master Roadmap.

## Product Rules — Non-Negotiable
- Staff/clinician starts MVP campaigns by creating/publishing forms.
- Form Builder must be flexible and not NCD-only.
- Targeting supports person, household, village/area, and rule-based cohorts.
- Citizen may complete their own assigned form.
- Volunteer may complete on behalf of a citizen only within active assignment scope.
- Every submission preserves subject person, actual submitter, SELF/PROXY mode, campaign recipient, form version, and timestamp.
- Hierarchy is first-class: service area → village → volunteer → household → person.
- Staff dashboard supports completion/review tracking and drill-down through that hierarchy.
- Smart อสม. integration is future work; structured export comes first.

## Safety & Data Rules
- Use synthetic/mock data until Pilot/Security gate explicitly allows real data.
- Never commit real CID, HN, phone numbers, identifiable citizen data, health records, secrets, or patient documents.
- Never implement medical diagnosis.
- Exact clinical screening/risk rules are not production-authoritative unless approved by health personnel.
- Never expose service-role/secret keys in frontend code.
- Authorization must be server-enforced when backend is introduced.
- Do not scrape or automate government systems without approved integration.

## Phase Gate — HARD RULE
Current phase is **Phase 0 Recovery / Repository & Frontend Foundation** until verified PASS.

Agent MUST NOT start Phase 1 automatically.

Before advancing any phase:
1. all current-phase exit criteria are verified from implementation evidence
2. install/check/lint/test/build/runtime/CI gates pass as applicable
3. `PROGRESS.md` matches GitHub HEAD
4. agent reports `PHASE N PASS`
5. project owner explicitly authorizes the next phase

If incomplete, report `PHASE N NOT READY` and continue fixing only the current phase.

## Current Phase 0 Scope
Allowed:
- clean application scaffold
- Staff / Volunteer / Citizen role shells and route skeletons
- PWA foundation
- Thai mobile-first design system
- domain types for geography, households, assignments, forms, campaigns, recipients, submissions
- repository interfaces and synthetic mock implementations
- offline queue/UUID/idempotency foundation
- tests, lint, build, CI
- `.env.example` without secrets
- repository hygiene

Not allowed:
- Phase 1 Form Builder business functionality
- production backend/Supabase
- production auth/data
- Smart อสม. integration
- external production APIs
- hard-coded clinical workflow/rules
- full NCD/home-visit workflow expansion

## Engineering Workflow
For every implementation task:
1. sync current GitHub branch
2. inspect docs/code/diff
3. confirm current phase and scope
4. implement coherent change
5. add/update tests
6. run install/check/lint/test/build as applicable
7. verify routes/runtime/mobile/readback
8. inspect security/data exposure
9. fix failures autonomously and rerun
10. update `PROGRESS.md`
11. commit and push
12. verify GitHub readback and CI

The project owner is not routine QA. Do not stop to ask the owner to test behavior the agent can verify itself.

GitHub is the delivery handoff point. Work that exists only in an ephemeral/local/agent workspace is **not delivered**.

If GitHub sync is impossible, report exactly:
`NOT SYNCED TO GITHUB`
and explain the technical blocker.

## Repository Hygiene
- do not commit generated junk/cache/build output
- remove agent/workspace-specific debug residue unless intentionally required by production architecture
- one package manager / authoritative lockfile
- no secret-bearing `.env`
- `.env.example` contains placeholders/comments only
- old prototype code may be PARKED but must not define active architecture

## Data Semantics
- `Person` != authenticated `UserAccount`
- `VolunteerAssignment` defines responsibility scope and history
- `FormVersion` immutable after publish
- `CampaignRecipient` materializes resolved audience
- `Submission` stores completion provenance
- follow-up/referral coordinates care; it is not full EMR

## UI/UX Rules
- Thai-first
- Android/mobile-first
- large readable Thai typography
- touch targets around 44px or larger where practical
- status uses text/icon plus color
- offline/sync state visible
- citizen flow minimizes friction
- volunteer UI prioritizes assigned households and pending work

## Completion Report
After each task/phase report:
- branch
- commit SHA
- files changed
- tests and results
- build result
- CI/readback result
- remaining gaps
- risks
- exact phase status: `PASS`, `NOT READY`, or `BLOCKED`

Never advance phase automatically.
