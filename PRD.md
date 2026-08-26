# KCG Health OSM — Product Requirements Document v0.2

สถานะ: Working PRD — Product Direction Re-aligned
วันที่: 2026-08-27

> Product source of truth: `docs/product/PRODUCT-DEFINITION-v0.2.md`

## 1. Product Vision
KCG Health OSM คือ **ระบบออกแบบ กระจาย กรอก ตรวจ และติดตามแบบคัดกรองสุขภาพระดับชุมชน** สำหรับตำบลโคกชะงาย โดยเชื่อม:

`แพทย์/เจ้าหน้าที่ รพ.สต. ↔ อสม. ↔ ครัวเรือน/ประชาชน`

ระบบนี้ไม่แทน Smart อสม., HDC, HIS หรือเวชระเบียน แต่ช่วยให้งานคัดกรองเป็นระบบ ติดตามได้ และเตรียมข้อมูลให้พร้อมใช้ต่อกับระบบทางการในภายหลัง

## 2. Product Boundary
### ระบบต้องทำ
- แพทย์/เจ้าหน้าที่สร้างแบบฟอร์มคัดกรองเองได้
- เลือกผู้รับรายบุคคล รายครัวเรือน รายหมู่บ้าน หรือกลุ่มตามเงื่อนไข
- ประชาชนกรอกเองได้เมื่อใช้งานมือถือได้
- อสม.กรอกแทนประชาชนในครัวเรือนที่รับผิดชอบได้
- เก็บว่าใครเป็นผู้ถูกคัดกรอง ใครเป็นผู้กรอก และกรอกแทนหรือกรอกเอง
- แสดงโครงสร้าง หมู่บ้าน → อสม. → ครัวเรือน → สมาชิก
- ให้เจ้าหน้าที่/ผู้ประสานกำหนดสายรับผิดชอบของ อสม.
- รับข้อมูลตั้งต้นผ่าน import/กรอก แล้วให้อสม.ช่วยตรวจและเติมข้อมูล
- ให้แพทย์กำหนดว่าแบบฟอร์มใดต้องตรวจทุกชุด หรือคัดเฉพาะรายการที่เข้าเงื่อนไข
- Dashboard ติดตามกรอกแล้ว/ยังไม่กรอก/ต้องตรวจ และ drill down ตามพื้นที่/อสม./ครัวเรือน/บุคคล
- หลังตรวจ สามารถสร้างงานติดตาม นัดหมาย ส่งต่อ หรือปิดงาน
- เตรียมข้อมูลให้อยู่ในโครงสร้างที่ export/mapping ไป Smart อสม. หรือระบบทางการภายหลังได้
- audit และควบคุมสิทธิ์ตาม role/scope/assignment

### ระบบไม่ทำใน MVP
- ไม่แทน Smart อสม.
- ไม่ scrape/auto-fill ระบบรัฐโดยไม่ได้รับอนุญาต
- ไม่เป็น full EMR/HIS
- ไม่วินิจฉัยโรคอัตโนมัติ
- ไม่เป็นระบบค่าป่วยการ
- ไม่ล็อกไว้กับแบบฟอร์ม NCD เพียงแบบเดียว
- ไม่ใช้ “เยี่ยมบ้านทั่วไป” เป็นแกนหลักของ MVP

## 3. Primary Users
1. แพทย์/เจ้าหน้าที่ รพ.สต.
2. อสม.
3. ประชาชน
4. ประธาน อสม./ผู้ประสานงาน
5. System Admin

## 4. Who Starts Work
ใน MVP งานเริ่มโดย **แพทย์/เจ้าหน้าที่** ผ่านการสร้างและเผยแพร่แบบคัดกรอง/ภารกิจ

ประชาชนและ อสม.เป็นผู้รับ/ผู้กรอกตาม assignment และสิทธิ์ ไม่ใช่ผู้สร้าง campaign หลัก

## 5. Core Workflow
`Create Form → Define Audience → Publish → Route to Citizen/Volunteer → Complete Form → Submit → Review Rules → Staff Review → Follow-up/Referral/Complete → Export-ready`

## 6. Form Builder
แพทย์/เจ้าหน้าที่สร้างแบบฟอร์มได้แบบยืดหยุ่น รองรับอย่างน้อย:
- short/long text
- number
- checkbox
- radio
- dropdown
- date/time
- yes/no
- single/multiple choice
- required/optional

