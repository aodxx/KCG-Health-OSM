# AI Agent Instructions — KCG-Health-OSM

## Mission
Build KCG-Health-OSM as a mobile-first community screening workflow platform connecting:

`แพทย์/เจ้าหน้าที่ รพ.สต. ↔ อสม. ↔ ครัวเรือน/ประชาชน`

The product core is **form-driven screening coordination**:
`Create Form → Define Audience → Publish → Complete → Review → Follow-up/Referral → Export-ready`

It is not a replacement for Smart อสม., HDC, HIS, or a clinical medical record system.

## Read Before Editing
Read in this order:
1. `docs/product/PRODUCT-DEFINITION-v0.2.md`
2. `PRD.md`
3. `docs/development/PHASE-0-CHECKLIST.md`
4. `docs/development/D7-DEVELOPMENT-PLAN-v0.1.md`
5. `docs/architecture/D5-LOGICAL-DATA-MODEL-v0.1.md`
6. `docs/architecture/D6-ER-RLS-DATA-DICTIONARY-v0.1.md`

Older blueprint documents are supporting discovery/design history. If they conflict with Product Definition v0.2, the product definition wins.

## Product Rules — Non-Negotiable
- Staff/clinician starts MVP campaigns by creating/publishing forms.
- Form Builder must be flexible and not hard-coded to NCD only.
- Targeting must support person, household, village/area, and rule-based cohorts.
- A citizen may complete their own assigned form.
- A volunteer may complete on behalf of a citizen only within an active household/person assignment.
- Every submission must preserve target person, actual submitter, self/proxy mode, form version, and timestamp.
- Household responsibility hierarchy is first-class: Village → Volunteer → Household → Person.
- Staff dashboard must support completion/review tracking and drill-down through that hierarchy.
- Smart อสม. integration is future work; MVP prepares structured export only.

## Safety & Data Rules
- Use synthetic/mock data until pilot gate explicitly allows real data.
- Never add real CID, HN, phone numbers, health records, or identifiable citizen data to GitHub.
- Never implement medical diagnosis.
- Exact clinical screening/risk rules are not production-authoritative unless approved by health personnel.
- Never put Supabase service-role/secret keys in frontend code.
- Authorization must be server enforced when backend is introduced; hiding UI is not authorization.
- Admin does not automatically get clinical-data access.
- Do not scrape or automate official government systems without approved integration.

## Phase Gate — HARD RULE
Current phase is **Phase 0 Recovery / Repository & Frontend Foundation** until explicitly marked PASS.

### Agent MUST NOT start Phase 1 automatically.
Phase 1 may begin only after:
1. every Phase 0 exit criterion is verified from implementation evidence
2. lint/test/build pass
3. the agent reports `PHASE 0 PASS`
4. the project owner explicitly authorizes the next phase

If any Phase 0 criterion is incomplete, report `PHASE 0 NOT READY` and continue fixing foundation only.

## Phase 0 Scope
Allowed:
- clean application scaffold
- role shells / route skeletons
- PWA foundation
- Thai design tokens/typography
- domain types for geography, household responsibility, forms, campaigns, recipients, submissions
- repository interfaces and mock implementations
- synthetic seed data
- offline queue interface/idempotency model foundation
- lint/test/build/CI
- accessibility/mobile smoke tests

Not allowed during Phase 0:
- expanding NCD business workflow
- implementing new clinical rules
- real Supabase/backend integration
- Smart อสม. integration
- external API integration
- production auth/data
- new Phase 1 business features

Existing Lovable home-visit/NCD prototype code may be salvaged only when it supports the new foundation. It must not dictate the architecture or be expanded during Phase 0.

## Data Semantics
- `Person` is not the same as authenticated `UserAccount`.
- `VolunteerAssignment` defines actual care/responsibility scope.
- `FormVersion` must be immutable after publish.
- `CampaignRecipient` materializes the resolved target population.
- `Submission` stores completion provenance.
- Clinical follow-up records coordinate actions; they are not a full EMR.

## UI/UX Rules
- Thai-first.
- Android/mobile-first.
- Form Builder should be usable without coding.
- Citizen completion should minimize friction.
- Volunteer UI should prioritize assigned households and pending forms.
- Status must use text/icon as well as color.
- Show offline/sync state clearly.
- Large readable Thai typography and touch targets.

## Engineering Workflow
For every implementation change:
1. inspect current product docs and code
2. identify current phase and allowed scope
3. implement the smallest coherent change
4. add/update tests
5. run lint
6. run tests
7. run build
8. fix failures without asking for minor code intervention
9. verify routes/readback where relevant
10. update docs if behavior/architecture changed
11. commit with concise message

Do not create junk/generated files that are not required.
Do not declare completion from plans or code presence alone; use test/build/readback evidence.

## Supabase Rules
When a later phase explicitly begins Supabase work:
- use migrations
- enable RLS on exposed tables
- use role + service-unit scope + assignment predicates
- do not trust user-editable metadata for authorization
- test positive and negative access cases
- use synthetic seeds until pilot approval

## Completion Report Format
After each phase task report:
- what changed
- files changed
- tests run/results
- build result
- remaining gaps
- risks
- exact phase status: `PASS`, `NOT READY`, or `BLOCKED`

Never advance phase automatically.
