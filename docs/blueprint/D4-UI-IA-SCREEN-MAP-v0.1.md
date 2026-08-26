# D4 — UI Information Architecture & Screen Map v0.1

สถานะ: Working blueprint
วันที่: 2026-08-26

## 1. เป้าหมาย

กำหนดโครงสร้างหน้าจอและเส้นทางใช้งานของ PWA สำหรับ 3 กลุ่มหลัก:
- ครัวเรือน/ประชาชน
- อสม.
- เจ้าหน้าที่สาธารณสุข/แพทย์

หลักการสำคัญคือทุกบทบาทใช้ workflow เดียวกัน แต่เห็นข้อมูลและทำ action ต่างกันตามสิทธิ์และพื้นที่รับผิดชอบ

## 2. UX Principles

1. Mobile-first จริง — ออกแบบสำหรับ Android มือถือก่อน desktop
2. Task-first — หน้าแรกต้องตอบว่า “วันนี้ต้องทำอะไร” ไม่ใช่แสดงเมนูจำนวนมาก
3. Risk-first — เคสเร่งด่วน/red flag ต้องเด่นกว่าสถิติทั่วไป
4. Household-centered — เข้าถึงข้อมูลผ่านครัวเรือนและบุคคล ไม่ใช่ตารางข้อมูลดิบ
5. Minimal data entry — ใช้ค่าที่เลือกได้, template, default และ autosave ลดการพิมพ์
6. Offline-friendly — งานภาคสนามต้องบันทึกได้เมื่อไม่มีเน็ตและ sync ภายหลัง
7. Explainable status — ทุกงานมีสถานะชัดเจนว่า รอทำ / กำลังทำ / รอตรวจ / ส่งต่อ / นัดติดตาม / เสร็จสิ้น
8. Privacy by design — ไม่แสดงข้อมูลสุขภาพเชิงลึกในหน้า overview โดยไม่จำเป็น
9. One-hand operation — action หลักอยู่ในพื้นที่แตะง่ายบนจอมือถือ
10. Large readable Thai typography — เน้นผู้ใช้หลายช่วงวัย

## 3. Navigation Model

### 3.1 อสม. — Bottom Navigation MVP
1. วันนี้
2. ครัวเรือน
3. งาน
4. แจ้งเตือน
5. โปรไฟล์

Primary FAB / Quick Action:
- เริ่มเยี่ยมบ้าน

### 3.2 เจ้าหน้าที่/แพทย์
1. ภาพรวม
2. เคส
3. งาน
4. พื้นที่
5. โปรไฟล์

Primary Quick Action:
- มอบหมายงาน / เปิดเคส

### 3.3 ประชาชน/ครัวเรือน
1. หน้าแรก
2. นัดหมาย
3. สุขภาพ/การติดตาม
4. ข้อความ
5. โปรไฟล์

Primary Quick Action:
- ขอความช่วยเหลือ / แจ้งอาการ

## 4. Screen Map — อสม.

### V01 — Login / Access
- เข้าใช้งาน
- ยืนยันตัวตน
- เลือก/ยืนยันบทบาทเมื่อมีหลายบทบาท
- แจ้งสถานะ online/offline

### V02 — Today Dashboard
แสดงเฉพาะสิ่งที่ต้องทำวันนี้:
- งานเร่งด่วน / red flag ที่ต้องติดตาม
- นัดเยี่ยมบ้านวันนี้
- งานค้าง
- งานใหม่ที่ได้รับมอบหมาย
- จำนวนงานที่ sync ไม่สำเร็จ

Quick actions:
- เริ่มเยี่ยมบ้าน
- ค้นหาครัวเรือน
- ดูงานทั้งหมด

### V03 — Household List
- ครัวเรือนที่รับผิดชอบ
- ค้นหาชื่อ/บ้านเลขที่/บุคคล
- filter หมู่บ้าน/สถานะความเสี่ยง/มีงานค้าง
- badge แสดง follow-up ที่ต้องทำ

### V04 — Household Detail
Header:
- บ้านเลขที่ / หมู่บ้าน
- อสม.ผู้รับผิดชอบ
- ช่องทางติดต่อที่อนุญาต

Sections:
- สมาชิกในครัวเรือน
- งาน/เคสที่กำลังติดตาม
- การเยี่ยมล่าสุด
- นัดหมาย
- หมายเหตุภาคสนามที่แชร์ได้ตามสิทธิ์

Primary action:
- เริ่มการเยี่ยมบ้าน

### V05 — Person Summary
แสดงแบบ summary ไม่ใช่เวชระเบียน:
- ข้อมูลพื้นฐานจำเป็น
- กลุ่มเป้าหมาย เช่น 35+ / สูงอายุ / พิการ / ติดบ้านติดเตียง
- active cases
- risk badge
- นัดครั้งถัดไป
- timeline การติดตามที่ผู้ใช้มีสิทธิ์เห็น

