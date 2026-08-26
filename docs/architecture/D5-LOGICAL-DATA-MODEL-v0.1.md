# D5 — Logical Data Model v0.1

สถานะ: Working architecture document
วันที่: 2026-08-26

## 1. เป้าหมาย
กำหนดโครงสร้างข้อมูลเชิงตรรกะสำหรับระบบจัดการงานภาคสนามและประสานการดูแลระหว่าง ครัวเรือน ↔ อสม. ↔ เจ้าหน้าที่/แพทย์ โดยยังไม่ผูกกับ schema จริงหรือ migration

## 2. Domain Boundaries

### A. Geography & Responsibility
- ServiceUnit — หน่วยบริการ เช่น รพ.สต.
- Village — หมู่บ้าน
- Household — ครัวเรือน
- HouseholdAddress — ที่อยู่/พิกัดโดยประมาณ
- Volunteer — อสม.
- VolunteerAssignment — ความรับผิดชอบของ อสม. ต่อหมู่บ้าน/ครัวเรือน/บุคคล

### B. Identity & Access
- UserAccount — บัญชีผู้ใช้ที่ผูกกับ Supabase Auth ในอนาคต
- UserRole — citizen / volunteer / coordinator / staff / clinician / admin
- RoleScope — ขอบเขตพื้นที่/หน่วยบริการ/เคสที่ role นั้นเข้าถึงได้
- Person — บุคคลในครัวเรือน ไม่เท่ากับ UserAccount เสมอไป
- HouseholdMembership — ความสัมพันธ์บุคคลกับครัวเรือน
- Consent — ความยินยอมตามวัตถุประสงค์

### C. Field Operations
- Campaign — โครงการ/ภารกิจ เช่น NCD screening
- FormTemplate — แบบฟอร์มของภารกิจ
- Task — งานที่มอบหมาย
- TaskAssignment — ใครรับผิดชอบ task
- Visit — การลงพื้นที่/เยี่ยมบ้าน
- Observation — ค่าที่บันทึกจาก field เช่น BP, glucose, weight
- Note — บันทึกข้อความสั้น
- Attachment — รูป/เอกสารประกอบที่จำเป็น

### D. Care Coordination
- Case — เคสการติดตามสุขภาพ/การประสาน
- RiskAssessment — ผลประเมิน Normal / Watch / Needs review / Urgent
- Alert — red flag หรือเหตุที่ต้องดำเนินการ
- Referral — การส่งต่อให้เจ้าหน้าที่/แพทย์/หน่วยบริการ
- Review — การตรวจข้อมูลโดยเจ้าหน้าที่
- FollowUp — นัด/งานติดตาม
- CaseEvent — timeline เหตุการณ์ของเคส
- CaseStatusHistory — ประวัติเปลี่ยนสถานะ

### E. Communication
- MessageThread — ช่องสนทนาที่ผูกกับ case/task/household
- Message — ข้อความ
- Notification — การแจ้งเตือน

### F. Governance & Audit
- AuditEvent — ใครดู/เพิ่ม/แก้/ส่งต่อข้อมูลอะไร เมื่อใด
- ExportJob — ประวัติ export สรุปไปใช้กับระบบทางการ
- DataCorrectionRequest — ขอแก้ไขข้อมูล
- RetentionPolicy — นโยบายอายุข้อมูลตามประเภท

## 3. Core Relationships

`ServiceUnit 1—N Village`

`Village 1—N Household`

`Household N—N Person` ผ่าน HouseholdMembership

`Volunteer N—N Household` ผ่าน VolunteerAssignment

`Campaign 1—N Task`

`Task N—1 Household/Person/Case` ตามประเภทงาน

`Visit 1—N Observation`

`Person 1—N Case`

`Case 1—N Task / Observation / Alert / Referral / FollowUp / CaseEvent`

`UserAccount 1—N UserRole`

`UserRole 1—N RoleScope`

## 4. Design Decision: Person ≠ UserAccount
บุคคลในทะเบียนครัวเรือนจำนวนมากอาจไม่เคยเข้าแอป เช่น ผู้สูงอายุ เด็ก ผู้ป่วยติดเตียง จึงต้องแยก `Person` ออกจาก `UserAccount` อย่างเด็ดขาด

ผลคือ:
- Person ใช้แทนบุคคลที่อยู่ใน workflow สุขภาพ
- UserAccount ใช้แทนผู้ที่ล็อกอิน
- คนหนึ่งอาจมี Person record แต่ไม่มี UserAccount
- ผู้ดูแล/ญาติอาจมี UserAccount และได้รับสิทธิ์ดู Person อื่นตามความสัมพันธ์/consent

## 5. Design Decision: Case เป็นแกน coordination ไม่ใช่เวชระเบียน
Case เก็บเฉพาะข้อมูลที่จำเป็นต่อการประสานงาน เช่น เหตุที่เปิดเคส ระดับความเสี่ยง งานที่ต้องทำ ผู้รับผิดชอบ referral และ follow-up

