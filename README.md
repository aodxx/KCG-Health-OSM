# KCG Health OSM

PWA สำหรับสนับสนุนการทำงานร่วมกันระหว่างแพทย์/เจ้าหน้าที่ รพ.สต., อสม. และประชาชน/ครัวเรือนในตำบลโคกชะงาย โดยแกนหลักของระบบคือ **form-driven community health screening workflow**

`Create Form → Define Audience → Publish → Citizen/Volunteer Completion → Submit → Review → Follow-up/Referral → Export-ready`

## Current Status

**Phase 0 Recovery — Repository & Frontend Foundation**

Implementation ปัจจุบันพัฒนาและตรวจสอบบน branch `recovery/product-direction-v0.2` ก่อนรวมกลับ `main`

ห้ามเริ่ม Phase 1 จนกว่า Phase 0 จะผ่าน exit criteria และเจ้าของโครงการอนุมัติอย่างชัดเจน

## Source of Truth

เมื่อเอกสารขัดกัน ให้ใช้ลำดับนี้:

1. `docs/product/PRODUCT-DEFINITION-v0.2.md`
2. `PRD.md`
3. `MASTER-ROADMAP.md`
4. `docs/architecture/DATABASE-DESIGN-v0.2.md`
5. `AGENTS.md`
6. `docs/development/AUTONOMOUS-AGENT-RULES.md`
7. `docs/development/PHASE-0-CHECKLIST.md`
8. `docs/development/D7-DEVELOPMENT-PLAN-v0.2.md`
9. `docs/development/REPOSITORY-STRUCTURE.md`
10. เอกสาร architecture / blueprint / discovery รุ่นเก่าเป็น supporting/historical reference เท่านั้น

เอกสาร v0.1 ที่ขัดกับ Product Definition v0.2, PRD, Master Roadmap หรือ Database Design v0.2 ห้ามใช้กำหนด implementation ใหม่

## Core Documents

- `docs/product/PRODUCT-DEFINITION-v0.2.md` — นิยามผลิตภัณฑ์ที่ตกลงแล้ว
- `PRD.md` — Product Requirements
- `MASTER-ROADMAP.md` — แผน Phase 0 ถึง Production และ phase gates
- `docs/architecture/DATABASE-DESIGN-v0.2.md` — canonical logical database/data model สำหรับ Phase 0–6
- `AGENTS.md` — กฎสำหรับ AI Agent
- `docs/development/AUTONOMOUS-AGENT-RULES.md` — กฎตรวจสอบงานและส่งมอบ GitHub
- `docs/development/PHASE-0-CHECKLIST.md` — exit criteria ของ Phase 0
- `docs/development/D7-DEVELOPMENT-PLAN-v0.2.md` — implementation plan ปัจจุบัน
- `docs/development/REPOSITORY-STRUCTURE.md` — โครงสร้าง repository/source code
- `PROGRESS.md` — สถานะงานล่าสุดบน implementation branch

## Frozen Foundation

สำหรับการเดินหน้า Phase 0–5 ให้ถือว่าสิ่งต่อไปนี้เพียงพอและไม่ต้องออกแบบใหม่โดยไม่มีเหตุจำเป็น:

- Product direction
- PRD
- Phase roadmap
- repository/source structure
- canonical logical database design
- agent workflow/gates

หากมี requirement ใหม่ที่กระทบ architecture อย่างมีนัยสำคัญ ให้บันทึก ADR ก่อนเปลี่ยน canonical design แทนการสร้างเอกสารคู่ขนานใหม่

## Product Boundary

ระบบนี้ไม่ใช่:
- Smart อสม. replacement
- HDC/HIS replacement
- full EMR
- clinical diagnosis system
- ระบบรายงานภาครัฐคู่ขนาน

Smart อสม. integration ยังไม่ทำใน MVP; ระบบเตรียม structured export และจะเชื่อมต่อเฉพาะเมื่อมีช่องทางที่ถูกต้องและได้รับอนุญาต

## Database Timing

- Phase 0–5: domain types + repository interfaces + synthetic mock data
- Phase 6: แปลง `DATABASE-DESIGN-v0.2.md` เป็น migrations/backend/Auth/RLS จริง
- Phase 9: privacy/security/legal/retention gate ก่อน controlled real-data pilot

ห้ามเริ่ม production database ก่อน phase gate เพียงเพราะมี Supabase project เตรียมไว้แล้ว

## Data Safety

ห้าม commit ข้อมูลสุขภาพจริง, CID, HN, เบอร์โทร, ที่อยู่ละเอียด, เอกสารผู้ป่วย, secret key หรือข้อมูลระบุตัวบุคคลลง public repository นี้

จนกว่าจะผ่าน Pilot/Security gate ให้ใช้ synthetic/mock data เท่านั้น

## Agent Rule

AI Agent ต้องตรวจ install/check/lint/test/build/routes/runtime/CI เอง แก้ failure เอง และ push งานกลับ GitHub ก่อนรายงานว่าส่งมอบแล้ว ห้ามใช้เจ้าของโครงการเป็น routine QA
