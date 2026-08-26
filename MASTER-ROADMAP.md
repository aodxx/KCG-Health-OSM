# KCG Health OSM — Master Roadmap

สถานะ: Project-wide delivery roadmap
วันที่เริ่มใช้: 2026-08-27

เอกสารนี้กำหนดลำดับงานตั้งแต่ Foundation จนถึง Production สำหรับโครงการ KCG Health OSM เพื่อให้ AI Agent ทุกตัวทำงานตามแผนเดียวกัน ไม่ข้าม Phase และไม่ตีความ scope ใหม่เอง

## 0. ลำดับอำนาจของเอกสาร

เมื่อเอกสารขัดกัน ให้ใช้ลำดับนี้:

1. `docs/product/PRODUCT-DEFINITION-v0.2.md`
2. `PRD.md`
3. `MASTER-ROADMAP.md`
4. `AGENTS.md`
5. `docs/development/PHASE-0-CHECKLIST.md`
6. เอกสาร architecture / blueprint / discovery อื่น

เอกสารเก่าที่ขัดกับ Product Definition v0.2 ให้ถือเป็น historical reference เท่านั้น

---

# ภาพรวมทั้งโครงการ

ลำดับหลัก:

`Phase 0 Foundation → Phase 1 Form Builder & Campaign → Phase 2 Submission → Phase 3 Household & Responsibility → Phase 4 Review & Dashboard → Phase 5 Follow-up & Referral → Phase 6 Backend & Auth → Phase 7 Offline Sync → Phase 8 Export Readiness → Phase 9 Pilot Readiness → Phase 10 Production`

กฎสำคัญ:

- ห้ามเริ่ม Phase ถัดไปจน Phase ปัจจุบันผ่าน Exit Criteria
- AI ต้องตรวจ lint/test/build/runtime/CI เอง
- ห้ามโยน routine QA ให้ผู้ใช้
- ใช้ synthetic/mock data จนกว่าจะถึง phase ที่อนุญาตข้อมูลจริง
- ห้าม hard-code clinical diagnosis/risk logic โดยไม่มีบุคลากรสุขภาพอนุมัติ
- ห้ามเชื่อม Smart อสม. หรือระบบรัฐโดยไม่ได้รับอนุญาต
- ทุก Phase ต้องอัปเดต `PROGRESS.md`

---

# Phase 0 — Repository & Frontend Foundation

## เป้าหมาย
ทำฐานระบบให้พร้อมพัฒนา Product Core โดยไม่ต้องรื้อ architecture ภายหลัง

## งานหลัก

- Application scaffold
- React/Vite/TypeScript foundation
- Thai-first mobile-first app shell
- Staff / Volunteer / Citizen route shells
- Shared UI foundation
- Domain contracts
- Form schema foundation
- Campaign / audience foundation
- Household / person / volunteer responsibility foundation
- Repository interfaces
- Synthetic mock adapters
- Submission provenance foundation
- Offline queue / UUID / idempotency foundation
- PWA foundation
- Test setup
- GitHub Actions CI
- `.env.example`
- `PROGRESS.md`

## สิ่งที่ยังห้ามทำ

- production database
- Supabase production
- production authentication
- real citizen/health data
- Smart อสม. integration
- clinical diagnosis
- full NCD workflow
- Phase 1 Form Builder functionality

## Test Gate

- install PASS
- type/check PASS
- lint PASS
- unit tests PASS
- route smoke PASS
- build PASS
- CI PASS

## Exit Criteria

- 3 role shells เปิดได้จริง
- no broken core routes
- form/campaign/submission/household domain foundation มีครบ
- repository abstraction มี
- mock data เป็น synthetic เท่านั้น
- PWA foundation มี
- CI มีและผ่าน
- ไม่มี secret/junk/debug residue ที่ไม่จำเป็น
- `PROGRESS.md` ตรงกับ HEAD

## ส่งมอบ

`PHASE 0 PASS`

แล้วหยุดรออนุมัติ Phase 1

---

# Phase 1 — Form Builder + Audience Selection + Campaign Publish

## เป้าหมาย
ให้แพทย์/เจ้าหน้าที่สร้างแบบคัดกรองเองได้โดยไม่เขียน code และส่ง campaign ไปยังกลุ่มเป้าหมายจำลองได้

## งานหลัก

### Form Builder
- สร้าง form ใหม่
- ตั้งชื่อ/คำอธิบาย
- เพิ่ม/ลบ/reorder fields
- required/optional
- field types:
  - short text
  - long text
  - number
  - checkbox
  - radio
  - select
  - date
  - time
  - yes/no
  - single choice
  - multiple choice
- preview
- draft / publish
- immutable FormVersion หลัง publish
- สร้าง version ใหม่เมื่อแก้ form ที่ publish แล้ว

