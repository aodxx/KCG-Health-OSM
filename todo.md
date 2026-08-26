# Phase 1 — Mock MVP Workflow TODO

## Workflow foundation

- [x] เพิ่ม workflow state machine สำหรับ Assign → Visit → Observation → Risk → Review → Referral → Follow-up → Close
- [x] เพิ่ม mock repository ที่แก้ไข state ได้ใน memory โดยไม่เรียก backend
- [x] เพิ่ม synthetic case fixture สำหรับ normal, needs review และ urgent flow
- [x] เพิ่ม event timeline ที่ append-only ในระดับ prototype

## Volunteer journey

- [x] เปิด task ที่ assigned และเริ่ม visit
- [x] กรอก NCD observation แบบจำลองพร้อม validation
- [x] แสดง risk result เป็น workflow state ไม่ใช่ diagnosis
- [x] ส่งผลให้เจ้าหน้าที่ตรวจและเห็น sync state

## Staff journey

- [x] เปิด triage inbox และอ่านเคสตาม mock scope
- [x] review observation พร้อม note สั้น
- [x] เลือก referral หรือขอวัดซ้ำ
- [x] สร้าง follow-up task และมอบหมายกลับให้ อสม.

## Closure and tests

- [x] แสดง follow-up ใน timeline ของ case
- [x] ปิด case เมื่อ follow-up เสร็จ
- [x] ทดสอบ happy path และ urgent path ตั้งแต่ต้นจนจบ
- [x] ทดสอบห้ามใช้ข้อความวินิจฉัยโรค
- [x] รัน check, lint, test และ build
- [x] ตรวจ responsive screenshots และบันทึก checkpoint Phase 1
