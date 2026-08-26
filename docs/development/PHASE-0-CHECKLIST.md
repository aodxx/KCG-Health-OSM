# Phase 0 Recovery — Repository & Frontend Foundation Checklist

สถานะ: Recovery required before Phase 1

## Goal
กู้ Phase 0 ให้กลับมาเป็นรากฐานของผลิตภัณฑ์ที่ตกลงใหม่ตาม `docs/product/PRODUCT-DEFINITION-v0.2.md`

Phase 0 ต้องเตรียม foundation สำหรับระบบ:
`Create Form → Define Audience → Publish → Citizen/Volunteer Completion → Review → Follow-up/Referral → Export-ready`

Phase 0 **ยังไม่สร้าง workflow เต็ม** และยังไม่เชื่อม backend จริง

## 0. Recovery Audit
- [ ] ตรวจ Lovable prototype implementation จริง
- [ ] แยกแต่ละส่วนเป็น KEEP / REFACTOR / PARK-FOR-PHASE-1 / REMOVE
- [ ] ห้ามขยาย home-visit/NCD business logic เดิม
- [ ] เก็บเฉพาะ scaffold/components/UX patterns ที่สอดคล้อง Product Definition v0.2
- [ ] ไม่มี broken route จาก role shell

## 1. Repository
- [ ] อ่าน `docs/product/PRODUCT-DEFINITION-v0.2.md`
- [ ] อ่าน `PRD.md`
- [ ] อ่าน `AGENTS.md`
- [ ] ยืนยัน frontend stack และบันทึก decision
- [ ] application scaffold สะอาด
- [ ] `.gitignore`
- [ ] `.env.example` ไม่มีค่าจริง
- [ ] package manager เดียว + lockfile
- [ ] lint/test/build scripts
- [ ] CI: lint + test + build

## 2. Mobile/PWA
- [ ] mobile-first layout
- [ ] PWA manifest
- [ ] service worker foundation
- [ ] Thai typography
- [ ] design tokens
- [ ] touch targets เหมาะกับมือถือ
- [ ] app shell / bottom navigation
- [ ] visible demo/synthetic-data state

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
- [ ] Submission/history placeholder
- [ ] Profile/access placeholder

- [ ] role switcher สำหรับ synthetic prototype
- [ ] ไม่มี route ชี้ไป 404

## 4. Shared UI Foundation
- [ ] FormStatusBadge
- [ ] SubmissionStatusBadge
- [ ] ReviewStatusBadge
- [ ] SyncStatusIndicator
- [ ] OfflineBanner
- [ ] HouseholdCard
- [ ] PersonSummary
- [ ] VolunteerResponsibilityCard
- [ ] CampaignProgressCard
- [ ] empty/error/loading states

ทุก status ต้องใช้ text/icon ไม่พึ่งสีอย่างเดียว

## 5. Domain Foundation
ต้องมี type/model foundation อย่างน้อย:
- [ ] ServiceUnit
- [ ] Village
- [ ] Household
- [ ] Person
- [ ] HouseholdMembership
- [ ] Volunteer
- [ ] VolunteerAssignment
- [ ] FormTemplate
- [ ] FormVersion
- [ ] FormField
- [ ] Campaign
- [ ] AudienceRule
- [ ] CampaignRecipient
- [ ] Submission
- [ ] SubmissionAnswer
- [ ] SubmissionReview
- [ ] FollowUp / Referral / Appointment placeholder interfaces
- [ ] standard status constants

## 6. Form Schema Foundation
Phase 0 สร้าง schema/types เท่านั้น ไม่ต้องสร้าง Form Builder เต็ม

- [ ] field types: text / textarea / number / checkbox / radio / select / date / time / yes-no
- [ ] required/optional
- [ ] option list model
- [ ] ordering
- [ ] immutable FormVersion concept
- [ ] validation schema boundary
- [ ] no NCD-specific hard-coded architecture

## 7. Responsibility Model
- [ ] Village → Volunteer → Household → Person relationship model
- [ ] active assignment / effective dates foundation
- [ ] staff/coordinator assignment permission boundary documented
- [ ] volunteer cannot access unrelated household in repository interface design

## 8. Data Layer
- [ ] repository interfaces separated from UI
- [ ] synthetic/mock implementations
- [ ] FormRepository interface
- [ ] CampaignRepository interface
- [ ] Household/Responsibility repository interface
- [ ] SubmissionRepository interface
- [ ] backend adapter boundary prepared
- [ ] NO Supabase import/connection in Phase 0

## 9. Submission Provenance Foundation
Model must support:
- [ ] target person
- [ ] actual submitter
- [ ] completion mode: self / proxy-by-volunteer
- [ ] form version
- [ ] timestamp
- [ ] campaign recipient

## 10. Offline Foundation
- [ ] local queue interface
- [ ] client-generated UUID
- [ ] idempotency key model
- [ ] pending/synced/failed states
- [ ] no production-sensitive persistence policy yet

## 11. Guardrails
- [ ] synthetic/mock data only
- [ ] no real identifiable citizen data
- [ ] no real health data
- [ ] no secrets
- [ ] no production backend
- [ ] no external integrations
- [ ] no Smart อสม. automation
- [ ] no clinical diagnosis logic
- [ ] existing NCD thresholds are demo/reference only and not product authority

## 12. Tests
- [ ] domain type/status tests
- [ ] form schema tests
- [ ] role navigation tests
- [ ] responsibility-scope mock tests
- [ ] mock repository tests
- [ ] mobile render smoke tests
- [ ] accessibility basics

## 13. Phase 0 Exit Criteria
Phase 0 จะ PASS เมื่อทั้งหมดนี้มีหลักฐานจริง:
1. fresh install succeeds
2. lint passes
3. tests pass
4. production build passes
5. role shells 3 ฝั่งเปิดได้บน mobile viewport
6. no broken navigation route
7. form-driven domain foundation exists without hard-coded NCD dependency
8. household responsibility model exists
9. repository interfaces + mock adapters exist
10. synthetic data only
11. no backend/external integration
12. no secret/junk files
13. Phase 1 สามารถเริ่มสร้าง Form Builder + campaign workflow ได้โดยไม่รื้อ foundation

## HARD PHASE GATE
เมื่อครบ checklist Agent ต้องรายงานอย่างใดอย่างหนึ่งเท่านั้น:
- `PHASE 0 PASS`
- `PHASE 0 NOT READY`
- `PHASE 0 BLOCKED`

**Agent ห้ามเริ่ม Phase 1 เอง แม้ Phase 0 PASS แล้ว จนกว่า project owner จะอนุญาต**

## Next Phase — only after explicit approval
Phase 1 should begin with:
`Form Builder → Audience Selection → Publish → Synthetic Recipient Assignment`

ไม่ใช่การขยาย home-visit/NCD workflow เดิม