### Audience Selection
- เลือกรายบุคคล
- รายครัวเรือน
- รายหมู่บ้าน
- ตาม rule/segment จาก synthetic master data
- preview รายชื่อ recipient ก่อน publish
- materialize เป็น `CampaignRecipient`

### Campaign
- create draft
- attach FormVersion
- attach audience definition
- preview recipient count
- publish
- campaign status

## ไฟล์/โมดูลหลัก

- form builder UI
- form schema validation
- form repository use cases
- campaign repository use cases
- audience resolver service
- campaign recipient generator
- tests

## ห้ามทำ

- real backend
- clinical decision rules
- citizen production access
- real citizen data

## Test Gate

- form builder interaction tests
- form version immutability tests
- audience resolution tests
- recipient materialization tests
- campaign publish tests
- role permission tests
- lint/test/build/CI PASS

## Exit Criteria

เจ้าหน้าที่สามารถ:
1. สร้าง form
2. preview
3. publish version
4. เลือก audience
5. เห็น recipient list
6. publish campaign

โดยใช้ synthetic/mock data ทั้งหมด

## ส่งมอบ

`PHASE 1 PASS`

---

# Phase 2 — Citizen & Volunteer Submission Flow

## เป้าหมาย
พิสูจน์เส้นทางการกรอกแบบฟอร์มทั้ง 2 แบบ: ประชาชนกรอกเอง และ อสม.กรอกแทน

## งานหลัก

### Citizen Self Completion
- assigned forms list
- open campaign form
- validate required fields
- save draft
- submit
- submission status

### Volunteer Proxy Completion
- อสม.เห็นเฉพาะครัวเรือนที่ได้รับมอบหมาย
- เลือกบุคคลในครัวเรือน
- กรอก form แทน
- แสดงชัดว่าเป็น proxy mode

### Submission Provenance
ต้องบันทึกอย่างน้อย:
- subjectPersonId
- submittedByUserId
- submissionMode: SELF / PROXY
- campaignRecipientId
- formVersionId
- submittedAt
- clientGeneratedId

### Status
- assigned
- in_progress
- submitted

## Test Gate

- self submission tests
- proxy submission authorization tests
- provenance tests
- validation tests
- duplicate/idempotency tests
- lint/test/build/CI PASS

## Exit Criteria

- citizen sample กรอกเองได้
- volunteer sample กรอกแทนได้
- provenance ถูกต้อง
- volunteer ไม่เห็น household นอก assignment

## ส่งมอบ

`PHASE 2 PASS`

---

# Phase 3 — Household, Population & Responsibility Management

## เป้าหมาย
สร้าง master-data workflow ที่รองรับโครงสร้างชุมชนจริง

## โครงสร้าง

`ตำบล → หน่วยบริการ → หมู่บ้าน → อสม. → ครัวเรือน → สมาชิก`

## งานหลัก

### Master Data
- Service Unit
- Village
- Household
- Person
- HouseholdMembership
- Volunteer
- VolunteerAssignment

### Assignment Management
- staff/coordinator กำหนด household ให้อสม.
- effective start/end date
- active/inactive assignment
- assignment history

### Import Foundation
- CSV/template import design
- validation
- duplicate detection
- preview before commit
- error report

### Volunteer Correction Flow
- อสม.เสนอเพิ่ม/แก้ household/person ในพื้นที่รับผิดชอบ
- audit trail
- permission boundary

## Test Gate

- hierarchy integrity
- assignment scoping
- import validation
- duplicate detection
- audit-event tests
- lint/test/build/CI PASS

## Exit Criteria

ระบบตอบได้ว่า:
- คนนี้อยู่ household ใด
- household อยู่หมู่บ้านใด
- ใครรับผิดชอบ
- อสม.คนนี้ดูแล household ใดบ้าง
- assignment มีประวัติครบ

## ส่งมอบ

`PHASE 3 PASS`

---

# Phase 4 — Review Inbox + Progress Dashboard

## เป้าหมาย
ให้เจ้าหน้าที่เห็นความคืบหน้าและตรวจ submission ได้ตามนโยบายของแต่ละ form/campaign

## งานหลัก

### Review Policy
รองรับอย่างน้อย:
- REVIEW_ALL
- REVIEW_MATCHED_ONLY

### Submission Review Status
- submitted
- requires_review
- reviewed
- action_required
- completed

### Review Inbox
- filter by campaign
- village
- volunteer
- status
- date
- review required

### Dashboard
แสดงอย่างน้อย:
- total recipients
- completed
- not completed
- requires review
- reviewed
- action required

Drilldown:

`พื้นที่ → หมู่บ้าน → อสม. → ครัวเรือน → บุคคล`

## Clinical Safety Boundary

Phase นี้ทำได้เฉพาะ generic/configurable review rule engine foundation
ห้ามใส่ production clinical thresholds โดยไม่ได้รับอนุมัติจากบุคลากรสุขภาพ

