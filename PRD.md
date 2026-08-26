# KCG Health OSM — Product Requirements Document v0.1

สถานะ: Working PRD
วันที่: 2026-08-26

## 1. Product Vision
KCG Health OSM คือ **ระบบจัดการงานภาคสนามและประสานการดูแลระหว่าง ครัวเรือน ↔ อสม. ↔ เจ้าหน้าที่สาธารณสุข/แพทย์** สำหรับตำบลโคกชะงาย อำเภอเมืองพัทลุง จังหวัดพัทลุง

ระบบนี้ไม่ใช่ระบบรายงาน อสม. แทนของรัฐ และไม่ใช่ระบบเวชระเบียนทดแทน Smart อสม., HDC หรือ HIS

## 2. Problem Statement
งานสุขภาพชุมชนระดับตำบลมีหลายกิจกรรมที่ต้องพึ่งการมอบหมายงาน การลงพื้นที่ การจดบันทึก การติดตาม และการประสานระหว่างหลายฝ่าย ปัญหาหลักที่ระบบนี้ต้องแก้คือ:
- งานกระจายผ่านหลายช่องทาง เช่น การประชุม โทรศัพท์ LINE หรือเอกสาร
- อสม. ต้องติดตามหลายครัวเรือนและหลายภารกิจพร้อมกัน
- เจ้าหน้าที่มองเห็นเคสเสี่ยงและงานค้างได้ยากเมื่อข้อมูลกระจัดกระจาย
- การส่งต่อและติดตามผลไม่มี timeline กลางที่อ่านง่าย
- งานภาคสนามอาจอยู่ในพื้นที่สัญญาณอินเทอร์เน็ตไม่เสถียร
- ข้อมูลสุขภาพมีความอ่อนไหวและต้องควบคุมสิทธิ์อย่างละเอียด

## 3. Product Boundary
### ระบบต้องทำ
- มอบหมายและติดตาม task ภาคสนาม
- แสดงครัวเรือน/บุคคลที่ อสม. รับผิดชอบ
- บันทึก visit และ observation
- ประเมิน workflow risk state โดยไม่วินิจฉัยโรค
- แจ้ง red flag ให้เจ้าหน้าที่ตรวจ
- ส่งต่อและติดตาม follow-up
- แสดง dashboard ตาม role และพื้นที่
- รองรับ offline queue
- เก็บ audit trail
- export สรุปข้อมูลเพื่อช่วยงานรายงานทางการ

### ระบบไม่ทำ
- ไม่แทน Smart อสม.
- ไม่แทน HDC/HIS/EMR
- ไม่จ่ายค่าป่วยการ อสม.
- ไม่ scrape หรือกรอกระบบรัฐอัตโนมัติโดยไม่ได้รับอนุญาต
- ไม่เก็บข้อมูลสุขภาพที่ไม่จำเป็นต่อ workflow
- ไม่ให้ AI วินิจฉัยโรคอัตโนมัติ

## 4. Area Baseline
Working baseline:
- 9 หมู่บ้าน
- รพ.สต.บ้านทุ่งยาว: หมู่ 1, 7, 9
- รพ.สต.บ้านโคกชะงาย: หมู่ 2, 3, 4, 5, 6, 8

ต้องยืนยัน master data ล่าสุดก่อน production

## 5. Primary Users
1. ประชาชน/สมาชิกครัวเรือน
2. อสม.
3. ประธาน อสม./ผู้ประสานงาน
4. เจ้าหน้าที่สาธารณสุข/รพ.สต.
5. แพทย์/ผู้ประกอบวิชาชีพ
6. System Admin

## 6. Core Workflow
Workflow มาตรฐานของระบบ:

`Target → Task → Observation → Risk → Action → Referral → Follow-up → Closure`

MVP แรกพิสูจน์วงจร:

`Assigned household/person → Home visit → NCD screening → Risk result → Staff review → Referral/Follow-up → Close`

## 7. MVP Scope
### 7.1 Volunteer workflow
- Today dashboard
- Task list
- Household list/detail
- Person summary
- Start home visit
- NCD screening form
- Risk result
- Ask staff / referral
- Offline draft/sync state

### 7.2 Staff workflow
- Operational dashboard
- Triage inbox
- Case detail
- Assignment composer
- Review submitted data
- Create follow-up task

### 7.3 Citizen workflow
- Home
- Appointment/follow-up
- Confirm appointment
- Request help / report symptom placeholder for later MVP extension

## 8. NCD Screening MVP
Mock/prototype fields:
- date/time
- systolic/diastolic blood pressure
- optional capillary glucose
- weight / height / waist when applicable
- risk factor checklist
- symptoms/red flags
- short note

System behavior:
- numeric validation
- autosave draft
- risk state: Normal / Watch / Needs review / Urgent
- abnormal values show “ต้องให้เจ้าหน้าที่ตรวจ”
- no diagnostic wording

## 9. Roles and Access
### Citizen
- own/authorized household scope only

### Volunteer
- assigned household/person scope only
- may create visit/observation for assigned tasks