ต้องรองรับ:
- เพิ่ม/ลบ/เรียงคำถาม
- แก้ตัวเลือก
- preview
- publish
- versioning หลังเผยแพร่เพื่อไม่ทำลายคำตอบเดิม

## 7. Audience Targeting
ผู้ส่งเลือกผู้รับได้แบบ:
- รายบุคคล
- รายครัวเรือน
- รายหมู่บ้าน/พื้นที่
- ตามเงื่อนไขจาก master data เช่น อายุหรือกลุ่มเสี่ยง

ก่อน publish ระบบต้อง resolve กลุ่มเป้าหมายออกมาเป็นรายการบุคคลที่ติดตามสถานะได้

## 8. Geography & Responsibility Model
โครงสร้างหลัก:

`ตำบล → หน่วยบริการ → หมู่บ้าน → อสม. → ครัวเรือน → สมาชิก`

อสม.แต่ละคนมี household assignments จริง และระบบต้องรู้ว่าประชาชนแต่ละคนอยู่ภายใต้ความรับผิดชอบของ อสม.คนใด

ผู้กำหนด assignment ได้:
- แพทย์/เจ้าหน้าที่
- ประธาน อสม./ผู้ประสาน

## 9. Initial Master Data
ใช้แนวทางผสม:
1. เจ้าหน้าที่/แอดมิน import หรือกรอกข้อมูลตั้งต้น
2. อสม.ตรวจ แก้ และเพิ่มครัวเรือน/สมาชิกที่ตกหล่นในพื้นที่รับผิดชอบ

การแก้ master data ต้องมี permission และ audit trail

## 10. Citizen Completion Modes
### กรอกเอง
ประชาชนที่ใช้มือถือได้ เข้าแอปหรือผ่านวิธีรับรองตัวตน/ลิงก์ที่ระบบอนุญาต แล้วกรอกเอง

### อสม.กรอกแทน
ประชาชนที่ใช้มือถือไม่คล่อง ให้ อสม.ที่รับผิดชอบกรอกแทน

ทุก submission ต้องเก็บ:
- target person
- actual submitter
- completion mode: self / proxy-by-volunteer
- form version
- timestamp

## 11. Citizen Access Architecture
ระบบต้องเปิดทางรองรับหลายวิธี:
- OTP เบอร์โทร
- บัญชีใช้งานต่อเนื่อง
- personal link/QR สำหรับภารกิจเฉพาะ
- proxy completion โดย อสม.

MVP ไม่จำเป็นต้องเปิดทุกวิธีพร้อมกัน

## 12. Review Policy
แพทย์กำหนดต่อแบบฟอร์มได้ว่า:
- review ทุก submission
หรือ
- auto-accept รายการทั่วไปและส่งเฉพาะรายการที่เข้า rule มาให้ตรวจ

สถานะขั้นต่ำ:
`assigned → in_progress → submitted → requires_review/reviewed → action_required → completed`

## 13. Staff Dashboard
ต้องเห็น:
- จำนวนผู้รับทั้งหมด
- กรอกแล้ว/ยังไม่กรอก
- requires review
- งานค้าง
- progress ตาม หมู่บ้าน → อสม. → ครัวเรือน → ประชาชน
- drill-down ตามสิทธิ์

## 14. Follow-up Actions
หลังตรวจ แพทย์/เจ้าหน้าที่สามารถ:
- มอบหมาย อสม.ติดตาม/วัดซ้ำ
- นัดประชาชนมาที่ รพ.สต.
- ส่งต่อหน่วยบริการอื่น
- บันทึกว่าจัดการแล้ว/ปิดงาน

เกณฑ์เชิงคลินิกต้องได้รับการยืนยันจากบุคลากรสุขภาพก่อน production

## 15. Smart อสม. Boundary
MVP ยังไม่สร้าง integration อัตโนมัติ

ระบบต้องเตรียม submission/export model ให้สามารถ mapping ไปยังรูปแบบ Smart อสม. หรือระบบภายนอกภายหลังได้ เมื่อทราบช่องทางที่ได้รับอนุญาตจริง

## 16. Roles & Access
### Citizen
- เห็น/กรอกเฉพาะงานและข้อมูลของตนเองหรือที่ได้รับอนุญาต