## Test Gate

- dashboard aggregation tests
- review queue tests
- drilldown scope tests
- permission tests
- rule-engine non-clinical tests
- lint/test/build/CI PASS

## Exit Criteria

เจ้าหน้าที่สามารถเห็น campaign progress, backlog และรายการที่ต้อง review ได้ครบตาม hierarchy

## ส่งมอบ

`PHASE 4 PASS`

---

# Phase 5 — Follow-up, Appointment & Referral Workflow

## เป้าหมาย
ให้เจ้าหน้าที่ทำ action ต่อหลัง review ได้

## งานหลัก

รองรับ action อย่างน้อย:
- assign volunteer follow-up
- repeat measurement / recheck request
- appointment at service unit
- referral to another service unit
- mark handled/completed

### Follow-up
- owner
- due date
- status
- notes
- linked submission/review

### Appointment
- date/time
- service unit
- status

### Referral
- destination
- reason category
- status
- audit trail

## ห้ามทำ

- diagnosis engine
- prescription
- full EMR
- automated medical decision

## Test Gate

- follow-up state transitions
- appointment state transitions
- referral state transitions
- permission/audit tests
- lint/test/build/CI PASS

## Exit Criteria

reviewed submission สามารถเข้าสู่ follow-up/referral/appointment/complete ได้โดยมี trace

## ส่งมอบ

`PHASE 5 PASS`

---

# Phase 6 — Real Backend + Authentication + Authorization

## เป้าหมาย
เปลี่ยนจาก mock repositories เป็น backend จริงโดยไม่รื้อ UI/domain

## งานหลัก

### Backend
- database schema
- migrations
- repository adapters
- server/API boundary

### Authentication
รองรับ role foundation:
- staff
- volunteer
- citizen

Citizen access architecture ต้องไม่ปิดทาง:
- OTP
- persistent account
- unique campaign link/QR
- proxy completion

MVP สามารถเปิดเพียงบางวิธีตามความเหมาะสม

### Authorization
- role-based permissions
- area scope
- household assignment scope
- server-side enforcement
- least privilege

### Security
- RLS / equivalent server-enforced access
- audit event storage
- no service keys in frontend
- secrets via environment only

## Data Migration
เริ่มด้วย synthetic staging data ก่อน
ห้ามใช้ข้อมูลจริงจน Security/Privacy gate ผ่าน

## Test Gate

- auth tests
- authorization tests
- cross-scope denial tests
- RLS/security tests
- repository parity tests
- migration tests
- lint/test/build/CI PASS

## Exit Criteria

- mock adapter สามารถสลับเป็น real backend adapter
- UI/domain ไม่ต้องรื้อ
- role/scope enforcement ทำงานจริง

## ส่งมอบ

`PHASE 6 PASS`

---

# Phase 7 — Production-grade Offline & Sync

## เป้าหมาย
รองรับการทำงานภาคสนามเมื่ออินเทอร์เน็ตไม่เสถียร

## งานหลัก

- local draft persistence
- offline submission queue
- pending / syncing / synced / failed
- retry
- exponential/backoff strategy
- client UUID
- idempotency key
- duplicate prevention
- sync error visibility
- conflict handling policy
- safe logout/device behavior

## Test Gate

- offline creation
- reconnect sync
- duplicate prevention
- retry behavior
- conflict simulation
- queue recovery
- lint/test/build/CI PASS

## Exit Criteria

ภารกิจสำคัญสามารถทำ offline และ sync กลับโดยไม่สร้างข้อมูลซ้ำ

## ส่งมอบ

`PHASE 7 PASS`

---

# Phase 8 — Export & Smart อสม. Readiness

## เป้าหมาย
จัดข้อมูลให้อยู่ในรูปแบบพร้อมส่งต่อระบบทางการ โดยยังไม่ทำ integration ที่ไม่ได้รับอนุญาต

## งานหลัก

- export job model
- CSV/XLSX หรือรูปแบบที่ยืนยันภายหลัง
- export mapping
- data dictionary
- field provenance
- form version included
- export audit log

### Smart อสม. Research Gate

ก่อนสร้าง integration จริง ต้องยืนยัน:
- official supported mechanism
- API/file specification
- authentication method
- permission/authorization
- legal/privacy requirements

ห้าม:
- scrape
- browser automation เพื่อกรอกระบบรัฐ
- unofficial API
- credential sharing

## Test Gate

- deterministic export
- schema validation
- permissions
- audit trail
- lint/test/build/CI PASS

## Exit Criteria

ข้อมูล campaign/submission สามารถ export ได้อย่างมี schema และ trace พร้อมใช้ต่อใน workflow ทางการที่ได้รับอนุญาต

## ส่งมอบ

