# KCG Health OSM

PWA สำหรับสนับสนุนการทำงานร่วมกันระหว่างแพทย์/เจ้าหน้าที่ รพ.สต., อสม. และประชาชน/ครัวเรือนในตำบลโคกชะงาย โดยแกนหลักของระบบคือ **form-driven community health screening workflow**

`Create Form → Define Audience → Publish → Citizen/Volunteer Completion → Submit → Review → Follow-up/Referral → Export-ready`

## Current Status

**Phase 0 Recovery — Repository & Frontend Foundation**

Implementation ปัจจุบันกำลังพัฒนาและตรวจสอบบน branch `recovery/product-direction-v0.2` ก่อนรวมกลับ `main`

ห้ามเริ่ม Phase 1 จนกว่า Phase 0 จะผ่าน exit criteria และเจ้าของโครงการอนุมัติอย่างชัดเจน

## Source of Truth

เมื่อเอกสารขัดกัน ให้ใช้ลำดับนี้:

1. `docs/product/PRODUCT-DEFINITION-v0.2.md`
2. `PRD.md`
3. `MASTER-ROADMAP.md`
4. `AGENTS.md`
5. `docs/development/AUTONOMOUS-AGENT-RULES.md`
6. `docs/development/PHASE-0-CHECKLIST.md`
7. `docs/development/D7-DEVELOPMENT-PLAN-v0.2.md`
8. architecture / blueprint / discovery documents

เอกสารเก่าที่ขัดกับ Product Definition v0.2 ให้ถือเป็น historical reference เท่านั้น

## Core Documents

- `docs/product/PRODUCT-DEFINITION-v0.2.md` — นิยามผลิตภัณฑ์ที่ตกลงแล้ว
- `PRD.md` — Product Requirements
- `MASTER-ROADMAP.md` — แผน Phase 0 ถึง Production
- `AGENTS.md` — กฎสำหรับ AI Agent
- `docs/development/AUTONOMOUS-AGENT-RULES.md` — กฎตรวจสอบงานและส่งมอบ GitHub
- `docs/development/PHASE-0-CHECKLIST.md` — exit criteria ของ Phase 0
- `docs/development/D7-DEVELOPMENT-PLAN-v0.2.md` — implementation plan ที่สอดคล้องกับ roadmap
- `docs/development/REPOSITORY-STRUCTURE.md` — โครงสร้าง repository ปัจจุบัน/เป้าหมาย
- `PROGRESS.md` — สถานะงานล่าสุดบน implementation branch

## Product Boundary

ระบบนี้ไม่ใช่:
- Smart อสม. replacement
- HDC/HIS replacement
- full EMR
- clinical diagnosis system
- ระบบรายงานภาครัฐคู่ขนาน

Smart อสม. integration ยังไม่ทำใน MVP; ระบบเตรียม structured export และจะเชื่อมต่อเฉพาะเมื่อมีช่องทางที่ถูกต้องและได้รับอนุญาต

## Data Safety

ห้าม commit ข้อมูลสุขภาพจริง, CID, HN, เบอร์โทร, ที่อยู่ละเอียด, เอกสารผู้ป่วย, secret key หรือข้อมูลระบุตัวบุคคลลง public repository นี้

จนกว่าจะผ่าน Pilot/Security gate ให้ใช้ synthetic/mock data เท่านั้น

## Agent Rule

AI Agent ต้องตรวจ install/check/lint/test/build/routes/runtime/CI เอง แก้ failure เอง และ push งานกลับ GitHub ก่อนรายงานว่าส่งมอบแล้ว ห้ามใช้เจ้าของโครงการเป็น routine QA