ไม่ควรเก็บ diagnosis history, medication list, lab history หรือเวชระเบียนเต็มรูปแบบ หากข้อมูลนั้นไม่จำเป็นต่อ field workflow

## 6. Observation Model
Observation ควรเป็นโครงแบบ reusable เพื่อรองรับหลาย template เช่น:
- type_code: blood_pressure_systolic, blood_pressure_diastolic, glucose_capillary, weight, height, waist
- value_numeric / value_text / value_boolean
- unit
- observed_at
- observed_by
- verification_status: draft / submitted / verified / rejected
- source: field / citizen / staff

หลักการ: ค่าที่ อสม. บันทึกคือ observation ไม่ใช่ clinical diagnosis

## 7. RiskAssessment Model
RiskAssessment แยกออกจาก Observation เพื่อให้เกณฑ์เปลี่ยนได้โดยไม่แก้ข้อมูลดิบ

ฟิลด์เชิงตรรกะ:
- level: normal / watch / needs_review / urgent
- rule_set_version
- explanation_code
- generated_from observations
- requires_staff_review
- reviewed_by
- reviewed_at

## 8. Task Model
Task ต้องรองรับทั้งงานรายบุคคลและงาน campaign จำนวนมาก

ตัวอย่าง type:
- home_visit
- ncd_screening
- repeat_measurement
- referral_followup
- appointment_confirmation
- dengue_household_check

สถานะมาตรฐาน:
`new → assigned → in_progress → submitted → under_review → referred/follow_up → closed`

## 9. Permission Model เชิงข้อมูล
สิทธิ์ต้องคำนวณจากทั้ง role และ scope

### Citizen
- เห็น Person ของตนเอง และบุคคลที่ได้รับสิทธิ์ดูแลตาม relation/consent
- ไม่เห็นข้อมูลครัวเรือนอื่น

### Volunteer
- เห็นเฉพาะ Household/Person ที่ active assignment ครอบคลุม
- สร้าง Visit/Observation สำหรับ assignment ของตน
- ไม่เห็น clinical review note ที่ไม่จำเป็นต่อการทำงาน

### Coordinator
- เห็น workload/coverage และข้อมูล coordination
- clinical detail จำกัดเท่าที่จำเป็น

### Staff
- เห็นข้อมูลภายใน service unit scope
- review, triage, assign, referral, follow-up

### Clinician
- เห็นเฉพาะ case ที่ถูกส่งต่อหรืออยู่ใน scope การดูแล

### Admin
- จัดการระบบ/บัญชี/พื้นที่
- ไม่ได้สิทธิ์อ่าน clinical data โดยอัตโนมัติ

## 10. Sensitive Data Classification

### Tier A — Operational
สถานะ task, หมู่บ้าน, assignment, เวลานัด

### Tier B — Personal
ชื่อ, วันเกิด, ที่อยู่, ช่องทางติดต่อ

### Tier C — Sensitive Health
observation, risk, symptoms, referral, follow-up notes

### Tier D — Highly restricted
เอกสาร/รูปภาพที่อาจเปิดเผยข้อมูลสุขภาพละเอียด, consent evidence, audit-sensitive data

สิทธิ์และ retention ควรเข้มขึ้นตาม tier

## 11. Offline-first Implications
Client ต้องมี local queue สำหรับ:
- draft visit
- observation
- task status change
- note

ทุก mutation ต้องมี client-generated id / idempotency key เพื่อป้องกันข้อมูลซ้ำตอน sync

Conflict policy เบื้องต้น:
- immutable event เช่น observation ใหม่ → append
- task status → optimistic concurrency/version check
- person demographic → review/merge ไม่ overwrite แบบ blind

## 12. Audit Requirements
ต้องบันทึกอย่างน้อย:
- actor user
- action
- resource type/id
- timestamp
- service unit / scope
- success/failure
- reason/context สำหรับการเข้าถึงข้อมูลอ่อนไหวบางประเภท

Audit log ไม่ควรถูกแก้ไขผ่าน client app

## 13. สิ่งที่ยังไม่ตัดสินใจ
- รหัสระบุตัวบุคคลหลักใน production
- วิธีเชื่อมบุคคลกับระบบภาครัฐ
- retention period แต่ละประเภท
- consent flow รายละเอียด
- credential/login ที่เหมาะกับประชาชนและ อสม.
- ข้อมูลใดอนุญาตให้เก็บ offline บนอุปกรณ์

## 14. MVP Data Slice
สำหรับ MVP แรก ใช้เฉพาะ:
ServiceUnit, Village, Household, Person, Volunteer, VolunteerAssignment, UserAccount, UserRole, RoleScope, Campaign, Task, Visit, Observation, RiskAssessment, Alert, Referral, FollowUp, Case, CaseEvent, Consent, AuditEvent

โมดูลอื่นค่อยเพิ่มหลัง workflow MVP ผ่านการทดสอบภาคสนาม