### V06 — Start Visit
ขั้นตอนสั้น:
1. ยืนยันครัวเรือน/บุคคล
2. เลือกเหตุผลการเยี่ยม
3. เลือก template เช่น NCD / follow-up / general visit
4. เริ่มบันทึก

### V07 — NCD Screening Form
MVP fields:
- วันที่/เวลา
- ความดันโลหิต
- น้ำตาลปลายนิ้ว (เมื่อภารกิจกำหนด)
- น้ำหนัก/ส่วนสูง/รอบเอว เมื่อจำเป็น
- ปัจจัยเสี่ยงตาม template
- อาการสำคัญ/red flag
- note สั้น

UX:
- numeric keypad
- validation ช่วงค่า
- autosave draft
- แสดงข้อความว่า “ต้องให้เจ้าหน้าที่ตรวจ” เมื่อเข้าเกณฑ์

### V08 — Risk Result
หลังบันทึก observation:
- ปกติ
- เสี่ยง
- ต้องตรวจสอบ
- red flag

แสดง next action ที่ระบบแนะนำตาม protocol/template แต่ไม่วินิจฉัยโรคแทนบุคลากรวิชาชีพ

Actions:
- บันทึกและจบการเยี่ยม
- นัดติดตาม
- ส่งให้เจ้าหน้าที่ตรวจ
- แจ้ง red flag

### V09 — Referral / Ask Staff
- เหตุผลส่งต่อ
- summary ของ observation ที่เกี่ยวข้อง
- urgency
- note
- ผู้รับปลายทาง/หน่วยบริการ

อสม.ไม่ต้องกรอก clinical diagnosis

### V10 — Task List
Tabs/filters:
- วันนี้
- ค้าง
- รอตรวจ
- นัดติดตาม
- เสร็จแล้ว

Task card:
- บุคคล/ครัวเรือน
- ประเภทงาน
- deadline
- priority
- status

### V11 — Task Detail
- ที่มาของงาน
- ผู้มอบหมาย
- ขั้นตอนที่ต้องทำ
- case context เท่าที่จำเป็น
- activity timeline
- submit result

### V12 — Notifications
แยก:
- งานใหม่
- red flag response
- นัด/กำหนดส่ง
- sync error
- announcement ระดับพื้นที่

### V13 — Offline Queue
- รายการที่ยังไม่ sync
- เวลาบันทึก
- สถานะ retry
- ปุ่ม retry
- ห้ามผู้ใช้สูญเสีย draft เพราะปิดแอป

## 5. Screen Map — เจ้าหน้าที่สาธารณสุข / แพทย์

### S01 — Operational Dashboard
Cards ที่จำเป็น:
- red flags ใหม่
- เคสรอตรวจ
- งาน overdue
- follow-up วันนี้
- coverage งานคัดกรอง

filters:
- หน่วยบริการ
- หมู่บ้าน
- campaign
- ช่วงเวลา

### S02 — Triage Inbox
Queue:
- urgent
- high risk
- routine review

แต่ละรายการแสดง:
- บุคคล
- อสม.ผู้ส่ง
- observation summary
- เวลาที่ส่ง
- SLA/เวลาที่ค้าง

### S03 — Case Detail
- case header
- เหตุผลเปิดเคส
- current status
- risk level
- responsible staff
- assigned volunteer
- household context
- timeline
- observations
- referrals
- follow-ups

Actions ตาม role:
- verify
- request more information
- assign follow-up
- refer
- close

### S04 — Assignment Composer
- เลือก campaign/template
- เลือกกลุ่มเป้าหมาย
- เลือกหมู่บ้าน/อสม.
- deadline
- priority
- instructions

รองรับ bulk task โดยไม่ต้องสร้างทีละราย

### S05 — Area View
Hierarchy:
หน่วยบริการ → หมู่บ้าน → อสม. → ครัวเรือน

แสดงเฉพาะ operation metrics:
- จำนวนครัวเรือน
- coverage
- งานค้าง
- red flags
- follow-up due

ไม่แสดงข้อมูลสุขภาพส่วนบุคคลทั้งหมดใน overview

### S06 — Campaign Dashboard
- target count
- completed
- pending
- risk detected
- referred
- follow-up complete

ใช้เพื่อบริหารงานภาคสนาม ไม่ใช่รายงาน HDC อย่างเป็นทางการ

### S07 — Export Center
- เลือกช่วงเวลา
- เลือก campaign
- เลือกข้อมูลสรุป
- preview
- export CSV/XLSX/PDF summary ตามสิทธิ์

ทุก export ต้องสร้าง audit event

## 6. Screen Map — ประชาชน/ครัวเรือน

### C01 — Home
- นัดครั้งถัดไป
- งาน/คำแนะนำที่ต้องทำ
- ข้อความใหม่
- ผู้ดูแล/อสม.ประจำครัวเรือน
- ปุ่มขอความช่วยเหลือ

