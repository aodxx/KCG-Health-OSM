# D2 — System Blueprint v0.1

สถานะ: Working blueprint
วันที่: 2026-08-26

## 1. Product Boundary ที่ล็อกแล้ว

KCG-Health-OSM คือ **ระบบจัดการงานภาคสนามและประสานการดูแลระหว่าง ครัวเรือน ↔ อสม. ↔ เจ้าหน้าที่/แพทย์**

ไม่ใช่ระบบรายงาน อสม. แทนของรัฐ และไม่ใช่ระบบเวชระเบียนทดแทน HDC/HIS

### สิ่งที่ระบบนี้ต้องทำ
- ช่วย อสม. รับงาน เห็นพื้นที่/ครัวเรือนที่รับผิดชอบ และติดตามงานให้ครบ
- ช่วยครัวเรือน/ประชาชนสื่อสาร ขอความช่วยเหลือ รับนัด และรับคำแนะนำ
- ช่วยเจ้าหน้าที่/แพทย์เห็นเคสเสี่ยง งานค้าง ผลติดตาม และภาพรวมพื้นที่
- สร้าง workflow เดียวสำหรับหลายภารกิจ เช่น NCD, LTC, ไข้เลือดออก, ผู้พิการ, ผู้สูงอายุ, งานคัดกรองเฉพาะโรค
- ทำงานภาคสนามแบบ mobile-first และรองรับ offline queue
- เก็บ audit trail และสิทธิ์เข้าถึงตามบทบาท/พื้นที่
- export ข้อมูลสรุปเพื่อช่วยงานรายงานทางการ โดยไม่สร้างระบบคู่ขนาน

### สิ่งที่ระบบนี้ไม่ทำ
- ไม่จ่ายค่าป่วยการ อสม.
- ไม่แทน Smart อสม.
- ไม่แทน HDC/HIS/เวชระเบียนของสถานบริการ
- ไม่ scrape หรือกรอกระบบรัฐอัตโนมัติโดยไม่ได้รับอนุญาต
- ไม่เก็บข้อมูลสุขภาพเกินกว่าที่จำเป็นต่อ workflow ที่ได้รับมอบหมาย

## 2. Operating Model ของพื้นที่

โครงสร้างการทำงานระดับพื้นที่:

`ตำบล → หน่วยบริการ → หมู่บ้าน → อสม. → ครัวเรือน → บุคคล`

Working baseline:
- ตำบลโคกชะงาย 9 หมู่บ้าน
- รพ.สต.บ้านทุ่งยาว: หมู่ 1, 7, 9
- รพ.สต.บ้านโคกชะงาย: หมู่ 2, 3, 4, 5, 6, 8

ระบบต้องรองรับหลายหน่วยบริการตั้งแต่แรก และห้าม hard-code ว่าหนึ่งตำบลมีเพียงหนึ่ง รพ.สต.

## 3. User Roles

### 3.1 Household Member / Citizen
สิทธิ์หลัก:
- ดูข้อมูลของตนเอง/ครัวเรือนตามขอบเขตที่อนุญาต
- ดูนัดหมายและงานที่ต้องดำเนินการ
- แจ้งอาการ/ขอความช่วยเหลือ
- รับข้อความ/คำแนะนำ/การแจ้งเตือน
- ยืนยันข้อมูลบางรายการ เช่น ที่อยู่ ช่องทางติดต่อ หรือสถานะนัด

### 3.2 อสม. (Volunteer)
สิทธิ์หลัก:
- เห็นเฉพาะหมู่บ้าน/ครัวเรือน/บุคคลที่ได้รับมอบหมาย
- ดู task วันนี้/งานค้าง/งานเร่งด่วน
- บันทึกการเยี่ยมบ้านและ observation
- ทำแบบคัดกรองตาม campaign/template
- แจ้ง red flag
- ขอคำปรึกษา/ส่งต่อเคสให้เจ้าหน้าที่
- ทำงาน offline และ sync ภายหลัง

### 3.3 ประธาน อสม./ผู้ประสานงาน
สิทธิ์หลัก:
- เห็นภาพรวมระดับหมู่บ้าน/กลุ่ม อสม. ที่รับผิดชอบ
- กระจายงานหรือช่วยจัดสมดุลงาน
- ติดตามงานค้างและ coverage
- ไม่ควรเห็นข้อมูลสุขภาพเชิงลึกเกินกว่าที่จำเป็นต่อการประสานงาน

