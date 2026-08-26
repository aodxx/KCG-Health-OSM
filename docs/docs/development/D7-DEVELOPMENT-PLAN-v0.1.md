# D7 — Development Plan v0.1

สถานะ: Ready for implementation planning
วันที่: 2026-08-26

## 1. เป้าหมาย
เปลี่ยนผลลัพธ์จาก Discovery/Blueprint/PRD ให้เป็นแผนพัฒนาที่ทีมและ AI Agent สามารถเริ่มทำงานได้โดยไม่ต้องอ่านบทสนทนาย้อนหลัง

## 2. Source of Truth ตามลำดับ
1. `PRD.md`
2. `docs/blueprint/D2-SYSTEM-BLUEPRINT-v0.1.md`
3. `docs/blueprint/D3-MVP-WORKFLOW-PERMISSION-MATRIX.md`
4. `docs/blueprint/D4-UI-IA-SCREEN-MAP-v0.1.md`
5. `docs/architecture/D5-LOGICAL-DATA-MODEL-v0.1.md`
6. `docs/architecture/D5-SUPABASE-ARCHITECTURE-DRAFT-v0.1.md`
7. `docs/architecture/D6-ER-RLS-DATA-DICTIONARY-v0.1.md`
8. `docs/architecture/D6-SYNTHETIC-SEED-DATA-v0.1.md`
9. Discovery docs ใช้เป็น evidence/supporting context

หากเอกสารขัดกัน ให้ PRD และ Blueprint ที่ใหม่กว่ามีลำดับสูงกว่า และต้องบันทึก decision ใหม่ก่อนแก้ implementation

## 3. Product Boundary ที่ห้ามเปลี่ยนโดยไม่ผ่านการตัดสินใจใหม่
ระบบนี้คือระบบจัดการงานภาคสนามและประสานการดูแลระหว่าง `ครัวเรือน ↔ อสม. ↔ เจ้าหน้าที่/แพทย์`

ระบบนี้ไม่ใช่:
- Smart อสม. replacement
- HDC/HIS replacement
- ระบบเวชระเบียนเต็มรูปแบบ
- ระบบวินิจฉัยโรค
- ระบบรายงานภาครัฐคู่ขนาน

## 4. MVP Journey ที่ต้องทำให้ครบก่อนเพิ่มโมดูลอื่น
`Assign → Visit → Observation → Risk → Review → Referral → Follow-up → Close`

Use case หลัก: เยี่ยมบ้าน + NCD screening + red flag + staff triage + follow-up

## 5. Development Phases

### Phase 0 — Repository & Frontend Foundation
Deliverables:
- clean application scaffold
- mobile-first PWA shell
- Thai typography and design tokens
- role-based prototype switcher using synthetic users only
- route structure for Volunteer / Staff / Citizen
- shared status/risk components
- mock data adapter
- lint/test/build commands
- CI workflow
- `.env.example` without secrets

Acceptance:
- build passes
- no backend required
- no real citizen data
- all routes render on mobile viewport
- main README explains local/cloud development and project boundaries

### Phase 1 — Mock MVP Workflow
Implement entirely against synthetic/mock repository layer:
- volunteer Today dashboard
- household list/detail
- person summary
- start visit
- NCD form
- risk result
- referral action
- staff triage inbox
- case detail
- follow-up task

Acceptance:
- 4 clickable user journeys from D4 work end-to-end
- abnormal results never present a diagnosis
- statuses use icon/text plus color
- mobile touch targets and Thai text are readable

### Phase 2 — Offline Queue Prototype
Deliverables:
- local draft storage
- queued mutation model
- client-generated UUID/idempotency key
- sync states: pending/synced/failed
- retry simulation
- conflict simulation

Acceptance:
- retry does not duplicate observation
- drafts survive reload
- failed sync is visible to user

### Phase 3 — Supabase Dev Environment
Only start after explicit architecture review.
Deliverables:
- migrations for MVP data slice
- synthetic seed only
- Auth configuration
- RLS on exposed tables
- RLS tests for all roles/scopes
- audit events
- no service-role key in frontend

Acceptance:
- cross-assignment reads are denied
- admin cannot read clinical data automatically
- staff scope boundaries work
- all schema changes migration-backed

### Phase 4 — Frontend ↔ Supabase Integration
Replace mock repository with Supabase adapter while preserving domain interfaces.

Acceptance:
- same UI journeys continue to work
- offline queue can reconcile with backend
- error/retry states tested
- access control verified server-side, not only hidden in UI

### Phase 5 — Pilot Readiness
Deliverables:
- consent/legal-basis flow decision
- retention policy
- account onboarding plan
- device/session security
- field pilot handbook
- backup/export policy
- incident response basics
- privacy/security review

No real health data before Phase 5 gate is approved.

### Phase 6 — Pilot with Controlled Real Data
Begin only with responsible health personnel approval and minimum necessary dataset.

## 6. Future Modules after MVP
Add through templates/workflow engine rather than separate architectures:
- LTC / elderly / homebound / bedridden
- disability follow-up
- dengue household survey
- campaign screening
- appointment confirmation
- citizen request/help workflow

## 7. Engineering Principles
- domain-first, UI consumes domain interfaces
- mobile-first and offline-aware
- privacy by design
- least privilege
- append-oriented health observations
- explicit auditability
- synthetic data by default
- no secrets in Git
- migrations only for database changes
- test/build before merge/push

## 8. Definition of Done for each feature
A feature is not done until:
1. acceptance criteria are met
2. error/offline state is handled where applicable
3. authorization impact is reviewed
4. tests are added/updated
5. lint/test/build pass
6. docs are updated if behavior or architecture changed

## 9. Current Blocker
Lovable project container exists but workspace credits prevented implementation. Treat Lovable as optional prototype tooling; it must not block the main development path.

## 10. Immediate Next Action
Start Phase 0 only after repository-readiness docs are complete. Do not connect the prepared Supabase project or import real health records during Phase 0.
