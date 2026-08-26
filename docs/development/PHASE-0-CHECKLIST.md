# Phase 0 Recovery — Repository & Frontend Foundation Checklist

สถานะ: **ACTIVE — Recovery required before Phase 1**

## Goal
กู้ Phase 0 ให้เป็นรากฐานของผลิตภัณฑ์ตาม:
- `docs/product/PRODUCT-DEFINITION-v0.2.md`
- `PRD.md`
- `MASTER-ROADMAP.md`
- `docs/architecture/DATABASE-DESIGN-v0.2.md`

Product core:
`Create Form → Define Audience → Publish → Citizen/Volunteer Completion → Submit → Review → Follow-up/Referral → Export-ready`

Phase 0 สร้าง foundation เท่านั้น ยังไม่สร้าง workflow เต็มและยังไม่เชื่อม backend จริง

## 0. Recovery Audit
- [ ] ตรวจ prototype/workspace implementation จริง
- [ ] แยกส่วนเดิมเป็น KEEP / REFACTOR / PARK / REMOVE
- [ ] ห้ามขยาย home-visit/NCD business logic เดิม
- [ ] เก็บเฉพาะ scaffold/components/UX patterns ที่ตรง Product Definition v0.2
- [ ] ไม่มี broken route จาก role shells
- [ ] ไม่มี agent/workspace debug residue ที่ไม่จำเป็นต่อผลิตภัณฑ์

## 1. Repository
- [ ] อ่าน Product Definition v0.2
- [ ] อ่าน `PRD.md`
- [ ] อ่าน `MASTER-ROADMAP.md`
- [ ] อ่าน `DATABASE-DESIGN-v0.2.md`
- [ ] อ่าน `AGENTS.md`
- [ ] application scaffold สะอาด
- [ ] `.gitignore`
- [ ] `.env.example` มีเฉพาะ placeholder/comment ไม่มี secret
- [ ] package manager เดียว + authoritative lockfile
- [ ] `check` / `lint` / `test` / `build` scripts
- [ ] CI รัน install + check + lint + test + build

## 2. Mobile/PWA
- [ ] mobile-first layout
- [ ] PWA manifest
- [ ] service worker foundation
- [ ] Thai typography
- [ ] design tokens
- [ ] touch targets เหมาะกับมือถือ
- [ ] app shell / bottom navigation
- [ ] visible synthetic/demo state

## 3. Role Shells
### Staff/Clinician
- [ ] Dashboard skeleton
- [ ] Form Builder skeleton
- [ ] Campaign/Audience skeleton
- [ ] Review Inbox skeleton
- [ ] Area/Responsibility skeleton
- [ ] Profile skeleton

### Volunteer
- [ ] Home/Pending work skeleton
- [ ] Assigned households skeleton
- [ ] Assigned forms skeleton
- [ ] Sync/notifications skeleton
- [ ] Profile skeleton

### Citizen
- [ ] Home skeleton
- [ ] Assigned forms skeleton
- [ ] Submission/history skeleton
- [ ] Profile/access skeleton

- [ ] role switcher สำหรับ synthetic prototype
- [ ] core routes ทั้งหมด render ได้และไม่ 404

## 4. Shared UI Foundation
- [ ] AppShell
- [ ] BottomNavigation
- [ ] PageHeader
- [ ] FormStatusBadge
- [ ] SubmissionStatusBadge
- [ ] ReviewStatusBadge
- [ ] SyncStatusIndicator
- [ ] OfflineBanner
- [ ] HouseholdCard
- [ ] PersonSummary
- [ ] VolunteerResponsibilityCard
- [ ] FormCard
- [ ] CampaignProgressCard / CampaignCard
- [ ] empty/error/loading states

ทุก status ต้องใช้ text/icon ร่วมกับสี ไม่ใช้สีเพียงอย่างเดียว

## 5. Canonical Domain Foundation
ต้องสอดคล้อง `DATABASE-DESIGN-v0.2.md` อย่างน้อย:

### Geography / People / Responsibility
- [ ] Tambon
- [ ] ServiceUnit
- [ ] Village
- [ ] Household
- [ ] Person
- [ ] HouseholdMembership
- [ ] UserAccount foundation
- [ ] Volunteer
- [ ] VolunteerAssignment with start/end/active history

### Forms
- [ ] FormTemplate
- [ ] FormVersion
- [ ] FormSection
- [ ] FormQuestion
- [ ] QuestionOption

### Campaign / Audience
- [ ] Campaign
- [ ] AudienceDefinition
- [ ] AudienceRule
- [ ] CampaignRecipient

### Submission / Action
- [ ] Submission
- [ ] SubmissionAnswer
- [ ] SubmissionReview
- [ ] FollowUp placeholder
- [ ] Appointment placeholder
- [ ] Referral placeholder

### Sync
- [ ] SyncQueueItem
- [ ] SyncStatus
- [ ] clientGeneratedId
- [ ] idempotencyKey

## 6. Form Schema Foundation
Phase 0 สร้าง schema/types เท่านั้น ไม่สร้าง Form Builder เต็ม