### 3.4 เจ้าหน้าที่สาธารณสุข / รพ.สต.
สิทธิ์หลัก:
- เห็นเคสในเขตรับผิดชอบของหน่วยบริการ
- ตรวจ/รับรองข้อมูลบางประเภท
- triage เคสเสี่ยง
- มอบหมายงานและ follow-up
- ดู dashboard ระดับหมู่บ้าน/หน่วยบริการ
- export สรุปข้อมูลสำหรับระบบทางการ

### 3.5 แพทย์/ผู้ประกอบวิชาชีพ
สิทธิ์หลัก:
- เห็นเฉพาะเคสที่ถูกส่งต่อ/อยู่ในขอบเขตการดูแล
- ดู timeline, observation, red flags, referral notes
- เพิ่มคำแนะนำ/แผนติดตาม
- ไม่จำเป็นต้องมี access ครบทุก household โดยอัตโนมัติ

### 3.6 System Admin
สิทธิ์หลัก:
- จัดการโครงสร้างพื้นที่ หน่วยบริการ หมู่บ้าน ผู้ใช้ และสิทธิ์
- ไม่ควรมีสิทธิ์เปิดดูข้อมูลสุขภาพเชิงคลินิกโดย default

## 4. Core Workflow Engine

ใช้ state model กลางเดียวสำหรับงานหลายประเภท:

`Target → Task → Observation → Risk → Action → Referral → Follow-up → Closure`

### State ที่แนะนำ
- draft
- assigned
- in_progress
- submitted
- needs_review
- verified
- referred
- follow_up_due
- completed
- cancelled

### Red Flag Path
เมื่อ observation เข้าเกณฑ์ red flag:
1. บันทึกค่าที่ตรวจพบ
2. rule engine ประเมิน risk
3. สร้าง alert
4. แจ้งเจ้าหน้าที่ที่รับผิดชอบ
5. สร้าง referral/follow-up task
6. ติดตามจนปิดเคส

## 5. Core Data Domains

### Geography & Organization
- ServiceUnit
- Village
- Household
- HouseholdMember

### Identity & Access
- User
- Role
- UserScope
- VolunteerProfile
- StaffProfile

### Operational Work
- Assignment
- Task
- Campaign
- FormTemplate
- FormSubmission
- Visit

### Health Coordination
- Case
- Observation
- RiskAssessment
- Alert
- Referral
- FollowUp
- CareNote

### Governance
- Consent
- AuditEvent
- Attachment
- ExportJob
- Notification

## 6. Logical Relationships

- ServiceUnit 1:N Village
- Village 1:N Household
- Household 1:N HouseholdMember
- Volunteer N:M Household ผ่าน Assignment
- HouseholdMember 1:N Case
- Case 1:N Task
- Task 0..N Visit
- Visit 1:N Observation
- Observation 0..1 RiskAssessment
- Case 0..N Referral
- Case 0..N FollowUp
- User 1:N AuditEvent

ความสัมพันธ์พื้นที่และสิทธิ์ต้องเป็น dynamic assignment ไม่ใช้ role อย่างเดียวในการอนุญาตข้อมูล

## 7. App Surfaces

### PWA — อสม.
Bottom-level navigation ที่คาดไว้:
- วันนี้
- ครัวเรือน
- งาน/เคส
- แจ้งเตือน
- โปรไฟล์

Home ควรเน้น:
- งานวันนี้
- งานค้าง
- red flags
- นัด follow-up
- ปุ่มเริ่มเยี่ยมบ้าน/คัดกรอง

### PWA — ประชาชน/ครัวเรือน
- หน้าหลัก
- นัดหมาย
- ขอความช่วยเหลือ
- สุขภาพ/คำแนะนำที่แชร์ให้ดูได้
- โปรไฟล์ครัวเรือน

### Staff Console — เจ้าหน้าที่/แพทย์
- Dashboard
- Cases
- Tasks
- Referrals
- Villages/Volunteers
- Campaigns
- Reports/Export
- Admin (เฉพาะผู้มีสิทธิ์)

## 8. Offline-first Strategy