`PHASE 8 PASS`

---

# Phase 9 — Pilot Readiness

## เป้าหมาย
ทำระบบให้พร้อมทดลองกับหน่วยบริการ/อสม.กลุ่มเล็กอย่างควบคุม

## งานหลัก

### Security Review
- threat review
- session/device safety
- backup/restore
- access logs
- admin controls
- rate limits
- incident response basics

### Privacy
- data minimization
- lawful basis/consent flow ตามที่หน่วยงานกำหนด
- retention
- deletion/correction process
- export controls
- privacy notice

### Operational Readiness
- user guides
- onboarding guide
- admin guide
- training flow
- troubleshooting
- rollback plan

### Pilot Dataset Gate

ก่อนข้อมูลจริง:
- pilot approval
- authorized dataset
- user accounts prepared
- role assignments validated
- privacy/security checklist signed off

## Test Gate

- end-to-end scenario tests
- backup/restore drill
- role matrix test
- privacy/security checklist
- pilot acceptance scenarios
- deployment rehearsal

## Exit Criteria

พร้อม pilot แบบจำกัดขอบเขต โดยมี rollback และ audit พร้อม

## ส่งมอบ

`PHASE 9 PASS / PILOT READY`

---

# Phase 10 — Production Launch & Operations

## เป้าหมาย
นำระบบขึ้นใช้งานจริงอย่างมีการควบคุมและดูแลต่อเนื่อง

## งานหลัก

### Production Deploy
- production environment
- production database
- secrets
- domain/HTTPS
- monitoring
- backups
- alerting

### Launch
- user provisioning
- staff/volunteer onboarding
- initial master-data import
- controlled rollout
- support channel

### Operations
- monitoring
- incident handling
- backup verification
- audit review
- performance monitoring
- error tracking
- dependency/security updates
- release notes

### Post-launch
- usage metrics
- completion rates
- sync failure rates
- support issues
- product feedback
- prioritized backlog

## Production Exit Criteria

- production deployment stable
- backups verified
- monitoring active
- access controls verified
- no critical security issues
- support/rollback process available
- owner/authorized staff formally accept launch

## ส่งมอบ

`PRODUCTION LIVE`

---

# Cross-Phase Quality Gates

ทุก Phase ต้องทำก่อนปิดงาน:

1. inspect latest source/docs
2. confirm current phase scope
3. implement only phase-authorized work
4. update/add tests
5. run type/check
6. run lint
7. run tests
8. run build
9. inspect runtime/routes
10. inspect git diff
11. verify no secrets/real sensitive data
12. update `PROGRESS.md`
13. commit
14. push GitHub
15. verify GitHub readback
16. verify CI
17. report phase status

สถานะที่ใช้ได้:
- `PHASE X PASS`
- `PHASE X NOT READY`
- `PHASE X BLOCKED`

ห้ามรายงาน PASS จากคำบอกเล่าอย่างเดียว ต้องมี evidence จาก source/test/build/CI/readback

---

# Definition of Done ระดับโครงการ

โครงการถือว่า “เสร็จ” เมื่อ:

- Staff สร้างแบบคัดกรองเองได้
- เลือกกลุ่มเป้าหมายหลายระดับได้
- Citizen กรอกเองได้
- OSM กรอกแทนเฉพาะพื้นที่รับผิดชอบได้
- submission provenance ครบ
- household/responsibility master data ใช้งานจริงได้
- staff review/dashboard ใช้งานได้
- follow-up/referral workflow ใช้งานได้
- real backend/auth/authorization ปลอดภัย
- offline/sync ใช้งานภาคสนามได้
- export-ready สำหรับ workflow ทางการ
- privacy/security/pilot gate ผ่าน
- production monitoring/backup/support พร้อม
- ไม่มี critical blocker ค้างอยู่

---

# AI Agent Execution Rule

AI Agent ทุกตัวต้องอ่านเอกสารนี้ก่อนวางแผนงานระยะยาว และต้องใช้ Phase ปัจจุบันจาก `PROGRESS.md` เป็นตัวกำหนด scope งาน

AI มีอิสระเลือก implementation detail ที่ไม่เปลี่ยน Product Core เช่น:
- component architecture
- naming conventions
- test framework
- internal service boundaries
- visual tokens
- repository implementation details

แต่ AI ไม่มีสิทธิ์เปลี่ยนเองในเรื่อง:
- Product Core
- roles หลัก
- campaign ownership
- citizen/volunteer completion model
- responsibility hierarchy
- privacy/security boundary
- Smart อสม. boundary
- phase gates

เมื่อ Phase ใด PASS ให้หยุดและรอ explicit authorization ก่อนเริ่ม Phase ถัดไป เว้นแต่เจ้าของโครงการกำหนด policy อื่นอย่างชัดเจนในภายหลัง