### C02 — Appointments
- นัดที่จะถึง
- ประวัตินัด
- ยืนยัน/ขอเปลี่ยนนัดเมื่อ workflow อนุญาต

### C03 — Follow-up Summary
แสดงภาษาง่าย:
- วันนี้ทำอะไรไปแล้ว
- ต้องทำอะไรต่อ
- นัดครั้งต่อไป

ไม่ควรแสดงศัพท์ clinical ที่ทำให้เข้าใจผิดโดยไม่มีคำอธิบาย

### C04 — Request Help / Report Symptom
- เลือกประเภทปัญหา
- ระดับเร่งด่วนตามข้อความแนะนำที่ปลอดภัย
- รายละเอียดสั้น
- รูป/ไฟล์เมื่อจำเป็นและได้รับอนุญาต

ระบบต้องมีข้อความชัดเจนว่าไม่ใช่ช่องทางฉุกเฉิน หากมีอาการฉุกเฉินให้ใช้บริการฉุกเฉินตามช่องทางทางการ

### C05 — Messages / Guidance
- คำแนะนำจากเจ้าหน้าที่
- ข้อความจาก อสม.
- announcement พื้นที่

### C06 — Household Profile
- สมาชิกที่ได้รับอนุญาตให้ดูแล
- ที่อยู่/ช่องทางติดต่อ
- consent/preferences
- ผู้รับผิดชอบในพื้นที่

## 7. Shared Components

### Risk Badge
ระดับ UI:
- Normal
- Watch
- Needs review
- Urgent

ต้องไม่ใช้สีเพียงอย่างเดียว ต้องมี icon + text

### Status Chip
- New
- Assigned
- In progress
- Submitted
- Under review
- Referred
- Follow-up
- Closed

### Timeline
event examples:
- task assigned
- visit started
- observation recorded
- red flag raised
- staff reviewed
- referral created
- follow-up completed

### Sync Indicator
- synced
- waiting
- failed

## 8. Core User Journeys สำหรับ prototype

### Journey A — อสม.เยี่ยมบ้านและคัดกรอง NCD
Today → Task → Household → Person → Start Visit → NCD Form → Risk Result → Submit

### Journey B — พบ red flag และส่งเจ้าหน้าที่
NCD Form → Urgent Result → Referral/Ask Staff → Triage Inbox → Staff Review → Follow-up Task

### Journey C — เจ้าหน้าที่มอบหมายงานหลายครัวเรือน
Dashboard → Assignment Composer → Select target group → Assign to volunteers → Volunteers receive tasks

### Journey D — ประชาชนดูนัดและคำแนะนำ
Home → Appointment → Follow-up Summary → Confirm

## 9. MVP Screen Scope

ต้องสร้าง prototype ก่อนเฉพาะ 15 หน้าหลัก:
1. V02 Today Dashboard
2. V03 Household List
3. V04 Household Detail
4. V05 Person Summary
5. V06 Start Visit
6. V07 NCD Screening
7. V08 Risk Result
8. V09 Referral
9. V10 Task List
10. S01 Operational Dashboard
11. S02 Triage Inbox
12. S03 Case Detail
13. S04 Assignment Composer
14. C01 Citizen Home
15. C02 Appointment / Follow-up

หน้าที่เหลือใช้เป็น navigation placeholder ใน prototype รอบแรก

## 10. Visual Direction

- Thai public-health feel แบบทันสมัย ไม่ใช่หน้าระบบราชการเดิม
- clean, warm, trustworthy
- cards ใหญ่ อ่านง่าย
- border radius ปานกลาง
- spacing ชัด
- font ไทยอ่านง่าย เช่น Prompt / Noto Sans Thai
- status/risk ใช้สีอย่างระมัดระวังและต้องมีข้อความกำกับ
- primary actions เด่น แต่ไม่ใช้สีแดงกับ action ปกติ
- รองรับ font scaling และ touch target อย่างน้อย ~44px

## 11. Prototype Data Rules

Lovable prototype ต้องใช้ **ข้อมูลสมมติทั้งหมด**
- ห้ามใช้ชื่อประชาชนจริง
- ห้ามใช้ HN/CID จริง
- ห้ามใช้ข้อมูลสุขภาพจาก Drive
- ใช้หมู่บ้านจริงได้ในระดับ geographic label
- ใช้ชื่อสมมติ อสม./เจ้าหน้าที่/ประชาชน

## 12. Definition of Done — D4

D4 ถือว่าพร้อมส่งเข้า prototype เมื่อ:
- navigation ของ 3 บทบาทชัด
- MVP journeys A–D เดินได้ตั้งแต่ต้นจนจบ
- ไม่มีหน้าจอที่ทำหน้าที่แทน Smart อสม./HDC
- permission assumptions สอดคล้องกับ D3
- prototype scope ไม่เกิน 15 หน้าหลักในรอบแรก
