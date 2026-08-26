# AI Agent Instructions — KCG-Health-OSM

## Mission
Build and maintain KCG-Health-OSM as a mobile-first field-work coordination platform connecting Household/Citizen ↔ Village Health Volunteer (อสม.) ↔ Public Health Staff/Doctor.

It is not a replacement for Smart อสม., HDC, HIS, or a clinical medical record system.

## Read Before Editing
Read in this order:
1. `PRD.md`
2. `docs/development/D7-DEVELOPMENT-PLAN-v0.1.md`
3. `docs/blueprint/D2-SYSTEM-BLUEPRINT-v0.1.md`
4. `docs/blueprint/D3-MVP-WORKFLOW-PERMISSION-MATRIX.md`
5. `docs/blueprint/D4-UI-IA-SCREEN-MAP-v0.1.md`
6. `docs/architecture/D5-LOGICAL-DATA-MODEL-v0.1.md`
7. `docs/architecture/D6-ER-RLS-DATA-DICTIONARY-v0.1.md`

## Non-Negotiable Rules
- Use synthetic/mock data until the pilot gate explicitly allows real data.
- Never add real CID, HN, phone numbers, health records, or identifiable citizen data to GitHub.
- Never implement medical diagnosis or claim that an abnormal screening value is a diagnosis.
- Never put Supabase service-role/secret keys in frontend code.
- Authorization must be server enforced when backend is introduced; hiding UI is not authorization.
- A volunteer may only access active assigned households/persons.
- Admin does not automatically get clinical-data access.
- Preserve offline-first design and idempotent sync behavior.
- Do not scrape or automate official government systems without approved integration.
- Do not expand scope to payment/allowance reporting, full EMR/HIS, or Smart อสม. replacement.

## MVP Workflow
`Assign → Visit → Observation → Risk → Review → Referral → Follow-up → Close`

Primary MVP domain is home visit + NCD screening + red flag + triage + follow-up.

## Data Semantics
- `Person` is not the same as an authenticated `UserAccount`.
- `Observation` is raw/reported field data, not diagnosis.
- `RiskAssessment` is derived and versioned separately from observations.
- `Case` is a coordination container, not a full medical record.
- Prefer immutable/append events for field observations and audit events.

## UI/UX Rules
- Thai language first.
- Android/mobile first.
- Task-first home screen.
- Risk-first prioritization.
- Large readable Thai typography and touch targets.
- Status must use text/icon as well as color.
- Show offline/sync state clearly.
- Minimize typing in field workflows.

## Engineering Workflow
For every implementation change:
1. inspect the relevant docs and existing code
2. implement the smallest coherent change
3. add/update tests
4. run lint
5. run tests
6. run build
7. fix failures without asking the user for minor code fixes
8. update docs if architecture/behavior changed
9. commit with a concise message

Do not create junk/generated files that are not needed by the project.

## Supabase Rules
When Supabase work begins:
- verify current Supabase docs/changelog first
- use migrations for schema changes
- enable RLS on exposed tables
- use role + scope + assignment predicates
- do not trust user-editable user metadata for authorization
- test positive and negative RLS cases
- use synthetic seeds only until pilot approval

## Phase Gate
Current target is Phase 0 Repository & Frontend Foundation unless a newer tracked project document says otherwise.