ภาคสนามต้องรองรับสัญญาณไม่เสถียร:
- PWA cache shell
- local encrypted/isolated queue สำหรับ submission ที่ยังไม่ sync
- client-generated UUID
- sync status ต่อรายการ
- retry แบบ idempotent
- conflict policy ชัดเจน
- หลีกเลี่ยงเก็บข้อมูลสุขภาพจำนวนมากใน local storage เกินจำเป็น

## 9. Notification Model

ระดับความสำคัญ:
- Critical: red flag / referral ด่วน
- High: follow-up เกินกำหนด
- Normal: งานใหม่/นัดหมาย
- Info: ข่าว/กิจกรรม

ช่องทางในอนาคตอาจมี in-app, push, LINE/SMS adapter แต่ blueprint ไม่ผูกกับ provider เดียว

## 10. Security Boundary

หลักการสำคัญ:
- least privilege
- scope by service unit / village / assignment / case
- health data ไม่ควรอยู่ใน public GitHub หรือ Google Sheet สาธารณะ
- RLS ต้องบังคับที่ฐานข้อมูล ไม่พึ่ง frontend
- admin role แยกจาก clinical access
- audit ทุกการอ่าน/แก้ไขรายการสำคัญเท่าที่ระบบรองรับอย่างเหมาะสม
- attachment เช่นรูปแผล/เอกสารสุขภาพเป็น private object storage
- consent และ lawful basis ต้องถูกออกแบบก่อน production

## 11. Technology Direction v0.1

ยังไม่ถือเป็น final architecture แต่ working recommendation คือ:

### Frontend
- React/Vite หรือ framework ที่ Lovable export/ดูแลได้ง่าย
- PWA
- responsive mobile-first

### Backend
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- RLS
- Edge Functions เฉพาะงาน privileged/server-side

### Project/Team Tools
- GitHub = source code + versioned design docs + migrations
- Google Drive = source documents / field references / PDFs / forms
- Google Sheets = export/analysis/reporting bridge เท่านั้น
- Lovable = UI prototype และ rapid validation หลัง blueprint

## 12. Integration Boundary

### Smart อสม.
- coexist
- ไม่แทน
- export summary ช่วยลดงานซ้ำเมื่อถูกต้องตามกติกา

### HDC/HIS
- official downstream source/reporting system
- integration adapter เป็น future phase เมื่อมี API/authorization ที่ถูกต้อง

### Google Workspace
- Drive: เอกสารอ้างอิง
- Sheets: report/export
- PDF: แบบฟอร์ม/หลักฐาน/เอกสารอ้างอิง ไม่ใช่ transactional database

## 13. MVP Scope Candidate

MVP ควรพิสูจน์ workflow เดียวให้ครบก่อน ไม่สร้างทุกโรคพร้อมกัน

Candidate ที่เหมาะ:
1. Household registry แบบจำกัด
2. Volunteer assignment
3. Task assignment
4. Home visit
5. NCD observation
6. Risk/red flag
7. Staff review
8. Referral/follow-up
9. Dashboard เบื้องต้น
10. Offline queue
11. Audit log

หลัง workflow นี้ทำงานจริงแล้วจึงเพิ่ม LTC, ผู้พิการ, ไข้เลือดออก และ campaign อื่นผ่าน form/template engine

## 14. Success Criteria ของ Blueprint

ก่อนเข้า PRD ต้องตอบได้ว่า:
- ใครใช้ระบบและเห็นอะไร
- ข้อมูลใดเป็น source of truth
- workflow ใดอยู่ใน MVP
- จุดใดเป็น red flag/referral
- offline ทำงานอย่างไร
- ระบบรัฐใด coexist/integrate
- ข้อมูลใดห้ามเก็บหรือห้ามเผยแพร่

## 15. ข้อมูลที่ยังเป็น TBD

- จำนวน อสม. ปัจจุบันแยกหมู่บ้าน
- assignment ครัวเรือนจริง
- แบบฟอร์มปัจจุบันของ 2 รพ.สต.
- ขั้นตอนส่งต่อจริงและเบอร์ติดต่อ/ผู้รับผิดชอบ
- กระบวนการ consent ที่พื้นที่ใช้อยู่
- วิธี login ที่เหมาะกับประชาชนและ อสม.
- requirement เรื่อง LINE integration
- อุปกรณ์มือถือและระดับการเชื่อมต่ออินเทอร์เน็ตของผู้ใช้จริง

TBD เหล่านี้ไม่ขวางการทำ prototype เชิง workflow แต่ต้องปิดก่อน production rollout
