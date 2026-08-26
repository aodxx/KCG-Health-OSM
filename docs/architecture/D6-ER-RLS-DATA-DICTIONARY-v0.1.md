# D6 — ER Diagram + RLS Policy Matrix + MVP Data Dictionary v0.1

สถานะ: **SUPERSEDED / HISTORICAL REFERENCE**

เอกสารนี้อ้างอิง data model รุ่นก่อน Product Definition v0.2 และมีโครง `Task / Visit / Observation / RiskAssessment / Case` ซึ่งไม่ใช่ canonical product core ปัจจุบัน

## ใช้เอกสารนี้แทน

`docs/architecture/DATABASE-DESIGN-v0.2.md`

RLS จริงจะออกแบบและ implement ใน Phase 6 เท่านั้น โดยยึดหลัก:
- role + scope + assignment/ownership
- server-enforced authorization
- `TO authenticated` อย่างเดียวไม่เพียงพอ
- Admin ไม่มีสิทธิ์อ่านข้อมูลสุขภาพโดยอัตโนมัติ
- synthetic staging ก่อน real-data gate

รายละเอียดเดิมยังอยู่ใน Git history เพื่อการอ้างอิงย้อนหลัง แต่ห้ามใช้เป็น source of truth สำหรับ schema/migration ใหม่