- [ ] question types: `short_text`
- [ ] `long_text`
- [ ] `number`
- [ ] `checkbox`
- [ ] `radio`
- [ ] `select`
- [ ] `date`
- [ ] `time`
- [ ] `yes_no`
- [ ] `single_choice`
- [ ] `multiple_choice`
- [ ] required/optional
- [ ] option list model
- [ ] ordering
- [ ] validation config boundary
- [ ] conditional visibility config placeholder
- [ ] immutable published FormVersion concept
- [ ] no NCD-specific hard-coded architecture

## 7. Responsibility Model
- [ ] Service Unit → Village → Volunteer → Household → Person model
- [ ] active assignment/effective start/end foundation
- [ ] assignment history ไม่ใช้เพียง `household.volunteerId`
- [ ] staff/coordinator assignment permission boundary documented
- [ ] volunteer repository cannot expose unrelated households/persons

## 8. Data Layer
- [ ] repository interfaces separated from UI
- [ ] synthetic/mock implementations
- [ ] FormRepository interface
- [ ] CampaignRepository interface
- [ ] Household/Responsibility repository interface
- [ ] SubmissionRepository interface
- [ ] backend adapter boundary prepared
- [ ] active UI ไม่ import mock arrays เป็น persistence architecture โดยตรง
- [ ] NO Supabase/database connection in Phase 0

## 9. Campaign / Submission Provenance Foundation
Model ต้องรองรับ:
- [ ] immutable FormVersion reference
- [ ] CampaignRecipient materialization
- [ ] subject/target person
- [ ] actual submitter
- [ ] completion mode `SELF` / `PROXY`
- [ ] campaign recipient reference
- [ ] submitted timestamp
- [ ] client-generated UUID
- [ ] idempotency key

## 10. Offline Foundation
- [ ] local queue interface
- [ ] client-generated UUID
- [ ] idempotency key model
- [ ] states: `pending / syncing / synced / failed`
- [ ] retry interface/behavior foundation
- [ ] no timestamp-only primary idempotency strategy
- [ ] no production-sensitive persistence policy yet

## 11. Guardrails
- [ ] synthetic/mock data only
- [ ] no real identifiable citizen data
- [ ] no real health data
- [ ] no CID/HN/real phone in repo
- [ ] no secrets
- [ ] no production backend/auth
- [ ] no external production integrations
- [ ] no Smart อสม. automation
- [ ] no clinical diagnosis logic
- [ ] no production clinical thresholds embedded in core domain
- [ ] old D5/D6 v0.1 models are historical only

## 12. Tests
- [ ] domain/status tests
- [ ] form schema tests
- [ ] immutable FormVersion foundation tests
- [ ] role navigation tests
- [ ] responsibility-scope mock tests
- [ ] repository tests
- [ ] submission provenance tests
- [ ] UUID/idempotency tests
- [ ] route/mobile render smoke tests
- [ ] accessibility basics

## 13. Quality Gates
ต้องมี evidence จริง:
- [ ] fresh `pnpm install --frozen-lockfile` PASS
- [ ] `pnpm check` PASS
- [ ] `pnpm lint` PASS
- [ ] `pnpm test` PASS
- [ ] `pnpm build` PASS
- [ ] route/runtime smoke PASS
- [ ] mobile role-shell smoke PASS
- [ ] GitHub CI PASS
- [ ] GitHub readback ตรงกับ implementation HEAD
- [ ] `PROGRESS.md` ตรงกับ HEAD

## 14. Phase 0 Exit Criteria
Phase 0 PASS เมื่อ:
1. application scaffold พร้อมและ repo สะอาด
2. `.env.example` มีและไม่มี secret
3. package manager/lockfile เดียว
4. PWA foundation มี
5. Staff / Volunteer / Citizen shells เปิดได้
6. core navigation ไม่มี broken route
7. domain foundation ตรง canonical database design โดยไม่ผูก NCD
8. household/volunteer responsibility + history model มี
9. form/campaign/audience/recipient/submission contracts มี
10. repository interfaces + synthetic mock adapters มี
11. submission provenance มี
12. offline UUID/idempotency foundation มี
13. check/lint/test/build ผ่าน
14. CI ผ่านจริง
15. ไม่มี Supabase/production backend/auth/integration
16. ไม่มี real health/person data หรือ secret/junk/debug residue
17. Phase 1 สามารถสร้าง Form Builder + Audience + Campaign Publish ต่อได้โดยไม่รื้อ architecture

## HARD PHASE GATE
เมื่อครบ checklist Agent ต้องรายงานอย่างใดอย่างหนึ่งเท่านั้น:
- `PHASE 0 PASS`
- `PHASE 0 NOT READY`
- `PHASE 0 BLOCKED`

Agent ห้ามเริ่ม Phase 1 เอง แม้ Phase 0 PASS แล้ว จนกว่า project owner จะอนุญาต

## Next Phase — only after explicit approval
Phase 1:
`Form Builder → Audience Selection → Campaign Publish → Synthetic Recipient Materialization`

ไม่ใช่การขยาย home-visit/NCD workflow เดิม
