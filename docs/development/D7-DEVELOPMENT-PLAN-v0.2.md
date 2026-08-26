# D7 — Development Plan v0.2

สถานะ: Active implementation plan
วันที่เริ่มใช้: 2026-08-27

เอกสารนี้แทน `D7-DEVELOPMENT-PLAN-v0.1.md` สำหรับการพัฒนาต่อจาก Product Definition v0.2 เป็นต้นไป

## 1. Source of Truth

1. `docs/product/PRODUCT-DEFINITION-v0.2.md`
2. `PRD.md`
3. `MASTER-ROADMAP.md`
4. `docs/architecture/DATABASE-DESIGN-v0.2.md`
5. `AGENTS.md`
6. `docs/development/AUTONOMOUS-AGENT-RULES.md`
7. current phase checklist
8. `docs/development/REPOSITORY-STRUCTURE.md`
9. older architecture documents as historical/supporting references only

D7 v0.1, D5/D6 v0.1 database documents และ blueprint เก่าที่ขัดกับรายการด้านบนเป็น historical reference เท่านั้น

## 2. Product Core

`Create Form → Define Audience → Publish → Route to Citizen/Volunteer → Complete → Submit → Review → Follow-up/Referral → Export-ready`

ระบบต้องไม่ถูกออกแบบเป็น NCD-only, visit-only หรือ referral-only architecture

Canonical data model:
`docs/architecture/DATABASE-DESIGN-v0.2.md`

## 3. Frontend Delivery Architecture

Frontend ของโครงการใช้ **GitHub Pages** เป็น hosting มาตรฐาน

Public URL target:
`https://aodxx.github.io/KCG-Health-OSM/`

ข้อกำหนดสำหรับทุก Phase ที่แตะ frontend:
- build ต้องรองรับ base path `/KCG-Health-OSM/`
- assets / manifest / service worker / routing ต้องทำงานใต้ base path นี้
- GitHub Actions ต้อง build และ deploy frontend ไป GitHub Pages
- Agent ต้องตรวจ deployed URL/readback และ runtime errors เอง
- deep-link/refresh behavior ต้องถูกจัดการให้เหมาะกับ static hosting
- backend/Auth/database ตั้งแต่ Phase 6 เป็นต้นไปต้องแยกจาก GitHub Pages และสื่อสารผ่าน secure HTTPS boundary
- frontend ห้ามมี privileged secrets

## 4. Delivery Phases

### Phase 0 — Repository & Frontend Foundation
สร้าง scaffold, 3 role shells, domain contracts, repository interfaces, synthetic mock data, PWA, offline/idempotency foundation, tests, CI และ GitHub Pages deployment foundation

### Phase 1 — Form Builder + Audience Selection + Campaign Publish
สร้าง flexible Form Builder, immutable FormVersion, audience resolver และ campaign recipient materialization ด้วย mock data

### Phase 2 — Citizen & Volunteer Submission
รองรับ citizen self-completion และ volunteer proxy completion พร้อม submission provenance

### Phase 3 — Household, Population & Responsibility
จัดการ hierarchy, household membership, volunteer assignment, import validation และ audit trail

### Phase 4 — Review Inbox + Dashboard
สร้าง review policy, submission review states, progress dashboard และ drill-down ตามพื้นที่/อสม./ครัวเรือน/บุคคล

### Phase 5 — Follow-up, Appointment & Referral
สร้าง action หลัง review โดยไม่ทำ diagnosis/full EMR

### Phase 6 — Backend + Authentication + Authorization
แปลง canonical logical database design เป็น migration จริง, เปลี่ยน mock repositories เป็น backend adapter, ทำ auth, server-enforced permissions, RLS/equivalent และ audit storage โดย frontend ยังคง deploy ผ่าน GitHub Pages

### Phase 7 — Production-grade Offline & Sync
local persistence, queue, retry, idempotency, conflict policy และ safe device/session behavior

### Phase 8 — Export & Smart อสม. Readiness
structured export และศึกษาช่องทาง official integration โดยห้าม scrape/auto-fill ระบบรัฐที่ไม่ได้รับอนุญาต

### Phase 9 — Pilot Readiness
privacy/security/legal basis, retention, backup/restore, onboarding, training, incident response และ controlled pilot gate

### Phase 10 — Production
production frontend ผ่าน GitHub Pages, backend production แยกบริการ, monitoring, operational runbooks, backup/restore verification, support และ release governance

รายละเอียด task/test/exit criteria ของแต่ละ Phase ใช้ `MASTER-ROADMAP.md` เป็นหลัก

## 5. Data Architecture Freeze

สำหรับ Phase 0–5 ให้ยึด entity/invariant ใน `DATABASE-DESIGN-v0.2.md` เป็นฐานของ domain types และ repository interfaces โดยไม่สร้าง schema แข่งขันใหม่

หากต้องเปลี่ยนโครงข้อมูลอย่างมีนัยสำคัญ:
1. สร้าง ADR ใน `docs/decisions/`
2. อธิบาย requirement ที่ canonical model รองรับไม่ได้
3. ปรับ `DATABASE-DESIGN-v0.2.md` อย่างตั้งใจ
4. ปรับ interfaces/tests ที่เกี่ยวข้อง

ห้ามกลับไปใช้ `Visit / Observation / Case / RiskAssessment / NCD` เป็นแกนระบบเพียงเพราะมีในเอกสาร v0.1

## 6. Engineering Rules

- domain-first; UI ไม่ผูกกับ data source โดยตรง
- repository abstraction ก่อน backend จริง
- mobile-first / Thai-first / offline-aware
- GitHub Pages is the fixed frontend host
- synthetic data by default
- no secrets in Git
- no production clinical threshold without health-professional approval
- authorization ต้องบังคับฝั่ง server เมื่อ backend ถูกนำมาใช้
- tests + lint + build + runtime + Pages readback ต้องผ่านก่อนส่งมอบ frontend
- GitHub เป็น handoff point; local/workspace-only ไม่ถือว่าส่งมอบ

## 7. Phase Gate

AI Agent ห้ามข้าม Phase เอง

ก่อนเปลี่ยน Phase ต้องมี:
1. exit criteria ครบ
2. quality gates ผ่าน
3. GitHub readback ยืนยัน
4. GitHub Pages deployment/readback ผ่านเมื่อ Phase นั้นแตะ frontend
5. `PROGRESS.md` อัปเดต
6. รายงาน `PHASE N PASS`
7. เจ้าของโครงการอนุมัติ Phase ถัดไป

## 8. Current Phase

Current phase: **Phase 0 Recovery — Repository & Frontend Foundation**

งาน Phase 1 ยังห้ามเริ่มจนกว่าจะได้รับอนุมัติหลัง Phase 0 PASS