### Coordinator
- workload, coverage, task status
- limited clinical detail

### Staff
- service-unit scoped cases/tasks
- review, triage, assign, referral, follow-up

### Clinician
- explicitly referred/care-scope cases only

### Admin
- system/account/geography metadata
- no automatic clinical read access

## 10. UX Requirements
- Thai language first
- Android mobile-first PWA
- task-first home screen
- risk-first prioritization
- one-hand operation
- touch targets ~44px+
- large readable Thai typography
- every state uses icon/text in addition to color
- visible online/offline/sync status
- household-centered navigation

## 11. Navigation MVP
### อสม.
วันนี้ / ครัวเรือน / งาน / แจ้งเตือน / โปรไฟล์

### เจ้าหน้าที่/แพทย์
ภาพรวม / เคส / งาน / พื้นที่ / โปรไฟล์

### ประชาชน
หน้าแรก / นัดหมาย / การติดตาม / ข้อความ / โปรไฟล์

## 12. Data Architecture
Core entities:
- ServiceUnit
- Village
- Household
- Person
- HouseholdMembership
- UserAccount
- UserRole
- RoleScope
- Volunteer
- VolunteerAssignment
- Campaign
- Task
- TaskAssignment
- Visit
- Observation
- RiskAssessment
- Alert
- Case
- Review
- Referral
- FollowUp
- CaseEvent
- Consent
- AuditEvent

Key decisions:
- Person ≠ UserAccount
- Case is coordination record, not full medical record
- Observation stores field values, not diagnosis
- RiskAssessment stores rule result separately from raw observation

## 13. Security & Privacy Requirements
- least privilege
- RLS on exposed tables
- role + scope + assignment authorization
- never rely on user-editable metadata for authorization
- service-role/secret keys never exposed to client
- audit sensitive reads/writes where appropriate
- privacy-by-design overview screens
- data minimization
- retention policy per data class
- offline storage whitelist before production

Data classification:
1. Operational
2. Personal
3. Sensitive Health
4. Highly Restricted

## 14. Offline Requirements
Must support local queue for:
- visit draft
- observation
- task status change
- short note

Each mutation requires idempotency key.

Conflict behavior:
- observations append rather than overwrite
- task status uses version/concurrency check
- demographic conflict requires review/merge

## 15. Audit Requirements
Audit must capture at minimum:
- actor
- action
- resource type/id
- timestamp
- scope/service unit
- success/failure
- context/reason for sensitive access where required

Client must not be able to edit audit history.

## 16. Synthetic Test Dataset
Development/test should use synthetic data only until production governance is approved.

Recommended MVP dataset:
- 2 service units
- 9 villages
- 27 households
- ~70 fictional persons
- 9 fictional volunteers
- 2 staff
- 1 clinician
- 1 coordinator
- 1 admin
- 30-50 tasks
- 10-20 active cases

## 17. Non-functional Requirements
- responsive Android-first UI
- PWA installable architecture
- resilient to intermittent network
- clear loading/error/empty states
- accessibility-aware typography and contrast
- no sensitive data in logs/client analytics
- production backup/recovery plan before launch

## 18. Integrations
### MVP
No external integration required beyond chosen application backend.

### Later
Potential adapters:
- official reporting export
- approved government APIs where available
- notification providers
- Google Drive/Sheets export for non-sensitive summaries if governance permits

Do not build unofficial scraping integration.

## 19. Proposed Technical Direction
Target direction, not yet production-locked:
- Frontend: TypeScript PWA, mobile-first
- Backend: Supabase PostgreSQL/Auth/Storage with RLS
- Offline: client queue + idempotent sync
- GitHub: source, migrations, docs
- Google Drive: source/reference documents
- Lovable: optional prototype/design tool, not source of truth

## 20. Success Criteria for MVP
MVP is successful when:
1. volunteer can complete assigned NCD home-visit flow end-to-end
2. urgent mock case appears in staff triage without exposing unrelated households
3. staff can create follow-up and volunteer sees it
4. citizen can view/confirm own follow-up only
5. cross-village unauthorized access tests fail correctly
6. offline retry does not duplicate observations
7. audit events are generated for sensitive workflow actions
8. no real personal/health data is needed to demonstrate the system

## 21. Out of Scope for MVP
- full EMR
- medication management
- lab integration
- automated diagnosis
- payments/benefits
- full Smart อสม. replacement
- complete LTC module
- dengue module
- campaign builder UI
- advanced analytics/AI

## 22. Open Decisions Before Production
- person identifier strategy
- authentication method for citizens/volunteers
- legal basis/consent matrix per workflow
- exact NCD observation/risk rules approved by health personnel
- retention periods
- precise household geolocation policy
- allowed offline sensitive fields
- external referral model
- production ownership and incident response

## 23. Source Documents
Detailed discovery and architecture remain authoritative supporting documents under:
- `docs/discovery/`
- `docs/blueprint/`
- `docs/architecture/`
- `docs/prototype/`

PRD summarizes those decisions and should be updated when lower-level architecture changes are approved.