### Volunteer
- เห็นเฉพาะครัวเรือน/บุคคลที่มี active assignment
- กรอกแทนได้เฉพาะบุคคลในขอบเขตที่รับผิดชอบ

### Coordinator
- จัด assignment อสม.↔ครัวเรือน
- ดู coverage/workload
- ไม่ได้สิทธิ์ clinical detail อัตโนมัติ

### Staff/Clinician
- สร้าง form/campaign
- target audience
- review submissions
- follow-up/referral
- ดูตาม service-unit scope

### Admin
- จัด account/geography/system metadata
- ไม่มี clinical read access อัตโนมัติ

## 17. UX Requirements
- Thai-first
- Android mobile-first PWA
- Form Builder ฝั่งเจ้าหน้าที่ต้องใช้ง่าย ไม่ต้องเขียนโค้ด
- ฝั่งประชาชนต้องกรอกง่ายที่สุด
- ฝั่ง อสม.ต้องเห็นครัวเรือนในความรับผิดชอบและงานที่ยังค้าง
- status ต้องใช้ text/icon ไม่พึ่งสีอย่างเดียว
- visible online/offline/sync state
- touch target ~44px+

## 18. Data Architecture — Core Entities
- ServiceUnit
- Village
- Household
- Person
- HouseholdMembership
- Volunteer
- VolunteerAssignment
- UserAccount
- UserRole
- RoleScope
- FormTemplate
- FormVersion
- FormField
- Campaign
- AudienceRule
- CampaignRecipient
- Submission
- SubmissionAnswer
- SubmissionReview
- FollowUp
- Referral
- Appointment
- ExportJob
- Consent
- AuditEvent

Key decisions:
- Person ≠ UserAccount
- FormVersion immutable after publish
- Submission stores provenance of self/proxy completion
- CampaignRecipient materializes target resolution for traceability

## 19. Offline Requirements
MVP architecture should support offline queue for field completion by อสม. where appropriate

Each mutation requires client-generated id / idempotency key

Do not enable sensitive offline persistence in production until whitelist and device policy are approved

## 20. Security & Privacy
- least privilege
- RLS/server authorization when backend begins
- role + service-unit scope + active household assignment
- no secret/service-role key in frontend
- audit sensitive writes/changes
- data minimization
- retention/deletion policy before production
- no real personal/health data in public GitHub

## 21. Synthetic Test Dataset
Development/test uses synthetic data only

Recommended structure:
- 2 service units
- 9 villages
- multiple volunteers per village
- 3+ households per volunteer for prototype testing
- fictional household members
- multiple form templates
- campaign recipients covering both self-completion and proxy-completion paths

## 22. MVP Success Criteria
MVP succeeds when:
1. staff creates a custom form without code
2. staff targets recipients by person/household/village/condition
3. one citizen completes assigned form directly
4. one volunteer completes the same type of form on behalf of an assigned citizen
5. submissions preserve person/household/volunteer/form-version provenance
6. staff dashboard shows completion and review status by hierarchy
7. staff can create follow-up/referral from a submission
8. unauthorized volunteer cannot access another volunteer's households
9. export produces structured data ready for future mapping
10. no real health data is needed to demonstrate the MVP

## 23. Phase 0 Direction
Phase 0 is **Foundation only**. It must prepare the application for this product definition, not implement the full workflow yet.

Foundation must prioritize:
- role shells
- geography/household/responsibility domain types
- form schema/types
- campaign/recipient/submission interfaces
- mock repositories
- route skeletons
- PWA/test/CI foundation

Existing Lovable NCD/home-visit prototype code is reference/salvage material only and must not dictate product architecture.

## 24. Open Decisions Before Production
- exact citizen authentication methods to enable first
- source/format of initial population import
- official mapping/export requirements for Smart อสม.
- consent/legal basis matrix
- approved clinical review/risk rules
- retention periods
- allowed offline sensitive fields
- production incident response/ownership

## 25. Supporting Documents
Authoritative product definition:
- `docs/product/PRODUCT-DEFINITION-v0.2.md`

Supporting discovery/architecture:
- `docs/discovery/`
- `docs/blueprint/`
- `docs/architecture/`

Older workflow documents that conflict with Product Definition v0.2 should be treated as historical design input, not current product authority.
